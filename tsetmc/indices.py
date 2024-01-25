from pandas import (
    json_normalize as _json_normalize,
    to_datetime as _to_datetime,
)

from tsetmc import _api, _DataFrame
from tsetmc.instruments import InstrumentInfo


async def last_state(i=1, /) -> _DataFrame:
    j = await _api(f'Index/GetIndexB1LastAll/All/{i}', fa=True)
    return _DataFrame(j['indexB1'], copy=False)


class Index:
    __slots__ = 'code'

    def __init__(self, code: str | int):
        self.code = code

    async def info(self) -> InstrumentInfo:
        j = await _api(f'Instrument/GetInstrumentInfo/{self.code}', fa=True)
        return j['instrumentInfo']

    async def last_day_history(self) -> _DataFrame:
        j = await _api(f'Index/GetIndexB1LastDay/{self.code}', fa=True)
        df = _DataFrame(j['indexB1'])
        dt = _to_datetime(
            df.pop('dEven').astype(str) + df.pop('hEven').astype(str),
            format='%Y%m%d%H%M%S',
        )
        df.set_index(dt, inplace=True)
        return df

    async def history(self) -> _DataFrame:
        j = await _api(f'Index/GetIndexB2History/{self.code}', fa=True)
        df = _DataFrame(j['indexB2'])
        date = _to_datetime(df.pop('dEven'), format='%Y%m%d')
        df.set_index(date, inplace=True)
        return df

    async def companies(self) -> dict[str, _DataFrame]:
        j = await _api(f'ClosingPrice/GetIndexCompany/{self.code}', fa=True)
        j['indexCompany'] = _json_normalize(j['indexCompany'])
        j['relatedCompanyThirtyDayHistory'] = _DataFrame(
            j['relatedCompanyThirtyDayHistory']
        )
        return j
