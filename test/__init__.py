from unittest.mock import patch

from jdatetime import datetime as jdatetime

import tsetmc
# noinspection PyProtectedMember
from tsetmc import _MarketState


RECORD_MODE = False
OFFLINE_MODE = False and not RECORD_MODE


class FakeClientSession:

    def __init__(self, filename: str):
        self.filename = f'{__file__}/../testdata/{filename}'

    async def get(self, *args, **kwargs):
        if OFFLINE_MODE:
            with open(self.filename, 'rb') as f:
                content = f.read()
            return FakeResponse(content)

        if RECORD_MODE:
            async with tsetmc.Session():
                resp = await tsetmc.SESSION.get(*args, **kwargs)
                content = await resp.read()
                with open(self.filename, 'wb') as f:
                    f.write(content)
                return resp

        async with tsetmc.Session():
            return await tsetmc.SESSION.get(*args, **kwargs)


class FakeResponse:

    def __init__(self, content: bytes):
        self.content = content

    async def read(self):
        return self.content


def patch_session(filename):
    return patch('tsetmc.SESSION', FakeClientSession(filename))


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
