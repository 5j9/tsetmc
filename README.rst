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

There is also an ``Instrument`` class that is not ready yet and may fail in many situations.

.. _pandas: https://pandas.pydata.org/
.. _filters on tsetmc.com: http://www.tsetmc.com/Loader.aspx?ParTree=15131F
