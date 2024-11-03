import pandas as pd  # noqa: F401
from pyperclip import copy, paste  # noqa: F401

import tsetmc
from tsetmc import dataset, general, indices, instruments, market_watch

vars().update(
    vars(indices)
    | vars(general)
    | vars(tsetmc)
    | vars(dataset)
    | vars(market_watch)
    | vars(instruments)
    | vars()
)
