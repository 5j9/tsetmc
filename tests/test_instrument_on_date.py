from aiohutils.tests import assert_dict_type, file
from polars import Boolean, Float64, Int64, Null, String
from pytest import warns

from tsetmc.instruments import ClientTypeOnDate, ClosingPrice, Instrument

FARAZ_ON_DATE = Instrument(13666407494621646).on_date(20220222)


@file('faraz_GetClosingPriceHistory_20220222.json')
async def test_intraday_closing_price():
    df = await FARAZ_ON_DATE.closing_price_history()
    assert [*zip(df.columns, df.dtypes)] == [
        ('id', Int64),
        ('insCode', Null),
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


@file('faraz_GetStaticThreshold_20220222.json')
async def test_static_thresholds():
    df = await FARAZ_ON_DATE.static_thresholds()
    assert [*zip(df.columns, df.dtypes)] == [
        ('insCode', String),
        ('dEven', Int64),
        ('hEven', Int64),
        ('psGelStaMax', Float64),
        ('psGelStaMin', Float64),
    ]


@file('faraz_BestLimits_20220222.json')
async def test_intraday_best_limits():
    df = await FARAZ_ON_DATE.best_limits()
    assert [*zip(df.columns, df.dtypes)] == [
        ('idn', Int64),
        ('dEven', Int64),
        ('hEven', Int64),
        ('refID', Int64),
        ('number', Int64),
        ('qTitMeDem', Int64),
        ('zOrdMeDem', Int64),
        ('pMeDem', Float64),
        ('pMeOf', Float64),
        ('zOrdMeOf', Int64),
        ('qTitMeOf', Int64),
        ('insCode', Null),
    ]


@file('faraz_GetTradeHistory_20220222.json')
async def test_intraday_trades():
    df = await FARAZ_ON_DATE.trades()
    assert [*zip(df.columns, df.dtypes)] == [
        ('insCode', Null),
        ('dEven', Int64),
        ('nTran', Int64),
        ('hEven', Int64),
        ('qTitTran', Int64),
        ('pTran', Float64),
        ('qTitNgJ', Int64),
        ('iSensVarP', String),
        ('pPhSeaCotJ', Float64),
        ('pPbSeaCotJ', Float64),
        ('iAnuTran', Int64),
        ('xqVarPJDrPRf', Float64),
        ('canceled', Int64),
    ]


@file('faraz_GetInstrumentHistory_20220222.json')
async def test_historic_data():
    d = await FARAZ_ON_DATE.data()
    assert d.keys() == {
        'insCode',
        'lVal30',
        'lVal18AFC',
        'flow',
        'cIsin',
        'zTitad',
        'baseVol',
        'instrumentID',
        'cgrValCot',
        'cComVal',
        'lastDate',
        'sourceID',
        'flowTitle',
        'cgrValCotTitle',
    }


@file('faraz_GetClosingPriceDaily_20220222.json')
async def test_daily_closing_price():
    d = await FARAZ_ON_DATE.closing_price()
    assert_dict_type(d, ClosingPrice)


@file('faraz_GetInstrumentState_20220222.json')
async def test_intraday_states():
    df = await FARAZ_ON_DATE.states()
    assert [*zip(df.columns, df.dtypes)] == [
        ('idn', Int64),
        ('dEven', Int64),
        ('hEven', Int64),
        ('insCode', String),
        ('lVal18AFC', Null),
        ('lVal30', Null),
        ('cEtaval', String),
        ('realHeven', Int64),
        ('underSupervision', Int64),
        ('cEtavalTitle', Null),
    ]


@file('faraz_Shareholder_20220222.json')
async def test_intraday_holders():
    df = await FARAZ_ON_DATE.holders()
    assert [*zip(df.columns, df.dtypes)] == [
        ('shareHolderID', Int64),
        ('shareHolderName', String),
        ('cIsin', String),
        ('dEven', Int64),
        ('numberOfShares', Float64),
        ('perOfShares', Float64),
        ('change', Int64),
        ('changeAmount', Float64),
        ('shareHolderShareID', Int64),
    ]


@file('ondate_client_type.json')
async def test_client_type():
    d = await FARAZ_ON_DATE.client_type()
    assert_dict_type(d, ClientTypeOnDate)
    with warns():
        d2 = await FARAZ_ON_DATE.client_types()
    assert d2 == d
