from datetime import datetime
from unittest.mock import patch

from jdatetime import datetime as jdatetime

# noinspection PyProtectedMember
from tsetmc import Instrument, _core, get_market_watch_init, \
    get_closing_price_all, get_client_type_all, get_key_stats


def patch_get_content(name):
    with open(f'{__file__}/../testdata/{name}', 'rb') as f:
        text = f.read()
    return patch.object(_core, 'get_content', lambda _: text)


@patch_get_content('fmelli.html')
def test_get_page_info():
    d = Instrument(1).get_page_info()
    assert d.items() >= {
        'tmax': 19820.0
        , 'tmin': 21900.0
        , 'bvol': 5479452
        , 'eps': 1639
        , 'free_float': 33
        , 'l30': 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c'  # todo
        , 'sector_name': 'فلزات اساسی'
        , 'market': 'بازار اول (تابلوی اصلی) بورس'
        , 'month_average_volume': 98322903
        , 'l18': 'فملی'
        , 'sector_pe': 15.4
        , 'z': 101400000000
        , 'week_max': 22000.0
        , 'week_min': 20010.0
        , 'year_max': 39810.0
        , 'year_min': 5181.0
        , 'related_companies': [
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
    }.items()
    assert d['trade_history'].to_dict() == {
        'pc': {20201021: 23990.0, 20201024: 22900.0, 20201026: 21800.0, 20201027: 20790.0, 20201028: 20580.0, 20201031: 21540.0, 20201101: 20910.0, 20201102: 20860.0, 20201104: 21900.0}
        , 'pmax': {20201021: 24790.0, 20201024: 23730.0, 20201026: 22700.0, 20201027: 22050.0, 20201028: 21420.0, 20201031: 21600.0, 20201101: 22000.0, 20201102: 21490.0, 20201104: 21900.0}
        , 'pmin': {20201021: 22660.0, 20201024: 22800.0, 20201026: 21760.0, 20201027: 20710.0, 20201028: 19760.0, 20201031: 20650.0, 20201101: 20480.0, 20201102: 20010.0, 20201104: 21510.0}
        , 'py': {20201021: 23610.0, 20201024: 23990.0, 20201026: 22900.0, 20201027: 21800.0, 20201028: 20790.0, 20201031: 20580.0, 20201101: 21540.0, 20201102: 20910.0, 20201104: 20860.0}
        , 'tno': {20201021: 45582, 20201024: 9270, 20201026: 43019, 20201027: 23360, 20201028: 30277, 20201031: 20359, 20201101: 21310, 20201102: 22337, 20201104: 8953}
        , 'tval': {20201021: 3561797608680.0, 20201024: 689808784080.0, 20201026: 5372316739110.0, 20201027: 2845911615950.0, 20201028: 2064206435550.0, 20201031: 1681410500120.0, 20201101: 1700893566630.0, 20201102: 1078508781780.0, 20201104: 1759996883990.0}
        , 'tvol': {20201021: 148496612, 20201024: 30119164, 20201026: 246470643, 20201027: 136913045, 20201028: 100296057, 20201031: 78073449, 20201101: 81345212, 20201102: 51699600, 20201104: 80376009}}


@patch_get_content('dey.html')
def test_get_page_info_no_free_float():
    d = Instrument(1).get_page_info()
    assert d.items() >= {
        'tmax': 43722.0
        , 'tmin': 48324.0
        , 'bvol': 2231446
        , 'eps': 4326
        , 'free_float': None
        , 'l30': 'بانک دی'
        , 'sector_name': 'بانکها و موسسات اعتباری'
        , 'market': 'بازار دوم فرابورس'
        , 'month_average_volume': 25836324
        , 'l18': 'دی'
        , 'sector_pe': 16.69
        , 'z': 6400000000
        , 'week_max': 49934.0
        , 'week_min': 43722.0
        , 'year_max': 83000.0
        , 'year_min': 2674.0
    }.items()


@patch_get_content('kala.html')
def test_get_page_info_no_eps():
    d = Instrument(1).get_page_info()
    assert d.items() >= {
        'tmax': 37970.0
        , 'tmin': 41950.0
        , 'bvol': 1306165
        , 'eps': None
        , 'free_float': 100
        , 'l30': 'بورس کالای ایران'
        , 'sector_name': 'فعالیتهای کمکی به نهادهای مالی واسط'
        , 'market': 'بازار اول (تابلوی فرعی) بورس'
        , 'month_average_volume': 5720005
        , 'l18': 'کالا'
        , 'sector_pe': 26.22
        , 'z': 2500000000
        , 'week_max': 46870.0
        , 'week_min': 37970.0
        , 'year_max': 105352.0
        , 'year_min': 12376.0
    }.items()


@patch_get_content('khgostar.html')
def test_get_page_info_no_sector_pe():
    d = Instrument(1).get_page_info()
    assert d.items() >= {
        'tmax': 3670.0
        , 'tmin': 4050.0
        , 'bvol': 15842055
        , 'eps': 450
        , 'free_float': 52
        , 'l30': 'گسترش\u200cسرمایه\u200cگذاری\u200cایران\u200cخودرو'
        , 'sector_name': 'خودرو و ساخت قطعات'
        , 'market': 'بازار اول (تابلوی اصلی) بورس'
        , 'month_average_volume': 212159873
        , 'l18': 'خگستر'
        , 'sector_pe': None
        , 'z': 39605137000
        , 'week_max': 4250.0
        , 'week_min': 3670.0
        , 'year_max': 21750.0
        , 'year_min': 2616.0
    }.items()


@patch_get_content('dara_yekom.txt')
def test_dara1_instant():
    assert Instrument(1).get_info() == {
        'pc': 181240
        , 'pmax': 176300
        , 'pmin': 185000
        , 'pf': 181600
        , 'last_info_datetime': datetime(2020, 11, 11, 12, 29, 59)
        , 'pl': 183250
        , 'nav': 202821
        , 'nav_datetime': jdatetime(1399, 8, 21, 11, 56)
        , 'tno': 62630
        , 'timestamp': '12:29:59'
        , 'tval': 6085868910210
        , 'tvol': 33579648
        , 'py': 181110}


@patch_get_content('asam.txt')
def test_asam_instant():
    assert Instrument(1).get_info() == {
        'pc': 94140
        , 'pmax': 92001
        , 'pmin': 96000
        , 'last_info_datetime': datetime(2020, 11, 11, 12, 28, 17)
        , 'pl': 95890
        , 'nav': 95630
        , 'nav_datetime': jdatetime(1399, 8, 21, 15, 13, 43)
        , 'tno': 27
        , 'pf': 94440
        , 'timestamp': '12:28:17'
        , 'tval': 753116350
        , 'tvol': 8000
        , 'py': 93414
    }


@patch_get_content('negin.txt')
def test_negin_instant():
    assert Instrument(1).get_info() == {
        'pc': 50110
        , 'pmax': 50000
        , 'pmin': 50700
        , 'last_info_datetime': datetime(2020, 11, 11, 12, 29, 37)
        , 'pl': 50000
        , 'nav': 12190
        , 'nav_datetime': jdatetime(1398, 12, 29, 16, 0)
        , 'tno': 29
        , 'pf': 50010
        , 'timestamp': '12:29:37'
        , 'tval': 1408671580
        , 'tvol': 28109
        , 'py': 50010}


@patch_get_content('fmelli.txt')
def test_fmelli_instant():
    assert Instrument(1).get_info() == {
        'pc': 19890
        , 'pmax': 19200
        , 'pmin': 20320
        , 'last_info_datetime': datetime(2020, 11, 11, 17, 29, 53)
        , 'pl': 20320
        , 'nav': None
        , 'nav_datetime': None
        , 'tno': 26572
        , 'pf': 19400
        , 'timestamp': '17:29:53'
        , 'tval': 1318025925250
        , 'tvol': 66266936
        , 'py': 19360}


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
        'Buy_CountI', 'Buy_CountN', 'Buy_I_Volume', 'Buy_N_Volume'
        , 'Sell_CountI', 'Sell_CountN', 'Sell_I_Volume', 'Sell_N_Volume'])
    assert all(dt == 'int64' for dt in df.dtypes)
    assert df.index.name == 'id'


@patch_get_content('InstValue.aspx')
def test_get_key_stats():
    df = get_key_stats()
    assert all(df.columns.str.startswith('is'))
    assert df.index.name == 'id'


VSKHOOZ = {
    'last_info_datetime': datetime(2021, 1, 20, 6, 42, 18)
    , 'nav': None
    , 'nav_datetime': None
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
    assert df.to_dict() == {
        'pmax': {20210120: 10400.0, 20210119: 10380.0}
        , 'pmin': {20210120: 10120.0, 20210119: 9400.0}
        , 'pc': {20210120: 10380.0, 20210119: 9910.0}
        , 'pl': {20210120: 10400.0, 20210119: 10290.0}
        , 'pf': {20210120: 10350.0, 20210119: 9400.0}
        , 'py': {20210120: 9910.0, 20210119: 9890.0}
        , 'tval': {20210120: 498484813880.0, 20210119: 2649416188110.0}
        , 'tvol': {20210120: 48013394, 20210119: 267389256}
        , 'tno': {20210120: 7284, 20210119: 36765}}
    index = df.index
    assert index.name == 'date'
    assert all(index.values == [20210120, 20210119])


@patch_get_content('vsadid.txt')
def test_vsadid():
    assert Instrument(1).get_info() == {
        'last_info_datetime': datetime(2021, 1, 24, 6, 41, 10)
        , 'nav': None
        , 'nav_datetime': None
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
