from asyncio import as_completed, run
from re import compile as rc

# noinspection PyProtectedMember
from tsetmc import Session, _DataFrame

# noinspection PyProtectedMember
from tsetmc.dataset import _CS_EXCLUSIONS, _dump_l18s

# noinspection PyProtectedMember
from tsetmc.instruments import _L18S, Instrument

is_commodity_certificate_of_deposit = rc(r'(\d{4}پ|\dن)\d\d+$').search
l18_df = _DataFrame(_L18S, copy=False).T

REMOVABLES = []
RA = REMOVABLES.append
CHECKED = {*()}


async def check(l18: str):
    if l18 in CHECKED:
        return
    inst = await Instrument.from_l18(l18)
    info = await inst.info()
    if (
        inst.cs in _CS_EXCLUSIONS
        or info['flow'] == 3
        or info['flowTitle'] == 'بازار اوراق بدهی'
        or is_commodity_certificate_of_deposit(l18)
    ):
        RA(l18)
        _L18S.pop(l18)
        print(f'marked {l18} for removal')
    CHECKED.add(l18)


async def main():
    async with Session():
        for coro in as_completed([check(l18) for l18 in l18_df[1]]):
            await coro
        print(f'{len(REMOVABLES)=}')
        _dump_l18s()  # uses the modified _L18S


run(main())
