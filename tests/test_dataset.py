from unittest.mock import patch

from tsetmc.dataset import add_instrument
from tsetmc.instruments import Instrument


async def test_adding_existing_insturment():
    fmelli = Instrument(35425587644337450)
    i = {
        'lVal18AFC': 'فملی',
        'lVal30': 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c',
    }
    with (
        patch.object(Instrument, 'info', return_value=i) as info,
        patch('tsetmc.dataset._dump') as dump,
        patch('tsetmc.dataset._logger.warning') as warning,
    ):
        await add_instrument(fmelli)
    info.assert_awaited_once()
    dump.assert_not_called()
    warning.assert_called_once_with("l18 = 'فملی' already exists in dataset")
