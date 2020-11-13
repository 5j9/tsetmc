from datetime import datetime
from unittest.mock import patch

from jdatetime import datetime as jdatetime

# noinspection PyProtectedMember
from tsetmc import Stock, _core


def patch_get_with_file(name):
    with open(f'{__file__}/../data/{name}', encoding='utf8') as f:
        text = f.read().replace('ي', 'ی').replace('ك', 'ک')
    return patch.object(_core, 'get', lambda _: text)


@patch_get_with_file('fmelli.html')
def test_get_page_info():
    d = Stock(1).get_page_info()
    assert d == {
        'allowed_max': 19820.0,
        'allowed_min': 21900.0,
        'base_volume': 5479452,
        'eps': 1639,
        'free_float': 33,
        'full_name': 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c',  # todo
        'group_name': 'فلزات اساسی',
        'market': 'بازار اول (تابلوی اصلی) بورس',
        'month_average_volume': 98322903,
        'name': 'فملی',
        'sector_pe': 15.4,
        'shares': 101400000000,
        'week_max': 22000.0,
        'week_min': 20010.0,
        'year_max': 39810.0,
        'year_min': 5181.0}


@patch_get_with_file('dey.html')
def test_get_page_info_no_free_float():
    d = Stock(1).get_page_info()
    assert d == {
        'allowed_max': 43722.0,
        'allowed_min': 48324.0,
        'base_volume': 2231446,
        'eps': 4326,
        'free_float': None,
        'full_name': 'بانک دی',
        'group_name': 'بانکها و موسسات اعتباری',
        'market': 'بازار دوم فرابورس',
        'month_average_volume': 25836324,
        'name': 'دی',
        'sector_pe': 16.69,
        'shares': 6400000000,
        'week_max': 49934.0,
        'week_min': 43722.0,
        'year_max': 83000.0,
        'year_min': 2674.0}


@patch_get_with_file('kala.html')
def test_get_page_info_no_eps():
    d = Stock(1).get_page_info()
    assert d == {
        'allowed_max': 37970.0,
        'allowed_min': 41950.0,
        'base_volume': 1306165,
        'eps': None,
        'free_float': 100,
        'full_name': 'بورس کالای ایران',
        'group_name': 'فعالیتهای کمکی به نهادهای مالی واسط',
        'market': 'بازار اول (تابلوی فرعی) بورس',
        'month_average_volume': 5720005,
        'name': 'کالا',
        'sector_pe': 26.22,
        'shares': 2500000000,
        'week_max': 46870.0,
        'week_min': 37970.0,
        'year_max': 105352.0,
        'year_min': 12376.0}


@patch_get_with_file('khgostar.html')
def test_get_page_info_no_sector_pe():
    d = Stock(1).get_page_info()
    assert d == {
        'allowed_max': 3670.0,
        'allowed_min': 4050.0,
        'base_volume': 15842055,
        'eps': 450,
        'free_float': 52,
        'full_name': 'گسترش\u200cسرمایه\u200cگذاری\u200cایران\u200cخودرو',
        'group_name': 'خودرو و ساخت قطعات',
        'market': 'بازار اول (تابلوی اصلی) بورس',
        'month_average_volume': 212159873,
        'name': 'خگستر',
        'sector_pe': None,
        'shares': 39605137000,
        'week_max': 4250.0,
        'week_min': 3670.0,
        'year_max': 21750.0,
        'year_min': 2616.0}


@patch_get_with_file('dara_yekom.txt')
def test_dara1_instant():
    assert Stock(1).get_instant_info() == {
        'closing_price': 181240,
        'day_range_end': 176300,
        'day_range_start': 185000,
        'opening_price': 181600,
        'last_info_datetime': datetime(2020, 11, 11, 12, 29, 59),
        'last_price': 183250,
        'nav': 202821,
        'nav_datetime': jdatetime(1399, 8, 21, 11, 56),
        'number_of_transactions': 62630,
        'timestamp': '12:29:59',
        'value_of_transactions': 6085868910210,
        'volume_of_transactions': 33579648,
        'yesterday_price': 181110}


@patch_get_with_file('asam.txt')
def test_asam_instant():
    assert Stock(1).get_instant_info() == {
        'closing_price': 94140,
        'day_range_end': 92001,
        'day_range_start': 96000,
        'last_info_datetime': datetime(2020, 11, 11, 12, 28, 17),
        'last_price': 95890,
        'nav': 95630,
        'nav_datetime': jdatetime(1399, 8, 21, 15, 13, 43),
        'number_of_transactions': 27,
        'opening_price': 94440,
        'timestamp': '12:28:17',
        'value_of_transactions': 753116350,
        'volume_of_transactions': 8000,
        'yesterday_price': 93414
    }


@patch_get_with_file('negin.txt')
def test_negin_instant():
    assert Stock(1).get_instant_info() == {
        'closing_price': 50110,
        'day_range_end': 50000,
        'day_range_start': 50700,
        'last_info_datetime': datetime(2020, 11, 11, 12, 29, 37),
        'last_price': 50000,
        'nav': 12190,
        'nav_datetime': jdatetime(1398, 12, 29, 16, 0),
        'number_of_transactions': 29,
        'opening_price': 50010,
        'timestamp': '12:29:37',
        'value_of_transactions': 1408671580,
        'volume_of_transactions': 28109,
        'yesterday_price': 50010}


@patch_get_with_file('fmelli.txt')
def test_fmelli_instant():
    assert Stock(1).get_instant_info() == {
        'closing_price': 19890,
        'day_range_end': 19200,
        'day_range_start': 20320,
        'last_info_datetime': datetime(2020, 11, 11, 17, 29, 53),
        'last_price': 20320,
        'nav': None,
        'nav_datetime': None,
        'number_of_transactions': 26572,
        'opening_price': 19400,
        'timestamp': '17:29:53',
        'value_of_transactions': 1318025925250,
        'volume_of_transactions': 66266936,
        'yesterday_price': 19360}
