Installation
------------
``pip install --user tsetmc``

Overview
--------
There are four main functions that return `pandas`_  ``DataFrame`` s:

* ``get_market_watch_init``
* ``get_closing_price_all``
* ``get_client_type_all``
* ``get_key_stats``

Together, they return all the information available for creating `filters on tsetmc.com`_.

There is also an ``Instrument`` class which provides methods for getting the information on page of the given instrument (``get_page_info``),
its instantaneous information (``get_info``), and its trading history (``get_trade_history``).

.. code-block:: python

    >>> from tsetmc import Instrument
    >>> inst = Instrument.from_search('فملی')
    >>> inst.get_trade_history(top=2)
                 pmax     pmin       pc  ...          tval       tvol    tno
    date                                 ...
    20210120  10400.0  10120.0  10380.0  ...  4.984848e+11   48013394   7284
    20210119  10380.0   9400.0   9910.0  ...  2.649416e+12  267389256  36765
    [2 rows x 9 columns]

.. _pandas: https://pandas.pydata.org/
.. _filters on tsetmc.com: http://www.tsetmc.com/Loader.aspx?ParTree=15131F
