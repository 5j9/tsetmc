from ast import literal_eval as _literal_eval
from datetime import datetime as _datetime
from functools import partial as _partial
from json import load as _jload
from logging import warning as _warning
from pathlib import Path

from pandas import to_datetime as _to_datetime

from . import _FARSI_NORM, _MarketState, _api, _csv2df, _F, _TypedDict, \
    _get_data, \
    _numerize, _parse_market_state, _parse_ombud_messages, _rc, \
    _get, _StringIO, _BytesIO, _DF, _DataFrame, \
    _to_numeric, _read_html, _findall, _jstrptime, _get_par_tree, _jdatetime


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
    best_limits: _DataFrame
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
    nav: int
    nav_datatime: _jdatetime


class Instrument:

    __slots__ = 'code', '_l18', '_l30', '_cisin'

    def __init__(self, code: int, l18: str = None, l30: str = None):
        self.code = code
        self._l18 = l18
        self._l30 = l30

    def __repr__(self):
        # not using self.l18 because it may require a web request
        if self._l18 is not None:
            return f"Instrument({self.code}, {self._l18!r})"
        if self._l30 is not None:
            return f"Instrument({self.code}, l30={self._l30!r})"
        return f'Instrument({self.code})'

    def __eq__(self, other):
        return self.code == other.code

    def __hash__(self):
        return int(self.code)
    
    @property
    async def l18(self) -> str:
        if (l18 := self._l18) is not None:
            return l18
        try:
            self._l18, self._l30 = _l18_l30(self.code)
        except KeyError:
            await self.page_data()
        return self._l18

    @property
    async def _arabic_l18(self) -> str:
        return (await self.l18).translate(_FARSI_NORM_REVERSED)

    @property
    async def l30(self) -> str:
        if (l30 := self._l30) is not None:
            return l30
        try:
            self._l18, self._l30 = _l18_l30(self.code)
        except KeyError:
            await self.page_data()
        return self._l30

    @property
    async def cisin(self) -> str:
        try:
            return self._cisin
        except AttributeError:
            # can also be fetched using self.identification()
            # but that won't load self._l18 since 'نماد فارسی'
            # sometimes contains descriptions like "وسديد - لغو پذیرش شده".
            await self.page_data()
        return self._cisin

    @staticmethod
    async def from_l18(l18: str, /) -> 'Instrument':
        try:
            ins_code, _, l30 = _L18S[l18]
        except KeyError:
            return await Instrument.from_search(l18)
        return Instrument(ins_code, l18, l30)

    async def page_data(
        self, general=True, trade_history=False, related_companies=False
    ) -> dict:
        """Return the static info found on instrument's page.

        :param general: parse general data including bvol, cisin, etc.
        :param trade_history: include trade_history in the result.
        :param related_companies: parse and include related_companies.
        For the meaning of keys see:
            https://cdn.tsetmc.com/Site.aspx?ParTree=151713
        """
        text = await _get_par_tree(f'151311&i={self.code}')
        if general:
            m = _PAGE_VARS(text)
            title_match = _TITLE_FULLMATCH(m['Title'])
            free_float = m['KAjCapValCpsIdx']
            eps = m['EstimatedEPS']
            sps = m['PSR']  # PSR = P/S = P / (sps: sales per share)
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

    async def live_data(
        self, general=True, best_limits=False, market_state=False
    ) -> _LiveData:
        """Return live data price/order data using instinfodata.aspx module.

        :keyword best_limits: parse best_limits and include related values.
        :keyword market_state: parse values related to market state.
        """
        # apparently, http://www.tsetmc.com/tsev2/data/instinfodata.aspx?i=...
        # and http://www.tsetmc.com/tsev2/data/instinfofast.aspx?i=...
        # return the same response.
        text = await _get_data(
            'instinfodata.aspx'
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

    async def trade_history(self, top: int, all_=False) -> _DataFrame:
        """Get history of pmax, pmin, pc, pl, pf, py, tval, tvol, and tno.

        :param top: number of top rows (days) to return
        :param all_: include dates with no trade

        Use :meth:`Instrument.on_date(<date>).trades` for intraday trades.
        """
        content = await _get_data(f'InstTradeHistory.aspx?i={self.code}&Top={top}&A={all_:d}')
        df = _csv2df(
            _BytesIO(content)
            , sep='@'
            , names=('date', 'pmax', 'pmin', 'pc', 'pl', 'pf', 'py', 'tval', 'tvol', 'tno')
            , index_col='date'
            , parse_dates=True)
        return df

    async def price_history(self, adjusted: bool = True) -> _DataFrame:
        content = await _get(
            f'http://members.tsetmc.com/tsev2/chart/data/Financial.aspx?i={self.code}&t=ph&a={adjusted:d}')
        df = _csv2df(
            _BytesIO(content)
            , names=('date', 'pmax', 'pmin', 'pf', 'pl', 'tvol', 'pc')
            , index_col='date', parse_dates=True)
        return df

    async def client_type(self) -> _DataFrame:
        """Get daily natural/legal history.

        In column names `n_` prefix stands for natural and `l_` for legal.

        This method returns the information available at the "حقیقی-حقوقی" tab
        of the instrument. It uses the `clienttype.aspx` module.

        See also:
            :meth:`Instrument.client_type_history`
        """
        return _csv2df(
            _BytesIO(await _get_data(f'clienttype.aspx?i={self.code}'))
            , names=(
                'date'
                , 'n_buy_count', 'l_buy_count', 'n_sell_count', 'l_sell_count'
                , 'n_buy_volume', 'l_buy_volume', 'n_sell_volume', 'l_sell_volume'
                , 'n_buy_value', 'l_buy_value', 'n_sell_value', 'l_sell_value')
            , index_col='date', parse_dates=True , dtype='uint64')

    async def client_type_history(self, date: int | str = None) -> _DataFrame | dict:
        """Return natural/legal client type history.

        :param date: Gregorian date in YYYYMMDD format. If None, return the
        full history as a DataFrame. Otherwise, return the data for that
        specific date as a dict.

        Uses the information from api/ClientType/GetClientTypeHistory.

        See also:
            :meth:`Instrument.client_type`
        """
        if date is None:
            j = await _api(f'ClientType/GetClientTypeHistory/{self.code}')
            return _DataFrame(j['clientType'], copy=False)

        j = await _api(f'ClientType/GetClientTypeHistory/{self.code}/{date}')
        return j['clientType']

    async def identification(self) -> dict:
        """Return the information available in the identification (شناسه) tab.

        Related API descriptions:
            https://cdn.tsetmc.com/Site.aspx?ParTree=1114111118&LnkIdn=83
            http://en.tsetmc.com/Site.aspx?ParTree=111411111Z
        """
        text = await _get_par_tree(f'15131M&i={self.code}')
        df = _read_html(text)[0]
        return dict(zip(df[0], df[1]))

    async def introduction(self) -> dict[str, str]:
        """Return the information available in introduction (معرفی) tab."""
        text = await _get_par_tree(
            f'15131V&s={await self._arabic_l18}')
        df = _read_html(text)[0]
        return dict(zip(df[0].str.removesuffix(' :'), df[1]))

    @staticmethod
    async def from_search(s: str) -> 'Instrument':
        """`search(s)` and return the first result as Instrument."""
        l18, l30, ins_code = (await search(s)).iloc[0][:3]
        return Instrument(ins_code, l18, l30)

    async def holders(self, cisin=None) -> _DataFrame:
        """Get list of current major unit/shareholders.

        If `cisin` is not provided, it will be fetched using a web request.

        See also:
            :meth:`Instrument.on_date(<date>).holders`
        """
        if cisin is None:
            cisin = await self.cisin
        text = await _get_par_tree(f'15131T&c={cisin}')
        df = _read_html(text)[0]
        df.drop(columns='Unnamed: 4', inplace=True)
        # todo: use separate columns
        df.columns = ['holder', 'shares/units', '%', 'change']
        df['id_cisin'] = _findall(r"ShowShareHolder\('([^']*)'\)", text)
        if df['change'].dtype == 'O':
            _numerize(df, ('change',), int)
        return df

    @staticmethod
    async def holder(
        id_cisin=None, history=True, other_holdings=False
    ) -> _DataFrame | tuple[_DataFrame, _DataFrame]:
        """Return history/other holdings for the given holder id_cisin.

        `id_cisin` is usually obtained using `self.holders`.

        If both `history` and `other_holdings` are True, then a tuple of
        DataFrames will be returned.
        """
        text = await _get_data(f'ShareHolder.aspx?i={id_cisin}', fa=True)
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

    async def intraday(
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

        This method uses the old way of fetching intraday data from tsetmc.com
        which is not used on the live site anymore.

        For fetching individual parameters, use :meth:`instrument.on_date`.
        """
        text = await _get_par_tree(f'15131P&i={self.code}&d={date}')
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

    async def adjustments(self) -> _DataFrame:
        text = await _get_par_tree(f'15131G&i={self.code}', fa=False)
        df = _read_html(text)[0]
        df.columns = ('date', 'adj_pc', 'pc')
        df['date'] = df['date'].apply(_j_ymd_parse)
        return df

    async def ombud_messages(self) -> _DataFrame:
        return _parse_ombud_messages(await _get_par_tree(f'15131W&i={self.code}'))

    async def dps_history(self) -> _DataFrame:
        """Get DPS history.

        :raises pandas.errors.EmptyDataError: No columns to parse from file
        """
        content = await _get_data(f'DPSData.aspx?s={await self._arabic_l18}')
        df = _csv2df(
            _BytesIO(content),
            header=None,
            sep='@',
        )
        df.columns = [
            'publish_date',
            'meeting_date',
            'fiscal_year',
            'profit_or_loss_after_tax',
            'distributable_profit',
            'accumulated_profit_at_the_end_of_the_period',
            'cash_earnings_per_share']
        df.iloc[:, :3] = df.iloc[:, :3].apply(
            lambda col: [_jstrptime(i, format='%Y/%m/%d') for i in col])
        return df

    def on_date(self, date: int | str) -> 'InstrumentOnDate':
        """Return an object resembling Instrument on a specific date.

        :param date: Gregorian date in YYYYMMDD format.
        """
        return InstrumentOnDate(_inst=self, _date=date)


class InstrumentOnDate:

    __slots__ = 'date', 'code', 'inst'

    def __init__(self, /, *, _inst: Instrument, _date: int | str):
        """Return an object resembling Instrument on a specific date.

        :param _inst: Instrument
        :param _date: Gregorian date in YYYYMMDD format.

        Users should not instantiate this class directly, but use
        :meth:`Instrument.on_date` instead.
        """
        self.date = _date
        self.inst = _inst
        self.code = _inst.code

    async def closing_price(self) -> dict:
        """Return general closing price info.

        Result dict has the following keys: {
        'priceChange', 'priceMin', 'priceMax', 'priceYesterday', 'priceFirst',
        'last', 'id', 'insCode', 'dEven', 'hEven', 'pClosing', 'iClose',
        'yClose', 'pDrCotVal', 'zTotTran', 'qTotTran5J', 'qTotCap'}
        """
        j = await _api(f'ClosingPrice/GetClosingPriceDaily/{self.code}/{self.date}')
        return j['closingPriceDaily']

    async def closing_price_history(self) -> _DataFrame:
        """Get intraday closing price history."""
        j = await _api(f'ClosingPrice/GetClosingPriceHistory/{self.code}/{self.date}')
        return _DataFrame(j['closingPriceHistory'], copy=False)

    async def states(self) -> _DataFrame:
        """Get intraday instrument states.

        http://www.tsetmc.com/Site.aspx?ParTree=111411111Y&LnkIdn=833
        """
        j = await _api(f'MarketData/GetInstrumentState/{self.code}/{self.date}')
        return _DataFrame(j['instrumentState'], copy=False)

    async def client_types(self) -> dict:
        return await self.inst.client_type_history(self.date)

    async def holders(self) -> _DataFrame:
        """Return share/unit holders for a specific date and a day before that.

        See also:
            :meth:`Instrument.holders` which returns the list of current
            holders.
        """
        j = await _api(f'Shareholder/{self.code}/{self.date}')
        return _DataFrame(j['shareShareholder'], copy=False)

    async def best_limits(self) -> _DataFrame:
        """Get intraday best limits history."""
        j = await _api(f'BestLimits/{self.code}/{self.date}')
        return _DataFrame(j['bestLimitsHistory'], copy=False)

    async def trades(self) -> _DataFrame:
        """Get intraday trades.

         See also:
            :meth:`Instrument.trade_history`
        """
        # todo: true vs false
        j = await _api(f'Trade/GetTradeHistory/{self.code}/{self.date}/true')
        return _DataFrame(j['tradeHistory'], copy=False)

    async def static_thresholds(self) -> _DataFrame:
        """Get intraday static thresholds."""
        j = await _api(f'MarketData/GetStaticThreshold/{self.code}/{self.date}')
        return _DataFrame(j['staticThreshold'], copy=False)

    async def data(self) -> dict:
        """Get general info about the instrument on the specific date.

        The returned dict contains the following keys: {
        'insCode', 'lVal30', 'lVal18AFC', 'flow', 'cIsin', 'zTitad', 'baseVol',
        'instrumentID', 'cgrValCot', 'cComVal', 'lastDate', 'sourceID',
        'flowTitle', 'cgrValCotTitle'}
        """
        j = await _api(f'Instrument/GetInstrumentHistory/{self.code}/{self.date}')
        return j['instrumentHistory']


async def price_adjustments(flow: int) -> _DataFrame:
    """Get price adjustments for a particular flow.

    Related APIs:
        http://cdn.tsetmc.com/Site.aspx?ParTree=1114111124&LnkIdn=843
    """
    text = await _get_par_tree(f'151319&Flow={flow}')
    df = _read_html(text)[0]
    df.columns = ('l18', 'l30', 'date', 'adj_pc', 'pc')
    df['date'] = df['date'].apply(_j_ymd_parse)
    return df


async def search(skey: str, /) -> _DataFrame:
    """`skey` (search key) is usually part of the l18 or l30."""
    return _csv2df(
        _StringIO(await _get_data('search.aspx?skey=' + skey, fa=True)),
        header=None,
        names=(
            'l18', 'l30', 'ins_code', 'retail', 'compensation', 'wholesale',
            '_unknown1', '_unknown2', '_unknown3', '_unknown4', '_unknown5'))
