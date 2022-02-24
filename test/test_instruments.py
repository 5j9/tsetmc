from datetime import datetime
from types import NoneType
from unittest.mock import patch

from jdatetime import datetime as jdatetime
from numpy import dtype
from pandas import DataFrame, DatetimeIndex
from pytest import raises

# noinspection PyProtectedMember
from tsetmc.instruments import Instrument, _LiveData, price_adjustments, search

from test import assert_market_state, OFFLINE_MODE, patch_session


if OFFLINE_MODE is True:
    async def test_info_url():
        with raises(AttributeError, match="'NoneType' object has no attribute 'get'"):
            await Instrument(35425587644337450).live_data()


def assert_page_data(d, general=True, trade_history=False, related_companies=False):
    if trade_history:
        trade_history = d.pop('trade_history')
        assert [*trade_history.dtypes.items()] == [
            ('pc', dtype('float64')),
            ('py', dtype('float64')),
            ('pmin', dtype('float64')),
            ('pmax', dtype('float64')),
            ('tno', dtype('int64')),
            ('tvol', dtype('int64')),
            ('tval', dtype('float64'))]
        assert trade_history.index.dtype == dtype('<M8[ns]')
        assert trade_history.index.name == 'date'

    if related_companies:
        related_companies = d.pop('related_companies')
        assert type(related_companies) is list
        assert type(related_companies[0]) is Instrument

    if general:
        assert type(d.pop('sps')) in (float, NoneType)
        for k in ('eps', 'free_float'):
            assert type(d.pop(k)) in (int, NoneType)
        for k in ('bvol', 'cs', 'flow', 'month_average_volume', 'z'):
            assert type(d.pop(k)) is int
        for k in ('sector_pe', 'tmax', 'tmin', 'week_max', 'week_min', 'year_max', 'year_min'):
            assert type(d.pop(k)) is float
        assert d.keys() == {'cisin', 'flow_name', 'isin', 'group_code', 'l18', 'l30', 'sector_name'}
        assert all(type(v) is str for v in d.values())


@patch_session('fmelli.html')
async def test_page_data():
    ins = Instrument(35425587644337450)
    assert ins._l18 is ins._l30 is None
    d = await ins.page_data(True, True, True)
    assert_page_data(d, True, True, True)


@patch_session('dey.html')
async def test_page_data_no_free_float():
    d = await Instrument(44818950263583523).page_data()
    assert_page_data(d)


@patch_session('kala.html')
async def test_page_data_no_eps():
    d = await Instrument(44549439964296944).page_data()
    assert_page_data(d)


@patch_session('khgostar.html')
async def test_page_data_negative_sector_pe():
    d = await Instrument(48990026850202503).page_data()
    assert_page_data(d)


def assert_live_data(d: _LiveData, best_limits=False, market_state=False, nav=False):
    if best_limits:
        best_limits = d.pop('best_limits')
        assert [*best_limits.dtypes.items()] == [
            ('zd', dtype('int64')),
            ('qd', dtype('int64')),
            ('pd', dtype('int64')),
            ('po', dtype('int64')),
            ('qo', dtype('int64')),
            ('zo', dtype('int64'))]

    if market_state:
        market_state = d.pop('market_state', None)
        if market_state is not None:
            assert_market_state(market_state)

    if nav:
        assert type(d.pop('nav_datetime')) is jdatetime
        assert type(d.pop('nav')) is int

    assert type(d.pop('datetime')) is datetime
    for k in ('timestamp', 'status'):
        assert type(d.pop(k)) is str
    assert [*d.keys()] == [
        'pl', 'pc', 'pf', 'py', 'pmin', 'pmax', 'tno', 'tvol', 'tval']
    assert all(type(v) is int for v in d.values())


@patch_session('dara_yekom.txt')
async def test_dara1_instant():
    d = await Instrument(62235397452612911).live_data(market_state=True, best_limits=True)
    assert_live_data(d, best_limits=True, market_state=True, nav=True)


@patch_session('asam.txt')
async def test_asam_instant():
    d = await Instrument(36592972482259020).live_data(best_limits=True)
    assert_live_data(d, best_limits=True, nav=True)


@patch_session('negin.txt')
async def test_negin_instant():
    d = await Instrument(10145129193828624).live_data()
    assert_live_data(d, nav=True)


@patch_session('fmelli.txt')
async def test_fmelli_instant():
    d = await Instrument(35425587644337450).live_data(best_limits=False)
    assert_live_data(d, best_limits=False)


@patch_session('vskhooz_short_response.txt')
async def test_vskhooz_short():
    assert_live_data(await Instrument(5454781314262062).live_data())


@patch_session('vskhooz_long_response.txt')
async def test_vskhooz_long():
    assert_live_data(await Instrument(5454781314262062).live_data())


@patch_session('fmelli_trade_history_top2.txt')
async def test_trade_history():
    df0 = await Instrument(35425587644337450).trade_history(2)
    assert [*df0.dtypes.items()] == [
        ('pmax', dtype('float64')),
        ('pmin', dtype('float64')),
        ('pc', dtype('float64')),
        ('pl', dtype('float64')),
        ('pf', dtype('float64')),
        ('py', dtype('float64')),
        ('tval', dtype('float64')),
        ('tvol', dtype('int64')),
        ('tno', dtype('int64'))]
    assert df0.index.name == 'date'
    assert isinstance(df0.index, DatetimeIndex)
    df1 = await Instrument(35425587644337450).trade_history(2, 1)
    assert len(df1) >= len(df0)


@patch_session('vsadid.txt')
async def test_vsadid():
    d = await Instrument(41713045190742691).live_data()
    assert_live_data(d)


@patch_session('search_firuze.txt')
async def test_from_search_with_numeric_description():
    # note the "30" in فيروزه - صندوق شاخص30 شركت فيروزه- سهام
    i = await Instrument.from_search('فیروزه')
    assert i.code == 66036975502302203
    assert await i.l18 == 'فیروزه'


async def test_repr():
    # known l18
    assert repr(
        await Instrument.from_l18('فملی')) == \
           "Instrument(35425587644337450, 'فملی')"
    # unknown l18
    assert repr(Instrument(1)) == "Instrument(1)"
    assert repr(Instrument(1, l30='مجتمع جهان فولاد سيرجان')) == \
        "Instrument(1, l30='مجتمع جهان فولاد سيرجان')"


async def test_equal():
    assert await Instrument.from_l18('فملی') == Instrument(35425587644337450)


@patch_session('vsadid_identification.html')
async def test_identification():
    assert await Instrument(41713045190742691).identification() == {
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
        'گروه صنعت': 'فلزات اساسی'}


@patch_session('opal_client_types.txt')
async def test_client_type():
    df = await Instrument(655060129740445).client_type()
    assert [*df.dtypes.items()] == [
        ('n_buy_count', dtype('uint64')),
        ('l_buy_count', dtype('uint64')),
        ('n_sell_count', dtype('uint64')),
        ('l_sell_count', dtype('uint64')),
        ('n_buy_volume', dtype('uint64')),
        ('l_buy_volume', dtype('uint64')),
        ('n_sell_volume', dtype('uint64')),
        ('l_sell_volume', dtype('uint64')),
        ('n_buy_value', dtype('uint64')),
        ('l_buy_value', dtype('uint64')),
        ('n_sell_value', dtype('uint64')),
        ('l_sell_value', dtype('uint64'))]


@patch_session('ava_holders.txt')
async def test_holders_with_cisin():
    holders = await Instrument(18007109712724189).holders(cisin='IRT3AVAF0003')
    assert [*holders.dtypes.items()] == [
        ('holder', dtype('O')),
        ('shares/units', dtype('O')),
        ('%', dtype('float64')),
        ('change', dtype('int64')),
        ('id_cisin', dtype('O'))]


@patch_session('ava_holders2.txt')
async def test_holders_change_column_type():
    holders = await Instrument(18007109712724189).holders(cisin='IRT3AVAF0003')
    assert [*holders.dtypes.items()] == [
        ('holder', dtype('O')),
        ('shares/units', dtype('O')),
        ('%', dtype('float64')),
        ('change', dtype('int64')),
        ('id_cisin', dtype('O'))]


@patch_session('ava_holder.txt')
async def test_holder():
    inst = Instrument(18007109712724189)
    # has no other holdings
    hist, oth = await inst.holder('69867,IRT3AVAF0003', True, True)
    assert hist.to_csv(line_terminator='\n').startswith('date,shares\n2021-03-01,6600001\n2021-03-02,6603001\n')
    assert oth.to_csv(line_terminator='\n') == 'ins_code,name,shares,percent\n'
    hist = await inst.holder('69867,IRT3AVAF0003', True)
    assert type(hist) is DataFrame
    oth = await inst.holder('69867,IRT3AVAF0003', False, True)
    assert type(oth) is DataFrame
    result = await inst.holder('69867,IRT3AVAF0003', False)
    assert oth.equals(result)


@patch_session('vsadid_identification.html')
async def test_holders_without_cisin():
    inst = Instrument(41713045190742691)
    assert (await inst.identification())['کد 12 رقمی شرکت'] == 'IRO7SDIP0002'
    with patch.object(Instrument, 'page_data', side_effect=NotImplementedError) as page_data:
        with raises(NotImplementedError):
            await (inst.holders())
    page_data.assert_called_once()


@patch_session('fmelli_20210602_intraday.html')
async def test_intraday_general():
    result = await Instrument(35425587644337450).intraday(
        20210602, general=True, thresholds=True, closings=True, candles=True,
        holders=True, yesterday_holders=True)
    assert len(result) == 10
    assert result['general'] == {
        'l30': 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c',
        'l18': 'فملی',
        'market': 'بازار بورس',
        'flow_name': 'بازار اول (تابلوی اصلی) بورس',
        'flow': 1,
        'group_code': 'N1',
        'cisin': 'IRO1MSMI0000',
        'isin': 'IRO1MSMI0001',
        'z': 200000000000,
        'bvol': 10143702}
    assert result['thresholds'].to_csv(line_terminator='\n') == (
        ',time,tmax,tmin\n'
        '0,1,13080.0,11840.0\n'
        '1,63122,13000.0,11780.0\n')
    assert result['closings'].iloc[-1].to_dict() == {
        'date': '1400/3/12 13:08:41',
        '?1': '-', 'pl': '12480', 'pc': '12460', 'pf': '12190', 'py': '12390',
        'pmin': '12590', 'pmax': '12190', 'tno': '10219', 'tvol': '60394598',
        'tval': '752545395210', '?2': '0', 'heven': '130841'}
    assert [*result['candles'].dtypes.items()] == [
        ('time', dtype('O')),
        ('high', dtype('int64')),
        ('low', dtype('int64')),
        ('open', dtype('int64')),
        ('close', dtype('int64')),
        ('tvol', dtype('int64'))]
    assert result['states'].iloc[-1].to_dict() == {
        'date': 20210214, 'time': 1, 'state': 'A '}
    assert result['trades'].iloc[-1].to_dict() == {
        'time': '12:30:00', 'tvol': 750, 'pl': 12480, 'annulled': False}
    assert len(result['holders']) == 21
    yesterday_holders = result['yesterday_holders']
    assert len(yesterday_holders) == 21
    assert yesterday_holders.iloc[-1].to_dict() == {
        'id': 21630, 'cisin': 'IRO1MSMI0000', 'shares': 2003857980,
        'percent': 1.0, 'change': '',
        'name': 'شرکت گروه توسعه مالی مهرآیندگان-سهامی عام-'}
    assert result['client_types'] == {
        'l_buy_count': 10,
        'l_buy_percent': 13,
        'l_buy_value': 97592925820,
        'l_buy_volume': 7835930,
        'l_mean_buy_price': 12454.542832822652,
        'l_mean_sell_price': 12460.894315227768,
        'l_sell_count': 15,
        'l_sell_percent': 19,
        'l_sell_value': 140726287530,
        'l_sell_volume': 11293434,
        'n_buy_count': 4389,
        'n_buy_percent': 87,
        'n_buy_value': 654952469390,
        'n_buy_volume': 52558668,
        'n_mean_buy_price': 12461.359739748352,
        'n_mean_sell_price': 12460.378896109265,
        'n_sell_count': 3349,
        'n_sell_percent': 81,
        'n_sell_value': 611819107680,
        'n_sell_volume': 49101164}
    assert result['best_limits'].loc[133707].to_dict() == {
        'row': 5, 'zd': 31, 'qd': 534434, 'pd': 12430, 'po': 12520,
        'qo': 111906, 'zo': 15}


@patch_session('faraz_GetClosingPriceHistory_20220222.json')
async def test_intraday_closing_price():
    i = Instrument(13666407494621646)
    df = await i.intraday_closing_price(20220222)
    assert [*df.dtypes.items()] == [
        ('id', dtype('int64')),
        ('insCode', dtype('O')),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('pClosing', dtype('float64')),
        ('iClose', dtype('bool')),
        ('yClose', dtype('bool')),
        ('pDrCotVal', dtype('float64')),
        ('zTotTran', dtype('float64')),
        ('qTotTran5J', dtype('float64')),
        ('qTotCap', dtype('float64'))]


@patch_session('faraz_BestLimits_20220222.json')
async def test_intraday_best_limits():
    i = Instrument(13666407494621646)
    df = await i.intraday_best_limits(20220222)
    assert [*df.dtypes.items()] == [
        ('idn', dtype('int64')),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('refID', dtype('int64')),
        ('number', dtype('int64')),
        ('qTitMeDem', dtype('int64')),
        ('zOrdMeDem', dtype('int64')),
        ('pMeDem', dtype('float64')),
        ('pMeOf', dtype('float64')),
        ('zOrdMeOf', dtype('int64')),
        ('qTitMeOf', dtype('int64')),
        ('insCode', dtype('O'))]


@patch_session('faraz_Shareholder_20220222.json')
async def test_intraday_holders():
    i = Instrument(13666407494621646)
    df = await i.intraday_holders(20220222)
    assert [*df.dtypes.items()] == [
        ('shareHolderID', dtype('int64')),
        ('shareHolderName', dtype('O')),
        ('cIsin', dtype('O')),
        ('dEven', dtype('int64')),
        ('numberOfShares', dtype('float64')),
        ('perOfShares', dtype('float64')),
        ('change', dtype('int64')),
        ('changeAmount', dtype('float64'))]


@patch_session('faraz_GetInstrumentState_20220222.json')
async def test_intraday_holders():
    i = Instrument(13666407494621646)
    df = await i.intraday_states(20220222)
    assert [*df.dtypes.items()] == [
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('insCode', dtype('O')),
        ('cEtaval', dtype('O')),
        ('realHeven', dtype('int64')),
        ('cEtavalTitle', dtype('O'))]


@patch_session('faraz_GetTradeHistory_20220222.json')
async def test_intraday_trades():
    i = Instrument(13666407494621646)
    df = await i.intraday_trades(20220222)
    assert [*df.dtypes.items()] == [
        ('insCode', dtype('O')),
        ('dEven', dtype('int64')),
        ('nTran', dtype('int64')),
        ('hEven', dtype('int64')),
        ('qTitTran', dtype('int64')),
        ('pTran', dtype('float64')),
        ('qTitNgJ', dtype('int64')),
        ('iSensVarP', dtype('O')),
        ('pPhSeaCotJ', dtype('float64')),
        ('pPbSeaCotJ', dtype('float64')),
        ('iAnuTran', dtype('int64')),
        ('xqVarPJDrPRf', dtype('float64')),
        ('canceled', dtype('int64'))]


@patch_session('fmelli_price_adjustment.html')
async def test_adjustments():
    df = await Instrument(35425587644337450).adjustments()
    assert len(df) >= 18
    assert [*df.dtypes.items()] == [
        ('date', dtype('O')),
        ('adj_pc', dtype('int64')),
        ('pc', dtype('int64'))]
    assert type(df.iat[0, 0]) is jdatetime


@patch_session('adjustments_flow_7.html')
async def test_price_adjustments():
    df = await price_adjustments(7)
    assert [*df.dtypes.items()] == [
        ('l18', dtype('O')),
        ('l30', dtype('O')),
        ('date', dtype('O')),
        ('adj_pc', dtype('int64')),
        ('pc', dtype('int64'))]
    assert len(df) == 6
    assert df.iat[-1, -1] == 1000


@patch_session('latif_financial_aph.aspx')
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
        ('pc', dtype('int64'))]


@patch_session('search_mellat.txt')
async def test_search():
    df = await search('ملت')
    assert type(df) is DataFrame
    assert len(df) > 40
    assert [*df.dtypes.items()] == [
        ('l18', dtype('O')),
        ('l30', dtype('O')),
        ('ins_code', dtype('int64')),
        ('retail', dtype('int64')),
        ('compensation', dtype('int64')),
        ('wholesale', dtype('int64')),
        ('_unknown1', dtype('int64')),
        ('_unknown2', dtype('int64')),
        ('_unknown3', dtype('int64')),
        ('_unknown4', dtype('int64')),
        ('_unknown5', dtype('O'))]


async def test_l18_without_web_request():
    assert await Instrument(46348559193224090).l18 == 'فولاد'


@patch_session('fmelli_introduction.html')
async def test_introduction():
    assert await (await Instrument.from_l18('فملی')).introduction() == {
        'موضوع فعالیت': 'اکتشافات، استخراج و بهره برداری از معادن مس ایران',
        'مدیر عامل': 'اردشیر سعدمحمدی',
        'نشانی': 'مجتمع مس سرچشمه و مجتمع مس میدوک در استان کرمان و مجتمع مس سونگون در تبریز شهرستان ورزقان واقع شده اند.',
        'شماره تلفن': '021-88724410',
        'نمابر': '021-88729014',
        'نشانی دفتر': 'تهران خیابان ولیعصر نرسیده به پارک ساعی پلاک 2161',
        'نشانی امور سهام': 'تهران خیابان خالد اسلامبولی (وزراء) خیابان 11 پلاک 22 طبقه اول',
        'وب سایت': 'www.nicico.com',
        'ایمیل': 'office@nicico.com',
        'حسابرس': 'حسابرسی وخدمات مالی ومدیریت ایران مشهود',
        'سرمایه': '400000000',
        'سال مالی': '12/29',
        'مدیر مالی': 'کیارش مهرانی',
        'شناسه ملی': '10100582059',
        'شرکت مدیریت فناوری بورس تهران فقط گردآورنده ی اطلاعات برای معرفی شرکت های پذیرفته شده در بورس و فرابورس است. این شرکت نظارت،مسئولیت یا آگاهی در باره ی چگونگی ارائه خدمات اداره سهام شرکت ها، توزیع سود، وضعیت افزایش سرمایه آنها و موارد مشابه دیگر ندارد و مرجع رسیدگی به شکایات یا رفع کاستی های شرکت ها نمی باشد.': 'شرکت مدیریت فناوری بورس تهران فقط گردآورنده ی اطلاعات برای معرفی شرکت های پذیرفته شده در بورس و فرابورس است. این شرکت نظارت،مسئولیت یا آگاهی در باره ی چگونگی ارائه خدمات اداره سهام شرکت ها، توزیع سود، وضعیت افزایش سرمایه آنها و موارد مشابه دیگر ندارد و مرجع رسیدگی به شکایات یا رفع کاستی های شرکت ها نمی باشد.',
        'برای مشاهده اطلاعات دقیق به کدال مراجعه کنید.': 'برای مشاهده اطلاعات دقیق به کدال مراجعه کنید.'
    }


@patch_session('tajalli_ombud_messages.html')
async def test_ombud_messages():
    df = await Instrument(1301069819790264).ombud_messages()
    assert [*df.dtypes.items()] == [
        ('header', 'string[python]'),
        ('date', dtype('O')),
        ('description', 'string[python]')]
    assert type(df.iat[0, 1]) is jdatetime


@patch_session('fmelli_dps.txt')
async def test_ombud_messages():
    df = await Instrument(35425587644337450).dps_history()
    assert [*df.dtypes.items()] == [
        ('publish_date', dtype('O')),
        ('meeting_date', dtype('O')),
        ('fiscal_year', dtype('O')),
        ('profit_or_loss_after_tax', dtype('float64')),
        ('distributable_profit', dtype('float64')),
        ('accumulated_profit_at_the_end_of_the_period', dtype('float64')),
        ('cash_earnings_per_share', dtype('float64'))]
    assert type(df.iat[0, 0]) is jdatetime
    assert type(df.iat[0, 1]) is jdatetime
    assert type(df.iat[0, 2]) is jdatetime
