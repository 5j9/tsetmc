from datetime import datetime
from typing import cast

import polars as pl
from pytest import warns
from pytest_aiohutils import file, validate_dict

# noinspection PyProtectedMember
from tsetmc import MarketState
from tsetmc.instruments import Instrument, LiveData

FMELLI = Instrument(35425587644337450)


def assert_live_data(
    ld: LiveData, best_limits=False, market_state=False, nav=False
):
    d = cast(dict, ld)
    if best_limits:
        best_limits_lf = d.pop('best_limits')
        # Extract schema as a clean Python dictionary map
        assert dict(best_limits_lf.collect_schema()) == {
            'zd': pl.Int64,
            'qd': pl.Int64,
            'pd': pl.Int64,
            'po': pl.Int64,
            'qo': pl.Int64,
            'zo': pl.Int64,
        }

    if market_state:
        market_state = d.pop('market_state', None)
        if market_state is not None:
            validate_dict(market_state, MarketState)

    if nav:
        assert type(d.pop('nav_datetime')) in (datetime, str)
        assert type(d.pop('nav')) is int

    assert type(d.pop('timestamp')) is datetime
    for k in ('time', 'status'):
        assert type(d.pop(k)) is str
    assert [*d.keys()] == [
        'pl',
        'pc',
        'pf',
        'py',
        'pmin',
        'pmax',
        'tno',
        'tvol',
        'tval',
    ]
    assert all(type(v) is int for v in d.values())


@file('fmelli.txt')
async def test_fmelli_instant():
    with warns(DeprecationWarning):
        d = await FMELLI.live_data(best_limits=False)  # pyright: ignore[reportDeprecated]
    assert_live_data(d, best_limits=False)


@file('dara_yekom.txt')
async def test_dara1_instant():
    with warns(DeprecationWarning):
        d = await Instrument(62235397452612911).live_data(  # pyright: ignore[reportDeprecated]
            market_state=True, best_limits=True
        )
    assert_live_data(d, best_limits=True, market_state=True, nav=True)


@file('asam.txt')
async def test_asam_instant():
    with warns(DeprecationWarning):
        d = await Instrument(36592972482259020).live_data(best_limits=True)  # pyright: ignore[reportDeprecated]
    assert_live_data(d, best_limits=True, nav=True)


@file('vskhooz_short_response.txt')
async def test_vskhooz_short():
    with warns(DeprecationWarning):
        assert_live_data(await Instrument(5454781314262062).live_data())  # pyright: ignore[reportDeprecated]


@file('vskhooz_long_response.txt')
async def test_vskhooz_long():
    with warns(DeprecationWarning):
        assert_live_data(await Instrument(5454781314262062).live_data())  # pyright: ignore[reportDeprecated]


@file('vsadid.txt')
async def test_vsadid():
    with warns(DeprecationWarning):
        d = await Instrument('41713045190742691').live_data()  # pyright: ignore[reportDeprecated]
    assert_live_data(d)
