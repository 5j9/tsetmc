from datetime import datetime

import polars as pl
from pytest_aiohutils import file

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
        'insCode': pl.String,
        'lVal30': pl.String,
        'lVal18AFC': pl.String,
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
        'insCode': pl.String,
        'lVal30': pl.String,
        'lVal18AFC': pl.String,
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
        'insCode': pl.String,
        'lVal30': pl.String,
        'lVal18AFC': pl.String,
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
        'insCode': pl.String,
        'lVal30': pl.String,
        'lVal18AFC': pl.String,
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
    lf = await funds(FundType.MIXED)
    df = lf.collect()

    # Check length
    assert df.height >= 15

    # Check schema
    expected_schema = {
        'fundProfits': pl.List,
        'stats': pl.Null,
        'regNo': pl.Int64,
        'fundType': pl.Int64,
        'fundSize': pl.Int64,
        'recordDate': pl.String,
        'navRed': pl.Float64,
        'navSub': pl.Float64,
        'navStat': pl.Float64,
        'initiationDate': pl.String,
        'netAsset': pl.Float64,
        'units': pl.Float64,
        'unitsSub': pl.Float64,
        'unitsRed': pl.Float64,
        'portfolioFiveBest': pl.Float64,
        'portfolioStock': pl.Float64,
        'portfolioBond': pl.Float64,
        'portfolioDeposit': pl.Float64,
        'portfolioOther': pl.Float64,
        'portfolioCash': pl.Float64,
        'custodian': pl.String,
        'custodianEN': pl.Null,
        'guarantor': pl.String,
        'guarantorEN': pl.Null,
        'manager': pl.String,
        'managerEN': pl.Null,
        'investmentManager': pl.String,
        'investmentManagerEN': pl.Null,
        'marketMaker': pl.Null,
        'marketMakerEN': pl.Null,
        'auditor': pl.Null,
        'auditorEN': pl.Null,
        'name': pl.Null,
        'nameEN': pl.Null,
        'webSite': pl.String,
        'webSiteEN': pl.Null,
        'retInvNo': pl.Int64,
        'insInvNo': pl.Int64,
        'retInvPercent': pl.Float64,
        'insInvPercent': pl.Float64,
        'naturalPercent': pl.Float64,
        'legalPercent': pl.Float64,
        'guaranteedEarningRate': pl.Float64,
        'estimatedEarningRate': pl.Float64,
        'dividentIntervalPeriod': pl.Int64,
        'day1Return': pl.Float64,
        'day7Return': pl.Float64,
        'day30Return': pl.Float64,
        'day90Return': pl.Float64,
        'day180Return': pl.Float64,
        'day365Return': pl.Float64,
        'dayFirstReturn': pl.Float64,
        'mfName': pl.String,
        'fixIncome': pl.Int64,
        'mfNameEng': pl.String,
    }

    # Check each column's dtype
    for col, expected_dtype in expected_schema.items():
        assert col in df.columns, f"Column '{col}' not found"
        assert df[col].dtype == expected_dtype, (
            f"Column '{col}' has dtype {df[col].dtype}, expected {expected_dtype}"
        )

    # Check that no mfName contains 'ي'
    assert not df['mfName'].str.contains('ي', literal=True).any()


@file('agas_details.json')
async def test_fund_details():
    d = await fund_details('11341')
    df = d['stats'].collect()

    # Check date types
    assert type(d['recordDate']) is type(d['initiationDate']) is datetime

    # Check schema (Polars has no index, so recordDate is a regular column)
    expected_schema = {
        'recordDate': pl.Datetime,
        'navSub': pl.Float64,
        'netAsset': pl.Float64,
        'navStat': pl.Float64,
        'navRed': pl.Float64,
    }

    # Check each column's dtype
    for col, expected_dtype in expected_schema.items():
        assert col in df.columns, f"Column '{col}' not found"
        assert df[col].dtype == expected_dtype, (
            f"Column '{col}' has dtype {df[col].dtype}, expected {expected_dtype}"
        )

    # Check that recordDate is sorted (like an index)
    # Get the recordDate column and check if it's sorted
    record_dates = df['recordDate'].to_list()
    assert record_dates == sorted(record_dates), 'recordDate is not sorted'
