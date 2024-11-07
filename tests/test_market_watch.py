from aiohutils.tests import OFFLINE_MODE, file
from jdatetime import datetime as jdatetime
from numpy import dtype
from pandas import DataFrame
from pandas.api.types import is_numeric_dtype

from tests import assert_market_state

# noinspection PyProtectedMember
from tsetmc.market_watch import (
    _BEST_LIMITS_NAMES,
    _PRICE_DTYPES_25,
    _parse_market_state,
    client_type_all,
    closing_price_all,
    key_stats,
    market_watch_init,
    market_watch_plus,
    status_changes,
)

PRICE_DTYPES_ITEMS = [*_PRICE_DTYPES_25.items()][1:]  # ins_code is now index
BL_STACKED_COLUMNS = _BEST_LIMITS_NAMES[2:]
BL_UNSTACKED_COLUMNS = [
    f'{n}{i}' for n in BL_STACKED_COLUMNS for i in range(1, 6)
]
string = 'string'


def assert_bl_dtypes(df: DataFrame, unstacked=True):
    if unstacked:
        columns = BL_UNSTACKED_COLUMNS
        index = df.index
        assert index.name == 'ins_code'
        assert index.dtype == string
    else:
        columns = BL_STACKED_COLUMNS
        index = df.index
        assert index.names == ['ins_code', 'number']
        assert [*index.dtypes] == [string, 'int64']  # type: ignore

    for c in columns:
        col = df.pop(c)
        assert is_numeric_dtype(col)


@file('MarketWatchInit.aspx')
async def test_market_watch_init():
    mwi = await market_watch_init(join=False, market_state=False)
    assert [*mwi['prices'].dtypes.items()] == PRICE_DTYPES_ITEMS
    assert [*mwi['best_limits'].index.dtypes.items()] == [
        ('ins_code', string),
        ('number', dtype('int64')),
    ]
    assert 'market_state' not in mwi

    mwi = await market_watch_init(market_state=True)
    prices = mwi['prices']
    assert 'market_state' in mwi
    assert 'best_limits' in mwi
    assert_bl_dtypes(prices)
    assert [*prices.dtypes.items()] == PRICE_DTYPES_ITEMS

    i = prices.index
    assert i.name == 'ins_code'
    assert i.dtype == string

    mwi = await market_watch_init(prices=False, market_state=False)
    assert 'prices' not in mwi
    assert [*mwi['best_limits'].index.dtypes.items()] == [
        ('ins_code', string),
        ('number', dtype('int64')),
    ]


@file('ClosingPriceAll.aspx')
async def test_closing_price_all():
    df = await closing_price_all()
    assert all(t == 'int64' for t in df.dtypes)
    assert df.columns.to_list() == [
        'pc',
        'pl',
        'tno',
        'tvol',
        'tval',
        'pmin',
        'pmax',
        'py',
        'pf',
    ]
    assert [*df.index.dtypes.items()] == [
        ('ins_code', string),
        ('n', dtype('int64')),
    ]


@file('ClientTypeAll.aspx')
async def test_client_type_all():
    df = await client_type_all()
    assert all(
        df.columns
        == [
            'n_buy_count',
            'l_buy_count',
            'n_buy_volume',
            'l_buy_volume',
            'n_sell_count',
            'l_sell_count',
            'n_sell_volume',
            'l_sell_volume',
        ]
    )
    assert df.index.name == 'ins_code'
    assert df.index.dtype == string
    if df.empty:
        return
    assert all(dt == 'int64' for dt in df.dtypes)


@file('InstValue.aspx')
async def test_key_stats():
    df = await key_stats()
    assert all(df.columns.str.startswith('is'))
    assert all(t == 'float64' for t in df.dtypes)
    assert df.index.name == 'ins_code'
    assert df.index.dtype == string


def test_parse_index():
    # no tse_value
    assert _parse_market_state(
        "00/1/14 06:40:12,F,1294521.64,<div class='mn'>(8671.45)</div>,,0.00,0.00,0,C,0.00,0.00,0,C,0.00,0.00,0,"
    ) == {
        'datetime': jdatetime(1400, 1, 14, 6, 40, 12),
        'derivatives_status': 'C',
        'derivatives_tno': 0,
        'derivatives_tval': 0.0,
        'derivatives_tvol': 0.0,
        'fb_status': 'C',
        'fb_tno': 0,
        'fb_tval': 0.0,
        'fb_tvol': 0.0,
        'tse_index': 1294521.64,
        'tse_index_change': -8671.45,
        'tse_index_change_percent': None,
        'tse_status': 'F',
        'tse_tno': 0.0,
        'tse_tval': 0.0,
        'tse_tvol': 0.0,
        'tse_value': None,
    }

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
        'tse_tno': 428601.0,
        'tse_tval': 34288551133025.0,
        'tse_tvol': 3055466451.0,
        'tse_value': 4.674381234630472e16,
    } == _parse_market_state(
        "00/12/16 15:45:46,F,1169760.86,<div class='mn'>(8155.90)</div> -0.69%,46743812346304720.00,3055466451.00,34288551133025.00,428601,N,1057924358.00,163701347122693.00,342228,N,101096.00,31470939000.00,2621,"
    )

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
        'tse_tno': 830860.0,
        'tse_tval': 75828635544957.0,
        'tse_tvol': 9682732949.0,
        'tse_value': 4.973605456635374e16,
    } == _parse_market_state(
        "00/12/24 14:39:40,F,1245186.04,<div class='pn'>15808.56</div> 1.29%,49736054566353740.00,9682732949.00,75828635544957.00,830860,F,1577202926.00,128484547655014.00,544617,F,225866.00,57759844000.00,5796,"
    )


@file('MarketWatchInit2.aspx')
async def test_market_watch_init_non_int_tmin_tmax():
    # ins_code 12785301426418659
    # used to raise
    # TypeError: cannot safely cast non-equivalent float64 to int64
    await market_watch_init()


@file('MarketWatchPlus00.txt')
async def test_market_watch_plus_new():
    mwp = await market_watch_plus(
        0,
        0,
        messages=False,
        market_state=False,
        best_limits_prepare_join=False,
    )
    new_prices = mwp['new_prices']
    assert [*new_prices.dtypes.items()] == PRICE_DTYPES_ITEMS
    i = new_prices.index
    assert i.name == 'ins_code'
    assert i.dtype == string
    best_limits = mwp['best_limits']
    assert_bl_dtypes(best_limits, False)
    assert 'messages' not in mwp
    assert 'market_state' not in mwp


@file('MarketWatchPlus_h64130_r9540883525.txt')
async def test_market_watch_plus_update():
    mwp = await market_watch_plus(
        64130, 9540883525, best_limits_prepare_join=False
    )
    price_updates = mwp['price_updates']
    assert price_updates.columns.to_list() == [
        'heven',
        'pf',
        'pc',
        'pl',
        'tno',
        'tvol',
        'tval',
        'pmin',
        'pmax',
    ]
    assert all(is_numeric_dtype(c) for c in price_updates.dtypes)
    assert price_updates.index.dtype == string

    market_state = mwp.pop('market_state', None)
    if market_state is not None:
        assert_market_state(market_state)

    for m in mwp['messages']:
        assert type(m) is str
        assert m.isnumeric()

    bl = mwp['best_limits']
    assert_bl_dtypes(bl, False)

    assert type(mwp['refid']) == int

    new_prices = mwp['new_prices']
    assert [*new_prices.dtypes.items()] == PRICE_DTYPES_ITEMS
    i = new_prices.index
    assert i.name == 'ins_code'
    assert i.dtype == string


@file('status_changes.html')
async def test_status_changes():
    df = await status_changes(3)
    assert len(df) == 3
    assert (*df.dtypes.items(),) == (
        ('نماد', string),
        ('نام', string),
        ('وضعیت جدید', string),
        ('date', dtype('O')),
    )
    assert type(df.iat[0, 3]) is jdatetime


@file('empty_eps_in_mwp.txt')
async def test_mwp_with_empty_eps_best_limits_prepare_join():
    if not OFFLINE_MODE:
        return
    # used to raise error due to COW setting
    mwp = await market_watch_plus(0, 0, best_limits_prepare_join=False)
    assert_bl_dtypes(mwp['best_limits'], unstacked=False)

    mwp = await market_watch_plus(0, 0)
    assert_bl_dtypes(mwp['best_limits'], unstacked=True)


@file('mwp_23_cols.txt')
async def test_23_cols():
    if not OFFLINE_MODE:
        return
    mwp = await market_watch_plus(0, 0)
    assert len(mwp['new_prices'].columns) == 22  # ins_code has become index


def test_parse_market_state_with_18_values():
    assert _parse_market_state(
        "03/8/16 14:45:32,03/8/16 14:45:54,F,2017876.67,<div class='mn'>(7117.86)</div> -0.35%,64564137991027954.00,9693911361.00,66402811342027.00,268952,N,4799475515.00,97382008102240.00,145397,N,12015232.00,2042707692000.00,61240,"
    ) == {
        'datetime': jdatetime(1403, 8, 16, 14, 45, 54),
        'tse_status': 'F',
        'tse_index': 2017876.67,
        'tse_index_change': -7117.86,
        'tse_tvol': 9693911361.0,
        'tse_tval': 66402811342027.0,
        'tse_tno': 268952.0,
        'fb_status': 'N',
        'fb_tvol': 4799475515.0,
        'fb_tval': 97382008102240.0,
        'fb_tno': 145397,
        'derivatives_status': 'N',
        'derivatives_tvol': 12015232.0,
        'derivatives_tval': 2042707692000.0,
        'derivatives_tno': 61240,
        'tse_index_change_percent': -0.35,
        'tse_value': 6.456413799102795e16,
    }
