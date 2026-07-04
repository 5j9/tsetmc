from datetime import datetime
from types import NoneType
from unittest.mock import patch

import polars as pl
from numpy import dtype, int64
from pytest import raises, skip, warns
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


def assert_page_data(
    d, general=True, trade_history=False, related_companies=False
):
    if trade_history:
        trade_history = d.pop('trade_history')
        assert [*trade_history.dtypes.items()] == [
            ('pc', dtype('float64')),
            ('py', dtype('float64')),
            ('pmin', dtype('float64')),
            ('pmax', dtype('float64')),
            ('tno', dtype('int64')),
            ('tvol', dtype('int64')),
            ('tval', dtype('float64')),
        ]
        assert trade_history.index.dtype == dtype('<M8[us]')
        assert trade_history.index.name == 'date'

    if related_companies:
        related_companies = d.pop('related_companies')
        assert type(related_companies) is list
        assert type(related_companies[0]) is Instrument

    if general:
        for k in ('sector_pe', 'sps'):
            assert type(d.pop(k)) in (float, NoneType)
        for k in ('eps', 'free_float'):
            assert type(d.pop(k)) in (int, NoneType)
        for k in ('bvol', 'cs', 'flow', 'month_average_volume', 'z'):
            assert type(d.pop(k)) is int
        for k in (
            'tmax',
            'tmin',
            'week_max',
            'week_min',
            'year_max',
            'year_min',
        ):
            assert type(d.pop(k)) is float
        assert d.keys() == {
            'cisin',
            'flow_name',
            'isin',
            'group_code',
            'l18',
            'l30',
            'sector_name',
        }
        assert all(type(v) is str for v in d.values())


@file('fmelli.html')
async def test_page_data():
    ins = Instrument(35425587644337450)
    assert getattr(ins, '_l18', None) is getattr(ins, '_l30', None) is None
    with warns(DeprecationWarning):
        d = await ins.page_data(True, True, True)  # pyright: ignore[reportDeprecated]
    assert_page_data(d, True, True, True)


@file('dey.html')
async def test_page_data_no_free_float():
    with warns(DeprecationWarning):
        d = await Instrument(44818950263583523).page_data()  # pyright: ignore[reportDeprecated]
    assert_page_data(d)


@file('kala.html')
async def test_page_data_no_eps():
    with warns(DeprecationWarning):
        d = await Instrument(44549439964296944).page_data()  # pyright: ignore[reportDeprecated]
    assert_page_data(d)


@file('khgostar.html')
async def test_page_data_negative_sector_pe():
    with warns(DeprecationWarning):
        d = await Instrument(48990026850202503).page_data()  # pyright: ignore[reportDeprecated]
    assert_page_data(d)


FMELLI = Instrument(35425587644337450)


@file('fmelli_trade_history_top2.txt')
async def test_trade_history():
    with warns(DeprecationWarning):
        ldf0 = await FMELLI.trade_history(2)  # pyright: ignore[reportDeprecated]

    df0 = ldf0.collect()

    assert list(df0.schema.items()) == [
        ('date', pl.Date),
        ('pmax', pl.Float64),
        ('pmin', pl.Float64),
        ('pc', pl.Float64),
        ('pl', pl.Float64),
        ('pf', pl.Float64),
        ('py', pl.Float64),
        ('tval', pl.Float64),
        ('tvol', pl.Int64),
        ('tno', pl.Int64),
    ]

    with warns(DeprecationWarning):
        ldf1 = await FMELLI.trade_history(2, True)  # pyright: ignore[reportDeprecated]

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


@file('vsadid_identification.html')
async def test_identification():
    with warns(DeprecationWarning):
        identification = await VSADID.identification()  # pyright: ignore[reportDeprecated]
    assert identification == {
        'بازار': 'بازار پایه زرد فرابورس',
        'زیر گروه صنعت': 'استخراج سایر فلزات اساسی',
        'نام شرکت': 'گروه\u200cصنعتی\u200cسدید',
        'نام لاتین شرکت': 'Sadid Group',
        'نماد 30 رقمی فارسی': 'گروه \u200cصنعتی\u200cسدید',
        'نماد فارسی': 'وسدید - لغو پذیرش شده',
        'کد 12 رقمی شرکت': 'IRO7SDIP0002',
        'کد 12 رقمی نماد': 'IRO7SDIP0001',
        'کد 4 رقمی شرکت': 'SDIP',
        'کد 5 رقمی نماد': 'SDIP1',
        'کد تابلو': '7',
        'کد زیر گروه صنعت': '2799',
        'کد گروه صنعت': '27',
        'گروه صنعت': 'فلزات اساسی',
    }


@file('opal_client_types.txt')
async def test_client_type_history_old():
    with warns(DeprecationWarning):
        ldf = await Instrument(655060129740445).client_type_history_old()  # pyright: ignore[reportDeprecated]

    df = ldf.collect()

    assert list(df.schema.items()) == [
        ('date', pl.Date),
        ('n_buy_count', pl.Int64),
        ('l_buy_count', pl.Int64),
        ('n_sell_count', pl.Int64),
        ('l_sell_count', pl.Int64),
        ('n_buy_volume', pl.Int64),
        ('l_buy_volume', pl.Int64),
        ('n_sell_volume', pl.Int64),
        ('l_sell_volume', pl.Int64),
        ('n_buy_value', pl.Int64),
        ('l_buy_value', pl.Int64),
        ('n_sell_value', pl.Int64),
        ('l_sell_value', pl.Int64),
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
        ('recDate', pl.Int64),
        ('insCode', pl.String),
        ('buy_I_Volume', pl.Float64),
        ('buy_N_Volume', pl.Float64),
        ('buy_I_Value', pl.Float64),
        ('buy_N_Value', pl.Float64),
        ('buy_N_Count', pl.Int64),
        ('sell_I_Volume', pl.Float64),
        ('buy_I_Count', pl.Float64),
        ('sell_N_Volume', pl.Float64),
        ('sell_I_Value', pl.Float64),
        ('sell_N_Value', pl.Float64),
        ('sell_N_Count', pl.Int64),
        ('sell_I_Count', pl.Int64),
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
        lf_holders = await AVA.holders(cisin='IRT3AVAF0003')  # pyright: ignore[reportDeprecated]

    df_holders = lf_holders.collect()
    schema = dict(df_holders.schema)

    # Assert change column data type
    assert schema.pop('change') == pl.Int64
    assert schema == {
        'holder': pl.String,
        'shares/units': pl.Int64,
        '%': pl.Float64,
        'id_cisin': pl.String,
    }
    assert not df_holders['change'].has_nulls()
    assert not df_holders['shares/units'].has_nulls()

    # Polars equivalent of pandas .iat[-1, -1] assuming 'id_cisin' is the last column
    id_cisin = df_holders['id_cisin'][-1]

    with warns(DeprecationWarning):
        lf_hist, lf_oth = await AVA.holder(id_cisin, True, True)  # pyright: ignore[reportDeprecated]

    df_hist = lf_hist.collect()
    df_oth = lf_oth.collect()

    assert [*df_hist.schema.items()] == [
        ('date', pl.Date),
        ('shares', pl.Int64),
    ]

    assert [*df_oth.schema.items()] == [
        ('ins_code', pl.String),
        ('name', pl.String),
        ('shares', pl.Int64),
        ('percent', pl.Float64),
    ]

    with warns(DeprecationWarning):
        lf_hist = await AVA.holder('43789,IRT3AVAF0003', True)  # pyright: ignore[reportDeprecated]
    assert type(lf_hist) is pl.LazyFrame

    with warns(DeprecationWarning):
        lf_oth = await AVA.holder('43789,IRT3AVAF0003', False, True)  # pyright: ignore[reportDeprecated]
    assert type(lf_oth) is pl.LazyFrame

    with warns(DeprecationWarning):
        lf_result = await AVA.holder('43789,IRT3AVAF0003', False)  # pyright: ignore[reportDeprecated]

    # Polars equals check on LazyFrame queries or collected DataFrames
    assert lf_oth.collect().equals(lf_result.collect())


@files(  # share_holder_share_id may change from time to time
    'ava_holders.json',
    'share_holder_companies.json',
    'ava_share_holder_history.json',
)
async def test_share_holders_companies_histories():
    holders = await AVA.share_holders()
    first_holder = holders[0]
    validate_dict(first_holder, ShareHolder)

    share_holder_share_id = first_holder['shareHolderShareID']

    companies = await share_holder_companies(share_holder_share_id)
    validate_dict(companies[0], ShareHolderCompany)

    df = await AVA.share_holder_history(
        share_holder_id=share_holder_share_id,
        days=2,
    )
    assert len(df) == 2
    assert [*df.dtypes.items()] == [
        ('shareHolderID', dtype('int64')),
        ('shareHolderName', dtype('O')),
        ('cIsin', string),
        ('numberOfShares', dtype('float64')),
        ('perOfShares', dtype('float64')),
        ('change', dtype('int64')),
        ('changeAmount', dtype('float64')),
        ('shareHolderShareID', dtype('int64')),
    ]
    assert df.index.dtype == dtype('<M8[us]')


@file('vsadid_identification.html')
async def test_holders_without_cisin():
    inst = VSADID
    with warns(DeprecationWarning):
        d = await inst.identification()  # pyright: ignore[reportDeprecated]
    assert d['کد 12 رقمی شرکت'] == 'IRO7SDIP0002'
    with patch.object(
        Instrument, 'info', side_effect=NotImplementedError
    ) as info:
        with patch.object(Instrument, '_ds_or_info', Instrument.info):
            with raises(NotImplementedError), warns(DeprecationWarning):
                await inst.holders()  # pyright: ignore[reportDeprecated]
    info.assert_called_once()


@file('fmelli_price_adjustment.html')
async def test_adjustments():
    with warns(DeprecationWarning):
        df = await FMELLI.adjustments()  # pyright: ignore[reportDeprecated]
    assert len(df) >= 18
    assert [*df.dtypes.items()] == [
        ('date', dtype('<M8[us]')),
        ('adj_pc', dtype('int64')),
        ('pc', dtype('int64')),
    ]


@file('price_adjustment_api.json')
async def test_price_adjustments_method():
    df = await FMELLI.price_adjustments()
    assert len(df) >= 18
    assert [*df.dtypes.items()] == [
        ('insCode', dtype('int64')),
        ('pClosing', dtype('float64')),
        ('pClosingNotAdjusted', dtype('float64')),
        ('corporateTypeCode', dtype('O')),
        ('instrument', dtype('O')),
    ]
    assert df.index[-1] == datetime(2009, 7, 15)


@file('adjustments_flow_7.html')
async def test_price_adjustments():
    df = await price_adjustments(7)
    assert [*df.dtypes.items()] == [
        ('l18', string),
        ('l30', string),
        ('date', dtype('<M8[us]')),
        ('adj_pc', dtype('int64')),
        ('pc', dtype('int64')),
    ]
    assert len(df) == 6
    assert df.iat[-1, -1] == 1000


@file('latif_financial_aph.aspx')
async def test_adjusted_price_history():
    lf = await Instrument(16422980660132735).price_history()
    df = lf.collect()

    # Check schema directly
    expected_schema = {
        'date': pl.Date,
        'pmax': pl.Int64,
        'pmin': pl.Int64,
        'pf': pl.Int64,
        'pl': pl.Int64,
        'tvol': pl.Int64,
        'pc': pl.Int64,
    }

    assert df.schema == expected_schema


@file('search_mellat.txt')
async def test_old_search():
    lf = await old_search('ملت')
    df = lf.collect()
    assert type(df) is pl.DataFrame
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


@file('fmelli_introduction.html')
async def test_introduction():
    with warns(DeprecationWarning):
        d = await (await Instrument.from_l18('فملی')).introduction()  # pyright: ignore[reportDeprecated]
    assert len(d) > 10
    assert 'مدیر عامل' in d
    assert all(type(k) is type(v) is str for k, v in d.items())


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
        df = await Instrument(1301069819790264).ombud_messages()  # pyright: ignore[reportDeprecated]
    assert [*df.dtypes.items()] == [
        ('header', string),
        ('date', dtype('<M8[us]')),
        ('description', string),
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
        'publish_date': pl.Date,
        'meeting_date': pl.Date,
        'fiscal_year': pl.Date,
        'profit_or_loss_after_tax': pl.Float64,
        'distributable_profit': pl.Float64,
        'accumulated_profit_at_the_end_of_the_period': pl.Float64,
        'cash_earnings_per_share': pl.Float64,
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
        ('insCode', pl.Null),
        ('dEven', pl.Int64),
        ('nTran', pl.Int64),
        ('hEven', pl.Int64),
        ('qTitTran', pl.Int64),
        ('pTran', pl.Float64),
        ('qTitNgJ', pl.Int64),
        ('iSensVarP', pl.String),
        ('pPhSeaCotJ', pl.Float64),
        ('pPbSeaCotJ', pl.Float64),
        ('iAnuTran', pl.Int64),
        ('xqVarPJDrPRf', pl.Float64),
        ('canceled', pl.Int64),
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
        'priceChange': pl.Float64,
        'priceMin': pl.Float64,
        'priceMax': pl.Float64,
        'priceYesterday': pl.Float64,
        'priceFirst': pl.Float64,
        'last': pl.Boolean,
        'id': pl.Int64,
        'insCode': pl.String,
        'dEven': pl.Int64,
        'hEven': pl.Int64,
        'pClosing': pl.Float64,
        'iClose': pl.Boolean,
        'yClose': pl.Boolean,
        'pDrCotVal': pl.Float64,
        'zTotTran': pl.Float64,
        'qTotTran5J': pl.Float64,
        'qTotCap': pl.Float64,
        'date': pl.Date,
        'time': pl.Time,
        'datetime': pl.Datetime(time_unit='us'),
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
        ('number', pl.Int64),
        ('qTitMeDem', pl.Int64),
        ('zOrdMeDem', pl.Int64),
        ('pMeDem', pl.Float64),
        ('pMeOf', pl.Float64),
        ('zOrdMeOf', pl.Int64),
        ('qTitMeOf', pl.Int64),
        ('title', pl.Null),
        ('insCode', pl.Null),
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
        'instrumentState': pl.Null,  # Always null
        'lastHEven': pl.Int64,
        'finalLastDate': pl.Int64,
        'nvt': pl.Float64,
        'mop': pl.Int64,
        'pRedTran': pl.Float64,
        'thirtyDayClosingHistory': pl.Null,  # Always null
        'priceChange': pl.Float64,
        'priceMin': pl.Float64,
        'priceMax': pl.Float64,
        'priceYesterday': pl.Float64,
        'priceFirst': pl.Float64,
        'last': pl.Boolean,
        'id': pl.Int64,
        'insCode': pl.String,
        'dEven': pl.Int64,
        'hEven': pl.Int64,
        'pClosing': pl.Float64,
        'iClose': pl.Boolean,
        'yClose': pl.Boolean,
        'pDrCotVal': pl.Float64,
        'zTotTran': pl.Float64,
        'qTotTran5J': pl.Float64,
        'qTotCap': pl.Float64,
        # Flattened instrument fields
        'cValMne': pl.Null,  # Always null
        'lVal18': pl.Null,  # Always null
        'cSocCSAC': pl.Null,  # Always null
        'lSoc30': pl.Null,  # Always null
        'yMarNSC': pl.Null,  # Always null
        'yVal': pl.Null,  # Always null
        'lVal30': pl.String,
        'lVal18AFC': pl.String,
        'flow': pl.Int64,
        'cIsin': pl.Null,  # Always null
        'zTitad': pl.Float64,
        'baseVol': pl.Int64,
        'instrumentID': pl.Null,  # Always null
        'cgrValCot': pl.Null,  # Always null
        'cComVal': pl.Null,  # Always null
        'lastDate': pl.Int64,
        'sourceID': pl.Int64,
        'flowTitle': pl.Null,  # Always null
        'cgrValCotTitle': pl.Null,  # Always null
    }
    assert dict(c.collect_schema()) == expected_c_schema

    # Check relatedCompanyThirtyDayHistory schema
    expected_h_schema = {
        'id': pl.Int64,
        'insCode': pl.String,
        'dEven': pl.Int64,
        'hEven': pl.Int64,
        'pClosing': pl.Float64,
        'iClose': pl.Boolean,
        'yClose': pl.Boolean,
        'pDrCotVal': pl.Float64,
        'zTotTran': pl.Float64,
        'qTotTran5J': pl.Float64,
        'qTotCap': pl.Float64,
    }
    assert dict(h.collect_schema()) == expected_h_schema

    # Check that each insCode appears more than 20 times
    counts = h.group_by('insCode').agg(pl.len().alias('count'))
    mode_count = counts.select(pl.col('count').mode().first()).collect().item()
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
