from typing import cast

from jdatetime import datetime as jdatetime
from polars import (
    Boolean,
    DataFrame,
    Datetime,
    Float64,
    Int32,
    Int64,
    LazyFrame,
    List,
    String,
    Struct,
)
from pytest import skip
from pytest_aiohutils import file, validate_dict

from tsetmc import MarketState
from tsetmc.market_watch import (
    _BEST_LIMITS_SCHEMA,
    _PRICE_DTYPES_26,
    _PRICE_UPDATE_COLUMNS,
    _parse_market_state,
    client_type_all,
    closing_price_all,
    get_client_type_all,
    get_inst_value_all_inst_all_param,
    get_market_watch,
    key_stats,
    market_watch_init,
    market_watch_plus,
    status_changes,
)

PRICE_DTYPES_ITEMS = _PRICE_DTYPES_26
BL_STACKED_COLUMNS = list(_BEST_LIMITS_SCHEMA)[2:]
BL_UNSTACKED_COLUMNS = [
    f'{n}{i}' for n in BL_STACKED_COLUMNS for i in range(1, 6)
]


def assert_bl_dtypes(lf: DataFrame, unstacked=True):
    schema = lf.collect_schema()
    assert schema['ins_code'] == String

    if unstacked:
        columns = BL_UNSTACKED_COLUMNS
    else:
        columns = list(BL_STACKED_COLUMNS)
        assert schema['number'] == Int64

    for c in columns:
        assert schema[c] in (Int64, Float64, Int32)


@file('MarketWatchInit.aspx')
async def test_market_watch_init():
    mwi = await market_watch_init(join=False, market_state=False)
    assert (
        cast(LazyFrame, mwi['prices']).collect_schema() == PRICE_DTYPES_ITEMS
    )

    bl_schema = cast(LazyFrame, mwi['best_limits']).collect_schema()
    assert bl_schema['ins_code'] == String
    assert bl_schema['number'] == Int64
    assert mwi['market_state'] is None

    mwi = await market_watch_init(market_state=True)
    prices = cast(LazyFrame, mwi['prices']).collect()
    assert 'market_state' in mwi
    assert 'best_limits' in mwi
    assert_bl_dtypes(prices)

    expected_combined_schema = {
        **_PRICE_DTYPES_26,
        **{
            c: Int64 for c in BL_UNSTACKED_COLUMNS if c not in _PRICE_DTYPES_26
        },
    }
    assert dict(prices.collect_schema()) == expected_combined_schema

    mwi = await market_watch_init(prices=False, market_state=False)
    assert mwi['prices'] is None
    bl_schema = cast(LazyFrame, mwi['best_limits']).collect_schema()
    assert bl_schema['ins_code'] == String
    assert bl_schema['number'] == Int64


@file('MarketWatchInit.aspx')
async def test_market_watch_init_no_bl():
    mwi = await market_watch_init(best_limits=False, prices=True)
    assert mwi['prices'] is not None


@file('ClosingPriceAll.aspx')
async def test_closing_price_all():
    lf = await closing_price_all()
    schema = lf.collect_schema()

    assert schema['ins_code'] == String
    assert schema['n'] == Int64

    expected_cols = [
        'ins_code',
        'n',
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
    assert list(schema.keys()) == expected_cols
    for c in expected_cols[1:]:
        assert schema[c] == Int64


@file('ClientTypeAll.aspx')
async def test_client_type_all():
    lf = await client_type_all()
    schema = lf.collect_schema()

    expected_cols = [
        'ins_code',
        'n_buy_count',
        'l_buy_count',
        'n_buy_volume',
        'l_buy_volume',
        'n_sell_count',
        'l_sell_count',
        'n_sell_volume',
        'l_sell_volume',
    ]
    assert list(schema.keys()) == expected_cols
    assert schema['ins_code'] == String

    for c in expected_cols[1:]:
        assert schema[c] == Int64


@file('InstValue.aspx')
async def test_key_stats():
    lf = await key_stats()
    schema = lf.collect_schema()

    assert schema['ins_code'] == String
    for col in schema.keys():
        if col != 'ins_code':
            assert col.startswith('is')
            assert schema[col] == Float64


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
    new_prices = cast(LazyFrame, mwp['new_prices']).collect()
    assert new_prices.schema == _PRICE_DTYPES_26

    best_limits = cast(LazyFrame, mwp['best_limits']).collect()
    assert_bl_dtypes(best_limits, False)
    assert mwp.get('messages') is None
    assert mwp.get('market_state') is None


@file('MarketWatchPlus_2025-07-09.txt')
async def test_market_watch_plus_empty_prices_error(test_config):
    if not test_config['OFFLINE_MODE']:
        raise skip('this test requires specific recorded input')
    mwp = await market_watch_plus(
        0, 0, messages=True, market_state=True, best_limits_prepare_join=False
    )
    new_prices = cast(LazyFrame, mwp['new_prices']).collect()
    assert new_prices.is_empty()
    assert new_prices.schema == _PRICE_DTYPES_26

    best_limits = cast(LazyFrame, mwp['best_limits']).collect()
    assert_bl_dtypes(best_limits, False)
    assert 'messages' in mwp


@file('MarketWatchPlus_h64130_r9540883525.txt')
async def test_market_watch_plus_update():
    mwp = await market_watch_plus(
        64130, 9540883525, best_limits_prepare_join=False
    )
    price_updates = cast(LazyFrame, mwp['price_updates']).collect()
    price_schema = price_updates.schema
    assert list(price_schema.keys()) == list(_PRICE_UPDATE_COLUMNS.keys())
    assert price_schema['ins_code'] == String

    for c in list(_PRICE_UPDATE_COLUMNS.keys())[1:]:
        assert price_schema[c] in (Int32, Int64)

    market_state = mwp['market_state']
    if market_state is not None:
        validate_dict(market_state, MarketState)

    if messages := mwp['messages']:
        for m in messages:
            assert type(m) is str
            assert m.isnumeric()

    bl = cast(LazyFrame, mwp['best_limits']).collect()
    assert_bl_dtypes(bl, False)
    assert type(mwp['refid']) == int

    new_prices = cast(LazyFrame, mwp['new_prices']).collect()
    assert new_prices.schema == _PRICE_DTYPES_26


@file('status_changes.html')
async def test_status_changes():
    lf = await status_changes(3)
    df = lf.collect()
    assert len(df) == 3
    assert list(df.schema.items()) == [
        ('symbol', String),
        ('name', String),
        ('date', String),
        ('time', String),
        ('new_status', String),
        ('datetime', Datetime('us')),
    ]


@file('mwp_23_cols.txt')
async def test_23_cols(test_config):
    if not test_config['OFFLINE_MODE']:
        raise skip('this test requires specific recorded input')
    mwp = await market_watch_plus(0, 0)
    assert len(cast(LazyFrame, mwp['new_prices']).collect_schema()) == 23


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


@file('get_market_watch_0.json')
async def test_get_market_watch():
    lf = await get_market_watch()

    assert list(lf.collect_schema().items()) == [
        ('lva', String),
        ('lvc', String),
        ('eps', Float64),
        ('pe', Float64),
        ('pmd', Float64),
        ('pmo', Float64),
        ('qtj', Float64),
        ('pdv', Float64),
        ('ztt', Float64),
        ('qtc', Float64),
        ('bv', Float64),
        ('pc', Float64),
        ('pcpc', Float64),
        ('pmn', Float64),
        ('pmx', Float64),
        ('py', Float64),
        ('pf', Float64),
        ('pcl', Float64),
        ('vc', Int64),
        ('csv', String),
        ('insID', String),
        ('pMax', Float64),
        ('pMin', Int64),
        ('ztd', Float64),
        (
            'blDs',
            List(
                Struct(
                    {
                        'n': Int64,
                        'qmd': Int64,
                        'zmd': Int64,
                        'pmd': Float64,
                        'pmo': Float64,
                        'zmo': Int64,
                        'qmo': Int64,
                        'rid': Int64,
                    }
                )
            ),
        ),
        ('id', Int64),
        ('insCode', String),
        ('dEven', Int64),
        ('hEven', Int64),
        ('pClosing', Float64),
        ('iClose', Boolean),
        ('yClose', Boolean),
        ('pDrCotVal', Float64),
        ('zTotTran', Float64),
        ('qTotTran5J', Float64),
        ('qTotCap', Float64),
    ]


@file('get_client_type_all.json')
async def test_get_client_type_all():
    lf = await get_client_type_all()

    assert [*lf.collect_schema().items()] == [
        ('insCode', String),
        ('buy_I_Volume', Float64),
        ('buy_N_Volume', Float64),
        ('buy_DDD_Volume', Float64),
        ('buy_CountI', Int64),
        ('buy_CountN', Int64),
        ('buy_CountDDD', Int64),
        ('sell_I_Volume', Float64),
        ('sell_N_Volume', Float64),
        ('sell_CountI', Int64),
        ('sell_CountN', Int64),
    ]


@file('get_inst_value_all_inst_all_param.json')
async def test_get_inst_value_all_inst_all_param():
    lf = await get_inst_value_all_inst_all_param()
    schema = lf.collect_schema()
    # Or match the exact sequential list of structural items:
    assert [*schema.items()] == [
        ('insCode', String),
        ('dataType', Int64),
        ('dEven', Int64),
        ('dataValue', String),
    ]
