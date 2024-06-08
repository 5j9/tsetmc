from ast import literal_eval as _literal_eval
from functools import partial as _partial
from io import BytesIO as _BytesIO, StringIO as _StringIO
from logging import warning as _warning
from pathlib import Path
from re import findall as _findall, fullmatch as _fullmatch
from warnings import warn as _warn

from aiohutils.pd import html_to_df as _html_to_df
from pandas import (
    Timestamp as _Ts,
    read_csv as _read_csv,
    to_datetime as _to_datetime,
)

from tsetmc import (
    _F,
    _FARSI_NORM,
    FlowType as _FlowType,
    InstrumentInfo,
    MarketState,
    _api,
    _csv2df,
    _DataFrame,
    _get,
    _get_data,
    _get_par_tree,
    _jdatetime,
    _jstrptime,
    _numerize,
    _parse_market_state,
    _rc,
    _TypedDict,
)

_j_ymd_parse = _partial(_jstrptime, format='%Y/%m/%d')


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
_RELATED_COMPANIES = _rc(r'var RelatedCompanies=(\[.*\]);').search
_TRADE_HISTORY = _rc(r'var TradeHistory=(\[.*\]);').search
_STR_TO_NUM = _partial(_rc(rf"'{_F}'").sub, r'\1')


class ClassProperty:
    def __init__(self, method):
        self.method = method

    def __get__(self, owner_self, owner_cls):
        return self.method(owner_cls)


# note: this class is public through dataset module
class _LazyDS:
    l18s_to_l30_code: dict[str, tuple[str, str]] = None
    l30s_to_l18_code: dict[str, tuple[str, str]] = None
    cached_df: _DataFrame = None
    path = Path(__file__).parent / 'dataset/dataset.csv'

    @ClassProperty
    def df(cls) -> _DataFrame:
        if cls.cached_df is None:
            cls.cached_df = _read_csv(
                cls.path,
                low_memory=False,
                lineterminator='\n',
                dtype='string',
                encoding='utf-8-sig',
            )
        return cls.cached_df

    @classmethod
    def l30_code(cls, l18: str) -> tuple[str, str]:
        df = cls.df
        d = cls.l18s_to_l30_code = dict(
            zip(df['l18'], [*zip(df['l30'], df['ins_code'])])
        )
        g = cls.l30_code = d.get
        return g(l18)

    @classmethod
    def l18_l130(cls, code: str) -> tuple[str, str]:
        df = cls.df
        d = cls.l30s_to_l18_code = dict(
            zip(df['ins_code'], [*zip(df['l18'], df['l30'])])
        )
        g = cls.l18_l130 = d.get
        return g(code)


class IntraDay(_TypedDict, total=False):
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


class LiveData(_TypedDict, total=False):
    best_limits: _DataFrame
    market_state: MarketState
    nav: int
    nav_datatime: _jdatetime
    pc: int
    pf: int
    pl: int
    pmax: int
    pmin: int
    py: int
    status: str
    timestamp: _Ts
    timestamp: str
    tno: int
    tval: int
    tvol: int


class ETF(_TypedDict):
    insCode: str
    deven: int
    hEven: int
    pRedTran: float
    pSubTran: float
    iClose: int


class InstrumentState(_TypedDict):
    idn: int
    dEven: int
    hEven: int
    insCode: None
    lVal18AFC: None
    lVal30: None
    cEtaval: str
    realHeven: int
    underSupervision: int
    cEtavalTitle: str


class ClosingPriceInfo(_TypedDict):
    instrumentState: InstrumentState
    instrument: None
    lastHEven: int
    finalLastDate: int
    nvt: float
    mop: int
    thirtyDayClosingHistory: None
    priceChange: float
    priceMin: float
    priceMax: float
    priceYesterday: float
    priceFirst: float
    last: bool
    id: int
    insCode: str
    dEven: int
    hEven: int
    pClosing: float
    iClose: bool
    yClose: bool
    pDrCotVal: float
    zTotTran: float
    pRedTran: float
    qTotTran5J: float
    qTotCap: float


class ClientType(_TypedDict):
    buy_I_Volume: float
    buy_N_Volume: float
    buy_DDD_Volume: float
    buy_CountI: int
    buy_CountN: int
    buy_CountDDD: int
    sell_I_Volume: float
    sell_N_Volume: float
    sell_CountI: int
    sell_CountN: int


class Sector(_TypedDict):
    dEven: int
    cSecVal: str
    lSecVal: str


class SubSector(_TypedDict):
    dEven: int
    cSecVal: None
    cSoSecVal: int
    lSoSecVal: str


class Identity(_TypedDict):
    sector: Sector
    subSector: SubSector
    cValMne: str
    lVal18: str
    cSocCSAC: str
    lSoc30: str
    yMarNSC: str
    yVal: str
    insCode: str
    lVal30: str
    lVal18AFC: str
    flow: int
    cIsin: str
    zTitad: float
    baseVol: int
    instrumentID: str
    cgrValCot: str
    cComVal: str
    lastDate: int
    sourceID: int
    flowTitle: str
    cgrValCotTitle: str


class ShareHolder(_TypedDict):
    shareHolderID: int
    shareHolderName: str | None  # None: reserved code of ETFs
    cIsin: str
    dEven: int
    numberOfShares: float
    perOfShares: float
    change: int
    changeAmount: float
    shareHolderShareID: int


class Message(_TypedDict):
    tseMsgIdn: int
    dEven: int
    hEven: int
    tseTitle: str
    tseDesc: str
    flow: int


class Codal(_TypedDict):
    id: int
    symbol: str
    name: str
    title: str
    sentDateTime_Gregorian: str
    publishDateTime_Gregorian: str
    publishDateTime_DEven: int
    mainTableRowID: int
    hasHtmlReport: int
    hasExcelReport: int
    hasPDFReport: int
    hasXMLReport: int
    attachmentID: int
    contentType: int
    fileName: str
    fileExtension: str
    tracingNo: str


class Instrument:
    __slots__ = 'code', '_l18', '_l30', '_cisin', '_cs'

    def __init__(self, code: str | int, l18: str = None, l30: str = None):
        self.code = f'{code}'
        self._l18 = l18
        self._l30 = l30

    def __repr__(self):
        # not using self.l18 because it may require a web request
        if self._l18 is not None:
            return f'Instrument({self.code}, {self._l18!r})'
        if self._l30 is not None:
            return f'Instrument({self.code}, l30={self._l30!r})'
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
            self._l18, self._l30 = _LazyDS.l18_l130(self.code)
        except TypeError:  # cannot unpack non-iterable NoneType object
            await self.info()
        return self._l18

    @property
    async def _arabic_l18(self) -> str:
        return (await self.l18).translate(_FARSI_NORM_REVERSED)

    @property
    async def l30(self) -> str:
        if (l30 := self._l30) is not None:
            return l30
        try:
            self._l18, self._l30 = _LazyDS.l18_l130(self.code)
        except TypeError:  # cannot unpack non-iterable NoneType object
            await self.info()
        return self._l30

    @property
    async def cisin(self) -> str:
        try:
            return self._cisin
        except AttributeError:
            await self.info()
        return self._cisin

    @property
    async def cs(self) -> str:
        try:
            return self._cs
        except AttributeError:
            await self.info()
        return self._cs

    @staticmethod
    async def from_l18(l18: str, /) -> 'Instrument':
        try:
            l30, ins_code = _LazyDS.l30_code(l18)
        except TypeError:  # cannot unpack non-iterable NoneType object
            return await Instrument.from_search(l18)
        return Instrument(ins_code, l18, l30)

    async def info(self) -> InstrumentInfo:
        j = await _api(f'Instrument/GetInstrumentInfo/{self.code}', fa=True)
        d = j['instrumentInfo']
        # cache for properties
        self._cs = d['sector']['cSecVal']
        self._cisin = d['cIsin']
        self._l18 = d['lVal18AFC']
        self._l30 = d['lVal30']
        return j['instrumentInfo']

    async def trades(self) -> _DataFrame:
        j = await _api(f'Trade/GetTrade/{self.code}')
        df = _DataFrame(j['trade'], copy=False)
        return df

    async def codal(self, n=9) -> list[Codal]:
        j = await _api(
            f'Codal/GetPreparedDataByInsCode/{n}/{self.code}', fa=True
        )
        return j['preparedData']

    async def daily_closing_price(self, n=0) -> _DataFrame:
        """n is the number of days. Use 0 (default) to fetch all.

        result.index.is_monotonic_decreasing.
        """
        j = await _api(
            f'ClosingPrice/GetClosingPriceDailyList/{self.code}/{n}'
        )
        df = _DataFrame(j['closingPriceDaily'], copy=False)
        datetime = df['datetime'] = _to_datetime(
            df.pop('dEven').astype(str)
            + df.pop('hEven').astype(str).str.rjust(6, '0')
        )
        df['date'] = datetime.dt.normalize()
        df.set_index('date', inplace=True)
        return df

    async def closing_price_info(self) -> ClosingPriceInfo:
        j = await _api(
            f'ClosingPrice/GetClosingPriceInfo/{self.code}', fa=True
        )
        return j['closingPriceInfo']

    async def best_limits(self) -> _DataFrame:
        j = await _api(f'BestLimits/{self.code}')
        df = _DataFrame(j['bestLimits'], copy=False)
        return df

    async def client_type(self) -> ClientType:
        j = await _api(f'ClientType/GetClientType/{self.code}/1/0')
        return j['clientType']

    async def etf(self) -> ETF:
        """Return ETF data. (Includes redemption NAV and datetime of it).

        This method is only valid for ETFs.
        """
        j = await _api(f'Fund/GetETFByInsCode/{self.code}')
        return j['etf']

    async def related_companies(self, cs=None) -> dict[str, _DataFrame]:
        if cs is None:
            cs = await self.cs

        from tsetmc.general import related_companies

        return await related_companies(cs)

    async def page_data(
        self, general=True, trade_history=False, related_companies=False
    ) -> dict:
        """Return the static info found on instrument's page.

        :param general: parse general data including bvol, cisin, etc.
        :param trade_history: include trade_history in the result.
        :param related_companies: parse and include related_companies.

        For the meaning of yval column values see:
            https://members.tsetmc.com/Site.aspx?ParTree=1114111118&LnkIdn=83

        For the meaning of other column names see:
            http://www.tsetmc.com/Site.aspx?ParTree=151713

        Alternative methods from the new API:
        - self.info
        - self.related_companies
        - self.daily_closing_price
        """
        _warn(
            '`Instrument.page_data` is deprecated; see its doc-string for alternatives',
            DeprecationWarning,
            stacklevel=2,
        )

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
            cs = self._cs = m['CSecVal']
            result = {
                'bvol': int(m['BaseVol']),
                'cisin': cisin,
                'cs': int(cs),
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
                'z': int(m['ZTitad']),
            }
        else:
            result = {}
            m = None
        if trade_history:
            m = _TRADE_HISTORY(text, m.end())
            th = _literal_eval(_STR_TO_NUM(m[1]))
            th = _DataFrame(
                th,
                copy=False,
                columns=(
                    'date',
                    'pc',
                    'py',
                    'pmin',
                    'pmax',
                    'tno',
                    'tvol',
                    'tval',
                ),
            )
            th['date'] = _to_datetime(th['date'], format='%Y%m%d')
            th.set_index('date', inplace=True)
            result['trade_history'] = th
        if related_companies:
            m = _RELATED_COMPANIES(text, m.end())
            result['related_companies'] = [
                Instrument(code, l18, l30)
                for (code, l18, l30) in _literal_eval(_STR_TO_NUM(m[1]))
            ]
        return result

    async def live_data(
        self, general=True, best_limits=False, market_state=False
    ) -> LiveData:
        """Return live data price/order data using instinfodata.aspx module.

        :keyword best_limits: parse best_limits and include related values.
        :keyword market_state: parse values related to market state.

        Alternatives from the new API:
        - `Instrument.closing_price_info`
        - `Instrument.best_limits`
        - `Instrument.etf`
        - `general.market_overview`
        """
        _warn(
            '`Instrument.live_data` is deprecated; see its doc-string for alternatives',
            DeprecationWarning,
            stacklevel=2,
        )
        # apparently, http://www.tsetmc.com/tsev2/data/instinfodata.aspx?i=...
        # and http://www.tsetmc.com/tsev2/data/instinfofast.aspx?i=...
        # return the same response.
        text = await _get_data(
            'instinfodata.aspx'
            # &e=1 parameter is required to get cancel NAV for ETFs but it
            # seems to be ignored if no NAV is defined for the instrument.
            # &c= is normally set to CSecVal, but does not seem to be required.
            # CSecVal is industry group code:
            # http://redirectcdn.tsetmc.com/Site.aspx?ParTree=111411111B&LnkIdn=107
            f'?i={self.code}&c=&e=1',
            fa=True,
        )
        # the _s are unknown
        try:
            (
                price_info,
                index_info,
                orders_info,
                _,
                _,
                _,
                group_info,
                _,
                _,
            ) = text.split(';')
        except ValueError:
            _warning(text)  # usually means the service is unavailable
            raise
        if general:
            result = _parse_price_info(price_info)
        else:
            result = {}
        if market_state:
            if index_info:  # sometimes index_info is an empty string
                result['market_state'] = _parse_market_state(index_info)
        if best_limits:
            result['best_limits'] = _csv2df(
                _StringIO(orders_info),
                sep='@',
                names=('zd', 'qd', 'pd', 'po', 'qo', 'zo'),
                lineterminator=',',
            )
        return result

    async def trade_history(self, top: int, all_=False) -> _DataFrame:
        """Get history of pmax, pmin, pc, pl, pf, py, tval, tvol, and tno.

        :param top: number of top rows (days) to return
        :param all_: include dates with no trade

        Use :meth:`Instrument.on_date(<date>).trades` for intraday trades.
        """
        _warn(
            '`Instrument.trade_history` is deprecated; use `Instrument.daily_closing_price` instead.',
            DeprecationWarning,
            stacklevel=2,
        )
        content = await _get_data(
            f'InstTradeHistory.aspx?i={self.code}&Top={top}&A={all_:d}'
        )
        df = _csv2df(
            _BytesIO(content),
            sep='@',
            names=(
                'date',
                'pmax',
                'pmin',
                'pc',
                'pl',
                'pf',
                'py',
                'tval',
                'tvol',
                'tno',
            ),
            index_col='date',
            parse_dates=True,
        )
        return df

    async def price_history(self, adjusted: bool = True) -> _DataFrame:
        # As far as I can thll the new tsetmc site does not have any
        # API for adjusted price history, but see self.price_adjustments.
        content = await _get(
            f'https://members.tsetmc.com/tsev2/chart/data/Financial.aspx?i={self.code}&t=ph&a={adjusted:d}'
        )
        df = _csv2df(
            _BytesIO(content),
            names=('date', 'pmax', 'pmin', 'pf', 'pl', 'tvol', 'pc'),
            index_col='date',
            parse_dates=True,
        )
        return df

    async def client_type_history_old(self) -> _DataFrame:
        """Get daily natural/legal history.

        In column names `n_` prefix stands for natural and `l_` for legal.

        This method returns the information available at the "حقیقی-حقوقی" tab
        of the instrument. It uses the `clienttype.aspx` module of
        old.tsetmc.com.

        This method may stop working in the future if the old tsetmc site
        shuts down.

        See also:
            :meth:`Instrument.client_type_history`
        """
        _warn(
            '`Instrument.client_type_history_old` is deprecated; use `Instrument.client_type_history` instead.',
            DeprecationWarning,
            stacklevel=2,
        )
        return _csv2df(
            _BytesIO(await _get_data(f'clienttype.aspx?i={self.code}')),
            names=(
                'date',
                'n_buy_count',
                'l_buy_count',
                'n_sell_count',
                'l_sell_count',
                'n_buy_volume',
                'l_buy_volume',
                'n_sell_volume',
                'l_sell_volume',
                'n_buy_value',
                'l_buy_value',
                'n_sell_value',
                'l_sell_value',
            ),
            index_col='date',
            parse_dates=True,
            dtype='int64',
        )

    async def client_type_history(
        self, date: int | str = None
    ) -> _DataFrame | dict:
        """Return natural/legal client type history.

        :param date: Gregorian date in YYYYMMDD format. If None, return the
            full history as a DataFrame. Otherwise, return the data for that
            specific date as a dict.

        Legal persoans are indicated with `N`, natural persons with `I`.

        See also:
            :meth:`Instrument.client_type`
        """
        if date is None:
            # the following api call returns a result that is equivalent to
            # j = (await _api(f'ClientType/GetClientType/{self.code}/1/0'))[
            #     'clientType']
            j = await _api(f'ClientType/GetClientTypeHistory/{self.code}')
            return _DataFrame(j['clientType'], copy=False)

        j = await _api(f'ClientType/GetClientTypeHistory/{self.code}/{date}')
        return j['clientType']

    async def identification(self) -> dict:
        """Return the information available in the identification (شناسه) tab.

        Related API descriptions:
            https://cdn.tsetmc.com/Site.aspx?ParTree=1114111118&LnkIdn=83
            http://en.tsetmc.com/Site.aspx?ParTree=111411111Z

        This method uses old.tsetmc.com.
        For the new API use `Instrument.identity`.
        """
        _warn(
            '`Instrument.identification` is deprecated; use `Instrument.identity` instead.',
            DeprecationWarning,
            stacklevel=2,
        )
        text = await _get_par_tree(f'15131M&i={self.code}')
        df = _html_to_df(text)
        return dict(zip(df[0], df[1]))

    async def identity(self) -> Identity:
        j = await _api(
            f'Instrument/GetInstrumentIdentity/{self.code}', fa=True
        )
        return j['instrumentIdentity']

    async def introduction(self) -> dict[str, str]:
        """Return the information available in introduction (معرفی) tab."""
        _warn(
            '`Instrument.introduction` is deprecated; use `Instrument.publisher` instead.',
            DeprecationWarning,
            stacklevel=2,
        )
        text = await _get_par_tree(f'15131V&s={await self._arabic_l18}')
        df = _html_to_df(text)
        return dict(zip(df[0].str.removesuffix(' :'), df[1]))

    async def publisher(self) -> dict:
        j = await _api(
            f'Codal/GetCodalPublisherBySymbol/{await self._arabic_l18}',
            fa=True,
        )
        return j['codalPublisher']

    @staticmethod
    async def from_search(s: str) -> 'Instrument':
        """`Search for `s` and return the first result as an Instrument."""
        d = (await search(s))[0]
        return Instrument(d['insCode'], d['lVal18AFC'], d['lVal30'])

    async def share_holders(self) -> list[ShareHolder]:
        """Return a list of the current major holders of this instrument."""
        j = await _api(
            f'Shareholder/GetInstrumentShareHolderLast/{self.code}', fa=True
        )
        return j['shareHolder']

    async def share_holder_history(
        self,
        share_holder_id: int,
        days: int = 90,
    ) -> _DataFrame:
        """Return history of share changes of a particular holder.

        Obtain `share_holder_id` from `self.share_holders`.
        To get other companies of the same shareholder use the
        `share_holder_companies` function.
        """
        j = await _api(
            f'Shareholder/GetShareHolderHistory/{self.code}/{share_holder_id}/{days}',
            fa=True,
        )
        df = _DataFrame(j['shareHolder'], copy=False)
        df['dEven'] = _to_datetime(df['dEven'], format='%Y%m%d')
        df.set_index('dEven', inplace=True)
        return df

    async def holders(self, cisin=None) -> _DataFrame:
        """Get list of current major unit/shareholders.

        If `cisin` is not provided, it will be fetched using a web request.

        See also:
            :meth:`Instrument.on_date(<date>).holders`
        """
        _warn(
            '`Instrument.holders` is deprecated; use `Instrument.share_holders` instead.',
            DeprecationWarning,
            stacklevel=2,
        )
        if cisin is None:
            cisin = await self.cisin
        text = await _get_par_tree(f'15131T&c={cisin}')
        df = _html_to_df(text)
        df.drop(columns='Unnamed: 4', inplace=True)
        # todo: use separate columns
        df.columns = ['holder', 'shares/units', '%', 'change']
        df['id_cisin'] = _findall(r"ShowShareHolder\('([^']*)'\)", text)
        if df['change'].dtype == 'string':
            _numerize(df, ('change',), 'Int64')
        _numerize(df, ('shares/units',), 'int64')
        return df

    @staticmethod
    async def holder(
        id_cisin, history=True, other_holdings=False
    ) -> _DataFrame | tuple[_DataFrame, _DataFrame]:
        """Return history/other holdings for the given holder id_cisin.

        `id_cisin` is usually obtained using `self.holders`.

        If both `history` and `other_holdings` are True, then a tuple of
        DataFrames will be returned.
        """
        _warn(
            '`Instrument.holder` is deprecated; use `Instrument.share_holder_history` or `instruments.share_holder_companies` instead.',
            DeprecationWarning,
            stacklevel=2,
        )
        text = await _get_data(f'ShareHolder.aspx?i={id_cisin}', fa=True)
        hist, _, oth = text.partition('#')

        def history_df() -> _DataFrame:
            return _csv2df(
                _StringIO(hist),
                names=('date', 'shares'),
                dtype='int64',
                index_col='date',
                parse_dates=True,
            )

        def other_holdings_df() -> _DataFrame:
            return _csv2df(
                _StringIO(oth),
                names=('ins_code', 'name', 'shares', 'percent'),
                index_col='ins_code',
            )

        if history and other_holdings:
            return history_df(), other_holdings_df()
        elif history:
            return history_df()
        else:
            return other_holdings_df()

    async def adjustments(self) -> _DataFrame:
        _warn(
            '`Instrument.adjustments` is deprecated; use `Instrument.price_adjustments` instead.',
            DeprecationWarning,
            stacklevel=2,
        )
        content = await _get_par_tree(f'15131G&i={self.code}', fa=False)
        df = _html_to_df(content.decode())
        df.columns = ('date', 'adj_pc', 'pc')
        df['date'] = df['date'].apply(_j_ymd_parse)
        return df

    async def price_adjustments(self) -> _DataFrame:
        j = await _api(f'ClosingPrice/GetPriceAdjustList/{self.code}')
        df = _DataFrame(j['priceAdjust'], copy=False)
        df['dEven'] = _to_datetime(df['dEven'], format='%Y%m%d')
        df.set_index('dEven', inplace=True)
        return df

    async def messages(self) -> list[Message]:
        """See also: ``general.messages`` and ``general.search_messages``."""
        j = await _api(f'Msg/GetMsgByInsCode/{self.code}', fa=True)
        return j['msg']

    async def ombud_messages(self) -> _DataFrame:
        _warn(
            '`Instrument.ombud_messages` is deprecated; use `Instrument.messages` instead.',
            DeprecationWarning,
            stacklevel=2,
        )
        return _parse_ombud_messages(
            await _get_par_tree(f'15131W&i={self.code}')
        )

    async def dps_history(self) -> _DataFrame:
        """Get DPS history.

        :raises pandas.errors.EmptyDataError: No columns to parse from file
        """
        # Note: Currently does not have an _api equivalent. The DPS tab is
        # non-functional in the new tsetmc website.
        content = await _get_data(f'DPSData.aspx?s={await self._arabic_l18}')
        df = _csv2df(
            _BytesIO(content),
            header=None,
            sep='@',
        )
        cols = [
            'publish_date',
            'meeting_date',
            'fiscal_year',
            'profit_or_loss_after_tax',
            'distributable_profit',
            'accumulated_profit_at_the_end_of_the_period',
            'cash_earnings_per_share',
        ]
        df.columns = cols
        for col in cols[:3]:
            df[col] = df[col].map(_partial(_jstrptime, format='%Y/%m/%d'))
        return df

    def on_date(self, date: int | str) -> 'InstrumentOnDate':
        """Return an object resembling Instrument on a specific date.

        :param date: Gregorian date in YYYYMMDD format.

        :note: methods of InstrumentOnDate are rate-limited.
            Avoid making simultaneous calls.
        """
        return InstrumentOnDate(_inst=self, _date=date)


class ClosingPrice(_TypedDict):
    priceChange: float
    priceMin: float
    priceMax: float
    priceYesterday: float
    priceFirst: float
    last: bool
    id: int
    insCode: str
    dEven: int
    hEven: int
    pClosing: float
    iClose: bool
    yClose: bool
    pDrCotVal: float
    zTotTran: float
    qTotTran5J: float
    qTotCap: float


class ClientTypeOnDate(_TypedDict):
    recDate: int
    insCode: str
    buy_I_Volume: float
    buy_N_Volume: float
    buy_I_Value: float
    buy_N_Value: float
    buy_N_Count: int
    sell_I_Volume: float
    buy_I_Count: float
    sell_N_Volume: float
    sell_I_Value: float
    sell_N_Value: float
    sell_N_Count: int
    sell_I_Count: int


class InstrumentOnDate:
    __slots__ = 'date', 'code', 'inst'

    def __init__(self, /, *, _inst: Instrument, _date: int | str):
        """Return an object resembling Instrument on a specific date.

        :param _inst: Instrument
        :param _date: Gregorian date in YYYYMMDD format.

        Users should not instantiate this class directly, but use
        :meth:`Instrument.on_date` instead.

        :note: methods of InstrumentOnDate are rate-limited.
            Avoid making simultaneous calls.
        """
        self.date = _date
        self.inst = _inst
        self.code = _inst.code

    async def closing_price(self) -> ClosingPrice:
        """Return general closing price info.

        Result dict has the following keys: {
        'priceChange', 'priceMin', 'priceMax', 'priceYesterday', 'priceFirst',
        'last', 'id', 'insCode', 'dEven', 'hEven', 'pClosing', 'iClose',
        'yClose', 'pDrCotVal', 'zTotTran', 'qTotTran5J', 'qTotCap'}
        """
        j = await _api(
            f'ClosingPrice/GetClosingPriceDaily/{self.code}/{self.date}'
        )
        return j['closingPriceDaily']

    async def closing_price_history(self) -> _DataFrame:
        """Get intraday closing price history."""
        j = await _api(
            f'ClosingPrice/GetClosingPriceHistory/{self.code}/{self.date}'
        )
        return _DataFrame(j['closingPriceHistory'], copy=False)

    async def states(self) -> _DataFrame:
        """Get intraday instrument states.

        http://www.tsetmc.com/Site.aspx?ParTree=111411111Y&LnkIdn=833
        """
        j = await _api(
            f'MarketData/GetInstrumentState/{self.code}/{self.date}'
        )
        return _DataFrame(j['instrumentState'], copy=False)

    async def client_type(self) -> ClientTypeOnDate:
        return await self.inst.client_type_history(self.date)

    async def client_types(self) -> dict:
        _warn(
            '`InstrumentOnDate.client_types` is deprecated; use `InstrumentOnDate.client_type` instead.',
            DeprecationWarning,
            stacklevel=2,
        )
        return await self.client_type()

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
        j = await _api(
            f'MarketData/GetStaticThreshold/{self.code}/{self.date}'
        )
        return _DataFrame(j['staticThreshold'], copy=False)

    async def data(self) -> dict:
        """Get general info about the instrument on the specific date.

        The returned dict contains the following keys: {
        'insCode', 'lVal30', 'lVal18AFC', 'flow', 'cIsin', 'zTitad', 'baseVol',
        'instrumentID', 'cgrValCot', 'cComVal', 'lastDate', 'sourceID',
        'flowTitle', 'cgrValCotTitle'}
        """
        j = await _api(
            f'Instrument/GetInstrumentHistory/{self.code}/{self.date}'
        )
        return j['instrumentHistory']


async def price_adjustments(flow: _FlowType) -> _DataFrame:
    """Get price adjustments for a particular flow.

    Related APIs:
        http://cdn.tsetmc.com/Site.aspx?ParTree=1114111124&LnkIdn=843
    """
    text = await _get_par_tree(f'151319&Flow={flow}')
    df = _html_to_df(text)
    df.columns = ('l18', 'l30', 'date', 'adj_pc', 'pc')
    df['date'] = df['date'].apply(_j_ymd_parse)
    return df


async def old_search(skey: str, /) -> _DataFrame:
    """`skey` (search key) is usually part of the l18 or l30."""
    return _csv2df(
        _StringIO(await _get_data('search.aspx?skey=' + skey, fa=True)),
        header=None,
        # Another terminology would be: {
        #   ins_code: round_lot,
        #   retail: odd_lot,
        #   compensation: buyback,
        #   wholesale: block,
        # } see: https://www.sena.ir/news/77488/
        names=(
            'l18',
            'l30',
            'ins_code',
            'retail',
            'compensation',
            'wholesale',
            '_unknown1',
            '_unknown2',
            '_unknown3',
            '_unknown4',
            '_unknown5',
        ),
    )


class Search(_TypedDict):
    insCode2: str
    insCode3: str
    insCode4: str
    insCode: str
    lVal30: str
    lVal18AFC: str
    flow: int
    cIsin: None
    zTitad: float
    baseVol: int
    instrumentID: None
    cgrValCot: str
    cComVal: None
    lastDate: int
    sourceID: int
    flowTitle: str
    cgrValCotTitle: str


async def search(s: str, /) -> list[Search]:
    r = await _api(f'Instrument/GetInstrumentSearch/{s}', fa=True)
    return r['instrumentSearch']


class InstrumentType(_TypedDict, total=False):
    cValMne: None
    lVal18: None
    cSocCSAC: None
    lSoc30: None
    yMarNSC: None
    yVal: None
    insCode: str
    lVal30: str
    lVal18AFC: str
    flow: int
    cIsin: None
    zTitad: float
    baseVol: int
    instrumentID: None
    cgrValCot: None
    cComVal: None
    lastDate: int
    sourceID: int
    flowTitle: None
    cgrValCotTitle: None


class ShareHolderCompany(_TypedDict):
    instrument: InstrumentType
    numberOfShares: float
    perOfShares: float


async def share_holder_companies(
    share_holder_share_id: int | str, /
) -> list[ShareHolderCompany]:
    r = await _api(
        f'Shareholder/GetShareHolderCompanyList/{share_holder_share_id}',
        fa=True,
    )
    return r['shareHolderShare']


def _parse_price_info(price_info):
    price_parts = price_info.split(',')

    if len(price_parts) == 17:
        # this is unexpected according to js source
        assert price_parts[14] == price_parts[10]
        del price_parts[14]

    (  # see dev/tsetmc_source_files/Instinfo.js
        time,  # 0
        status,  # 1
        pl,  # 2
        pc,  # 3
        pf,  # 4
        py,  # 5
        pmin,  # 6
        pmax,  # 7
        tno,  # 8
        tvol,  # 9
        tval,  # 10
        _,  # 11 is used to add css styles for pc/pl, not important.
        info_datetime_date,  # 12
        last_info_time,  # 13
        nav_datetime,  # 14
        nav,  # 15
    ) = price_parts

    result = {
        'time': time,
        'status': status,
        'timestamp': _Ts(f'{info_datetime_date}{last_info_time:>06}'),
        'pl': int(pl),
        'pc': int(pc),
        'pf': int(pf),
        'py': int(py),
        'pmin': int(pmin),
        'pmax': int(pmax),
        'tno': int(tno),
        'tvol': int(tvol),
        'tval': int(tval),
    }

    if nav:
        result['nav'] = int(nav)
        try:
            _jdatetime(1400, 12, 1, 16, 30, 0)
            _fullmatch(r'(\d+)/(\d+)/(\d+) (\d+):(\d+):(\d+)', nav_datetime)
            result['nav_datetime'] = _jstrptime(
                nav_datetime, '%Y/%m/%d %H:%M:%S'
            )
        except ValueError:  # could be invalid day of the month
            result['nav_datetime'] = nav_datetime

    return result


def _parse_ombud_messages(text) -> _DataFrame:
    headers = _findall(r'<th>(.+?)</th>', text)
    dates = _findall(r"<th class='ltr'>(.+?)</th>", text)
    descriptions = _findall(r'<td colspan="2">(.+?)<hr />\s*</td>', text)
    df = _DataFrame(
        {'header': headers, 'date': dates, 'description': descriptions},
        dtype='string',
        copy=False,
    )
    if dates:  # pandas cannot do ('14' + df['date']) on empty dates
        df['date'] = ('14' + df['date']).apply(
            _jstrptime, format='%Y/%m/%d %H:%M'
        )
    else:
        df['date'] = df['date'].astype(object)
    return df
