from enum import StrEnum as _StrEnum
from typing import TypedDict as _TypedDict

from aiohutils.pd import html_to_df as _html_to_df
from bs4 import BeautifulSoup as _BeautifulSoup
from pandas import (
    NA as _NA,
    Timestamp as _Timestamp,
    concat as _concat,
    json_normalize as _json_normalize,
)

from tsetmc import _api, _DataFrame, _get_par_tree, _numerize, _partial

_make_soup = _partial(_BeautifulSoup, features='lxml')


async def boards() -> dict[int, str]:
    """See http://en.tsetmc.com/Loader.aspx?ParTree=121C1913."""
    content = await _get_par_tree('111C1913')
    iloc = _html_to_df(content, header=0).iloc
    return dict(zip(iloc[:, 0], iloc[:, 1]))


async def cs_codes() -> dict[str, str]:
    """http://www.tsetmc.com/Loader.aspx?ParTree=111C1213"""
    content = await _get_par_tree('111C1213')
    iloc = _html_to_df(content, header=0).iloc
    return dict(zip(iloc[:, 0], iloc[:, 1]))


async def industrial_groups_overview() -> _DataFrame:
    """Return a dataframe of industrial groups.

    The result contains info about each group's price change.
    See: http://old.tsetmc.com/Loader.aspx?ParTree=111C1214
    """
    content = await _get_par_tree('111C1214')
    df = _html_to_df(content)
    show = df[1]
    df.drop(columns=1, inplace=True)
    percents = show.str.extract(
        r"showBar\('[^\[]*',(\d+),(\d+),(\d+),(\d+)\)"
    ).astype('int64')
    df = _concat((df, percents), copy=False, axis=1)
    df.columns = ('group', ':-2', '-2:0', '0:2', '2:')
    return df


async def market_map_data(
    *, market=0, size=9999, sector=0, typeSelected=1, heven=0
) -> _DataFrame:
    j = await _api(
        f'ClosingPrice/GetMarketMap'
        f'?market={market}&size={size}&sector={sector}'
        f'&typeSelected={typeSelected}&hEven={heven}',
        fa=True,
    )
    df = _DataFrame(j)
    return df


async def major_holders_activity() -> _DataFrame:
    text = await _get_par_tree('15131I')
    soup = _make_soup(text)
    trs = soup.select('tr')

    rows = []
    append_row = rows.append
    for tr in trs[1:]:
        tds = tr.select('td')
        td0 = tds[0]

        inst_div = td0.select_one('div')
        if inst_div:
            href = inst_div.select_one('a')['href']
            ins_code = int(href[href.rfind('=') + 1 :])
            l30 = inst_div.text

        holder = td0.select_one('li').text
        # noinspection PyUnboundLocalVariable
        append_row([ins_code, l30, holder, *_parse_tds(tds)])
    return _DataFrame(
        rows,
        copy=False,
        columns=(
            'ins_code',
            'l30',
            'holder',
            *(
                # the first header is 'شرکت - سهامدار'
                th.text
                for th in trs[0].select('th')[1:]
            ),
        ),
    )


async def top_industry_groups() -> _DataFrame:
    """http://old.tsetmc.com/Loader.aspx?Partree=15131O"""
    text = await _get_par_tree('15131O')
    df = _html_to_df(text)
    df.columns = ['group', 'mv', 'tno', 'tvol', 'tval']
    _numerize(df, ('mv', 'tvol', 'tval'), float, comma=True)
    return df


def _parse_tds(tds):
    for td in tds[1:]:
        text = td.text
        try:
            yield float(text.replace(',', ''))
        except ValueError:
            if td == '\xa0':
                yield _NA


class MarketOverview(_TypedDict):
    indexChange: float
    indexEqualWeightedChange: float
    indexEqualWeightedLastValue: float
    indexLastValue: float
    lastDataDEven: int
    lastDataHEven: int
    marketActivityDEven: int
    marketActivityHEven: int
    marketActivityQTotCap: float
    marketActivityQTotTran: float
    marketActivityTimestamp: _Timestamp
    marketActivityZTotTran: int
    marketState: str
    marketStateTitle: str
    marketValue: float
    marketValueBase: float


async def market_overview(*, flow=1) -> MarketOverview:
    """Return GetMarketOverview result.

    :param flow:
        1: bourse
        2: fara-bourse
    """
    j = await _api(f'MarketData/GetMarketOverview/{flow}')
    overview = j['marketOverview']
    overview['marketActivityTimestamp'] = _Timestamp(
        f"{overview['marketActivityDEven']}"
        f"{overview['marketActivityHEven']:>06}"
    )
    return overview


async def related_companies(cs: str) -> dict[str, _DataFrame]:
    j = await _api(f'ClosingPrice/GetRelatedCompany/{cs}')
    j['relatedCompany'] = _json_normalize(j['relatedCompany'])
    j['relatedCompanyThirtyDayHistory'] = _DataFrame(
        j['relatedCompanyThirtyDayHistory'], copy=False
    )
    return j


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


async def get_funds(type_: FundType | int | str, /) -> _DataFrame:
    """tsetmc.com > صندوق های سرمایه گذاری"""
    j = await _api(f'Fund/GetFunds/{type_}')
    return _DataFrame(j['funds'])


async def commodity_funds(
    *, flow: int | str = '7', top: int | str = '9999'
) -> _DataFrame:
    """tsetmc.com > بورس کالا > صندوق های قابل معامله"""
    j = await _api(f'ClosingPrice/GetTradeTop/CommodityFund/{flow}/{top}')
    return _json_normalize(j['tradeTop'])


async def etfs(
    *, flow: int | str = '1', top: int | str = '9999'
) -> _DataFrame:
    """tsetmc.com > بورس اوراق بهادار تهران > صندوق های قابل معامله"""
    j = await _api(f'ClosingPrice/GetTradeTop/PClosingBtmETF/{flow}/{top}')
    return _json_normalize(j['tradeTop'])
