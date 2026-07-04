.. image:: https://github.com/5j9/tsetmc/actions/workflows/pytest.yml/badge.svg
   :alt: Pytest Status
   :target: https://github.com/5j9/tsetmc/actions/workflows/pytest.yml

An ``async`` Python library to fetch data from https://tsetmc.com/ built on top of `Polars`_.

Installation
------------
Requires Python 3.13 or later.

``pip install tsetmc``

Overview
--------
Let's start with a simple script:

.. code-block:: python

    import asyncio

    from tsetmc.instruments import Instrument


    async def main():
        inst = await Instrument.from_l18('فملی')
        info = await inst.info()
        print(info)


    asyncio.run(main())


The ``Instrument`` class provides many methods for getting information about an instrument.
The following code blocks try to demonstrate some of its capabilities.

Note: You need an asyncio capable REPL, like ``python -m asyncio`` or `IPython`_, to run the following code samples, otherwise you'll have to run them inside an async function like the sample code above.

.. code-block:: python

    >>> from tsetmc.instruments import Instrument
    >>> inst = await Instrument.from_l18('فملی')
    >>> await inst.info()
    {'eps': {'epsValue': None,
      'estimatedEPS': '721',
      'sectorPE': 12.02,
      'psr': 1472.8279},
     'sector': {'dEven': 0, 'cSecVal': '27 ', 'lSecVal': 'فلزات اساسی'},
     'staticThreshold': {'insCode': None,
      'dEven': 0,
      'hEven': 0,
      'psGelStaMax': 8270.0,
      'psGelStaMin': 7190.0},
     'minWeek': 7630.0,
     'maxWeek': 7970.0,
     'minYear': 4630.0,
     'maxYear': 10670.0,
     'qTotTran5JAvg': 179233329.0,
     'kAjCapValCpsIdx': '43',
     'dEven': 0,
     'topInst': 1,
     'faraDesc': '',
     'contractSize': 0,
     'nav': 0.0,
     'underSupervision': 0,
     'cValMne': None,
     'lVal18': 'S*I. N. C. Ind.',
     'cSocCSAC': None,
     'lSoc30': None,
     'yMarNSC': None,
     'yVal': '300',
     'insCode': '35425587644337450',
     'lVal30': 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c',
     'lVal18AFC': 'فملی',
     'flow': 1,
     'cIsin': 'IRO1MSMI0000',
     'zTitad': 600000000000.0,
     'baseVol': 15584416,
     'instrumentID': 'IRO1MSMI0001',
     'cgrValCot': 'N1',
     'cComVal': '1',
     'lastDate': 0,
     'sourceID': 0,
     'flowTitle': 'بازار بورس',
     'cgrValCotTitle': 'بازار اول (تابلوی اصلی) بورس'}


Getting the latest price information:

.. code-block:: python

    >>> await inst.closing_price_info()
    {'instrumentState': {'idn': 0,
      'dEven': 0,
      'hEven': 0,
      'insCode': None,
      'cEtaval': 'A ',
      'realHeven': 0,
      'underSupervision': 0,
      'cEtavalTitle': 'مجاز'},
     'instrument': None,
     'lastHEven': 170725,
     'finalLastDate': 20230524,
     'nvt': 0.0,
     'mop': 0,
     'thirtyDayClosingHistory': None,
     'priceChange': 0.0,
     'priceMin': 7630.0,
     'priceMax': 7900.0,
     'priceYesterday': 7730.0,
     'priceFirst': 7750.0,
     'last': True,
     'id': 0,
     'insCode': '0',
     'dEven': 20230524,
     'hEven': 170725,
     'pClosing': 7700.0,
     'iClose': False,
     'yClose': False,
     'pDrCotVal': 7670.0,
     'zTotTran': 7206.0,
     'qTotTran5J': 84108817.0,
     'qTotCap': 648015842640.0}


Getting the daily trade history for the last n days: (as a Polars LazyFrame, resolved using ``.collect()``)

.. code-block:: python

    >>> lf = await inst.daily_closing_price(n=2)
    >>> lf.collect()
    shape: (2, 17)
    ┌─────────────┬──────────┬──────────┬───┬──────────┬────────────┬──────────────┐
    │ priceChange ┆ priceMin ┆ priceMax ┆ … ┆ zTotTran ┆ qTotTran5J ┆ qTotCap      │
    │ ---         ┆ ---      ┆ ---      ┆   ┆ ---      ┆ ---        ┆ ---          │
    │ f64         ┆ f64      ┆ f64      ┆   ┆ f64      ┆ f64        ┆ f64          │
    ╞═════════════╪══════════╪══════════╪═══╪══════════╪════════════╪══════════════╡
    │ 30.0        ┆ 7490.0   ┆ 7600.0   ┆ … ┆ 4555.0   ┆ 7.5649965e ┆ 5.689944e+11 │
    │ 10.0        ┆ 7500.0   ┆ 7590.0   ┆ … ┆ 4614.0   ┆ 8.3570336e ┆ 6.276337e+11 │
    └─────────────┴──────────┴──────────┴───┴──────────┴────────────┴──────────────┘


Getting adjusted daily prices:

.. code-block:: python

    >>> lf = await inst.price_history(adjusted=True)
    >>> lf.collect()
    shape: (3192, 7)
    ┌────────────┬───────┬───────┬───────┬───────┬───────────┬───────┐
    │ date       ┆ pmax  ┆ pmin  ┆ pf    ┆ pl    ┆ tvol      ┆ pc    │
    │ ---        ┆ ---   ┆ ---   ┆ ---   ┆ ---   ┆ ---       ┆ ---   │
    │ datetime   ┆ i64   ┆ i64   ┆ i64   ┆ i64   ┆ i64       ┆ i64   │
    ╞════════════╪═══════╪═══════╪═══════╪═══════╪═══════════╪═══════╡
    │ 2007-02-04 ┆ 45    ┆ 41    ┆ 45    ┆ 42    ┆ 172898994 ┆ 42    │
    │ 2007-02-05 ┆ 43    ┆ 43    ┆ 43    ┆ 43    ┆ 10826496  ┆ 43    │
    │ …          ┆ …     ┆ …     ┆ …     ┆ …     ┆ …         ┆ …     │
    │ 2021-07-17 ┆ 12960 ┆ 12550 ┆ 12800 ┆ 12640 ┆ 68542961  ┆ 12750 │
    │ 2021-07-18 ┆ 12880 ┆ 12530 ┆ 12600 ┆ 12630 ┆ 88106162  ┆ 12650 │
    └────────────┴───────┴───────┴───────┴───────┴───────────┴───────┘


Getting intraday data for a specific date:

.. code-block:: python

    >>> lf = await inst.on_date(20210704).states()
    >>> lf.collect()
    shape: (1, 10)
    ┌─────┬───────┬───────┬─────────┬─────────┬───────────┬──────────────────┬──────────────┐
    │ idn ┆ dEven ┆ hEven ┆ insCode ┆ cEtaval ┆ realHeven ┆ underSupervision ┆ cEtavalTitle │
    │ --- ┆ ---   ┆ ---   ┆ ---     ┆ ---     ┆ ---       ┆ ---              ┆ ---          │
    │ i64 ┆ i64   ┆ i64   ┆ str     ┆ str     ┆ i64       ┆ i64              ┆ str          │
    ╞═════╪═══════╪═══════╪═════════╪═════════╪═══════════╪══════════════════╪══════════════╡
    │ 0   ┆ 0     ┆ 1     ┆ 0       ┆ A       ┆ 94838     ┆ 0                ┆ None         │
    └─────┴───────┴───────┴─────────┴─────────┴───────────┴──────────────────┴──────────────┘


Searching for an instrument:

.. code-block:: python

    >>> await Instrument.from_search('چادرملو')
    Instrument(18027801615184692, 'کچاد')

The ``instruments.price_adjustments`` function gets all the price adjustments for a specified flow.


The `market_watch`_ module contains several functions to fetch market watch data. They include:

* ``market_watch_init``
* ``market_watch_plus``
* ``closing_price_all``
* ``client_type_all``
* ``key_stats``
* ``ombud_messages``
* ``status_changes``

Use ``market_watch.MarketWatch`` for watching the market. Here is how:

.. code-block:: python

    from asyncio import gather, run

    import polars as pl

    from tsetmc.market_watch import MarketWatch


    async def listen_to_update_events(market_watch):
        while True:
            await market_watch.update_event.wait()
            # market_watch elements are exposed as a Polars LazyFrame
            lf = market_watch.lf
            print(
                lf.filter(pl.col('ins_code') == '35425587644337450')
                .select('pl')
                .collect()
                .item()
            )


    async def main():
        market_watch = MarketWatch()
        await gather(
            market_watch.start(),
            listen_to_update_events(market_watch),
        )


    run(main())




There are many other functions and methods that are not covered here. Explore the codebase to learn more.

To keep the offline dataset up-to-date, run the `tsetmc.dataset.update()` function periodically (e.g., daily). This dataset acts as a cache for basic information about common instruments.

If you are interested in other information available on tsetmc.com that this library has no API for, please `open an issue`_ for them.


See also
--------

* https://github.com/5j9/fipiran

.. _polars: https://docs.pola.rs/
.. _market_watch: http://www.tsetmc.com/Loader.aspx?ParTree=15131F
.. _open an issue: https://github.com/5j9/tsetmc/issues
.. _IPython: https://ipython.org/