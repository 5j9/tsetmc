from aiohttp_test_utils import init_tests
from jdatetime import datetime as jdatetime

# noinspection PyProtectedMember
from tsetmc import _MarketState

init_tests()


def assert_market_state(market_state: _MarketState):
    assert type(market_state.pop('datetime')) is jdatetime
    for k in ('tse_status', 'fb_status', 'derivatives_status'):
        assert type(market_state.pop(k)) is str
    for k in ('fb_tno', 'derivatives_tno'):
        assert type(market_state.pop(k)) is int
    # tse_value is optional
    assert type(market_state.pop('tse_value', 0.0)) is float
    assert market_state.keys() == {
        'tse_index', 'tse_index_change', 'tse_tvol', 'tse_tval', 'tse_tno',
        'fb_tvol', 'fb_tval', 'derivatives_tvol', 'derivatives_tval',
        'tse_index_change_percent'}
    assert all(type(v) is float for v in market_state.values())


def assert_dict_type(d: dict, td: callable):
    assert td.__optional_keys__ == (d.keys() - td.__required_keys__)
    for k, t in td.__annotations__.items():
        v = d[k]
        if isinstance(v, dict):
            assert_dict_type(v, t)
            continue
        assert isinstance(v, t), f'{td=} {k=} {v=} {t=}'
