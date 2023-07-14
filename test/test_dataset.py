from unittest.mock import patch

from tsetmc.dataset import add_instrument
from tsetmc.instruments import Instrument


async def test_adding_existing_insturment(caplog):
    fmelli = Instrument(35425587644337450)
    i = {
        'lVal18AFC': 'فملی',
        'lVal30': 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c',
    }
    with (
        patch.object(Instrument, 'info', return_value=i) as info,
        patch('tsetmc.dataset._dump') as dump,
    ):
        await add_instrument(fmelli)
    info.assert_awaited_once()
    dump.assert_not_called()
    assert len(records := caplog.records) == 1
    r = records[0]
    assert r.message == "l18 = 'فملی' already exists in dataset"
    assert r.levelname == 'WARNING'
