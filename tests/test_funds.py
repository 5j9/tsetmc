from datetime import datetime

import polars as pl
from numpy import dtype
from pytest_aiohutils import file

from tests import STR
from tsetmc.funds import (
    FundType,
    etfs,
    etfs_with_most_price_decrease,
    etfs_with_most_price_increase,
    fund_details,
    funds,
    most_traded_etfs,
)


@file('etfs_with_most_price_decrease.json')
async def test_etfs_with_most_price_decrease():
    lf = await etfs_with_most_price_decrease(top=3)
    df = lf.collect()

    # Check if empty (early morning)
    if df.height == 0:
        return

    assert df.height == 3
    assert not df['lVal30'].str.contains('ي', literal=True).any()

    # Check key columns
    key_columns = {
        'insCode': pl.Utf8,
        'lVal30': pl.Utf8,
        'lVal18AFC': pl.Utf8,
        'pClosing': pl.Float64,
        'zTotTran': pl.Float64,
        'qTotCap': pl.Float64,
        'flow': pl.Int64,
    }

    for col, expected_dtype in key_columns.items():
        assert col in df.columns
        assert df[col].dtype == expected_dtype


@file('etfs_with_most_price_increase.json')
async def test_etfs_with_most_price_increase():
    lf = await etfs_with_most_price_increase(top=3)
    df = lf.collect()

    if df.height == 0:
        return

    assert df.height == 3
    assert not df['lVal30'].str.contains('ي', literal=True).any()

    # Check key columns
    key_columns = {
        'insCode': pl.Utf8,
        'lVal30': pl.Utf8,
        'lVal18AFC': pl.Utf8,
        'pClosing': pl.Float64,
        'zTotTran': pl.Float64,
        'qTotCap': pl.Float64,
        'flow': pl.Int64,
    }

    for col, expected_dtype in key_columns.items():
        assert col in df.columns
        assert df[col].dtype == expected_dtype


@file('most_traded_etfs.json')
async def test_most_traded_etfs():
    lf = await most_traded_etfs(top=3)
    df = lf.collect()

    if df.height == 0:
        return

    assert df.height == 3
    assert not df['lVal30'].str.contains('ي', literal=True).any()

    # Check key columns
    key_columns = {
        'insCode': pl.Utf8,
        'lVal30': pl.Utf8,
        'lVal18AFC': pl.Utf8,
        'pClosing': pl.Float64,
        'zTotTran': pl.Float64,
        'qTotCap': pl.Float64,
        'flow': pl.Int64,
    }

    for col, expected_dtype in key_columns.items():
        assert col in df.columns
        assert df[col].dtype == expected_dtype


@file('etfs.json')
async def test_etfs():
    lf = await etfs(top=3)
    df = lf.collect()

    assert df.height == 3
    assert not df['lVal30'].str.contains('ي', literal=True).any()

    # Check key columns
    key_columns = {
        'insCode': pl.Utf8,
        'lVal30': pl.Utf8,
        'lVal18AFC': pl.Utf8,
        'pClosing': pl.Float64,
        'zTotTran': pl.Float64,
        'qTotCap': pl.Float64,
        'flow': pl.Int64,
    }

    for col, expected_dtype in key_columns.items():
        assert col in df.columns
        assert df[col].dtype == expected_dtype


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
