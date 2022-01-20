from tqdm import tqdm

from tsetmc.instruments import _L18S, Instrument
from tsetmc.database import update_db_using_market_watch
from tsetmc import _DF


l18_df = _DF(_L18S).T

removables = []
a = removables.append
checked = {*()}
for i in tqdm(l18_df[1]):
    if i in checked:
        continue
    d = Instrument.from_l18(i).page_data()
    if d['cs'] == 69 or d['flow'] == 3:
        a(i)
        print(f'marked {i} for removal')
        _L18S.pop(i)
    checked.add(i)


for i in removables:
    try:
        del _L18S[i]
    except KeyError:
        pass

update_db_using_market_watch()
