"""http://redirectcdn.tsetmc.com/Site.aspx?ParTree=11141111"""

from aiohutils.pd import html_to_df as _html_to_df

from tsetmc import _DOMAIN, _get
from tsetmc.general import _make_soup


async def _site_partree(params: str):
    return await _get(
        f'{_DOMAIN}Site.aspx?ParTree={params}',
        fa=True,
    )


async def client_type() -> dict:
    """http://redirectcdn.tsetmc.com/Site.aspx?ParTree=1114111116&LnkIdn=3568"""
    text = await _site_partree('1114111116&LnkIdn=3568')
    out = _html_to_df(text, 2)
    return {
        'output': out,
    }


async def instrument_filter_by_date() -> dict:
    """http://redirectcdn.tsetmc.com/Site.aspx?ParTree=111411111Z&LnkIdn=834"""
    text = await _site_partree('1114111116&LnkIdn=834')
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
    """http://redirectcdn.tsetmc.com/Site.aspx?ParTree=111411111Y&LnkIdn=833"""
    text = await _site_partree('1114111116&LnkIdn=833')
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
    """http://tsetmc.com/Site.aspx?ParTree=1114111118&LnkIdn=83"""
    text = await _site_partree('1114111116&LnkIdn=83')
    soup = _make_soup(text)

    t0 = soup.select_one('table')
    t1, t2, t3 = t0.select('table')

    flow = {
        int(k): v for k, v in [i.text.split(' : ') for i in t1.select('li')]
    }

    yval = {
        int(k.text): (v1.text.strip(), v2.text.strip())
        for k, v1, v2 in [tr.select('td') for tr in t3.select('tr')]
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
    """http://redirectcdn.tsetmc.com/Site.aspx?ParTree=111411111P&LnkIdn=97"""
    text = await _site_partree('111411111P&LnkIdn=97')
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
    """http://redirectcdn.tsetmc.com/Site.aspx?ParTree=1114111113&LnkIdn=84"""
    text = await _site_partree('1114111113&LnkIdn=84')
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
