"""
https://tsetmc.com/StaticContent/WebServiceHelp
"""

from aiohutils.pd import html_to_df as _html_to_df
from lxml.html import fromstring as _html

from tsetmc import _api


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
    html = _html(text)

    ul0, ul1, ul2 = html.xpath('//td/ul')

    flow = {
        int(k): v for k, v in [i.text.split(' : ') for i in ul0.xpath('.//li')]
    }
    yval = {k: v for k, v in [i.text.split(': ') for i in ul1.xpath('.//li')]}

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
    html = _html(text)

    tds = html.xpath('//td')
    flow = {
        int(k): v
        for k, v in [
            i.text_content().strip().split(' : ')
            for i in tds[7].xpath('.//li')
        ]
    }
    cetaval = {
        k.strip('"'): v.strip('"')
        for k, v in [
            i.text_content().strip().split(':') for i in tds[-1].xpath('.//p')
        ]
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
    html = _html(text)

    t0 = html.xpath('//table[1]')[0]
    assert t0 is not None
    t1, t2, t3 = t0.xpath('.//table')

    flow = {k: v for k, v in [i.text.split(' : ') for i in t1.xpath('.//li')]}

    yval_tds = [tr.xpath('.//td') for tr in t3.xpath('.//tr[not(.//hr)]')]
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
    html = _html(text)

    t0 = html.xpath('//table[1]')[0]
    assert t0 is not None
    t1, t2 = t0.xpath('.//table')

    flow = {
        int(k): v
        for k, v in [i.text_content().split(' : ') for i in t1.xpath('.//li')]
    }
    out = {
        k.text_content().strip(): v.text_content().strip()
        for k, v in [tr.xpath('.//td') for tr in t2.xpath('.//tr')]
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
    html = _html(text)

    flow = {
        int(k): v
        for k, v in [
            i.text_content().split(' : ')
            for i in html.xpath('//ul[1]')[0].xpath('.//li')
        ]
    }
    out = {
        k.text_content().strip(): v.text_content().strip()
        for k, v in [
            tr.xpath('.//td')
            for tr in html.xpath('.//table[not(following-sibling::*)]//tr')
        ]
    }

    return {
        'input': {
            'Flow': flow,
        },
        'output': out,
    }
