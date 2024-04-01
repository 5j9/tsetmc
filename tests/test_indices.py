from aiohutils.tests import assert_dict_type, file
from polars import Boolean, Float64, Int64

from tests import String
from tsetmc import InstrumentInfo
from tsetmc.indices import Index, last_state


@file('last_state.json')
async def test_last_state():
    df = await last_state()
    assert [*zip(df.columns, df.dtypes)] == [
        ('insCode', String),
        ('dEven', Int64),
        ('hEven', Int64),
        ('xDrNivJIdx004', Float64),
        ('xPhNivJIdx004', Float64),
        ('xPbNivJIdx004', Float64),
        ('xVarIdxJRfV', Float64),
        ('last', Boolean),
        ('indexChange', Float64),
        ('lVal30', String),
        ('c1', Int64),
        ('c2', Int64),
        ('c3', Int64),
        ('c4', Int64),
    ]


OVERALL = Index('32097828799138957')


@file('index_info.json')
async def test_info():
    info = await OVERALL.info()
    assert_dict_type(info, InstrumentInfo)


@file('index_last_day_history.json')
async def test_last_day_history():
    df = await OVERALL.last_day_history()
    assert [*zip(df.columns, df.dtypes)] == [
        ('insCode', String),
        ('xDrNivJIdx004', Float64),
        ('xPhNivJIdx004', Float64),
        ('xPbNivJIdx004', Float64),
        ('xVarIdxJRfV', Float64),
        ('last', Boolean),
        ('indexChange', Float64),
        ('lVal30', String),
        ('c1', Int64),
        ('c2', Int64),
        ('c3', Int64),
        ('c4', Int64),
    ]
    assert df.index.dtype == 'datetime64[ns]'


@file('index_history.json')
async def test_history():
    df = await OVERALL.history()
    assert [*zip(df.columns, df.dtypes)] == [
        ('insCode', Int64),
        ('xNivInuClMresIbs', Float64),
        ('xNivInuPbMresIbs', Float64),
        ('xNivInuPhMresIbs', Float64),
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
    assert [*zip(companies.columns, companies.dtypes)] == [
        ('instrumentState', String),
        ('lastHEven', Int64),
        ('finalLastDate', Int64),
        ('nvt', Float64),
        ('mop', Int64),
        ('pRedTran', Float64),
        ('thirtyDayClosingHistory', String),
        ('priceChange', Float64),
        ('priceMin', Float64),
        ('priceMax', Float64),
        ('priceYesterday', Float64),
        ('priceFirst', Float64),
        ('last', Boolean),
        ('id', Int64),
        ('insCode', String),
        ('dEven', Int64),
        ('hEven', Int64),
        ('pClosing', Float64),
        ('iClose', Boolean),
        ('yClose', Boolean),
        ('pDrCotVal', Float64),
        ('zTotTran', Float64),
        ('qTotTran5J', Float64),
        ('qTotCap', Float64),
        ('instrument.cValMne', String),
        ('instrument.lVal18', String),
        ('instrument.cSocCSAC', String),
        ('instrument.lSoc30', String),
        ('instrument.yMarNSC', String),
        ('instrument.yVal', String),
        ('instrument.insCode', String),
        ('instrument.lVal30', String),
        ('instrument.lVal18AFC', String),
        ('instrument.flow', Int64),
        ('instrument.cIsin', String),
        ('instrument.zTitad', Float64),
        ('instrument.baseVol', Int64),
        ('instrument.instrumentID', String),
        ('instrument.cgrValCot', String),
        ('instrument.cComVal', String),
        ('instrument.lastDate', Int64),
        ('instrument.sourceID', Int64),
        ('instrument.flowTitle', String),
        ('instrument.cgrValCotTitle', String),
    ]
    assert [*zip(companies_history.columns, companies_history.dtypes)] == [
        ('id', Int64),
        ('insCode', String),
        ('dEven', Int64),
        ('hEven', Int64),
        ('pClosing', Float64),
        ('iClose', Boolean),
        ('yClose', Boolean),
        ('pDrCotVal', Float64),
        ('zTotTran', Float64),
        ('qTotTran5J', Float64),
        ('qTotCap', Float64),
    ]
