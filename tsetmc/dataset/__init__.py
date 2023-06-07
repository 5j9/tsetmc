from logging import info

from tsetmc import _DataFrame
from tsetmc.instruments import _DS_PATH, _L18S, Instrument as _Instrument
from tsetmc.market_watch import market_watch_init as _market_watch_init

# todo: add tests for this module

# cs == 69: اوراق تامين مالي
# cs == 59: اوراق حق تقدم استفاده از تسهيلات مسكن
_CS_EXCLUSIONS = {59, 69}

# see dev/tsetmc_source_files/market_watch.html
_YVAL_EXCLUSIONS = {
    # OraghMosharekat
    306, 301, 706, 208, 701,
    # گواهی سسپرده کالایی (سیمان/زعفران)
    327,
}


def _dump_l18s():
    cols = ['code', 'l18', 'l30']
    df = _DataFrame(_L18S.values(), columns=cols, copy=False)

    if not df['code'].is_unique:
        # Some of the newly added codes are not unique, remove old duplicates.
        df = df[~df['code'].duplicated(keep='last')]

    assert df['l18'].is_unique

    df.sort_values('l18', inplace=True)
    df.to_csv(
        _DS_PATH, index=False, encoding='utf-8-sig', lineterminator='\n'
    )


async def add_instrument(inst: _Instrument) -> None:
    # usually used in conjunction with Instrument.from_search
    code = inst.code
    info = await inst.info()
    # isin = df.at['کد 12 رقمی نماد', 1]
    l18 = info['lVal18AFC']
    _L18S[l18] = code, l18, info['lVal30']
    _dump_l18s()


async def update() -> None:
    global _L18S
    mwi = await _market_watch_init(market_state=False, best_limits=False)
    df = mwi['prices']
    # flow == 3: futures market
    df = df.query('flow != 3 and cs not in @_CS_EXCLUSIONS and yval not in @_YVAL_EXCLUSIONS')
    glv = df.index.get_level_values
    codes = glv('ins_code')
    l18s = glv('l18')
    l30s = glv('l30')
    # zip create an iterator which will be consumed on the first run
    values = *zip(codes, l18s, l30s),
    old_len = len(_L18S)
    _L18S |= zip(l18s, values)
    diff = len(_L18S) - old_len
    if diff:
        _dump_l18s()
        info(f'{diff} new entries were added by market watch.')
    else:
        info('No new entries were added by market watch.')
