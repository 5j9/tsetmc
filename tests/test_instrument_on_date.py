from aiohutils.tests import assert_dict_type, file
from numpy import dtype
from pytest import warns

from tsetmc.instruments import ClientTypeOnDate, ClosingPrice, Instrument

FARAZ_ON_DATE = Instrument(13666407494621646).on_date(20220222)

string = _String


@file('faraz_GetClosingPriceHistory_20220222.json')
async def test_intraday_closing_price():
    df = await FARAZ_ON_DATE.closing_price_history()
    assert [*zip(df.columns, df.dtypes)] == [
        ('id', dtype('int64')),
        ('insCode', dtype('O')),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('pClosing', dtype(_Float64)),
        ('iClose', dtype('bool')),
        ('yClose', dtype('bool')),
        ('pDrCotVal', dtype(_Float64)),
        ('zTotTran', dtype(_Float64)),
        ('qTotTran5J', dtype(_Float64)),
        ('qTotCap', dtype(_Float64)),
    ]


@file('faraz_GetStaticThreshold_20220222.json')
async def test_static_thresholds():
    df = await FARAZ_ON_DATE.static_thresholds()
    assert [*zip(df.columns, df.dtypes)] == [
        ('insCode', string),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('psGelStaMax', dtype(_Float64)),
        ('psGelStaMin', dtype(_Float64)),
    ]


@file('faraz_BestLimits_20220222.json')
async def test_intraday_best_limits():
    df = await FARAZ_ON_DATE.best_limits()
    assert [*zip(df.columns, df.dtypes)] == [
        ('idn', dtype('int64')),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('refID', dtype('int64')),
        ('number', dtype('int64')),
        ('qTitMeDem', dtype('int64')),
        ('zOrdMeDem', dtype('int64')),
        ('pMeDem', dtype(_Float64)),
        ('pMeOf', dtype(_Float64)),
        ('zOrdMeOf', dtype('int64')),
        ('qTitMeOf', dtype('int64')),
        ('insCode', dtype('O')),
    ]


@file('faraz_GetTradeHistory_20220222.json')
async def test_intraday_trades():
    df = await FARAZ_ON_DATE.trades()
    assert [*zip(df.columns, df.dtypes)] == [
        ('insCode', dtype('O')),
        ('dEven', dtype('int64')),
        ('nTran', dtype('int64')),
        ('hEven', dtype('int64')),
        ('qTitTran', dtype('int64')),
        ('pTran', dtype(_Float64)),
        ('qTitNgJ', dtype('int64')),
        ('iSensVarP', string),
        ('pPhSeaCotJ', dtype(_Float64)),
        ('pPbSeaCotJ', dtype(_Float64)),
        ('iAnuTran', dtype('int64')),
        ('xqVarPJDrPRf', dtype(_Float64)),
        ('canceled', dtype('int64')),
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
        ('idn', dtype('int64')),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('insCode', string),
        ('lVal18AFC', dtype('O')),
        ('lVal30', dtype('O')),
        ('cEtaval', string),
        ('realHeven', dtype('int64')),
        ('underSupervision', dtype('int64')),
        ('cEtavalTitle', dtype('O')),
    ]


@file('faraz_Shareholder_20220222.json')
async def test_intraday_holders():
    df = await FARAZ_ON_DATE.holders()
    assert [*zip(df.columns, df.dtypes)] == [
        ('shareHolderID', dtype('int64')),
        ('shareHolderName', string),
        ('cIsin', string),
        ('dEven', dtype('int64')),
        ('numberOfShares', dtype(_Float64)),
        ('perOfShares', dtype(_Float64)),
        ('change', dtype('int64')),
        ('changeAmount', dtype(_Float64)),
        ('shareHolderShareID', dtype('int64')),
    ]


@file('ondate_client_type.json')
async def test_client_type():
    d = await FARAZ_ON_DATE.client_type()
    assert_dict_type(d, ClientTypeOnDate)
    with warns():
        d2 = await FARAZ_ON_DATE.client_types()
    assert d2 == d
