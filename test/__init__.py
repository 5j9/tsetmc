from unittest.mock import patch

from jdatetime import datetime as jdatetime

import tsetmc


RECORD_MODE = False
OFFLINE_MODE = True and not RECORD_MODE


def add_session_context(test_fn):
    async def wrapper():
        async with tsetmc.Session():
            return await test_fn()
    return wrapper


class FakeClientSession:

    def __init__(self, content: bytes):
        self.content = content

    async def get(self, _):
        return FakeResponse(self.content)


class FakeResponse:

    def __init__(self, content: bytes):
        self.content = content

    async def read(self):
        return self.content


def patch_session(filename):
    if RECORD_MODE is True:
        async def _get_recorder(*args, **kwargs):
            resp = await tsetmc.SESSION.get(*args, **kwargs)
            data = await resp.read()
            with open(f'{__file__}/../testdata/{filename}', 'wb') as f:
                f.write(data)
            return resp
        return patch('tsetmc._get', _get_recorder)

    if OFFLINE_MODE is False:
        return add_session_context

    with open(f'{__file__}/../testdata/{filename}', 'rb') as f:
        content = f.read()

    return patch('tsetmc.SESSION', FakeClientSession(content))


def assert_market_state(market_state: dict):
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
