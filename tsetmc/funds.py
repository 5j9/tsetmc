from datetime import datetime as _datetime
from enum import StrEnum as _StrEnum

from pandas import (
    json_normalize as _json_normalize,
)

from tsetmc import (
    Flow as _Flow,
    FlowType as _FlowType,
    _api,
    _DataFrame,
)


class FundType(_StrEnum):
    STOCK = '6'
    MIXED = '7'
    FIXED = '4'
    MARKET_MAKING = '11'
    VC = '12'
    REIT = '14'
    PROJECT = '13'
    COMMODITY = '5'
    PRIVATE = '16'
    FUND = '17'


async def funds(type_: FundType | int | str, /) -> _DataFrame:
    """tsetmc.com > صندوق های سرمایه گذاری"""
    j = await _api(f'Fund/GetFunds/{type_}')
    df = _DataFrame(j['funds'])
    # regNo is sometimes returned as float by the server
    df['regNo'] = df['regNo'].astype(int)
    return df


async def fund_details(reg_no: str | int) -> dict:
    """reg_no (regNo) can be objtained using `tsetmc.funds.funds` function.

    `'stats` values is a DataFrame with the following columns:
        recordDate: _datetime
        navSub: int
        netAsset: float
        navStat: int
        navRed: int
    recordDate is set as index.
    """
    j = await _api(f'Fund/GetFundInDetail/{reg_no}')
    assert len(j) == 1
    fund = j['fund']
    df = fund['stats'] = _DataFrame(fund['stats'])
    df['recordDate'] = df['recordDate'].astype('datetime64[ns]')
    df.set_index('recordDate', inplace=True)
    fund['recordDate'] = _datetime.fromisoformat(fund['recordDate'])
    fund['initiationDate'] = _datetime.fromisoformat(fund['initiationDate'])
    return fund


async def commodity_etfs(
    *, flow: _FlowType = _Flow.MERCANTILE, top: int | str = '9999'
) -> _DataFrame:
    """tsetmc.com > بورس کالا > صندوق های قابل معامله"""
    j = await _api(
        f'ClosingPrice/GetTradeTop/CommodityFund/{flow}/{top}', fa=True
    )
    return _json_normalize(j['tradeTop'])


async def etfs_with_most_price_decrease(
    *, flow: _FlowType = _Flow.BOURSE, top: int | str = '9999'
) -> _DataFrame:
    """tsetmc.com > بورس اوراق بهادار تهران > صندوق های قابل معامله > بیشترین کاهش قیمت"""
    j = await _api(
        f'ClosingPrice/GetTradeTop/PClosingBtmETF/{flow}/{top}', fa=True
    )
    return _json_normalize(j['tradeTop'])


async def etfs_with_most_price_increase(
    *, flow: _FlowType = _Flow.BOURSE, top: int | str = '9999'
) -> _DataFrame:
    """tsetmc.com > بورس اوراق بهادار تهران > صندوق های قابل معامله > بیشترین افزایش قیمت"""
    j = await _api(
        f'ClosingPrice/GetTradeTop/PClosingTopETF/{flow}/{top}', fa=True
    )
    return _json_normalize(j['tradeTop'])


async def most_traded_etfs(
    *, flow: _FlowType = _Flow.BOURSE, top: int | str = '9999'
) -> _DataFrame:
    """tsetmc.com > بورس اوراق بهادار تهران > صندوق های قابل معامله > بیشترین حجم معامله"""
    j = await _api(
        f'ClosingPrice/GetTradeTop/MostTradedETF/{flow}/{top}', fa=True
    )
    return _json_normalize(j['tradeTop'])


async def etfs(
    *, flow: _FlowType = _Flow.BOURSE, top: int | str = '9999'
) -> _DataFrame:
    """tsetmc.com > بورس اوراق بهادار تهران > صندوق های قابل معامله > معاملات صندوق های قابل معامله"""
    j = await _api(f'ClosingPrice/GetTradeTop/ETF/{flow}/{top}', fa=True)
    return _json_normalize(j['tradeTop'])
