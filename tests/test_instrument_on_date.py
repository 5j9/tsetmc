import polars as pl
from pytest import warns
from pytest_aiohutils import file, validate_dict

from tsetmc.instruments import ClientTypeOnDate, ClosingPrice, Instrument

FARAZ_ON_DATE = Instrument(13666407494621646).on_date(20220222)


@file('faraz_GetClosingPriceHistory_20220222.json')
async def test_intraday_closing_price():
    lf = await FARAZ_ON_DATE.closing_price_history()
    df = lf.collect()
    assert list(df.schema.items()) == [
        ('id', pl.Int64),
        ('insCode', pl.Null),
        ('dEven', pl.Int64),
        ('hEven', pl.Int64),
        ('pClosing', pl.Float64),
        ('iClose', pl.Boolean),
        ('yClose', pl.Boolean),
        ('pDrCotVal', pl.Float64),
        ('zTotTran', pl.Float64),
        ('qTotTran5J', pl.Float64),
        ('qTotCap', pl.Float64),
    ]


@file('faraz_GetStaticThreshold_20220222.json')
async def test_static_thresholds():
    lf = await FARAZ_ON_DATE.static_thresholds()
    df = lf.collect()
    assert list(df.schema.items()) == [
        ('insCode', pl.String),
        ('dEven', pl.Int64),
        ('hEven', pl.Int64),
        ('psGelStaMax', pl.Float64),
        ('psGelStaMin', pl.Float64),
    ]


@file('faraz_BestLimits_20220222.json')
async def test_intraday_best_limits():
    lf = await FARAZ_ON_DATE.best_limits()
    df = lf.collect()
    assert list(df.schema.items()) == [
        ('idn', pl.Int64),
        ('dEven', pl.Int64),
        ('hEven', pl.Int64),
        ('refID', pl.Int64),
        ('number', pl.Int64),
        ('qTitMeDem', pl.Int64),
        ('zOrdMeDem', pl.Int64),
        ('pMeDem', pl.Float64),
        ('pMeOf', pl.Float64),
        ('zOrdMeOf', pl.Int64),
        ('qTitMeOf', pl.Int64),
        ('title', pl.Null),
        ('insCode', pl.Null),
    ]


@file('faraz_GetTradeHistory_20220222.json')
async def test_intraday_trades():
    lf = await FARAZ_ON_DATE.trades()
    df = lf.collect()
    assert list(df.schema.items()) == [
        ('insCode', pl.Null),
        ('dEven', pl.Int64),
        ('nTran', pl.Int64),
        ('hEven', pl.Int64),
        ('qTitTran', pl.Int64),
        ('pTran', pl.Float64),
        ('qTitNgJ', pl.Int64),
        ('iSensVarP', pl.String),
        ('pPhSeaCotJ', pl.Float64),
        ('pPbSeaCotJ', pl.Float64),
        ('iAnuTran', pl.Int64),
        ('xqVarPJDrPRf', pl.Float64),
        ('canceled', pl.Int64),
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
    validate_dict(d, ClosingPrice)


@file('faraz_GetInstrumentState_20220222.json')
async def test_intraday_states():
    lf = await FARAZ_ON_DATE.states()
    df = lf.collect()
    assert list(df.schema.items()) == [
        ('idn', pl.Int64),
        ('dEven', pl.Int64),
        ('hEven', pl.Int64),
        ('insCode', pl.String),
        ('lVal18AFC', pl.Null),
        ('lVal30', pl.Null),
        ('cEtaval', pl.String),
        ('realHeven', pl.Int64),
        ('underSupervision', pl.Int64),
        ('cEtavalTitle', pl.Null),
    ]


@file('faraz_Shareholder_20220222.json')
async def test_intraday_holders():
    lf = await FARAZ_ON_DATE.holders()
    df = lf.collect()
    assert list(df.schema.items()) == [
        ('shareHolderID', pl.Int64),
        ('shareHolderName', pl.String),
        ('cIsin', pl.String),
        ('dEven', pl.Int64),
        ('numberOfShares', pl.Float64),
        ('perOfShares', pl.Float64),
        ('change', pl.Int64),
        ('changeAmount', pl.Float64),
        ('shareHolderShareID', pl.Int64),
    ]


@file('ondate_client_type.json')
async def test_client_type():
    d = await FARAZ_ON_DATE.client_type()
    validate_dict(d, ClientTypeOnDate)
    with warns():
        d2 = await FARAZ_ON_DATE.client_types()  # pyright: ignore[reportDeprecated]
    assert d2 == d
