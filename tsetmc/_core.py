from re import compile as rc

from requests import Session


session = Session()


session_get = session.get


def get(url) -> str:
    return session_get(url).text.replace('ي', 'ی').replace('ك', 'ک')


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


class Stock:

    def __init__(self, id: int):
        self.id = id

    def get_page_info(self) -> dict:
        text = get(f'http://tsetmc.com/Loader.aspx?ParTree=151311&i={self.id}')
        a_min_max = ALLOWED_MIN_MAX_SEARCH(text)
        wy_min_max = WEAK_YEAR_MIN_MAX_SEARCH(text)
        title_match = TITLE_SEARCH(text)
        free_float_match = FREE_FLOAT_SEARCH(text)
        eps_match = EPS_SEARCH(text)
        sector_pe_match = SECTOR_PE_SEARCH(text)
        return {
            'allowed_max': float(a_min_max[2]),
            'allowed_min': float(a_min_max[1]),
            'base_volume': int(BASE_VOLUME_SEARCH(text)[1]),
            'eps': int(eps_match[1]) if eps_match is not None else None,
            'free_float': int(
                free_float_match[1]) if free_float_match is not None else None,
            'full_name': title_match[1],
            'group_name': GROUP_NAME_SEARCH(text)[1],
            'market': title_match[3],
            'month_average_volume': int(MONTH_AVG_VOL_SEARCH(text)[1]),
            'name': title_match[2],
            'sector_pe': float(
                sector_pe_match[1]) if sector_pe_match is not None else None,
            'shares': int(SHARES_SEARCH(text)[1]),
            'week_max': float(wy_min_max[2]),
            'week_min': float(wy_min_max[1]),
            'year_max': float(wy_min_max[4]),
            'year_min': float(wy_min_max[3]),
        }

    def get_instant_info(self):  # todo
        text = get(
            f'http://www.tsetmc.com/tsev2/data/instinfodata.aspx'
            f'?i={self.id}&c=67%20')
        line1, line2, line3 = text.split('\n')
        market_index_change = float(line2)
        market_index_change_percent = float()
        return {
            'market_index_change': market_index_change,
            'market_index_change_percent': market_index_change_percent,
        }

    @staticmethod
    def from_name(s: str) -> 'Stock':
        text = get('http://tsetmc.com/tsev2/data/search.aspx?skey=' + s)
        return Stock(int(FIRST_NUMBER_SEARCH(text)[0]))
