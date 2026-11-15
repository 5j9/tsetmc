from asyncio import gather, run

from tsetmc.dataset import _dump, lazy_ds
from tsetmc.instruments import Instrument


async def get_isin(l18: str):
    inst = await Instrument.from_l18(l18)
    ident = await inst.identity()
    return ident['instrumentID'], ident['cIsin']


async def main():
    df = lazy_ds.df
    coros = [get_isin(l18) for l18 in df['l18']]
    isin = await gather(*coros)
    df[['isin', 'cisin']] = isin
    _dump(df[['isin', 'cisin', 'l18', 'l30']])


run(main())
