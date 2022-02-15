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
