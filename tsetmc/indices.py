from tsetmc import _api, _pl
from tsetmc.instruments import InstrumentInfo


async def last_state(i=1, /) -> _pl.LazyFrame:
    j = await _api(f'Index/GetIndexB1LastAll/All/{i}', fa=True)
    return _pl.LazyFrame(j['indexB1'])


class Index:
    __slots__ = 'code'

    def __init__(self, code: str | int):
        self.code = code

    async def info(self) -> InstrumentInfo:
        j = await _api(f'Instrument/GetInstrumentInfo/{self.code}', fa=True)
        return j['instrumentInfo']

    async def last_day_history(self) -> _pl.LazyFrame:
        j = await _api(f'Index/GetIndexB1LastDay/{self.code}', fa=True)
        df = _pl.LazyFrame(j['indexB1'])

        # Combine dEven and hEven into datetime
        # hEven needs to be zero-padded to 6 digits (e.g., 83000 -> 083000)
        df = df.with_columns(
            _pl.concat_str(
                [
                    _pl.col('dEven').cast(_pl.Utf8),
                    _pl.col('hEven').cast(_pl.Utf8).str.zfill(6),
                ]
            )
            .str.strptime(_pl.Datetime, format='%Y%m%d%H%M%S')
            .alias('datetime')
        ).drop(['dEven', 'hEven'])

        # Sort by datetime (like setting index)
        df = df.sort('datetime')

        return df

    async def history(self) -> _pl.LazyFrame:
        j = await _api(f'Index/GetIndexB2History/{self.code}', fa=True)
        df = _pl.LazyFrame(j['indexB2'])

        # Convert dEven to datetime
        df = df.with_columns(
            _pl.col('dEven')
            .cast(_pl.Utf8)
            .str.strptime(_pl.Datetime, format='%Y%m%d')
            .alias('date')
        ).drop('dEven')

        # Sort by date (like setting index)
        df = df.sort('date')

        return df

    async def companies(self) -> dict[str, _pl.LazyFrame]:
        j = await _api(f'ClosingPrice/GetIndexCompany/{self.code}', fa=True)

        # Convert indexCompany with flattening
        index_company = _pl.LazyFrame(j['indexCompany'])

        # Flatten instrument struct if it exists
        if (
            j['indexCompany']
            and isinstance(j['indexCompany'][0], dict)
            and 'instrument' in j['indexCompany'][0]
        ):
            index_company = index_company.drop('insCode', strict=False)
            index_company = index_company.unnest('instrument')

        # Convert relatedCompanyThirtyDayHistory
        related_history = _pl.LazyFrame(j['relatedCompanyThirtyDayHistory'])

        return {
            'indexCompany': index_company,
            'relatedCompanyThirtyDayHistory': related_history,
        }
