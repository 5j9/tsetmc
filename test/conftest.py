import tsetmc

# noinspection PyUnresolvedReferences
from test.aiohttp_test_utils import event_loop
from test.aiohttp_test_utils import session_fixture_factory


session = session_fixture_factory(tsetmc)
