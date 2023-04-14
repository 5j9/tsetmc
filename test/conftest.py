from aiohttp_test_utils import event_loop, session_fixture_factory

import tsetmc

assert event_loop  # to prevent PyUnresolvedReferences; acts as a fixture
session = session_fixture_factory(tsetmc)
