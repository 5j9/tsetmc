from re import compile as rc
from datetime import datetime
from io import BytesIO, StringIO

from requests import Session
from jdatetime import datetime as jdatetime
from pandas import read_csv, to_numeric, DataFrame


strptime = datetime.strptime
jstrptime = jdatetime.strptime
GET = Session().get


FARSI_NORM = ''.maketrans('يك', 'یک')
F = r'([\d\.]+)'
SECTOR_PE_SEARCH = rc(rf"SectorPE='{F}'").search
TITLE_SEARCH = rc(r"Title='(.*?) \((.*?)\) \- ([^']*)'").search
FREE_FLOAT_SEARCH = rc(r"KAjCapValCpsIdx='([\d\.]+)'").search
GROUP_NAME_SEARCH = rc(r"LSecVal='(.*?)'").search
BASE_VOLUME_SEARCH = rc(r"BaseVol=(\d+)").search
EPS_SEARCH = rc(r"EstimatedEPS='(\d+)'").search
SHARES_SEARCH = rc(r'ZTitad=(\d+)').search
ALLOWED_MIN_MAX_SEARCH = rc(rf"PSGelStaMax='{F}',PSGelStaMin='{F}").search
WEAK_YEAR_MIN_MAX_SEARCH = rc(
    rf"MinWeek='{F}',MaxWeek='{F}',MinYear='{F}',MaxYear='{F}'").search
MONTH_AVG_VOL_SEARCH = rc(r"QTotTran5JAvg='(\d+)'").search
FIRST_NUMBER_SEARCH = rc(r'\d+').search
INSTANT_MATCH = rc(
    r'(?P<timestamp>\d\d:\d\d:\d\d),'
    r'..,'
    r'(?P<pl>\d+),'
    r'(?P<pc>\d+),'
    r'(?P<pf>\d+),'
    r'(?P<py>\d+),'
    r'(?P<pmin>\d+),'
    r'(?P<pmax>\d+),'
    r'(?P<tno>\d+),'
    r'(?P<tvol>\d+),'
    r'(?P<tval>\d+),'
    r'1,'
    r'(?P<last_info_datetime>\d+,\d+)'
    r'(,(?P<nav_datetime>[\d\/: ]+),(?P<nav>\d+))?'
).match
INSTANT_INTS = {
    'pl', 'pc', 'py', 'pf', 'py', 'pmin', 'pmax', 'tno', 'tvol', 'tval'}


def get_content(url) -> bytes:
    return GET(url).content


def fa_norm_text(url) -> str:
    # replace Arabic [ي ك] with Persian [ی ک]
    return get_content(url).decode().translate(FARSI_NORM)


class Instrument:
    # warning/todo:
    # get_page_info and get_inst_info are not tested widely and fail sometimes.

    def __init__(self, id: int):
        self.id = id

    def get_page_info(self) -> dict:
        """Return the static info of the symbol's page.

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
        return {
            'tmax': float(t_min_max[2]),
            'tmin': float(t_min_max[1]),
            'bvol': int(BASE_VOLUME_SEARCH(text)[1]),
            'eps': int(eps_match[1]) if eps_match is not None else None,
            'free_float': int(
                free_float_match[1]) if free_float_match is not None else None,
            'l30': title_match[1],
            'sector_name': GROUP_NAME_SEARCH(text)[1],
            'market': title_match[3],
            'month_average_volume': int(MONTH_AVG_VOL_SEARCH(text)[1]),
            'l18': title_match[2],
            'sector_pe': float(
                sector_pe_match[1]) if sector_pe_match is not None else None,
            'z': int(SHARES_SEARCH(text)[1]),
            'week_max': float(wy_min_max[2]),
            'week_min': float(wy_min_max[1]),
            'year_max': float(wy_min_max[4]),
            'year_min': float(wy_min_max[3]),
        }

    def get_inst_info(self) -> dict:
        # apparently, http://www.tsetmc.com/tsev2/data/instinfodata.aspx?i=...
        # and http://www.tsetmc.com/tsev2/data/instinfofast.aspx?i=...
        # return the same response.
        text = fa_norm_text(
            f'http://www.tsetmc.com/tsev2/data/instinfodata.aspx'
            f'?i={self.id}&c=')
        group_dict = INSTANT_MATCH(text).groupdict()
        for k in INSTANT_INTS:
            # noinspection PyTypeChecker
            group_dict[k] = int(group_dict[k])
        # noinspection PyTypeChecker
        group_dict['last_info_datetime'] = strptime(
            group_dict['last_info_datetime'], '%Y%m%d,%H%M%S')
        if (nav_datetime := group_dict.get('nav_datetime')) is not None:
            # noinspection PyTypeChecker
            group_dict['nav'] = int(group_dict['nav'])
            group_dict['nav_datetime'] = jstrptime(
                nav_datetime, '%Y/%m/%d %H:%M:%S')
        return group_dict

    @staticmethod
    def from_search(s: str) -> 'Instrument':
        text = fa_norm_text('http://tsetmc.com/tsev2/data/search.aspx?skey=' + s)
        return Instrument(int(FIRST_NUMBER_SEARCH(text)[0]))


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
        StringIO(states),
        lineterminator=';',
        names=(
            'id', 'isin', 'l18', 'l30', 'heven', 'pf', 'pc', 'pl', 'tno',
            'tvol', 'tval', 'pmin', 'pmax', 'py', 'eps', 'bvol', 'visitcount',
            'flow', 'cs', 'tmax', 'tmin', 'z', 'yval'),
        # unlike int64, Int64 is nullable
        dtype={'tmin': "Int64", 'tmax': "Int64"},
        low_memory=False,
        index_col=['id', 'isin', 'l18', 'l30'])
    price_df = read_csv(
        StringIO(price_rows),
        lineterminator=';',
        names=('id', 'row', 'zo', 'zd', 'pd', 'po', 'qd', 'qo'),
        dtype="Int64",
        low_memory=False)
    # merge multiple rows sharing the same `row` number into one row.
    # a fascinating solution from https://stackoverflow.com/a/53563551/2705757
    price_df.set_index(['id', 'row'], inplace=True)
    price_df = price_df.unstack(fill_value=0).sort_index(1, 1)
    price_df.columns = [f'{c}{i}' for c, i in price_df.columns]
    joined_df = state_df.join(price_df)
    # joined_df.index = to_numeric(joined_df.index, downcast='unsigned')
    return {  # todo, also add other info available in MarketWatchInit.aspx
        'dataframe': joined_df,
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
        http://tsetmc.com/Site.aspx?ParTree=151715&LnkIdn=3197
    """
    content = get_content('http://members.tsetmc.com/tsev2/data/ClosingPriceAll.aspx')
    data = _split_id_rows(content, id_row_len=11)
    df = DataFrame(data, columns=(
        'id', 'n', 'PClosing', 'PDrCotVal', 'ZTotTran', 'QTotTran5J',
        'QTotCap', 'PriceMin', 'PriceMax', 'PriceYesterday', 'PriceFirst'))
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
            'id', 'Buy_CountI', 'Buy_CountN', 'Buy_I_Volume', 'Buy_N_Volume',
            'Sell_CountI', 'Sell_CountN', 'Sell_I_Volume', 'Sell_N_Volume'),
        dtype="int64", index_col='id', low_memory=False)
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
