from typing import TypedDict as _TypedDict
from warnings import warn as _warn

from aiohutils.pd import html_to_df as _html_to_df
from bs4 import BeautifulSoup as _BeautifulSoup
from pandas import (
    NA as _NA,
    Timestamp as _Timestamp,
    concat as _concat,
    json_normalize as _json_normalize,
)

from tsetmc import (
    Flow as _Flow,
    FlowType as _FlowType,
    _api,
    _DataFrame,
    _get_par_tree,
    _mem_par_tree,
    _numerize,
    _partial,
)

_make_soup = _partial(_BeautifulSoup, features='lxml')


async def boards() -> dict[int, str]:
    """See http://members.tsetmc.com/Loader.aspx?ParTree=121C1913."""
    content = await _mem_par_tree('111C1913')
    iloc = _html_to_df(content, header=0).iloc
    return dict(zip(iloc[:, 0], iloc[:, 1]))


async def cs_codes() -> dict[str, str]:
    """https://members.tsetmc.com/Loader.aspx?ParTree=111C1213"""
    content = await _mem_par_tree('111C1213')
    iloc = _html_to_df(content, header=0).iloc
    return dict(zip(iloc[:, 0], iloc[:, 1]))


async def sectors_summary() -> _DataFrame:
    j = await _api('MarketData/GetSectorsSummary', fa=True)
    return _DataFrame(j['sectorSummeries'])


async def industrial_groups_overview() -> _DataFrame:
    """Return a dataframe of industrial groups.

    The result contains info about each group's price change.
    See: http://members.tsetmc.com/Loader.aspx?ParTree=111C1214
    """
    _warn(
        'industrial_groups_overview is deprecated; use sectors_summary instead.',
        DeprecationWarning,
        2,
    )
    content = await _mem_par_tree('111C1214')
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


async def market_overview(*, flow: _FlowType = _Flow.BOURSE) -> MarketOverview:
    """tsetmc.com > در یک نگاه"""
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


async def messages(
    *, flow: _FlowType = _Flow.GENERAL, top: int | str = 200
) -> _DataFrame:
    """See also: ``search_messages`` and ``Instrument.messages``."""
    j = await _api(f'Msg/GetMsgByFlow/{flow}/{top}', fa=True)
    df = _DataFrame(j['msg'])
    return df


async def search_messages(*, sh_date: str, term: str) -> _DataFrame:
    """https://tsetmc.com/MsgTop

    :param term: Only return messages containing this term.
    :param sh_date: Solar Hijri date string in 'YYYY-mm-dd' format.

    See also: ``messages`` and ``Instrument.messages``.
    """
    j = await _api(f'Msg/GetMsgByDevenAndLVal18AFC/{sh_date}/{term}', fa=True)
    return _DataFrame(j['msg'])
