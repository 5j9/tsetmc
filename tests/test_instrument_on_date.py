from aiohttp_test_utils import file
from numpy import dtype
from pytest import warns

from tests import assert_dict_type
from tsetmc.instruments import Instrument, _ClientTypeOnDate, _ClosingPrice

FARAZ_ON_DATE = Instrument(13666407494621646).on_date(20220222)


@file('faraz_GetClosingPriceHistory_20220222.json')
async def test_intraday_closing_price():
    df = await FARAZ_ON_DATE.closing_price_history()
    assert [*df.dtypes.items()] == [
        ('id', dtype('int64')),
        ('insCode', dtype('O')),
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


@file('faraz_GetStaticThreshold_20220222.json')
async def test_static_thresholds():
    df = await FARAZ_ON_DATE.static_thresholds()
    assert [*df.dtypes.items()] == [
        ('insCode', dtype('O')),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('psGelStaMax', dtype('float64')),
        ('psGelStaMin', dtype('float64')),
    ]


@file('faraz_BestLimits_20220222.json')
async def test_intraday_best_limits():
    df = await FARAZ_ON_DATE.best_limits()
    assert [*df.dtypes.items()] == [
        ('idn', dtype('int64')),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('refID', dtype('int64')),
        ('number', dtype('int64')),
        ('qTitMeDem', dtype('int64')),
        ('zOrdMeDem', dtype('int64')),
        ('pMeDem', dtype('float64')),
        ('pMeOf', dtype('float64')),
        ('zOrdMeOf', dtype('int64')),
        ('qTitMeOf', dtype('int64')),
        ('insCode', dtype('O')),
    ]


@file('faraz_GetTradeHistory_20220222.json')
async def test_intraday_trades():
    df = await FARAZ_ON_DATE.trades()
    assert [*df.dtypes.items()] == [
        ('insCode', dtype('O')),
        ('dEven', dtype('int64')),
        ('nTran', dtype('int64')),
        ('hEven', dtype('int64')),
        ('qTitTran', dtype('int64')),
        ('pTran', dtype('float64')),
        ('qTitNgJ', dtype('int64')),
        ('iSensVarP', dtype('O')),
        ('pPhSeaCotJ', dtype('float64')),
        ('pPbSeaCotJ', dtype('float64')),
        ('iAnuTran', dtype('int64')),
        ('xqVarPJDrPRf', dtype('float64')),
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
async def test_historic_data():
    d = await FARAZ_ON_DATE.closing_price()
    assert_dict_type(d, _ClosingPrice)


@file('faraz_GetInstrumentState_20220222.json')
async def test_intraday_states():
    df = await FARAZ_ON_DATE.states()
    assert [*df.dtypes.items()] == [
        ('idn', dtype('int64')),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('insCode', dtype('O')),
        ('lVal18AFC', dtype('O')),
        ('lVal30', dtype('O')),
        ('cEtaval', dtype('O')),
        ('realHeven', dtype('int64')),
        ('underSupervision', dtype('int64')),
        ('cEtavalTitle', dtype('O')),
    ]


@file('faraz_Shareholder_20220222.json')
async def test_intraday_holders():
    df = await FARAZ_ON_DATE.holders()
    assert [*df.dtypes.items()] == [
        ('shareHolderID', dtype('int64')),
        ('shareHolderName', dtype('O')),
        ('cIsin', dtype('O')),
        ('dEven', dtype('int64')),
        ('numberOfShares', dtype('float64')),
        ('perOfShares', dtype('float64')),
        ('change', dtype('int64')),
        ('changeAmount', dtype('float64')),
        ('shareHolderShareID', dtype('int64')),
    ]


@file('ondate_client_type.json')
async def test_client_type():
    d = await FARAZ_ON_DATE.client_type()
    assert_dict_type(d, _ClientTypeOnDate)
    with warns():
        d2 = await FARAZ_ON_DATE.client_types()
    assert d2 == d
