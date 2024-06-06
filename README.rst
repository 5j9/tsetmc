An ``async`` Python library to fetch data from https://tsetmc.com/.

Note: The API is provisional and may change rapidly without deprecation.

Installation
------------
Requires Python 3.12 or later.

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


Getting the daily trade history for the last n days: (as a DataFrame)

.. code-block:: python

    >>> await inst.daily_closing_price(n=2)
       priceChange  priceMin  priceMax  ...  zTotTran  qTotTran5J       qTotCap
    0         30.0    7490.0    7600.0  ...    4555.0  75649965.0  5.689944e+11
    1         10.0    7500.0    7590.0  ...    4614.0  83570336.0  6.276337e+11
    [2 rows x 17 columns]


Getting adjusted daily prices:

.. code-block:: python

    >>> await inst.price_history(adjusted=True)
                 pmax   pmin     pf     pl       tvol     pc
    date
    2007-02-04     45     41     45     42  172898994     42
    2007-02-05     43     43     43     43   10826496     43
    2007-02-06     44     44     44     44   26850133     44
    2007-02-07     45     45     45     45   31086849     45
    2007-02-10     45     45     45     45   40645528     45
               ...    ...    ...    ...        ...    ...
    2021-07-12  13340  12840  13110  12860  106208763  13020
    2021-07-13  13010  12640  12840  12680   66812306  12770
    2021-07-14  12830  12450  12540  12690   70277940  12670
    2021-07-17  12960  12550  12800  12640   68542961  12750
    2021-07-18  12880  12530  12600  12630   88106162  12650
    [3192 rows x 6 columns]


Getting intraday data for a specific date:

.. code-block:: python

    >>> await inst.on_date(20210704).states()  # a dataframe:
       idn  dEven  hEven insCode cEtaval  realHeven  underSupervision cEtavalTitle
    0    0      0      1       0      A       94838                 0         None


Searching for an instrument:

.. code-block:: python

    >>> await Instrument.from_search('چادرملو')
    Instrument(18027801615184692, 'کچاد')

The ``instruments.price_adjustments`` function gets all the price adjustments for a specified flow.


The `market_watch`_ module contains several function to fetch market watch data. They include:

* ``market_watch_init``
* ``market_watch_plus``
* ``closing_price_all``
* ``client_type_all``
* ``key_stats``
* ``ombud_messages``
* ``status_changes``

Use ``market_watch.MarketWatch`` for watching the market. Here is how:

.. code-block:: python

    from asyncio import new_event_loop
    from tsetmc.market_watch import MarketWatch

    async def listen_to_update_events():
        while True:
            await market_watch.update_event.wait()
            df = market_watch.df
            print(df.at['35425587644337450', 'pl'])  # last price of فملی


    market_watch = MarketWatch()
    loop = new_event_loop()
    loop.create_task(listen_to_update_events())
    loop.run_until_complete(market_watch.start())


There are many other functions and methods that are not covered here. Explore the codebase to learn more.

If you are interested in other information available on tsetmc.com that this library has no API for, please `open an issue`_ for them.


See also
--------

* https://github.com/5j9/fipiran

.. _pandas: https://pandas.pydata.org/
.. _market_watch: http://www.tsetmc.com/Loader.aspx?ParTree=15131F
.. _open an issue: https://github.com/5j9/tsetmc/issues
.. _IPython: https://ipython.org/
