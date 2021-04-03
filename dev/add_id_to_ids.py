from json import dump, load

from tsetmc import Instrument


s = input('Enter search term:\n')
inst = Instrument.from_search(s)

ins_code = inst.ins_code

df = inst.get_identification()
isin = df.at['کد 12 رقمی نماد', 1]
l18 = df.at['نماد فارسی', 1].partition(' ')[0]
l30 = df.at['نماد 30 رقمی فارسی', 1]

with open(f'{__file__}/../../tsetmc/ids.json', 'r+', encoding='utf8') as f:
    KNOWN_IDS = load(f)
    KNOWN_IDS[l18] = ins_code, l18, l30, isin
    f.seek(0)
    dump(KNOWN_IDS, f, check_circular=False, ensure_ascii=False, indent=4, sort_keys=True)
    # f.truncate() is not needed since update will always increase the size.
