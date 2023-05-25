An ``async`` Python library to fetch data from http://tsetmc.com.

Note: The API is provisional and may change rapidly without deprecation.

Installation
------------
Requires latest stable Python version.

``pip install tsetmc``

Overview
--------

First things first. ``tsetmc`` relies on `aiohttp`_ .
If you are not familiar with aiohttp, all you need to know is that any ``async`` network operation needs to be run inside an async session context.
You may create the session using ``tsetmc.Session`` class. Here is a complete working script:

.. code-block:: python

    import asyncio

    import tsetmc
    from tsetmc.instruments import Instrument

    async def main():
        async with tsetmc.Session():
            inst = await Instrument.from_l18('فملی')
            live_data = await inst.live_data()
        print(live_data)

   asyncio.run(main())

Alternatively, you may directly use an ``aiohttp.ClientSession`` object: (useful if you want to use an already existing session and share it with other parts of your code)

.. code-block:: python

    import asyncio
    import aiohttp

    import tsetmc
    from tsetmc.instruments import Instrument

    async def main():
        async with aiohttp.ClientSession() as tsetmc.SESSION:
            inst = await Instrument.from_l18('فملی')
            live_data = await inst.live_data()
        print(live_data)

    asyncio.run(main())

Ideally, `the session object should only be instantiated once`_.

The ``Instrument`` class provides many methods for getting information about an instrument.
The following code blocks try to demonstrate its capabilities.

You need an asyncio capable REPL, like ``python -m asyncio`` or `IPython`_, to run these code samples.

.. code-block:: python

    >>> from tsetmc import Session
    >>> from tsetmc.instruments import Instrument
    >>> inst = await Instrument.from_l18('فملی')
    >>> async with Session():
    ...     i = await inst.info()
    >>> i
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

    >>> async with Session():
    ...     i = await inst.closing_price_info()
    >>> i
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

    >>> async with Session():
    ...     h = await inst.trade_history(top=2)
    >>> h
                   pmax     pmin       pc  ...          tval      tvol    tno
    date                                   ...
    2021-07-18  12880.0  12530.0  12650.0  ...  1.114773e+12  88106162  14485
    2021-07-17  12960.0  12550.0  12750.0  ...  8.740106e+11  68542961  14327
    [2 rows x 9 columns]


Getting adjusted daily prices:

.. code-block:: python

    >>> async with Session():
    ...     h = await inst.price_history(adjusted=True)
    >>> h
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


Getting the share/unit holders:

.. code-block:: python

    >>> async with Session():
    ...     h = await inst.holders()
    >>> h
                                        سهامدار/دارنده  ...            id_cisin
    0    سازمان توسعه ونوسازی معادن وصنایع معدنی ایران  ...    104,IRO1MSMI0000
    1    موسسه صندوق بازنشستگی شرکت ملی صنایع مس ایران  ...    770,IRO1MSMI0000
    2           شرکت سرمایه گذاری صدرتاءمین-سهامی عام-  ...    492,IRO1MSMI0000
    3   شرکت سرمایه گذاری توسعه معادن وفلزات-سهامی عام  ...    460,IRO1MSMI0000
    ...
    [21 rows x 5 columns]


Getting information of a specific share/unit holder:

.. code-block:: python

    >>> async with Session():
    ...     h = await inst.holder('21630,IRO1MSMI0000', history=True, other_holdings=True)
    >>> h
    (                shares
     date
     2021-02-17  2003857980
     2021-02-18  2003857980
     2021-02-21  2003857980
     2021-02-22  2003857980
     2021-02-23  2003857980
     ...                ...
     2021-06-29  2003857980
     2021-06-30  2003857980
     2021-07-01  2003857980
     2021-07-04  2003857980
     2021-07-05  2003857980

     [90 rows x 1 columns],
                                                  name      shares  percent
     ins_code
     778253364357513                          بانک ملت  4161561525     2.00
     26014913469567886       سرمایه‌گذاری‌غدیر(هلدینگ‌  3356161798     4.66
     ...

Getting intraday data for a specific date:

.. code-block:: python

    >>> async with Session():
    ...     states = await inst.on_date(20210704).states()
	>>> states  # a dataframe
	   idn  dEven  hEven insCode cEtaval  realHeven  underSupervision cEtavalTitle
	0    0      0      1       0      A       94838                 0         None

Getting the history of price adjustments:

.. code-block:: python

    >>> async with Session():
    >>>     a = await inst.adjustments()
    >>> a
                       date  adj_pc     pc
    0   1399-05-01 00:00:00   35720  35970
    1   1398-04-26 00:00:00    4269   4419
    2   1397-10-02 00:00:00    2880   3744
    3   1397-04-20 00:00:00    3121   3271
    4   1396-08-08 00:00:00    1977   2173
    5   1396-05-01 00:00:00    1534   1884
    6   1395-04-29 00:00:00    1344   1397
    7   1395-04-22 00:00:00    1397   1597
    8   1394-06-30 00:00:00    1298   1378
    9   1393-09-11 00:00:00    2321   2639
    10  1393-04-24 00:00:00    2377   2777
    11  1392-03-20 00:00:00    2872   4774
    12  1392-03-19 00:00:00    4774   5794
    13  1391-04-06 00:00:00    3959   4659
    14  1390-04-14 00:00:00    4911  12991
    15  1390-04-14 00:00:00   12991  15241
    16  1389-04-12 00:00:00    6494   7694
    17  1388-04-24 00:00:00    4827   5627

Searching for an instrument:

.. code-block:: python

    >>> async with Session():
    ...     r = await Instrument.from_search('چادرملو')
    >>> r
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

There are many other functions and methods that are not covered here. Explore the codebase to learn more.

If you are interested in other information available on tsetmc.com that this library has no API for, please `open an issue`_ for them.


See also
--------

* https://github.com/5j9/fipiran

.. _aiohttp: https://github.com/aio-libs/aiohttp
.. _pandas: https://pandas.pydata.org/
.. _market_watch: http://www.tsetmc.com/Loader.aspx?ParTree=15131F
.. _open an issue: https://github.com/5j9/tsetmc/issues
.. _the session object should only be instantiated once: https://docs.aiohttp.org/en/latest/client_advanced.html#persistent-session
.. _IPython: https://ipython.org/
