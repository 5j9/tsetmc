from asyncio import run
from logging import basicConfig

from tsetmc.dataset import update

basicConfig(level='INFO', force=True)


async def main():
    await update()


run(main())
