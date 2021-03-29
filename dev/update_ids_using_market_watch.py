from json import dump, load

from tsetmc import get_market_watch_init


df = get_market_watch_init()['dataframe']
glv = df.index.get_level_values
ids = glv('id')
str_ids = map(str, ids)
isins = glv('isin')
l18s = glv('l18')
l30s = glv('l30')
# zip create an iterator which will be consumed on the first run
values = *zip(ids, l18s, l30s, isins),

with open(f'{__file__}/../../tsetmc/ids.json', 'r+', encoding='utf8') as f:
    KNOWN_IDS = load(f)
    old_len = len(KNOWN_IDS)
    KNOWN_IDS |= zip(l18s, values)
    if len(KNOWN_IDS) != old_len:
        f.seek(0)
        dump(KNOWN_IDS, f, check_circular=False, ensure_ascii=False, indent=4, sort_keys=True)
        # f.truncate() is not needed since update will always increase the size.
