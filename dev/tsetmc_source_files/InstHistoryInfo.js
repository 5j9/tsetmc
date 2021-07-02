function InstHistoryInfo() {
    var a = {
        Border: {
            lineWidth: 0,
            padding: 0
        },
        Series: {
            Candlestick: {
                type: "candlestick",
                priceUpFillStyle: "white",
                priceDownFillStyle: "black",
                strokeStyle: "black"
            },
            Volume: {
                type: "column"
            },
            Line: {
                type: "line",
                markers: {
                    size: 0
                }
            }
        },
        Axes: {
            DateTimeHidden: {
                type: "dateTime",
                location: "bottom",
                skipEmptyDays: true,
                labels: {
                    visible: false
                },
                majorTickMarks: {
                    visible: false
                },
                minorGridLines: {
                    lineWidth: 1,
                    strokeStyle: "#eeeeee"
                }
            },
            DateTimeIntra: {
                type: "dateTime",
                location: "bottom",
                skipEmptyDays: true,
                labels: {
                    stringFormat: "HH:MM"
                },
                minorGridLines: {
                    lineWidth: 1,
                    strokeStyle: "#eeeeee"
                }
            },
            DateTimeHistory: {
                type: "dateTime",
                location: "bottom",
                skipEmptyDays: true,
                labels: {
                    stringFormat: "yy/mm/dd"
                },
                minorGridLines: {
                    lineWidth: 1,
                    strokeStyle: "#eeeeee"
                }
            },
            DateTimeLong: {
                type: "dateTime",
                location: "bottom",
                skipEmptyDays: true,
                labels: {
                    stringFormat: "yyyy/mm/dd"
                },
                minorGridLines: {
                    lineWidth: 1,
                    strokeStyle: "#eeeeee"
                }
            },
            DateTimeShort: {
                type: "dateTime",
                location: "bottom",
                skipEmptyDays: true,
                labels: {
                    stringFormat: "mm/dd"
                },
                minorGridLines: {
                    lineWidth: 1,
                    strokeStyle: "#eeeeee"
                }
            },
            LinearY: {
                type: "linear",
                location: "left",
                width: 60
            }
        },
        OneDayBL: [],
        OneDayCP: [],
        OneDayTH: [],
        OneDayIS: [],
        OneDayIT: [],
        OneDaySH: [],
        OneDaySY: [],
        iVal: 0,
        speedVal: 1,
        stepLength: 1,
        curserStartLeft: 1,
        SetHevenLeftBox: function(d) {
            var b = Math.floor(iVal / 3600);
            var c = Math.floor((iVal - b * 3600) / 60);
            var e = iVal - b * 3600 - c * 60;
            $("#hevenLeftBox").html((b < 10 ? "0" + b : b) + ":" + (c == 0 ? "00" : c) + ":" + (e == 0 ? "00" : e))
        },
        OneDay: function(b) {
            ii.OneDayBL = BestLimitData;
            ii.OneDayCP = ClosingPriceData;
            ii.OneDayTH = StaticTreshholdData;
            ii.OneDayIS = InstrumentStateData;
            ii.OneDayIT = IntraTradeData;
            ii.OneDaySH = ShareHolderData;
            ii.OneDaySY = ShareHolderDataYesterday;
            $("#d15").html(LVal30);
            $("#d16").html(LVal18AFC);
            $("#d17").html(FlowName);
            $("#d18").html(bigNumber(parseInt(ZTitad, 10)));
            $("#d19").html(bigNumber(parseInt(BaseVol, 10)));
            if (ClientTypeData.length == 21) {
                for (i = 0; i <= 20; i++) {
                    if (i < 4) {
                        $("#ct" + i).html(addCommas(ClientTypeData[i]))
                    } else {
                        if (i > 7 && i < 12) {
                            $("#ct" + i).html(bigNumber(ClientTypeData[i]) + "%")
                        } else {
                            $("#ct" + i).html(bigNumber(ClientTypeData[i]))
                        }
                    }
                }
            }
            $("#heven").range({
                range: false,
                passedID: "hevenCursor",
                change: function() {},
                blur: function() {
                    iVal = parseInt($("#heven").val());
                    ii.SetHevenLeftBox(iVal);
                    ii.ShowBestLimitsHistory();
                    ii.ShowInstInfoHistory()
                }
            });
            ii.SetHevenLeftBox(iVal);
            $("#speed").range({
                range: false,
                change: function() {},
                blur: function() {
                    speedVal = parseInt($("#speed").val());
                    $("#speedLeftBox").html(speedVal + " ثانیه")
                }
            });
            $("#speedLeftBox").html(speedVal + " ثانیه");
            $("#slight").range({
                range: false,
                change: function() {
                    var j = parseInt($("#slight").val()) - 30;
                    var f = iVal;
                    if ((parseInt(iVal) + parseInt(j)) > parseInt($("#heven").attr("max"))) {
                        iVal = parseInt($("#heven").attr("max"))
                    } else {
                        if ((parseInt(iVal) + parseInt(j)) < parseInt($("#heven").attr("min"))) {
                            iVal = parseInt($("#heven").val())
                        } else {
                            iVal = parseInt(f + j)
                        }
                    }
                    var e = Math.floor(iVal / 3600);
                    var g = Math.floor((iVal - e * 3600) / 60);
                    var h = iVal - e * 3600 - g * 60;
                    $("#hevenLeftBox").html((e < 10 ? "0" + e : e) + ":" + (g == 0 ? "00" : g) + ":" + (h == 0 ? "00" : h));
                    ii.ShowBestLimitsHistory();
                    ii.ShowInstInfoHistory();
                    $("#slightLeftBox").html(j);
                    iVal = f
                },
                blur: function() {}
            });
            $("#slightLeftBox").html("0");
            $("#switchContainer").html(MakeSwitch("switch", "خودکار", "دستی", false));
            $("#switch").click(function() {
                if ($("#switch").is(":checked")) {
                    ii.stopping = false;
                    ii.AutomaticMove();
                    $("#hevenMiddlePart").hide();
                    $("#hevenLeftBox").width(350);
                    $("#speedContainer").show();
                    $("#slightContainer").hide();
                    $("#helpSentence1").html("جهت تنظیم سرعت از نوار دوم استفاده نمایید")
                } else {
                    ii.stopping = true;
                    $("#hevenLeftBox").css({
                        width: ""
                    });
                    $("#hevenMiddlePart").show();
                    $("#speedContainer").hide();
                    $("#slightContainer").show();
                    var e = parseFloat(parseFloat(iVal - parseInt($("#heven").attr("min"))) / parseFloat(parseInt($("#heven").attr("max")) - parseInt($("#heven").attr("min"))));
                    $("#hevenCursor").offset({
                        left: (curserStartLeft + parseFloat(e * ($("#hevenMiddlePart").width() - 12)))
                    });
                    $("#helpSentence1").html("با استفاده از نوار بالایی زمان مورد نظر از روز را تعیین نمایید. همچنین می توانید جهت تنظیم دقیق تر از نوار دوم استفاده نمایید.")
                }
            });
            var d = $("#hevenCursor");
            var c = d.offset();
            curserStartLeft = c.left;
            $("#hevenCursor").offset({
                left: (c.left + ($("#hevenMiddlePart").width() - 12))
            });
            ii.ShowBestLimitsHistory();
            ii.ShowInstInfoHistory();
            ii.ShowShareHolderInfo()
        },
        ShowBestLimitsHistory: function() {
            var b = ii.MinuteToTime(iVal);
            var d = ii.FindBestLimitsPos(b);
            var c;
            for (ipos = 0; ipos < 5; ipos++) {
                c = ii.FindBestLimitsRow(b, ipos + 1, d);
                if (c != -1) {
                    $("#blhb").children()[ipos].children[0].innerHTML = ii.ReadableHEven(ii.OneDayBL[c][0]);
                    for (jpos = 0; jpos < 3; jpos++) {
                        $("#blhb").children()[ipos].children[jpos + 1].innerHTML = addCommas(ii.OneDayBL[c][jpos + 2])
                    }
                    for (jpos = 0; jpos < 3; jpos++) {
                        $("#blhs").children()[ipos].children[jpos].innerHTML = addCommas(ii.OneDayBL[c][jpos + 5])
                    }
                }
            }
            ii.SetBestLimitsLastUpdatedTimes()
        },
        FindBestLimitsPos: function(b) {
            var c;
            for (c = 0; c < ii.OneDayBL.length; c++) {
                if (parseInt(ii.OneDayBL[c][0]) > b) {
                    return c > 0 ? c - 1 : 0
                }
            }
            return ii.OneDayBL.length - 1
        },
        FindBestLimitsRow: function(b, e, d) {
            var c;
            for (c = d; c > -1; c--) {
                if (parseInt(ii.OneDayBL[c][1]) == e) {
                    return c
                }
            }
            return -1
        },
        ShowInstInfoHistory: function() {
            if (ii.OneDayCP.length > 0) {
                var e = ii.MinuteToTime(iVal);
                var t = ii.FindInstInfoPos(e);
                var b = "highlight1";
                var c = "highlight2";
                var d = "highlight3";
                $("." + b).removeClass(b);
                $("." + c).removeClass(c);
                $("." + d).removeClass(d);
                var k;
                var f;
                var g;
                var h;
                var l = ii.OneDayCP[t];
                $("#d00").html(l[0]);
                var s = parseInt(l[5]);
                var r = parseInt(l[2]);
                var p = parseInt(l[3]);
                var j = l[11];
                var q = "";
                var o = "";
                if (Flow != "4") {
                    if (l[8] == "0") {
                        o = "<span style='font-size:15px;font-weight:bold'>" + addCommas(l[3]) + "</span>";
                        q = addCommas(l[2])
                    } else {
                        o = addCommas(l[3]);
                        q = "<span style='font-size:15px;font-weight:bold'>" + addCommas(l[2]) + "</span>"
                    }
                    if (s == r || parseInt(l[8]) == 0) {
                        k = q
                    } else {
                        if (s > r) {
                            k = q + "&nbsp;&nbsp;<span style='font-size:11px;color:red'>" + addCommas(s - r) + "&nbsp;&nbsp;(" + AdvRound(100 * (s - r) / s, 2) + "%)</span>"
                        } else {
                            if (s < r) {
                                k = q + "&nbsp;&nbsp;<span style='font-size:11px;color:green'>" + addCommas(r - s) + "&nbsp;&nbsp;(" + AdvRound(100 * (r - s) / s, 2) + "%)</span>"
                            }
                        }
                    }
                    $("#d02").html(k);
                    PdrCotVal = l[2];
                    if (s > p) {
                        k = o + "&nbsp;&nbsp;<span style='font-size:11px;color:red'>" + addCommas(s - p) + "&nbsp;&nbsp;(" + AdvRound(100 * (s - p) / s, 2) + "%)</span>"
                    } else {
                        if (s < p) {
                            k = o + "&nbsp;&nbsp;<span style='font-size:11px;color:green'>" + addCommas(p - s) + "&nbsp;&nbsp;(" + AdvRound(100 * (p - s) / s, 2) + "%)</span>"
                        } else {
                            k = o
                        }
                    }
                    $("#d03").html(k);
                    PClosing = l[3]
                }
                if (Flow != "4") {
                    $("#d04").html(addCommas(l[4]));
                    $("#d05").html(addCommas(l[5]));
                    $("#d06").html(addCommas(l[6]));
                    $("#d07").html(addCommas(l[7]));
                    $("#d08").html(addCommas(l[8]))
                }
                $("#d09").html(addCommas(l[9]));
                $("#d10").html(addCommas(l[10]));
                if (Flow != "3") {
                    $("#d11").html(bigNumber(parseInt(l[3]) * ZTitad))
                }
            }
            if (ii.OneDayTH.length > 0) {
                var v = ii.FindStaticTreshholdPos(e);
                var n = ii.OneDayTH[v];
                $("#d13").html(addCommas(n[1]));
                $("#d14").html(addCommas(n[2]))
            }
            if (ii.OneDayTH.length > 0) {
                var u = ii.FindInstrumentStatePos(e);
                var m = ii.OneDayIS[u];
                $("#d01").html(InsState(m[2]))
            }
        },
        FindInstInfoPos: function(b) {
            var c;
            for (c = 0; c < ii.OneDayCP.length; c++) {
                if (parseInt(ii.OneDayCP[c][12]) > b) {
                    return c > 0 ? c - 1 : 0
                }
            }
            return ii.OneDayCP.length - 1
        },
        FindStaticTreshholdPos: function(b) {
            var c;
            for (c = 0; c < ii.OneDayTH.length; c++) {
                if (parseInt(ii.OneDayTH[c][0]) > b) {
                    return c > 0 ? c - 1 : 0
                }
            }
            return ii.OneDayTH.length - 1
        },
        FindInstrumentStatePos: function(b) {
            var c;
            for (c = 0; c < ii.OneDayIS.length; c++) {
                if (parseInt(ii.OneDayIS[c][1]) > b) {
                    return c > 0 ? c - 1 : 0
                }
            }
            return ii.OneDayIS.length - 1
        },
        MinuteToTime: function(e) {
            var b = Math.floor(e / 3600);
            var c = Math.floor((e - b * 3600) / 60);
            var d = e - b * 3600 - c * 60;
            return b * 10000 + c * 100 + d
        },
        DrawTabs: function() {
            $("#MainBox").append('<div><div id="TradesContent" class="tabcontent content">ردیف هایی که روی مقادیر آنها خط کشیده شده، مربوط به معامله های باطل شده می باشند<div class="content"><div id="trade" style="background-color:white;direction:ltr;" ></div></div></div></div>');
            $("#MainBox").append('<div><div id="TradesOverview" class="tabcontent content"><div class="content"><div id="tradesoverview" style="background-color:white;direction:ltr;" ></div></div></div></div>');
            $("#tabs").html('<div class="menuHolder2"><ul class="menu2"><li><a href="#url" class="red" onclick="ii.ShowTab(0)">در یک نگاه</a></li><li><a href="#url" class="green" onclick="ii.ShowTab(1)">معاملات</a></li><li><a href="#url" class="blue" onclick="ii.ShowTab(2)">حجم - قیمت</a></li></ul></div>')
        },
        ShowTab: function(b) {
            $(".tabcontent").css("display", "none");
            switch (b) {
            case 0:
                $("#MainContent").css("display", "");
                if (ii.stoppingDueToTabChange == true) {
                    ii.stopping = false;
                    ii.stoppingDueToTabChange = false;
                    ii.AutomaticMove()
                }
                break;
            case 1:
                $("#TradesContent").css("display", "");
                if (ii.stopping == false) {
                    ii.stopping = true;
                    ii.stoppingDueToTabChange = true
                }
                break;
            case 2:
                $("#TradesOverview").css("display", "");
                if (ii.stopping == false) {
                    ii.stopping = true;
                    ii.stoppingDueToTabChange = true
                }
                break
            }
        },
        StartInstHistoryInfo: function() {
            stepLength = 1;
            iVal = parseInt($("#heven").val());
            speedVal = 1;
            ii.DrawTabs();
            ii.OneDay(DEven);
            ii.SmallChart3();
            ii.SmallChart1();
            ii.SmallChart4();
            ii.BuildGrid();
            ii.BuildGridTradesOverview();
            ii.ShowTab(0)
        },
        JustBigNumber: function(b) {
            var c = parseFloat(b);
            var d;
            if (c > 1000000000) {
                d = addCommas(Math.round(c / 1000000) / 1000) + " B"
            } else {
                if (c > 1000000) {
                    d = addCommas(Math.round(c / 1000) / 1000) + " M"
                } else {
                    d = addCommas(b)
                }
            }
            return d
        },
        SmallChart3: function() {
            $("#SmallChart3Title").html("قیمت،حجم در طول روز");
            $("#SmallChart3").html("<div id='scp1' style='height:185px;text-align:left;direction:ltr'></div><div id='scp2' style='height:125px;text-align:left;direction:ltr'></div>");
            var c = IntraDayPriceData;
            var d = [];
            var e = [];
            if (c == null || c.length <= 1) {
                $("#scp1").html("اطلاعات برای نمایش نمودار کافی نیست")
            } else {
                var b;
                for (i = 0; i < c.length; i++) {
                    b = c[i];
                    heven = b[0].split(":");
                    d.push([new Date(2010,1,1,heven[0],heven[1]), parseInt(b[1]), parseInt(b[2]), parseInt(b[3]), parseInt(b[4])]);
                    e.push([new Date(2010,1,1,heven[0],heven[1]), parseInt(b[5])])
                }
                var f = ii.Series.Candlestick;
                f.data = d;
                $("#scp1").jqChart({
                    legend: {
                        visible: false
                    },
                    border: ii.Border,
                    axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
                    series: [f]
                });
                $("#scp1").bind("tooltipFormat", function(h, g) {
                    return "<table><tr><td colspan=2>" + g.x.toString().substr(16, 9) + "</td></tr><tr><td>Open</td><td>" + ii.JustBigNumber(g.open) + "</td></tr><tr><td>High</td><td>" + ii.JustBigNumber(g.high) + "</td></tr><tr><td>Low</td><td>" + ii.JustBigNumber(g.low) + "</td></tr><tr><td>Close</td><td>" + ii.JustBigNumber(g.close) + "</td></tr></table>"
                });
                f = ii.Series.Volume;
                f.data = e;
                $("#scp2").bind("axisLabelCreating", function(h, g) {
                    if (g.context.axis.location == "left") {
                        g.text = ii.JustBigNumber(g.text)
                    }
                });
                $("#scp2").jqChart({
                    legend: {
                        visible: false
                    },
                    border: ii.Border,
                    axes: [ii.Axes.LinearY, ii.Axes.DateTimeIntra],
                    series: [f]
                });
                $("#scp2").bind("tooltipFormat", function(h, g) {
                    return "<table><tr><td colspan=2>" + g.x.toString().substr(16, 9) + "</td></tr><tr><td>" + ii.JustBigNumber(g.y) + "</td></tr></table>"
                })
            }
        },
        SmallChart1: function() {
            $("#SmallChart1Title").html("قیمت، عرضه، تقاضا");
            $("#SmallChart1").html("<div id='scp3' style='text-align:left;direction:ltr;height:300px'></div>");
            var b = [];
            var g = [];
            var f = [];
            var c;
            var e;
            if (ii.OneDayBL == null || ii.OneDayBL.length <= 1 || ii.OneDayCP == null || ii.OneDayCP.length <= 1) {
                $("#scp3").html("اطلاعات برای نمایش نمودار کافی نیست")
            } else {
                for (i = 0; i < ii.OneDayBL.length; i++) {
                    var d = [];
                    c = ii.OneDayBL[i];
                    if (c[1] != "1") {
                        continue
                    }
                    e = c[0].toString();
                    if (e.length == 5) {
                        e = "0" + e
                    }
                    d.push(parseInt(e.substring(0, 2), 10));
                    d.push(parseInt(e.substring(2, 4), 10));
                    d.push(parseInt(e.substring(4, 6), 10));
                    if (parseFloat(c[4]) != 0) {
                        b.push([new Date(2010,1,1,d[0],d[1],d[2]), parseFloat(c[4])])
                    }
                    if (parseFloat(c[5]) != 0) {
                        g.push([new Date(2010,1,1,d[0],d[1],d[2]), parseFloat(c[5])])
                    }
                }
                for (i = 0; i < ii.OneDayCP.length; i++) {
                    var d = [];
                    e = ii.OneDayCP[i][12].toString();
                    if (e.length == 5) {
                        e = "0" + e
                    }
                    d.push(parseInt(e.substring(0, 2), 10));
                    d.push(parseInt(e.substring(2, 4), 10));
                    d.push(parseInt(e.substring(4, 6), 10));
                    f.push([new Date(2010,1,1,d[0],d[1],d[2]), parseFloat(ii.OneDayCP[i][2])])
                }
                $("#scp3").jqChart({
                    border: {
                        cornerRadius: 0,
                        lineWidth: 0,
                        strokeStyle: "green"
                    },
                    axes: [ii.Axes.LinearY, ii.Axes.DateTimeIntra],
                    legend: {
                        location: "bottom"
                    },
                    tooltips: {
                        type: "shared"
                    },
                    series: [{
                        type: "line",
                        data: f,
                        strokeStyle: "black",
                        markers: {
                            size: 0
                        },
                        title: "ارزش"
                    }, {
                        type: "line",
                        data: b,
                        strokeStyle: "blue",
                        markers: {
                            size: 0
                        },
                        title: "خرید"
                    }, {
                        type: "line",
                        data: g,
                        strokeStyle: "red",
                        markers: {
                            size: 0
                        },
                        title: "فروش"
                    }]
                });
                $("#scp3").bind("tooltipFormat", function(j, h) {
                    return "<table><tr><td colspan=2>" + h[0].x.toString().substr(16, 9) + "</td></tr><tr><td>" + ii.JustBigNumber(h[0].y) + "</td><td style='color:Red;'>فروش</td></tr><tr><td>" + ii.JustBigNumber(h[1].y) + "</td><td style='color:Blue;' >خرید</td></tr><tr><td>" + ii.JustBigNumber(h[2].y) + "</td><td style='color:Black;'>ارزش</td></tr></table>"
                })
            }
        },
        SmallChart4: function() {
            $("#SmallChart4Title").html("قیمت معامله، قیمت پایانی");
            $("#SmallChart4").html("<div id='scp4' style='text-align:left;direction:ltr;height:300px'></div>");
            var f = [];
            var e = [];
            var b;
            var d;
            if (ii.OneDayCP == null || ii.OneDayCP.length <= 1) {
                $("#scp4").html("اطلاعات برای نمایش نمودار کافی نیست")
            } else {
                for (i = 0; i < ii.OneDayCP.length; i++) {
                    var c = [];
                    d = ii.OneDayCP[i][12].toString();
                    if (d.length == 5) {
                        d = "0" + d
                    }
                    c.push(parseInt(d.substring(0, 2), 10));
                    c.push(parseInt(d.substring(2, 4), 10));
                    c.push(parseInt(d.substring(4, 6), 10));
                    f.push([new Date(2010,1,1,c[0],c[1],c[2]), parseFloat(ii.OneDayCP[i][2])]);
                    e.push([new Date(2010,1,1,c[0],c[1],c[2]), parseFloat(ii.OneDayCP[i][3])])
                }
                $("#scp4").jqChart({
                    border: {
                        cornerRadius: 0,
                        lineWidth: 0,
                        strokeStyle: "green"
                    },
                    axes: [ii.Axes.LinearY, ii.Axes.DateTimeIntra],
                    legend: {
                        location: "bottom"
                    },
                    tooltips: {
                        type: "shared"
                    },
                    series: [{
                        type: "line",
                        data: f,
                        strokeStyle: "darkblue",
                        markers: {
                            size: 0
                        },
                        title: "آخرین معامله"
                    }, {
                        type: "line",
                        data: e,
                        strokeStyle: "darkgreen",
                        markers: {
                            size: 0
                        },
                        title: "قیمت پایانی"
                    }]
                });
                $("#scp4").bind("tooltipFormat", function(h, g) {
                    return "<table><tr><td colspan=2>" + g[0].x.toString().substr(16, 9) + "</td></tr><tr><td>" + ii.JustBigNumber(g[1].y) + "</td><td style='color:DarkGreen;' >قیمت پایانی</td></tr><tr><td>" + ii.JustBigNumber(g[0].y) + "</td><td style='color:DarkBlue;'>آخرین معامله</td></tr></table>"
                })
            }
        },
        stopping: true,
        stoppingDueToTabChange: false,
        AutomaticMove: function() {
            if (ii.stopping) {
                return
            }
            iVal = iVal + stepLength;
            if (iVal > parseInt($("#heven").attr("max"))) {
                iVal = parseInt($("#heven").attr("min"))
            }
            var b = Math.floor(iVal / 3600);
            var c = Math.floor((iVal - b * 3600) / 60);
            var d = iVal - b * 3600 - c * 60;
            $("#hevenLeftBox").html((b < 10 ? "0" + b : b) + ":" + (c == 0 ? "00" : c) + ":" + (d == 0 ? "00" : d));
            ii.ShowBestLimitsHistory();
            ii.ShowInstInfoHistory();
            stepLength = speedVal;
            window.setTimeout("ii.AutomaticMove()", 1000)
        },
        BuildGrid: function() {
            var c = "ـ,زمان,حجم,قیمت";
            document.getElementById("trade").style.height = ($(window).height() - 160) + "px";
            gr = new dhtmlXGridObject("trade");
            gr.setImagePath("/tools/dhtmlxgrid/imgs/");
            gr.setHeader(c);
            gr.setColTypes("ed,ed,ed,ed");
            gr.setInitWidths("75,100,150,150");
            gr.setColSorting("str,str,str,str");
            gr.setColAlign("left,left,left,left");
            gr.enableTooltips("false,false,false,false");
            gr.setSkin("modern");
            gr.setEditable(false);
            gr.init();
            gr.clearAll();
            var d = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
            if (d) {
                gr.enableAutoHeight(true)
            }
            for (i = 0; i < ii.OneDayIT.length; i++) {
                var b = ii.OneDayIT[i];
                gr.addRowP0(i, [b[0], b[1], b[2], b[3]]);
                if (b[4] == 1) {
                    gr.setRowTextStyle(i, "text-decoration:line-through")
                }
            }
        },
        BuildGridTradesOverview: function() {
            var b = "اولین,آخرین,حجم,قیمت";
            document.getElementById("tradesoverview").style.height = ($(window).height() - 160) + "px";
            gr = new dhtmlXGridObject("tradesoverview");
            gr.setImagePath("/tools/dhtmlxgrid/imgs/");
            gr.setHeader(b);
            gr.setColTypes("ed,ed,ed,ed");
            gr.setInitWidths("100,100,150,150");
            gr.setColSorting("str,str,str,str");
            gr.setColAlign("left,left,left,left");
            gr.enableTooltips("false,false,false,false");
            gr.setSkin("modern");
            gr.setEditable(false);
            gr.init();
            gr.clearAll();
            var d = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
            if (d) {
                gr.enableAutoHeight(true)
            }
            var l = new Array();
            var m = new Array();
            var j = new Array();
            var k = new Array();
            for (i = 0; i < ii.OneDayIT.length; i++) {
                var c = l.indexOf(ii.OneDayIT[i][3]);
                if (ii.OneDayIT[i][3] != "1") {
                    if (c != -1) {
                        m[c] = parseInt(m[c], 10) + parseInt(ii.OneDayIT[i][2], 10);
                        j[c] = (j[c] > parseInt(ii.OneDayIT[i][1].replace(/:/g, ""), 10)) ? parseInt(ii.OneDayIT[i][1].replace(/:/g, ""), 10) : j[c];
                        k[c] = (k[c] < parseInt(ii.OneDayIT[i][1].replace(/:/g, ""), 10)) ? parseInt(ii.OneDayIT[i][1].replace(/:/g, ""), 10) : k[c]
                    } else {
                        l.push(ii.OneDayIT[i][3]);
                        c = l.indexOf(ii.OneDayIT[i][3]);
                        m[c] = parseInt(ii.OneDayIT[i][2], 10);
                        j[c] = parseInt(ii.OneDayIT[i][1].replace(/:/g, ""), 10);
                        k[c] = parseInt(ii.OneDayIT[i][1].replace(/:/g, ""), 10)
                    }
                }
            }
            var h = m.slice(0);
            h.sort(function(n, o) {
                return o - n
            });
            var g = new Array();
            var f = 0;
            var e = 0;
            for (i = 0; i < h.length; i++) {
                var c = m.indexOf(h[i]);
                if (h[i] == f) {
                    c = m.indexOf(h[i], (e + 1))
                }
                g.push(l[c]);
                e = c;
                f = h[i]
            }
            for (i = 0; i < g.length; i++) {
                var c = l.indexOf(g[i]);
                gr.addRowP0(i, [ii.ReadableHEven(j[c]), ii.ReadableHEven(k[c]), m[c], l[c]])
            }
        },
        ReadableHEven: function(b) {
            var c = b.toString().length == 5 ? "0" + b.toString() : b.toString();
            return c.substring(0, 2) + ":" + c.substring(2, 4) + ":" + c.substring(4, 6)
        },
        SetBestLimitsLastUpdatedTimes: function() {
            var b = true;
            var c = [false, false, false, false, false];
            var e = [false, false, false, false, false];
            var d = ii.MinuteToTime(iVal);
            for (downPos = ii.FindBestLimitsPos(d); downPos >= 0; downPos--) {
                for (ipos = 0; ipos < 5; ipos++) {
                    if (ii.OneDayBL[downPos][1] == (ipos + 1)) {
                        if (!e[ipos]) {
                            if ((addCommas(ii.OneDayBL[downPos][5]) == $("#blhs").children()[ipos].children[0].innerHTML) && (addCommas(ii.OneDayBL[downPos][6]) == $("#blhs").children()[ipos].children[1].innerHTML) && (addCommas(ii.OneDayBL[downPos][7]) == $("#blhs").children()[ipos].children[2].innerHTML)) {
                                if (parseInt(ii.OneDayBL[downPos][0], 10) < 80000) {
                                    $("#blhs").children()[ipos].children[3].innerHTML = "روز قبل";
                                    e[ipos] = true
                                } else {
                                    $("#blhs").children()[ipos].children[3].innerHTML = ii.ReadableHEven(ii.OneDayBL[downPos][0])
                                }
                            } else {
                                e[ipos] = true
                            }
                        }
                        if (!c[ipos]) {
                            if ((addCommas(ii.OneDayBL[downPos][2]) == $("#blhb").children()[ipos].children[1].innerHTML) && (addCommas(ii.OneDayBL[downPos][3]) == $("#blhb").children()[ipos].children[2].innerHTML) && (addCommas(ii.OneDayBL[downPos][4]) == $("#blhb").children()[ipos].children[3].innerHTML)) {
                                if (parseInt(ii.OneDayBL[downPos][0], 10) < 80000) {
                                    $("#blhb").children()[ipos].children[0].innerHTML = "روز قبل";
                                    e[ipos] = true
                                } else {
                                    $("#blhb").children()[ipos].children[0].innerHTML = ii.ReadableHEven(ii.OneDayBL[downPos][0])
                                }
                            } else {
                                c[ipos] = true
                            }
                        }
                    }
                }
            }
        },
        ShowShareHolder: function(b) {
            $.ajax({
                url: "tsev2/data/ShareHolder.aspx",
                cache: true,
                data: {
                    i: b
                },
                dataType: "text",
                success: function(g) {
                    var h = g.split("#");
                    var c = [];
                    var j = h[0].split(";");
                    var e;
                    var l;
                    var d = "SHChart" + Math.floor(Math.random() * 10000);
                    for (i = 0; i < j.length; i++) {
                        e = j[i].split(",");
                        l = new Date(e[0].substring(0, 4),parseInt(e[0].substring(4, 6), 10) - 1,e[0].substring(6, 8));
                        c.push([l, parseInt(e[1])])
                    }
                    var k = "<div class='box1 white tbl'><div class='header'>تاریخچه تعداد سهام</div><div class='content'><table class='table1'><thead><tr><th>تاریخ</th><th>سهم</th></tr></thead><tbody>";
                    for (i = j.length - 2; i >= 0; i--) {
                        e = j[i].split(",");
                        k += "<tr><td>" + toPersianDate(new Date(e[0].substring(0, 4),parseInt(e[0].substring(4, 6), 10) - 1,e[0].substring(6, 8))) + "</td><td> " + bigNumber(parseInt(e[1], 10)) + "</td></tr>"
                    }
                    k += "</tbody></table></div></div>";
                    var f = "<div class='box1 white tbl'><div class='header'>سایر سهم های سهامدار عمده</div><div class='content'><table class='table1'><thead><tr><th>نام</th><th>سهم</th><th>درصد</th></tr></thead><tbody>";
                    j = h[1].split(";");
                    for (i = 0; i < j.length - 1; i++) {
                        e = j[i].split(",");
                        f += "<tr><td><a target='" + e[0] + "' href='" + InstUrl(e[0]) + "'>" + e[1] + "</a></td><td> " + bigNumber(e[2]) + "</td><td>" + e[3] + "</td></tr>"
                    }
                    f += "</tbody></table></div></div>";
                    ShowModalStaticPro("اطلاعات سهامدار", '<div class="s900 h250" style="text-align:left;direction:ltr" id=\'' + d + "'></div>" + k + "&nbsp;&nbsp;" + f);
                    if (c.length > 2) {
                        $("#" + d);
                        $("#" + d).bind("axisLabelCreating", function(n, m) {
                            if (m.context.axis.location == "bottom") {
                                m.text = toPersianDate(new Date(m.text))
                            } else {
                                m.text = $("<div></div>").html(bigNumber(m.text)).text()
                            }
                        });
                        $("#" + d).jqChart({
                            legend: {
                                visible: false
                            },
                            border: ii.Border,
                            axes: [{
                                type: "linear",
                                location: "left"
                            }, ii.Axes.DateTimeLong],
                            series: [{
                                type: "line",
                                lineWidth: 1,
                                data: c,
                                strokeStyle: "blue",
                                markers: {
                                    size: 4,
                                    strokeStyle: "black",
                                    fillStyle: "red",
                                    type: "rectangle",
                                    lineWidth: 1
                                }
                            }]
                        });
                        $("#" + d).bind("tooltipFormat", function(n, m) {
                            return toPersianDate(m.x) + "<br/>" + bigNumber(m.y)
                        })
                    }
                }
            })
        },
        ShowShareHolderInfo: function() {
            var b = "";
            for (ipos = 0; ipos < ii.OneDaySH.length; ipos++) {
                b += '<tr class="sh" onclick="ii.ShowShareHolder(\'' + ii.OneDaySH[ipos][0] + "," + ii.OneDaySH[ipos][1] + "')\" ><td>" + ii.OneDaySH[ipos][5] + "</td><td>" + bigNumber(ii.OneDaySH[ipos][2]) + "</td><td>" + ii.OneDaySH[ipos][3] + '</td><td><div class="' + ii.OneDaySH[ipos][4] + '"></div></td></tr>'
            }
            $("#shtt").html(b);
            b = "";
            for (ipos = 0; ipos < ii.OneDaySY.length; ipos++) {
                b += '<tr class="sh" onclick="ii.ShowShareHolder(\'' + ii.OneDaySY[ipos][0] + "," + ii.OneDaySY[ipos][1] + "')\" ><td>" + ii.OneDaySY[ipos][5] + "</td><td>" + bigNumber(ii.OneDaySY[ipos][2]) + "</td><td>" + ii.OneDaySY[ipos][3] + '</td><td><div class="' + ii.OneDaySY[ipos][4] + '"></div></td></tr>'
            }
            $("#shty").html(b)
        }
    };
    return a
}
;;