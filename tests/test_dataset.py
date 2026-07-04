from unittest.mock import patch

import polars as pl
from pytest_aiohutils import file

from tsetmc.dataset import add_instrument, lazy_ds
from tsetmc.instruments import Instrument


@file('search_fmelli.json')
async def test_adding_existing_insturment():
    fmelli = Instrument(35425587644337450)
    with (
        patch('tsetmc.dataset._dump') as dump,
        patch('tsetmc.dataset._logger.warning') as warning,
    ):
        await add_instrument(fmelli)
    dump.assert_not_called()
    warning.assert_called_once_with("l18 = 'فملی' already exists in dataset")


async def test_adding_non_existing_instrument():
    code = '123456'
    inst = Instrument(code)
    info_return = {
        'lVal18AFC': '_l18',
        'lVal30': '_l30',
    }
    inst._cisin = '_cisin'
    inst._isin = '_isin'
    with (
        patch.object(Instrument, 'info', return_value=info_return) as info,
        patch('tsetmc.dataset._dump') as dump,
        patch('tsetmc.dataset._logger.warning') as warning,
    ):
        await add_instrument(inst)
    info.assert_awaited_once()
    warning.assert_not_called()
    dumped_df: pl.DataFrame = dump.call_args.args[0]
    assert dumped_df.filter(pl.col('ins_code') == code).row() == (
        '123456',
        '_isin',
        '_cisin',
        '_l18',
        '_l30',
    )


def test_lazy_dataset():
    assert (
        lazy_ds.lf.filter(pl.col('ins_code') == '35425587644337450')
        .select('l18')
        .collect()
        .item()
        == 'فملی'
    )
    assert lazy_ds.as_dict('l18')['فملی'].code == '35425587644337450'
    with patch.object(lazy_ds, 'df'):
        assert lazy_ds.as_dict('l18')['فملی'].code == '35425587644337450'
