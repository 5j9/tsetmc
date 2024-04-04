from asyncio import Event as _Event, sleep as _sleep
from collections.abc import Callable as _Callable
from io import BytesIO as _BytesIO, StringIO as _StringIO
from typing import Any as _Any

from aiohutils.pd import html_to_df as _html_to_df
from polars import (
    Float64 as _Float64,
    Int8 as _Int8,
    Int16 as _Int16,
    Int32 as _Int32,
    Int64 as _Int64,
    String as _String,
    concat as _concat,
)

from tsetmc import (
    MarketState,
    _colon_separated,
    _DataFrame,
    _get_data,
    _get_par_tree,
    _jstrptime,
    _logger,
    _parse_market_state,
    _parse_ombud_messages,
    _save_last_content,
    _TypedDict,
)

_BEST_LIMITS_DTYPES = {
    'ins_code': _String,
    'row': _Int8,
    'zo': _Int64,
    'zd': _Int64,
    'pd': _Float64,
    'po': _Float64,
    'qd': _Int64,
    'qo': _Int64,
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
    # 0-7 http://redirectcdn.tsetmc.com/Site.aspx?ParTree=1114111118&LnkIdn=83
    'flow': _Int16,
    # 1-98, see tsetmc.general.cs_codes()
    'cs': _String,
    'tmax': _Float64,
    'tmin': _Float64,
    'z': _Int64,
    # 67-701 http://redirectcdn.tsetmc.com/Site.aspx?ParTree=1114111118&LnkIdn=83
    'yval': _Int16,
}
_PRICE_DTYPES_25 = _PRICE_DTYPES_23 | {'predtran': _Float64, 'buyop': _Int64}
_PRICE_UPDATE_SCHEMA = {'ins_code': _String, **_COMMON_DTYPES}


class MarketWatchInit(_TypedDict, total=False):
    prices: _DataFrame
    best_limits: _DataFrame
    market_state: MarketState
    refid: int


def _unstack_best_limits(bl: _DataFrame) -> _DataFrame:
    pivot = bl.pivot(
        index=['ins_code'],
        columns=['row'],
        values=['zo', 'zd', 'po', 'pd', 'qo', 'qd'],
    )
    pivot.columns = [c.replace('_row_', '') for c in pivot.columns]
    return pivot


async def market_watch_init(
    *, market_state=True, prices=True, best_limits=True, join=True
) -> MarketWatchInit:
    """Return the market status which are the info used in creating filters.

    If `join` is True, `best_limits` will be joined to `prices`, otherwise
        it will be returned as a separate dataframes.

    For more information about filters see:
        http://tsetmc.com/Loader.aspx?ParTree=15131F
    For the meaning of column names in the returned DataFrame refer to:
        http://tsetmc.com/Site.aspx?ParTree=151713
        For persian translation of `flow` and `yval` codes use
        `tsetmc.docs.instrument`.
        `heven` is the time of the last transaction in HHMMSS format.
    """
    text = await _get_data('MarketWatchInit.aspx?h=0&r=0', fa=True)
    # todo: ValueError('not enough values to unpack (expected 5, got 1)') while awaiting market_watch_init
    _, market_state_str, states, price_rows, refid = text.split('@')
    result = {'refid': int(refid)}
    if prices:
        result['prices'] = price_df = _colon_separated(
            _StringIO(states),
            schema=_PRICE_DTYPES_25,
        )
    if best_limits:
        result['best_limits'] = bl = _colon_separated(
            _StringIO(price_rows),
            schema=_BEST_LIMITS_DTYPES,
        )
    if join and prices and best_limits:
        # noinspection PyUnboundLocalVariable
        bl = _unstack_best_limits(bl)
        # noinspection PyUnboundLocalVariable
        joined = bl.join(price_df, on='ins_code')
        # joined_df.index = to_numeric(joined_df.index, downcast='unsigned')
        result['prices'] = joined
    if market_state:
        result['market_state'] = _parse_market_state(market_state_str)
    return result


class MarketWatchPlus(_TypedDict, total=False):
    new_prices: _DataFrame
    price_updates: _DataFrame
    best_limits: _DataFrame
    messages: list[str]
    market_state: MarketState
    refid: int


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
            inst_price,
            best_limit,
            refid,
        ) = text.split('@')
    except ValueError as e:
        _save_last_content(f'{e!r}')
        raise e
    result = {}
    if messages:
        # whenever a new id appears, users should try to fetch new messages
        # using relevant functions
        # todo: implement functions to fetch messages using message ids
        # NewMsgNotification, NewInsStateNotification, NewCodalNotification
        result['messages'] = handle_msg.split(',')
    if market_state:
        if update_fast_view != '':
            result['market_state'] = _parse_market_state(update_fast_view)
    if new_prices or price_updates:
        inst_prices = [
            [s if s else None for s in ip.split(',')]
            for ip in inst_price.split(';')
        ]
        if new_prices:
            lst = [ip for ip in inst_prices if len(ip) != 10]
            twenty_five_cols = not lst or len(lst[0]) == 25
            try:
                df = _DataFrame(
                    lst,
                    orient='row',
                    schema=(
                        _PRICE_DTYPES_25
                        if twenty_five_cols is True
                        else _PRICE_DTYPES_23
                    ),
                )
            except ValueError as e:
                _save_last_content(f'{e}')
                raise e
            result['new_prices'] = df
        if price_updates:
            lst = [ip for ip in inst_prices if len(ip) == 10]
            df = _DataFrame(lst, orient='row', schema=_PRICE_UPDATE_SCHEMA)
            result['price_updates'] = df
    if best_limits:
        bl = _colon_separated(
            _StringIO(best_limit), dtypes=_BEST_LIMITS_DTYPES
        )
        if best_limits_prepare_join:
            bl = _unstack_best_limits(bl)
        result['best_limits'] = bl
    result['refid'] = int(refid)
    return result


def _split_id_rows(csv: bytes, id_row_len: int) -> list:
    data = csv.decode().split(';')
    for i, datum in enumerate(data):
        items = datum.split(',')
        if len(items) == id_row_len:
            id_ = items[0]
        else:
            # noinspection PyUnboundLocalVariable
            items.insert(0, id_)
        # noinspection PyTypeChecker
        data[i] = items
    return data


_CLOSING_PRICE_SCHEMA = {
    'ins_code': _String,
    'n': _Int8,
    'pc': _Int64,
    'pl': _Int64,
    'tno': _Int64,
    'tvol': _Int64,
    'tval': _Int64,
    'pmin': _Int64,
    'pmax': _Int64,
    'py': _Int64,
    'pf': _Int64,
}


async def closing_price_all() -> _DataFrame:
    """Return price history dataframe.

    For the meaning of column names refer to
        http://cdn.tsetmc.com/Site.aspx?ParTree=151713
    This method returns the same set of information as `[ih]` variable in
        tsetmc filters. See:
            http://tsetmc.com/Site.aspx?ParTree=151715&LnkIdn=3197
    """
    content = await _get_data('ClosingPriceAll.aspx')
    data = _split_id_rows(content, id_row_len=11)
    return _DataFrame(data, schema=_CLOSING_PRICE_SCHEMA)


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


async def client_type_all() -> _DataFrame:
    """Return client types (natural/legal stats) as a DataFrame.

    In column names `n_` prefix stands for natural and `l_` for legal.
    """
    content = await _get_data('ClientTypeAll.aspx')
    df = _colon_separated(
        _BytesIO(content),
        schema=_CLIENT_TYPE_SCHEMA,
    )
    return df


async def key_stats() -> _DataFrame:
    """Return key statistics as a DataFrame.

    For the meaning of column names refer to
        http://www.tsetmc.com/Site.aspx?ParTree=151715&LnkIdn=3199 or
        http://cdn.tsetmc.com/Site.aspx?ParTree=151713
    """
    content = await _get_data('InstValue.aspx?t=a')
    data = _split_id_rows(content, id_row_len=3)
    df = _DataFrame(
        data, schema={'ins_code': _String, 'n': _Int64, 'value': _Int64}
    )
    df = df.pivot(index='ins_code', columns='n', values='value')
    return df


async def ombud_messages(
    *,
    top: int | str = None,
    flow: int | str = None,
    containing: str = None,
    sh_date: str = None,
) -> _DataFrame:
    """Return ombud messages as a dataframe.

    :param top: How many messages to return.
    :param flow: Only return messages in the given market flow.
    :param containing: Only return messages containing this term.
    :param sh_date: Solar Hijri date string in 'YYYY-mm-dd' format.

    Note: the server ignores the `top` when `deven_persian` is given.
    """
    path = '151313'
    if flow is not None:
        path += f'&Flow={flow}'
    if top is not None:
        path += f'&top={top}'
    if sh_date is not None:
        path += f'&DevenPersian={sh_date}'
    if containing is not None:
        path += f'&Lval18AFC={containing}'
    return _parse_ombud_messages(await _get_par_tree(path))


async def status_changes(top: int | str) -> _DataFrame:
    text = await _get_par_tree(f'15131L&top={top}')
    df = _html_to_df(text)
    df['date'] = (df['تاریخ'] + ' ' + df['زمان']).apply(
        _jstrptime, format='%Y/%m/%d %H:%M:%S'
    )
    df.drop(columns=['تاریخ', 'زمان'], inplace=True)
    return df


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

    def __init__(
        self,
        *,
        init_kwargs: dict = None,
        plus_kwargs: dict = None,
        init_callback: _Callable[[MarketWatchInit], _Any] = None,
        plus_callback: _Callable[[MarketWatchPlus], _Any] = None,
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

    def _default_init_callback(self, d: dict):
        self.df = d.get('prices')
        self.market_state = d.get('market_state')

    def _default_plus_callback(self, d: dict):
        bl = d.get('best_limits')
        if not bl.is_empty():
            self.df = self.df.update(bl, on='ins_code')

        np = d.get('new_prices')
        if not np.is_empty():
            self.df = _concat([self.df, np])

        pu = d.get('price_updates')
        if not pu.is_empty():
            self.df = self.df.update(pu, on='ins_code')

        self.market_state = d.get('market_state')

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

        self.init_callback(mwi)  # noqa: F823
        heven = mwi['prices']['heven'].max()
        refid = mwi['refid']
        set_event()
        clear_event()

        while True:
            await _sleep(self.interval)
            try:
                mwp = await market_watch_plus(
                    refid=refid, heven=heven, **self.plus_kwargs
                )
            except Exception as e:
                _logger.error(f'{e!r} while awaiting market_watch_plus')
                continue  # _sleep and retry

            self.plus_callback(mwp)

            refid = mwp['refid']
            heven = max(
                mwp['price_updates']['heven'].max(),
                mwp['new_prices']['heven'].max() or 0,
            )
            set_event()
            clear_event()
