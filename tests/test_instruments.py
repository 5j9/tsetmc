from datetime import date

from numpy import int64
from polars import (
    Boolean,
    DataFrame,
    Date,
    Datetime,
    Float64,
    Int64,
    LazyFrame,
    Null,
    String,
    Time,
    col,
    len as pl_len,
)
from pytest import skip, warns
from pytest_aiohutils import file, files, validate_dict

from tsetmc import InstrumentInfo

# noinspection PyProtectedMember
from tsetmc.instruments import (
    _SEARCH_SCHEMA,
    ETF,
    ClientType,
    ClosingPriceInfo,
    Codal,
    Identity,
    Instrument,
    Message,
    Search,
    ShareHolder,
    ShareHolderCompany,
    _parse_price_info,
    old_search,
    price_adjustments,
    search,
    share_holder_companies,
)

string = 'string'


FMELLI = Instrument(35425587644337450)


@file('fmelli_trade_history_top2.txt')
async def test_trade_history():
    with warns(DeprecationWarning):
        ldf0 = await FMELLI.trade_history(2)  # ty: ignore[deprecated]

    df0 = ldf0.collect()

    assert list(df0.schema.items()) == [
        ('date', Date),
        ('pmax', Float64),
        ('pmin', Float64),
        ('pc', Float64),
        ('pl', Float64),
        ('pf', Float64),
        ('py', Float64),
        ('tval', Float64),
        ('tvol', Int64),
        ('tno', Int64),
    ]

    with warns(DeprecationWarning):
        ldf1 = await FMELLI.trade_history(2, True)  # ty: ignore[deprecated]

    df1 = ldf1.collect()
    assert len(df1) >= len(df0)


VSADID = Instrument('41713045190742691')


@file('search_firuze.json')
async def test_from_search_with_numeric_description():
    # note the "30" in فيروزه - صندوق شاخص30 شركت فيروزه- سهام
    i = await Instrument.from_search('فیروزه')
    assert i.code == '66036975502302203'
    assert await i.l18 == 'فیروزه'


async def test_repr():
    # known l18
    assert (
        repr(await Instrument.from_l18('فملی'))
        == "Instrument(35425587644337450, 'فملی')"
    )
    # unknown l18
    assert repr(Instrument(1)) == 'Instrument(1)'
    assert (
        repr(Instrument(1, l30='مجتمع جهان فولاد سيرجان'))
        == "Instrument(1, l30='مجتمع جهان فولاد سيرجان')"
    )


async def test_equal():
    assert await Instrument.from_l18('فملی') == Instrument(35425587644337450)


@file('vsadid_identity.json')
async def test_identification():
    ident = await VSADID.identity()
    assert ident == {
        'baseVol': 0,
        'cComVal': '7',
        'cIsin': 'IRO7SDIP0002',
        'cSocCSAC': 'SDIP',
        'cValMne': 'SDIP1',
        'cgrValCot': 'P1',
        'cgrValCotTitle': 'بازار پایه زرد فرابورس',
        'flow': 0,
        'flowTitle': '',
        'insCode': '0',
        'instrumentID': 'IRO7SDIP0001',
        'lSoc30': 'گروه\u200cصنعتی\u200cسدید',
        'lVal18': 'Sadid Group',
        'lVal18AFC': 'وسدید',
        'lVal30': 'گروه \u200cصنعتی\u200cسدید',
        'lastDate': 0,
        'sector': {'cSecVal': '27 ', 'dEven': 0, 'lSecVal': 'فلزات اساسی'},
        'sourceID': 0,
        'subSector': {
            'cSecVal': None,
            'cSoSecVal': 2799,
            'dEven': 0,
            'lSoSecVal': 'استخراج سایر فلزات اساسی',
        },
        'yMarNSC': 'NO',
        'yVal': '309',
        'zTitad': 0.0,
    }


@file('opal_client_types.txt')
async def test_client_type_history_old():
    with warns(DeprecationWarning):
        ldf = await Instrument(655060129740445).client_type_history_old()  # ty: ignore[deprecated]

    df = ldf.collect()

    assert list(df.schema.items()) == [
        ('date', Date),
        ('n_buy_count', Int64),
        ('l_buy_count', Int64),
        ('n_sell_count', Int64),
        ('l_sell_count', Int64),
        ('n_buy_volume', Int64),
        ('l_buy_volume', Int64),
        ('n_sell_volume', Int64),
        ('l_sell_volume', Int64),
        ('n_buy_value', Int64),
        ('l_buy_value', Int64),
        ('n_sell_value', Int64),
        ('l_sell_value', Int64),
    ]


@file('faraz_GetClientTypeHistory_20220222.json')
async def test_client_type_history():
    d = await Instrument(13666407494621646).client_type_history(20220222)
    assert d.keys() == {
        'recDate',
        'insCode',
        'buy_I_Volume',
        'buy_N_Volume',
        'buy_I_Value',
        'buy_N_Value',
        'buy_N_Count',
        'sell_I_Volume',
        'buy_I_Count',
        'sell_N_Volume',
        'sell_I_Value',
        'sell_N_Value',
        'sell_N_Count',
        'sell_I_Count',
    }


@file('fzar_GetClientTypeHistory_all.json')
async def test_client_type_history_no_date():
    lf = await Instrument(8175784894140974).client_type_history()
    df = lf.collect()

    assert list(df.schema.items()) == [
        ('recDate', Int64),
        ('insCode', String),
        ('buy_I_Volume', Float64),
        ('buy_N_Volume', Float64),
        ('buy_I_Value', Float64),
        ('buy_N_Value', Float64),
        ('buy_N_Count', Int64),
        ('sell_I_Volume', Float64),
        ('buy_I_Count', Float64),
        ('sell_N_Volume', Float64),
        ('sell_I_Value', Float64),
        ('sell_N_Value', Float64),
        ('sell_N_Count', Int64),
        ('sell_I_Count', Int64),
    ]


AVA = Instrument('18007109712724189')


@files(  # id_cisin may change from time to time
    'ava_holders.txt',
    'ava_holder.txt',
    'ava_holder.txt',
    'ava_holder.txt',
    'ava_holder.txt',
)
async def test_holders_holder():
    with warns(DeprecationWarning):
        lf_holders = await AVA.holders(cisin='IRT3AVAF0003')  # ty: ignore[deprecated]

    df_holders = lf_holders.collect()
    schema = dict(df_holders.schema)

    assert schema == {
        'change': Int64,
        'holder': String,
        'shares/units': Int64,
        '%': Float64,
        'id_cisin': String,
    }
    assert not df_holders['change'].has_nulls()
    assert not df_holders['shares/units'].has_nulls()

    if df_holders.is_empty():
        return

    id_cisin = df_holders['id_cisin'][-1]

    with warns(DeprecationWarning):
        lf_hist, lf_oth = await AVA.holder(id_cisin, True, True)  # ty: ignore[deprecated]

    df_hist = lf_hist.collect()
    df_oth = lf_oth.collect()

    assert [*df_hist.schema.items()] == [
        ('date', Date),
        ('shares', Int64),
    ]

    assert [*df_oth.schema.items()] == [
        ('ins_code', String),
        ('name', String),
        ('shares', Int64),
        ('percent', Float64),
    ]

    with warns(DeprecationWarning):
        lf_hist = await AVA.holder('43789,IRT3AVAF0003', True)  # ty: ignore[deprecated]
    assert type(lf_hist) is LazyFrame

    with warns(DeprecationWarning):
        lf_oth = await AVA.holder('43789,IRT3AVAF0003', False, True)  # ty: ignore[deprecated]
    assert type(lf_oth) is LazyFrame

    with warns(DeprecationWarning):
        lf_result = await AVA.holder('43789,IRT3AVAF0003', False)  # ty: ignore[deprecated]

    # Polars equals check on LazyFrame queries or collected DataFrames
    assert lf_oth.collect().equals(lf_result.collect())


@files(  # share_holder_share_id may change from time to time
    'ava_holders.json',
    'share_holder_companies.json',
    'ava_share_holder_history.json',
)
async def test_share_holders_companies_histories():
    holders = await AVA.share_holders()
    if not holders:
        return
    first_holder = holders[0]
    validate_dict(first_holder, ShareHolder)

    share_holder_share_id = first_holder['shareHolderShareID']

    companies = await share_holder_companies(share_holder_share_id)
    validate_dict(companies[0], ShareHolderCompany)

    lf = await AVA.share_holder_history(
        share_holder_id=share_holder_share_id,
        days=2,
    )
    df = lf.collect()
    assert len(df) == 2
    assert [*df.schema.items()] == [
        ('shareHolderID', Int64),
        ('shareHolderName', Null),
        ('cIsin', String),
        ('dEven', Date),
        ('numberOfShares', Float64),
        ('perOfShares', Float64),
        ('change', Int64),
        ('changeAmount', Float64),
        ('shareHolderShareID', Int64),
    ]


@file('fmelli_price_adjustment.html')
async def test_adjustments():
    with warns(DeprecationWarning):
        lf = await FMELLI.adjustments()  # ty: ignore[deprecated]

    df = lf.collect()
    assert len(df) >= 18
    assert [*df.schema.items()] == [
        ('date', Date),
        ('adj_pc', Int64),
        ('pc', Int64),
    ]


@file('price_adjustment_api.json')
async def test_price_adjustments_method():
    lf = await FMELLI.price_adjustments()
    df = lf.collect()

    assert len(df) >= 18
    assert [*df.schema.items()] == [
        ('insCode', String),
        ('dEven', Date),
        ('pClosing', Float64),
        ('pClosingNotAdjusted', Float64),
        ('corporateTypeCode', Null),
        (
            'instrument',
            Null,
        ),  # Matches Pandas dtype('O') containing all nulls/None
    ]

    # Grab the last item of the datetime column
    assert df['dEven'][-1] == date(2009, 7, 15)


@file('adjustments_flow_7.html')
async def test_price_adjustments():
    lf = await price_adjustments(7)
    df = lf.collect()

    assert list(df.schema.items()) == [
        ('l18', String),
        ('l30', String),
        ('date', Date),
        ('adj_pc', Int64),
        ('pc', Int64),
    ]
    assert len(df) == 6

    # Polars equivalent to .iat[-1, -1] assuming 'pc' is the last column
    assert df['pc'][-1] == 1000


@file('latif_financial_aph.aspx')
async def test_adjusted_price_history():
    lf = await Instrument(16422980660132735).price_history()
    df = lf.collect()

    # Check schema directly
    expected_schema = {
        'date': Date,
        'pmax': Int64,
        'pmin': Int64,
        'pf': Int64,
        'pl': Int64,
        'tvol': Int64,
        'pc': Int64,
    }

    assert df.schema == expected_schema


@file('search_mellat.txt')
async def test_old_search():
    lf = await old_search('ملت')
    df = lf.collect()
    assert type(df) is DataFrame
    assert len(df) > 40

    # Clean dictionary check against Polars types
    assert dict(df.schema) == _SEARCH_SCHEMA


@file('search_atlas.txt')
async def test_search():
    r = await search('اطلس')
    assert type(r) is list
    validate_dict(r[0], Search)


async def test_l18_without_web_request():
    assert await Instrument(46348559193224090).l18 == 'فولاد'


@file('fmelli_publisher.json')
async def test_publisher():
    inst = await Instrument.from_l18('فملی')
    publisher = await inst.publisher()
    assert publisher.keys() == {
        'activitySubject',
        'address',
        'auditorName',
        'companyId',
        'companyType',
        'companyType1',
        'displaySymbol',
        'email',
        'enActivitySubject',
        'enAddress',
        'enDisplayedSymbol',
        'enExecutiveManager',
        'enFinancialManager',
        'enInspector',
        'enManagementGroup',
        'enName',
        'enOfficeAddress',
        'enShareOfficeAddress',
        'executiveManager',
        'faxNo',
        'financialManager',
        'financialYear',
        'id',
        'inspListedCapitalector',
        'inspector',
        'isic',
        'listedCapital',
        'managementGroup',
        'name',
        'nationalCode',
        'officeAddress',
        'reportingType',
        'shareOfficeAddress',
        'state',
        'stateName',
        'symbol',
        'telNo',
        'website',
    }


@file('tajalli_ombud_messages.html')
async def test_ombud_messages():
    with warns(DeprecationWarning):
        lf = await Instrument(1301069819790264).ombud_messages()  # ty: ignore[deprecated]

    df = lf.collect()
    assert list(df.schema.items()) == [
        ('header', String),
        ('date', Datetime),
        ('description', String),
    ]


@file('shetab_messages.json')
async def test_messages():
    messages = await Instrument(64216772923447100).messages()
    validate_dict(messages[0], Message)


@file('fmelli_dps.txt')
async def test_dps_history():
    lf = await FMELLI.dps_history()
    df = lf.collect()
    if df.is_empty():
        skip('dps_history returned empty df')
    assert dict(df.schema) == {
        'publish_date': Date,
        'meeting_date': Date,
        'fiscal_year': Date,
        'profit_or_loss_after_tax': Float64,
        'distributable_profit': Float64,
        'accumulated_profit_at_the_end_of_the_period': Float64,
        'cash_earnings_per_share': Float64,
    }


def test_hash():
    assert hash(Instrument(int64(1))) == 1  # type: ignore


def test_parse_price_info():
    assert _parse_price_info(  # len == 17
        '12:29:23,A ,75910,75850,76030,75860,76280,75500,887,1599031,121280988420,1,20220430,122923,121280988420,1401/2/10 15:30:00,79184'
    ) == _parse_price_info(  # len == 16
        '12:29:23,A ,75910,75850,76030,75860,76280,75500,887,1599031,121280988420,0,20220430,122923,1401/2/10 15:30:00,79184'
    )


def test_parse_price_info_bad_date():
    # 1400/12/30 is not a valid date
    assert (
        _parse_price_info(
            '12:19:35,A ,63070,64270,62540,63550,64300,62540,30,7973,512457280,1,20220813,121935,1400/12/30 16:30:00,63354'
        )['nav_datetime']
        == '1400/12/30 16:30:00'
    )


KARIS = Instrument(69067576215760005)


@file('karis_info.json')
async def test_info_on_etf():
    info = await KARIS.info()
    validate_dict(info, InstrumentInfo)


@file('fmelli_info.json')
async def test_info_on_fmelli():
    info = await FMELLI.info()
    validate_dict(info, InstrumentInfo)


@file('karis_trades.json')
async def test_trades():
    lf = await KARIS.trades()
    df = lf.collect()

    # Polars uses .is_empty() instead of .empty
    if df.is_empty():
        return

    # Polars .schema returns a mapping of {name: DataType}
    assert list(df.collect_schema().items()) == [
        ('insCode', Null),
        ('dEven', Int64),
        ('nTran', Int64),
        ('hEven', Int64),
        ('qTitTran', Int64),
        ('pTran', Float64),
        ('qTitNgJ', Int64),
        ('iSensVarP', String),
        ('pPhSeaCotJ', Float64),
        ('pPbSeaCotJ', Float64),
        ('iAnuTran', Int64),
        ('xqVarPJDrPRf', Float64),
        ('canceled', Int64),
    ]


@file('fmelli_codal.json')
async def test_codal():
    d = await FMELLI.codal(n=3)
    assert len(d) == 3
    validate_dict(d[0], Codal)


@file('daily_closing_price_karis.json')
async def test_daily_closing_price():
    result = await KARIS.daily_closing_price(n=3)
    # Collect for further testing
    df = result.collect()
    expected_schema = {
        'priceChange': Float64,
        'priceMin': Float64,
        'priceMax': Float64,
        'priceYesterday': Float64,
        'priceFirst': Float64,
        'last': Boolean,
        'id': Int64,
        'insCode': String,
        'dEven': Int64,
        'hEven': Int64,
        'pClosing': Float64,
        'iClose': Boolean,
        'yClose': Boolean,
        'pDrCotVal': Float64,
        'zTotTran': Float64,
        'qTotTran5J': Float64,
        'qTotCap': Float64,
        'date': Date,
        'time': Time,
        'datetime': Datetime(time_unit='us'),
    }
    assert df.schema == expected_schema
    assert len(df) == 3
    assert df['date'].is_sorted(descending=True)


@file('closing_price_info_karis.json')
async def test_closing_price_info():
    info = await KARIS.closing_price_info()
    validate_dict(info, ClosingPriceInfo)


@file('best_limits.json')
async def test_best_limits():
    ldf = await KARIS.best_limits()
    df = ldf.collect()
    if df.is_empty():
        return
    assert list(df.schema.items()) == [
        ('number', Int64),
        ('qTitMeDem', Int64),
        ('zOrdMeDem', Int64),
        ('pMeDem', Float64),
        ('pMeOf', Float64),
        ('zOrdMeOf', Int64),
        ('qTitMeOf', Int64),
        ('title', Null),
        ('insCode', Null),
    ]
    assert len(df) <= 5, len(df)


@file('client_type_karis.json')
async def test_client_type():
    d = await KARIS.client_type()
    validate_dict(d, ClientType)


@file('etf_karis.json')
async def test_etf():
    d = await KARIS.etf()
    validate_dict(d, ETF)


@file('related_companies_karis.json')
async def test_related_companies():
    # await KARIS.info()['sector']['cSecVal'] == "68 "
    d = await KARIS.related_companies(cs='68 ')
    c = d['relatedCompany']
    h = d['relatedCompanyThirtyDayHistory']

    # Check relatedCompany schema - columns that are always null
    expected_c_schema = {
        'instrumentState': Null,  # Always null
        'lastHEven': Int64,
        'finalLastDate': Int64,
        'nvt': Float64,
        'mop': Int64,
        'pRedTran': Float64,
        'thirtyDayClosingHistory': Null,  # Always null
        'priceChange': Float64,
        'priceMin': Float64,
        'priceMax': Float64,
        'priceYesterday': Float64,
        'priceFirst': Float64,
        'last': Boolean,
        'id': Int64,
        'insCode': String,
        'dEven': Int64,
        'hEven': Int64,
        'pClosing': Float64,
        'iClose': Boolean,
        'yClose': Boolean,
        'pDrCotVal': Float64,
        'zTotTran': Float64,
        'qTotTran5J': Float64,
        'qTotCap': Float64,
        # Flattened instrument fields
        'cValMne': Null,  # Always null
        'lVal18': Null,  # Always null
        'cSocCSAC': Null,  # Always null
        'lSoc30': Null,  # Always null
        'yMarNSC': Null,  # Always null
        'yVal': Null,  # Always null
        'lVal30': String,
        'lVal18AFC': String,
        'flow': Int64,
        'cIsin': Null,  # Always null
        'zTitad': Float64,
        'baseVol': Int64,
        'instrumentID': Null,  # Always null
        'cgrValCot': Null,  # Always null
        'cComVal': Null,  # Always null
        'lastDate': Int64,
        'sourceID': Int64,
        'flowTitle': Null,  # Always null
        'cgrValCotTitle': Null,  # Always null
    }
    assert dict(c.collect_schema()) == expected_c_schema

    # Check relatedCompanyThirtyDayHistory schema
    expected_h_schema = {
        'id': Int64,
        'insCode': String,
        'dEven': Int64,
        'hEven': Int64,
        'pClosing': Float64,
        'iClose': Boolean,
        'yClose': Boolean,
        'pDrCotVal': Float64,
        'zTotTran': Float64,
        'qTotTran5J': Float64,
        'qTotCap': Float64,
    }
    assert dict(h.collect_schema()) == expected_h_schema

    # Check that each insCode appears more than 20 times
    counts = h.group_by('insCode').agg(pl_len().alias('count'))
    mode_count = counts.select(col('count').mode().first()).collect().item()
    assert mode_count > 20


@file('test_identity.json')
async def test_identity():
    d = await KARIS.identity()
    validate_dict(d, Identity)


async def test_from_isin():
    inst = await Instrument.from_isin('IRO1MSMI0001')
    assert inst.code == '35425587644337450'
    assert await inst.l18 == 'فملی'
    assert await inst.isin == 'IRO1MSMI0001'
    assert await inst.cisin == 'IRO1MSMI0000'
