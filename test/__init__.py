from unittest.mock import patch

from jdatetime import datetime as jdatetime

import tsetmc
# noinspection PyProtectedMember
from tsetmc import _MarketState


RECORD_MODE = False
OFFLINE_MODE = True and not RECORD_MODE


def identity_fn(f):
    return f


class NoOPPatch:

    def start(self):
        return

    def stop(self):
        return


if OFFLINE_MODE is True:
    disable_get = patch(
        'tsetmc._client_get',
        side_effect=NotImplementedError(
            '_client_get should not be called in OFFLINE_MODE'))
else:
    disable_get = NoOPPatch()


class FakeResponse:

    def __init__(self, content: bytes):
        self.content = content


# noinspection PyProtectedMember
_original_client_get = tsetmc._client_get


def patch_get(filename):
    if RECORD_MODE is True:
        def _get_recorder(*args, **kwargs):
            resp = _original_client_get(*args, **kwargs)
            content = resp.content
            with open(f'{__file__}/../testdata/{filename}', 'wb') as f:
                f.write(content)
            return resp
        return patch('tsetmc._client_get', _get_recorder)

    if OFFLINE_MODE is False:
        return identity_fn

    with open(f'{__file__}/../testdata/{filename}', 'rb') as f:
        content = f.read()

    def fake_get(*_, **__):
        return FakeResponse(content)

    return patch('tsetmc._client_get', fake_get)


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
