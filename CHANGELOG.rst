v0.48.1
-------
* Fixed URL mismatch warning during web requests.

v0.48.0
-------
* BREAKING CHANGE: Renamed ``Instrument.client_type`` to ``client_type_history_old``. The old name is overwritten with a new method.
* Removed the broken ``Instrument.intraday()`` method. This method is not available in the new design of tsetmc.com. Use `Instrument.on_date` instead.
* Fixed ``market_watch_plus`` by allowing ``float64`` dtype on po and pd columns.
* Added the following methods to ``Instrument`` class:

   * ``info()``
   * ``trades()``
   * ``codal()``
   * ``daily_closing_price()``
   * ``closing_price_info()``
   * ``best_limits()``
   * ``client_type()``
   * ``etf()``
   * ``related_companies()``


v0.47.0
-------
* Added a quick fix for the new design of tsetmc.com by using `old.tsetmc.com` domain. Some modules are still failing in tests and should wait for the next released.
* Avoid unsigned data-types in returned values. This should help with some overflow bugs when user is not careful.
* Updated dataset

v0.46.0
-------
* Increased default socket timeouts to 30s
* Fixed ``market_map_data`` (the result has changed due to tsetmc API changes)
* Updated dataset

v0.45.1
-------
* Fixed some deprecation warning during update
* Updated dataset

v0.45.0
-------
* Fixed market_watch issue with newly defined columns
* Fixed some deprecation/future warnings
* Increased default timeout from 5 to 10 seconds
* Updated dataset

v0.44.0
-------
* Breaking: renamed the database module to dataset
* feat(_parse_price_info): handle invalid nav_datetime

v0.43.2
-------
* fixed: Use fake user-agent for API requests due to a new restriction from server.

v0.43.1
-------
* fixed a bug in ``Instrument.live_data``

v0.43.0
-------
* feat!: removed the 1-connection-per-host limit. However, users should note that ``InstrumentOnDate`` (``Instrument.on_date``) methods are rate-limited and avoid making simultaneous calls.
* feat(docs): a new (and incomplete) module to fetch parsed documentation data

v0.42.0
-------
* feat(Instrument.__hash__): handle ``numpy.int64`` ``Instrument.code``
* fix(Session): Do not inherit from ``aiohttp.ClientSession`` (deprecated by aiohttp).
* feat(Session): use TCPConnector(limit_per_host=1, keepalive_timeout=120.)

v0.41.0
-------
* feat(Instrument.trade_history): add new param: ``all_=False``
* feat(Instrument.client_type_history): new method
* feat(Instrument.on_date): new method returning an ``InstrumentOnDate`` object which has the following methods:

  * ``closing_price``
  * ``closing_price_history``
  * ``states``
  * ``client_types``
  * ``holders``
  * ``best_limits``
  * ``trades``
  * ``static_thresholds``
  * ``data``

v0.40.0
-------
* BREAKING CHANGE: Make the framework async.
* feat(general.top_industry_groups): new method
* fixed: type annotation of ``Instrument.live_data``

v0.39.0
-------
* feat(Instrument.dps_history): new method
* feat!: migrate from urllib3 to httpx

v0.38.0
-------
* feat(Instrument.holders)!: use english column names and numerize the `change` column
* feat!: migrate from requests to urllib3
* fix(live_data)!: handle empty string in market state
* fix(major_holders_activity): handle empty-valued cells

v0.37.0
-------
* Fixed ``market_watch.status_changes``.

v0.36.0
-------
* feat(setup.cfg)!: require pandas 1.4.0+
* feat(market_watch.ombud_messages)!: make all params keyword-only
* feat(market_watch.ombud_messages): new params: ``containing`` and ``sh_date``
* feat(database)!: cs 69 and flow 3 were removed from offline database
* feat(Instrument): add ``introduction`` method
* feat(Instrument): add ``ombud_messages`` method
* feat(general): new module containing the following functions:

  * ``boards``
  * ``cs_codes``
  * ``industrial_groups``
  * ``market_map_data``
  * ``major_holders_activity``

* fix(setup.cfg)!: ``beautifulsoup4`` and ``lxml`` are now required as dependencies
* fix(ombud_messages)!: return empty DataFrame for empty result set
