from logging import info as _info, warning as _warning

import pandas as _pd

from tsetmc.instruments import Instrument as _Instrument, _LazyDS as LazyDS
from tsetmc.market_watch import market_watch_init as _market_watch_init


def _dump(df: _pd.DataFrame):
    assert df['l18'].is_unique
    assert df['ins_code'].is_unique

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
    prices = prices[
        # cs == 69: اوراق تامين مالي. Currently مهرایران is the only exception of this
        # group that does not end with a digit.
        ~(prices['cs'] == '69')
        & ~(prices['l18'].str.slice(-1).str.isdigit())
    ]
    ds = LazyDS.df.set_index('l18')
    p = prices[['l18', 'l30']].reset_index().set_index('l18')
    ds.update(p)  # update existing l18s/l30s
    new_items = p[~p.index.isin(ds.index)]
    merged = LazyDS.cached_df = _pd.concat([ds, new_items]).reset_index()[
        ['ins_code', 'l18', 'l30']  # fix column order
    ]
    if diff := len(new_items):
        _dump(merged)
        _info(f'{diff} new entries were added by market watch.')
    else:
        _info('No new entries were added by market watch.')
