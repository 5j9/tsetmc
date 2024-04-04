from aiohutils.tests import OFFLINE_MODE, assert_dict_type, file
from polars import Boolean, Date, Float64, Int64, Null, String, Time
from pytest import skip

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
        ('insCode', Null),
        ('dEven', Date),
        ('hEven', Time),
        ('xDrNivJIdx004', Float64),
        ('xPhNivJIdx004', Float64),
        ('xPbNivJIdx004', Float64),
        ('xVarIdxJRfV', Float64),
        ('last', Boolean),
        ('indexChange', Float64),
        ('lVal30', Null),
        ('c1', Int64),
        ('c2', Int64),
        ('c3', Int64),
        ('c4', Int64),
    ]


@file('index_history.json')
async def test_history():
    df = await OVERALL.history()
    assert [*zip(df.columns, df.dtypes)] == [
        ('insCode', Int64),
        ('dEven', Date),
        ('xNivInuClMresIbs', Float64),
        ('xNivInuPbMresIbs', Float64),
        ('xNivInuPhMresIbs', Float64),
    ]


ICT = Index('41867092385281437')  # only has two companies currently


@file('index_companies.json')
async def test_companies():
    d = await ICT.companies()
    companies = d['indexCompany']
    companies_history = d['relatedCompanyThirtyDayHistory']
    if companies.is_empty():  # before the market start
        return
    assert [*zip(companies.columns, companies.dtypes)] == [
        ('instrumentState', Null),
        ('cValMne', Null),
        ('lVal18', Null),
        ('cSocCSAC', Null),
        ('lSoc30', Null),
        ('yMarNSC', Null),
        ('yVal', Null),
        ('insCode', String),
        ('lVal30', String),
        ('lVal18AFC', String),
        ('flow', Int64),
        ('cIsin', Null),
        ('zTitad', Float64),
        ('baseVol', Int64),
        ('instrumentID', Null),
        ('cgrValCot', Null),
        ('cComVal', Null),
        ('lastDate', Int64),
        ('sourceID', Int64),
        ('flowTitle', Null),
        ('cgrValCotTitle', Null),
        ('lastHEven', Int64),
        ('finalLastDate', Int64),
        ('nvt', Float64),
        ('mop', Int64),
        ('pRedTran', Float64),
        ('thirtyDayClosingHistory', Null),
        ('priceChange', Float64),
        ('priceMin', Float64),
        ('priceMax', Float64),
        ('priceYesterday', Float64),
        ('priceFirst', Float64),
        ('last', Boolean),
        ('id', Int64),
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


@file('no_index_companies.json')
async def test_no_companies():
    if OFFLINE_MODE():
        skip()
    d = await Index('29331053506731535').companies()
    assert d['indexCompany'].is_empty()
    assert d['relatedCompanyThirtyDayHistory'].is_empty()
