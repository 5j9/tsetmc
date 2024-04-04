from polars import Date as _Date, String as _String, Time as _Time

from tsetmc import _api, _DataFrame
from tsetmc.instruments import InstrumentInfo


async def last_state(i=1, /) -> _DataFrame:
    j = await _api(f'Index/GetIndexB1LastAll/All/{i}', fa=True)
    return _DataFrame(j['indexB1'])


class Index:
    __slots__ = 'code'

    def __init__(self, code: str | int):
        self.code = code

    async def info(self) -> InstrumentInfo:
        j = await _api(f'Instrument/GetInstrumentInfo/{self.code}', fa=True)
        return j['instrumentInfo']

    async def last_day_history(self) -> _DataFrame:
        j = await _api(f'Index/GetIndexB1LastDay/{self.code}', fa=True)
        df = _DataFrame(
            j['indexB1'], schema_overrides={'dEven': _String, 'hEven': _String}
        )
        return df.with_columns(
            df['dEven'].str.strptime(_Date, '%Y%m%d'),
            df['hEven'].str.pad_start(6, '0').str.strptime(_Time, '%H%M%S'),
        )

    async def history(self) -> _DataFrame:
        j = await _api(f'Index/GetIndexB2History/{self.code}', fa=True)
        df = _DataFrame(j['indexB2'], schema_overrides={'dEven': _String})
        return df.with_columns(df['dEven'].str.strptime(_Date, '%Y%m%d'))

    async def companies(self) -> dict[str, _DataFrame]:
        j = await _api(f'ClosingPrice/GetIndexCompany/{self.code}', fa=True)
        df = _DataFrame(j['indexCompany']).drop('insCode')
        if (
            not df.is_empty()
        ):  # some indices like 36-مبلمان - بازار بورس may be empty
            df = df.unnest('instrument')
        j['indexCompany'] = df
        j['relatedCompanyThirtyDayHistory'] = _DataFrame(
            j['relatedCompanyThirtyDayHistory']
        )
        return j
