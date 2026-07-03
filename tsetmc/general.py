from datetime import datetime as _datetime
from typing import Literal as _Literal, TypedDict as _TypedDict
from warnings import deprecated as _deprecated

import polars as _pl
from html_table_parse import (
    to_dict as _html_to_dict,
    to_list as _html_to_list,
)
from lxml.html import fromstring as _html

from tsetmc import (
    Flow as _Flow,
    FlowType as _FlowType,
    _api,
    _get_par_tree,
    _mem_par_tree,
    _numerize_pl,
)


async def boards() -> dict[int, str]:
    """See http://members.tsetmc.com/Loader.aspx?ParTree=121C1913."""
    content = await _mem_par_tree('111C1913')
    table = _html_to_dict(content)
    codes = [int(c) for c in table['کد تابلو']]
    return dict(zip(codes, table['تابلو']))


async def cs_codes() -> dict[str, str]:
    """https://members.tsetmc.com/Loader.aspx?ParTree=111C1213"""
    content = await _mem_par_tree('111C1213')
    table = _html_to_dict(content)
    return dict(zip(table['کد گروه های صنعت'], table['گروه های صنعت']))


async def sectors_summary() -> _pl.LazyFrame:
    j = await _api('MarketData/GetSectorsSummary', fa=True)
    return _pl.LazyFrame(j['sectorSummeries'])


@_deprecated('use sectors_summary instead')
async def industrial_groups_overview() -> _pl.LazyFrame:
    """Return a LazyFrame of industrial groups.

    The result contains info about each group's price change.
    See: http://members.tsetmc.com/Loader.aspx?ParTree=111C1214
    """
    content = await _mem_par_tree('111C1214')
    table = _html_to_list(content)

    return (
        _pl.LazyFrame(table, orient='row')
        .with_columns(
            _pl.col('column_1')
            .str.extract(r'showBar\(([^)]*)\)')
            .alias('showbar_content')
        )
        .with_columns(
            _pl.col('showbar_content')
            .str.split(',')
            .list.get(1)
            .cast(_pl.Int64)
            .alias(':-2'),
            _pl.col('showbar_content')
            .str.split(',')
            .list.get(2)
            .cast(_pl.Int64)
            .alias('-2:0'),
            _pl.col('showbar_content')
            .str.split(',')
            .list.get(3)
            .cast(_pl.Int64)
            .alias('0:2'),
            _pl.col('showbar_content')
            .str.split(',')
            .list.get(4)
            .cast(_pl.Int64)
            .alias('2:'),
        )
        .drop(['column_1', 'showbar_content'])
        .rename({'column_0': 'group'})
    )


async def market_map_data(
    *, market=0, size=9999, sector=0, typeSelected=1, heven=0
) -> _pl.LazyFrame:
    j = await _api(
        f'ClosingPrice/GetMarketMap'
        f'?market={market}&size={size}&sector={sector}'
        f'&typeSelected={typeSelected}&hEven={heven}',
        fa=True,
    )
    return _pl.LazyFrame(j)


async def major_holders_activity() -> _pl.LazyFrame:
    text = await _get_par_tree('15131I')
    html = _html(text)
    trs = html.xpath('//tr')

    rows = []
    append_row = rows.append

    for tr in trs[1:]:
        tds = tr.xpath('.//td')
        td0 = tds[0]

        inst_div = td0.xpath('.//div[1]')
        if inst_div:
            inst_div = inst_div[0]
            href = inst_div.xpath('.//a[1]/@href')[0]
            ins_code = href[href.rfind('=') + 1 :]
            l30 = inst_div.text_content()
        else:
            ins_code = None
            l30 = None

        holder = td0.xpath('.//li[1]/text()')[0]

        # Get parsed TDs
        parsed_tds = list(_parse_tds(tds))
        row_data = [ins_code, l30, holder, *parsed_tds]
        append_row(row_data)

    # Get column names from header
    header_cols = [th.text for th in trs[0].xpath('.//th')[1:]]
    columns = ('ins_code', 'l30', 'holder', *header_cols)

    # Pad rows to ensure consistent length
    max_cols = len(columns)
    for i, row in enumerate(rows):
        if len(row) < max_cols:
            rows[i] = row + [None] * (max_cols - len(row))
        elif len(row) > max_cols:
            rows[i] = row[:max_cols]

    # Create LazyFrame and forward fill nulls in ins_code and l30
    return _pl.LazyFrame(rows, schema=columns, orient='row').with_columns(
        [
            _pl.col('ins_code').fill_null(strategy='forward'),
            _pl.col('l30').fill_null(strategy='forward'),
        ]
    )


async def top_industry_groups() -> _pl.LazyFrame:
    """http://old.tsetmc.com/Loader.aspx?Partree=15131O"""
    text = await _get_par_tree('15131O')
    table = _html_to_list(text)

    # Skip the header row (first row)
    data_rows = table[1:] if table else []

    return (
        _pl.LazyFrame(data_rows, orient='row')
        .rename(
            {
                'column_0': 'group',
                'column_1': 'mv',
                'column_2': 'tno',
                'column_3': 'tvol',
                'column_4': 'tval',
            }
        )
        .pipe(_numerize_pl, ['mv', 'tno', 'tvol', 'tval'])
    )


def _parse_tds(tds):
    for td in tds[1:]:
        text = td.text
        try:
            yield float(text.replace(',', ''))
        except ValueError:
            if td == '\xa0':
                yield None


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


async def market_overview(*, flow: _FlowType = _Flow.BOURSE) -> MarketOverview:
    """tsetmc.com > در یک نگاه"""
    j = await _api(f'MarketData/GetMarketOverview/{flow}')
    overview = j['marketOverview']
    overview['marketActivityTimestamp'] = _datetime.strptime(
        f'{overview["marketActivityDEven"]}{overview["marketActivityHEven"]:>06}',
        '%Y%m%d%H%M%S',
    )
    return overview


async def related_companies(cs: str) -> dict[str, _pl.LazyFrame]:
    j = await _api(f'ClosingPrice/GetRelatedCompany/{cs}')

    data = j['relatedCompany']
    df = _pl.LazyFrame(data)

    # Handle the instrument struct specifically (similar to trade_top)
    if data and isinstance(data[0], dict) and 'instrument' in data[0]:
        # Drop top-level insCode if it exists (instrument has it)
        df = df.drop('insCode', strict=False)
        df = df.unnest('instrument')

    # Convert relatedCompanyThirtyDayHistory (no nested structs)
    related_history = _pl.LazyFrame(j['relatedCompanyThirtyDayHistory'])

    return {
        'relatedCompany': df,
        'relatedCompanyThirtyDayHistory': related_history,
    }


async def messages(
    *, flow: _FlowType = _Flow.GENERAL, top: int | str = 200
) -> _pl.LazyFrame:
    """See also: ``search_messages`` and ``Instrument.messages``."""
    j = await _api(f'Msg/GetMsgByFlow/{flow}/{top}', fa=True)
    return _pl.LazyFrame(j['msg'])


async def search_messages(*, sh_date: str, term: str) -> _pl.LazyFrame:
    """https://tsetmc.com/MsgTop

    :param term: Only return messages containing this term.
    :param sh_date: Solar Hijri date string in 'YYYY-mm-dd' format.

    See also: ``messages`` and ``Instrument.messages``.
    """
    j = await _api(f'Msg/GetMsgByDevenAndLVal18AFC/{sh_date}/{term}', fa=True)
    return _pl.LazyFrame(j['msg'])


async def trade_top(
    *,
    category: _Literal[
        'CommodityFund',
        'ETF',
        'MostTradedETF',
        'MostVisited',
        'PClosingBtmETF',
        'PClosingTopETF',
    ],
    flow: _FlowType = _Flow.BOURSE,
    top: int | str = '9999',
) -> _pl.LazyFrame:
    j = await _api(
        f'ClosingPrice/GetTradeTop/{category}/{flow}/{top}', fa=True
    )

    data = j['tradeTop']
    df = _pl.LazyFrame(data)

    # Check if the data has the 'instrument' field by looking at the first item
    if data and isinstance(data[0], dict) and 'instrument' in data[0]:
        # Drop top-level insCode if it exists (instrument has it, avoid duplication)
        df = df.drop('insCode', strict=False)
        df = df.unnest('instrument')

    return df
