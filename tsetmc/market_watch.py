from numpy import nan as _nan

from . import _get_data, _get_par_tree, _parse_market_state, _TypedDict, \
    _MarketState, _csv2df, _StringIO, _BytesIO, _DF, _DataFrame, \
    _parse_ombud_messages, _to_numeric, _read_html, _jstrptime


_PRICE_INDEX_COLS = ['ins_code', 'isin', 'l18', 'l30']
_BEST_LIMITS_NAMES = ('ins_code', 'number', 'zo', 'zd', 'pd', 'po', 'qd', 'qo')
_PRICE_DTYPES = {
    'ins_code': 'uint64',
    'isin': 'string',
    'l18': 'string',
    'l30': 'string',
    'heven': 'uint32',
    'pf': 'uint64',
    'pc': 'uint64',
    'pl': 'uint64',
    'tno': 'uint64',
    'tvol': 'uint64',
    'tval': 'uint64',
    'pmin': 'uint64',
    'pmax': 'uint64',
    'py': 'uint64',
    'eps': 'float64',
    'bvol': 'uint64',
    'visitcount': 'uint64',
    # 0-7 /dev/docs/Instrument.html
    'flow': 'uint8',
    # 1-98, see tsetmc.general.cs_codes()
    'cs': 'uint8',
    'tmax': 'float64',
    'tmin': 'float64',
    'z': 'uint64',
    # 67-701 /dev/docs/Instrument.html
    'yval': 'uint16',
}
_PRICE_COLUMNS = _PRICE_DTYPES.keys()
_PRICE_UPDATE_COLUMNS = ('ins_code', *(*_PRICE_COLUMNS,)[4:13])


class _MarketWatchInit(_TypedDict, total=False):
    prices: _DataFrame
    best_limits: _DataFrame
    market_state: _MarketState


async def market_watch_init(
    *, market_state=True, prices=True, best_limits=True, join=True
) -> _MarketWatchInit:
    """Return the market status which are the info used in creating filters.

    If `join` is True, `best_limits` will be joined to `prices`, otherwise
        it will be returned as a separate dataframes.

    For more information about filters see:
        http://tsetmc.com/Loader.aspx?ParTree=15131F
    For the meaning of column names in the returned DataFrame see:
        https://cdn.tsetmc.com/Site.aspx?ParTree=151713
        For `flow` and `yval` codes see: /dev/docs/Instrument.html
        For `heven` see: /dev/docs/IndexB1LastDayOneInst.html
            (it's the time of the last transaction in HHMMSS format)
    """
    # todo: use content?
    text = await _get_data('MarketWatchInit.aspx?h=0&r=0', fa=True)
    _, market_state_str, states, price_rows, _ = text.split('@')
    result = {}
    if prices:
        result['prices'] = price_df = _csv2df(
            _StringIO(states),
            names=_PRICE_COLUMNS,
            index_col=_PRICE_INDEX_COLS, dtype=_PRICE_DTYPES)
    if best_limits:
        result['best_limits'] = best_limits_df = _csv2df(
            _StringIO(price_rows), names=_BEST_LIMITS_NAMES,
            dtype='uint64', index_col=('ins_code', 'number'))
    if join and prices and best_limits:
        # merge multiple rows sharing the same `row` number into one row.
        # a fascinating solution from https://stackoverflow.com/a/53563551/2705757
        # noinspection PyUnboundLocalVariable
        best_limits_df = best_limits_df.unstack(fill_value=0).sort_index(axis=1, level=1)
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
    heven: int, refid: int,
    *, messages=True, market_state=True,
    new_prices=True, price_updates=True, best_limits=True,
) -> _MarketWatchPlus:
    # See dev/tsetmc_source_files/market_watch.html
    # for how the response is parsed in the browser.
    text = await _get_data(
        f'MarketWatchPlus.aspx?h={5 * (heven // 5)}&r={25 * (refid // 25)}',
        fa=True
    )
    handle_msg, update_fast_view, inst_price, best_limit, refid = text.split('@')
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
            df = _DF(lst, columns=_PRICE_COLUMNS)
            df['eps'].replace('', _nan, inplace=True)
            df = df.astype(_PRICE_DTYPES, False)
            df.set_index(_PRICE_INDEX_COLS, inplace=True)
            result['new_prices'] = df
        if price_updates:
            lst = [ip for ip in inst_prices if len(ip) == 10]
            df = _DF(lst, columns=_PRICE_UPDATE_COLUMNS)
            df = df.astype('uint64', False)
            df.set_index('ins_code', inplace=True)
            result['price_updates'] = df
    if best_limits:
        result['best_limits'] = _csv2df(
            _StringIO(best_limit), index_col='ins_code',
            names=_BEST_LIMITS_NAMES, dtype='uint64')
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
    # dtype='uint64' param cannot be used due to
    # https://github.com/pandas-dev/pandas/issues/44835
    df = _DF(data, columns=(
        'ins_code', 'n', 'pc', 'pl', 'tno', 'tvol', 'tval'
        , 'pmin', 'pmax', 'py', 'pf')).astype('uint64', False)
    df.set_index(['ins_code', 'n'], inplace=True)
    return df


async def client_type_all() -> _DataFrame:
    """Return client types (natural/legal stats) as a DataFrame.

    In column names `n_` prefix stands for natural and `l_` for legal.
    """
    content = await _get_data('ClientTypeAll.aspx')
    df = _csv2df(
        _BytesIO(content), names=(
            'ins_code', 'n_buy_count', 'l_buy_count', 'n_buy_volume', 'l_buy_volume'
            , 'n_sell_count', 'l_sell_count', 'n_sell_volume', 'l_sell_volume')
        , dtype='uint64', index_col='ins_code')
    return df


async def key_stats() -> _DataFrame:
    """Return key statistics as a DataFrame.

    For the meaning of column names refer to
        http://www.tsetmc.com/Site.aspx?ParTree=151715&LnkIdn=3199 or
        http://cdn.tsetmc.com/Site.aspx?ParTree=151713
    """
    content = await _get_data('InstValue.aspx?t=a')
    data = _split_id_rows(content, id_row_len=3)
    df = _DF(data, columns=('ins_code', 'n', 'value'))
    # noinspection PyTypeChecker
    df = df.apply(_to_numeric)
    df = df.pivot('ins_code', 'n', 'value')
    df.columns = [f'is{c}' for c in df.columns]
    return df


async def ombud_messages(
    *, top: int | str = None, flow: int | str = None,
    containing: str = None, sh_date: str = None,
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
        _jstrptime, format='%Y/%m/%d %H:%M:%S')
    df.drop(columns=['تاریخ', 'زمان'], inplace=True)
    return df
