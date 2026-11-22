from asyncio import Event as _Event, sleep as _sleep
from collections.abc import Callable as _Callable
from io import BytesIO as _BytesIO, StringIO as _StringIO
from itertools import islice
from typing import Any as _Any, TypedDict as _TypedDict, overload as _overload
from warnings import deprecated as _deprecated

from aiohttp import (
    ClientConnectorDNSError as _ClientConnectorDNSError,
    ClientResponseError as _ClientResponseError,
)
from html_table_parse import to_list as _html_to_list
from polars import (
    Boolean as _Boolean,
    DataFrame as _DataFrame,
    Datetime as _Datetime,
    Float64 as _Float64,
    Int16 as _Int16,
    Int32 as _Int32,
    Int64 as _Int64,
    LazyFrame as _LazyFrame,
    List as _List,
    String as _String,
    Struct as _Struct,
    coalesce as _coalesce,
    col as _col,
    concat as _concat,
    lit as _lit,
    max_horizontal as _max_horizontal,
    scan_csv as _scan_csv,
    when as _when,
)
from pytest import warns

from tsetmc import (
    MarketState,
    _api,
    _get_data,
    _get_par_tree,
    _jgstrptime,
    _parse_market_state,
    _save_last_content,
    logger as _logger,
)

_BEST_LIMITS_SCHEMA = {
    'ins_code': _String,
    'number': _Int64,
    'zo': _Float64,
    'zd': _Float64,
    'pd': _Float64,
    'po': _Float64,
    'qd': _Float64,
    'qo': _Float64,
}

_COMMON_DTYPES = {
    'heven': _Int32,
    'pf': _Int64,
    'pc': _Int64,
    'pl': _Int64,
    'tno': _Int64,
    'tvol': _Int64,
    'tval': _Int64,
    'pmin': _Int64,
    'pmax': _Int64,
}

_PRICE_DTYPES_23 = {
    'ins_code': _String,
    'isin': _String,
    'l18': _String,
    'l30': _String,
    **_COMMON_DTYPES,
    'py': _Int64,
    'eps': _Float64,
    'bvol': _Int64,
    'visitcount': _Int64,
    'flow': _Int16,
    'cs': _String,
    'tmax': _Float64,
    'tmin': _Float64,
    'z': _Int64,
    'yval': _String,
}

_PRICE_DTYPES_26 = _PRICE_DTYPES_23 | {
    'predtran': _Float64,
    'buyop': _Int64,
    'cgrvalcot': _String,
}

_PRICE_UPDATE_COLUMNS = {'ins_code': _String, **_COMMON_DTYPES}


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


@_deprecated('use get_market_watch instead')
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
        prices_lf = _scan_csv(
            _StringIO(states),
            has_header=False,
            schema=_PRICE_DTYPES_26,
            eol_char=';',
            missing_columns='insert',
        )
    else:
        prices_lf = None

    if best_limits:
        bl = _scan_csv(
            _StringIO(price_rows),
            has_header=False,
            schema={
                'ins_code': _String,
                'number': _Int64,
                'zo': _Int64,
                'zd': _Int64,
                'pd': _Int64,
                'po': _Int64,
                'qd': _Int64,
                'qo': _Int64,
            },
            eol_char=';',
        )

        if join and prices_lf is not None:
            bl = _unstack_best_limits(bl)
            prices_lf = bl.join(prices_lf, on='ins_code', how='left')
    else:
        bl = None

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
            np = _DataFrame(schema=_PRICE_DTYPES_26).lazy()
        if price_updates:
            pu = _DataFrame(schema=_PRICE_UPDATE_COLUMNS).lazy()
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


@_deprecated('use get_market_watch instead')
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
    if best_limits and best_limit:
        bl = _scan_csv(
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


@_deprecated('use closing_prices_daily_all instead')
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

    df = _DataFrame(data, schema=columns, orient='row')
    df = df.with_columns(
        [_col(c).cast(_Int64, strict=False) for c in columns[1:]]
    ).with_columns(_col('ins_code').cast(_String))

    return df.lazy()


_CLIENT_TYPE_SCHEMA = {
    'ins_code': _String,
    'n_buy_count': _Int64,
    'l_buy_count': _Int64,
    'n_buy_volume': _Int64,
    'l_buy_volume': _Int64,
    'n_sell_count': _Int64,
    'l_sell_count': _Int64,
    'n_sell_volume': _Int64,
    'l_sell_volume': _Int64,
}


@_deprecated('use get_client_type_all instead')
async def client_type_all() -> _LazyFrame:
    """Return client types (natural/legal stats) as a DataFrame.

    In column names `n_` prefix stands for natural and `l_` for legal.
    """
    content = await _get_data('ClientTypeAll.aspx')

    df = _scan_csv(
        _BytesIO(content),
        has_header=False,
        schema=_CLIENT_TYPE_SCHEMA,
        eol_char=';',
    )
    return df


@_deprecated('use get_inst_value_all_inst_all_param instead')
async def key_stats() -> _LazyFrame:
    """Return key statistics as a DataFrame.

    For the meaning of column names refer to
        https://old.tsetmc.com/Site.aspx?ParTree=151715&LnkIdn=3199 or
        https://old.tsetmc.com/Site.aspx?ParTree=151713
    """
    content = await _get_data('InstValue.aspx?t=a')
    data = _split_id_rows(content, id_row_len=3)
    columns = ('ins_code', 'n', 'value')

    df = _DataFrame(data, schema=columns, orient='row')
    df = df.with_columns(
        [
            _col('ins_code').cast(_String),
            _col('n').cast(_String),
            _col('value').cast(_Float64, strict=False),
        ]
    )

    pivoted = df.pivot(
        on='n', index='ins_code', values='value', aggregate_function='first'
    )
    pivoted = pivoted.rename(
        {c: f'is{c}' for c in pivoted.columns if c != 'ins_code'}
    )
    return pivoted.lazy()


@_deprecated('status_changes is deprecated')
async def status_changes(top: int | str) -> _LazyFrame:
    text = await _get_par_tree(f'15131L&top={top}')
    lol = _html_to_list(text)
    assert lol[0] == ['نماد', 'نام', 'تاریخ', 'زمان', 'وضعیت جدید']
    lf = (
        _LazyFrame(
            islice(lol, 1, None),
            orient='row',
            schema={
                k: _String
                for k in ['symbol', 'name', 'date', 'time', 'new_status']
            },
        )
        .with_columns(datetime=_col('date') + ' ' + _col('time'))
        .with_columns(
            _col('datetime').map_elements(
                lambda e: _jgstrptime(e, format='%Y/%m/%d %H:%M:%S'),
                return_dtype=_Datetime,
            )
        )
    )
    return lf


_BL_DS_STRUCT = _Struct(
    {
        'n': _Int64,
        'qmd': _Int64,
        'zmd': _Int64,
        'pmd': _Float64,
        'pmo': _Float64,
        'zmo': _Int64,
        'qmo': _Int64,
        'rid': _Int64,
    }
)

_MARKET_WATCH_SCHEMA = {
    'lva': _String,
    'lvc': _String,
    'eps': _Float64,
    'pe': _String,
    'pmd': _Float64,
    'pmo': _Float64,
    'qtj': _Float64,
    'pdv': _Float64,
    'ztt': _Float64,
    'qtc': _Float64,
    'bv': _Float64,
    'pc': _Float64,
    'pcpc': _Float64,
    'pmn': _Float64,
    'pmx': _Float64,
    'py': _Float64,
    'pf': _Float64,
    'pcl': _Float64,
    'vc': _Int64,
    'csv': _String,
    'insID': _String,
    'pMax': _Float64,
    'pMin': _Int64,
    'ztd': _Float64,
    'blDs': _List(_BL_DS_STRUCT),
    'id': _Int64,
    'insCode': _String,
    'dEven': _Int64,
    'hEven': _Int64,
    'pClosing': _Float64,
    'iClose': _Boolean,
    'yClose': _Boolean,
    'pDrCotVal': _Float64,
    'zTotTran': _Float64,
    'qTotTran5J': _Float64,
    'qTotCap': _Float64,
    'yVal': _Int64,
    'flow': _Int64,
    'cGrValCot': _String,
    'yMarNSC': _String,
    'pRedTran': _Float64,
    'buyOP': _Int64,
}


def _unstack_market_watch_best_limits(df: _DataFrame) -> _DataFrame:
    bl = (
        df.select('insCode', 'blDs')
        .explode('blDs')
        .filter(_col('blDs').is_not_null())
        .unnest('blDs')
        .filter(_col('n').is_not_null())
        .select(
            'insCode',
            _col('n'),
            'rid',
            'pmd',
            'qmd',
            'zmd',
            'pmo',
            'qmo',
            'zmo',
        )
        .with_columns(_lit(True).alias('_present'))
    )

    df = df.drop('blDs')

    unexpected = bl.filter(~_col('n').is_between(1, 5))

    if not unexpected.is_empty():
        _logger.warning(
            'Unexpected best-limit levels: %s',
            unexpected['n'].unique().sort().to_list(),
        )

    bl = bl.filter(_col('n').is_between(1, 5))

    # Expected output columns and their dtypes.
    expected = {
        f'{field.name}{n}': field.dtype
        for field in _BL_DS_STRUCT.fields
        if field.name != 'n'
        for n in range(1, 6)
    }
    expected |= {f'_present{n}': _Boolean for n in range(1, 6)}

    if bl.is_empty():
        return df.with_columns(
            _lit(
                False if name.startswith('_present') else None, dtype=dtype
            ).alias(name)
            for name, dtype in expected.items()
        )

    pivoted = bl.pivot(
        on='n',
        index='insCode',
        values=['rid', 'pmd', 'qmd', 'zmd', 'pmo', 'qmo', 'zmo', '_present'],
        aggregate_function='first',
    )

    pivoted.columns = [
        'insCode' if col == 'insCode' else ''.join(col.rsplit('_', 1))
        for col in pivoted.columns
    ]

    pivoted = pivoted.with_columns(
        _lit(
            False if name.startswith('_present') else None,
            dtype=dtype,
        ).alias(name)
        for name, dtype in expected.items()
        if name not in pivoted.columns
    ).select('insCode', *expected)

    return df.join(
        pivoted,
        on='insCode',
        how='left',
        maintain_order='left',
    )


async def get_market_watch(
    h_even=0,
    ref_id=0,
    with_best_limits=True,
    show_traded=False,
    unstack_best_limits=False,
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
        f'&RefID={ref_id}',
        fa=True,
    )

    df = _DataFrame(j['marketwatch'], schema=_MARKET_WATCH_SCHEMA)

    if 'pe' in df.columns:
        df = df.with_columns(
            _col('pe').replace('-', None).cast(_Float64, strict=False)
        )

    if with_best_limits and unstack_best_limits:
        df = _unstack_market_watch_best_limits(df)

    return df.lazy()


_CLIENT_TYPE_ALL_SCHEMA = {
    'insCode': _String,
    'buy_I_Volume': _Float64,
    'buy_N_Volume': _Float64,
    'buy_DDD_Volume': _Float64,
    'buy_CountI': _Int64,
    'buy_CountN': _Int64,
    'buy_CountDDD': _Int64,
    'sell_I_Volume': _Float64,
    'sell_N_Volume': _Float64,
    'sell_CountI': _Int64,
    'sell_CountN': _Int64,
}


async def get_client_type_all() -> _LazyFrame:
    """This function uses the new market watch API. Replaces client_type_all."""
    j = await _api('ClientType/GetClientTypeAll')
    if len(j.keys()) > 1:
        _logger.warning(
            f'Unexpected keys in get_client_type_all response: {j.keys()=}'
        )
    return _LazyFrame(j['clientTypeAllDto'], schema=_CLIENT_TYPE_ALL_SCHEMA)


async def get_inst_value_all_inst_all_param() -> _LazyFrame:
    """This function uses the new market watch API. Replaces key_stats function."""
    j = await _api('MarketData/GetInstValueAllInstAllParam')
    if len(j.keys()) > 1:
        _logger.warning(
            f'Unexpected keys in get_inst_value_all_inst_all_param response: {j.keys()=}'
        )
    return _DataFrame(j['instValueAllInstAllParam']).lazy()


CLOSING_PRICE_DAILY_ALL_SCHEMA = {
    'offset': _Int64,
    'priceMin': _Float64,
    'priceMax': _Float64,
    'priceYesterday': _Float64,
    'priceFirst': _Float64,
    'id': _Int64,
    'insCode': _String,
    'dEven': _Int64,
    'hEven': _Int64,
    'pClosing': _Float64,
    'iClose': _Boolean,
    'yClose': _Boolean,
    'pDrCotVal': _Float64,
    'zTotTran': _Float64,
    'qTotTran5J': _Float64,
    'qTotCap': _Float64,
}


async def closing_prices_daily_all() -> _LazyFrame:
    """Get daily closing prices for all instruments."""
    j = await _api('ClosingPrice/GetClosingPriceDailyAllInst')
    return _LazyFrame(
        j['closingPriceDailyAllInst'], schema=CLOSING_PRICE_DAILY_ALL_SCHEMA
    )


class MarketWatch:
    __slots__ = (
        'df',
        'init_callback',
        'init_kwargs',
        'interval',
        'market_state',
        'plus_callback',
        'plus_kwargs',
        'update_event',
    )

    @_deprecated('use MarketWatchNew instead')
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
        self.df and keep it up-to-date while the watch is running.
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
        self.df = None

    @property
    def lf(self) -> _LazyFrame | None:
        if (df := self.df) is not None:
            return df.lazy()

    @lf.setter
    def lf(self, lf: _LazyFrame | None):
        if lf is not None:
            self.df = lf.collect()
        else:
            self.df = None

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
                _coalesce([_col(f'{col}_limit_update'), _col(col)]).alias(col)
                for col in update_cols
            ]
            if limit_exprs:
                lf = lf.with_columns(limit_exprs).drop(
                    [f'{col}_limit_update' for col in update_cols]
                )

        new_prices = mwp_get('new_prices')
        if new_prices is not None:
            lf = _concat([lf, new_prices], how='diagonal')

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
                        _coalesce([_col(col), _col(base_col)]).alias(base_col)
                    )

            if update_exprs:
                lf = lf.with_columns(update_exprs).drop(drop_cols)
        self.df = lf.collect()

    async def start(self):
        update_event = self.update_event
        set_event = update_event.set
        clear_event = update_event.clear

        while True:
            try:
                with warns(DeprecationWarning):
                    mwi = await market_watch_init(**self.init_kwargs)  # ty: ignore[deprecated]
            except Exception as e:
                _logger.error(f'{e!r} while awaiting market_watch_init')
                await _sleep(self.interval)
                continue
            break

        self.init_callback(mwi)

        df = self.df
        if df is not None:
            heven = df.select('heven').max().item() or 0
        else:
            heven = 0

        refid = mwi['refid']
        set_event()
        clear_event()

        while True:
            await _sleep(self.interval)
            try:
                with warns(DeprecationWarning):
                    mwp = await market_watch_plus(  # ty: ignore[deprecated]
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
                heven = max(heven, pu_max)
            if (np := mwp.get('new_prices')) is not None:
                np_max = np.select('heven').max().collect().item() or 0
                heven = max(heven, np_max)

            set_event()
            clear_event()


# Most names generated from
# tsetmc/dev/tsetmc_source_files/MWNewOldMigration.js
_NEW_MW_COL_NAMES_TO_OLD = {
    'insCode': 'ins_code',
    'lva': 'l18',
    'lvc': 'l30',
    'pdv': 'pl',
    'pcl': 'pc',
    'pc': 'plc',
    'pcpc': 'pcc',
    'ztt': 'tno',
    'qtj': 'tvol',
    'qtc': 'tval',
    'pmn': 'pmin',
    'pmx': 'pmax',
    'pMin': 'tmin',
    'pMax': 'tmax',
    'bv': 'bvol',
    'csv': 'cs',
    'ztd': 'z',
    'pmd1': 'pd1',
    'qmd1': 'qd1',
    'zmd1': 'zd1',
    'pmo1': 'po1',
    'qmo1': 'qo1',
    'zmo1': 'zo1',
    'pmd2': 'pd2',
    'qmd2': 'qd2',
    'zmd2': 'zd2',
    'pmo2': 'po2',
    'qmo2': 'qo2',
    'zmo2': 'zo2',
    'pmd3': 'pd3',
    'qmd3': 'qd3',
    'zmd3': 'zd3',
    'pmo3': 'po3',
    'qmo3': 'qo3',
    'zmo3': 'zo3',
    'pmd4': 'pd4',
    'qmd4': 'qd4',
    'zmd4': 'zd4',
    'pmo4': 'po4',
    'qmo4': 'qo4',
    'zmo4': 'zo4',
    'pmd5': 'pd5',
    'qmd5': 'qd5',
    'zmd5': 'zd5',
    'pmo5': 'po5',
    'qmo5': 'qo5',
    'zmo5': 'zo5',
    'yVal': 'yval',
    'pRedTran': 'predtran',
    'buyOP': 'buyop',
    'cGrValCot': 'cgrvalcot',
    'hEven': 'heven',
    # Client type
    'buy_CountN': 'n_buy_count',
    'buy_CountI': 'l_buy_count',
    'buy_N_Volume': 'n_buy_volume',
    'buy_I_Volume': 'l_buy_volume',
    'sell_CountN': 'n_sell_count',
    'sell_CountI': 'l_sell_count',
    'sell_N_Volume': 'n_sell_volume',
    'sell_I_Volume': 'l_sell_volume',
}


@_overload
def adapt_for_old_watch_consumers(
    mw_df: _DataFrame, str_yval: bool
) -> _DataFrame: ...
@_overload
def adapt_for_old_watch_consumers(
    mw_df: _LazyFrame, str_yval: bool
) -> _LazyFrame: ...
def adapt_for_old_watch_consumers(
    mw_df: _LazyFrame | _DataFrame, str_yval: bool = True
):
    """Adapt MarketWatchNew.df for consumers of the old MarketWatch.df.

    Renames columns to their old API equivalents. Best-limit data must
    already be unstacked to be renamed, otherwise they will remain unchanged.

    Casts yval to string when str_yval is True, matching market_watch_init.
    """
    mw_df = mw_df.rename(_NEW_MW_COL_NAMES_TO_OLD, strict=False)
    if str_yval and 'yval' in mw_df.collect_schema():
        mw_df = mw_df.with_columns(_col('yval').cast(_String))
    return mw_df


class MarketWatchNew:
    __slots__ = (
        'df',
        'h_even',
        'interval',
        'ref_id',
        'update_event',
    )

    def __init__(
        self,
        *,
        interval=1,
        h_even=0,
        ref_id=0,
    ):
        """Create an object that helps with watching the market watch.

        :param interval: The polling interval.
        :param h_even: Initial hEven cursor.
        :param ref_id: Initial RefID cursor.

        Each time new data is received, self.update_event will be set.
        Users can wait for this event to get notified of updates.

        To stop the watch, cancel the task running self.start().
        """
        self.interval = interval
        self.h_even = h_even
        self.ref_id = ref_id
        self.update_event = _Event()
        self.df = None

    def update_cursors(self, df: _DataFrame) -> None:
        """Update cursors from an unstacked market-watch DataFrame."""
        if df.is_empty():
            return

        rid_cols = [f'rid{i}' for i in range(1, 6)]

        exprs = [
            _col('hEven').max(),
            _max_horizontal(*(_col(col) for col in rid_cols)).max(),
        ]

        h_even, ref_id = df.select(exprs).row(0)

        if h_even is not None:
            self.h_even = max(self.h_even, h_even)

        if ref_id is not None:
            self.ref_id = max(self.ref_id, ref_id)

    def handle_update(self, update: _DataFrame) -> None:
        """Merge new market-watch data, preserving missing best-limit levels."""
        current = self.df

        if current is None or current.is_empty():
            self.df = update.drop([f'_present{n}' for n in range(1, 6)])
            return

        if update.is_empty():
            return

        best_limit_fields = [
            field.name for field in _BL_DS_STRUCT.fields if field.name != 'n'
        ]

        best_limit_columns = [
            f'{field}{n}' for field in best_limit_fields for n in range(1, 6)
        ]

        presence_columns = [f'_present{n}' for n in range(1, 6)]

        # Retrieve previous best-limit values for matching instruments.
        previous = current.select(
            'insCode',
            *best_limit_columns,
        )

        merged = update.join(
            previous,
            on='insCode',
            how='left',
            suffix='_old',
        )

        # Only overwrite a level when it is present in the new response.
        merged = merged.with_columns(
            _when(_col(f'_present{n}').fill_null(False))
            .then(_col(f'{field}{n}'))
            .otherwise(_col(f'{field}{n}_old'))
            .alias(f'{field}{n}')
            for n in range(1, 6)
            for field in best_limit_fields
        ).drop(
            *presence_columns,
            *[f'{col}_old' for col in best_limit_columns],
        )

        self.df = _concat(
            [current, merged],
            how='diagonal',
        ).unique(
            subset='insCode',
            keep='last',
            maintain_order=True,
        )

    async def start(self):
        while True:
            try:
                lf = await get_market_watch(
                    h_even=self.h_even,
                    ref_id=self.ref_id,
                    with_best_limits=True,
                    unstack_best_limits=True,
                )
            except _ClientResponseError as e:
                _logger.warning(
                    f'{e.status} status while awaiting get_market_watch'
                )
                continue
            except _ClientConnectorDNSError as e:
                _logger.warning(f'{e!r} while awaiting get_market_watch')
                continue
            except Exception as e:
                _logger.exception(f'{e!r} while awaiting get_market_watch')
                continue
            else:
                df = lf.collect()
                self.update_cursors(df)
                self.handle_update(df)

                update_event = self.update_event
                update_event.set()
                update_event.clear()
            finally:
                await _sleep(self.interval)
