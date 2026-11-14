
// The most relavent part of the new watch font-end code used for 
// the logic in MarketWatchNew class is the following
// copied from https://www.tsetmc.com/main.9b5b3c7656bcfdbee768.js
// found using searching for "GetMarketWatch" in all sources.
(async function () {
    let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    if (!Ae.current) {
        Ae.current = !0,
            e && (Fe(!0),
                Be(""));
        try {
            var t;
            const e = ge.current
                , r = await QT.getMarketDataAll(Hwe, zwe, Vwe, Gwe, Wwe, e.hEven, e.RefID)
                , n = null !== (t = null === r || void 0 === r ? void 0 : r.marketwatch) && void 0 !== t ? t : [];
            ge.current = ((e, t) => {
                const r = (0,
                    s.A)({}, e);
                return t.forEach(e => {
                    var t;
                    const n = Number(null !== (t = e.hEven) && void 0 !== t ? t : e.heven);
                    Number.isFinite(n) && n > r.hEven && (r.hEven = n),
                        (Array.isArray(e.blDs) ? e.blDs : []).forEach(e => {
                            var t;
                            const n = Number(null !== (t = e.rid) && void 0 !== t ? t : e.refID);
                            Number.isFinite(n) && n > r.RefID && (r.RefID = n)
                        }
                        )
                }
                ),
                    r
            }
            )(e, n),
                y(e => {
                    const t = ((e, t) => {
                        const r = Array.isArray(e) ? e : []
                            , n = Array.isArray(t) ? t : []
                            , i = new Map(n.map(e => [e.insCode, e]))
                            , o = new Set(r.map(e => e.insCode))
                            , a = new Set
                            , l = r.map(e => {
                                var t, r, n, o;
                                const l = i.get(e.insCode);
                                if (!l)
                                    return e;
                                Object.entries(l).forEach(t => {
                                    let [r, n] = t;
                                    "blDs" === r || Object.is(e[r], n) || a.add("".concat(e.insCode, ":").concat(r))
                                }
                                );
                                const c = null !== (t = null === (r = e.blDs) || void 0 === r ? void 0 : r[0]) && void 0 !== t ? t : {}
                                    , u = null !== (n = null === (o = l.blDs) || void 0 === o ? void 0 : o[0]) && void 0 !== n ? n : {};
                                return ["zmd", "qmd", "pmd", "pmo", "qmo", "zmo"].forEach(t => {
                                    Object.is(c[t], u[t]) || a.add("".concat(e.insCode, ":").concat(t))
                                }
                                ),
                                    (0,
                                        s.A)((0,
                                            s.A)({}, e), l)
                            }
                            );
                        return {
                            rows: [...l, ...n.filter(e => !o.has(e.insCode))],
                            changedCellKeys: a
                        }
                    }
                    )(e, n);
                    return ne && t.changedCellKeys.size && ke(t.changedCellKeys),
                        t.rows
                }
                )
        } catch (r) {
            Be("\u062f\u0631\u06cc\u0627\u0641\u062a \u0627\u0637\u0644\u0627\u0639\u0627\u062a \u062f\u06cc\u062f\u0647\u200c\u0628\u0627\u0646 \u0628\u0627 \u062e\u0637\u0627 \u0645\u0648\u0627\u062c\u0647 \u0634\u062f."),
                e && y([])
        } finally {
            Ae.current = !1,
                e && Fe(!1)
        }
    }
}, [ne])