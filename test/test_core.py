from unittest.mock import patch

# noinspection PyProtectedMember
from tsetmc import Stock, _core


def patch_get_with_file(name):
    with open(f'{__file__}/../data/{name}', encoding='utf8') as f:
        text = f.read().replace('ي', 'ی').replace('ك', 'ک')
    return patch.object(_core, 'get', lambda _: text)


@patch_get_with_file('famali.html')
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
