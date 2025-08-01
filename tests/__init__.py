from typing import Any

from aiohutils.tests import init_tests
from jdatetime import datetime as jdatetime

from tsetmc import MarketState

init_tests()
STR = 'str'


def assert_market_state(market_state: MarketState):
    assert type(market_state.pop('datetime')) is jdatetime
    k: Any
    for k in ('tse_status', 'fb_status', 'derivatives_status'):
        assert type(market_state.pop(k)) is str
    for k in ('fb_tno', 'derivatives_tno'):
        assert type(market_state.pop(k)) is int
    # tse_value is optional
    tse_value = market_state.pop('tse_value', 0.0)
    assert type(tse_value) is float, tse_value
    assert market_state.keys() == {
        'tse_index',
        'tse_index_change',
        'tse_tvol',
        'tse_tval',
        'tse_tno',
        'fb_tvol',
        'fb_tval',
        'derivatives_tvol',
        'derivatives_tval',
        'tse_index_change_percent',
    }
    assert all(type(v) is float for v in market_state.values())
