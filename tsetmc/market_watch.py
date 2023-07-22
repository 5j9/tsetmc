from asyncio import sleep as _sleep
from collections.abc import Callable as _Callable
from io import BytesIO as _BytesIO, StringIO as _StringIO
from logging import error as _error
from typing import Any as _Any

from numpy import nan as _nan
from pandas import read_html as _read_html, to_numeric as _to_numeric

import tsetmc as _tsetmc
from tsetmc import (
    _csv2df,
    _DataFrame,
    _get_data,
    _get_par_tree,
    _jstrptime,
    _MarketState,
    _parse_market_state,
    _parse_ombud_messages,
    _TypedDict,
)

_BEST_LIMITS_NAMES = ('ins_code', 'number', 'zo', 'zd', 'pd', 'po', 'qd', 'qo')
_PRICE_DTYPES = {
    'ins_code': 'string',
    'isin': 'string',
    'l18': 'string',
    'l30': 'string',
    'heven': 'int32',
    'pf': 'int64',
    'pc': 'int64',
    'pl': 'int64',
    'tno': 'int64',
    'tvol': 'int64',
    'tval': 'int64',
    'pmin': 'int64',
    'pmax': 'int64',
    'py': 'int64',
    'eps': 'float64',
    'bvol': 'int64',
    'visitcount': 'int64',
    # 0-7 http://redirectcdn.tsetmc.com/Site.aspx?ParTree=1114111118&LnkIdn=83
    'flow': 'int16',
    # 1-98, see tsetmc.general.cs_codes()
    'cs': 'int16',
    'tmax': 'float64',
    'tmin': 'float64',
    'z': 'int64',
    # 67-701 http://redirectcdn.tsetmc.com/Site.aspx?ParTree=1114111118&LnkIdn=83
    'yval': 'int16',
    'predtran': 'float64',
    'buyop': 'Int64',
}
_PRICE_COLUMNS = _PRICE_DTYPES.keys()
_PRICE_UPDATE_COLUMNS = ('ins_code', *(*_PRICE_COLUMNS,)[4:13])


class _MarketWatchInit(_TypedDict, total=False):
    prices: _DataFrame
    best_limits: _DataFrame
    market_state: _MarketState
    refid: int


async def market_watch_init(
    *, market_state=True, prices=True, best_limits=True, join=True
) -> _MarketWatchInit:
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
    _, market_state_str, states, price_rows, refid = text.split('@')
    result = {'refid': int(refid)}
    if prices:
        result['prices'] = price_df = _csv2df(
            _StringIO(states),
            names=_PRICE_COLUMNS,
            index_col='ins_code',
            dtype=_PRICE_DTYPES,
        )
    if best_limits:
        result['best_limits'] = best_limits_df = _csv2df(
            _StringIO(price_rows),
            names=_BEST_LIMITS_NAMES,
            dtype={'ins_code': 'string'},
            index_col=('ins_code', 'number'),
        )
    if join and prices and best_limits:
        # merge multiple rows sharing the same `row` number into one row.
        # a fascinating solution from https://stackoverflow.com/a/53563551/2705757
        # noinspection PyUnboundLocalVariable
        best_limits_df = best_limits_df.unstack(fill_value=0).sort_index(
            axis=1, level=1
        )
        best_limits_df.columns = [f'{c}{i}' for c, i in best_limits_df.columns]
        # noinspection PyUnboundLocalVariable
        joined = best_limits_df.join(price_df)
        # joined_df.index = to_numeric(joined_df.index, downcast='unsigned')
        result['prices'] = joined
    if market_state:
        result['market_state'] = _parse_market_state(market_state_str)
    return result


class _MarketWatchPlus(_TypedDict, total=False):
    new_prices: _DataFrame
    price_updates: _DataFrame
    best_limits: _DataFrame
    messages: list[str]
    market_state: _MarketState
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
) -> _MarketWatchPlus:
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
    except ValueError:
        _error(f'{text = }')
        raise
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
            try:
                df = _DataFrame(lst, columns=_PRICE_COLUMNS, copy=False)
            except ValueError as e:
                _error(f'{text = }')
                raise e
            df['eps'].replace('', _nan, inplace=True)
            df['predtran'].replace('', _nan, inplace=True)
            df['buyop'].replace('', _nan, inplace=True)
            df = df.astype(_PRICE_DTYPES, False)
            df.set_index('ins_code', inplace=True)
            result['new_prices'] = df
        if price_updates:
            lst = [ip for ip in inst_prices if len(ip) == 10]
            df = _DataFrame(lst, columns=_PRICE_UPDATE_COLUMNS, copy=False)
            df.ins_code = df.ins_code.astype('string')
            df.set_index('ins_code', inplace=True)
            df = df.astype('int64', False)
            result['price_updates'] = df
    if best_limits:
        result['best_limits'] = _csv2df(
            _StringIO(best_limit),
            index_col='ins_code',
            names=_BEST_LIMITS_NAMES,
            dtype={'ins_code': 'string'},
        )
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
    df = _read_html(text)[0]
    df['date'] = (df['تاریخ'] + ' ' + df['زمان']).apply(
        _jstrptime, format='%Y/%m/%d %H:%M:%S'
    )
    df.drop(columns=['تاریخ', 'زمان'], inplace=True)
    return df


class MarketWatch:
    __slots__ = (
        'interval',
        'init_callback',
        'init_kwargs',
        'plus_callback',
        'plus_kwargs',
        'refid',
        'heven',
    )

    def __init__(
        self,
        *,
        init_kwargs: dict = None,
        plus_kwargs: dict = None,
        init_callback: _Callable[[_MarketWatchInit], _Any],
        plus_callback: _Callable[[_MarketWatchPlus], _Any],
        interval=1,
    ):
        """Create an object that helps with watching the market watch.

        :param init_kwargs: kwargs to be passed to market_watch_init
        :param plus_kwargs: kwargs to be passed to market_watch_plus
        :param init_callback: function to be called with the result of
            market_watch_init. This function should return True, otherwise the
            watch will be stopped.
        :param plus_callback: function to be called with the result of
            market_watch_plus. This function should return True, otherwise the
            watch will be stopped.
        :param interval: The sleep interval.

        To stop the watch, set `plus_callback` to `lambda a: False`.
        """
        self.interval = interval
        self.init_kwargs: dict = {} if init_kwargs is None else init_kwargs
        self.init_callback = init_callback
        self.plus_kwargs: dict = {} if plus_kwargs is None else plus_callback
        self.plus_callback = plus_callback

    async def start(self):
        while True:
            try:
                mwi = await market_watch_init(**self.init_kwargs)
            except Exception as e:
                _error(
                    f'Exception awaiting market_watch_init: {e = }'
                    f'\n{_tsetmc._LAST_GET = }'
                )
                await _sleep(self.interval)
                continue
            break

        # noinspection PyUnboundLocalVariable
        if not self.init_callback(mwi):
            return

        heven = mwi['prices'].heven.max()
        refid = mwi['refid']

        while True:
            await _sleep(self.interval)
            try:
                mwp = await market_watch_plus(
                    refid=refid, heven=heven, **self.plus_kwargs
                )
            except Exception as e:
                _error(
                    f'Exception awaiting market_watch_plus: {e = }'
                    f'\n{_tsetmc._LAST_GET = }'
                )
                continue  # _sleep and retry
            if not self.plus_callback(mwp):
                return
            refid = mwp['refid']
            heven = max(
                mwp['price_updates'].heven.max(),
                mwp['new_prices'].heven.max(),
            )
