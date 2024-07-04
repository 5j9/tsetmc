from asyncio import Event as _Event, sleep as _sleep
from collections.abc import Callable as _Callable
from io import BytesIO as _BytesIO, StringIO as _StringIO
from typing import Any as _Any

from aiohutils.pd import html_to_df as _html_to_df
from numpy import nan as _nan
from pandas import concat as _concat, to_numeric as _to_numeric

from tsetmc import (
    MarketState,
    _csv2df,
    _DataFrame,
    _get_data,
    _get_par_tree,
    _jstrptime,
    _logger,
    _parse_market_state,
    _save_last_content,
    _TypedDict,
)

_BEST_LIMITS_NAMES = ('ins_code', 'number', 'zo', 'zd', 'pd', 'po', 'qd', 'qo')
_COMMON_DTYPES = {
    'heven': 'int32',
    'pf': 'int64',
    'pc': 'int64',
    'pl': 'int64',
    'tno': 'int64',
    'tvol': 'int64',
    'tval': 'int64',
    'pmin': 'int64',
    'pmax': 'int64',
}
_PRICE_DTYPES_23 = {
    'ins_code': 'string',
    'isin': 'string',
    'l18': 'string',
    'l30': 'string',
    **_COMMON_DTYPES,
    'py': 'int64',
    'eps': 'float64',
    'bvol': 'int64',
    'visitcount': 'int64',
    # 0-7 http://redirectcdn.tsetmc.com/Site.aspx?ParTree=1114111118&LnkIdn=83
    'flow': 'int16',
    # 1-98, see tsetmc.general.cs_codes()
    'cs': 'string',
    'tmax': 'float64',
    'tmin': 'float64',
    'z': 'int64',
    # 67-701 http://redirectcdn.tsetmc.com/Site.aspx?ParTree=1114111118&LnkIdn=83
    'yval': 'int16',
}
_PRICE_DTYPES_25 = _PRICE_DTYPES_23 | {'predtran': 'float64', 'buyop': 'Int64'}
_PRICE_UPDATE_COLUMNS = {'ins_code': 'string', **_COMMON_DTYPES}


class MarketWatchInit(_TypedDict, total=False):
    prices: _DataFrame
    best_limits: _DataFrame
    market_state: MarketState
    refid: int


def _unstack_best_limits(bl: _DataFrame) -> _DataFrame:
    # merge multiple rows sharing the same `row` number into one row.
    # a fascinating solution from https://stackoverflow.com/a/53563551/2705757
    bl = bl.unstack()
    bl.columns = [f'{name}{number}' for name, number in bl.columns]
    return bl


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
    try:
        _, market_state_str, states, price_rows, refid = text.split('@')
    except ValueError:
        # ValueError: not enough values to unpack (expected 5, got 1)
        _logger.error(text)
        raise

    result = {'refid': int(refid)}
    if prices:
        result['prices'] = price_df = _csv2df(
            _StringIO(states),
            names=_PRICE_DTYPES_25,
            index_col='ins_code',
            dtype=_PRICE_DTYPES_25,
        )
    if best_limits:
        result['best_limits'] = bl = _csv2df(
            _StringIO(price_rows),
            names=_BEST_LIMITS_NAMES,
            dtype={'ins_code': 'string'},
            index_col=('ins_code', 'number'),
        )
    if join and prices and best_limits:
        # noinspection PyUnboundLocalVariable
        bl = _unstack_best_limits(bl)
        # noinspection PyUnboundLocalVariable
        joined = bl.join(price_df)
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
        inst_prices = [ip.split(',') for ip in inst_price.split(';')]
        if new_prices:
            lst = [ip for ip in inst_prices if len(ip) != 10]
            twenty_five_cols = not lst or len(lst[0]) == 25
            try:
                # noinspection PyTypeChecker
                # https://github.com/pandas-dev/pandas/issues/57798
                df = _DataFrame(
                    lst,
                    columns=_PRICE_DTYPES_25
                    if twenty_five_cols is True
                    else _PRICE_DTYPES_23,
                    copy=False,
                )
            except ValueError as e:
                _save_last_content(f'{e}')
                raise e
            df['eps'] = df['eps'].replace('', _nan)
            if twenty_five_cols is True:
                df['predtran'] = df['predtran'].replace('', _nan)
                df['buyop'] = df['buyop'].replace('', _nan)
                df = df.astype(_PRICE_DTYPES_25)
            else:
                df = df.astype(_PRICE_DTYPES_23)
            df.set_index('ins_code', inplace=True)
            result['new_prices'] = df
        if price_updates:
            lst = [ip for ip in inst_prices if len(ip) == 10]
            # noinspection PyTypeChecker
            # https://github.com/pandas-dev/pandas/issues/57798
            df = _DataFrame(lst, columns=_PRICE_UPDATE_COLUMNS, copy=False)
            df = df.astype(_PRICE_UPDATE_COLUMNS)
            df.ins_code = df.ins_code.astype('string')
            df.set_index('ins_code', inplace=True)
            result['price_updates'] = df
    if best_limits:
        bl = _csv2df(
            _StringIO(best_limit),
            index_col=('ins_code', 'number'),
            names=_BEST_LIMITS_NAMES,
            dtype={'ins_code': 'string'},
        )
        if best_limits_prepare_join:
            bl = _unstack_best_limits(bl)
        result['best_limits'] = bl
    result['refid'] = int(refid)
    return result


def _split_id_rows(content: bytes, id_row_len: int) -> list:
    data = content.split(b';')
    for i, datum in enumerate(data):
        items = datum.split(b',')
        if len(items) == id_row_len:
            id_ = items[0]
        else:
            # noinspection PyUnboundLocalVariable
            items.insert(0, id_)
        # noinspection PyTypeChecker
        data[i] = items
    return data


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
    df = _DataFrame(
        data,
        columns=columns,
        copy=False,
    )
    df[columns[1:]] = df[columns[1:]].apply(_to_numeric)
    df.ins_code = df.ins_code.astype('string')
    df.set_index(['ins_code', 'n'], inplace=True)
    return df


async def client_type_all() -> _DataFrame:
    """Return client types (natural/legal stats) as a DataFrame.

    In column names `n_` prefix stands for natural and `l_` for legal.
    """
    content = await _get_data('ClientTypeAll.aspx')
    df = _csv2df(
        _BytesIO(content),
        names=(
            'ins_code',
            'n_buy_count',
            'l_buy_count',
            'n_buy_volume',
            'l_buy_volume',
            'n_sell_count',
            'l_sell_count',
            'n_sell_volume',
            'l_sell_volume',
        ),
        index_col='ins_code',
        dtype={'ins_code': 'string'},
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
    df = _DataFrame(data, columns=('ins_code', 'n', 'value'), copy=False)
    df.set_index(df.pop('ins_code').astype('string'), inplace=True)
    df = df.apply(_to_numeric)
    df = df.pivot(columns='n', values='value')
    df.columns = [f'is{c}' for c in df.columns]
    return df


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
        if bl is not None:
            self.df.update(bl)

        np = d.get('new_prices')
        if np is not None:
            self.df = _concat([self.df, np])

        pu = d.get('price_updates')
        if pu is not None:
            self.df.update(pu)

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
        heven = mwi['prices'].heven.max()
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
                mwp['price_updates'].heven.max(),
                mwp['new_prices'].heven.max(),
            )
            set_event()
            clear_event()
