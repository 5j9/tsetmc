from datetime import datetime

from numpy import dtype
from pytest_aiohutils import file

from tests import STR
from tsetmc.funds import (
    FundType,
    commodity_etfs,
    etfs,
    etfs_with_most_price_decrease,
    etfs_with_most_price_increase,
    fund_details,
    funds,
    most_traded_etfs,
)

GET_TRADE_TOP_DTYPES = [
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


@file('commodity_funds.json')
async def test_commodity_funds():
    df = await commodity_etfs(top=3)
    assert len(df) == 3
    assert [*df.dtypes.items()] == GET_TRADE_TOP_DTYPES
    assert not df['instrument.lVal30'].str.contains('ي', regex=False).any()


@file('etfs_with_most_price_decrease.json')
async def test_etfs_with_most_price_decrease():
    df = await etfs_with_most_price_decrease(top=3)
    if df.empty:  # early morning
        return
    assert len(df) == 3
    assert [*df.dtypes.items()] == GET_TRADE_TOP_DTYPES
    assert not df['instrument.lVal30'].str.contains('ي', regex=False).any()


@file('etfs_with_most_price_increase.json')
async def test_etfs_with_most_price_increase():
    df = await etfs_with_most_price_increase(top=3)
    if df.empty:  # early morning
        return
    assert len(df) == 3
    assert [*df.dtypes.items()] == GET_TRADE_TOP_DTYPES
    assert not df['instrument.lVal30'].str.contains('ي', regex=False).any()


@file('most_traded_etfs.json')
async def test_most_traded_etfs():
    df = await most_traded_etfs(top=3)
    if df.empty:  # early morning
        return
    assert len(df) == 3
    assert [*df.dtypes.items()] == GET_TRADE_TOP_DTYPES
    assert not df['instrument.lVal30'].str.contains('ي', regex=False).any()


@file('etfs.json')
async def test_etfs():
    df = await etfs(top=3)
    assert len(df) == 3
    assert [*df.dtypes.items()] == GET_TRADE_TOP_DTYPES
    assert not df['instrument.lVal30'].str.contains('ي', regex=False).any()


@file('get_funds_mix.json')
async def test_get_funds():
    df = await funds(FundType.MIXED)
    assert len(df) >= 15
    assert [*df.dtypes.items()] == [
        ('fundProfits', dtype('O')),
        ('stats', dtype('O')),
        ('regNo', dtype('int64')),
        ('fundType', dtype('int64')),
        ('fundSize', dtype('int64')),
        ('recordDate', STR),
        ('navRed', dtype('float64')),
        ('navSub', dtype('float64')),
        ('navStat', dtype('float64')),
        ('initiationDate', STR),
        ('netAsset', dtype('float64')),
        ('units', dtype('float64')),
        ('unitsSub', dtype('float64')),
        ('unitsRed', dtype('float64')),
        ('portfolioFiveBest', dtype('float64')),
        ('portfolioStock', dtype('float64')),
        ('portfolioBond', dtype('float64')),
        ('portfolioDeposit', dtype('float64')),
        ('portfolioOther', dtype('float64')),
        ('portfolioCash', dtype('float64')),
        ('custodian', STR),
        ('custodianEN', dtype('O')),
        ('guarantor', STR),
        ('guarantorEN', dtype('O')),
        ('manager', STR),
        ('managerEN', dtype('O')),
        ('investmentManager', STR),
        ('investmentManagerEN', dtype('O')),
        ('marketMaker', dtype('O')),
        ('marketMakerEN', dtype('O')),
        ('auditor', dtype('O')),
        ('auditorEN', dtype('O')),
        ('name', dtype('O')),
        ('nameEN', dtype('O')),
        ('webSite', STR),
        ('webSiteEN', dtype('O')),
        ('retInvNo', dtype('int64')),
        ('insInvNo', dtype('int64')),
        ('retInvPercent', dtype('float64')),
        ('insInvPercent', dtype('float64')),
        ('naturalPercent', dtype('float64')),
        ('legalPercent', dtype('float64')),
        ('guaranteedEarningRate', dtype('float64')),
        ('estimatedEarningRate', dtype('float64')),
        ('dividentIntervalPeriod', dtype('int64')),
        ('day1Return', dtype('float64')),
        ('day7Return', dtype('float64')),
        ('day30Return', dtype('float64')),
        ('day90Return', dtype('float64')),
        ('day180Return', dtype('float64')),
        ('day365Return', dtype('float64')),
        ('dayFirstReturn', dtype('float64')),
        ('mfName', STR),
        ('fixIncome', dtype('int64')),
        ('mfNameEng', STR),
    ]
    assert not df['mfName'].str.contains('ي', regex=False).any()


@file('agas_details.json')
async def test_fund_details():
    d = await fund_details('11341')
    df = d['stats']
    assert type(d['recordDate']) is type(d['initiationDate']) is datetime
    assert [*df.dtypes.items()] == [
        (
            'navSub',
            dtype('float64'),
        ),
        (
            'netAsset',
            dtype('float64'),
        ),
        (
            'navStat',
            dtype('float64'),
        ),
        (
            'navRed',
            dtype('float64'),
        ),
    ]
    assert df.index.name == 'recordDate'
    assert df.index.dtype == 'datetime64[ns]'
