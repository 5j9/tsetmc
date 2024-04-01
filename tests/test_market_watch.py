from aiohutils.tests import OFFLINE_MODE, file
from jdatetime import datetime as jdatetime
from numpy import dtype
from polars import Datetime, Float64, Int64, Null, String

from tests import assert_market_state

# noinspection PyProtectedMember
from tsetmc.market_watch import (
    _BEST_LIMITS_DTYPES,
    _CLIENT_TYPE_SCHEMA,
    _CLOSING_PRICE_SCHEMA,
    _PRICE_DTYPES_25,
    _PRICE_UPDATE_SCHEMA,
    _parse_market_state,
    client_type_all,
    closing_price_all,
    key_stats,
    market_watch_init,
    market_watch_plus,
    ombud_messages,
    status_changes,
)

BL_UNSTACKED_DTYPES = {
    f'{c}{i}': Float64 if c[0] == 'p' else Int64
    for c, t in _BEST_LIMITS_DTYPES.items()
    for i in range(1, 6)
    if c not in ('row', 'ins_code')
}
BL_UNSTACKED_DTYPES['ins_code'] = String


@file('MarketWatchInit.aspx')
async def test_market_watch_init():
    mwi = await market_watch_init(join=False, market_state=False)
    assert (
        dict(zip(mwi['prices'].columns, mwi['prices'].dtypes))
        == _PRICE_DTYPES_25
    )
    assert 'market_state' not in mwi

    mwi = await market_watch_init(market_state=True)
    prices = mwi['prices']
    assert 'market_state' in mwi
    assert 'best_limits' in mwi
    assert (
        dict(zip(prices.columns, prices.dtypes))
        == _PRICE_DTYPES_25 | BL_UNSTACKED_DTYPES
    )

    mwi = await market_watch_init(prices=False, market_state=False)
    assert 'prices' not in mwi


@file('ClosingPriceAll.aspx')
async def test_closing_price_all():
    df = await closing_price_all()
    assert dict(zip(df.columns, df.dtypes)) == _CLOSING_PRICE_SCHEMA


@file('ClientTypeAll.aspx')
async def test_client_type_all():
    df = await client_type_all()
    if df.is_empty():
        return
    assert dict(zip(df.columns, df.dtypes)) == _CLIENT_TYPE_SCHEMA


@file('InstValue.aspx')
async def test_key_stats():
    df = await key_stats()
    assert df.columns[0] == 'ins_code'
    assert df.dtypes[0] == String
    assert all(c.isnumeric() for c in df.columns[1:])
    assert all(t == Int64 for t in df.dtypes[1:])


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
        'tse_tno': 34288551133025.0,
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
        'tse_tno': 75828635544957.0,
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
    assert dict(zip(new_prices.columns, new_prices.dtypes)) == _PRICE_DTYPES_25
    bl = mwp['best_limits']
    assert dict(zip(bl.columns, bl.dtypes)) == _BEST_LIMITS_DTYPES
    assert 'messages' not in mwp
    assert 'market_state' not in mwp


@file('MarketWatchPlus_h64130_r9540883525.txt')
async def test_market_watch_plus_update():
    mwp = await market_watch_plus(
        64130, 9540883525, best_limits_prepare_join=False
    )
    price_updates = mwp['price_updates']
    assert (
        dict(zip(price_updates.columns, price_updates.dtypes))
        == _PRICE_UPDATE_SCHEMA
    )

    market_state = mwp.pop('market_state', None)
    if market_state is not None:
        assert_market_state(market_state)

    for m in mwp['messages']:
        assert type(m) is str
        assert m.isnumeric()

    bl = mwp['best_limits']
    assert dict(zip(bl.columns, bl.dtypes)) == _BEST_LIMITS_DTYPES

    assert type(mwp['refid']) == int

    new_prices = mwp['new_prices']
    assert dict(zip(new_prices.columns, new_prices.dtypes)) == _PRICE_DTYPES_25


@file('status_changes.html')
async def test_status_changes():
    df = await status_changes(3)
    assert len(df) == 3
    assert (*df.dtypes.items(),) == (
        ('نماد', String),
        ('نام', String),
        ('وضعیت جدید', String),
        ('date', dtype('O')),
    )
    assert type(df.iat[0, 3]) is jdatetime


@file('ombud_messages.html')
async def test_ombud_messages():
    df = await ombud_messages(top=3)
    assert len(df) == 3
    assert [*zip(df.columns, df.dtypes)] == [
        ('header', String),
        ('date', Datetime(time_unit='us', time_zone=None)),
        ('description', String),
    ]


@file('empty_ombud_messages.html')
async def test_ombud_messages_empty():
    # `sh_date` cannot be used without `containing`
    df = await ombud_messages(top=1, sh_date='1400-11-02', flow=0)
    assert df.is_empty()
    assert [*zip(df.columns, df.dtypes)] == [
        ('header', Null),
        ('date', Null),
        ('description', Null),
    ]


@file('empty_eps_in_mwp.txt')
async def test_mwp_with_empty_eps_best_limits_prepare_join():
    if not OFFLINE_MODE:
        return
    # used to raise error due to COW setting
    mwp = await market_watch_plus(0, 0, best_limits_prepare_join=False)
    bl = mwp['best_limits']
    assert dict(zip(bl.columns, bl.dtypes)) == _BEST_LIMITS_DTYPES

    # best_limits_prepare_join=True
    mwp = await market_watch_plus(0, 0)
    bl = mwp['best_limits']
    assert dict(zip(bl.columns, bl.dtypes)) == BL_UNSTACKED_DTYPES


@file('mwp_23_cols.txt')
async def test_23_cols():
    if not OFFLINE_MODE:
        return
    mwp = await market_watch_plus(0, 0)
    assert len(mwp['new_prices'].columns) == 23
