import polars as pl
from pytest_aiohutils import file, validate_dict

from tsetmc import InstrumentInfo
from tsetmc.indices import Index, last_state


@file('last_state.json')
async def test_last_state():
    lf = await last_state()
    df = lf.collect()

    expected_schema = {
        'insCode': pl.Utf8,
        'dEven': pl.Int64,
        'hEven': pl.Int64,
        'xDrNivJIdx004': pl.Float64,
        'xPhNivJIdx004': pl.Float64,
        'xPbNivJIdx004': pl.Float64,
        'xVarIdxJRfV': pl.Float64,
        'last': pl.Boolean,
        'indexChange': pl.Float64,
        'lVal30': pl.Utf8,
        'c1': pl.Int64,
        'c2': pl.Int64,
        'c3': pl.Int64,
        'c4': pl.Int64,
    }
    assert dict(df.schema) == expected_schema


OVERALL = Index('32097828799138957')


@file('index_info.json')
async def test_info():
    info = await OVERALL.info()
    validate_dict(info, InstrumentInfo)


@file('index_last_day_history.json')
async def test_last_day_history():
    lf = await OVERALL.last_day_history()
    df = lf.collect()

    expected_schema = {
        'insCode': pl.Null,
        'xDrNivJIdx004': pl.Float64,
        'xPhNivJIdx004': pl.Float64,
        'xPbNivJIdx004': pl.Float64,
        'xVarIdxJRfV': pl.Float64,
        'last': pl.Boolean,
        'indexChange': pl.Float64,
        'lVal30': pl.Null,
        'c1': pl.Int64,
        'c2': pl.Int64,
        'c3': pl.Int64,
        'c4': pl.Int64,
        'datetime': pl.Datetime,  # The datetime column we created
    }
    assert dict(df.schema) == expected_schema

    # Check that datetime column is datetime type
    assert df['datetime'].dtype == pl.Datetime
    # Check that it's sorted
    dates = df['datetime'].to_list()
    assert dates == sorted(dates)


@file('index_history.json')
async def test_history():
    lf = await OVERALL.history()
    df = lf.collect()

    expected_schema = {
        'insCode': pl.Int64,
        'xNivInuClMresIbs': pl.Float64,
        'xNivInuPbMresIbs': pl.Float64,
        'xNivInuPhMresIbs': pl.Float64,
        'date': pl.Datetime,  # The date column we created
    }
    assert dict(df.schema) == expected_schema

    # Check that date column is datetime type
    assert df['date'].dtype == pl.Datetime
    # Check that it's sorted
    dates = df['date'].to_list()
    assert dates == sorted(dates)


ICT = Index('41867092385281437')  # only has two companies currently


@file('index_companies.json')
async def test_companies():
    d = await ICT.companies()
    companies = d['indexCompany'].collect()
    companies_history = d['relatedCompanyThirtyDayHistory'].collect()

    if companies.height == 0:  # before the market start
        return

    # Check indexCompany schema (after flattening)
    expected_company_schema = {
        'instrumentState': pl.Null,
        'lastHEven': pl.Int64,
        'finalLastDate': pl.Int64,
        'nvt': pl.Float64,
        'mop': pl.Int64,
        'pRedTran': pl.Float64,
        'thirtyDayClosingHistory': pl.Null,
        'priceChange': pl.Float64,
        'priceMin': pl.Float64,
        'priceMax': pl.Float64,
        'priceYesterday': pl.Float64,
        'priceFirst': pl.Float64,
        'last': pl.Boolean,
        'id': pl.Int64,
        'insCode': pl.Utf8,
        'dEven': pl.Int64,
        'hEven': pl.Int64,
        'pClosing': pl.Float64,
        'iClose': pl.Boolean,
        'yClose': pl.Boolean,
        'pDrCotVal': pl.Float64,
        'zTotTran': pl.Float64,
        'qTotTran5J': pl.Float64,
        'qTotCap': pl.Float64,
        # Flattened instrument fields (no 'instrument.' prefix)
        'cValMne': pl.Null,
        'lVal18': pl.Null,
        'cSocCSAC': pl.Null,
        'lSoc30': pl.Null,
        'yMarNSC': pl.Null,
        'yVal': pl.Null,
        'lVal30': pl.Utf8,
        'lVal18AFC': pl.Utf8,
        'flow': pl.Int64,
        'cIsin': pl.Null,
        'zTitad': pl.Float64,
        'baseVol': pl.Int64,
        'instrumentID': pl.Null,
        'cgrValCot': pl.Null,
        'cComVal': pl.Null,
        'lastDate': pl.Int64,
        'sourceID': pl.Int64,
        'flowTitle': pl.Null,
        'cgrValCotTitle': pl.Null,
    }
    assert dict(companies.schema) == expected_company_schema

    # Check companies_history schema
    expected_history_schema = {
        'id': pl.Int64,
        'insCode': pl.Utf8,
        'dEven': pl.Int64,
        'hEven': pl.Int64,
        'pClosing': pl.Float64,
        'iClose': pl.Boolean,
        'yClose': pl.Boolean,
        'pDrCotVal': pl.Float64,
        'zTotTran': pl.Float64,
        'qTotTran5J': pl.Float64,
        'qTotCap': pl.Float64,
    }
    assert dict(companies_history.schema) == expected_history_schema
