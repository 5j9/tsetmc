__version__ = '0.63.1'

from functools import partial as _partial
from json import JSONDecodeError, loads
from logging import getLogger as _getLogger
from re import compile as _rc, findall as _findall
from typing import TypedDict as _TypedDict

from aiohutils.session import SessionManager
from jdatetime import datetime as _jdatetime
from pandas import (
    NA as _NA,
    DataFrame as _DataFrame,
    options as _o,
    read_csv as _read_csv,
)

_logger = _getLogger(__name__)
_o.mode.copy_on_write = True
_o.future.infer_string = True
_o.future.no_silent_downcasting = True
_csv2df = _partial(_read_csv, low_memory=False, engine='c', lineterminator=';')
_F = r'(-?\d+(?:\.\d+)?)'  # float pattern


_INDEX_CHANGE_MATCH = _rc(rf'<div[^>]*>(\()?{_F}\)?</div>(?: {_F}%)?').match
_INDEX_TIMESTAMP_MATCH = _rc(r'(\d\d)/(\d+)/(\d+) (\d\d):(\d\d):(\d\d)').match


_jstrptime = _jdatetime.strptime


class MarketState(_TypedDict, total=False):
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


class Eps(_TypedDict):
    epsValue: None
    estimatedEPS: str | None
    sectorPE: float
    psr: float


class Sector(_TypedDict):
    dEven: int
    cSecVal: str
    lSecVal: str


class StaticThreshold(_TypedDict):
    insCode: None
    dEven: int
    hEven: int
    psGelStaMax: float
    psGelStaMin: float


class InstrumentInfo(_TypedDict):
    eps: Eps
    sector: Sector
    staticThreshold: StaticThreshold
    minWeek: float
    maxWeek: float
    minYear: float
    maxYear: float
    qTotTran5JAvg: float
    kAjCapValCpsIdx: str
    dEven: int
    topInst: int
    faraDesc: str
    contractSize: int
    nav: float
    underSupervision: int
    cValMne: None
    lVal18: str
    cSocCSAC: None
    lSoc30: None
    yMarNSC: None
    yVal: str
    insCode: str
    lVal30: str
    lVal18AFC: str
    flow: int
    cIsin: str
    zTitad: float
    baseVol: int
    instrumentID: str
    cgrValCot: str
    cComVal: str
    lastDate: int
    sourceID: int
    flowTitle: str
    cgrValCotTitle: str


def _parse_market_state(s: str) -> MarketState:
    (
        datetime,
        tse_status,
        tse_index,
        tse_index_change,
        tse_value,
        tse_tvol,
        tse_tval,
        tse_tno,
        fb_status,
        fb_tvol,
        fb_tval,
        fb_tno,
        derivatives_status,
        derivatives_tvol,
        derivatives_tval,
        derivatives_tno,
        _,
    ) = s.split(',')
    if tse_index_change:  # can be '' before market start
        index_change_match = _INDEX_CHANGE_MATCH(tse_index_change)
        tse_index_change = float(index_change_match[2])
        if index_change_match[1] is not None:  # negative value
            tse_index_change *= -1
        if (m3 := index_change_match[3]) is not None:
            tse_index_change_percent = float(m3)
        else:
            tse_index_change_percent = None
    else:
        tse_index_change_percent = None
    timestamp_match = _INDEX_TIMESTAMP_MATCH(datetime)
    result = {
        'datetime': _jdatetime(
            1400 + int(timestamp_match[1]),
            int(timestamp_match[2]),
            int(timestamp_match[3]),
            int(timestamp_match[4]),
            int(timestamp_match[5]),
            int(timestamp_match[6]),
        ),
        'tse_status': tse_status,
        'tse_index': float(tse_index),
        'tse_index_change': tse_index_change,
        'tse_tvol': float(tse_tvol),
        'tse_tval': float(tse_tval),
        'tse_tno': float(tse_tval),
        'fb_status': fb_status,
        'fb_tvol': float(fb_tvol),
        'fb_tval': float(fb_tval),
        'fb_tno': int(fb_tno),
        'derivatives_status': derivatives_status,
        'derivatives_tvol': float(derivatives_tvol),
        'derivatives_tval': float(derivatives_tval),
        'derivatives_tno': int(derivatives_tno),
        'tse_index_change_percent': tse_index_change_percent,
        'tse_value': float(tse_value) if tse_value else None,
    }
    return result


def _parse_ombud_messages(text) -> _DataFrame:
    headers = _findall(r'<th>(.+?)</th>', text)
    dates = _findall(r"<th class='ltr'>(.+?)</th>", text)
    descriptions = _findall(r'<td colspan="2">(.+?)<hr />\s*</td>', text)
    df = _DataFrame(
        {'header': headers, 'date': dates, 'description': descriptions},
        dtype='string',
        copy=False,
    )
    if dates:  # pandas cannot do ('14' + df['date']) on empty dates
        df['date'] = ('14' + df['date']).apply(
            _jstrptime, format='%Y/%m/%d %H:%M'
        )
    else:
        df['date'] = df['date'].astype(object)
    return df


session_manager = SessionManager()


_FARSI_NORM = ''.maketrans('يك', 'یک')
_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0'
}


# this function should only be called from _get below
async def _session_get(url: str) -> bytes:
    r = await session_manager.get(url, headers=_HEADERS)
    return await r.read()


_LAST_CONTENT: bytes


async def _get(url: str, *, fa=False) -> str | bytes:
    global _LAST_CONTENT
    _LAST_CONTENT = content = await _session_get(url)
    if fa is True:
        content = content.decode().translate(_FARSI_NORM)
    return content


_DOMAIN = 'http://old.tsetmc.com/'
# API does not work on www domain
_API = 'https://cdn.tsetmc.com/api/'


async def _get_data(path: str, *, fa=False) -> str | bytes:
    return await _get(f'{_DOMAIN}tsev2/data/' + path, fa=fa)


async def _get_par_tree(path: str, *, fa=True) -> str | bytes:
    return await _get(f'{_DOMAIN}Loader.aspx?ParTree={path}', fa=fa)


async def _api(path: str, *, fa=False):
    content = await _get(f'{_API}{path}', fa=fa)
    try:
        return loads(content)
    except JSONDecodeError:
        _logger.error(f'url={_API}{path}\n{content=}')
        raise


def _numerize(
    df: _DataFrame, cols: tuple[str, ...], astype=float, comma=False
):
    for col in cols:
        c = df[col]
        if comma is True:
            c = c.str.replace(',', '')
        # https://stackoverflow.com/a/39684629/2705757
        df[col] = (
            c.replace(r' [KMB]$', '', regex=True).astype(astype)
        ) * c.str.extract(r'[\d\. ]+([KMBT]+)', expand=False).map(
            {
                _NA: 1,
                'K': 10**3,
                'M': 10**6,
                'B': 10**9,
                'T': 10**12,
            }
        ).astype(astype)


def _save_last_content(msg: str, /):
    from pathlib import Path

    f = Path(__file__).parent / '~last_response.html'
    with f.open('wb'):
        f.write_bytes(_LAST_CONTENT)
    _logger.error(f'{msg}; _LAST_CONTENT saved in {f}', stacklevel=2)
