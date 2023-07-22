from logging import info as _info, warning as _warning

from tsetmc.instruments import Instrument as _Instrument, _LazyDS as LazyDS
from tsetmc.market_watch import market_watch_init as _market_watch_init

# cs == 69: اوراق تامين مالي
# cs == 59: اوراق حق تقدم استفاده از تسهيلات مسكن
_CS_EXCLUSIONS = {59, 69}

# see dev/tsetmc_source_files/market_watch.html
_YVAL_EXCLUSIONS = {
    # OraghMosharekat
    306,
    301,
    706,
    208,
    701,
    # گواهی سسپرده کالایی (سیمان/زعفران)
    327,
}


def _dump(df):
    if not df['code'].is_unique:
        dups = df['code'].duplicated(keep='last')
        _warning('%d non-unique code were found', len(dups))
        # Some of the newly added codes are not unique, remove old duplicates.
        df = df[~dups]

    assert df['l18'].is_unique

    df.sort_values('l18', inplace=True)
    df.to_csv(
        LazyDS.path, index=False, encoding='utf-8-sig', lineterminator='\n'
    )


async def add_instrument(inst: _Instrument) -> None:
    # usually used in conjunction with Instrument.from_search
    code = inst.code
    info = await inst.info()
    df = LazyDS.df
    l18, l30 = info['lVal18AFC'], info['lVal30']
    if (l1830 := LazyDS.l18_l130(code)) is not None:
        if l1830 == (l18, l30):
            _warning(f'{l18 = } already exists in dataset')
            return
    df.loc[len(df)] = [code, l18, l30]
    _dump(df)


async def update() -> None:
    mwi = await _market_watch_init(market_state=False, best_limits=False)
    prices = mwi['prices']
    # flow == 3: futures market
    prices = prices.query(
        'flow != 3 '
        'and cs not in @_CS_EXCLUSIONS '
        'and yval not in @_YVAL_EXCLUSIONS'
    )
    ds = LazyDS.df
    merged = LazyDS.cached_df = ds.merge(
        prices[['l18', 'l30']], how='left', copy=False
    )
    diff = len(merged) - len(ds)
    if diff:
        _dump(merged)
        _info(f'{diff} new entries were added by market watch.')
    else:
        _info('No new entries were added by market watch.')
