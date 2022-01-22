from pandas import concat as _concat, read_json as _read_json

from tsetmc import _get, _get_par_tree, _read_html, _DataFrame, _StringIO


def boards() -> dict[int, str]:
    # Also, available at http://en.tsetmc.com/Loader.aspx?ParTree=121C1913.
    iloc = _read_html(_get_par_tree('111C1913'), header=0)[0].iloc
    return dict(zip(iloc[:, 0], iloc[:, 1]))


def cs_codes() -> dict[str, str]:
    iloc = _read_html(_get_par_tree('111C1213'), header=0)[0].iloc
    return dict(zip(iloc[:, 0], iloc[:, 1]))


def industrial_groups_overview() -> _DataFrame:
    """Return a dataframe of industrial groups.

     The result contains info about each group's price change.
     See: http://www.tsetmc.com/Loader.aspx?ParTree=111C1214
     """
    df = _read_html(_get_par_tree('111C1214'))[0]
    show = df[1]
    df.drop(columns=1, inplace=True)
    percents = show.str.extract(
        r"showBar\('[^\[]*',(\d+),(\d+),(\d+),(\d+)\)"
    ).astype('int64')
    df = _concat((df, percents), copy=False, axis=1)
    df.columns = ('group', ':-2', '-2:0', '0:2', '2:')
    return df


def market_map_data() -> _DataFrame:
    text = _get('http://new.tsetmc.com/weatherforecast', fa=True)
    df: _DataFrame = _read_json(_StringIO(text), convert_dates=False)
    comma_nums = ('QTotCap', 'QTotTran5J', 'ZTotTran')
    for c in comma_nums:
        df[c] = df[c].str.replace(
            ',', '', regex=False
        ).astype('int64', copy=False)
    return df
