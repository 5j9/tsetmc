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
