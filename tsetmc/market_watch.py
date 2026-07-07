from asyncio import Event as _Event, sleep as _sleep
from collections.abc import Callable as _Callable
from io import BytesIO as _BytesIO, StringIO as _StringIO
from itertools import islice
from typing import (
    Any as _Any,
    TypedDict as _TypedDict,
)

import polars as _pl
from aiohttp import (
    ClientConnectorDNSError as _ClientConnectorDNSError,
    ClientResponseError as _ClientResponseError,
)
from html_table_parse import to_list as _html_to_list
from polars import LazyFrame as _LazyFrame

from tsetmc import (
    MarketState,
    _api,
    _get_data,
    _get_par_tree,
    _jgstrptime,
    _logger,
    _parse_market_state,
    _save_last_content,
)

_BEST_LIMITS_SCHEMA = {
    'ins_code': _pl.String,
    'number': _pl.Int64,
    'zo': _pl.Float64,
    'zd': _pl.Float64,
    'pd': _pl.Float64,
    'po': _pl.Float64,
    'qd': _pl.Float64,
    'qo': _pl.Float64,
}

_COMMON_DTYPES = {
    'heven': _pl.Int32,
    'pf': _pl.Int64,
    'pc': _pl.Int64,
    'pl': _pl.Int64,
    'tno': _pl.Int64,
    'tvol': _pl.Int64,
    'tval': _pl.Int64,
    'pmin': _pl.Int64,
    'pmax': _pl.Int64,
}

_PRICE_DTYPES_23 = {
    'ins_code': _pl.String,
    'isin': _pl.String,
    'l18': _pl.String,
    'l30': _pl.String,
    **_COMMON_DTYPES,
    'py': _pl.Int64,
    'eps': _pl.Float64,
    'bvol': _pl.Int64,
    'visitcount': _pl.Int64,
    'flow': _pl.Int16,
    'cs': _pl.String,
    'tmax': _pl.Float64,
    'tmin': _pl.Float64,
    'z': _pl.Int64,
    'yval': _pl.String,
}

_PRICE_DTYPES_26 = _PRICE_DTYPES_23 | {
    'predtran': _pl.Float64,
    'buyop': _pl.Int64,
    'cgrvalcot': _pl.String,
}

_PRICE_UPDATE_COLUMNS = {'ins_code': _pl.String, **_COMMON_DTYPES}


class MarketWatchInit(_TypedDict):
    prices: _LazyFrame | None
    best_limits: _LazyFrame | None
    market_state: MarketState | None
    refid: int


def _unstack_best_limits(bl: _LazyFrame, /) -> _LazyFrame:
    # Polars pivot currently requires an eager Frame collection.
    df = bl.collect()
    value_cols = [c for c in df.columns if c not in ('ins_code', 'number')]

    pivoted = df.pivot(
        on='number',
        index='ins_code',
        values=value_cols,
        aggregate_function='first',
    )

    new_names = []
    for col in pivoted.columns:
        if col == 'ins_code':
            new_names.append(col)
            continue
        name, number = col.split('_')
        new_names.append(f'{name}{number}')

    pivoted.columns = new_names
    return pivoted.lazy()


async def market_watch_init(
    *, market_state=True, prices=True, best_limits=True, join=True
) -> MarketWatchInit:
    """Return the market status which are the info used in creating filters.

    If `join` is True, `best_limits` will be joined to `prices`, otherwise
        it will be returned as a separate dataframes.

    For more information about filters see:
        http://old.tsetmc.com/Loader.aspx?ParTree=15131F
    For the meaning of column names in the returned DataFrame refer to:
        http://tsetmc.com/Site.aspx?ParTree=151713
        For persian translation of `flow` and `yval` codes use
        `tsetmc.docs.instrument`.
        `heven` is the time of the last transaction in HHMMSS format.

    See also the new experimental equivallent of this function:
        ``get_market_watch``
    """
    text = await _get_data('MarketWatchInit.aspx?h=0&r=0', fa=True)
    try:
        _, market_state_str, states, price_rows, refid = text.split('@')
    except ValueError:
        # ValueError: not enough values to unpack (expected 5, got 1)
        _logger.error(text)
        raise

    if prices:
        # Direct generation of a LazyFrame using scan_csv on the memory buffer
        prices_lf = _pl.scan_csv(
            _StringIO(states),
            has_header=False,
            schema=_PRICE_DTYPES_26,
            eol_char=';',
            missing_columns='insert',
        )
    else:
        prices_lf = None

    if best_limits:
        bl = _pl.scan_csv(
            _StringIO(price_rows),
            has_header=False,
            schema={
                'ins_code': _pl.String,
                'number': _pl.Int64,
                'zo': _pl.Int64,
                'zd': _pl.Int64,
                'pd': _pl.Int64,
                'po': _pl.Int64,
                'qd': _pl.Int64,
                'qo': _pl.Int64,
            },
            eol_char=';',
        )

        if join and prices_lf is not None:
            bl = _unstack_best_limits(bl)
            prices_lf = bl.join(prices_lf, on='ins_code', how='left')
    else:
        prices_lf = bl = None

    return MarketWatchInit(
        refid=int(refid),
        best_limits=bl,
        market_state=_parse_market_state(market_state_str)
        if market_state
        else None,
        prices=prices_lf,
    )


class MarketWatchPlus(_TypedDict):
    new_prices: _LazyFrame | None
    price_updates: _LazyFrame | None
    best_limits: _LazyFrame | None
    messages: list[str] | None
    market_state: MarketState | None
    refid: int


def _parse_inst_prices_str(
    inst_prices_str: str,
    new_prices: bool,
    price_updates: bool,
) -> tuple[_LazyFrame | None, _LazyFrame | None]:
    np = pu = None
    if not inst_prices_str:
        if new_prices:
            np = _pl.DataFrame(schema=_PRICE_DTYPES_26).lazy()
        if price_updates:
            pu = _pl.DataFrame(schema=_PRICE_UPDATE_COLUMNS).lazy()
        return np, pu

    inst_prices = [ip.split(',') for ip in inst_prices_str.split(';')]
    inst_prices = [
        [(i if i else None) for i in ip.split(',')]
        for ip in inst_prices_str.split(';')
    ]

    if new_prices:
        lst = [ip for ip in inst_prices if len(ip) != 10]
        cols26 = not lst or len(lst[0]) == 26
        target_schema = _PRICE_DTYPES_26 if cols26 else _PRICE_DTYPES_23
        try:
            lf = _LazyFrame(lst, schema=target_schema, orient='row')
        except ValueError as e:
            _save_last_content(f'{e}')
            raise
        np = lf

    if price_updates:
        lst = [ip for ip in inst_prices if len(ip) == 10]
        pu = _LazyFrame(lst, schema=_PRICE_UPDATE_COLUMNS, orient='row')

    return np, pu


async def market_watch_plus(
    heven: int,
    refid: int,
    *,
    messages=True,
    market_state=True,
    new_prices=True,
    price_updates=True,
    best_limits=True,
    best_limits_prepare_join=True,
) -> MarketWatchPlus:
    # See dev/tsetmc_source_files/market_watch.html
    # for how the response is parsed in the browser.
    text = await _get_data(
        f'MarketWatchPlus.aspx?h={5 * (heven // 5)}&r={25 * (refid // 25)}',
        fa=True,
    )
    try:
        (
            handle_msg,
            update_fast_view,
            inst_prices_str,
            best_limit,
            str_refid,
        ) = text.split('@')
    except ValueError as e:
        _save_last_content(f'{e!r}')
        raise
    if messages:
        # whenever a new id appears, users should try to fetch new messages
        # using relevant functions
        # todo: implement functions to fetch messages using message ids
        # NewMsgNotification, NewInsStateNotification, NewCodalNotification
        msg_list = handle_msg.split(',')
    else:
        msg_list = None

    if market_state and update_fast_view != '':
        market_state_result = _parse_market_state(update_fast_view)
    else:
        market_state_result = None

    if new_prices or price_updates:
        np, pu = _parse_inst_prices_str(
            inst_prices_str, new_prices, price_updates
        )
    else:
        np = pu = None

    bl = None
    if best_limits:
        if best_limit:
            bl = _pl.scan_csv(
                _StringIO(best_limit),
                has_header=False,
                schema=_BEST_LIMITS_SCHEMA,
                eol_char=';',
            )
            if best_limits_prepare_join:
                bl = _unstack_best_limits(bl)

    return MarketWatchPlus(
        new_prices=np,
        price_updates=pu,
        best_limits=bl,
        messages=msg_list,
        market_state=market_state_result,
        refid=int(str_refid),
    )


def _split_id_rows(content: bytes, id_row_len: int) -> list[list[str]]:
    raw_rows = content.split(b';')
    parsed_data: list[list[str]] = []

    id_ = b''
    for datum in raw_rows:
        items = datum.split(b',')
        if len(items) == id_row_len:
            id_ = items[0]
        else:
            items.insert(0, id_)

        parsed_data.append([x.decode('utf-8', errors='ignore') for x in items])

    return parsed_data


async def closing_price_all() -> _LazyFrame:
    """Return price history dataframe.

    For the meaning of column names refer to
        https://old.tsetmc.com/Site.aspx?ParTree=151713
    This method returns the same set of information as `[ih]` variable in
        tsetmc filters. See:
            https://old.tsetmc.com/Site.aspx?ParTree=151715&LnkIdn=3197
    """
    content = await _get_data('ClosingPriceAll.aspx')
    data = _split_id_rows(content, id_row_len=11)
    columns = [
        'ins_code',
        'n',
        'pc',
        'pl',
        'tno',
        'tvol',
        'tval',
        'pmin',
        'pmax',
        'py',
        'pf',
    ]

    df = _pl.DataFrame(data, schema=columns, orient='row')
    df = df.with_columns(
        [_pl.col(c).cast(_pl.Int64, strict=False) for c in columns[1:]]
    ).with_columns(_pl.col('ins_code').cast(_pl.String))

    return df.lazy()


_CLIENT_TYPE_SCHEMA = {
    'ins_code': _pl.String,
    'n_buy_count': _pl.Int64,
    'l_buy_count': _pl.Int64,
    'n_buy_volume': _pl.Int64,
    'l_buy_volume': _pl.Int64,
    'n_sell_count': _pl.Int64,
    'l_sell_count': _pl.Int64,
    'n_sell_volume': _pl.Int64,
    'l_sell_volume': _pl.Int64,
}


async def client_type_all() -> _LazyFrame:
    """Return client types (natural/legal stats) as a DataFrame.

    In column names `n_` prefix stands for natural and `l_` for legal.

    See also the new experimental equivalent of this function:
        ``get_client_type_all``
    """
    content = await _get_data('ClientTypeAll.aspx')

    df = _pl.scan_csv(
        _BytesIO(content),
        has_header=False,
        schema=_CLIENT_TYPE_SCHEMA,
        eol_char=';',
    )
    return df


async def key_stats() -> _LazyFrame:
    """Return key statistics as a DataFrame.

    For the meaning of column names refer to
        https://old.tsetmc.com/Site.aspx?ParTree=151715&LnkIdn=3199 or
        https://old.tsetmc.com/Site.aspx?ParTree=151713

    See also the new experimental equivallent of this function:
        ``get_inst_value_all_inst_all_param``
    """
    content = await _get_data('InstValue.aspx?t=a')
    data = _split_id_rows(content, id_row_len=3)
    columns = ('ins_code', 'n', 'value')

    df = _pl.DataFrame(data, schema=columns, orient='row')
    df = df.with_columns(
        [
            _pl.col('ins_code').cast(_pl.String),
            _pl.col('n').cast(_pl.String),
            _pl.col('value').cast(_pl.Float64, strict=False),
        ]
    )

    pivoted = df.pivot(
        on='n', index='ins_code', values='value', aggregate_function='first'
    )
    pivoted = pivoted.rename(
        {c: f'is{c}' for c in pivoted.columns if c != 'ins_code'}
    )
    return pivoted.lazy()


async def status_changes(top: int | str) -> _LazyFrame:
    text = await _get_par_tree(f'15131L&top={top}')
    lol = _html_to_list(text)
    assert lol[0] == ['نماد', 'نام', 'تاریخ', 'زمان', 'وضعیت جدید']
    lf = (
        _LazyFrame(
            islice(lol, 1, None),
            orient='row',
            schema={
                k: _pl.String
                for k in ['symbol', 'name', 'date', 'time', 'new_status']
            },
        )
        .with_columns(datetime=_pl.col('date') + ' ' + _pl.col('time'))
        .with_columns(
            _pl.col('datetime').map_elements(
                lambda e: _jgstrptime(e, format='%Y/%m/%d %H:%M:%S'),
                return_dtype=_pl.Datetime,
            )
        )
    )
    return lf


async def get_market_watch(
    h_even=0, ref_id=0, with_best_limits=True, show_traded=False
) -> _LazyFrame:
    """This function uses the new *experimental* market watch API."""
    j = await _api(
        'ClosingPrice/GetMarketWatch'
        '?market=0'
        '&industrialGroup='
        '&paperTypes%5B0%5D=1'
        '&paperTypes%5B1%5D=2'
        '&paperTypes%5B2%5D=3'
        '&paperTypes%5B3%5D=4'
        '&paperTypes%5B4%5D=5'
        '&paperTypes%5B5%5D=6'
        '&paperTypes%5B6%5D=7'
        '&paperTypes%5B7%5D=8'
        '&paperTypes%5B8%5D=9'
        f'&showTraded={show_traded}'
        f'&withBestLimits={with_best_limits}'
        f'&hEven={h_even}'
        f'&RefID={ref_id}'
    )
    df = _pl.DataFrame(j['marketwatch'])
    if 'pe' in df.columns:
        df = df.with_columns(
            _pl.col('pe').replace('-', None).cast(_pl.Float64, strict=False)
        )
    return df.lazy()


async def get_client_type_all() -> _LazyFrame:
    """This function uses the new *experimental* market watch API."""
    j = await _api('ClientType/GetClientTypeAll')
    if len(j.keys()) > 1:
        _logger.warning(
            f'Unexpected keys in get_client_type_all response: {j.keys()=}'
        )
    return _pl.DataFrame(j['clientTypeAllDto']).lazy()


async def get_inst_value_all_inst_all_param() -> _LazyFrame:
    """This function uses the new *experimental* market watch API."""
    j = await _api('MarketData/GetInstValueAllInstAllParam')
    if len(j.keys()) > 1:
        _logger.warning(
            f'Unexpected keys in get_inst_value_all_inst_all_param response: {j.keys()=}'
        )
    return _pl.DataFrame(j['instValueAllInstAllParam']).lazy()


class MarketWatch:
    __slots__ = (
        'init_callback',
        'init_kwargs',
        'interval',
        'lf',
        'market_state',
        'plus_callback',
        'plus_kwargs',
        'update_event',
    )

    def __init__(
        self,
        *,
        init_kwargs: dict | None = None,
        plus_kwargs: dict | None = None,
        init_callback: _Callable[[MarketWatchInit], _Any] | None = None,
        plus_callback: _Callable[[MarketWatchPlus], _Any] | None = None,
        interval=1,
    ):
        """Create an object that helps with watching the market watch.

        :param init_kwargs: kwargs to be passed to market_watch_init
        :param plus_kwargs: kwargs to be passed to market_watch_plus
        :param init_callback: function to be called with the result of
            market_watch_init.
        :param plus_callback: function to be called with the result of
            market_watch_plus.
        :param interval: The sleep interval.

        Each time a callback returns, self.event will be set. Users can wait
        for this event to get notified of new updates.

        To stop the watch, cancel the task that is running `self.start()`.

        If init_callback is None, then self._default_init_callback and
        self._default_plus_callback will be used which will create
        self.lf and keep it up-to-date while the watch is running.
        This is convenient, but note that you may be able to be implement a
        more efficient algorith to gather specific updates by using
        custom callback functions.
        """
        self.interval = interval
        self.init_kwargs: dict = {} if init_kwargs is None else init_kwargs
        self.plus_kwargs: dict = {} if plus_kwargs is None else plus_kwargs
        self.update_event = _Event()
        self.init_callback = (
            self._default_init_callback
            if init_callback is None
            else init_callback
        )
        self.plus_callback = (
            self._default_plus_callback
            if plus_callback is None
            else plus_callback
        )

    def _default_init_callback(self, d: MarketWatchInit):
        self.lf = d.get('prices')
        self.market_state = d.get('market_state')

    def _default_plus_callback(self, mwp: MarketWatchPlus):
        mwp_get = mwp.get
        self.market_state = mwp_get('market_state')
        lf = self.lf
        if lf is None:
            return

        best_limits = mwp_get('best_limits')
        if best_limits is not None:
            update_cols = [
                col
                for col in best_limits.collect_schema().names()
                if col != 'ins_code'
            ]

            lf = lf.join(
                best_limits,
                on='ins_code',
                how='left',
                suffix='_limit_update',
            )

            limit_exprs = [
                _pl.coalesce(
                    [_pl.col(f'{col}_limit_update'), _pl.col(col)]
                ).alias(col)
                for col in update_cols
            ]
            if limit_exprs:
                lf = lf.with_columns(limit_exprs).drop(
                    [f'{col}_limit_update' for col in update_cols]
                )

        new_prices = mwp_get('new_prices')
        if new_prices is not None:
            lf = _pl.concat([lf, new_prices], how='diagonal')

        price_updates = mwp_get('price_updates')
        if price_updates is not None:
            lf = lf.join(
                price_updates, on='ins_code', how='left', suffix='_update'
            )

            current_cols = lf.collect_schema().names()

            update_exprs = []
            drop_cols = []
            for col in current_cols:
                if col.endswith('_update'):
                    base_col = col.replace('_update', '')
                    drop_cols.append(col)
                    update_exprs.append(
                        _pl.coalesce([_pl.col(col), _pl.col(base_col)]).alias(
                            base_col
                        )
                    )

            if update_exprs:
                lf = lf.with_columns(update_exprs).drop(drop_cols)
        self.lf = lf

    async def start(self):
        update_event = self.update_event
        set_event = update_event.set
        clear_event = update_event.clear

        while True:
            try:
                mwi = await market_watch_init(**self.init_kwargs)
            except Exception as e:
                _logger.error(f'{e!r} while awaiting market_watch_init')
                await _sleep(self.interval)
                continue
            break

        self.init_callback(mwi)

        lf = self.lf
        if lf is not None:
            heven = lf.select('heven').max().collect().item() or 0
        else:
            heven = 0

        refid = mwi['refid']
        set_event()
        clear_event()

        while True:
            await _sleep(self.interval)
            try:
                mwp = await market_watch_plus(
                    refid=refid, heven=heven, **self.plus_kwargs
                )
            except _ClientResponseError as e:
                _logger.warning(
                    f'{e.status} status while awaiting market_watch_plus'
                )
                continue
            except _ClientConnectorDNSError as e:
                _logger.warning(f'{e!r} while awaiting market_watch_plus')
                continue
            except Exception as e:
                _logger.exception(f'{e!r} while awaiting market_watch_plus')
                continue  # _sleep and retry

            self.plus_callback(mwp)

            refid = mwp['refid']

            if (pu := mwp.get('price_updates')) is not None:
                pu_max = pu.select('heven').max().collect().item() or 0
                if pu_max > heven:
                    heven = pu_max
            if (np := mwp.get('new_prices')) is not None:
                np_max = np.select('heven').max().collect().item() or 0
                if np_max > heven:
                    heven = np_max

            set_event()
            clear_event()
