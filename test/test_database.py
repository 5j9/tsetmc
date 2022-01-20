from tsetmc.database import boards
from test import disable_get, patch_get


def setup_module():
    disable_get.start()


def teardown_module():
    disable_get.stop()


@patch_get('boards.html')
def test_boards():
    assert boards() == {
        1: 'تابلو اصلی',
        3: 'تابلو فرعی',
        4: 'تابلو غیر رسمی',
        5: 'فهرست اولیه',
        6: 'تابلو شاخص',
        7: 'فهرست مشروط',
        8: 'ابزار مشتقه',
        9: 'بازار اوراق بدهی'}
