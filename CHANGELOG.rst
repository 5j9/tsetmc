v0.66.0
-------
* 

v0.65.0
-------
* BREAKING: All ETF/fund related functions were moved from ``general`` to ``funds`` module.

v0.64.1
-------
* Fixed: ImportError in instruments module

v0.64.0
-------
* New function: ``tsetmc.general.get_funds``.
* New function: ``tsetmc.general.commodity_funds``.
* New function: ``tsetmc.general.etfs``.
* New function: ``tsetmc.general.messages``.
* New function: ``tsetmc.general.search_messages``.
* Changed!: The ``n`` parameter of ``general.market_overview`` function was renamed to ``flow`` and is now keyword-only.
* Removed!: ``market_watch.messages``. The underlying API was not working anymore. Use ``tsetmc.general.messages`` instead which uses the new JSON API.
* Fixed: Errors due to bad server redirects in ``general.boards``, ``general.cs_codes``, and ``general.industrial_groups_overview``.
* Deprecated: ``general.industrial_groups_overview``; use ``general.sectors_summary`` instead.
* Updated dataset

v0.63.1
-------
* Automatically handle ``ServerDisconnectedError`` by retrying.

v0.63.0
-------
* ``Instrument.daily_closing_price()`` now has index set to date column.
* ``docs.client_type()`` will not set first as column name for output.

v0.62.1
-------
* Fixed incompatible dtype FutureWarning in  ``market_watch_plus``.

v0.62.0
-------
* The default value of ``n`` for ``Instrument.daily_closing_price`` is now ``0`` instead of ``9``. Meaning that complete history will be fetched instead of just the last 9 days.
* Updated dataset

v0.61.0
-------
* Fixed handling of 23-column data in `market_watch_plus`.
* Some type hints (Subclasses of TypedDict) are now publicly exposed.

v0.59.0
-------
* Minimum Python requirement is now 3.12.
* Fixed a new deprecation warning in pandas 2.2.0.

v0.58.0
-------
* Update API url. (http now redirects to https)
* Updated dataset

v0.57.2
-------
* Fixed a deprecation warning in reading html tables.
* Updated dataset

v0.57.0
-------
* BREAKING CHANGE: Require pyarrow and pandas >= 2.1.0 and use pyarrow string dtype in pandas. Also ``pandas.options.future.infer_string = True``.
* BREAKING CHANGE: The ``ins_code`` column of ``general.industrial_groups_overview()`` is now of string type. (prviously it was int64)
* BREAKING CHANGE: ``Instrument.live_data`` will now include a ``timestamp`` key instead of ``datetime``. The old ``timestamp`` key is renamed to ``time``.
* Fixed a logging bug in market_watch_plus causing exception in rare occasions.
* The result of ``general.market_overview`` now includes ``marketActivityTimestamp`` which is a combination of ``marketActivityDEven`` and ``marketActivityHEven``.
* Added optional ``df`` parameter to ``dataset.update``.
* Updated dataset

v0.56.0
-------
* BREAKING CHANGE: ``cs`` column in ``market_watch_init`` and ``market_watch_plus`` now is of string type instead of numeric.
* BREAKING CHANGE: The return values of callback functions in ``MarketWatch`` are now ignored. Users are supposed to cancel the running task instead of controlling the loop via the return values.
* BREAKING CHANGE: The ``code`` column of dataset is renamed back to ``ins_code``. This name is more compatible with other existing functions.
* Fixed a bug in ``dataset.update()``.
* Updated dataset

v0.55.0
-------
* BREAKING CHANGE: new argument for ``market_watch_plus``: ``best_limits_prepare_join``. To retain the old behaviour call this function with ``best_limits_prepare_join=False``.
* Fixed occasional type-casting bug in ``market_watch_plus``.
* Added easy-to-use default callbacks for ``MarketWatch`` class.

v0.54.0
-------
* BREAKING CHANGE: Pandas v2.0+ is required and ``pd.options.mode.copy_on_write`` is set to true.
* BREAKING CHANGE: Index of ``daily_closing_price`` is now set to normalized form of datetime (not including time, just date). A ``datetime`` column added which includes the last transaction time.

v0.53.0
-------
* BREAKING CHANGE: ``tsetmc`` will now manage the session internally. There is no need to manually create a session anymore. ``tsetmc.Session`` and ``tsetmc.SESSION`` have been removed.

v0.52.0
-------
* ``MarketWatch.start`` will now retry ``market_watch_init`` upon failure.
* New public class: ``tsetmc.dataset.LazyDS``.


v0.51.0
-------
* BREAKING CHANGE: ``market_watch`` will now use ``string`` as the dtype for ``ins_code`` index.
* BREAKING CHANGE: ``market_state`` dict will now always include ``tse_value`` and ``tse_index_change_percent`` keys. The value will be ``None`` if not available.
* BREAKING CHANGE: Use ``ins_code`` as the index for ``price`` and ``new_prices`` DataFrames in ``market_watch_init`` and ``market_watch_plus``. Previously, the index was a MultiIndex of ``['ins_code', 'isin', 'l18', 'l30']``.
* BREAKING CHANGE: ``share_holder_id`` parameter of ``share_holder_companies`` is now positional-only.
* Fixed a bug in parsing ``market_state`` during pre-market.
* Updated dataset

v0.50.0
-------
* BREAKING CHANGE: ``Instrument.related_companies`` now adds an ``instrument.`` prefix to instrument related column names.
* Added new function: ``general.related_companies``
* Added a new module: ``indices``
* Add type hints for ``Instrument.info``
* Updated dataset

v0.49.1
-------
* BREAKING CHANGE: ``Instrument.share_holder_history`` now returns a ``DataFrame`` instead of a list.

v0.49.0
-------
* BREAKING CHANGE: the output type of ``insturments.search`` function has changed from DataFrame to a list of dicts. Use ``old_search`` if you want to continue using the old format.
* BREAKING CHANGE: renamed the ``c_sec_val`` parameter of ``Instrument.related_companies`` to ``cs``.
* BREAKING CHANGE: The DataFrame result of ``Instrument.daily_closing_price()`` now has datetime index instead of ``dEven`` and ``hEven`` columns.
* BREAKING CHANGE: ``Instrument.codal()`` now returns a list of dicts instead of a DataFrame.
* Added new async property: ``Instrument.cs``
* Added new async function: ``general.market_overview()``
* Added new async method: ``Instrument.identity()``
* Added new async method: ``Instrument.price_adjustments()``
* Added new async method: ``Instrument.publisher()``
* Added new async method: ``Instrument.share_holders()``
* Added new async method: ``Instrument.share_holder_history()``
* Added new async method: ``Instrument.messages()``
* Added new async function: ``instruments.share_holder_companies()``
* Improved type annotations
* Deprecated the following methods which rely on the old tsetmc site and have new alternatives:

  * ``Instrument.live_data``. See the docstring for alternatives.
  * ``Instrument.page_data``. See the docstring for alternatives.
  * ``Instrument.client_type_history_old``. Use ``Instrument.client_type_history`` instead.
  * ``Instrument.identification``. Use ``Instrument.identity`` instead.
  * ``Insturment.trade_history``. Use ``Instrument.daily_closing_price`` instead.
  * ``Insturment.adjustments``. Use ``Instrument.price_adjustments`` instead.
  * ``Insturment.introduction``. Use ``Instrument.publisher`` instead.
  * ``Insturment.holders``. Use ``Instrument.share_holders`` instead.
  * ``Insturment.holder``. Use ``Instrument.share_holder_history`` or ``share_holder_companies`` instead.
  * ``Insturment.ombud_messages``. Use ``Instrument.messages`` instead.

* ``InstrumentOnDate.client_types`` is deprecated, use ``Instrument.client_type`` instead
* Updated dataset

v0.48.2
-------
* Fixed an unneeded URL redirect in ``Instrument.price_history``
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
