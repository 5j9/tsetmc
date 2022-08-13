from re import compile as rc
from asyncio import run, as_completed

# noinspection PyProtectedMember
from tsetmc.instruments import _L18S
from tsetmc.instruments import Instrument
# noinspection PyProtectedMember
from tsetmc.dataset import _CS_EXCLUSIONS
from tsetmc.dataset import update
# noinspection PyProtectedMember
from tsetmc import _DF
from tsetmc import Session


is_commodity_certificate_of_deposit = rc(r'\d{4}پ\d\d$').search
l18_df = _DF(_L18S).T

REMOVABLES = []
RA = REMOVABLES.append
CHECKED = {*()}


async def check(l18: str):
    if l18 in CHECKED:
        return
    page_data = await (await Instrument.from_l18(l18)).page_data()
    if (
        page_data['cs'] in _CS_EXCLUSIONS
        or page_data['flow'] == 3
        or page_data['flow_name'] == 'بازار اوراق بدهی'
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
        for i in REMOVABLES:
            try:
                del _L18S[i]
            except KeyError:
                pass

        # uses the modified _L18S
        await update()


run(main())
