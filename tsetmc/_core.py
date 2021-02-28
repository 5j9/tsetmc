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
SECTOR_PE_SEARCH = rc(rf"SectorPE='{F}'").search
TITLE_SEARCH = rc(r"Title='(.*?) \((.*?)\) \- ([^']*)'").search
FREE_FLOAT_SEARCH = rc(rf"KAjCapValCpsIdx='({F}+)'").search
GROUP_NAME_SEARCH = rc(r"LSecVal='(.*?)'").search
BASE_VOLUME_SEARCH = rc(r"BaseVol=(\d+)").search
EPS_SEARCH = rc(r"EstimatedEPS='(\d+)'").search
SHARES_SEARCH = rc(r'ZTitad=(\d+)').search
ALLOWED_MIN_MAX_SEARCH = rc(rf"PSGelStaMax='{F}',PSGelStaMin='{F}").search
WEAK_YEAR_MIN_MAX_SEARCH = rc(
    rf"MinWeek='{F}',MaxWeek='{F}',MinYear='{F}',MaxYear='{F}'").search
MONTH_AVG_VOL_SEARCH = rc(r"QTotTran5JAvg='(\d+)'").search
RELATED_COMPANIES = rc(r"var RelatedCompanies=(\[.*\]);").search
TRADE_HISTORY = rc(r"var TradeHistory=(\[.*\]);").search
STR_TO_NUM = partial(rc(rf"'({F})'").sub, r'\1')
INDEX_CHANGE_MATCH = rc(rf"<div class='mn'>(\(?)({F})\)?</div> ({F})%").match
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
    # warning/todo:
    # get_page_info and get_inst_info are not tested widely and fail sometimes.

    __slots__ = 'id', 'isin', 'l13', 'l18'

    def __init__(self, id: Union[int, str]):
        try:
            self.id, self.l13, self.l18, self.isin = KNOWN_IDS[id]
        except KeyError:
            if isinstance(id, int):
                self.id = id
                self.l13 = self.l18 = self.isin = None
                return
            raise KeyError(
                'id not found in KNOWN_IDS, try Instrument.from_search')

    def __repr__(self):
        if self.l13 is None:
            return f'Instrument({self.id})'
        return f"Instrument('{self.l13}')"

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return self.id

    def get_page_info(self) -> dict:
        """Return the static info found on instrument's page.

        For the meaning of keys see:
            https://cdn.tsetmc.com/Site.aspx?ParTree=151713
        """
        text = fa_norm_text(f'http://tsetmc.com/Loader.aspx?ParTree=151311&i={self.id}')
        t_min_max = ALLOWED_MIN_MAX_SEARCH(text)
        wy_min_max = WEAK_YEAR_MIN_MAX_SEARCH(text)
        title_match = TITLE_SEARCH(text)
        free_float_match = FREE_FLOAT_SEARCH(text)
        eps_match = EPS_SEARCH(text)
        sector_pe_match = SECTOR_PE_SEARCH(text)
        trade_history = literal_eval(STR_TO_NUM(TRADE_HISTORY(text)[1]))
        trade_history = DataFrame(trade_history, columns=('date', 'pc', 'py', 'pmin', 'pmax', 'tno', 'tvol', 'tval'))
        trade_history['date'] = to_datetime(trade_history['date'], format='%Y%m%d')
        trade_history.set_index('date', inplace=True)
        return {
            'tmax': float(t_min_max[2])
            , 'tmin': float(t_min_max[1])
            , 'bvol': int(BASE_VOLUME_SEARCH(text)[1])
            , 'eps': int(eps_match[1]) if eps_match is not None else None
            , 'free_float': int(
                free_float_match[1]) if free_float_match is not None else None
            , 'l30': title_match[1]
            , 'sector_name': GROUP_NAME_SEARCH(text)[1]
            , 'market': title_match[3]
            , 'month_average_volume': int(MONTH_AVG_VOL_SEARCH(text)[1])
            , 'l18': title_match[2]
            , 'sector_pe': float(
                sector_pe_match[1]) if sector_pe_match is not None else None
            , 'z': int(SHARES_SEARCH(text)[1])
            , 'week_max': float(wy_min_max[2])
            , 'week_min': float(wy_min_max[1])
            , 'year_max': float(wy_min_max[4])
            , 'year_min': float(wy_min_max[3])
            , 'related_companies': literal_eval(STR_TO_NUM(RELATED_COMPANIES(text)[1]))
            , 'trade_history': trade_history
        }  # todo: add 'codal_data'

    def get_info(self, orders=True, index=False) -> dict:
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
            f'?i={self.id}&c=&e=1').decode()
        # the _s are unknown
        price_info, index_info, orders_info, _, _, _, group_info, _, _ = text.split(';')
        timestamp, status, pl, pc, pf, py, pmin, pmax, tno, tvol, tval, _, \
            info_datetime_date, last_info_time, nav_datetime, nav = price_info.split(',')
        result = {
            'timestamp': timestamp, 'status': status
            , 'last_info_datetime': strptime(info_datetime_date + last_info_time, '%Y%m%d%H%M%S')
            , 'pl': int(pl), 'pc': int(pc), 'pf': int(pf), 'py': int(py)
            , 'pmin': int(pmin), 'pmax': int(pmax)
            , 'tno': int(tno), 'tvol': int(tvol), 'tval': int(tval)}
        if index:
            market_last_transaction, tse_status, tse_index, tse_index_change\
                , tse_value , tse_tvol, tse_tval, tse_tno \
                , otc_status, otc_tvol, otc_tval, otc_tno\
                , derivatives_status, derivatives_tvol, derivatives_tval, derivatives_tno \
                , _ = index_info.split(',')
            m = INDEX_CHANGE_MATCH(tse_index_change)
            if m[1]:  # parentheses represent negative value
                tse_index_change = -float(m[2])
            else:
                tse_index_change = float(m[2])
            tse_index_change_percent = float(m[3])
            m = INDEX_TIMESTAMP_MATCH(market_last_transaction)
            result |= {
                'market_last_transaction': jdatetime(
                    1300 + int(m[1]), int(m[2]), int(m[3]),
                    int(m[4]), int(m[5]), int(m[6]))
                , 'tse_status': tse_status
                , 'tse_index': float(tse_index)
                , 'tse_index_change': tse_index_change
                , 'tse_index_change_percent': tse_index_change_percent
                , 'tse_value': int(tse_value)
                , 'tse_tvol': int(tse_tvol)
                , 'tse_tval': int(tse_tval)
                , 'tse_tno': int(tse_tval)
                , 'otc_status': otc_status
                , 'otc_tvol': int(otc_tvol)
                , 'otc_tval': int(otc_tval)
                , 'otc_tno': int(otc_tno)
                , 'derivatives_status': derivatives_status
                , 'derivatives_tvol': int(derivatives_tvol)
                , 'derivatives_tval': int(derivatives_tval)
                , 'derivatives_tno': int(derivatives_tno)}
        if nav:
            result['nav'] = int(nav)
            result['nav_datetime'] = jstrptime(nav_datetime, '%Y/%m/%d %H:%M:%S')
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
            f'http://www.tsetmc.com/tsev2/data/InstTradeHistory.aspx?i={self.id}&Top={top}')
        df = read_csv(
            BytesIO(content)
            , sep='@'
            , lineterminator=';'
            , names=['date', 'pmax', 'pmin', 'pc', 'pl', 'pf', 'py', 'tval', 'tvol', 'tno']
            , low_memory=False
            , index_col='date'
            , parse_dates=True
        )
        return df

    def get_identification(self) -> DataFrame:
        """Return the information available in the identification (شناسه) tab."""
        text = fa_norm_text(f'http://www.tsetmc.com/Loader.aspx?Partree=15131M&i={self.id}')
        return read_html(text, index_col=0)[0]

    @staticmethod
    def from_search(s: str) -> 'Instrument':
        """Look up the ID through a web search and return Instrument."""
        return Instrument(int(get_content(
            'http://tsetmc.com/tsev2/data/search.aspx?skey=' + s).split(b',', 3)[2]))


def get_market_watch_init() -> dict:
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
    _, _, states, price_rows, _ = text.split('@')
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
        , dtype="Int64"
        , low_memory=False)
    # merge multiple rows sharing the same `row` number into one row.
    # a fascinating solution from https://stackoverflow.com/a/53563551/2705757
    price_df.set_index(['id', 'row'], inplace=True)
    price_df = price_df.unstack(fill_value=0).sort_index(1, 1)
    price_df.columns = [f'{c}{i}' for c, i in price_df.columns]
    joined_df = state_df.join(price_df)
    # joined_df.index = to_numeric(joined_df.index, downcast='unsigned')
    return {  # todo, also add other info available in MarketWatchInit.aspx
        'dataframe': joined_df
    }


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
    content = get_content('http://members.tsetmc.com/tsev2/data/ClosingPriceAll.aspx')
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

    For the meaning of column names refer to
        https://cdn.tsetmc.com/Site.aspx?ParTree=151715&LnkIdn=3198
    """
    content = get_content('http://www.tsetmc.com/tsev2/data/ClientTypeAll.aspx')
    df = read_csv(
        BytesIO(content), lineterminator=b';', names=(
            'id', 'Buy_CountI', 'Buy_CountN', 'Buy_I_Volume', 'Buy_N_Volume'
            , 'Sell_CountI', 'Sell_CountN', 'Sell_I_Volume', 'Sell_N_Volume')
        , dtype="int64", index_col='id', low_memory=False)
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
