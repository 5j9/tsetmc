from datetime import datetime
from typing import Any

from tsetmc import MarketState

STR = 'str'


def assert_market_state(market_state: MarketState):
    assert type(market_state.pop('datetime')) is datetime
    k: Any
    for k in ('tse_status', 'fb_status', 'derivatives_status'):
        assert type(market_state.pop(k)) is str
    for k in ('fb_tno', 'derivatives_tno'):
        assert type(market_state.pop(k)) is int
    for key in ('tse_value', 'tse_index_change', 'tse_index_change_percent'):
        assert market_state.pop(key) in (float, None)
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
