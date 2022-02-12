from unittest.mock import patch


disable_get = patch(
    'tsetmc._session_get', side_effect=NotImplementedError(
        'offline tests should not call tsetmc._requests_get'))


class FakeResponse:

    def __init__(self, content: bytes):
        self.content = content


def patch_get(name):
    with open(f'{__file__}/../testdata/{name}', 'rb') as f:
        content = f.read()
    return patch('tsetmc._session_get', lambda _: FakeResponse(content))
