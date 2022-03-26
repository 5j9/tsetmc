__version__ = '0.42.0'

from json import loads
from typing import TypedDict as _TypedDict
from functools import partial as _partial
from re import compile as _rc
# noinspection PyUnresolvedReferences
from re import findall as _findall
# noinspection PyUnresolvedReferences
from io import BytesIO as _BytesIO, StringIO as _StringIO

from jdatetime import datetime as _jdatetime
from pandas import read_csv as _read_csv, DataFrame as _DataFrame
# noinspection PyUnresolvedReferences
from pandas import to_numeric as _to_numeric, read_html as _read_html
from aiohttp import ClientSession as _ClientSession, \
    ClientTimeout as _ClientTimeout, TCPConnector as _TCPConnector


_csv2df = _partial(_read_csv, low_memory=False, engine='c', lineterminator=';')
_F = r'(-?\d+(?:\.\d+)?)'  # float pattern


_INDEX_CHANGE_MATCH = _rc(rf"<div[^>]*>(\()?{_F}\)?</div>(?: {_F}%)?").match
_INDEX_TIMESTAMP_MATCH = _rc(r'(\d\d)/(\d+)/(\d+) (\d\d):(\d\d):(\d\d)').match


_DF = _partial(_DataFrame, copy=False)


_jstrptime = _jdatetime.strptime


class _MarketState(_TypedDict, total=False):
    datetime: _jdatetime
    tset_status: str
    tset_index: float
    tset_index_change: float
    tse_tvol: float
    tse_tval: float
    tse_tno: float
    fb_status: str
    fb_tvol: float
    fb_tval: float
    fb_tno: int
    derivatives_status: int


def _parse_market_state(s: str) -> _MarketState:
    datetime, tse_status, tse_index, tse_index_change \
        , tse_value, tse_tvol, tse_tval, tse_tno \
        , fb_status, fb_tvol, fb_tval, fb_tno \
        , derivatives_status, derivatives_tvol, derivatives_tval, derivatives_tno \
        , _ = s.split(',')
    index_change_match = _INDEX_CHANGE_MATCH(tse_index_change)
    tse_index_change = float(index_change_match[2])
    if index_change_match[1] is not None:  # negative value
        tse_index_change *= -1
    timestamp_match = _INDEX_TIMESTAMP_MATCH(datetime)
    result = {
        'datetime': _jdatetime(
            1400 + int(timestamp_match[1]), int(timestamp_match[2])
            , int(timestamp_match[3]), int(timestamp_match[4])
            , int(timestamp_match[5]), int(timestamp_match[6]))
        , 'tse_status': tse_status
        , 'tse_index': float(tse_index)
        , 'tse_index_change': tse_index_change
        , 'tse_tvol': float(tse_tvol)
        , 'tse_tval': float(tse_tval)
        , 'tse_tno': float(tse_tval)
        , 'fb_status': fb_status
        , 'fb_tvol': float(fb_tvol)
        , 'fb_tval': float(fb_tval)
        , 'fb_tno': int(fb_tno)
        , 'derivatives_status': derivatives_status
        , 'derivatives_tvol': float(derivatives_tvol)
        , 'derivatives_tval': float(derivatives_tval)
        , 'derivatives_tno': int(derivatives_tno)}
    if tse_value:
        result['tse_value'] = float(tse_value)
    if (m3 := index_change_match[3]) is not None:
        result['tse_index_change_percent'] = float(m3)
    return result


def _parse_ombud_messages(text) -> _DataFrame:
    headers = _findall(r'<th>(.+?)</th>', text)
    dates = _findall(r"<th class='ltr'>(.+?)</th>", text)
    descriptions = _findall(r'<td colspan="2">(.+?)<hr />\s*</td>', text)
    df = _DF({
        'header': headers, 'date': dates, 'description': descriptions
    }, dtype='string')
    if dates:  # pandas cannot do ('14' + df['date']) on empty dates
        df['date'] = ('14' + df['date']).apply(
            _jstrptime, format='%Y/%m/%d %H:%M')
    else:
        df['date'] = df['date'].astype(object)
    return df


SESSION : _ClientSession | None = None


class Session:
    """Create and return a ClientSession object.

    Use
    ``ClientTimeout(total=30., sock_connect=5., sock_read=5.)``
    as the default timeout and
    ``TCPConnector(limit_per_host=1, keepalive_timeout=120.)``
    as the default connector.
    """

    def __new__(cls, *args, **kwargs) -> _ClientSession:
        global SESSION
        if 'timeout' not in kwargs:
            kwargs['timeout'] = _ClientTimeout(total=30., sock_connect=5., sock_read=5.)
        if 'connector' not in kwargs:
            kwargs['connector'] = _TCPConnector(limit_per_host=1, keepalive_timeout=120.)
        SESSION = _ClientSession(**kwargs)
        return SESSION


_FARSI_NORM = ''.maketrans('يك', 'یک')


# this function should only be called from _get below
async def _session_get(url: str) -> bytes:
    return await (await SESSION.get(url)).read()


async def _get(url: str, *, fa=False) -> str | bytes:
    content = await _session_get(url)
    if fa is True:
        return content.decode().translate(_FARSI_NORM)
    return content


_DOMAIN = 'http://tsetmc.com/'
# API does not work on www domain
_API = 'http://cdn.tsetmc.com/api/'


async def _get_data(path: str, *, fa=False) -> str | bytes:
    return await _get(f'{_DOMAIN}tsev2/data/' + path, fa=fa)


async def _get_par_tree(path: str, *, fa=True) -> str | bytes:
    return await _get(f'{_DOMAIN}Loader.aspx?ParTree={path}', fa=fa)


async def _api(path: str):
    return loads(await _get(f'{_API}{path}'))


def _numerize(df: _DataFrame, cols: tuple[str, ...], astype=float, comma=False):
    for col in cols:
        c = df[col]
        if comma is True:
            c = c.str.replace(',', '')
        # https://stackoverflow.com/a/39684629/2705757
        df[col] = (
            c.replace(r' [KMB]$', '', regex=True).astype(astype)
        ) * c.str.extract(r'[\d\.]+([KMBT]+)', expand=False).fillna(1).replace(
            ['K', 'M', 'B', 'T'], [10 ** 3, 10 ** 6, 10 ** 9, 10 ** 12]
        )
