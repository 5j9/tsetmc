from datetime import datetime as _datetime
from enum import StrEnum as _StrEnum
from typing import Annotated as _Annotated

from pandas import (
    json_normalize as _json_normalize,
)
from pydantic import (
    BaseModel as _BaseModel,
    BeforeValidator as _BeforeValidator,
    ConfigDict as _ConfigDict,
)

from tsetmc import (
    Flow as _Flow,
    FlowType as _FlowType,
    _api,
    _DataFrame,
    _model,
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
    return _DataFrame(j['funds'])


class _Stat(_BaseModel):
    recordDate: _datetime
    navSub: int
    netAsset: int
    navStat: int
    navRed: int


def _make_stats_df(stats: list[_Stat]) -> _DataFrame:
    if not stats:
        return _DataFrame()  # Return empty DataFrame for empty list

    df = _DataFrame(stats)
    df['recordDate'] = df['recordDate'].astype('datetime64[ns]')
    df.set_index('recordDate', inplace=True)
    return df


class FundDetails(_BaseModel):
    model_config = _ConfigDict(arbitrary_types_allowed=True)
    fundProfits: list
    stats: _Annotated[_DataFrame, _BeforeValidator(_make_stats_df)]
    regNo: int
    fundType: int
    fundSize: int
    recordDate: _datetime
    navRed: int
    navSub: int
    navStat: int
    initiationDate: _datetime
    netAsset: int
    units: int
    unitsSub: int
    unitsRed: int
    portfolioFiveBest: float
    portfolioStock: float
    portfolioBond: int
    portfolioDeposit: float
    portfolioOther: float
    portfolioCash: float
    custodian: str
    custodianEN: None
    guarantor: str
    guarantorEN: None
    manager: str
    managerEN: None
    investmentManager: str
    investmentManagerEN: None
    marketMaker: None
    marketMakerEN: None
    auditor: None
    auditorEN: None
    name: None
    nameEN: None
    webSite: str
    webSiteEN: None
    retInvNo: int
    insInvNo: int
    retInvPercent: int
    insInvPercent: int
    naturalPercent: int
    legalPercent: int
    guaranteedEarningRate: int
    estimatedEarningRate: int
    dividentIntervalPeriod: int
    day1Return: float
    day7Return: float
    day30Return: float
    day90Return: float
    day180Return: float
    day365Return: float
    dayFirstReturn: float
    mfName: str
    fixIncome: int
    mfNameEng: str


class _FundDetails(_BaseModel):
    fund: FundDetails


async def fund_details(reg_no: str | int) -> FundDetails:
    """reg_no (regNo) can be objtained using `tsetmc.funds.funds` function.

    `FundDetails.stats` is a DataFrame with the following columns:
        recordDate: _datetime
        navSub: int
        netAsset: int
        navStat: int
        navRed: int
    recordDate is set as index.
    """
    return (await _model(_FundDetails, f'Fund/GetFundInDetail/{reg_no}')).fund


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
