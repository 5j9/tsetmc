from unittest.mock import patch

from jdatetime import datetime as jdatetime

import tsetmc
# noinspection PyProtectedMember
from tsetmc import _MarketState


RECORD_MODE = False
OFFLINE_MODE = True and not RECORD_MODE


def patch_session(filename):

    async def _fake_session_get(url: str) -> str | bytes:
        file = f'{__file__}/../testdata/{filename}'

        if OFFLINE_MODE:
            with open(file, 'rb') as f:
                content = f.read()
        else:
            async with tsetmc.Session() as s:
                content = await (await s.get(url)).read()
            if RECORD_MODE:
                with open(file, 'wb') as f:
                    f.write(content)

        return content

    return patch('tsetmc._session_get', _fake_session_get)


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
