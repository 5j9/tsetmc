from asyncio import as_completed, run
from logging import basicConfig, info

from tsetmc.dataset import YVAL_EXCLUSIONS, LazyDS, _dump
from tsetmc.instruments import Instrument

basicConfig(level='INFO', force=True)

TO_BE_REMOVED = []
CHECKED = {*()}


async def check(l18: str):
    if l18 in CHECKED:
        return
    inst = await Instrument.from_l18(l18)
    i = await inst.info()
    if i['yVal'] in YVAL_EXCLUSIONS:
        TO_BE_REMOVED.append(l18)
        info(f'marked {l18} for removal')
    CHECKED.add(l18)


async def main():
    df = LazyDS.df
    for coro in as_completed([check(l18) for l18 in df['l18']]):
        await coro
    info(f'{len(TO_BE_REMOVED) = }')
    df = df.filter(~df['l18'].is_in(TO_BE_REMOVED))
    _dump(df)


run(main())
