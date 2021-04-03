from functools import partial
from re import compile as rc
from datetime import datetime
from json import load
from io import BytesIO, StringIO
from typing import Union
from ast import literal_eval


from requests import Session
from jdatetime import datetime as jdatetime
from pandas import read_csv, to_numeric, DataFrame, read_html, to_datetime


strptime = datetime.strptime
jstrptime = jdatetime.strptime
GET = Session().get


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
).search
TITLE_FULLMATCH = rc(r"(.*?) \(.*?\) \- ([^']*)").fullmatch
RELATED_COMPANIES = rc(r"var RelatedCompanies=(\[.*\]);").search
TRADE_HISTORY = rc(r"var TradeHistory=(\[.*\]);").search
STR_TO_NUM = partial(rc(rf"'{F}'").sub, r'\1')
INDEX_CHANGE_MATCH = rc(rf"<div[^>]*>(\()?{F}\)?</div>(?: {F}%)?").match
INDEX_TIMESTAMP_MATCH = rc(r'(\d\d)/(\d+)/(\d+) (\d\d):(\d\d):(\d\d)').match

with open(f'{__file__}/../ids.json', encoding='utf8') as f:
    KNOWN_IDS: dict[str, str] = load(f)
KNOWN_IDS |= {v[0]: v for v in KNOWN_IDS.values()}


def get_content(url) -> bytes:
    return GET(url).content


def fa_norm_text(url) -> str:
    # replace Arabic [ي ك] with Persian [ی ک]
    return get_content(url).decode().translate(FARSI_NORM)


class Instrument:

    __slots__ = 'ins_code', 'l18', 'l30'

    def __init__(self, id: Union[int, str]):
        try:
            self.ins_code, self.l18, self.l30 = KNOWN_IDS[id]
        except KeyError:
            if isinstance(id, int):
                self.ins_code = id
                self.l18 = self.l30 = None
                return
            raise KeyError(
                'id not found in KNOWN_IDS, try Instrument.from_search')

    def __repr__(self):
        if self.l18 is None:
            return f'Instrument({self.ins_code})'
        return f"Instrument('{self.l18}')"

    def __eq__(self, other):
        return self.ins_code == other.ins_code

    def __hash__(self):
        return self.ins_code

    def get_page_data(self, general=True, trade_history=False, related_companies=False) -> dict:
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
            sector_pe = m['SectorPE']
            result = {
                'bvol': int(m['BaseVol']),
                'cisin': m['CIsin'],
                'cs': int(m['CSecVal']),
                'eps': int(eps) if eps else None,
                'flow': int(m['Flow']),
                'free_float': int(free_float) if free_float else None,
                'group_code': m['CgrValCot'],
                'isin': m['InstrumentID'],
                'l18': m['LVal18AFC'],
                'l30': title_match[1],
                'market': title_match[2],
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

    def get_info(self, price=True, orders=False, index=False) -> dict:
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
            # todo: fix not enough valus to unpack
            print(text)  # The service is unavailable.
            raise
        if price:
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

    def get_trade_history(self, top: int) -> DataFrame:
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

    def get_client_type(self) -> DataFrame:
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

    def get_identification(self) -> DataFrame:
        """Return the information available in the identification (شناسه) tab."""
        text = fa_norm_text(f'http://www.tsetmc.com/Loader.aspx?Partree=15131M&i={self.ins_code}')
        return read_html(text, index_col=0)[0]

    @staticmethod
    def from_search(s: str) -> 'Instrument':
        """Look up the ID through a web search and return Instrument."""
        return Instrument(int(get_content(
            'http://tsetmc.com/tsev2/data/search.aspx?skey=' + s).split(b',', 3)[2]))


def get_market_watch_init(index=False) -> dict:
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
            'id', 'isin', 'l18', 'l30', 'heven', 'pf', 'pc', 'pl', 'tno'
            , 'tvol', 'tval', 'pmin', 'pmax', 'py', 'eps', 'bvol', 'visitcount'
            , 'flow', 'cs', 'tmax', 'tmin', 'z', 'yval')
        # unlike int64, Int64 is nullable
        , dtype={'tmin': "Int64", 'tmax': "Int64"}
        , low_memory=False
        , index_col=['id', 'isin', 'l18', 'l30'])
    price_df = read_csv(
        StringIO(price_rows)
        , lineterminator=';'
        , names=('id', 'row', 'zo', 'zd', 'pd', 'po', 'qd', 'qo')
        , dtype='Int64'
        , low_memory=False)
    # merge multiple rows sharing the same `row` number into one row.
    # a fascinating solution from https://stackoverflow.com/a/53563551/2705757
    price_df.set_index(['id', 'row'], inplace=True)
    price_df = price_df.unstack(fill_value=0).sort_index(1, 1)
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


def get_closing_price_all() -> DataFrame:
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
        'id', 'n', 'pc', 'pl', 'tno', 'tvol', 'tval'
        , 'pmin', 'pmax', 'py', 'pf'))
    # noinspection PyTypeChecker
    df = df.apply(to_numeric)
    df.set_index(['id', 'n'], inplace=True)
    return df


def get_client_type_all() -> DataFrame:
    """Return client types (natural/legal stats) as a DataFrame.

    In column names `n_` prefix stands for natural and `l_` for legal.
    """
    content = get_content('http://www.tsetmc.com/tsev2/data/ClientTypeAll.aspx')
    df = read_csv(
        BytesIO(content), lineterminator=b';', names=(
            'id', 'n_buy_count', 'l_buy_count', 'n_buy_volume', 'l_buy_volume'
            , 'n_sell_count', 'l_sell_count', 'n_sell_volume', 'l_sell_volume')
        , dtype='int64', index_col='id', low_memory=False)
    return df


def get_key_stats() -> DataFrame:
    """Return key statistics as a DataFrame.

    For the meaning of column names refer to
        http://www.tsetmc.com/Site.aspx?ParTree=151715&LnkIdn=3199 or
        http://cdn.tsetmc.com/Site.aspx?ParTree=151713
    """
    content = get_content('http://www.tsetmc.com/tsev2/data/InstValue.aspx?t=a')
    data = _split_id_rows(content, id_row_len=3)
    df = DataFrame(data, columns=('id', 'n', 'value'))
    # noinspection PyTypeChecker
    df = df.apply(to_numeric)
    df = df.pivot('id', 'n', 'value')
    df.columns = [f'is{c}' for c in df.columns]
    return df


def _parse_index(s: str) -> dict:
    market_last_transaction, tse_status, tse_index, tse_index_change \
        , tse_value, tse_tvol, tse_tval, tse_tno \
        , otc_status, otc_tvol, otc_tval, otc_tno \
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
        , 'otc_status': otc_status
        , 'otc_tvol': float(otc_tvol)
        , 'otc_tval': float(otc_tval)
        , 'otc_tno': int(otc_tno)
        , 'derivatives_status': derivatives_status
        , 'derivatives_tvol': float(derivatives_tvol)
        , 'derivatives_tval': float(derivatives_tval)
        , 'derivatives_tno': int(derivatives_tno)}
    if tse_value:
        result['tse_value'] = float(tse_value)
    if (m3 := index_change_match[3]) is not None:
        result['tse_index_change_percent'] = float(m3)
    return result
