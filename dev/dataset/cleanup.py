from asyncio import as_completed, run

from polars import col

from tsetmc.dataset import YVAL_EXCLUSIONS, _dump, lazy_ds
from tsetmc.instruments import Instrument

TO_BE_REMOVED = []
CHECKED: set = {*()}


async def check(l18: str):
    if l18 in CHECKED:
        return
    inst = await Instrument.from_l18(l18)
    i = await inst.info()
    if i['yVal'] in YVAL_EXCLUSIONS:
        TO_BE_REMOVED.append(l18)
        print(f'marked {l18} for removal')
    CHECKED.add(l18)


async def main():
    df = lazy_ds.df
    for coro in as_completed([check(l18) for l18 in df['l18']]):
        await coro
    print(f'{len(TO_BE_REMOVED) = }')
    if not TO_BE_REMOVED:
        return
    df = df.filter(~col('l18').is_in(TO_BE_REMOVED))
    _dump(df)


run(main())
