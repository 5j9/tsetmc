from datetime import datetime
from unittest.mock import patch

from jdatetime import datetime as jdatetime
from pandas import DatetimeIndex
from pytest import raises

# noinspection PyProtectedMember
from tsetmc import Instrument, _core, get_market_watch_init, \
    get_closing_price_all, get_client_type_all, get_key_stats
# noinspection PyProtectedMember
from tsetmc._core import _parse_index


def patch_get_content(name):
    with open(f'{__file__}/../testdata/{name}', 'rb') as f:
        text = f.read()
    return patch.object(_core, 'get_content', lambda _: text)


@patch.object(_core, 'get_content')
def test_get_info_url(mock):
    with raises(ValueError):
        Instrument(1).get_info()
    mock.assert_called_once_with(
        'http://www.tsetmc.com/tsev2/data/instinfodata.aspx?i=1&c=&e=1')


@patch_get_content('fmelli.html')
def test_get_page_info():
    d = Instrument(1).get_page_data(True, True, True)
    trade_history = d.pop('trade_history')
    related_companies = d.pop('related_companies')
    assert d == {
        'bvol': 5479452,
        'cisin': 'IRO1MSMI0000',
        'cs': 27,
        'eps': 1639,
        'flow': 1,
        'free_float': 33,
        'group_code': 'N1',
        'isin': 'IRO1MSMI0001',
        'l18': 'فملی',
        'l30': 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c',
        'market': 'بازار اول (تابلوی اصلی) بورس',
        'month_average_volume': 98322903,
        'sector_name': 'فلزات اساسی',
        'sector_pe': 15.4,
        'tmax': 21900.0,
        'tmin': 19820.0,
        'week_max': 22000.0,
        'week_min': 20010.0,
        'year_max': 39810.0,
        'year_min': 5181.0,
        'z': 101400000000}
    assert related_companies == [
            [46348559193224090, 'فولاد', 'فولاد مبارکه اصفهان']
            , [35425587644337450, 'فملی', 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c']
            , [9211775239375291, 'ذوب', 'سهامی ذوب آهن  اصفهان']
            , [28864540805361867, 'فخوز', 'فولاد  خوزستان']
            , [66701874099226162, 'فاسمین', 'کالسیمین\u200c']
            , [60350996279289099, 'کاوه', 'فولاد کاوه جنوب کیش']
            , [59266699437480384, 'ارفع', 'شرکت آهن و فولاد ارفع']
            , [41302553376174581, 'فجر', 'فولاد امیرکبیرکاشان']
            , [70498485598181604, 'هرمز', 'فولاد هرمزگان جنوب']
            , [8977441217024425, 'فسپا', 'گروه\u200cصنعتی\u200cسپاهان\u200c']
            , [56324206651661881, 'فنورد', 'نوردوقطعات\u200c فولادی\u200c']
            , [68488673556087148, 'فپنتا', 'سپنتا']
            , [24018878640527909, 'میدکو', 'هلدینگ صنایع  معدنی خاورمیانه']
            , [43545527030854340, 'کویر', 'تولیدی فولاد سپید فراب کویر']
            , [66772024744156373, 'فباهنر', 'مس\u200c شهیدباهنر']
            , [47232550823972469, 'وتوکا', 'سرمایه\u200cگذاری\u200cتوکافولاد(هلدینگ']
            , [27814844870305607, 'کیمیا', 'معدنی کیمیای زنجان گستران']
            , [40808043719554948, 'فولاژ', 'فولاد آلیاژی ایران']
            , [65004959184388996, 'فایرا', 'آلومینیوم\u200cایران\u200c']
            , [14800142337291217, 'فولای', 'صنایع فولاد آلیاژی یزد']
            , [54277068923045214, 'فسرب', 'ملی\u200c سرب\u200cوروی\u200c ایران\u200c']
            , [48623320733330408, 'فلوله', 'لوله\u200cوماشین\u200cسازی\u200cایران\u200c']
            , [57875847776839336, 'فنوال', 'نورد آلومینیوم\u200c']
            , [54419429862704331, 'فروس', 'فروسیلیس\u200c ایران\u200c']
            , [408934423224097, 'فرآور', 'فرآوری\u200cموادمعدنی\u200cایران\u200c']
            , [4733285133017464, 'فخاس', 'فولاد خراسان']
            , [18004480270695404, 'فمراد', 'آلومراد']
            , [41713045190742691, 'وسدید', 'گروه \u200cصنعتی\u200cسدید']
            , [44296315953738727, 'فاهواز', 'نورد و لوله اهواز']
            , [29974853866926823, 'فروی', 'ذوب روی اصفهان']
            , [19367527798307032, 'فالوم', 'آلومتک\u200c']
            , [20966291817819448, 'فسدید', 'لوله\u200cوتجهیزات\u200c سدید - ورشکسته']
            , [35445515321658835, 'فماک', 'ماداکتو استیل کرد']
            , [12874072841236826, 'فسازان', 'غلتک سازان سپاهان']
            , [66021783818850713, 'فافزا', 'فولاد افزا سپاهان']
            , [43716452378323683, 'فزرین', 'زرین معدن آسیا']
            , [66514709341259550, 'فوکا', 'فولاد کاویان']
            , [67170215467608124, 'زنگان', 'صنعت روی زنگان']
            , [59342912854668427, 'فنفت', 'صنایع تجهیزات نفت']
            , [42171673792069321, 'زیسکو', 'فولاد زرند ایرانیان']
            , [26881786652328215, 'زرند', 'فولاد زرند']
            , [67535111875054076, 'پارس متال ', 'پارس متال']
            , [357086043812735, 'فولاد تربت', 'فولاد تربت حیدریه']
            , [41867071915439180, 'آلومینیوم جنوب', 'مجتمع آلومینیوم جنوب']
            , [40012411719639360, 'سیسکو', 'فولاد سیرجان ایرانیان']
            , [48175603054578540, 'اسفراین', 'مجتمع صنعتی اسفراین']
            , [58903026391426893, 'سیرجان', 'فولاد سیرجان']
            , [68604686987554533, 'فماکح', 'ح . ماداکتو استیل کرد']]
    assert trade_history.to_csv(line_terminator='\n') == (
        'date,pc,py,pmin,pmax,tno,tvol,tval\n'
        '2020-11-04,21900.0,20860.0,21510.0,21900.0,8953,80376009,1759996883990.0\n'
        '2020-11-02,20860.0,20910.0,20010.0,21490.0,22337,51699600,1078508781780.0\n'
        '2020-11-01,20910.0,21540.0,20480.0,22000.0,21310,81345212,1700893566630.0\n'
        '2020-10-31,21540.0,20580.0,20650.0,21600.0,20359,78073449,1681410500120.0\n'
        '2020-10-28,20580.0,20790.0,19760.0,21420.0,30277,100296057,2064206435550.0\n'
        '2020-10-27,20790.0,21800.0,20710.0,22050.0,23360,136913045,2845911615950.0\n'
        '2020-10-26,21800.0,22900.0,21760.0,22700.0,43019,246470643,5372316739110.0\n'
        '2020-10-24,22900.0,23990.0,22800.0,23730.0,9270,30119164,689808784080.0\n'
        '2020-10-21,23990.0,23610.0,22660.0,24790.0,45582,148496612,3561797608680.0\n')


@patch_get_content('dey.html')
def test_get_page_info_no_free_float():
    d = Instrument(1).get_page_data()
    assert d == {
        'bvol': 2231446,
        'cisin': 'IRO3BDYZ0003',
        'cs': 57,
        'eps': 4326,
        'flow': 2,
        'free_float': None,
        'group_code': 'Z1',
        'isin': 'IRO3BDYZ0001',
        'l18': 'دی',
        'l30': 'بانک دی',
        'market': 'بازار دوم فرابورس',
        'month_average_volume': 25836324,
        'sector_name': 'بانکها و موسسات اعتباری',
        'sector_pe': 16.69,
        'tmax': 48324.0,
        'tmin': 43722.0,
        'week_max': 49934.0,
        'week_min': 43722.0,
        'year_max': 83000.0,
        'year_min': 2674.0,
        'z': 6400000000}


@patch_get_content('kala.html')
def test_get_page_info_no_eps():
    d = Instrument(1).get_page_data()
    assert d == {
        'bvol': 1306165,
        'cisin': 'IRO1KALA0001',
        'cs': 67,
        'eps': None,
        'flow': 1,
        'free_float': 100,
        'group_code': 'N1',
        'isin': 'IRO1KALA0001',
        'l18': 'کالا',
        'l30': 'بورس کالای ایران',
        'market': 'بازار اول (تابلوی فرعی) بورس',
        'month_average_volume': 5720005,
        'sector_name': 'فعالیتهای کمکی به نهادهای مالی واسط',
        'sector_pe': 26.22,
        'tmax': 41950.0,
        'tmin': 37970.0,
        'week_max': 46870.0,
        'week_min': 37970.0,
        'year_max': 105352.0,
        'year_min': 12376.0,
        'z': 2500000000}


@patch_get_content('khgostar.html')
def test_get_page_info_no_sector_pe():
    d = Instrument(1).get_page_data()
    assert d.items() >= {
        'tmin': 3670.0
        , 'tmax': 4050.0
        , 'bvol': 15842055
        , 'eps': 450
        , 'free_float': 52
        , 'l30': 'گسترش\u200cسرمایه\u200cگذاری\u200cایران\u200cخودرو'
        , 'sector_name': 'خودرو و ساخت قطعات'
        , 'market': 'بازار اول (تابلوی اصلی) بورس'
        , 'month_average_volume': 212159873
        , 'l18': 'خگستر'
        , 'sector_pe': -32.11
        , 'z': 39605137000
        , 'week_max': 4250.0
        , 'week_min': 3670.0
        , 'year_max': 21750.0
        , 'year_min': 2616.0
    }.items()


@patch_get_content('dara_yekom.txt')
def test_dara1_instant():
    assert Instrument(1).get_info(index=True, orders=True) == {
        'derivatives_status': 'F',
        'derivatives_tno': 7864,
        'derivatives_tval': 150982456491.0,
        'derivatives_tvol': 452251494.0,
        'last_info_datetime': datetime(2021, 1, 27, 12, 30),
        'market_last_transaction': jdatetime(1399, 11, 8, 15, 21, 59),
        'nav': 190671,
        'nav_datetime': jdatetime(1399, 11, 8, 15, 40),
        'otc_status': 'F',
        'otc_tno': 494135,
        'otc_tval': 122240030535934.0,
        'otc_tvol': 2168547032.0,
        'pc': 151580,
        'pd1': 150120,
        'pd2': 150000,
        'pd3': 149990,
        'pf': 147550,
        'pl': 150120,
        'pmax': 141100,
        'pmin': 158000,
        'po1': 150120,
        'po2': 150130,
        'po3': 150500,
        'py': 152030,
        'qd1': 2000,
        'qd2': 62729,
        'qd3': 3185,
        'qo1': 7275,
        'qo2': 34582,
        'qo3': 3862,
        'status': 'A ',
        'timestamp': '12:30:00',
        'tno': 84083,
        'tse_index': 1207698.27,
        'tse_index_change': -7335.16,
        'tse_index_change_percent': -0.6,
        'tse_status': 'F',
        'tse_tno': 113961561691999.0,
        'tse_tval': 113961561691999.0,
        'tse_tvol': 10062531582.0,
        'tse_value': 4.802681498014614e+16,
        'tval': 9972065145080,
        'tvol': 65786166,
        'zd1': 1,
        'zd2': 8,
        'zd3': 12,
        'zo1': 3,
        'zo2': 1,
        'zo3': 3}


@patch_get_content('asam.txt')
def test_asam_instant():
    assert Instrument(1).get_info(orders=True) == {
        'status': 'A '
        , 'last_info_datetime': datetime(2020, 11, 11, 12, 28, 17)
        , 'nav': 95630
        , 'nav_datetime': jdatetime(1399, 8, 21, 15, 13, 43)
        , 'pc': 94140
        , 'pd1': 94000
        , 'pd2': 92350
        , 'pd3': 91140
        , 'pf': 94440
        , 'pl': 95890
        , 'pmax': 92001
        , 'pmin': 96000
        , 'po1': 95900
        , 'po2': 95990
        , 'po3': 96000
        , 'py': 93414
        , 'qd1': 5000
        , 'qd2': 50
        , 'qd3': 550
        , 'qo1': 3000
        , 'qo2': 250
        , 'qo3': 560
        , 'timestamp': '12:28:17'
        , 'tno': 27
        , 'tval': 753116350
        , 'tvol': 8000
        , 'zd1': 1
        , 'zd2': 1
        , 'zd3': 1
        , 'zo1': 1
        , 'zo2': 2
        , 'zo3': 2}


@patch_get_content('negin.txt')
def test_negin_instant():
    assert Instrument(1).get_info() == {
        'status': 'A '
        , 'last_info_datetime': datetime(2020, 11, 11, 12, 29, 37)
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


@patch_get_content('fmelli.txt')
def test_fmelli_instant():
    assert Instrument(1).get_info(orders=False) == {
        'status': 'A '
        , 'last_info_datetime': datetime(2020, 11, 11, 17, 29, 53)
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


@patch_get_content('MarketWatchInit.aspx')
def test_get_market_watch_init():
    df = get_market_watch_init()['dataframe']
    assert df.dtypes.to_dict() == {
        'heven': 'int64', 'pf': 'int64', 'pc': 'int64'
        , 'pl': 'int64', 'tno': 'int64', 'tvol': 'int64'
        , 'tval': 'int64', 'pmin': 'int64', 'pmax': 'int64'
        , 'py': 'int64', 'eps': 'float64', 'bvol': 'int64'
        , 'visitcount': 'int64', 'flow': 'int64'
        , 'cs': 'int64', 'tmax': 'Int64', 'tmin': 'Int64'
        , 'z': 'int64', 'yval': 'int64', 'pd1': 'Int64'
        , 'po1': 'Int64', 'qd1': 'Int64', 'qo1': 'Int64'
        , 'zd1': 'Int64', 'zo1': 'Int64', 'pd2': 'Int64'
        , 'po2': 'Int64', 'qd2': 'Int64', 'qo2': 'Int64'
        , 'zd2': 'Int64', 'zo2': 'Int64', 'pd3': 'Int64'
        , 'po3': 'Int64', 'qd3': 'Int64', 'qo3': 'Int64'
        , 'zd3': 'Int64', 'zo3': 'Int64'}
    index = df.index
    assert index.names == ['id', 'isin', 'l18', 'l30']
    assert index.dtype == 'O'
    # in pandas 1.3 there will be no need for `.to_frame()`
    assert index.to_frame().dtypes.to_list() == ['int64', 'O', 'O', 'O']


@patch_get_content('ClosingPriceAll.aspx')
def test_get_closing_price_all():
    df = get_closing_price_all()
    assert df.dtypes.to_dict() == {
        'pc': 'int64', 'pl': 'int64', 'tno': 'int64', 'tvol': 'int64'
        , 'tval': 'int64', 'pmin': 'int64', 'pmax': 'int64', 'py': 'int64'
        , 'pf': 'int64'}
    index = df.index
    assert index.names == ['id', 'n']
    assert index.dtype == 'O'
    # in pandas 1.3 there will be no need for `.to_frame()`
    assert index.to_frame().dtypes.to_list() == ['int64', 'int64']


@patch_get_content('ClientTypeAll.aspx')
def test_get_client_type_all():
    df = get_client_type_all()
    assert all(df.columns == [
        'n_buy_count', 'l_buy_count', 'n_buy_volume', 'l_buy_volume'
        , 'n_sell_count', 'l_sell_count', 'n_sell_volume', 'l_sell_volume'])
    assert all(dt == 'int64' for dt in df.dtypes)
    assert df.index.name == 'id'


@patch_get_content('InstValue.aspx')
def test_get_key_stats():
    df = get_key_stats()
    assert all(df.columns.str.startswith('is'))
    assert df.index.name == 'id'


VSKHOOZ = {
    'status': 'IS'
    , 'last_info_datetime': datetime(2021, 1, 20, 6, 42, 18)
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


@patch_get_content('vskhooz_short_response.txt')
def test_vskhooz_short():
    assert Instrument(1).get_info() == VSKHOOZ


@patch_get_content('vskhooz_long_response.txt')
def test_vskhooz_long():
    assert Instrument(1).get_info() == VSKHOOZ


@patch_get_content('fmelli_trade_history_top2.txt')
def test_get_trade_history():
    df = Instrument(1).get_trade_history(2)
    assert df.to_csv(line_terminator='\n') == (
        'date,pmax,pmin,pc,pl,pf,py,tval,tvol,tno\n'
        '2021-01-20,10400.0,10120.0,10380.0,10400.0,10350.0,9910.0,498484813880.0,48013394,7284\n'
        '2021-01-19,10380.0,9400.0,9910.0,10290.0,9400.0,9890.0,2649416188110.0,267389256,36765\n')
    assert isinstance(df.index, DatetimeIndex)


@patch_get_content('vsadid.txt')
def test_vsadid():
    assert Instrument(1).get_info() == {
        'status': 'IS'
        , 'last_info_datetime': datetime(2021, 1, 24, 6, 41, 10)
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


@patch_get_content('search_firuze.txt')
def test_from_search_with_numeric_description():
    # note the "30" in فيروزه - صندوق شاخص30 شركت فيروزه- سهام
    assert Instrument.from_search('فیروزه').ins_code == 66036975502302203


def test_repr():
    # known ID
    assert repr(Instrument('فملی')) == "Instrument('فملی')"
    # unknown ID
    assert repr(Instrument(1)) == "Instrument(1)"


def test_equal():
    assert Instrument('فملی') == Instrument(35425587644337450)


@patch_get_content('vsadid_identification.html')
def test_get_identification():
    assert Instrument(1).get_identification().to_dict() == {1: {
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
        'گروه صنعت': 'فلزات اساسی'}}


@patch_get_content('opal_client_types.txt')
def test_get_client_type():
    assert Instrument('اپال').get_client_type().to_csv(line_terminator='\n') == (
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
    assert _parse_index("00/1/14 06:40:12,F,1294521.64,<div class='mn'>(8671.45)</div>,,0.00,0.00,0,C,0.00,0.00,0,C,0.00,0.00,0,") == {
        'derivatives_status': 'C',
        'derivatives_tno': 0,
        'derivatives_tval': 0.0,
        'derivatives_tvol': 0.0,
        'market_last_transaction': jdatetime(1300, 1, 14, 6, 40, 12),
        'otc_status': 'C',
        'otc_tno': 0,
        'otc_tval': 0.0,
        'otc_tvol': 0.0,
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
        'market_last_transaction': jdatetime(1399, 12, 16, 15, 45, 46),
        'otc_status': 'N',
        'otc_tno': 342228,
        'otc_tval': 163701347122693.0,
        'otc_tvol': 1057924358.0,
        'tse_index': 1169760.86,
        'tse_index_change': -8155.9,
        'tse_index_change_percent': -0.69,
        'tse_status': 'F',
        'tse_tno': 34288551133025.0,
        'tse_tval': 34288551133025.0,
        'tse_tvol': 3055466451.0,
        'tse_value': 4.674381234630472e+16
    } == _parse_index(
        "99/12/16 15:45:46,F,1169760.86,<div class='mn'>(8155.90)</div> -0.69%,46743812346304720.00,3055466451.00,34288551133025.00,428601,N,1057924358.00,163701347122693.00,342228,N,101096.00,31470939000.00,2621,")

    assert {
        'derivatives_status': 'F',
        'derivatives_tno': 5796,
        'derivatives_tval': 57759844000.0,
        'derivatives_tvol': 225866.0,
        'market_last_transaction': jdatetime(1399, 12, 24, 14, 39, 40),
        'otc_status': 'F',
        'otc_tno': 544617,
        'otc_tval': 128484547655014.0,
        'otc_tvol': 1577202926.0,
        'tse_index': 1245186.04,
        'tse_index_change': 15808.56,
        'tse_index_change_percent': 1.29,
        'tse_status': 'F',
        'tse_tno': 75828635544957.0,
        'tse_tval': 75828635544957.0,
        'tse_tvol': 9682732949.0,
        'tse_value': 4.973605456635374e+16} == _parse_index(
        "99/12/24 14:39:40,F,1245186.04,<div class='pn'>15808.56</div> 1.29%,49736054566353740.00,9682732949.00,75828635544957.00,830860,F,1577202926.00,128484547655014.00,544617,F,225866.00,57759844000.00,5796,")
