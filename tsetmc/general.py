from pandas import concat as _concat, read_json as _read_json, NA as _NA
from bs4 import BeautifulSoup as _BeautifulSoup

from tsetmc import _get, _get_par_tree, _numerize, _read_html, _DataFrame, \
    _StringIO, \
    _partial


_make_soup = _partial(_BeautifulSoup, features='lxml')


async def boards() -> dict[int, str]:
    """See http://en.tsetmc.com/Loader.aspx?ParTree=121C1913."""
    content = await _get_par_tree('111C1913')
    iloc = _read_html(content, header=0)[0].iloc
    return dict(zip(iloc[:, 0], iloc[:, 1]))


async def cs_codes() -> dict[str, str]:
    content = await _get_par_tree('111C1213')
    iloc = _read_html(content, header=0)[0].iloc
    return dict(zip(iloc[:, 0], iloc[:, 1]))


async def industrial_groups_overview() -> _DataFrame:
    """Return a dataframe of industrial groups.

     The result contains info about each group's price change.
     See: http://www.tsetmc.com/Loader.aspx?ParTree=111C1214
     """
    content = await _get_par_tree('111C1214')
    df = _read_html(content)[0]
    show = df[1]
    df.drop(columns=1, inplace=True)
    percents = show.str.extract(
        r"showBar\('[^\[]*',(\d+),(\d+),(\d+),(\d+)\)"
    ).astype('int64')
    df = _concat((df, percents), copy=False, axis=1)
    df.columns = ('group', ':-2', '-2:0', '0:2', '2:')
    return df


async def market_map_data() -> _DataFrame:
    text = await _get('http://new.tsetmc.com/weatherforecast', fa=True)
    df: _DataFrame = _read_json(_StringIO(text), convert_dates=False)
    comma_nums = ('QTotCap', 'QTotTran5J', 'ZTotTran')
    for c in comma_nums:
        df[c] = df[c].str.replace(
            ',', '', regex=False
        ).astype('int64', copy=False)
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
            ins_code = int(href[href.rfind('=') + 1:])
            l30 = inst_div.text

        holder = td0.select_one('li').text
        # noinspection PyUnboundLocalVariable
        append_row([ins_code, l30, holder, *_parse_tds(tds)])
    return _DataFrame(rows, copy=False, columns=(
        'ins_code', 'l30', 'holder', *(
            # the first header is 'شرکت - سهامدار'
            th.text for th in trs[0].select('th')[1:]
        )
    ))


async def top_industry_groups() -> _DataFrame:
    """http://www.tsetmc.com/Loader.aspx?Partree=15131O"""
    text = await _get_par_tree('15131O')
    df = _read_html(text)[0]
    df.columns = ['group', 'mv', 'tno', 'tvol', 'tval']
    _numerize(df, ('mv', 'tvol', 'tval'), float, comma=True)
    return df


def _parse_tds(tds):
    for td in tds[1:]:
        text = td.find(text=True)
        try:
            yield float(text.replace(',', ''))
        except ValueError:
            if td == '\xa0':
                yield _NA
