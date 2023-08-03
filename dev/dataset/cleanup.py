from asyncio import as_completed, run
from logging import basicConfig, info
from re import compile as rc

# noinspection PyProtectedMember
from tsetmc import _DataFrame

# noinspection PyProtectedMember
from tsetmc.dataset import _CS_EXCLUSIONS, _dump

# noinspection PyProtectedMember
from tsetmc.instruments import Instrument, _LazyDS

basicConfig(level='INFO', force=True)
is_commodity_certificate_of_deposit = rc(r'(\d{4}پ|\dن)\d\d+$').search

TO_BE_REMOVED = []
CHECKED = {*()}


async def check(l18: str):
    if l18 in CHECKED:
        return
    inst = await Instrument.from_l18(l18)
    i = await inst.info()
    if (
        (await inst.cs) in _CS_EXCLUSIONS
        or i['flow'] == 3
        or i['flowTitle'] == 'بازار اوراق بدهی'
        or is_commodity_certificate_of_deposit(l18)
    ):
        TO_BE_REMOVED.append(l18)
        info(f'marked {l18} for removal')
    CHECKED.add(l18)


async def main():
    df = _LazyDS.df
    for coro in as_completed([check(l18) for l18 in df['l18']]):
        await coro
    info(f'{len(TO_BE_REMOVED) = }')
    df = df[~df['l18'].isin(TO_BE_REMOVED)]
    _dump(df)


run(main())
