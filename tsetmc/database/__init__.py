from json import dump as _dump

from tsetmc.instruments import _DB_PATH, Instrument as _Instrument, _L18S
from tsetmc.market_watch import market_watch_init as _market_watch_init


# todo: add tests for this module

# cs == 69: اوراق تامين مالي
# cs == 59: اوراق حق تقدم استفاده از تسهيلات مسكن
_CS_EXCLUSIONS = {59, 69}


def _dump_l18s():
    with open(_DB_PATH, 'w', encoding='utf8') as f:
        _dump(_L18S, f, check_circular=False, ensure_ascii=False, indent='\t', sort_keys=True)


async def add_instrument_to_db(inst: _Instrument) -> None:
    # usually used in conjunction with Instrument.from_search
    ins_code = inst.code
    d = await inst.page_data()
    if d['flow'] == 3 or d['cs'] in _CS_EXCLUSIONS or d['flow_name'] == 'بازار اوراق بدهی':
        return
    # isin = df.at['کد 12 رقمی نماد', 1]
    l18 = d['l18']
    _L18S[l18] = ins_code, l18, d['l30']
    _dump_l18s()


async def update_db_using_market_watch() -> None:
    global _L18S
    mwi = await _market_watch_init(market_state=False, best_limits=False)
    df = mwi['prices']
    # flow == 3: futures market
    yval_exceptions = {  # see dev/tsetmc_source_files/market_watch.html
        # OraghMosharekat
        306, 301, 706, 208,
    }
    df = df.query('flow != 3 and cs not in @_CS_EXCLUSIONS and yval not in @yval_exceptions')
    glv = df.index.get_level_values
    ins_codes = glv('ins_code')
    l18s = glv('l18')
    l30s = glv('l30')
    # zip create an iterator which will be consumed on the first run
    values = *zip(ins_codes, l18s, l30s),
    old_len = len(_L18S)
    _L18S |= zip(l18s, values)
    diff = len(_L18S) - old_len
    if diff:
        _dump_l18s()
        print(f'{diff} new entries were added.')
    else:
        print('No new entries were found.')
