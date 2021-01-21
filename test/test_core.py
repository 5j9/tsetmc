from datetime import datetime
from unittest.mock import patch

from jdatetime import datetime as jdatetime

# noinspection PyProtectedMember
from tsetmc import Instrument, _core, get_market_watch_init, \
    get_closing_price_all, get_client_type_all, get_key_stats


def patch_get_content(name):
    with open(f'{__file__}/../data/{name}', 'rb') as f:
        text = f.read()
    return patch.object(_core, 'get_content', lambda _: text)


@patch_get_content('fmelli.html')
def test_get_page_info():
    d = Instrument(1).get_page_info()
    assert d == {
        'tmax': 19820.0,
        'tmin': 21900.0,
        'bvol': 5479452,
        'eps': 1639,
        'free_float': 33,
        'l30': 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c',  # todo
        'sector_name': 'فلزات اساسی',
        'market': 'بازار اول (تابلوی اصلی) بورس',
        'month_average_volume': 98322903,
        'l18': 'فملی',
        'sector_pe': 15.4,
        'z': 101400000000,
        'week_max': 22000.0,
        'week_min': 20010.0,
        'year_max': 39810.0,
        'year_min': 5181.0}


@patch_get_content('dey.html')
def test_get_page_info_no_free_float():
    d = Instrument(1).get_page_info()
    assert d == {
        'tmax': 43722.0,
        'tmin': 48324.0,
        'bvol': 2231446,
        'eps': 4326,
        'free_float': None,
        'l30': 'بانک دی',
        'sector_name': 'بانکها و موسسات اعتباری',
        'market': 'بازار دوم فرابورس',
        'month_average_volume': 25836324,
        'l18': 'دی',
        'sector_pe': 16.69,
        'z': 6400000000,
        'week_max': 49934.0,
        'week_min': 43722.0,
        'year_max': 83000.0,
        'year_min': 2674.0}


@patch_get_content('kala.html')
def test_get_page_info_no_eps():
    d = Instrument(1).get_page_info()
    assert d == {
        'tmax': 37970.0,
        'tmin': 41950.0,
        'bvol': 1306165,
        'eps': None,
        'free_float': 100,
        'l30': 'بورس کالای ایران',
        'sector_name': 'فعالیتهای کمکی به نهادهای مالی واسط',
        'market': 'بازار اول (تابلوی فرعی) بورس',
        'month_average_volume': 5720005,
        'l18': 'کالا',
        'sector_pe': 26.22,
        'z': 2500000000,
        'week_max': 46870.0,
        'week_min': 37970.0,
        'year_max': 105352.0,
        'year_min': 12376.0}


@patch_get_content('khgostar.html')
def test_get_page_info_no_sector_pe():
    d = Instrument(1).get_page_info()
    assert d == {
        'tmax': 3670.0,
        'tmin': 4050.0,
        'bvol': 15842055,
        'eps': 450,
        'free_float': 52,
        'l30': 'گسترش\u200cسرمایه\u200cگذاری\u200cایران\u200cخودرو',
        'sector_name': 'خودرو و ساخت قطعات',
        'market': 'بازار اول (تابلوی اصلی) بورس',
        'month_average_volume': 212159873,
        'l18': 'خگستر',
        'sector_pe': None,
        'z': 39605137000,
        'week_max': 4250.0,
        'week_min': 3670.0,
        'year_max': 21750.0,
        'year_min': 2616.0}


@patch_get_content('dara_yekom.txt')
def test_dara1_instant():
    assert Instrument(1).get_info() == {
        'pc': 181240,
        'pmax': 176300,
        'pmin': 185000,
        'pf': 181600,
        'last_info_datetime': datetime(2020, 11, 11, 12, 29, 59),
        'pl': 183250,
        'nav': 202821,
        'nav_datetime': jdatetime(1399, 8, 21, 11, 56),
        'tno': 62630,
        'timestamp': '12:29:59',
        'tval': 6085868910210,
        'tvol': 33579648,
        'py': 181110}


@patch_get_content('asam.txt')
def test_asam_instant():
    assert Instrument(1).get_info() == {
        'pc': 94140,
        'pmax': 92001,
        'pmin': 96000,
        'last_info_datetime': datetime(2020, 11, 11, 12, 28, 17),
        'pl': 95890,
        'nav': 95630,
        'nav_datetime': jdatetime(1399, 8, 21, 15, 13, 43),
        'tno': 27,
        'pf': 94440,
        'timestamp': '12:28:17',
        'tval': 753116350,
        'tvol': 8000,
        'py': 93414
    }


@patch_get_content('negin.txt')
def test_negin_instant():
    assert Instrument(1).get_info() == {
        'pc': 50110,
        'pmax': 50000,
        'pmin': 50700,
        'last_info_datetime': datetime(2020, 11, 11, 12, 29, 37),
        'pl': 50000,
        'nav': 12190,
        'nav_datetime': jdatetime(1398, 12, 29, 16, 0),
        'tno': 29,
        'pf': 50010,
        'timestamp': '12:29:37',
        'tval': 1408671580,
        'tvol': 28109,
        'py': 50010}


@patch_get_content('fmelli.txt')
def test_fmelli_instant():
    assert Instrument(1).get_info() == {
        'pc': 19890,
        'pmax': 19200,
        'pmin': 20320,
        'last_info_datetime': datetime(2020, 11, 11, 17, 29, 53),
        'pl': 20320,
        'nav': None,
        'nav_datetime': None,
        'tno': 26572,
        'pf': 19400,
        'timestamp': '17:29:53',
        'tval': 1318025925250,
        'tvol': 66266936,
        'py': 19360}


@patch_get_content('MarketWatchInit.aspx')
def test_get_market_watch_init():
    df = get_market_watch_init()['dataframe']
    assert df.dtypes.to_dict() == {
        'heven': 'int64', 'pf': 'int64', 'pc': 'int64',
        'pl': 'int64', 'tno': 'int64', 'tvol': 'int64',
        'tval': 'int64', 'pmin': 'int64', 'pmax': 'int64',
        'py': 'int64', 'eps': 'float64', 'bvol': 'int64',
        'visitcount': 'int64', 'flow': 'int64',
        'cs': 'int64', 'tmax': 'Int64', 'tmin': 'Int64',
        'z': 'int64', 'yval': 'int64', 'pd1': 'Int64',
        'po1': 'Int64', 'qd1': 'Int64', 'qo1': 'Int64',
        'zd1': 'Int64', 'zo1': 'Int64', 'pd2': 'Int64',
        'po2': 'Int64', 'qd2': 'Int64', 'qo2': 'Int64',
        'zd2': 'Int64', 'zo2': 'Int64', 'pd3': 'Int64',
        'po3': 'Int64', 'qd3': 'Int64', 'qo3': 'Int64',
        'zd3': 'Int64', 'zo3': 'Int64'}
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
        'Buy_CountI', 'Buy_CountN', 'Buy_I_Volume', 'Buy_N_Volume',
        'Sell_CountI', 'Sell_CountN', 'Sell_I_Volume', 'Sell_N_Volume'])
    assert all(dt == 'int64' for dt in df.dtypes)
    assert df.index.name == 'id'


@patch_get_content('InstValue.aspx')
def test_get_key_stats():
    df = get_key_stats()
    assert all(df.columns.str.startswith('is'))
    assert df.index.name == 'id'


VSKHOOZ = {
    'last_info_datetime': datetime(2021, 1, 20, 6, 42, 18),
    'nav': None,
    'nav_datetime': None,
    'pc': 67818,
    'pf': 0,
    'pl': 67810,
    'pmax': 0,
    'pmin': 0,
    'py': 67818,
    'timestamp': '06:42:18',
    'tno': 0,
    'tval': 0,
    'tvol': 0}


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
