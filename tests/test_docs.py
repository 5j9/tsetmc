from aiohttp_test_utils import file
from numpy import dtype

from tsetmc.docs import (
    best_limits_all_ins,
    client_type,
    instrument,
    instrument_filter_by_date,
    instrument_state,
    trade_last_day,
)


@file('client_type.html')
async def test_client_type():
    d = await client_type()
    out = d['output']
    assert len(out) == 9
    assert [*out.dtypes.items()] == [
        ('InsCode', dtype('O')),
        ('کد داخلی نماد', dtype('O')),
        ('Instrument Unique Key', dtype('O'))]


@file('instrument_filter_by_date.html')
async def test_instrument_filter_by_date():
    d = await instrument_filter_by_date()
    assert d['output']['YVal']['068'] == 'شاخص'


@file('instrument_state.html')
async def test_instrument_state():
    d = await instrument_state()
    assert d['output']['CEtaVal']['I '] == 'ممنوع'


@file('instrument.html')
async def test_instrument():
    d = await instrument()
    assert d['output']['YVal'][69] == ('شاخص', 'شاخص فرابورس')


@file('best_limits_all_ins.html')
async def test_best_limits_all_ins():
    d = await best_limits_all_ins()
    assert d['output']['QTitMeOf'] == 'حجم عرضه'


@file('trade_last_day.html')
async def test_trade_last_day():
    d = await trade_last_day()
    assert d['output']['HEven'] == 'ساعت'
