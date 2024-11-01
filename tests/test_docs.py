from aiohutils.tests import file

from tests import STR
from tsetmc.docs import (
    best_limits_all_ins,
    client_type,
    instrument,
    instrument_filter_by_date,
    instrument_state,
    trade_last_day,
)


@file('client_type.json')
async def test_client_type():
    d = await client_type()
    out = d['output']
    assert len(out) == 9
    assert [*out.dtypes.items()] == [(0, STR), (1, STR), (2, STR)]


@file('instrument_filter_by_date.json')
async def test_instrument_filter_by_date():
    d = await instrument_filter_by_date()
    assert d['output']['YVal']['068'] == 'شاخص'


@file('instrument_state.json')
async def test_instrument_state():
    d = await instrument_state()
    assert d['output']['CEtaVal']['I '] == 'ممنوع'


@file('instrument.json')
async def test_instrument():
    d = await instrument()
    assert d['output']['YVal']['69'] == ('شاخص', 'شاخص فرابورس')
    assert len(d['output']['YVal']) >= 40  # curently 50


@file('best_limits_all_ins.json')
async def test_best_limits_all_ins():
    d = await best_limits_all_ins()
    assert d['output']['QTitMeOf'] == 'حجم عرضه'


@file('trade_last_day.json')
async def test_trade_last_day():
    d = await trade_last_day()
    assert d['output']['HEven'] == 'ساعت'
