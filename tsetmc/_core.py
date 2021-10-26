from ast import literal_eval
from datetime import datetime
from functools import partial
from io import BytesIO, StringIO
from json import load
from logging import warning
from os.path import abspath
from re import compile as rc, findall
from typing import Union, TypedDict


from jdatetime import datetime as jdatetime
from pandas import read_csv, to_numeric, DataFrame, read_html, to_datetime
from requests import Session


strptime = datetime.strptime
jstrptime = jdatetime.strptime
j_ymd_parse = partial(jstrptime, format='%Y/%m/%d')
GET = Session().get
DB_PATH = abspath(f'{__file__}/../database/ids.json')

FARSI_NORM = ''.maketrans('يك', 'یک')
F = r'(-?\d+(?:\.\d+)?)'  # float pattern
# This regex is generated using dev/page_vars_regex_generator.py.
# Fix and update that script before making changes.
PAGE_VARS = rc(
    "TopInst='(?P<TopInst>[^,]*)',"
    "LVal18AFC='[^,]*',"
    "DEven='(?P<DEven>[^,]*)',"
    "LSecVal='(?P<LSecVal>[^,]*)',"
    "CgrValCot='(?P<CgrValCot>[^,]*)',"
    "Flow='(?P<Flow>[^,]*)',"
    "InstrumentID='(?P<InstrumentID>[^,]*)',"
    "InsCode='(?P<InsCode>[^,]*)',"
    'BaseVol=(?P<BaseVol>[^,]*),'
    "EstimatedEPS='(?P<EstimatedEPS>[^,]*)',"
    'ZTitad=(?P<ZTitad>[^,]*),'
    "CIsin='(?P<CIsin>[^,]*)',"
    "LVal18AFC='(?P<LVal18AFC>[^,]*)',"
    "CSecVal='(?P<CSecVal>[^,]*)',"
    "PdrCotVal='(?P<PdrCotVal>[^,]*)',"
    "PClosing='(?P<PClosing>[^,]*)',"
    "PSGelStaMax='(?P<PSGelStaMax>[^,]*)',"
    "PSGelStaMin='(?P<PSGelStaMin>[^,]*)',"
    "Title='(?P<Title>[^,]*)',"
    "FaraDesc ='(?P<FaraDesc>[^,]*)',"
    "MinWeek='(?P<MinWeek>[^,]*)',"
    "MaxWeek='(?P<MaxWeek>[^,]*)',"
    "MinYear='(?P<MinYear>[^,]*)',"
    "MaxYear='(?P<MaxYear>[^,]*)',"
    "QTotTran5JAvg='(?P<QTotTran5JAvg>[^,]*)',"
    "SectorPE='(?P<SectorPE>[^,]*)',"
    "KAjCapValCpsIdx='(?P<KAjCapValCpsIdx>[^,]*)',"
    'PriceMin=(?P<PriceMin>[^,]*),'
    'PriceMax=(?P<PriceMax>[^,]*),'
    'PriceYesterday=(?P<PriceYesterday>[^;]*);'
    "ThemeCount='(?P<ThemeCount>[^;]*)';"
    "ContractSize='(?P<ContractSize>[^;]*)';"
    "NAV='(?P<NAV>[^;]*)';"
    "PSR='(?P<PSR>[^;]*)';"
).search
TITLE_FULLMATCH = rc(r"(.*?) \(.*?\) \- ([^']*)").fullmatch
RELATED_COMPANIES = rc(r"var RelatedCompanies=(\[.*\]);").search
TRADE_HISTORY = rc(r"var TradeHistory=(\[.*\]);").search
STR_TO_NUM = partial(rc(rf"'{F}'").sub, r'\1')
INDEX_CHANGE_MATCH = rc(rf"<div[^>]*>(\()?{F}\)?</div>(?: {F}%)?").match
INDEX_TIMESTAMP_MATCH = rc(r'(\d\d)/(\d+)/(\d+) (\d\d):(\d\d):(\d\d)').match

with open(DB_PATH, encoding='utf8') as f:
    L18S: dict[str, str] = load(f)
INSCODES = {v[0]: v for v in L18S.values()}


def get_content(url) -> bytes:
    return GET(url).content


def fa_norm_text(url) -> str:
    # replace Arabic [ي ك] with Persian [ی ک]
    return get_content(url).decode().translate(FARSI_NORM)


class MarketWatchInitDict(TypedDict, total=False):
    dataframe: DataFrame
    market_last_transaction: jdatetime
    tset_status: str
    tset_index: float
    tset_index_change: float
    tse_tvol: float
    tse_tval: float
    tse_tno: float
    fb_status: str
    fb_tvol: float
    fb_tval: float
    fb_tno: int
    derivatives_status: int


class IntraDayDict(TypedDict, total=False):
    general: dict
    thresholds: DataFrame
    closings: DataFrame
    candles: DataFrame
    states: DataFrame
    trades: DataFrame
    holders: DataFrame
    yesterday_holders: DataFrame
    client_types: dict[str, int]
    best_limits: DataFrame


class Instrument:

    __slots__ = 'ins_code', 'l18', 'l30'

    def __init__(self, ins_code: int, l18: str = None, l30: str = None):
        self.ins_code = ins_code
        self.l18 = l18
        self.l30 = l30

    def __repr__(self):
        if self.l18 is None:
            return f'Instrument({self.ins_code})'
        return f"Instrument('{self.l18}')"

    def __eq__(self, other):
        return self.ins_code == other.ins_code

    def __hash__(self):
        return self.ins_code

    @staticmethod
    def from_l18(l18: str, /) -> 'Instrument':
        try:
            ins_code, _, l30 = L18S[l18]
        except KeyError:
            raise KeyError(
                'l18 not found in KNOWN_IDS, try Instrument.from_search')
        return Instrument(ins_code, l18, l30)

    def page_data(self, general=True, trade_history=False, related_companies=False) -> dict:
        """Return the static info found on instrument's page.

        :param general: parse general data incduling bvol, cisin, etc.
        :param trade_history: include trade_history in the result.
        :param related_companies: parse and include related_companies.
        For the meaning of keys see:
            https://cdn.tsetmc.com/Site.aspx?ParTree=151713
        """
        text = fa_norm_text(f'http://tsetmc.com/Loader.aspx?ParTree=151311&i={self.ins_code}')
        if general:
            m = PAGE_VARS(text)
            title_match = TITLE_FULLMATCH(m['Title'])
            free_float = m['KAjCapValCpsIdx']
            eps = m['EstimatedEPS']
            sps = m['PSR']
            sector_pe = m['SectorPE']
            result = {
                'bvol': int(m['BaseVol']),
                'cisin': m['CIsin'],
                'cs': int(m['CSecVal']),
                'eps': int(eps) if eps else None,
                'sps': float(sps) if sps else None,
                'flow': int(m['Flow']),
                'free_float': int(free_float) if free_float else None,
                'group_code': m['CgrValCot'],
                'isin': m['InstrumentID'],
                'l18': m['LVal18AFC'],
                'l30': title_match[1],
                'flow_name': title_match[2],
                'month_average_volume': int(m['QTotTran5JAvg']),
                'sector_name': m['LSecVal'],
                'sector_pe': float(sector_pe) if sector_pe else None,
                'tmax': float(m['PSGelStaMax']),
                'tmin': float(m['PSGelStaMin']),
                'week_max': float(m['MaxWeek']),
                'week_min': float(m['MinWeek']),
                'year_max': float(m['MaxYear']),
                'year_min': float(m['MinYear']),
                'z': int(m['ZTitad'])}
        else:
            result = {}
            m = None
        if trade_history:
            m = TRADE_HISTORY(text, m.end())
            th = literal_eval(STR_TO_NUM(m[1]))
            th = DataFrame(th, columns=('date', 'pc', 'py', 'pmin', 'pmax', 'tno', 'tvol', 'tval'))
            th['date'] = to_datetime(th['date'], format='%Y%m%d')
            th.set_index('date', inplace=True)
            result['trade_history'] = th
        if related_companies:
            m = RELATED_COMPANIES(text, m.end())
            result['related_companies'] = literal_eval(STR_TO_NUM(m[1]))
        # todo: add 'codal_data'
        return result

    def info(self, general=True, orders=False, index=False) -> dict:
        """Get info using instinfodata.aspx module.

        :keyword orders: parse orders and include related values.
        :keyword index: parse values related to market-index.
        """
        # apparently, http://www.tsetmc.com/tsev2/data/instinfodata.aspx?i=...
        # and http://www.tsetmc.com/tsev2/data/instinfofast.aspx?i=...
        # return the same response.
        text = get_content(
            f'http://www.tsetmc.com/tsev2/data/instinfodata.aspx'
            # &e=1 parameter is required to get NAV
            f'?i={self.ins_code}&c=&e=1').decode()
        # the _s are unknown
        try:
            price_info, index_info, orders_info, _, _, _, group_info, _, _ = text.split(';')
        except ValueError:
            # todo: fix not enough values to unpack
            warning(text)  # The service is unavailable.
            raise
        if general:
            timestamp, status, pl, pc, pf, py, pmin, pmax, tno, tvol, tval, _, \
                info_datetime_date, last_info_time, nav_datetime, nav = price_info.split(',')
            result = {
                'timestamp': timestamp, 'status': status
                , 'last_info_datetime': strptime(info_datetime_date + last_info_time, '%Y%m%d%H%M%S')
                , 'pl': int(pl), 'pc': int(pc), 'pf': int(pf), 'py': int(py)
                , 'pmin': int(pmin), 'pmax': int(pmax)
                , 'tno': int(tno), 'tvol': int(tvol), 'tval': int(tval)}
            if nav:
                result['nav'] = int(nav)
                result['nav_datetime'] = jstrptime(nav_datetime, '%Y/%m/%d %H:%M:%S')
        else:
            result = {}
        if index:
            result |= _parse_index(index_info)
        if orders:
            result |= {
                f'{k}{i}': int(v)
                for i, row in enumerate(orders_info.split(','), 1)
                for (k, v) in zip(
                    ('zd', 'qd', 'pd', 'po', 'qo', 'zo'), row.split('@'))
                if row}  # the `if` is for the last row which is empty
        return result

    def trade_history(self, top: int) -> DataFrame:
        content = get_content(
            f'http://www.tsetmc.com/tsev2/data/InstTradeHistory.aspx?i={self.ins_code}&Top={top}')
        df = read_csv(
            BytesIO(content)
            , sep='@'
            , lineterminator=';'
            , names=('date', 'pmax', 'pmin', 'pc', 'pl', 'pf', 'py', 'tval', 'tvol', 'tno')
            , low_memory=False
            , index_col='date'
            , parse_dates=True)
        return df

    def price_history(self, adjusted: bool = True) -> DataFrame:
        content = get_content(
            f'http://members.tsetmc.com/tsev2/chart/data/Financial.aspx?i={self.ins_code}&t=ph&a={adjusted:d}')
        df = read_csv(
            BytesIO(content)
            , lineterminator=';'
            , names=('date', 'pmax', 'pmin', 'pf', 'pl', 'tvol', 'pc')
            , low_memory=False, index_col='date', parse_dates=True)
        return df

    def client_type(self) -> DataFrame:
        """Get daily natural/legal history.

        In column names `n_` prefix stands for natural and `l_` for legal.
        """
        return read_csv(
            BytesIO(get_content(f'http://www.tsetmc.com/tsev2/data/clienttype.aspx?i={self.ins_code}'))
            , lineterminator=b';'
            , names=(
                'date'
                , 'n_buy_count', 'l_buy_count', 'n_sell_count', 'l_sell_count'
                , 'n_buy_volume', 'l_buy_volume', 'n_sell_volume', 'l_sell_volume'
                , 'n_buy_value', 'l_buy_value', 'n_sell_value', 'l_sell_value')
            , index_col='date', parse_dates=True , dtype='int64', low_memory=False)

    def identification(self) -> DataFrame:
        """Return the information available in the identification (شناسه) tab.

        Related API descriptions:
            https://cdn.tsetmc.com/Site.aspx?ParTree=1114111118&LnkIdn=83
            http://en.tsetmc.com/Site.aspx?ParTree=111411111Z
        """
        text = fa_norm_text(f'http://www.tsetmc.com/Loader.aspx?Partree=15131M&i={self.ins_code}')
        return read_html(text, index_col=0)[0]

    @staticmethod
    def from_search(s: str) -> 'Instrument':
        """Look up the ID through a web search and return Instrument."""
        return Instrument(int(get_content(
            'http://tsetmc.com/tsev2/data/search.aspx?skey=' + s).split(b',', 3)[2]))

    def holders(self, cisin=None) -> DataFrame:
        """Get list of major unit/share holders.

        If `cisin` is not provided, it will be fetched using
        `self.get_identification`.
        """
        if cisin is None:
            cisin = self.identification().loc['کد 12 رقمی شرکت', 1]
        text = fa_norm_text(f'http://www.tsetmc.com/Loader.aspx?Partree=15131T&c={cisin}')
        df = read_html(text)[0]
        df.drop(columns='Unnamed: 4', inplace=True)
        # todo: use separate columns
        df['id_cisin'] = findall(r"ShowShareHolder\('([^']*)'\)", text)
        return df

    @staticmethod
    def holder(id_cisin=None, history=True, other_holdings=False) -> Union[DataFrame, tuple[DataFrame, DataFrame]]:
        """Return history/other holdings for the given holder id_cisin.

        `id_cisin` is usually obtained using `self.get_holders`.

        If both `history` and `other_holdings` are True, then a tuple of
        DataFrames will be returned.
        """
        text = fa_norm_text(f'http://www.tsetmc.com/tsev2/data/ShareHolder.aspx?i={id_cisin}')
        hist, _, oth = text.partition('#')

        def history_df() -> DataFrame:
            return read_csv(
                StringIO(hist),
                lineterminator=';',
                names=('date', 'shares'),
                dtype='int64',
                index_col='date',
                parse_dates=True,
                low_memory=False)

        def other_holdings_df() -> DataFrame:
            return read_csv(
                StringIO(oth),
                lineterminator=';',
                names=('ins_code', 'name', 'shares', 'percent'),
                index_col='ins_code',
                low_memory=False)

        if history and other_holdings:
            return history_df(), other_holdings_df()
        elif history:
            return history_df()
        else:
            return other_holdings_df()

    def intraday(
        self, date: Union[int, str], *,
        general=False,
        thresholds=False,
        closings=False,
        candles=False,
        states=True,
        trades=True,
        holders=False,
        yesterday_holders=False,
        client_types=True,
        best_limits=True,
    ) -> IntraDayDict:
        """Get intraday info for the given date in YYYYMMDD format.

        For the meaning of instrument state codes refer to
            http://en.tsetmc.com/Site.aspx?ParTree=111411111Y
        """
        text = fa_norm_text(f'http://www.tsetmc.com/Loader.aspx?ParTree=15131P&i={self.ins_code}&d={date}')
        find = text.find
        find_start = 0
        result = {}
        if general:
            find_start = find('InstSimpleData=') + 15
            end = find('];', find_start)
            result['general'] = dict(zip(
                ('l30', 'l18', 'market', 'flow_name', 'flow', 'group_code', 'cisin', 'isin', 'z', 'bvol'),
                literal_eval(text[find_start: end + 1])))
            find_start = end
        if thresholds:
            find_start = find('StaticTreshholdData=') + 20
            end = find('];', find_start)
            result['thresholds'] = DataFrame(literal_eval(text[find_start: end + 1]), columns=('time', 'tmax', 'tmin'))
            find_start = end
        if closings:
            find_start = find('ClosingPriceData=', find_start) + 17
            end = find('];', find_start)
            evaluated = literal_eval(text[find_start: end + 1])
            closings = DataFrame(evaluated, columns=(
                'date', '?1', 'pl', 'pc', 'pf', 'py', 'pmin', 'pmax', 'tno',
                'tvol', 'tval', '?2', 'heven'))
            if len(closings['?1'].unique()) != 1 or closings['?2'].unique() != 1:
                # See if you can find the meaning of ?2 column
                warning(f'Unusual ?1 or ?2. Parameters: {date=} {self.ins_code}. Please report this at https://github.com/5j9/tsetmc/issues.')
            result['closings'] = closings
            find_start = end
        if candles:
            find_start = find('IntraDayPriceData=', find_start) + 18
            end = find('];', find_start)
            evaluated = literal_eval(text[find_start: end + 1])
            result['candles'] = DataFrame(evaluated, columns=('time', 'high', 'low', 'open', 'close', 'tvol'))
            find_start = end
        if states:
            find_start = find('InstrumentStateData=', find_start) + 20
            end = find('];', find_start)
            evaluated = literal_eval(text[find_start: end + 1])
            result['states'] = DataFrame(evaluated, columns=('date', 'time', 'state'))
            find_start = end
        if trades:
            find_start = find('IntraTradeData=', find_start) + 15
            end = find('];', find_start)
            evaluated = literal_eval(text[find_start: end + 1])
            find_start = end
            trades = DataFrame(evaluated, columns=('-', 'time', 'tvol', 'pl', 'annulled'))
            trades['annulled'] = trades['annulled'].astype(bool)
            numeric_cols = ['-', 'tvol', 'pl']
            trades[numeric_cols] = trades[numeric_cols].apply(to_numeric)
            trades.set_index('-', inplace=True)
            trades.sort_index(inplace=True)
            result['trades'] = trades
        if holders or yesterday_holders:
            holder_cols = ('id', 'cisin', 'shares', 'percent', 'change', 'name')
        if holders:
            find_start = find('ShareHolderData=', find_start) + 16
            end = find('];', find_start)
            evaluated = literal_eval(text[find_start: end + 1])
            # noinspection PyUnboundLocalVariable
            result['holders'] = DataFrame(evaluated, columns=holder_cols)
            find_start = end
        if yesterday_holders:
            find_start = find('ShareHolderDataYesterday=', find_start) + 25
            end = find('];', find_start)
            evaluated = literal_eval(text[find_start: end + 1])
            result['yesterday_holders'] = DataFrame(evaluated, columns=holder_cols)
            find_start = end
        if client_types:
            find_start = find('ClientTypeData=', find_start) + 15
            end = find('];', find_start)
            evaluated = literal_eval(text[find_start: end + 1])
            result['client_types'] = dict(zip((
                'n_buy_count', 'l_buy_count',
                'n_sell_count', 'l_sell_count',
                'n_buy_volume', 'l_buy_volume',
                'n_sell_volume', 'l_sell_volume',
                'n_buy_percent', 'l_buy_percent',
                'n_sell_percent', 'l_sell_percent',
                'n_buy_value', 'l_buy_value',
                'n_sell_value', 'l_sell_value',
                'n_mean_buy_price', 'l_mean_buy_price',
                'n_mean_sell_price', 'l_mean_sell_price',
            ), evaluated))
            find_start = end
        if best_limits:
            find_start = find('var BestLimitData=', find_start) + 18
            end = find('];', find_start)
            evaluated = literal_eval(text[find_start: end + 1])
            best_limits_df = DataFrame(evaluated, columns=('time', 'row', 'zd', 'qd', 'pd', 'po', 'qo', 'zo'))
            best_limits_df : DataFrame = best_limits_df.apply(to_numeric)
            best_limits_df.set_index('time', inplace=True)
            result['best_limits'] = best_limits_df
        return result

    def adjustments(self) -> DataFrame:
        text = fa_norm_text(f'http://www.tsetmc.com/Loader.aspx?Partree=15131G&i={self.ins_code}')
        df = read_html(text)[0]
        df.columns = ('date', 'adj_pc', 'pc')
        df['date'] = df['date'].apply(j_ymd_parse)
        return df


def market_watch_init(index=False) -> MarketWatchInitDict:
    """Return the market status which are the info used in creating filters.

    For more information about filters see:
        http://tsetmc.com/Loader.aspx?ParTree=15131F
    For the meaning of column names in the returned DataFrame see:
        https://cdn.tsetmc.com/Site.aspx?ParTree=151713
        For `flow` and `yval` codes see:
            http://cdn.tsetmc.com/Site.aspx?ParTree=1114111118&LnkIdn=83
        For `heven` see:
            http://cdn.tsetmc.com/Site.aspx?ParTree=111411111S&LnkIdn=129
            (it's the time of last transaction in HHMMSS format)
    """
    text = fa_norm_text('http://tsetmc.com/tsev2/data/MarketWatchInit.aspx?h=0&r=0')
    _, index_data, states, price_rows, _ = text.split('@')
    state_df = read_csv(
        StringIO(states)
        , lineterminator=';'
        , names=(
            'ins_code', 'isin', 'l18', 'l30', 'heven', 'pf', 'pc', 'pl', 'tno'
            , 'tvol', 'tval', 'pmin', 'pmax', 'py', 'eps', 'bvol', 'visitcount'
            , 'flow', 'cs', 'tmax', 'tmin', 'z', 'yval')
        , low_memory=False
        , index_col=['ins_code', 'isin', 'l18', 'l30'])
    price_df = read_csv(
        StringIO(price_rows)
        , lineterminator=';'
        , names=('ins_code', 'row', 'zo', 'zd', 'pd', 'po', 'qd', 'qo')
        , dtype='Int64'
        , low_memory=False)
    # merge multiple rows sharing the same `row` number into one row.
    # a fascinating solution from https://stackoverflow.com/a/53563551/2705757
    price_df.set_index(['ins_code', 'row'], inplace=True)
    price_df = price_df.unstack(fill_value=0).sort_index(axis=1, level=1)
    price_df.columns = [f'{c}{i}' for c, i in price_df.columns]
    joined_df = state_df.join(price_df)
    # joined_df.index = to_numeric(joined_df.index, downcast='unsigned')
    result = {'dataframe': joined_df}
    if index:
        result |= _parse_index(index_data)
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


def closing_price_all() -> DataFrame:
    """Return price history dataframe.

    For the meaning of column names refer to
        http://cdn.tsetmc.com/Site.aspx?ParTree=151713
    This method returns the same set of information as `[ih]` variable in
        tsetmc filters. See:
            http://tsetmc.com/Site.aspx?ParTree=151715&LnkIdn=3197
    """
    content = get_content('http://www.tsetmc.com/tsev2/data/ClosingPriceAll.aspx')
    data = _split_id_rows(content, id_row_len=11)
    df = DataFrame(data, columns=(
        'ins_code', 'n', 'pc', 'pl', 'tno', 'tvol', 'tval'
        , 'pmin', 'pmax', 'py', 'pf'))
    # noinspection PyTypeChecker
    df = df.apply(to_numeric)
    df.set_index(['ins_code', 'n'], inplace=True)
    return df


def client_type_all() -> DataFrame:
    """Return client types (natural/legal stats) as a DataFrame.

    In column names `n_` prefix stands for natural and `l_` for legal.
    """
    content = get_content('http://www.tsetmc.com/tsev2/data/ClientTypeAll.aspx')
    df = read_csv(
        BytesIO(content), lineterminator=b';', names=(
            'ins_code', 'n_buy_count', 'l_buy_count', 'n_buy_volume', 'l_buy_volume'
            , 'n_sell_count', 'l_sell_count', 'n_sell_volume', 'l_sell_volume')
        , dtype='int64', index_col='ins_code', low_memory=False)
    return df


def key_stats() -> DataFrame:
    """Return key statistics as a DataFrame.

    For the meaning of column names refer to
        http://www.tsetmc.com/Site.aspx?ParTree=151715&LnkIdn=3199 or
        http://cdn.tsetmc.com/Site.aspx?ParTree=151713
    """
    content = get_content('http://www.tsetmc.com/tsev2/data/InstValue.aspx?t=a')
    data = _split_id_rows(content, id_row_len=3)
    df = DataFrame(data, columns=('ins_code', 'n', 'value'))
    # noinspection PyTypeChecker
    df = df.apply(to_numeric)
    df = df.pivot('ins_code', 'n', 'value')
    df.columns = [f'is{c}' for c in df.columns]
    return df


def _parse_index(s: str) -> dict:
    market_last_transaction, tse_status, tse_index, tse_index_change \
        , tse_value, tse_tvol, tse_tval, tse_tno \
        , fb_status, fb_tvol, fb_tval, fb_tno \
        , derivatives_status, derivatives_tvol, derivatives_tval, derivatives_tno \
        , _ = s.split(',')
    index_change_match = INDEX_CHANGE_MATCH(tse_index_change)
    tse_index_change = float(index_change_match[2])
    if index_change_match[1] is not None:  # negative value
        tse_index_change *= -1
    timestamp_match = INDEX_TIMESTAMP_MATCH(market_last_transaction)
    result = {
        'market_last_transaction': jdatetime(
            1300 + int(timestamp_match[1]), int(timestamp_match[2])
            , int(timestamp_match[3]), int(timestamp_match[4])
            , int(timestamp_match[5]), int(timestamp_match[6]))
        , 'tse_status': tse_status
        , 'tse_index': float(tse_index)
        , 'tse_index_change': tse_index_change
        , 'tse_tvol': float(tse_tvol)
        , 'tse_tval': float(tse_tval)
        , 'tse_tno': float(tse_tval)
        , 'fb_status': fb_status
        , 'fb_tvol': float(fb_tvol)
        , 'fb_tval': float(fb_tval)
        , 'fb_tno': int(fb_tno)
        , 'derivatives_status': derivatives_status
        , 'derivatives_tvol': float(derivatives_tvol)
        , 'derivatives_tval': float(derivatives_tval)
        , 'derivatives_tno': int(derivatives_tno)}
    if tse_value:
        result['tse_value'] = float(tse_value)
    if (m3 := index_change_match[3]) is not None:
        result['tse_index_change_percent'] = float(m3)
    return result


def price_adjustments(flow: int) -> DataFrame:
    """Get price adjustments for a particular flow.

    Related APIs:
        http://cdn.tsetmc.com/Site.aspx?ParTree=1114111124&LnkIdn=843
    """
    text = fa_norm_text(f'http://tsetmc.com/Loader.aspx?Partree=151319&Flow={flow}')
    df = read_html(text)[0]
    df.columns = ('l18', 'l30', 'date', 'adj_pc', 'pc')
    df['date'] = df['date'].apply(j_ymd_parse)
    return df
