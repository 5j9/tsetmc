from __future__ import annotations as _

from asyncio import gather as _gather
from functools import cache as _cache, cached_property
from pathlib import Path as _Path
from typing import Literal as _Literal, NamedTuple as _NamedTuple

import polars as _pl

from tsetmc import _logger, instruments as _instruments
from tsetmc.market_watch import market_watch_init as _market_watch_init

YVAL_EXCLUSIONS = {
    '306',  # مهرایران
    '327',  # شیشه01ن
}


class _LookUpResult(_NamedTuple):
    code: str
    l18: str
    l30: str
    cisin: str
    isin: str


_DS_SCHEMA = {
    'ins_code': _pl.String,
    'isin': _pl.String,
    'cisin': _pl.String,
    'l18': _pl.String,
    'l30': _pl.String,
}


class _LazyDS:
    path = _Path(__file__).parent / 'dataset.csv'

    def clear_cache(self) -> None:
        pop = vars(self).pop
        pop('lf', None)
        pop('df', None)
        pop('_lookup_list', None)
        self.as_dict.cache_clear()

    @cached_property
    def lf(self) -> _pl.LazyFrame:
        return _pl.scan_csv(
            self.path,
            low_memory=False,
            eol_char='\n',
            schema=_DS_SCHEMA,
            encoding='utf8',
        )

    @cached_property
    def df(self) -> _pl.DataFrame:
        df = self.lf.collect()
        self.lf = df.lazy()  # avoid disk read in future calls
        return df

    @cached_property
    def _lookup_list(self) -> list[_LookUpResult]:
        return [
            _LookUpResult(code, l18, l30, cisin, isin)
            for l18, l30, code, cisin, isin in self.df.select(
                'l18', 'l30', 'ins_code', 'cisin', 'isin'
            ).iter_rows()
        ]

    @_cache
    def as_dict(
        self, key: _Literal['code', 'l18', 'l30', 'cisin', 'isin']
    ) -> dict[str, _LookUpResult]:
        return {getattr(ll, key): ll for ll in self._lookup_list}


lazy_ds = _LazyDS()


def _dump(df: _pl.DataFrame):
    if not df['l18'].is_unique().all():
        # Identify group keys that possess duplicate records
        duplicate_l18s = (
            df.group_by('l18')
            .agg(_pl.len())
            .filter(_pl.col('len') > 1)
            .get_column('l18')
        )
        df = df.unique(subset='l18', keep='last')
        _logger.info(
            'Removed duplicated l18 values:\n%s', duplicate_l18s.to_list()
        )

    if not df['ins_code'].is_unique().all():
        # Identify group keys that possess duplicate records
        duplicate_codes = (
            df.group_by('ins_code')
            .agg(_pl.len())
            .filter(_pl.col('len') > 1)
            .get_column('ins_code')
        )
        df = df.unique(subset='ins_code', keep='last')
        _logger.error(
            'Removed duplicated codes:\n%s', duplicate_codes.to_list()
        )

    df.sort('l18').write_csv(lazy_ds.path, include_header=True)


async def add_instrument(inst: _instruments.Instrument) -> None:
    # usually used in conjunction with Instrument.from_search
    code = inst.code
    info = await inst.info()
    df = lazy_ds.df
    l18, l30 = info['lVal18AFC'], info['lVal30']
    new_row_df = _pl.DataFrame(
        {
            'ins_code': [code],
            'isin': [await inst.isin],
            'cisin': [await inst.cisin],
            'l18': [l18],
            'l30': [l30],
        },
        schema=_DS_SCHEMA,
    )

    try:
        row = lazy_ds.as_dict('code')[code]
    except KeyError:
        pass
    else:
        if new_row_df.row() == (
            row.code,
            row.isin,
            row.cisin,
            row.l18,
            row.l30,
        ):
            _logger.warning(f'{l18 = } already exists in dataset')
            return

    df = _pl.concat([df, new_row_df])
    _dump(df)
    lazy_ds.clear_cache()
    lazy_ds.df = df
    lazy_ds.lf = df.lazy()


async def update(df: _pl.DataFrame | None = None) -> None:
    if df is None:
        mwi = await _market_watch_init(market_state=False, best_limits=False)
        df = mwi['prices'].collect()

    # Filter incoming df: exclude YVAL_EXCLUSIONS and strings ending with a digit
    df = df.filter(
        ~(
            _pl.col('yval').is_in(YVAL_EXCLUSIONS)
            | _pl.col('l18').str.contains(r'\d$')
        )
    ).select(['ins_code', 'l18', 'l30'])

    # Access current dataset from lazy_ds
    ds = lazy_ds.df

    # --- 1. Identify New Rows ---
    # Rows in incoming `df` whose `ins_code` doesn't exist in `ds`
    new_rows = df.join(ds, on='ins_code', how='anti')

    # --- 2. Identify Changed Rows ---
    # Join incoming df with existing ds to check if existing l18 or l30 modified
    existing_updates = df.join(
        ds.select('ins_code'), on='ins_code', how='semi'
    )

    # Compare matching codes to see if values actually differ
    comparison = existing_updates.join(ds, on='ins_code', suffix='_old')
    changed_rows = comparison.filter(
        (_pl.col('l18') != _pl.col('l18_old'))
        | (_pl.col('l30') != _pl.col('l30_old'))
    )

    if len(new_rows) == 0 and len(changed_rows) == 0:
        _logger.info(
            'No new/changed entries after updating using market watch.'
        )
        return

    # --- 3. Update Existing Records (Simulating ds.update) ---
    if len(changed_rows) > 0:
        # Join existing ds with incoming updates and overwrite matching l18/l30 values
        ds = (
            ds.join(df, on='ins_code', how='left', suffix='_new')
            .with_columns(
                [
                    _pl.col('l18_new').fill_null(_pl.col('l18')).alias('l18'),
                    _pl.col('l30_new').fill_null(_pl.col('l30')).alias('l30'),
                ]
            )
            .drop(['l18_new', 'l30_new'])
        )

    # --- 4. Fetch Meta & Construct New Rows ---
    if len(new_rows) > 0:
        new_insts = [
            _instruments.Instrument(code) for code in new_rows['ins_code']
        ]
        await _gather(*[i.info() for i in new_insts])

        # Pull asynchronous lists safely
        isins = [i._isin for i in new_insts]
        cisins = [i._cisin for i in new_insts]

        new_rows = new_rows.with_columns(
            [
                _pl.Series('isin', isins, dtype=_pl.String),
                _pl.Series('cisin', cisins, dtype=_pl.String),
            ]
        )

        # Concat new records to dataset (explicitly ensuring schema alignment)
        merged = _pl.concat([ds, new_rows.select(ds.columns)])
    else:
        merged = ds

    # --- 5. Save and Cache Synchronization ---
    _dump(merged)

    # Update the cache directly in memory instead of clearing it entirely
    lazy_ds.clear_cache()
    lazy_ds.df = merged
    lazy_ds.lf = merged.lazy()

    _logger.info(
        f'{len(new_rows)} new and {len(changed_rows)} changed '
        'entries after update using market watch.'
    )
