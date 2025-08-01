from datetime import datetime
from types import NoneType
from typing import cast
from unittest.mock import patch

from aiohutils.tests import assert_dict_type, file, files
from jdatetime import datetime as jdatetime
from numpy import dtype, int64
from pandas import DataFrame, DatetimeIndex, Int64Dtype, Timestamp
from pytest import raises, warns

from tests import STR, assert_market_state
from tsetmc import InstrumentInfo

# noinspection PyProtectedMember
from tsetmc.instruments import (
    ETF,
    ClientType,
    ClosingPriceInfo,
    Codal,
    Identity,
    Instrument,
    LiveData,
    Message,
    Search,
    ShareHolder,
    ShareHolderCompany,
    _LazyDS,
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
        assert trade_history.index.dtype == dtype('<M8[ns]')
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
        d = await ins.page_data(True, True, True)
    assert_page_data(d, True, True, True)


@file('dey.html')
async def test_page_data_no_free_float():
    with warns(DeprecationWarning):
        d = await Instrument(44818950263583523).page_data()
    assert_page_data(d)


@file('kala.html')
async def test_page_data_no_eps():
    with warns(DeprecationWarning):
        d = await Instrument(44549439964296944).page_data()
    assert_page_data(d)


@file('khgostar.html')
async def test_page_data_negative_sector_pe():
    with warns(DeprecationWarning):
        d = await Instrument(48990026850202503).page_data()
    assert_page_data(d)


def assert_live_data(
    ld: LiveData, best_limits=False, market_state=False, nav=False
):
    d = cast(dict, ld)
    if best_limits:
        best_limits = d.pop('best_limits')
        assert [*best_limits.dtypes.items()] == [
            ('zd', dtype('int64')),
            ('qd', dtype('int64')),
            ('pd', dtype('int64')),
            ('po', dtype('int64')),
            ('qo', dtype('int64')),
            ('zo', dtype('int64')),
        ]

    if market_state:
        market_state = d.pop('market_state', None)
        if market_state is not None:
            assert_market_state(market_state)

    if nav:
        assert type(d.pop('nav_datetime')) in (jdatetime, str)
        assert type(d.pop('nav')) is int

    assert type(d.pop('timestamp')) is Timestamp
    for k in ('time', 'status'):
        assert type(d.pop(k)) is str
    assert [*d.keys()] == [
        'pl',
        'pc',
        'pf',
        'py',
        'pmin',
        'pmax',
        'tno',
        'tvol',
        'tval',
    ]
    assert all(type(v) is int for v in d.values())


@file('dara_yekom.txt')
async def test_dara1_instant():
    with warns(DeprecationWarning):
        d = await Instrument(62235397452612911).live_data(
            market_state=True, best_limits=True
        )
    assert_live_data(d, best_limits=True, market_state=True, nav=True)


@file('asam.txt')
async def test_asam_instant():
    with warns(DeprecationWarning):
        d = await Instrument(36592972482259020).live_data(best_limits=True)
    assert_live_data(d, best_limits=True, nav=True)


FMELLI = Instrument(35425587644337450)


@file('fmelli.txt')
async def test_fmelli_instant():
    with warns(DeprecationWarning):
        d = await FMELLI.live_data(best_limits=False)
    assert_live_data(d, best_limits=False)


@file('vskhooz_short_response.txt')
async def test_vskhooz_short():
    with warns(DeprecationWarning):
        assert_live_data(await Instrument(5454781314262062).live_data())


@file('vskhooz_long_response.txt')
async def test_vskhooz_long():
    with warns(DeprecationWarning):
        assert_live_data(await Instrument(5454781314262062).live_data())


@file('fmelli_trade_history_top2.txt')
async def test_trade_history():
    with warns(DeprecationWarning):
        df0 = await FMELLI.trade_history(2)
    assert [*df0.dtypes.items()] == [
        ('pmax', dtype('float64')),
        ('pmin', dtype('float64')),
        ('pc', dtype('float64')),
        ('pl', dtype('float64')),
        ('pf', dtype('float64')),
        ('py', dtype('float64')),
        ('tval', dtype('float64')),
        ('tvol', dtype('int64')),
        ('tno', dtype('int64')),
    ]
    assert df0.index.name == 'date'
    assert isinstance(df0.index, DatetimeIndex)
    with warns(DeprecationWarning):
        df1 = await FMELLI.trade_history(2, True)
    assert len(df1) >= len(df0)


VSADID = Instrument('41713045190742691')


@file('vsadid.txt')
async def test_vsadid():
    with warns(DeprecationWarning):
        d = await VSADID.live_data()
    assert_live_data(d)


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
        identification = await VSADID.identification()
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
        df = await Instrument(655060129740445).client_type_history_old()
    assert [*df.dtypes.items()] == [
        ('n_buy_count', dtype('int64')),
        ('l_buy_count', dtype('int64')),
        ('n_sell_count', dtype('int64')),
        ('l_sell_count', dtype('int64')),
        ('n_buy_volume', dtype('int64')),
        ('l_buy_volume', dtype('int64')),
        ('n_sell_volume', dtype('int64')),
        ('l_sell_volume', dtype('int64')),
        ('n_buy_value', dtype('int64')),
        ('l_buy_value', dtype('int64')),
        ('n_sell_value', dtype('int64')),
        ('l_sell_value', dtype('int64')),
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
    df = await Instrument(8175784894140974).client_type_history()
    assert [*df.dtypes.items()] == [
        ('recDate', dtype('int64')),
        ('insCode', string),
        ('buy_I_Volume', dtype('float64')),
        ('buy_N_Volume', dtype('float64')),
        ('buy_I_Value', dtype('float64')),
        ('buy_N_Value', dtype('float64')),
        ('buy_N_Count', dtype('int64')),
        ('sell_I_Volume', dtype('float64')),
        ('buy_I_Count', dtype('float64')),
        ('sell_N_Volume', dtype('float64')),
        ('sell_I_Value', dtype('float64')),
        ('sell_N_Value', dtype('float64')),
        ('sell_N_Count', dtype('int64')),
        ('sell_I_Count', dtype('int64')),
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
        holders = await AVA.holders(cisin='IRT3AVAF0003')
    dtypes = holders.dtypes.to_dict()
    assert dtypes.pop('change') in (Int64Dtype(), 'int64')
    assert dtypes == {
        'holder': STR,
        'shares/units': dtype('int64'),
        '%': dtype('float64'),
        'id_cisin': STR,
    }

    id_cisin = holders.iat[-1, -1]

    with warns(DeprecationWarning):
        hist, oth = await AVA.holder(id_cisin, True, True)
    assert [*hist.dtypes.items()] == [('shares', dtype('int64'))]
    assert oth.index.name == 'ins_code'
    assert hist.index.dtype.kind == 'M'
    if not oth.empty:
        assert [*oth.dtypes.items()] == [
            ('name', string),
            ('shares', dtype('int64')),
            ('percent', dtype('float64')),
        ]
    with warns(DeprecationWarning):
        hist = await AVA.holder('43789,IRT3AVAF0003', True)
    assert type(hist) is DataFrame
    with warns(DeprecationWarning):
        oth = await AVA.holder('43789,IRT3AVAF0003', False, True)
    assert type(oth) is DataFrame
    with warns(DeprecationWarning):
        result = await AVA.holder('43789,IRT3AVAF0003', False)
    assert oth.equals(result)


@files(  # share_holder_share_id may change from time to time
    'ava_holders.json',
    'share_holder_companies.json',
    'ava_share_holder_history.json',
)
async def test_share_holders_companies_histories():
    holders = await AVA.share_holders()
    first_holder = holders[0]
    assert_dict_type(first_holder, ShareHolder)

    share_holder_share_id = first_holder['shareHolderShareID']

    companies = await share_holder_companies(share_holder_share_id)
    assert_dict_type(companies[0], ShareHolderCompany)

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
    assert df.index.dtype == dtype('<M8[ns]')


@file('vsadid_identification.html')
async def test_holders_without_cisin():
    inst = VSADID
    with warns(DeprecationWarning):
        d = await inst.identification()
    assert d['کد 12 رقمی شرکت'] == 'IRO7SDIP0002'
    with patch.object(
        Instrument, 'info', side_effect=NotImplementedError
    ) as info:
        with patch.object(Instrument, '_ds_or_info', Instrument.info):
            with raises(NotImplementedError), warns(DeprecationWarning):
                await inst.holders()
    info.assert_called_once()


@file('fmelli_price_adjustment.html')
async def test_adjustments():
    with warns(DeprecationWarning):
        df = await FMELLI.adjustments()
    assert len(df) >= 18
    assert [*df.dtypes.items()] == [
        ('date', dtype('O')),
        ('adj_pc', dtype('int64')),
        ('pc', dtype('int64')),
    ]
    assert type(df.iat[0, 0]) is jdatetime


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
        ('date', dtype('O')),
        ('adj_pc', dtype('int64')),
        ('pc', dtype('int64')),
    ]
    assert len(df) == 6
    assert df.iat[-1, -1] == 1000


@file('latif_financial_aph.aspx')
async def test_adjusted_price_history():
    df = await Instrument(16422980660132735).price_history()
    assert df.index.name == 'date'
    assert df.index.dtype == dtype('<M8[ns]')
    assert [*df.dtypes.items()] == [
        ('pmax', dtype('int64')),
        ('pmin', dtype('int64')),
        ('pf', dtype('int64')),
        ('pl', dtype('int64')),
        ('tvol', dtype('int64')),
        ('pc', dtype('int64')),
    ]


@file('search_mellat.txt')
async def test_old_search():
    df = await old_search('ملت')
    assert type(df) is DataFrame
    assert len(df) > 40
    assert [*df.dtypes.items()] == [
        ('l18', string),
        ('l30', string),
        ('ins_code', dtype('int64')),
        ('retail', dtype('int64')),
        ('compensation', dtype('int64')),
        ('wholesale', dtype('int64')),
        ('_unknown1', dtype('int64')),
        ('_unknown2', dtype('int64')),
        ('_unknown3', dtype('int64')),
        ('_unknown4', dtype('int64')),
        ('_unknown5', string),
    ]


@file('search_atlas.txt')
async def test_search():
    r = await search('اطلس')
    assert type(r) is list
    assert_dict_type(r[0], Search)


async def test_l18_without_web_request():
    assert await Instrument(46348559193224090).l18 == 'فولاد'


@file('fmelli_introduction.html')
async def test_introduction():
    with warns(DeprecationWarning):
        d = await (await Instrument.from_l18('فملی')).introduction()
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
        df = await Instrument(1301069819790264).ombud_messages()
    assert [*df.dtypes.items()] == [
        ('header', string),
        ('date', dtype('O')),
        ('description', string),
    ]
    assert type(df.iat[0, 1]) is jdatetime


@file('shetab_messages.json')
async def test_messages():
    messages = await Instrument(64216772923447100).messages()
    assert_dict_type(messages[0], Message)


@file('fmelli_dps.txt')
async def test_dps_history():
    df = await FMELLI.dps_history()
    assert [*df.dtypes.items()] == [
        ('publish_date', dtype('O')),
        ('meeting_date', dtype('O')),
        ('fiscal_year', dtype('O')),
        ('profit_or_loss_after_tax', dtype('float64')),
        ('distributable_profit', dtype('float64')),
        ('accumulated_profit_at_the_end_of_the_period', dtype('float64')),
        ('cash_earnings_per_share', dtype('float64')),
    ]
    assert type(df.iat[0, 0]) is jdatetime
    assert type(df.iat[0, 1]) is jdatetime
    assert type(df.iat[0, 2]) is jdatetime


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
    assert_dict_type(info, InstrumentInfo)


@file('fmelli_info.json')
async def test_info_on_fmelli():
    info = await FMELLI.info()
    assert_dict_type(info, InstrumentInfo)


@file('karis_trades.json')
async def test_trades():
    df = await KARIS.trades()
    if df.empty:
        return
    assert [*df.dtypes.items()] == [
        ('insCode', dtype('O')),
        ('dEven', dtype('int64')),
        ('nTran', dtype('int64')),
        ('hEven', dtype('int64')),
        ('qTitTran', dtype('int64')),
        ('pTran', dtype('float64')),
        ('qTitNgJ', dtype('int64')),
        ('iSensVarP', string),
        ('pPhSeaCotJ', dtype('float64')),
        ('pPbSeaCotJ', dtype('float64')),
        ('iAnuTran', dtype('int64')),
        ('xqVarPJDrPRf', dtype('float64')),
        ('canceled', dtype('int64')),
    ]


@file('karis_codal.json')
async def test_codal():
    d = await KARIS.codal(n=3)
    assert len(d) == 3
    assert_dict_type(d[0], Codal)


@file('daily_closing_price_karis.json')
async def test_daily_closing_price():
    df = await KARIS.daily_closing_price(n=3)
    assert [*df.dtypes.items()] == [
        ('priceChange', dtype('float64')),
        ('priceMin', dtype('float64')),
        ('priceMax', dtype('float64')),
        ('priceYesterday', dtype('float64')),
        ('priceFirst', dtype('float64')),
        ('last', dtype('bool')),
        ('id', dtype('int64')),
        ('insCode', string),
        ('pClosing', dtype('float64')),
        ('iClose', dtype('bool')),
        ('yClose', dtype('bool')),
        ('pDrCotVal', dtype('float64')),
        ('zTotTran', dtype('float64')),
        ('qTotTran5J', dtype('float64')),
        ('qTotCap', dtype('float64')),
        ('datetime', dtype('<M8[ns]')),
    ]
    assert len(df) == 3
    assert df.index.dtype == dtype('<M8[ns]')


@file('closing_price_info_karis.json')
async def test_closing_price_info():
    info = await KARIS.closing_price_info()
    assert_dict_type(info, ClosingPriceInfo)


@file('best_limits.json')
async def test_best_limits():
    df = await KARIS.best_limits()
    if df.empty:
        return
    assert [*df.dtypes.items()] == [
        ('number', dtype('int64')),
        ('qTitMeDem', dtype('int64')),
        ('zOrdMeDem', dtype('int64')),
        ('pMeDem', dtype('float64')),
        ('pMeOf', dtype('float64')),
        ('zOrdMeOf', dtype('int64')),
        ('qTitMeOf', dtype('int64')),
        ('title', dtype('O')),
        ('insCode', dtype('O')),
    ]
    assert len(df) <= 5, len(df)


@file('client_type_karis.json')
async def test_client_type():
    d = await KARIS.client_type()
    assert_dict_type(d, ClientType)


@file('etf_karis.json')
async def test_etf():
    d = await KARIS.etf()
    assert_dict_type(d, ETF)


@file('related_companies_karis.json')
async def test_related_companies():
    # await KARIS.info()['sector']['cSecVal'] == "68 "
    d = await KARIS.related_companies(cs='68 ')
    c = d['relatedCompany']
    h = d['relatedCompanyThirtyDayHistory']

    assert [*c.dtypes.items()] == [
        ('instrumentState', dtype('O')),
        ('lastHEven', dtype('int64')),
        ('finalLastDate', dtype('int64')),
        ('nvt', dtype('float64')),
        ('mop', dtype('int64')),
        ('pRedTran', dtype('float64')),
        ('thirtyDayClosingHistory', dtype('O')),
        ('priceChange', dtype('float64')),
        ('priceMin', dtype('float64')),
        ('priceMax', dtype('float64')),
        ('priceYesterday', dtype('float64')),
        ('priceFirst', dtype('float64')),
        ('last', dtype('bool')),
        ('id', dtype('int64')),
        ('insCode', string),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('pClosing', dtype('float64')),
        ('iClose', dtype('bool')),
        ('yClose', dtype('bool')),
        ('pDrCotVal', dtype('float64')),
        ('zTotTran', dtype('float64')),
        ('qTotTran5J', dtype('float64')),
        ('qTotCap', dtype('float64')),
        ('instrument.cValMne', dtype('O')),
        ('instrument.lVal18', dtype('O')),
        ('instrument.cSocCSAC', dtype('O')),
        ('instrument.lSoc30', dtype('O')),
        ('instrument.yMarNSC', dtype('O')),
        ('instrument.yVal', dtype('O')),
        ('instrument.insCode', string),
        ('instrument.lVal30', string),
        ('instrument.lVal18AFC', string),
        ('instrument.flow', dtype('int64')),
        ('instrument.cIsin', dtype('O')),
        ('instrument.zTitad', dtype('float64')),
        ('instrument.baseVol', dtype('int64')),
        ('instrument.instrumentID', dtype('O')),
        ('instrument.cgrValCot', dtype('O')),
        ('instrument.cComVal', dtype('O')),
        ('instrument.lastDate', dtype('int64')),
        ('instrument.sourceID', dtype('int64')),
        ('instrument.flowTitle', dtype('O')),
        ('instrument.cgrValCotTitle', dtype('O')),
    ]
    assert [*h.dtypes.items()] == [
        ('id', dtype('int64')),
        ('insCode', string),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('pClosing', dtype('float64')),
        ('iClose', dtype('bool')),
        ('yClose', dtype('bool')),
        ('pDrCotVal', dtype('float64')),
        ('zTotTran', dtype('float64')),
        ('qTotTran5J', dtype('float64')),
        ('qTotCap', dtype('float64')),
    ]

    assert h.groupby('insCode')['insCode'].agg(len).mode()[0] > 20


@file('test_identity.json')
async def test_identity():
    d = await KARIS.identity()
    assert_dict_type(d, Identity)


def test_lazy_dataset():
    # check cache
    assert _LazyDS.df.loc['35425587644337450', 'l18'] == 'فملی'
    assert _LazyDS.l30_code('فملی')[1] == '35425587644337450'
    with patch.object(_LazyDS, 'df'):
        assert _LazyDS.l30_code('فملی')[1] == '35425587644337450'


async def test_from_isin():
    inst = await Instrument.from_isin('IRO1MSMI0001')
    assert inst.code == '35425587644337450'
    assert await inst.l18 == 'فملی'
    assert await inst.isin == 'IRO1MSMI0001'
    assert await inst.cisin == 'IRO1MSMI0000'
