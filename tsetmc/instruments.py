from ast import literal_eval as _literal_eval
from datetime import datetime as _datetime
from functools import partial as _partial
from json import load as _jload
from logging import warning as _warning
from pathlib import Path

from pandas import to_datetime as _to_datetime

from . import _FARSI_NORM, _MarketState, _csv2df, _F, _TypedDict, _get_data, \
    _parse_market_state, _parse_ombud_messages, _rc, \
    _get, _StringIO, _BytesIO, _DF, _DataFrame, \
    _to_numeric, _read_html, _findall, _jstrptime, _get_par_tree


_strptime = _datetime.strptime
_j_ymd_parse = _partial(_jstrptime, format='%Y/%m/%d')
_DB_PATH = Path(__file__).parent / 'database/ids.json'


_FARSI_NORM_REVERSED = {v: k for k, v in _FARSI_NORM.items()}


# This regex is generated using dev/page_vars_regex_generator.py.
# Fix and update that script before making changes.
_PAGE_VARS = _rc(
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
_TITLE_FULLMATCH = _rc(r"(.*?) \(.*?\) \- ([^']*)").fullmatch
_RELATED_COMPANIES = _rc(r"var RelatedCompanies=(\[.*\]);").search
_TRADE_HISTORY = _rc(r"var TradeHistory=(\[.*\]);").search
_STR_TO_NUM = _partial(_rc(rf"'{_F}'").sub, r'\1')

with open(_DB_PATH, encoding='utf8') as _f:
    _L18S: dict[str, tuple] = _jload(_f)

_INS_CODE_TO_L18 = None


def _l18_l30(ins_code: int) -> tuple:
    global _INS_CODE_TO_L18
    if _INS_CODE_TO_L18 is None:
        _INS_CODE_TO_L18 = {v[0]: k for k, v in _L18S.items()}
    return _L18S[_INS_CODE_TO_L18[ins_code]][1:]


class _IntraDay(_TypedDict, total=False):
    general: dict
    thresholds: _DataFrame
    closings: _DataFrame
    candles: _DataFrame
    states: _DataFrame
    trades: _DataFrame
    holders: _DataFrame
    yesterday_holders: _DataFrame
    client_types: dict[str, int]
    best_limits: _DataFrame


class _LiveData(_TypedDict, total=False):
    market_state: _MarketState
    orders: dict[str, int]
    timestamp: str
    status: str
    datetime: _datetime
    pl: int
    pc: int
    pf: int
    py: int
    pmin: int
    pmax: int
    tno: int
    tvol: int
    tval: int


class Instrument:

    __slots__ = 'code', '_l18', '_l30', '_cisin'

    def __init__(self, code: int, l18: str = None, l30: str = None):
        self.code = code
        self._l18 = l18
        self._l30 = l30

    def __repr__(self):
        # not using self.l18 because it can cause a while when viewing a list
        # of Instruments.
        if self._l18 is not None:
            return f"Instrument({self.code}, {self._l18!r})"
        if self._l30 is not None:
            return f"Instrument({self.code}, l30={self._l30!r})"
        return f'Instrument({self.code})'

    def __eq__(self, other):
        return self.code == other.code

    def __hash__(self):
        return self.code
    
    @property
    def l18(self) -> str:
        if (l18 := self._l18) is not None:
            return l18
        try:
            self._l18, self._l30 = _l18_l30(self.code)
        except KeyError:
            self.page_data()
        return self._l18

    @property
    def l30(self) -> str:
        if (l30 := self._l30) is not None:
            return l30
        try:
            self._l18, self._l30 = _l18_l30(self.code)
        except KeyError:
            self.page_data()
        return self._l30

    @property
    def cisin(self) -> str:
        try:
            return self._cisin
        except AttributeError:
            # can also be fetched using self.identification()
            # but that won't load self._l18 since 'نماد فارسی'
            # sometimes contains descriptions like "وسديد - لغو پذیرش شده".
            self.page_data()
        return self._cisin

    @staticmethod
    def from_l18(l18: str, /) -> 'Instrument':
        try:
            ins_code, _, l30 = _L18S[l18]
        except KeyError:
            return Instrument.from_search(l18)
        return Instrument(ins_code, l18, l30)

    def page_data(self, general=True, trade_history=False, related_companies=False) -> dict:
        """Return the static info found on instrument's page.

        :param general: parse general data including bvol, cisin, etc.
        :param trade_history: include trade_history in the result.
        :param related_companies: parse and include related_companies.
        For the meaning of keys see:
            https://cdn.tsetmc.com/Site.aspx?ParTree=151713
        """
        text = _get_par_tree(f'151311&i={self.code}')
        if general:
            m = _PAGE_VARS(text)
            title_match = _TITLE_FULLMATCH(m['Title'])
            free_float = m['KAjCapValCpsIdx']
            eps = m['EstimatedEPS']
            sps = m['PSR']
            sector_pe = m['SectorPE']
            l30 = self._l30 = title_match[1]
            l18 = self._l18 = m['LVal18AFC']
            cisin = self._cisin = m['CIsin']
            result = {
                'bvol': int(m['BaseVol']),
                'cisin': cisin,
                'cs': int(m['CSecVal']),
                'eps': int(eps) if eps else None,
                'sps': float(sps) if sps else None,
                'flow': int(m['Flow']),
                'free_float': int(free_float) if free_float else None,
                'group_code': m['CgrValCot'],
                'isin': m['InstrumentID'],
                'l18': l18,
                'l30': l30,
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
            m = _TRADE_HISTORY(text, m.end())
            th = _literal_eval(_STR_TO_NUM(m[1]))
            th = _DF(th, columns=('date', 'pc', 'py', 'pmin', 'pmax', 'tno', 'tvol', 'tval'))
            th['date'] = _to_datetime(th['date'], format='%Y%m%d')
            th.set_index('date', inplace=True)
            result['trade_history'] = th
        if related_companies:
            m = _RELATED_COMPANIES(text, m.end())
            result['related_companies'] = [
                Instrument(code, l18, l30) for (code, l18, l30) in
                _literal_eval(_STR_TO_NUM(m[1]))]
        # todo: add 'codal_data'
        return result

    def live_data(
        self, general=True, best_limits=False, market_state=False
    ) -> _LiveData:
        """Return live data price/order data using instinfodata.aspx module.

        :keyword best_limits: parse best_limits and include related values.
        :keyword market_state: parse values related to market state.
        """
        # apparently, http://www.tsetmc.com/tsev2/data/instinfodata.aspx?i=...
        # and http://www.tsetmc.com/tsev2/data/instinfofast.aspx?i=...
        # return the same response.
        text = _get_data(
            f'instinfodata.aspx'
            # &e=1 parameter is required to get NAV
            f'?i={self.code}&c=&e=1', fa=True)
        # the _s are unknown
        try:
            price_info, index_info, orders_info, _, _, _, group_info, _, _ = text.split(';')
        except ValueError:
            # todo: fix not enough values to unpack
            _warning(text)  # The service is unavailable.
            raise
        if general:
            timestamp, status, pl, pc, pf, py, pmin, pmax, tno, tvol, tval, _, \
                info_datetime_date, last_info_time, nav_datetime, nav = price_info.split(',')
            result = {
                'timestamp': timestamp, 'status': status
                , 'datetime': _strptime(
                    info_datetime_date + last_info_time, '%Y%m%d%H%M%S')
                , 'pl': int(pl), 'pc': int(pc), 'pf': int(pf), 'py': int(py)
                , 'pmin': int(pmin), 'pmax': int(pmax)
                , 'tno': int(tno), 'tvol': int(tvol), 'tval': int(tval)}
            if nav:
                result['nav'] = int(nav)
                result['nav_datetime'] = _jstrptime(nav_datetime, '%Y/%m/%d %H:%M:%S')
        else:
            result = {}
        if market_state:
            if index_info:  # sometimes index_info is an empty string
                result['market_state'] = _parse_market_state(index_info)
        if best_limits:
            result['best_limits'] = _csv2df(
                _StringIO(orders_info), sep='@',
                names=('zd', 'qd', 'pd', 'po', 'qo', 'zo'),
                lineterminator=',')
        return result

    def trade_history(self, top: int) -> _DataFrame:
        content = _get_data(f'InstTradeHistory.aspx?i={self.code}&Top={top}')
        df = _csv2df(
            _BytesIO(content)
            , sep='@'
            , names=('date', 'pmax', 'pmin', 'pc', 'pl', 'pf', 'py', 'tval', 'tvol', 'tno')
            , index_col='date'
            , parse_dates=True)
        return df

    def price_history(self, adjusted: bool = True) -> _DataFrame:
        content = _get(
            f'http://members.tsetmc.com/tsev2/chart/data/Financial.aspx?i={self.code}&t=ph&a={adjusted:d}')
        df = _csv2df(
            _BytesIO(content)
            , names=('date', 'pmax', 'pmin', 'pf', 'pl', 'tvol', 'pc')
            , index_col='date', parse_dates=True)
        return df

    def client_type(self) -> _DataFrame:
        """Get daily natural/legal history.

        In column names `n_` prefix stands for natural and `l_` for legal.
        """
        return _csv2df(
            _BytesIO(_get_data(f'clienttype.aspx?i={self.code}'))
            , names=(
                'date'
                , 'n_buy_count', 'l_buy_count', 'n_sell_count', 'l_sell_count'
                , 'n_buy_volume', 'l_buy_volume', 'n_sell_volume', 'l_sell_volume'
                , 'n_buy_value', 'l_buy_value', 'n_sell_value', 'l_sell_value')
            , index_col='date', parse_dates=True , dtype='uint64')

    def identification(self) -> dict:
        """Return the information available in the identification (شناسه) tab.

        Related API descriptions:
            https://cdn.tsetmc.com/Site.aspx?ParTree=1114111118&LnkIdn=83
            http://en.tsetmc.com/Site.aspx?ParTree=111411111Z
        """
        text = _get_par_tree(f'15131M&i={self.code}')
        df = _read_html(text)[0]
        return dict(zip(df[0], df[1]))

    def introduction(self) -> dict[str, str]:
        """Return the information available in introduction (معرفی) tab."""
        text = _get_par_tree(
            f'15131V&s={self.l18.translate(_FARSI_NORM_REVERSED)}')
        df = _read_html(text)[0]
        return dict(zip(df[0].str.removesuffix(' :'), df[1]))

    @staticmethod
    def from_search(s: str) -> 'Instrument':
        """`search(s)` and return the first result as Instrument."""
        l18, l30, ins_code = search(s).iloc[0][:3]
        return Instrument(ins_code, l18, l30)

    def holders(self, cisin=None) -> _DataFrame:
        """Get list of major unit/shareholders.

        If `cisin` is not provided, it will be fetched using a web request.
        """
        if cisin is None:
            cisin = self.cisin
        text = _get_par_tree(f'15131T&c={cisin}')
        df = _read_html(text)[0]
        df.drop(columns='Unnamed: 4', inplace=True)
        # todo: use separate columns
        df.columns = ['holder', 'shares/units', '%', 'change']
        df['id_cisin'] = _findall(r"ShowShareHolder\('([^']*)'\)", text)
        if df['change'].dtype == 'O':
            repl_d = {'K': '000', 'M': '000' * 2, 'B': '000' * 3, 'T': '000' * 4}
            df['change'] = df['change'].str.replace(
                ' ([KMT])', lambda m: repl_d[m[1]] if m[1] else m[0]).astype('int64')
        return df

    @staticmethod
    def holder(
        id_cisin=None, history=True, other_holdings=False
    ) -> _DataFrame | tuple[_DataFrame, _DataFrame]:
        """Return history/other holdings for the given holder id_cisin.

        `id_cisin` is usually obtained using `self.holders`.

        If both `history` and `other_holdings` are True, then a tuple of
        DataFrames will be returned.
        """
        text = _get_data(f'ShareHolder.aspx?i={id_cisin}', fa=True)
        hist, _, oth = text.partition('#')

        def history_df() -> _DataFrame:
            return _csv2df(
                _StringIO(hist),
                names=('date', 'shares'),
                dtype='uint64',
                index_col='date',
                parse_dates=True)

        def other_holdings_df() -> _DataFrame:
            return _csv2df(
                _StringIO(oth),
                names=('ins_code', 'name', 'shares', 'percent'),
                index_col='ins_code')

        if history and other_holdings:
            return history_df(), other_holdings_df()
        elif history:
            return history_df()
        else:
            return other_holdings_df()

    def intraday(
        self, date: int | str, *,
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
    ) -> _IntraDay:
        """Get intraday info for the given date in YYYYMMDD format.

        For the meaning of instrument state codes refer to
            http://en.tsetmc.com/Site.aspx?ParTree=111411111Y
        """
        text = _get_par_tree(f'15131P&i={self.code}&d={date}')
        find = text.find
        find_start = 0
        result = {}
        if general:
            find_start = find('InstSimpleData=') + 15
            end = find('];', find_start)
            result['general'] = dict(zip(
                ('l30', 'l18', 'market', 'flow_name', 'flow', 'group_code', 'cisin', 'isin', 'z', 'bvol'),
                _literal_eval(text[find_start: end + 1])))
            find_start = end
        if thresholds:
            find_start = find('StaticTreshholdData=') + 20
            end = find('];', find_start)
            result['thresholds'] = _DF(_literal_eval(text[find_start: end + 1]), columns=('time', 'tmax', 'tmin'))
            find_start = end
        if closings:
            find_start = find('ClosingPriceData=', find_start) + 17
            end = find('];', find_start)
            evaluated = _literal_eval(text[find_start: end + 1])
            closings = _DF(evaluated, columns=(
                'date', '?1', 'pl', 'pc', 'pf', 'py', 'pmin', 'pmax', 'tno',
                'tvol', 'tval', '?2', 'heven'))
            if len(closings['?1'].unique()) != 1 or closings['?2'].unique() != 1:
                # See if you can find the meaning of ?2 column
                _warning(f'Unusual ?1 or ?2. Parameters: {date=} {self.code}. Please report this at https://github.com/5j9/tsetmc/issues.')
            result['closings'] = closings
            find_start = end
        if candles:
            find_start = find('IntraDayPriceData=', find_start) + 18
            end = find('];', find_start)
            evaluated = _literal_eval(text[find_start: end + 1])
            result['candles'] = _DF(evaluated, columns=('time', 'high', 'low', 'open', 'close', 'tvol'))
            find_start = end
        if states:
            find_start = find('InstrumentStateData=', find_start) + 20
            end = find('];', find_start)
            evaluated = _literal_eval(text[find_start: end + 1])
            result['states'] = _DF(evaluated, columns=('date', 'time', 'state'))
            find_start = end
        if trades:
            find_start = find('IntraTradeData=', find_start) + 15
            end = find('];', find_start)
            evaluated = _literal_eval(text[find_start: end + 1])
            find_start = end
            trades = _DF(evaluated, columns=('-', 'time', 'tvol', 'pl', 'annulled'))
            trades['annulled'] = trades['annulled'].astype(bool, False)
            numeric_cols = ['-', 'tvol', 'pl']
            trades[numeric_cols] = trades[numeric_cols].apply(_to_numeric)
            trades.set_index('-', inplace=True)
            trades.sort_index(inplace=True)
            result['trades'] = trades
        if holders or yesterday_holders:
            holder_cols = ('id', 'cisin', 'shares', 'percent', 'change', 'name')
        if holders:
            find_start = find('ShareHolderData=', find_start) + 16
            end = find('];', find_start)
            evaluated = _literal_eval(text[find_start: end + 1])
            # noinspection PyUnboundLocalVariable
            result['holders'] = _DF(evaluated, columns=holder_cols)
            find_start = end
        if yesterday_holders:
            find_start = find('ShareHolderDataYesterday=', find_start) + 25
            end = find('];', find_start)
            evaluated = _literal_eval(text[find_start: end + 1])
            result['yesterday_holders'] = _DF(evaluated, columns=holder_cols)
            find_start = end
        if client_types:
            find_start = find('ClientTypeData=', find_start) + 15
            end = find('];', find_start)
            evaluated = _literal_eval(text[find_start: end + 1])
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
            evaluated = _literal_eval(text[find_start: end + 1])
            best_limits_df = _DF(evaluated, columns=('time', 'row', 'zd', 'qd', 'pd', 'po', 'qo', 'zo'))
            # todo: use astype?
            best_limits_df : _DataFrame = best_limits_df.apply(_to_numeric)
            best_limits_df.set_index('time', inplace=True)
            result['best_limits'] = best_limits_df
        return result

    def adjustments(self) -> _DataFrame:
        text = _get_par_tree(f'15131G&i={self.code}', fa=False)
        df = _read_html(text)[0]
        df.columns = ('date', 'adj_pc', 'pc')
        df['date'] = df['date'].apply(_j_ymd_parse)
        return df

    def ombud_messages(self) -> _DataFrame:
        return _parse_ombud_messages(_get_par_tree(f'15131W&i={self.code}'))


def price_adjustments(flow: int) -> _DataFrame:
    """Get price adjustments for a particular flow.

    Related APIs:
        http://cdn.tsetmc.com/Site.aspx?ParTree=1114111124&LnkIdn=843
    """
    text = _get_par_tree(f'151319&Flow={flow}')
    df = _read_html(text)[0]
    df.columns = ('l18', 'l30', 'date', 'adj_pc', 'pc')
    df['date'] = df['date'].apply(_j_ymd_parse)
    return df


def search(skey: str, /) -> _DataFrame:
    """`skey` (search key) is usually part of the l18 or l30."""
    return _csv2df(
        _StringIO(_get_data('search.aspx?skey=' + skey, fa=True)),
        header=None,
        names=(
            'l18', 'l30', 'ins_code', 'retail', 'compensation', 'wholesale',
            '_unknown1', '_unknown2', '_unknown3', '_unknown4', '_unknown5'))
