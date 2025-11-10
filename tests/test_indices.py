from numpy import dtype
from pytest_aiohutils import file, validate_dict

from tests import STR
from tsetmc import InstrumentInfo
from tsetmc.indices import Index, last_state


@file('last_state.json')
async def test_last_state():
    df = await last_state()
    assert [*df.dtypes.items()] == [
        ('insCode', STR),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('xDrNivJIdx004', dtype('float64')),
        ('xPhNivJIdx004', dtype('float64')),
        ('xPbNivJIdx004', dtype('float64')),
        ('xVarIdxJRfV', dtype('float64')),
        ('last', dtype('bool')),
        ('indexChange', dtype('float64')),
        ('lVal30', STR),
        ('c1', dtype('int64')),
        ('c2', dtype('int64')),
        ('c3', dtype('int64')),
        ('c4', dtype('int64')),
    ]


OVERALL = Index('32097828799138957')


@file('index_info.json')
async def test_info():
    info = await OVERALL.info()
    validate_dict(info, InstrumentInfo)


@file('index_last_day_history.json')
async def test_last_day_history():
    df = await OVERALL.last_day_history()
    assert [*df.dtypes.items()] == [
        ('insCode', dtype('O')),
        ('xDrNivJIdx004', dtype('float64')),
        ('xPhNivJIdx004', dtype('float64')),
        ('xPbNivJIdx004', dtype('float64')),
        ('xVarIdxJRfV', dtype('float64')),
        ('last', dtype('bool')),
        ('indexChange', dtype('float64')),
        ('lVal30', dtype('O')),
        ('c1', dtype('int64')),
        ('c2', dtype('int64')),
        ('c3', dtype('int64')),
        ('c4', dtype('int64')),
    ]
    assert df.index.dtype == 'datetime64[ns]'


@file('index_history.json')
async def test_history():
    df = await OVERALL.history()
    assert [*df.dtypes.items()] == [
        ('insCode', dtype('int64')),
        ('xNivInuClMresIbs', dtype('float64')),
        ('xNivInuPbMresIbs', dtype('float64')),
        ('xNivInuPhMresIbs', dtype('float64')),
    ]
    assert df.index.dtype == 'datetime64[ns]'


ICT = Index('41867092385281437')  # only has two companies currently


@file('index_companies.json')
async def test_companies():
    d = await ICT.companies()
    companies = d['indexCompany']
    companies_history = d['relatedCompanyThirtyDayHistory']
    if companies.empty:  # before the market start
        return
    assert [*companies.dtypes.items()] == [
        ('instrumentState', dtype('O')),
        ('lastHEven', dtype('int64')),
        ('finalLastDate', dtype('int64')),
        ('nvt', dtype('float64')),
        ('mop', dtype('int64')),
        ('pRedTran', dtype('float64')),
        ('thirtyDayClosingHistory', dtype('O')),
        ('priceChange', dtype('float64')),
        ('priceMin', dtype('float64')),
        ('priceMax', dtype('float64')),
        ('priceYesterday', dtype('float64')),
        ('priceFirst', dtype('float64')),
        ('last', dtype('bool')),
        ('id', dtype('int64')),
        ('insCode', STR),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('pClosing', dtype('float64')),
        ('iClose', dtype('bool')),
        ('yClose', dtype('bool')),
        ('pDrCotVal', dtype('float64')),
        ('zTotTran', dtype('float64')),
        ('qTotTran5J', dtype('float64')),
        ('qTotCap', dtype('float64')),
        ('instrument.cValMne', dtype('O')),
        ('instrument.lVal18', dtype('O')),
        ('instrument.cSocCSAC', dtype('O')),
        ('instrument.lSoc30', dtype('O')),
        ('instrument.yMarNSC', dtype('O')),
        ('instrument.yVal', dtype('O')),
        ('instrument.insCode', STR),
        ('instrument.lVal30', STR),
        ('instrument.lVal18AFC', STR),
        ('instrument.flow', dtype('int64')),
        ('instrument.cIsin', dtype('O')),
        ('instrument.zTitad', dtype('float64')),
        ('instrument.baseVol', dtype('int64')),
        ('instrument.instrumentID', dtype('O')),
        ('instrument.cgrValCot', dtype('O')),
        ('instrument.cComVal', dtype('O')),
        ('instrument.lastDate', dtype('int64')),
        ('instrument.sourceID', dtype('int64')),
        ('instrument.flowTitle', dtype('O')),
        ('instrument.cgrValCotTitle', dtype('O')),
    ]
    assert [*companies_history.dtypes.items()] == [
        ('id', dtype('int64')),
        ('insCode', STR),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('pClosing', dtype('float64')),
        ('iClose', dtype('bool')),
        ('yClose', dtype('bool')),
        ('pDrCotVal', dtype('float64')),
        ('zTotTran', dtype('float64')),
        ('qTotTran5J', dtype('float64')),
        ('qTotCap', dtype('float64')),
    ]
