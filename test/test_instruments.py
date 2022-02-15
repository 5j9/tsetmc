from datetime import datetime
from types import NoneType
from unittest.mock import patch

from jdatetime import datetime as jdatetime
from numpy import dtype
from pandas import DataFrame, DatetimeIndex
from pytest import raises

from tsetmc.instruments import Instrument, price_adjustments, search

from test import disable_get, patch_get, OFFLINE_MODE


def setup_module():
    disable_get.start()


def teardown_module():
    disable_get.stop()


if OFFLINE_MODE is True:
    def test_info_url():
        with raises(NotImplementedError):
            Instrument(35425587644337450).live_data()


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


@patch_get('fmelli.html')
def test_page_data():
    ins = Instrument(35425587644337450)
    assert ins._l18 is ins._l30 is None
    d = ins.page_data(True, True, True)
    assert_page_data(d, True, True, True)


@patch_get('dey.html')
def test_page_data_no_free_float():
    d = Instrument(44818950263583523).page_data()
    assert_page_data(d)


@patch_get('kala.html')
def test_page_data_no_eps():
    d = Instrument(44549439964296944).page_data()
    assert_page_data(d)


@patch_get('khgostar.html')
def test_page_data_negative_sector_pe():
    d = Instrument(48990026850202503).page_data()
    assert_page_data(d)


def assert_live_data(d, best_limits=False, market_state=False, nav=False):
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
        market_state = d.pop('market_state')
        assert type(market_state.pop('datetime')) is jdatetime
        for k in ('tse_status', 'fb_status', 'derivatives_status'):
            assert type(market_state.pop(k)) is str
        for k in ('fb_tno', 'derivatives_tno'):
            assert type(market_state.pop(k)) is int
        assert [*market_state.keys()] == [
            'tse_index', 'tse_index_change', 'tse_tvol', 'tse_tval', 'tse_tno',
            'fb_tvol', 'fb_tval', 'derivatives_tvol', 'derivatives_tval',
            'tse_value', 'tse_index_change_percent']
        assert all(type(v) is float for v in market_state.values())

    if nav:
        assert type(d.pop('nav_datetime')) is jdatetime
        assert type(d.pop('nav')) is (int)

    assert type(d.pop('datetime')) is datetime
    for k in ('timestamp', 'status'):
        assert type(d.pop(k)) is str
    assert [*d.keys()] == [
        'pl', 'pc', 'pf', 'py', 'pmin', 'pmax', 'tno', 'tvol', 'tval']
    assert all(type(v) is int for v in d.values())


@patch_get('dara_yekom.txt')
def test_dara1_instant():
    d = Instrument(62235397452612911).live_data(market_state=True, best_limits=True)
    assert_live_data(d, best_limits=True, market_state=True, nav=True)


@patch_get('asam.txt')
def test_asam_instant():
    d = Instrument(36592972482259020).live_data(best_limits=True)
    assert_live_data(d, best_limits=True, nav=True)


@patch_get('negin.txt')
def test_negin_instant():
    d = Instrument(10145129193828624).live_data()
    assert_live_data(d, nav=True)


@patch_get('fmelli.txt')
def test_fmelli_instant():
    d = Instrument(35425587644337450).live_data(best_limits=False)
    assert_live_data(d, best_limits=False)


@patch_get('vskhooz_short_response.txt')
def test_vskhooz_short():
    assert_live_data(Instrument(5454781314262062).live_data())


@patch_get('vskhooz_long_response.txt')
def test_vskhooz_long():
    assert_live_data(Instrument(5454781314262062).live_data())


@patch_get('fmelli_trade_history_top2.txt')
def test_trade_history():
    df = Instrument(35425587644337450).trade_history(2)
    assert [*df.dtypes.items()] == [
        ('pmax', dtype('float64')),
        ('pmin', dtype('float64')),
        ('pc', dtype('float64')),
        ('pl', dtype('float64')),
        ('pf', dtype('float64')),
        ('py', dtype('float64')),
        ('tval', dtype('float64')),
        ('tvol', dtype('int64')),
        ('tno', dtype('int64'))]
    assert df.index.name == 'date'
    assert isinstance(df.index, DatetimeIndex)


@patch_get('vsadid.txt')
def test_vsadid():
    d = Instrument(41713045190742691).live_data()
    assert_live_data(d)


@patch_get('search_firuze.txt')
def test_from_search_with_numeric_description():
    # note the "30" in فيروزه - صندوق شاخص30 شركت فيروزه- سهام
    i = Instrument.from_search('فیروزه')
    assert i.code == 66036975502302203
    assert i.l18 == 'فیروزه'


def test_repr():
    # known l18
    assert repr(
        Instrument.from_l18('فملی')) == "Instrument(35425587644337450, 'فملی')"
    # unknown l18
    assert repr(Instrument(1)) == "Instrument(1)"
    assert repr(Instrument(1, l30='مجتمع جهان فولاد سيرجان')) == \
        "Instrument(1, l30='مجتمع جهان فولاد سيرجان')"


def test_equal():
    assert Instrument.from_l18('فملی') == Instrument(35425587644337450)


@patch_get('vsadid_identification.html')
def test_identification():
    assert Instrument(41713045190742691).identification() == {
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


@patch_get('opal_client_types.txt')
def test_client_type():
    df = Instrument(655060129740445).client_type()
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


@patch_get('ava_holders.txt')
def test_holders_with_cisin():
    holders = Instrument(18007109712724189).holders(cisin='IRT3AVAF0003')
    assert [*holders.dtypes.items()] == [
        ('holder', dtype('O')),
        ('shares/units', dtype('O')),
        ('%', dtype('float64')),
        ('change', dtype('int64')),
        ('id_cisin', dtype('O'))]


@patch_get('ava_holders2.txt')
def test_holders_change_column_type():
    holders = Instrument(18007109712724189).holders(cisin='IRT3AVAF0003')
    assert [*holders.dtypes.items()] == [
        ('holder', dtype('O')),
        ('shares/units', dtype('O')),
        ('%', dtype('float64')),
        ('change', dtype('int64')),
        ('id_cisin', dtype('O'))]


@patch_get('ava_holder.txt')
def test_holder():
    inst = Instrument(18007109712724189)
    # has no other holdings
    hist, oth = inst.holder('69867,IRT3AVAF0003', True, True)
    assert hist.to_csv(line_terminator='\n').startswith('date,shares\n2021-03-01,6600001\n2021-03-02,6603001\n')
    assert oth.to_csv(line_terminator='\n') == 'ins_code,name,shares,percent\n'
    hist = inst.holder('69867,IRT3AVAF0003', True)
    assert type(hist) is DataFrame
    oth = inst.holder('69867,IRT3AVAF0003', False, True)
    assert type(oth) is DataFrame
    result = inst.holder('69867,IRT3AVAF0003', False)
    assert oth.equals(result)


@patch_get('vsadid_identification.html')
def test_holders_without_cisin():
    inst = Instrument(41713045190742691)
    assert inst.identification()['کد 12 رقمی شرکت'] == 'IRO7SDIP0002'
    with patch.object(Instrument, 'page_data', side_effect=NotImplementedError) as page_data:
        with raises(NotImplementedError):
            inst.holders()
    page_data.assert_called_once()


@patch_get('fmelli_20210602_intraday.html')
def test_intraday_general():
    result = Instrument(35425587644337450).intraday(
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
    assert result['candles'].iloc[-1].to_dict() == {
        'time': '12:15', 'high': 12580, 'low': 12400, 'open': 12440,
        'close': 12460, 'tvol': 7036930}
    assert result['states'].iloc[-1].to_dict() == {
        'date': 20210214, 'time': 1, 'state': 'A '}
    assert result['trades'].iloc[-1].to_dict() == {
        'time': '12:30:00', 'tvol': 750, 'pl': 12480, 'annulled': False}
    assert len(result['holders']) == 0
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
        'n_sell_count': 0,
        'n_sell_percent': 81,
        'n_sell_value': 611819107680,
        'n_sell_volume': 49101164}
    assert result['best_limits'].loc[133707].to_dict() == {
        'row': 5, 'zd': 31, 'qd': 534434, 'pd': 12430, 'po': 12520,
        'qo': 111906, 'zo': 15}


@patch_get('fmelli_price_adjustment.html')
def test_adjustments():
    df = Instrument(35425587644337450).adjustments()
    assert len(df) >= 18
    assert [*df.dtypes.items()] == [
        ('date', dtype('O')),
        ('adj_pc', dtype('int64')),
        ('pc', dtype('int64'))]
    assert type(df.iat[0, 0]) is jdatetime


@patch_get('adjustments_flow_7.html')
def test_price_adjustments():
    df = price_adjustments(7)
    assert [*df.dtypes.items()] == [
        ('l18', dtype('O')),
        ('l30', dtype('O')),
        ('date', dtype('O')),
        ('adj_pc', dtype('int64')),
        ('pc', dtype('int64'))]
    assert len(df) == 6
    assert df.iat[-1, -1] == 1000


@patch_get('latif_financial_aph.aspx')
def test_adjusted_price_history():
    df = Instrument(16422980660132735).price_history()
    assert df.index.name == 'date'
    assert df.index.dtype == dtype('<M8[ns]')
    assert [*df.dtypes.items()] == [
        ('pmax', dtype('int64')),
        ('pmin', dtype('int64')),
        ('pf', dtype('int64')),
        ('pl', dtype('int64')),
        ('tvol', dtype('int64')),
        ('pc', dtype('int64'))]


@patch_get('search_mellat.txt')
def test_search():
    df = search('ملت')
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


def test_l18_without_web_request():
    assert Instrument(46348559193224090).l18 == 'فولاد'


@patch_get('fmelli_introduction.html')
def test_introduction():
    assert Instrument.from_l18('فملی').introduction() == {
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


@patch_get('tajalli_ombud_messages.html')
def test_ombud_messages():
    df = Instrument(1301069819790264).ombud_messages()
    assert [*df.dtypes.items()] == [
        ('header', 'string[python]'),
        ('date', dtype('O')),
        ('description', 'string[python]')]
    assert type(df.iat[0, 1]) is jdatetime
