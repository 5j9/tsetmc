from datetime import datetime as _datetime
from typing import TypedDict as _TypedDict

from aiohutils.df import from_html as _from_html
from bs4 import BeautifulSoup as _BeautifulSoup
from polars import (
    Float64 as _Float64,
    Int64 as _Int64,
)

from tsetmc import _api, _DataFrame, _get_par_tree, _numerize, _partial

_make_soup = _partial(_BeautifulSoup, features='lxml')


async def boards() -> dict[int, str]:
    """See http://en.tsetmc.com/Loader.aspx?ParTree=121C1913."""
    content = await _get_par_tree('111C1913')
    df = _from_html(content, header=0)
    return dict(zip(df[:, 0], df[:, 1]))


async def cs_codes() -> dict[str, str]:
    """http://www.tsetmc.com/Loader.aspx?ParTree=111C1213"""
    content = await _get_par_tree('111C1213')
    df = _from_html(content, header=0)
    return dict(zip(df[:, 0], df[:, 1]))


async def industrial_groups_overview() -> _DataFrame:
    """Return a dataframe of industrial groups.

    The result contains info about each group's price change.
    See: http://old.tsetmc.com/Loader.aspx?ParTree=111C1214
    """
    content = await _get_par_tree('111C1214')
    df = _from_html(content)
    df = df.with_columns(
        df['1'].str.extract_groups(
            r"showBar\('[^\[]*',(\d+),(\d+),(\d+),(\d+)\)"
        )
    ).unnest('1')
    df = df.with_columns(df.select(df.columns[1:]).cast(_Int64))
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
    # todo: deprecate in favour of https://tsetmc.com/ShareHolderChanges
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
            ins_code = href[href.rfind('=') + 1 :]
            l30 = inst_div.text

        holder = td0.select_one('li').text
        # noinspection PyUnboundLocalVariable
        append_row([ins_code, l30, holder, *_parse_tds(tds)])
    df = _DataFrame(rows)
    df.columns = [
        'ins_code',
        'l30',
        'holder',
        *(
            # the first header is 'شرکت - سهامدار'
            th.text
            for th in trs[0].select('th')[1:]
        ),
    ]
    return df


async def top_industry_groups() -> _DataFrame:
    """http://old.tsetmc.com/Loader.aspx?Partree=15131O"""
    text = await _get_par_tree('15131O')
    df = _from_html(text)
    df.columns = ['group', 'mv', 'tno', 'tvol', 'tval']
    df = _numerize(df, ('mv', 'tvol', 'tval'), _Float64, comma=True)
    return df


def _parse_tds(tds) -> list:
    parsed = [None] * 5
    for i, td in enumerate(tds[1:]):
        try:
            parsed[i] = float(td.text.replace(',', ''))
        except ValueError:
            continue
    return parsed


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
    marketActivityTimestamp: _datetime
    marketActivityZTotTran: int
    marketState: str
    marketStateTitle: str
    marketValue: float
    marketValueBase: float


async def market_overview(n=1) -> MarketOverview:
    """Return GetMarketOverview result.

    :param n:
        1: bourse
        2: fara-bourse
    """
    j = await _api(f'MarketData/GetMarketOverview/{n}')
    overview = j['marketOverview']
    overview['marketActivityTimestamp'] = _datetime.strptime(
        f"{overview['marketActivityDEven']}"
        f"{overview['marketActivityHEven']:>06}",
        '%Y%m%d%H%M%S',
    )
    return overview


async def related_companies(cs: str) -> dict[str, _DataFrame]:
    j = await _api(f'ClosingPrice/GetRelatedCompany/{cs}')
    rc = j['relatedCompany']
    assert rc[0]['instrument'].keys() & rc[0].keys() == {'insCode'}
    for c in rc:
        inst = c.pop('instrument')
        for k, v in inst.items():
            c[f'instrument.{k}'] = v
    j['relatedCompany'] = _DataFrame(rc)
    j['relatedCompanyThirtyDayHistory'] = _DataFrame(
        j['relatedCompanyThirtyDayHistory']
    )
    return j
