from asyncio import run
from logging import basicConfig

from tsetmc import Session
from tsetmc.dataset import update

basicConfig(level='INFO', force=True)


async def main():
    async with Session():
        await update()


run(main())
