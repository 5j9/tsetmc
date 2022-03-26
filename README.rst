An ``async`` Python library to fetch data from http://tsetmc.com.

Note: The API is provisional and may change rapidly without deprecation.

Installation
------------
Requires Python 3.10+.

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

You will need an asyncio capable REPL, like ``python -m asyncio`` or `IPython`_, to run these code samples.

Prepare the session:

.. code-block:: python

    >>> import tsetmc
    >>> session = fipiran.Session()

Getting the static data available in the main page of an instrument:

.. code-block:: python

    >>> from tsetmc.instruments import Instrument
    >>> inst = await Instrument.from_l18('فملی')
    >>> await inst.page_data(general=True, trade_history=True, related_companies=True)
    {'bvol': 9803922,
     'cisin': 'IRO1MSMI0000',
     'cs': 27,
     'eps': 1339,
     'sps': 2452.07,
     'flow': 1,
     'free_float': 33,
     'group_code': 'N1',
     'isin': 'IRO1MSMI0001',
     'l18': 'فملی',
     'l30': 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c',
     'flow_name': 'بازار اول (تابلوی اصلی) بورس',
     'month_average_volume': 80515596,
     'sector_name': 'فلزات اساسی',
     'sector_pe': 8.9,
     'tmax': 12650.0,
     'tmin': 11450.0,
     'week_max': 12380.0,
     'week_min': 11770.0,
     'year_max': 39810.0,
     'year_min': 0.0,
     'z': 200000000000,
     'trade_history':                  pc       py     pmin     pmax    tno       tvol          tval
     date
     2021-07-04  12050.0  12040.0  11770.0  12190.0  10504   60085175  7.239613e+11
     2021-07-03  12040.0  12240.0  11800.0  12380.0  14905   88571671  1.066283e+12
     2021-06-30  12240.0  12240.0  12180.0  12370.0  11639   61924440  7.580286e+11
     2021-06-29  12240.0  12140.0  12110.0  12410.0  13153   80738158  9.886263e+11
     2021-06-28  12140.0  12220.0  11990.0  12290.0  12556   69479692  8.434176e+11
     2021-06-27  12220.0  12420.0  12040.0  12440.0  18830   93937722  1.148373e+12
     2021-06-26  12420.0  12310.0  12120.0  12600.0  25260  155751582  1.934123e+12
     2021-06-23  12310.0  11830.0  12020.0  12420.0  23635  204263514  2.514120e+12
     2021-06-22  11830.0  11540.0  11530.0  12110.0  24234  170353210  2.014437e+12,
     'related_companies': [
        Instrument(46348559193224090, 'فولاد'),
        Instrument(35425587644337450, 'فملی'),
        Instrument(45507655586782998, 'فجهان'),
        Instrument(9211775239375291, 'ذوب'),
        ...]}


Getting the latest price information:

.. code-block:: python

    >>> await inst.live_data()
    {'timestamp': '12:30:00',
     'status': 'A ',
     'datetime': datetime.datetime(2021, 7, 5, 12, 30),
     'pl': 12250,
     'pc': 12210,
     'pf': 12140,
     'py': 12050,
     'pmin': 12340,
     'pmax': 12100,
     'tno': 10904,
     'tvol': 57477120,
     'tval': 701852286450}

Getting the daily trade history for the last n days: (as a DataFrame)

.. code-block:: python

    >>> await inst.trade_history(top=2)
                   pmax     pmin       pc  ...          tval      tvol    tno
    date                                   ...
    2021-07-18  12880.0  12530.0  12650.0  ...  1.114773e+12  88106162  14485
    2021-07-17  12960.0  12550.0  12750.0  ...  8.740106e+11  68542961  14327
    [2 rows x 9 columns]


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


Getting legal/natural client types: (the result is a DataFrame)

.. code-block:: python

    >>> await inst.client_type()
                n_buy_count  l_buy_count  ...  n_sell_value  l_sell_value
    date                                  ...
    2021-07-04         4447           14  ...  586457311950  137504028420
    2021-07-03         5890           23  ...  994298662870   71984465160
    2021-06-30         5032           19  ...  637609524840  120419036770
    2021-06-29         5851           12  ...  562034366100  426591980560
    2021-06-28         5349           17  ...  767532788130   75884839930
                     ...          ...  ...           ...           ...
    2008-12-02            0            1  ...         53664             0
    2008-12-01            0            1  ...             0        212750
    2008-11-30            2            1  ...       2565810             0
    2008-11-29            1            0  ...       4521000             0
    2008-11-26            1            1  ...       1487409         46600
    [2715 rows x 12 columns]

Getting the data in identification (شناسه) tab of the instrument:

.. code-block:: python

    >>> await inst.identification()
    {'بازار': 'بازار اول (تابلوی اصلی) بورس',
     'زیر گروه صنعت': 'تولید فلزات گرانبهای غیرآهن',
     'نام شرکت': 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c\u200c',
     'نام لاتین شرکت': 'S*I. N. C. Ind.',
     'نماد 30 رقمی فارسی': 'ملی\u200c صنایع\u200c مس\u200c ایران\u200c',
     'نماد فارسی': 'فملی',
     'کد 12 رقمی شرکت': 'IRO1MSMI0000',
     'کد 12 رقمی نماد': 'IRO1MSMI0001',
     'کد 4 رقمی شرکت': 'MSMI',
     'کد 5 رقمی نماد': 'MSMI1',
     'کد تابلو': '1',
     'کد زیر گروه صنعت': '2720',
     'کد گروه صنعت': '27',
     'گروه صنعت': 'فلزات اساسی'}


Getting the share/unit holders:

.. code-block:: python

    >>> await inst.holders()
                                        سهامدار/دارنده  ...            id_cisin
    0    سازمان توسعه ونوسازی معادن وصنایع معدنی ایران  ...    104,IRO1MSMI0000
    1    موسسه صندوق بازنشستگی شرکت ملی صنایع مس ایران  ...    770,IRO1MSMI0000
    2           شرکت سرمایه گذاری صدرتاءمین-سهامی عام-  ...    492,IRO1MSMI0000
    3   شرکت سرمایه گذاری توسعه معادن وفلزات-سهامی عام  ...    460,IRO1MSMI0000
    ...
    [21 rows x 5 columns]


Getting information of a specific share/unit holder:

.. code-block:: python

    >>> await inst.holder('21630,IRO1MSMI0000', history=True, other_holdings=True)
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

Getting intraday data:

.. code-block:: python

    >>> await inst.intraday(
        date=20210704,
        general=False,
        thresholds=False,
        closings=False,
        candles=False,
        states=True,
        trades=True,
        holders=False,
        yesterday_holders=False,
        client_types=True,
        best_limits=True,
    )  # the result is too long and not shown here

Getting the history of price adjustments:

.. code-block:: python

    >>> await inst.adjustments()
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

    >>> await Instrument.from_search('توسعه اندوخته آینده')
    Instrument(11427939669935844, 'اطلس')

The ``instruments.price_adjustments`` function gets all the price adjustments for a specified flow.


`market_watch`_ module contains the following functions:

* ``market_watch_init``
* ``market_watch_plus``
* ``closing_price_all``
* ``client_type_all``
* ``key_stats``
* ``ombud_messages``
* ``status_changes``

There are several other functions in ``general`` module.

If you are interested in other information that are available on tsetmc.com but this library has no API for, please `open an issue`_ for them.


See also
--------

* https://github.com/5j9/fipiran

.. _aiohttp: https://github.com/aio-libs/aiohttp
.. _pandas: https://pandas.pydata.org/
.. _market_watch: http://www.tsetmc.com/Loader.aspx?ParTree=15131F
.. _open an issue: https://github.com/5j9/tsetmc/issues
.. _the session object should only be instantiated once: https://docs.aiohttp.org/en/latest/client_advanced.html#persistent-session
.. _IPython: https://ipython.org/