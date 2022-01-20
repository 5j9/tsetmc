from datetime import datetime
from unittest.mock import patch

from jdatetime import datetime as jdatetime
from numpy import dtype
from pandas import DataFrame, DatetimeIndex
from pytest import raises

from tsetmc.instruments import Instrument, price_adjustments, search
# todo: move market watch to another module
# noinspection PyProtectedMember
from tsetmc.market_watch import _PRICE_DTYPES, _parse_market_state
from tsetmc.market_watch import market_watch_init, market_watch_plus, \
    key_stats, closing_price_all, client_type_all, status_changes, \
    ombud_messages


get_patcher = patch(
    'tsetmc._requests_get', side_effect=NotImplementedError(
        'offline tests should not call tsetmc._requests_get'))


def setup_module():
    get_patcher.start()


def teardown_module():
    get_patcher.stop()


class FakeResponse:

    def __init__(self, content: bytes):
        self.content = content


def patch_get(name):
    with open(f'{__file__}/../testdata/{name}', 'rb') as f:
        content = f.read()
    return patch('tsetmc._requests_get', lambda _: FakeResponse(content))


def test_info_url():
    with raises(NotImplementedError):
        Instrument(1).live_data()
    with raises(NotImplementedError):
        market_watch_init()


@patch_get('fmelli.html')
def test_page_info():
    ins = Instrument(1)
    assert ins._l18 is ins._l30 is None
    d = ins.page_data(True, True, True)
    assert ins.l18 == 'فملی'
    assert ins.l30 == 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c'
    assert ins.cisin == 'IRO1MSMI0000'
    trade_history = d.pop('trade_history')
    related_companies = d.pop('related_companies')
    assert d == {
        'bvol': 9803922,
        'cisin': 'IRO1MSMI0000',
        'cs': 27,
        'eps': 1339,
        'flow': 1,
        'flow_name': 'بازار اول (تابلوی اصلی) بورس',
        'free_float': 33,
        'group_code': 'N1',
        'isin': 'IRO1MSMI0001',
        'l18': 'فملی',
        'l30': 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c',
        'month_average_volume': 80107878,
        'sector_name': 'فلزات اساسی',
        'sector_pe': 9.05,
        'sps': 2452.07,
        'tmax': 12850.0,
        'tmin': 11630.0,
        'week_max': 12440.0,
        'week_min': 11990.0,
        'year_max': 39810.0,
        'year_min': 9400.0,
        'z': 200000000000}
    assert len(related_companies) == 53
    first_related_co = related_companies[0]
    assert type(first_related_co) == Instrument
    assert first_related_co.l18 == 'فملی'
    assert trade_history.to_csv(line_terminator='\n') == (
        'date,pc,py,pmin,pmax,tno,tvol,tval\n'
        '2021-06-30,12240.0,12240.0,12180.0,12370.0,11639,61924440,758028561610.0\n'
        '2021-06-29,12240.0,12140.0,12110.0,12410.0,13153,80738158,988626346660.0\n'
        '2021-06-28,12140.0,12220.0,11990.0,12290.0,12556,69479692,843417628060.0\n'
        '2021-06-27,12220.0,12420.0,12040.0,12440.0,18830,93937722,1148372777010.0\n'
        '2021-06-26,12420.0,12310.0,12120.0,12600.0,25260,155751582,1934122998780.0\n'
        '2021-06-23,12310.0,11830.0,12020.0,12420.0,23635,204263514,2514120310650.0\n'
        '2021-06-22,11830.0,11540.0,11530.0,12110.0,24234,170353210,2014436805300.0\n'
        '2021-06-21,11540.0,11600.0,11290.0,11740.0,14337,71521163,825245262840.0\n'
        '2021-06-20,11600.0,11880.0,11450.0,11960.0,14830,73966678,858202905300.0\n')


@patch_get('dey.html')
def test_page_info_no_free_float():
    d = Instrument(1).page_data()
    assert d == {
        'bvol': 54000000,
        'cisin': 'IRO3BDYZ0003',
        'cs': 57,
        'eps': 242,
        'flow': 2,
        'flow_name': 'بازار دوم فرابورس',
        'free_float': None,
        'group_code': 'Z1',
        'isin': 'IRO3BDYZ0001',
        'l18': 'دی',
        'l30': 'بانک دی',
        'month_average_volume': 0,
        'sector_name': 'بانکها و موسسات اعتباری',
        'sector_pe': 21.04,
        'sps': None,
        'tmax': 970.0,
        'tmin': 878.0,
        'week_max': 0.0,
        'week_min': 0.0,
        'year_max': 83000.0,
        'year_min': 0.0,
        'z': 135000000000}


@patch_get('kala.html')
def test_page_info_no_eps():
    d = Instrument(1).page_data()
    assert d == {
        'bvol': 1000000,
        'cisin': 'IRO1KALA0001',
        'cs': 67,
        'eps': None,
        'flow': 1,
        'flow_name': 'بازار اول (تابلوی فرعی) بورس',
        'free_float': 100,
        'group_code': 'N1',
        'isin': 'IRO1KALA0001',
        'l18': 'کالا',
        'l30': 'بورس کالای ایران',
        'month_average_volume': 3575913,
        'sector_name': 'فعالیتهای کمکی به نهادهای مالی واسط',
        'sector_pe': 12.72,
        'sps': None,
        'tmax': 34410.0,
        'tmin': 31150.0,
        'week_max': 34900.0,
        'week_min': 31150.0,
        'year_max': 82400.0,
        'year_min': 26430.0,
        'z': 2500000000}


@patch_get('khgostar.html')
def test_page_info_negative_sector_pe():
    d = Instrument(1).page_data()
    assert d == {
        'bvol': 15842055,
        'cisin': 'IRO1GOST0003',
        'cs': 34,
        'eps': 396,
        'flow': 1,
        'flow_name': 'بازار اول (تابلوی اصلی) بورس',
        'free_float': 53,
        'group_code': 'N1',
        'isin': 'IRO1GOST0001',
        'l18': 'خگستر',
        'l30': 'گسترش\u200cسرمایه\u200cگذاری\u200cایران\u200cخودرو',
        'month_average_volume': 366858421,
        'sector_name': 'خودرو و ساخت قطعات',
        'sector_pe': -9.7,
        'sps': None,
        'tmax': 2623.0,
        'tmin': 2375.0,
        'week_max': 2623.0,
        'week_min': 2420.0,
        'year_max': 12930.0,
        'year_min': 1750.0,
        'z': 39605137000}


@patch_get('dara_yekom.txt')
def test_dara1_instant():
    live_data = Instrument(1).live_data(market_state=True, best_limits=True)
    best_limits = live_data.pop('best_limits')
    market_state = live_data.pop('market_state')
    assert live_data == {
        'pc': 151580,
        'datetime': datetime(2021, 1, 27, 12, 30),
        'nav': 190671,
        'nav_datetime': jdatetime(1399, 11, 8, 15, 40),
        'pf': 147550,
        'pl': 150120,
        'pmax': 141100,
        'pmin': 158000,
        'py': 152030,
        'status': 'A ',
        'timestamp': '12:30:00',
        'tno': 84083,
        'tval': 9972065145080,
        'tvol': 65786166,
        }
    assert market_state == {
        'datetime': jdatetime(1499, 11, 8, 15, 21, 59),
        'tse_index': 1207698.27,
        'tse_index_change': -7335.16,
        'tse_index_change_percent': -0.6,
        'tse_status': 'F',
        'tse_tno': 113961561691999.0,
        'tse_tval': 113961561691999.0,
        'tse_tvol': 10062531582.0,
        'tse_value': 4.802681498014614e+16,
        'fb_status': 'F',
        'fb_tno': 494135,
        'fb_tval': 122240030535934.0,
        'fb_tvol': 2168547032.0,
        'derivatives_status': 'F',
        'derivatives_tno': 7864,
        'derivatives_tval': 150982456491.0,
        'derivatives_tvol': 452251494.0,
    }
    assert best_limits.to_csv(line_terminator='\n') == (
        ',zd,qd,pd,po,qo,zo'
        '\n0,1,2000,150120,150120,7275,3'
        '\n1,8,62729,150000,150130,34582,1'
        '\n2,12,3185,149990,150500,3862,3'
        '\n')


@patch_get('asam.txt')
def test_asam_instant():
    live_data = Instrument(1).live_data(best_limits=True)
    best_limits = live_data.pop('best_limits')
    assert live_data == {
        'status': 'A '
        , 'datetime': datetime(2020, 11, 11, 12, 28, 17)
        , 'nav': 95630
        , 'nav_datetime': jdatetime(1399, 8, 21, 15, 13, 43)
        , 'pc': 94140
        , 'pf': 94440
        , 'pl': 95890
        , 'pmax': 92001
        , 'pmin': 96000
        , 'py': 93414
        , 'timestamp': '12:28:17'
        , 'tno': 27
        , 'tval': 753116350
        , 'tvol': 8000}
    assert best_limits.to_csv(line_terminator='\n') == (
        ',zd,qd,pd,po,qo,zo'
        '\n0,1,5000,94000,95900,3000,1'
        '\n1,1,50,92350,95990,250,2'
        '\n2,1,550,91140,96000,560,2'
        '\n')


@patch_get('negin.txt')
def test_negin_instant():
    assert Instrument(1).live_data() == {
        'status': 'A '
        , 'datetime': datetime(2020, 11, 11, 12, 29, 37)
        , 'nav': 12190
        , 'nav_datetime': jdatetime(1398, 12, 29, 16, 0)
        , 'pc': 50110
        , 'pf': 50010
        , 'pl': 50000
        , 'pmax': 50000
        , 'pmin': 50700
        , 'py': 50010
        , 'timestamp': '12:29:37'
        , 'tno': 29
        , 'tval': 1408671580
        , 'tvol': 28109}


@patch_get('fmelli.txt')
def test_fmelli_instant():
    assert Instrument(1).live_data(best_limits=False) == {
        'status': 'A '
        , 'datetime': datetime(2020, 11, 11, 17, 29, 53)
        , 'pc': 19890
        , 'pf': 19400
        , 'pl': 20320
        , 'pmax': 19200
        , 'pmin': 20320
        , 'py': 19360
        , 'timestamp': '17:29:53'
        , 'tno': 26572
        , 'tval': 1318025925250
        , 'tvol': 66266936}


PRICE_DTYPES_ITEMS = [*_PRICE_DTYPES.items()][4:]


@patch_get('MarketWatchInit.aspx')
def test_market_watch_init():
    mwi = market_watch_init(join=False, market_state=False)
    assert [*mwi['prices'].dtypes.items()] == PRICE_DTYPES_ITEMS
    # noinspection PyUnresolvedReferences
    assert [*mwi['best_limits'].index.dtypes.items()] == [
        ('ins_code', dtype('uint64')), ('number', dtype('uint64'))]
    assert 'market_state' not in mwi

    mwi = market_watch_init(market_state=True)
    prices = mwi['prices']
    assert 'market_state' in mwi
    assert 'best_limits' in mwi
    assert [*prices.dtypes.items()] == [
        ('pd1', dtype('uint64')),
        ('po1', dtype('uint64')),
        ('qd1', dtype('uint64')),
        ('qo1', dtype('uint64')),
        ('zd1', dtype('uint64')),
        ('zo1', dtype('uint64')),
        ('pd2', dtype('uint64')),
        ('po2', dtype('uint64')),
        ('qd2', dtype('uint64')),
        ('qo2', dtype('uint64')),
        ('zd2', dtype('uint64')),
        ('zo2', dtype('uint64')),
        ('pd3', dtype('uint64')),
        ('po3', dtype('uint64')),
        ('qd3', dtype('uint64')),
        ('qo3', dtype('uint64')),
        ('zd3', dtype('uint64')),
        ('zo3', dtype('uint64')),
        * PRICE_DTYPES_ITEMS]

    # noinspection PyUnresolvedReferences
    assert [*prices.index.dtypes.items()] == [
        ('ins_code', dtype('uint64')),
        ('isin', dtype('O')),
        ('l18', dtype('O')),
        ('l30', dtype('O'))]

    mwi = market_watch_init(prices=False, market_state=False)
    assert 'prices' not in mwi
    # noinspection PyUnresolvedReferences
    assert [*mwi['best_limits'].index.dtypes.items()] == [
        ('ins_code', dtype('uint64')), ('number', dtype('uint64'))]


@patch_get('ClosingPriceAll.aspx')
def test_closing_price_all():
    df = closing_price_all()
    assert all(t == 'uint64' for t in df.dtypes)
    assert df.columns.to_list() == ['pc', 'pl', 'tno', 'tvol', 'tval', 'pmin', 'pmax', 'py', 'pf']
    index = df.index
    assert index.names == ['ins_code', 'n']
    assert index.dtype == 'O'
    # noinspection PyUnresolvedReferences
    assert all(t == 'uint64' for t in index.dtypes)


@patch_get('ClientTypeAll.aspx')
def test_client_type_all():
    df = client_type_all()
    assert all(df.columns == [
        'n_buy_count', 'l_buy_count', 'n_buy_volume', 'l_buy_volume'
        , 'n_sell_count', 'l_sell_count', 'n_sell_volume', 'l_sell_volume'])
    assert all(dt == 'uint64' for dt in df.dtypes)
    assert df.index.name == 'ins_code'


@patch_get('InstValue.aspx')
def test_key_stats():
    df = key_stats()
    assert all(df.columns.str.startswith('is'))
    assert all(t == 'float64' for t in df.dtypes)
    assert df.index.name == 'ins_code'
    assert df.index.dtype == 'int64'


VSKHOOZ = {
    'status': 'IS'
    , 'datetime': datetime(2021, 1, 20, 6, 42, 18)
    , 'pc': 67818
    , 'pf': 0
    , 'pl': 67810
    , 'pmax': 0
    , 'pmin': 0
    , 'py': 67818
    , 'timestamp': '06:42:18'
    , 'tno': 0
    , 'tval': 0
    , 'tvol': 0}


@patch_get('vskhooz_short_response.txt')
def test_vskhooz_short():
    assert Instrument(1).live_data() == VSKHOOZ


@patch_get('vskhooz_long_response.txt')
def test_vskhooz_long():
    assert Instrument(1).live_data() == VSKHOOZ


@patch_get('fmelli_trade_history_top2.txt')
def test_trade_history():
    df = Instrument(1).trade_history(2)
    assert df.to_csv(line_terminator='\n') == (
        'date,pmax,pmin,pc,pl,pf,py,tval,tvol,tno\n'
        '2021-01-20,10400.0,10120.0,10380.0,10400.0,10350.0,9910.0,498484813880.0,48013394,7284\n'
        '2021-01-19,10380.0,9400.0,9910.0,10290.0,9400.0,9890.0,2649416188110.0,267389256,36765\n')
    assert isinstance(df.index, DatetimeIndex)


@patch_get('vsadid.txt')
def test_vsadid():
    assert Instrument(1).live_data() == {
        'status': 'IS'
        , 'datetime': datetime(2021, 1, 24, 6, 41, 10)
        , 'pc': 23810
        , 'pf': 0
        , 'pl': 23633
        , 'pmax': 0
        , 'pmin': 0
        , 'py': 23810
        , 'timestamp': '06:41:10'
        , 'tno': 0
        , 'tval': 0
        , 'tvol': 0}


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


def test_equal():
    assert Instrument.from_l18('فملی') == Instrument(35425587644337450)


@patch_get('vsadid_identification.html')
def test_identification():
    assert Instrument(1).identification() == {
        'بازار': 'بازار پایه نارنجی فرابورس',
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
    assert Instrument(1).client_type().to_csv(line_terminator='\n') == (
        'date,n_buy_count,l_buy_count,n_sell_count,l_sell_count,n_buy_volume,l_buy_volume,n_sell_volume,l_sell_volume,n_buy_value,l_buy_value,n_sell_value,l_sell_value'
        '\n2021-03-03,45996,40,536073,152,371944945,124311191,445956261,50299875,6032526703800,2001293803740,7203106931130,830713576410'
        '\n2021-03-02,1390,5,68895,24,42463945,909997,29432662,13941280,664560739250,14241453050,460621160300,218181032000'
        '\n2021-03-01,11957,10,208139,81,122577447,33815772,145381224,11011995,1810312954820,499453950210,2147119750880,162647154150'
        '\n2021-02-28,32473,34,388441,374,300085412,16087286,185678823,130493875,4182394884300,224209104120,2587603120610,1819000867810'
        '\n2021-02-27,1522,9,31838,20,10893007,80000,10965618,7389,143351972120,1052800000,144307532880,97239240'
        '\n2021-02-24,2752985,1535,0,2,1014549773,480840379,0,1495390152,12645360378170,5928026392500,0,18573386770670'
        '\n')


def test_parse_index():
    # no tse_value
    assert _parse_market_state("00/1/14 06:40:12,F,1294521.64,<div class='mn'>(8671.45)</div>,,0.00,0.00,0,C,0.00,0.00,0,C,0.00,0.00,0,") == {
        'derivatives_status': 'C',
        'derivatives_tno': 0,
        'derivatives_tval': 0.0,
        'derivatives_tvol': 0.0,
        'datetime': jdatetime(1400, 1, 14, 6, 40, 12),
        'fb_status': 'C',
        'fb_tno': 0,
        'fb_tval': 0.0,
        'fb_tvol': 0.0,
        'tse_index': 1294521.64,
        'tse_index_change': -8671.45,
        'tse_status': 'F',
        'tse_tno': 0.0,
        'tse_tval': 0.0,
        'tse_tvol': 0.0}

    assert {
        'derivatives_status': 'N',
        'derivatives_tno': 2621,
        'derivatives_tval': 31470939000.0,
        'derivatives_tvol': 101096.0,
        'datetime': jdatetime(1400, 12, 16, 15, 45, 46),
        'fb_status': 'N',
        'fb_tno': 342228,
        'fb_tval': 163701347122693.0,
        'fb_tvol': 1057924358.0,
        'tse_index': 1169760.86,
        'tse_index_change': -8155.9,
        'tse_index_change_percent': -0.69,
        'tse_status': 'F',
        'tse_tno': 34288551133025.0,
        'tse_tval': 34288551133025.0,
        'tse_tvol': 3055466451.0,
        'tse_value': 4.674381234630472e+16
    } == _parse_market_state(
        "00/12/16 15:45:46,F,1169760.86,<div class='mn'>(8155.90)</div> -0.69%,46743812346304720.00,3055466451.00,34288551133025.00,428601,N,1057924358.00,163701347122693.00,342228,N,101096.00,31470939000.00,2621,")

    assert {
        'derivatives_status': 'F',
        'derivatives_tno': 5796,
        'derivatives_tval': 57759844000.0,
        'derivatives_tvol': 225866.0,
        'datetime': jdatetime(1400, 12, 24, 14, 39, 40),
        'fb_status': 'F',
        'fb_tno': 544617,
        'fb_tval': 128484547655014.0,
        'fb_tvol': 1577202926.0,
        'tse_index': 1245186.04,
        'tse_index_change': 15808.56,
        'tse_index_change_percent': 1.29,
        'tse_status': 'F',
        'tse_tno': 75828635544957.0,
        'tse_tval': 75828635544957.0,
        'tse_tvol': 9682732949.0,
        'tse_value': 4.973605456635374e+16} == _parse_market_state(
        "00/12/24 14:39:40,F,1245186.04,<div class='pn'>15808.56</div> 1.29%,49736054566353740.00,9682732949.00,75828635544957.00,830860,F,1577202926.00,128484547655014.00,544617,F,225866.00,57759844000.00,5796,")


@patch_get('MarketWatchInit2.aspx')
def test_market_watch_init_non_int_tmin_tmax():
    # ins_code 12785301426418659
    # used to raise
    # TypeError: cannot safely cast non-equivalent float64 to int64
    market_watch_init()


@patch_get('ava_holders.txt')
def test_holders_with_cisin():
    holders = Instrument(1).holders(cisin=1)
    assert holders.to_csv(line_terminator='\n') == (
       ',سهامدار/دارنده,سهم,درصد,تغییر,id_cisin\n'
       '0,ETFکدرزروصندوقهای سرمایه گذاری قابل معامله,98 M,19.51,12 M,"21790,IRT3AVAF0003"\n'
       '1,BFMصندوق سرمایه گذاری.ا.بازارگردانی معیار,24 M,4.82,1 M,"60500,IRT3AVAF0003"\n'
       '2,صندوق سرمایه گذاری توازن معیار,10 M,2.05,0,"62783,IRT3AVAF0003"\n'
       '3,شرکت توسعه سامانه تحلیل گری سپیدار-سهامی خاص-,9 M,1.83,-953440,"69558,IRT3AVAF0003"\n'
       '4,شرکت مشاورسرمایه گذاری معیار-سهامی خاص-,9 M,1.82,0,"60679,IRT3AVAF0003"\n'
       '5,شخص حقیقی,7 M,1.31,-10000,"69867,IRT3AVAF0003"\n'
       '6,شرکت آرمان اندیشان رستاک-سهامی خاص-,5 M,1.0,0,"21346,IRT3AVAF0003"\n')


@patch_get('ava_holder.txt')
def test_holder():
    inst = Instrument(1)
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
    inst = Instrument(1)
    assert inst.identification()['کد 12 رقمی شرکت'] == 'IRO7SDIP0002'
    with patch.object(Instrument, 'page_data', side_effect=NotImplementedError) as page_data:
        with raises(NotImplementedError):
            inst.holders()
    page_data.assert_called_once()


@patch_get('fmelli_20210602_intraday.html')
def test_intraday_general():
    result = Instrument(1).intraday(
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
    adj_df = Instrument(1).adjustments()
    assert adj_df.columns.tolist() == ['date', 'adj_pc', 'pc']
    assert len(adj_df) == 18
    assert adj_df.loc[0].values.tolist() == [jdatetime(1399, 5, 1, 0, 0), 35720, 35970]


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
    adj_df = Instrument(1).price_history()
    assert adj_df.columns.tolist() == ['pmax', 'pmin', 'pf', 'pl', 'tvol', 'pc']
    assert adj_df.index.name == 'date'
    assert len(adj_df) == 18
    assert adj_df.iloc[-1].values.tolist() == [68410, 62366, 63500, 67508, 14222269, 65636]


@patch_get('search_mellat.txt')
def test_search():
    df = search('ملت')
    assert type(df) is DataFrame
    assert len(df) == 41
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


@patch_get('MarketWatchPlus00.txt')
def test_market_watch_plus_new():
    mwp = market_watch_plus(0, 0, messages=False, market_state=False)
    new_prices = mwp['new_prices']
    assert [*new_prices.dtypes.items()] == PRICE_DTYPES_ITEMS
    # noinspection PyUnresolvedReferences
    assert [*new_prices.index.dtypes.items()] == [
        ('ins_code', dtype('uint64')),
        ('isin', dtype('O')),
        ('l18', dtype('O')),
        ('l30', dtype('O'))]
    best_limits = mwp['best_limits']
    assert all(t == 'uint64' for t in best_limits.dtypes)
    assert best_limits.columns.to_list() == ['number', 'zo', 'zd', 'pd', 'po', 'qd', 'qo']
    assert best_limits.index.dtype == dtype('uint64')  # ins_code
    assert 'messages' not in mwp
    assert 'market_state' not in mwp


@patch_get('MarketWatchPlus_h64130_r9540883525.txt')
def test_market_watch_plus_update():
    mwp = market_watch_plus(64130, 9540883525)

    price_updates = mwp['price_updates']
    assert [*price_updates.dtypes.items()] == [
        ('heven', dtype('uint64')),
        ('pf', dtype('uint64')),
        ('pc', dtype('uint64')),
        ('pl', dtype('uint64')),
        ('tno', dtype('uint64')),
        ('tvol', dtype('uint64')),
        ('tval', dtype('uint64')),
        ('pmin', dtype('uint64')),
        ('pmax', dtype('uint64'))]
    assert price_updates.index.dtype == 'uint64'

    assert mwp['market_state'] == {
        'datetime': jdatetime(1400, 9, 21, 6, 41, 30),
        'tse_status': 'F',
        'tse_index': 1344441.58,
        'tse_index_change': -4948.21,
        'tse_tvol': 0.0,
        'tse_tval': 0.0,
        'tse_tno': 0.0,
        'fb_status': 'F',
        'fb_tvol': 0.0,
        'fb_tval': 0.0,
        'fb_tno': 0,
        'derivatives_status': 'F',
        'derivatives_tvol': 0.0,
        'derivatives_tval': 0.0,
        'derivatives_tno': 0,
        'tse_index_change_percent': -0.37}

    assert mwp['messages'] == ['115048', '770345', '427827']

    best_limits = mwp['best_limits']
    assert [*best_limits.dtypes.items()] == [
        ('number', dtype('uint64')),
        ('zo', dtype('uint64')),
        ('zd', dtype('uint64')),
        ('pd', dtype('uint64')),
        ('po', dtype('uint64')),
        ('qd', dtype('uint64')),
        ('qo', dtype('uint64'))]
    assert best_limits.index.dtype == 'uint64'

    assert mwp['refid'] == 9540883545

    new_prices = mwp['new_prices']
    assert [*new_prices.dtypes.items()] == PRICE_DTYPES_ITEMS
    # noinspection PyUnresolvedReferences
    assert [*new_prices.index.dtypes.items()] == [
        ('ins_code', dtype('uint64')),
        ('isin', dtype('O')), ('l18', dtype('O')), ('l30', dtype('O'))]


@patch_get('status_changes.html')
def test_status_changes():
    df = status_changes(3)
    assert len(df) == 3
    assert (*df.dtypes.items(),) == (
        ('نماد', dtype('O')),
        ('نام', dtype('O')),
        ('وضعیت جدید', dtype('O')),
        ('date', dtype('O')),)
    assert df.iat[0, 3] == jdatetime(1400, 10, 7, 17, 56)


@patch_get('ombud_messages.html')
def test_ombud_messages():
    df = ombud_messages(3)
    assert len(df) == 3
    assert (*df.dtypes.items(),) == (
        ('header', dtype('O')),
        ('date', dtype('O')),
        ('description', dtype('O')))
    assert df.iat[0, 1] == jdatetime(1400, 10, 8, 8, 25)
