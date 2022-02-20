from asyncio import run, as_completed

# noinspection PyProtectedMember
from tsetmc.instruments import _L18S, Instrument
from tsetmc.database import update_db_using_market_watch
# noinspection PyProtectedMember
from tsetmc import Session, _DF


l18_df = _DF(_L18S).T

REMOVABLES = []
RA = REMOVABLES.append
CHECKED = {*()}


async def check(l18: str):
    if l18 in CHECKED:
        return
    page_data = await (await Instrument.from_l18(l18)).page_data()
    if page_data['cs'] == 69 or page_data['flow'] == 3 or page_data['flow_name'] == 'بازار اوراق بدهی':
        RA(l18)
        print(f'marked {l18} for removal')
        _L18S.pop(l18)
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
        await update_db_using_market_watch()


run(main())
