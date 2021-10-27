from json import dump

from tsetmc._core import DB_PATH, Instrument, market_watch_init, \
    L18S


# todo: add tests for this module


def dump_l18s():
    with open(DB_PATH, 'w', encoding='utf8') as f:
        dump(L18S, f, check_circular=False, ensure_ascii=False, indent='\t', sort_keys=True)


def add_instrument_to_db(inst: Instrument) -> None:
    # usually used in conjunction with Instrument.from_search
    ins_code = inst.code
    df = inst.identification()
    # isin = df.at['کد 12 رقمی نماد', 1]
    l18 = df.at['نماد فارسی', 1].partition(' ')[0]
    l30 = df.at['نماد 30 رقمی فارسی', 1]
    L18S[l18] = ins_code, l18, l30
    dump_l18s()


def update_db_using_market_watch() -> None:
    global L18S
    df = market_watch_init()['dataframe']
    glv = df.index.get_level_values
    ins_codes = glv('ins_code')
    l18s = glv('l18')
    l30s = glv('l30')
    # zip create an iterator which will be consumed on the first run
    values = *zip(ins_codes, l18s, l30s),
    old_len = len(L18S)
    L18S |= zip(l18s, values)
    diff = len(L18S) - old_len
    if diff:
        dump_l18s()
        print(f'{diff} new entries were added.')
    else:
        print('No new entries were found.')
