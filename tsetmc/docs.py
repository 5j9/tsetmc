"""
https://tsetmc.com/StaticContent/WebServiceHelp
"""

from aiohutils.pd import html_to_df as _html_to_df

from tsetmc import _DOMAIN, _api, _get
from tsetmc.general import _make_soup


async def _site_partree(params: str):
    return await _get(
        f'{_DOMAIN}Site.aspx?ParTree={params}',
        fa=True,
    )


async def _static_content(key: str):
    j = await _api(f'StaticData/GetStaticContent/WS-{key}')
    return j['staticContent'][0]['content']


async def client_type() -> dict:
    """https://tsetmc.com/StaticContent/WS-ClientType"""
    text = await _static_content('ClientType')
    out = _html_to_df(text, 2)
    return {
        'output': out,
    }


async def instrument_filter_by_date() -> dict:
    """https://tsetmc.com/StaticContent/WS-InstrumentFilterByDate"""
    text = await _static_content('InstrumentFilterByDate')
    soup = _make_soup(text)

    ul0, ul1, ul2 = soup.select('td > ul')

    flow = {
        int(k): v for k, v in [i.text.split(' : ') for i in ul0.select('li')]
    }
    yval = {k: v for k, v in [i.text.split(': ') for i in ul1.select('li')]}

    return {
        'input': {
            'Flow': flow,
        },
        'output': {
            'Flow': flow,
            'YVal': yval,
        },
    }


async def instrument_state() -> dict:
    """https://tsetmc.com/StaticContent/WS-InstrumentsState"""
    text = await _static_content('InstrumentsState')
    soup = _make_soup(text)

    tds = soup.select('td')
    flow = {
        int(k): v
        for k, v in [i.text.strip().split(' : ') for i in tds[7].select('li')]
    }
    cetaval = {
        k.strip('"'): v.strip('"')
        for k, v in [i.text.strip().split(':') for i in tds[-1].select('p')]
    }

    return {
        'input': {
            'Flow': flow,
        },
        'output': {
            'CEtaVal': cetaval,
        },
    }


async def instrument() -> dict:
    """https://tsetmc.com/StaticContent/WS-Instrument"""
    text = await _static_content('Instrument')
    soup = _make_soup(text)

    t0 = soup.select_one('table')
    t1, t2, t3 = t0.select('table')

    flow = {k: v for k, v in [i.text.split(' : ') for i in t1.select('li')]}

    yval_tds = [
        tr.select('td') for tr in t3.select('tr') if not tr.select('hr')
    ]
    yval = {
        k.text: (v1.text.strip(), v2.text.strip()) for k, v1, v2 in yval_tds
    }

    return {
        'input': {
            'Flow': flow,
        },
        'output': {
            'YVal': yval,
        },
    }


async def best_limits_all_ins() -> dict:
    """https://tsetmc.com/StaticContent/WS-BestLimitsAllIns"""
    text = await _static_content('BestLimitsAllIns')
    soup = _make_soup(text)

    t0 = soup.select_one('table')
    t1, t2 = t0.select('table')

    flow = {
        int(k): v for k, v in [i.text.split(' : ') for i in t1.select('li')]
    }
    out = {
        k.text.strip(): v.text.strip()
        for k, v in [tr.select('td') for tr in t2.select('tr')]
    }

    return {
        'input': {
            'Flow': flow,
        },
        'output': out,
    }


async def trade_last_day() -> dict:
    """https://tsetmc.com/StaticContent/WS-TradeLastDay"""
    text = await _static_content('TradeLastDay')
    soup = _make_soup(text)

    flow = {
        int(k): v
        for k, v in [
            i.text.split(' : ') for i in soup.select_one('ul').select('li')
        ]
    }
    out = {
        k.text.strip(): v.text.strip()
        for k, v in [
            tr.select('td') for tr in soup.select('table:last-child tr')
        ]
    }

    return {
        'input': {
            'Flow': flow,
        },
        'output': out,
    }
