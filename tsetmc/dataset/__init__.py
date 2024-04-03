import polars as _pl
from polars import col as _col

from tsetmc import _logger
from tsetmc.instruments import Instrument as _Instrument, _LazyDS as LazyDS
from tsetmc.market_watch import market_watch_init as _market_watch_init

YVAL_EXCLUSIONS = {
    306,  # مهرایران
    327,  # شیشه01ن
}


def _dump(df: _pl.DataFrame):
    assert df['l18'].is_unique
    codes = df['ins_code'].unique()
    try:
        assert codes.is_unique
    except AssertionError:
        duplicated = codes.filter(~codes.is_unique()).unique()
        _logger.error('duplicated ins_codes:\n%s', codes[duplicated])
        df = df.filter(~_col('ins_code').unique())

    df.sort('l18').write_csv(LazyDS.path, include_bom=True)


async def add_instrument(inst: _Instrument) -> None:
    # usually used in conjunction with Instrument.from_search
    code = inst.code
    info = await inst.info()
    df = LazyDS.df
    l18, l30 = info['lVal18AFC'], info['lVal30']
    if (l1830 := LazyDS.l18_l130(code)) is not None:
        if l1830 == (l18, l30):
            _logger.warning(f'{l18 = } already exists in dataset')
            return
    df.loc[len(df)] = [code, l18, l30]
    _dump(df)


async def update(df: _pl.DataFrame = None) -> None:
    if df is None:
        mwi = await _market_watch_init(market_state=False, best_limits=False)
        df = mwi['prices']
    df = df.filter(
        ~(
            _pl.col('yval').is_in(YVAL_EXCLUSIONS)
            | _pl.col('l18').str.contains(r'\d$')
        )
    )
    og_ds = LazyDS.df
    new_ds = og_ds.join(
        df.select(['l18', 'l30', 'ins_code']), on='l18', how='outer'
    ).with_columns(
        _pl.col('ins_code_right')
        .fill_null(_pl.col('ins_code'))
        .alias('ins_code'),
        _pl.col('l30_right').fill_null(_pl.col('l30')).alias('l30'),
    )
    new_ds = new_ds[['ins_code', 'l18', 'l30']]  # fix column order
    if diff := len(new_ds) - len(og_ds):
        _dump(new_ds)
        _logger.info(f'{diff} new entries were added by market watch.')
    else:
        _logger.info('No new entries were added by market watch.')
