from types import NoneType

import polars as pl
from pytest import warns
from pytest_aiohutils import file

from tsetmc.instruments import Instrument


def assert_page_data(
    d, general=True, trade_history=False, related_companies=False
):
    if trade_history:
        lf_trade_history = d.pop('trade_history')

        # Materialize the LazyFrame to assert schema state
        df_trade_history = lf_trade_history.collect()

        assert [*df_trade_history.schema.items()] == [
            ('date', pl.Date),
            ('pc', pl.Float64),
            ('py', pl.Float64),
            ('pmin', pl.Float64),
            ('pmax', pl.Float64),
            ('tno', pl.Int64),
            ('tvol', pl.Int64),
            ('tval', pl.Float64),
        ]

    if related_companies:
        related_companies = d.pop('related_companies')
        assert type(related_companies) is list
        assert type(related_companies[0]) is Instrument

    if general:
        for k in ('sector_pe', 'sps'):
            assert type(d.pop(k)) in (float, NoneType)
        for k in ('eps', 'free_float'):
            assert type(d.pop(k)) in (int, NoneType)
        for k in ('bvol', 'cs', 'flow', 'month_average_volume', 'z'):
            assert type(d.pop(k)) is int
        for k in (
            'tmax',
            'tmin',
            'week_max',
            'week_min',
            'year_max',
            'year_min',
        ):
            assert type(d.pop(k)) is float
        assert d.keys() == {
            'cisin',
            'flow_name',
            'isin',
            'group_code',
            'l18',
            'l30',
            'sector_name',
        }
        assert all(type(v) is str for v in d.values())


@file('fmelli.html')
async def test_page_data():
    ins = Instrument(35425587644337450)
    assert getattr(ins, '_l18', None) is getattr(ins, '_l30', None) is None
    with warns(DeprecationWarning):
        d = await ins.page_data(True, True, True)  # pyright: ignore[reportDeprecated]

    # Assert type is LazyFrame instead of DataFrame before validation
    assert isinstance(d['trade_history'], pl.LazyFrame)
    assert_page_data(d, True, True, True)


@file('dey.html')
async def test_page_data_no_free_float():
    with warns(DeprecationWarning):
        d = await Instrument(44818950263583523).page_data()  # pyright: ignore[reportDeprecated]
    assert_page_data(d)


@file('kala.html')
async def test_page_data_no_eps():
    with warns(DeprecationWarning):
        d = await Instrument(44549439964296944).page_data()  # pyright: ignore[reportDeprecated]
    assert_page_data(d)


@file('khgostar.html')
async def test_page_data_negative_sector_pe():
    with warns(DeprecationWarning):
        d = await Instrument(48990026850202503).page_data()  # pyright: ignore[reportDeprecated]
    assert_page_data(d)
