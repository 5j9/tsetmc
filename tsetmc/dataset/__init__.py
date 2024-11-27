from asyncio import gather as _gather

from pandas import DataFrame as _Df, concat as _concat

from tsetmc import _logger
from tsetmc.instruments import Instrument as _Instrument, _LazyDS as LazyDS
from tsetmc.market_watch import market_watch_init as _market_watch_init

YVAL_EXCLUSIONS = {
    '306',  # مهرایران
    '327',  # شیشه01ن
}


def _dump(df: _Df):
    if not (l18 := df['l18']).is_unique:
        # happens when a symbol is promoted/demoted to another flow
        duplicated = l18.duplicated('last')
        df = df[~duplicated]
        _logger.info('Removed duplicated l18 values:\n%s', l18[duplicated])

    if not (codes := df.index).is_unique:
        duplicated = codes.duplicated('last')
        df = df[~duplicated]
        _logger.error('Removed duplicated codes:\n%s', codes[duplicated])

    df.sort_values('l18', inplace=True)
    df.to_csv(LazyDS.path, encoding='utf-8-sig', lineterminator='\n')


async def add_instrument(inst: _Instrument) -> None:
    # usually used in conjunction with Instrument.from_search
    code = inst.code
    info = await inst.info()
    df = LazyDS.df
    l18, l30 = info['lVal18AFC'], info['lVal30']
    new_row = [await inst.isin, await inst.cisin, l18, l30]
    try:
        row = df.loc[code]
    except KeyError:
        pass
    else:
        if [*row] == new_row:
            _logger.warning(f'{l18 = } already exists in dataset')
            return
    df.loc[code] = new_row
    _dump(df)


async def update(df: _Df | None = None) -> None:
    if df is None:
        mwi = await _market_watch_init(market_state=False, best_limits=False)
        df = mwi['prices']
    df = df[['l18', 'l30']][
        ~(
            df['yval'].isin(YVAL_EXCLUSIONS)
            | df['l18'].str.slice(-1).str.isdigit()
        )
    ]
    ds = LazyDS.df
    ds.update(df)  # update existing l18s/l30s
    new_items = df[~df.index.isin(ds.index)]

    if new_items.empty:
        _logger.info('No new entries were added by market watch.')
        return

    # add isin and cisin to new_items
    new_insts = [_Instrument(code) for code in new_items.index]
    await _gather(*[i.info() for i in new_insts])
    new_items['isin'] = [i._isin for i in new_insts]
    new_items['cisin'] = [i._cisin for i in new_insts]

    merged = LazyDS.df = _concat([ds, new_items])[
        ['isin', 'cisin', 'l18', 'l30']  # fix column order
    ]
    _dump(merged)
    _logger.info(f'{len(new_items)} new entries were added by market watch.')
