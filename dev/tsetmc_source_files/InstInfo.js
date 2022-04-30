/*obtained from the source code of an instrument page (ParTree=151311&i=64942549055019553) */
function InstInfo() {
	var InstInfo = {
		NoDataMsg: "اطلاعات برای نمایش نمودار کافی نیست",
		Border: {
			lineWidth: 0,
			padding: 0
		},
		Series: {
			Candlestick: {
				type: "candlestick",
				priceUpFillStyle: "white",
				pointWidth: 0.85,
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
					lineWidth: 1,
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
			},
			LogY: {
				logarithmic: true,
				logBase: 10,
				type: "linear",
				labels: {
					stringFormat: "%.1f"
				},
				interval: 0.2,
				location: "left",
				width: 60,
				minorGridLines: {
					interval: 2,
					strokeStyle: "black"
				}
			}
		},
		IntraDayChart: function(type) {
			if ($("#IntraDayChart").length == 0) {
				$("#ExtraChart").append("<div id='IntraDayChart' class=\"box1 white tbl z4_4\" style='height:255px'><div class=\"header\">نمودار در طی روز - این نمودار به صورت خودکار بروز رسانی می شود<span style='float:left'><a href='#' onclick=\"ExportToImage('IntraDayChart')\" class='saveBtn'>&nbsp;</a>&nbsp;<a href='#' onclick=\"$('#IntraDayChart').remove()\" class='closeBtn'>&nbsp;</a></span></div><div id='idc1' style='height:180px;text-align:left;direction:ltr'></div><div id='idc2' style='height:65px;text-align:left;direction:ltr'></div></div>")
			}
			$.ajax({
				url: "tsev2/chart/data/IntraDayPrice.aspx",
				cache: true,
				data: {
					i: InsCode
				},
				dataType: "text",
				error: function() {
					if ($("#IntraDayChart").length > 0) {
						window.setTimeout("ii.IntraDayChart()", 120000)
					}
				},
				success: function(data) {
					if ($("#IntraDayChart").length == 0) {
						return
					}
					var intraDayData = [];
					var intraDayVol = [];
					var rows = data.split(";");
					if (rows.length <= 1) {
						$("#idc1").html(ii.NoDataMsg)
					} else {
						var cols;
						for (i = 0; i < rows.length; i++) {
							cols = rows[i].split(",");
							heven = cols[0].split(":");
							if (type == "c") {
								intraDayData.push([new Date(2010, 1, 1, heven[0], heven[1]), parseInt(cols[1]), parseInt(cols[2]), parseInt(cols[3]), parseInt(cols[4])])
							} else {
								intraDayData.push([new Date(2010, 1, 1, heven[0], heven[1]), parseInt(cols[4])])
							}
							intraDayVol.push([new Date(2010, 1, 1, heven[0], heven[1]), parseInt(cols[5])])
						}
						var Sery;
						if (type == "c") {
							Sery = ii.Series.Candlestick
						} else {
							Sery = ii.Series.Line
						}
						Sery.data = intraDayData;
						$("#idc1").jqChart({
							legend: {
								visible: false
							},
							border: ii.Border,
							axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
							series: [Sery]
						});
						if (type == "c") {
							$("#idc1").bind("tooltipFormat", function(e, data) {
								return "<table><tr><td colspan=2>" + data.x.getHours() + ":" + data.x.getMinutes() + "</td></tr><tr><td>Open</td><td>" + data.open + "</td></tr><tr><td>High</td><td>" + data.high + "</td></tr><tr><td>Low</td><td>" + data.low + "</td></tr><tr><td>Close</td><td>" + data.close + "</td></tr></table>"
							})
						} else {
							$("#idc1").bind("tooltipFormat", function(e, data) {
								return data.x.getHours() + ":" + data.x.getMinutes() + "<br/>" + data.y
							})
						}
						Sery = ii.Series.Volume;
						Sery.data = intraDayVol;
						$("#idc2").jqChart({
							legend: {
								visible: false
							},
							border: ii.Border,
							axes: [ii.Axes.LinearY, ii.Axes.DateTimeIntra],
							series: [Sery]
						});
						$("#idc2").bind("tooltipFormat", function(e, data) {
							return data.x.getHours() + ":" + data.x.getMinutes() + "<br/>" + bigNumber(data.y)
						})
					}
					if ($("#IntraDayChart").length > 0) {
						window.setTimeout("ii.IntraDayChart()", 120000)
					}
				}
			})
		},
		ChartNo: 0,
		ChartData: [],
		CustomChartInit: function(type, adj) {
			var chNo = ii.ChartNo++;
			var chHeight;
			var chHeights = [375, 600];
			var chTitle = "";
			var Chart2 = "<div id='chp1" + chNo + "' style='height:230px;text-align:left;direction:ltr'></div><div id='chp2" + chNo + "' style='height:75px;text-align:left;direction:ltr'></div>";
			var chParts = "<div id='chp1" + chNo + "' style='height:230px;text-align:left;direction:ltr'></div><div id='chp2" + chNo + "' style='height:230px;text-align:left;direction:ltr'></div><div id='chp3" + chNo + "' style='height:75px;text-align:left;direction:ltr'></div>";
			switch (type) {
				case "adx":
					chHeight = chHeights[1];
					chTitle = "Average Directional Index - Lag:14";
					break;
				case "bad":
					chHeight = chHeights[1];
					chTitle = "Breadth Advance/Decline - Lag:14";
					break;
				case "bop":
					chHeight = chHeights[1];
					chTitle = "BOP - Balance Of Power - Lag:14";
					break;
				case "aoc":
					chHeight = chHeights[1];
					chTitle = "Aroon Oscillator - Lag:14";
					break;
				case "adi":
					chHeight = chHeights[1];
					chTitle = "Accumulation Distribution";
					break;
				case "atr":
					chHeight = chHeights[1];
					chTitle = "Average True Range - Lag:14";
					break;
				case "adl":
					chHeight = chHeights[1];
					chTitle = "A/D Line - Advance/Decline Line";
					break;
				case "cci":
					chHeight = chHeights[1];
					chTitle = "CCI - Commodity Channel Index - Lag:14";
					break;
				case "mcc":
					chHeight = chHeights[1];
					chTitle = "McClellan Oscillator";
					break;
				case "vol":
					chHeight = chHeights[1];
					chTitle = "Volatility - Lag:14";
					break;
				case "wil":
					chHeight = chHeights[1];
					chTitle = "Williams %R - Lag:14";
					break;
				case "sto":
					chHeight = chHeights[1];
					chTitle = "Stochastic Oscillator K=14 D=3";
					break;
				case "obv":
					chHeight = chHeights[1];
					chTitle = "OBV - On Balance Volume";
					break;
				case "mm":
					chHeight = chHeights[1];
					chTitle = "Momentum - lag:20";
					break;
				case "ema20":
					chHeight = chHeights[0];
					chTitle = "EMA - Exponential Moving Average - 20 Days";
					chParts = Chart2;
					break;
				case "ma20":
					chHeight = chHeights[0];
					chTitle = "Moving Average - 20 Days";
					chParts = Chart2;
					break;
				case "ph":
				case "phl":
					chHeight = chHeights[0];
					chTitle = "نمودار تاریخچه حجم - قیمت";
					chParts = Chart2;
					break;
				case "bb":
					chHeight = chHeights[0];
					chTitle = "Bollinger Bands N=20,K=2";
					chParts = Chart2;
					break;
				case "mfi":
					chHeight = chHeights[1];
					chTitle = "Money Flow Index N=14";
					break;
				case "cmf":
					chHeight = chHeights[1];
					chTitle = "Chaikin Money Flow N=20";
					break;
				case "macd":
					chHeight = chHeights[1];
					chTitle = "MACD Line: (12-day EMA - 26-day EMA) Signal Line: 9-day EMA of MACD Line";
					break;
				case "rsi":
					chHeight = chHeights[1];
					chTitle = "RSI - Relative Strength Index Lag=14";
					break;
				case "i&i":
					chHeight = chHeights[0];
					chTitle = "نمودار قیمت - شاخص";
					chParts = Chart2;
					break;
				case "ichi":
					chHeight = chHeights[0];
					chTitle = "Ichimoku Clouds (9,26,52)";
					chParts = Chart2;
					break
			}
			if (adj == 1) {
				chTitle += " [Adjusted]"
			}
			$("#ExtraChart").prepend("<div id='CustomChart" + chNo + "' class=\"box1 white tbl z4_4\" style='height:" + chHeight + 'px\'><div class="header bigheader">' + chTitle + "<span style='float:left'><a href='#' id='SwitchLog" + chNo + "' class='TinyBtn' title='نمایش محور لگاریتمی'>log</a>&nbsp;<a href='#' id='SwitchPoint" + chNo + "' class='TinyBtn' title='تعداد نقاط نمودار'>all</a>&nbsp;<a href='#' id='SwitchFullscreen" + chNo + "' class='TinyBtn' title='نمایش تمام صفحه'>Fullscreen</a>&nbsp;<a href='#' onclick=\"ExportToImage('#CustomChart" + chNo + "')\" class='TinyBtn' title='ذخیره نمودار بصورت تصویر'>save</a>&nbsp;<a href='#' onclick=\"ii.PinChart('" + adj + type + "')\" class='TinyBtn' title='نمایش خوکار نمودار در هنگام باز شدن صفحه'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAwFBMVEUtPks7SVY7SVY7SVY7SVZBT1pFUlxNW2dNW2dNW2dSXmhXY2xXY2xaZ3FaZ3FjbnhlcXtrd4F6g4uDjZWKk5qQmJ6VnaSaoqiaoqilrLKqsLayuL63vMG3vMHAxcnS1dju7/H7+/v7+/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7AF0dAAAAQHRSTlP//////////////////////////////////////////////wD/////////////////////////////////////eDhA4QAAAHlJREFUGJVNkN0KwyAMRpMLG7DIfmwNXcc2+d7/HadtNXrxyTkkIYRgL/Ijg4xlxT4NQlIJMiFaYg9deL0Db+4zvMpW+Gg66yu7VxMXx3CJkasQDbV/mXEKSZmNQUsEbs43BvHxJd8WJJdLrp1BH/7hOcMEvjLpcIM/KjgcZKPkQY4AAAAASUVORK5CYII=' /></a>&nbsp;<a href='#' onclick=\"ShowModalWindow('Site.aspx?ParTree=151713&LnkIdn=2418',null,250)\" class='TinyBtn' title='نکته های مهم در ارتباط با نمودار'>نکته های مهم</a>&nbsp;<a href='#' onclick=\"$('#CustomChart" + chNo + "').remove()\" class='TinyBtn' title='بستن'>X</a></span></div>" + chParts + "<dl class='ZoomBox'><dd style='width:100px;text-align:center;display:inline-block;vertical-align:top;direction:ltr;' id='CustomChartL1" + chNo + "'></dd><dd class='ZoomBoxInner' style='vertical-align:bottom;display:inline-block;direction:ltr'><input class='ZoomBoxInner' type='text' id='CustomChartZoom" + chNo + "' min='0'></dd><dd style='width:100px;display:inline-block;text-align:center;vertical-align:top;direction:ltr' id='CustomChartL2" + chNo + "'></dd></div>");
			if (typeof ii.ChartData[type + adj] == "undefined") {
				var DataType = type;
				if (type == "phl") {
					DataType = "ph"
				}
				$.ajax({
					url: MembersSite() + "/tsev2/chart/data/Financial.aspx",
					cache: true,
					data: {
						i: InsCode,
						t: DataType,
						a: adj
					},
					dataType: "text",
					success: function(data) {
						var dt = [];
						var dr = [];
						var rows = data.split(";");
						var cols;
						for (i = 0; i < rows.length; i++) {
							cols = rows[i].split(",");
							dr = [];
							dr.push(new Date(cols[0].substring(0, 4), parseInt(cols[0].substring(4, 6), 10) - 1, cols[0].substring(6, 8)));
							ex = cols.length;
							for (j = 1; j < cols.length; j++) {
								dr.push(parseFloat(cols[j]))
							}
							dt.push(dr)
						}
						ii.ChartData[type + adj] = dt;
						ii.CustomChartInit2(chNo, type, adj)
					}
				})
			} else {
				ii.CustomChartInit2(chNo, type, adj)
			}
		},
		PinChart: function(data) {
			var DefaultInstCharts = getData("DefaultInstCharts");
			var msg;
			if (DefaultInstCharts == null) {
				DefaultInstCharts = ""
			}
			if (DefaultInstCharts.indexOf(data) != -1) {
				DefaultInstCharts = DefaultInstCharts.replace("," + data, "");
				DefaultInstCharts = DefaultInstCharts.replace(data, "");
				msg = "عدم نمایش خودکار نمودار"
			} else {
				if (DefaultInstCharts.length != 0) {
					DefaultInstCharts += ","
				}
				DefaultInstCharts += data;
				msg = "نمودار بصورت خودکار نمایش داده خواهد شد"
			}
			setData("DefaultInstCharts", DefaultInstCharts);
			ShowModalStaticPro("", msg, 320, 60)
		},
		CustomChartInit2: function(chNo, type, adj) {
			var start = 0;
			var end = ii.ChartData[type + adj].length - 1;
			if (end > 90) {
				start = end - 90
			}
			$("#CustomChartL1" + chNo).html(toPersianDate(ii.ChartData[type + adj][0][0]));
			$("#CustomChartL2" + chNo).html(toPersianDate(ii.ChartData[type + adj][end][0]));
			$("#CustomChartZoom" + chNo).attr("max", end);
			$("#CustomChartZoom" + chNo).range({
				change: function() {},
				blur: function() {
					var iVal = $("#CustomChartZoom" + chNo).val().split(",");
					var LogChecked = $("#SwitchLog" + chNo).hasClass("on");
					var PointChecked = $("#SwitchPoint" + chNo).hasClass("on");
					ii.CustomChartDraw(chNo, type, parseInt(iVal[0]), parseInt(iVal[1]), LogChecked, PointChecked, adj)
				}
			});
			$("#CustomChartZoom" + chNo).range("set", [start, end]);
			$("#SwitchLog" + chNo).click(function() {
				var iVal = $("#CustomChartZoom" + chNo).val().split(",");
				var LogChecked = !($("#SwitchLog" + chNo).hasClass("on"));
				var PointChecked = $("#SwitchPoint" + chNo).hasClass("on");
				if (LogChecked) {
					$("#SwitchLog" + chNo).addClass("on")
				} else {
					$("#SwitchLog" + chNo).removeClass("on")
				}
				ii.CustomChartDraw(chNo, type, parseInt(iVal[0]), parseInt(iVal[1]), LogChecked, PointChecked, adj)
			});
			$("#SwitchPoint" + chNo).click(function() {
				var iVal = $("#CustomChartZoom" + chNo).val().split(",");
				var LogChecked = $("#SwitchLog" + chNo).hasClass("on");
				var PointChecked = !($("#SwitchPoint" + chNo).hasClass("on"));
				if (PointChecked) {
					$("#SwitchPoint" + chNo).addClass("on")
				} else {
					$("#SwitchPoint" + chNo).removeClass("on")
				}
				ii.CustomChartDraw(chNo, type, parseInt(iVal[0]), parseInt(iVal[1]), LogChecked, PointChecked, adj)
			});
			$("#SwitchFullscreen" + chNo).click(function() {
				var iVal = $("#CustomChartZoom" + chNo).val().split(",");
				var LogChecked = $("#SwitchLog" + chNo).hasClass("on");
				var PointChecked = !($("#SwitchPoint" + chNo).hasClass("on"));
				var Fullscreen = $("#SwitchFullscreen" + chNo).hasClass("on");
				if (!Fullscreen) {
					$("#SwitchFullscreen" + chNo).addClass("on");
					$("#CustomChart" + chNo).css("width", $(window).width() - 30);
					$("#CustomChart" + chNo).css("height", $(window).height() - 20);
					var h = $(window).height() - 100;
					if ($("#chp3" + chNo).length == 0) {
						$("#chp1" + chNo).css("height", h * 0.75);
						$("#chp2" + chNo).css("height", h * 0.25)
					} else {
						$("#chp1" + chNo).css("height", h * 0.4);
						$("#chp2" + chNo).css("height", h * 0.4);
						$("#chp3" + chNo).css("height", h * 0.2)
					}
				} else {
					$("#SwitchFullscreen" + chNo).removeClass("on");
					$("#CustomChart" + chNo).css("width", "");
					if ($("#chp3" + chNo).length == 0) {
						$("#CustomChart" + chNo).css("height", 375);
						$("#chp1" + chNo).css("height", 230);
						$("#chp2" + chNo).css("height", 75)
					} else {
						$("#CustomChart" + chNo).css("height", 600);
						$("#chp1" + chNo).css("height", 230);
						$("#chp2" + chNo).css("height", 230);
						$("#chp3" + chNo).css("height", 75)
					}
				}
				launchFullScreen("CustomChart" + chNo, !Fullscreen);
				ii.CustomChartDraw(chNo, type, parseInt(iVal[0]), parseInt(iVal[1]), LogChecked, PointChecked, adj)
			});
			$(($("#chp3" + chNo).length == 0 ? "#chp2" : "#chp3") + chNo).bind("axisLabelCreating", function(e, data) {
				if (data.context.axis.location == "bottom") {
					data.text = toPersianDate(new Date(data.text))
				} else {
					data.text = bigNumberTxt(data.text)
				}
			});
			ii.CustomChartDraw(chNo, type, start, end, false, false, adj)
		},
		CustomChartDraw: function(chNo, type, start, end, Logarithmic, ShowAllPoint, adj) {
			switch (type) {
				case "ph":
					ii.PriceHistory(chNo, type, start, end, Logarithmic, ShowAllPoint, adj);
					break;
				case "phl":
					ii.PriceHistoryLine(chNo, type, start, end, Logarithmic, ShowAllPoint, adj);
					break
			}
		},
		ShowSupervisionDetail: function() {
			$.ajax({
				url: "tsev2/data/Supervision.aspx",
				cache: false,
				data: {
					i: InsCode
				},
				dataType: "text",
				success: function(data) {
					var DataArray = data.split("#");
					ShowModalStaticPro("", "<div><table class='table1'><tr><td style='font-weight:bold;width:100px;text-align:right;' >وضعیت</td><td style='width:160px;text-align:right;' >" + UnderSupervision(DataArray[0]) + "</td></tr><tr><td style='font-weight:bold;width:100px;text-align:right;' >علت :</td><td style='text-align:right;'>" + DataArray[1] + "</td></tr><tr><td style='font-weight:bold;width:160px;text-align:right;' >توضیحات :</td><td style='text-align:right;'>" + DataArray[2] + "</td></tr><tr><td style='font-weight:bold;width:160px;text-align:right;' >تاریخ تغییر وضعیت :</td><td style='text-align:right;'>" + DataArray[3] + "</td></tr></table></div>", 500, 200, "")
				}
			})
		},
		PriceHistory: function(chNo, type, start, end, Logarithmic, ShowAllPoint, adj) {
			if (end - start < 2) {
				return
			}
			var SkipPoints = parseInt((end - start) / 120, 10) + 1;
			var dt = ii.ChartData[type + adj];
			var dataHLOCV = [];
			var dataVol = [];
			for (i = start; i <= end; i++) {
				if (ShowAllPoint == false && i % SkipPoints != 0) {
					continue
				}
				cols = dt[i];
				dataHLOCV.push([cols[0], cols[1], cols[2], cols[3], cols[4]]);
				dataVol.push([cols[0], cols[5]])
			}
			var Sery;
			Sery = ii.Series.Candlestick;
			Sery.data = dataHLOCV;
			var AxesY;
			if (Logarithmic) {
				AxesY = ii.Axes.LogY
			} else {
				AxesY = ii.Axes.LinearY
			}
			try {
				$("#chp1" + chNo).jqChart("destory")
			} catch (e) {}
			$("#chp1" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [AxesY, ii.Axes.DateTimeHidden],
				series: [Sery]
			});
			$("#chp1" + chNo).bind("tooltipFormat", function(e, data) {
				return "<table><tr><td colspan=2>" + toPersianDate(data.x) + "</td></tr><tr><td>Open</td><td>" + data.open + "</td></tr><tr><td>High</td><td>" + data.high + "</td></tr><tr><td>Low</td><td>" + data.low + "</td></tr><tr><td>Close</td><td>" + data.close + "</td></tr></table>"
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			try {
				$("#chp2" + chNo).jqChart("destory")
			} catch (e) {}
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeLong],
				series: [Sery]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return toPersianDate(data.x) + "<br/>" + bigNumber(data.y)
			})
		},
		PriceHistoryLine: function(chNo, type, start, end, Logarithmic, ShowAllPoint, adj) {
			if (end - start < 2) {
				return
			}
			var SkipPoints = parseInt((end - start) / 120, 10) + 1;
			var dt = ii.ChartData[type + adj];
			var dataHLOCV = [];
			var MinMaxRange = [];
			var dataVol = [];
			for (i = start; i <= end; i++) {
				if (ShowAllPoint == false && i % SkipPoints != 0) {
					continue
				}
				cols = dt[i];
				dataHLOCV.push([cols[0], cols[6]]);
				MinMaxRange.push([cols[0], cols[1], cols[2]]);
				dataVol.push([cols[0], cols[5]])
			}
			var Sery;
			Sery = ii.Series.Line;
			Sery.data = dataHLOCV;
			Sery.strokeStyle = "#000000";
			var AxesY;
			if (Logarithmic) {
				AxesY = ii.Axes.LogY
			} else {
				AxesY = ii.Axes.LinearY
			}
			try {
				$("#chp1" + chNo).jqChart("destory")
			} catch (e) {}
			$("#chp1" + chNo).jqChart({
				legend: {
					visible: false
				},
				tooltips: {
					type: "shared"
				},
				border: ii.Border,
				axes: [AxesY, ii.Axes.DateTimeHidden],
				series: [{
					type: "splineRange",
					data: MinMaxRange,
					fillStyle: "rgba(220,220,220,0.6)",
					markers: {
						size: 0
					}
				}, Sery]
			});
			$("#chp1" + chNo).bind("tooltipFormat", function(e, data) {
				return "<table><tr><td colspan=2>" + toPersianDate(data[1].x) + "</td></tr><tr><td>Close</td><td>" + addCommas(data[1].y) + "</td></tr><tr><td>High</td><td>" + addCommas(data[0].from) + "</td></tr><tr><td>Low</td><td>" + addCommas(data[0].to) + "</td></tr></table>"
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			try {
				$("#chp2" + chNo).jqChart("destory")
			} catch (e) {}
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeLong],
				series: [Sery]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return toPersianDate(data.x) + "<br/>" + bigNumber(data.y)
			})
		},
		MovingAverage: function(chNo, type, start, end, Logarithmic, ShowAllPoint, adj) {
			if (end - start < 2) {
				return
			}
			var SkipPoints = parseInt((end - start) / 120, 10) + 1;
			var dt = ii.ChartData[type + adj];
			var dataHLOCV = [];
			var dataVol = [];
			var dataMovAvg = [];
			for (i = start; i <= end; i++) {
				if (ShowAllPoint == false && i % SkipPoints != 0) {
					continue
				}
				cols = dt[i];
				dataHLOCV.push([cols[0], cols[1], cols[2], cols[3], cols[4]]);
				dataVol.push([cols[0], cols[5]]);
				dataMovAvg.push([cols[0], cols[6]])
			}
			var AxesY;
			if (Logarithmic) {
				AxesY = ii.Axes.LogY
			} else {
				AxesY = ii.Axes.LinearY
			}
			var Sery = ii.Series.Candlestick;
			Sery.data = dataHLOCV;
			$("#chp1" + chNo).jqChart({
				legend: {
					visible: false
				},
				tooltips: {
					type: "shared"
				},
				border: ii.Border,
				axes: [AxesY, ii.Axes.DateTimeHidden],
				series: [Sery, {
					type: "line",
					lineWidth: 1,
					data: dataMovAvg,
					strokeStyle: "blue",
					markers: {
						size: 0
					}
				}]
			});
			$("#chp1" + chNo).bind("tooltipFormat", function(e, data) {
				return "<table><tr><td colspan=2>" + toPersianDate(data[0].x) + "</td></tr><tr><td>Open</td><td>" + data[0].open + "</td></tr><tr><td>High</td><td>" + data[0].high + "</td></tr><tr><td>Low</td><td>" + data[0].low + "</td></tr><tr><td>Close</td><td>" + data[0].close + "</td></tr><tr><td></td><td>" + data[1].y + "</td></tr></table>"
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeLong],
				series: [Sery]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return toPersianDate(data.x) + "<br/>" + bigNumber(data.y)
			})
		},
		InstAndIndexHistory: function(chNo, type, start, end, Logarithmic, ShowAllPoint, adj) {
			if (end - start < 20) {
				return
			}
			var dt = ii.ChartData[type + adj];
			var dataPrice = [];
			var dataIdx1 = [];
			var dataIdx2 = [];
			var dataVol = [];
			var oldDate = dt[start][0] - 1;
			var firstPrice = dt[start][1];
			var firstIdx1 = dt[start][2];
			var firstIdx2 = dt[start][3];
			for (i = start; i <= end; i++) {
				cols = dt[i];
				dataPrice.push([cols[0], AdvRound(100 * (cols[1] - firstPrice) / firstPrice, 2)]);
				dataIdx1.push([cols[0], AdvRound(100 * (cols[2] - firstIdx1) / firstIdx1, 2)]);
				dataIdx2.push([cols[0], AdvRound(100 * (cols[3] - firstIdx2) / firstIdx2, 2)]);
				dataVol.push([cols[0], cols[4]])
			}
			var AxesY = ii.Axes.LinearY;
			$("#CustomChartSetting" + chNo).css("display", "none");
			$("#chp1" + chNo).jqChart({
				legend: {
					location: "top",
					visible: true,
					title: {
						visible: false
					},
					border: {
						lineWidth: 1,
						strokeStyle: "black"
					},
					font: "12px tahoma",
					textFillStyle: "#418CF0",
					background: "#eeeeee",
					margin: 3
				},
				border: ii.Border,
				tooltips: {
					type: "shared"
				},
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
				series: [{
					title: "قیمت",
					type: "line",
					data: dataPrice,
					lineWidth: 1,
					strokeStyle: "black",
					markers: {
						size: 0
					}
				}, {
					title: "شاخص کل",
					type: "line",
					data: dataIdx1,
					lineWidth: 1,
					strokeStyle: "#33ff33",
					markers: {
						size: 0
					}
				}, {
					title: "شاخص گروه",
					type: "line",
					data: dataIdx2,
					lineWidth: 1,
					strokeStyle: "red",
					markers: {
						size: 0
					}
				}]
			});
			$("#chp1" + chNo).bind("tooltipFormat", function(e, data) {
				return "<table><tr><td colspan=2>" + toPersianDate(data[0].x) + "</td></tr><tr><td>تغییر قیمت</td><td>" + data[0].y + "%</td></tr><tr><td>تغییر شاخص کل</td><td>" + data[1].y + "%</td></tr><tr><td>شاخص گروه</td><td>" + data[2].y + "%</td></tr></table>"
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeLong],
				series: [Sery]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return toPersianDate(data.x) + "<br/>" + bigNumber(data.y)
			})
		},
		StochasticOscillator: function(chNo, type, start, end, Logarithmic, ShowAllPoint, adj) {
			if (end - start < 2) {
				return
			}
			var SkipPoints = parseInt((end - start) / 120, 10) + 1;
			var dt = ii.ChartData[type + adj];
			var dataHLOCV = [];
			var dataVol = [];
			var dataSTO1 = [];
			var dataSTO2 = [];
			var oldDate = dt[start][0] - 1;
			for (i = start; i <= end; i++) {
				if (ShowAllPoint == false && i % SkipPoints != 0) {
					continue
				}
				cols = dt[i];
				dataHLOCV.push([cols[0], cols[1], cols[2], cols[3], cols[4]]);
				dataVol.push([cols[0], cols[5]]);
				dataSTO1.push([cols[0], cols[6]]);
				dataSTO2.push([cols[0], cols[7]])
			}
			var AxesY;
			if (Logarithmic) {
				AxesY = ii.Axes.LogY
			} else {
				AxesY = ii.Axes.LinearY
			}
			var Sery = ii.Series.Candlestick;
			Sery.data = dataHLOCV;
			$("#chp1" + chNo).jqChart({
				legend: {
					visible: false
				},
				tooltips: {
					type: "shared"
				},
				border: ii.Border,
				axes: [AxesY, ii.Axes.DateTimeHidden],
				series: [Sery]
			});
			$("#chp1" + chNo).bind("tooltipFormat", function(e, data) {
				return "<table><tr><td colspan=2>" + toPersianDate(data.x) + "</td></tr><tr><td>Open</td><td>" + data.open + "</td></tr><tr><td>High</td><td>" + data.high + "</td></tr><tr><td>Low</td><td>" + data.low + "</td></tr><tr><td>Close</td><td>" + data.close + "</td></tr></table>"
			});
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				tooltips: {
					type: "shared"
				},
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
				series: [{
					type: "line",
					data: dataSTO1,
					lineWidth: 1,
					strokeStyle: "green",
					markers: {
						size: 0
					}
				}, {
					type: "line",
					data: dataSTO2,
					lineWidth: 1,
					strokeStyle: "red",
					markers: {
						size: 0
					}
				}]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return toPersianDate(data[0].x) + "<br/>" + data[0].y + " " + data[1].y
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			$("#chp3" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeLong],
				series: [Sery]
			});
			$("#chp3" + chNo).bind("tooltipFormat", function(e, data) {
				return toPersianDate(data.x) + "<br/>" + bigNumber(data.y)
			})
		},
		IchimokuClouds: function(chNo, type, start, end, Logarithmic, ShowAllPoint, adj) {
			if (end - start < 2) {
				return
			}
			var SkipPoints = parseInt((end - start) / (2 * 120), 10) + 1;
			var dt = ii.ChartData[type + adj];
			var dataHLOCV = [];
			var dataVol = [];
			var TenkanSen = [];
			var KijunSen = [];
			var SenkouSpan = [];
			var SenkouSpanPos = [];
			var SenkouSpanNeg = [];
			var SenkouSpanA = [];
			var SenkouSpanB = [];
			var ChikouSpan = [];
			for (i = start; i <= end; i++) {
				if (ShowAllPoint == false && i % SkipPoints != 0) {
					continue
				}
				cols = dt[i];
				if (cols[1] != 0) {
					dataHLOCV.push([cols[0], cols[1], cols[2], cols[3], cols[4]])
				}
				dataVol.push([cols[0], cols[5]]);
				if (cols[6] != 0) {
					TenkanSen.push([cols[0], cols[6]])
				}
				if (cols[7] != 0) {
					KijunSen.push([cols[0], cols[7]])
				}
				if (cols[8] != 0) {
					SenkouSpan.push([cols[0], cols[8], cols[9]]);
					SenkouSpanA.push([cols[0], cols[8]]);
					SenkouSpanB.push([cols[0], cols[9]]);
					if (cols[8] > cols[9]) {
						SenkouSpanPos.push([cols[0], cols[8], cols[9]]);
						SenkouSpanNeg.push([cols[0], cols[9], cols[9]])
					} else {
						SenkouSpanPos.push([cols[0], cols[9], cols[9]]);
						SenkouSpanNeg.push([cols[0], cols[8], cols[9]])
					}
				}
				if (cols[10] != 0) {
					ChikouSpan.push([cols[0], cols[10]])
				}
			}
			var AxesY;
			if (Logarithmic) {
				AxesY = ii.Axes.LogY
			} else {
				AxesY = ii.Axes.LinearY
			}
			var Sery = ii.Series.Candlestick;
			Sery.data = dataHLOCV;
			$("#chp1" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [AxesY, ii.Axes.DateTimeHidden],
				series: [Sery, {
					type: "range",
					data: SenkouSpanPos,
					fillStyle: "rgba(180,255,180,0.2)",
					markers: {
						size: 0
					}
				}, {
					type: "range",
					data: SenkouSpanNeg,
					fillStyle: "rgba(255,180,180,0.2)",
					markers: {
						size: 0
					}
				}, {
					type: "line",
					lineWidth: 1,
					data: TenkanSen,
					strokeStyle: "blue",
					markers: {
						size: 0
					}
				}, {
					type: "line",
					lineWidth: 1,
					data: KijunSen,
					strokeStyle: "red",
					markers: {
						size: 0
					}
				}, {
					type: "line",
					lineWidth: 1,
					data: SenkouSpanA,
					strokeStyle: "green",
					markers: {
						size: 0
					}
				}, {
					type: "line",
					lineWidth: 1,
					data: SenkouSpanB,
					strokeStyle: "red",
					markers: {
						size: 0
					}
				}, {
					type: "line",
					lineWidth: 1,
					data: ChikouSpan,
					strokeStyle: "green",
					markers: {
						size: 0
					}
				}]
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeLong],
				series: [Sery]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return toPersianDate(data.x) + "<br/>" + bigNumber(data.y)
			})
		},
		BollingerBands: function(chNo, type, start, end, Logarithmic, ShowAllPoint, adj) {
			if (end - start < 2) {
				return
			}
			var SkipPoints = parseInt((end - start) / 120, 10) + 1;
			var dt = ii.ChartData[type + adj];
			var dataHLOCV = [];
			var dataVol = [];
			var dataMovAvg = [];
			var dataUpper = [];
			var dataLower = [];
			for (i = start; i <= end; i++) {
				if (ShowAllPoint == false && i % SkipPoints != 0) {
					continue
				}
				cols = dt[i];
				dataHLOCV.push([cols[0], cols[1], cols[2], cols[3], cols[4]]);
				dataVol.push([cols[0], cols[5]]);
				dataMovAvg.push([cols[0], cols[6]]);
				dataUpper.push([cols[0], cols[7]]);
				dataLower.push([cols[0], cols[8]])
			}
			var AxesY;
			if (Logarithmic) {
				AxesY = ii.Axes.LogY
			} else {
				AxesY = ii.Axes.LinearY
			}
			var Sery = ii.Series.Candlestick;
			Sery.data = dataHLOCV;
			$("#chp1" + chNo).jqChart({
				legend: {
					visible: false
				},
				tooltips: {
					type: "shared"
				},
				border: ii.Border,
				axes: [AxesY, ii.Axes.DateTimeHidden],
				series: [Sery, {
					type: "line",
					lineWidth: 1,
					data: dataMovAvg,
					strokeStyle: "blue",
					markers: {
						size: 0
					}
				}, {
					type: "line",
					lineWidth: 1,
					data: dataUpper,
					strokeStyle: "green",
					markers: {
						size: 0
					}
				}, {
					type: "line",
					lineWidth: 1,
					data: dataLower,
					strokeStyle: "green",
					markers: {
						size: 0
					}
				}]
			});
			$("#chp1" + chNo).bind("tooltipFormat", function(e, data) {
				return "<table><tr><td colspan=2>" + toPersianDate(data[0].x) + "</td></tr><tr><td>Open</td><td>" + data[0].open + "</td></tr><tr><td>High</td><td>" + data[0].high + "</td></tr><tr><td>Low</td><td>" + data[0].low + "</td></tr><tr><td>Close</td><td>" + data[0].close + "</td></tr><tr><td></td><td>" + data[1].y + "</td></tr><tr><td></td><td>" + data[2].y + "</td></tr><tr><td></td><td>" + data[3].y + "</td></tr></table>"
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeLong],
				series: [Sery]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return toPersianDate(data.x) + "<br/>" + bigNumber(data.y)
			})
		},
		MoneyFlowIndex: function(chNo, type, start, end, Logarithmic, ShowAllPoint, adj) {
			if (end - start < 2) {
				return
			}
			var SkipPoints = parseInt((end - start) / 120, 10) + 1;
			var dt = ii.ChartData[type + adj];
			var dataHLOCV = [];
			var dataVol = [];
			var dataMFI = [];
			for (i = start; i <= end; i++) {
				if (ShowAllPoint == false && i % SkipPoints != 0) {
					continue
				}
				cols = dt[i];
				dataHLOCV.push([cols[0], cols[1], cols[2], cols[3], cols[4]]);
				dataVol.push([cols[0], cols[5]]);
				dataMFI.push([cols[0], cols[6]])
			}
			var AxesY;
			if (Logarithmic) {
				AxesY = ii.Axes.LogY
			} else {
				AxesY = ii.Axes.LinearY
			}
			var Sery = ii.Series.Candlestick;
			Sery.data = dataHLOCV;
			$("#chp1" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [AxesY, ii.Axes.DateTimeHidden],
				series: [Sery]
			});
			$("#chp1" + chNo).bind("tooltipFormat", function(e, data) {
				return "<table><tr><td colspan=2>" + toPersianDate(data.x) + "</td></tr><tr><td>Open</td><td>" + data.open + "</td></tr><tr><td>High</td><td>" + data.high + "</td></tr><tr><td>Low</td><td>" + data.low + "</td></tr><tr><td>Close</td><td>" + data.close + "</td></tr></table>"
			});
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
				series: [{
					type: "line",
					data: dataMFI,
					lineWidth: 1,
					strokeStyle: "green",
					markers: {
						size: 0
					}
				}]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return toPersianDate(data.x) + "<br/>" + data.y
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			$("#chp3" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeLong],
				series: [Sery]
			});
			$("#chp3" + chNo).bind("tooltipFormat", function(e, data) {
				return toPersianDate(data.x) + "<br/>" + bigNumber(data.y)
			})
		},
		MACD: function(chNo, type, start, end, Logarithmic, ShowAllPoint, adj) {
			if (end - start < 2) {
				return
			}
			var SkipPoints = parseInt((end - start) / 120, 10) + 1;
			var dt = ii.ChartData[type + adj];
			var dataHLOCV = [];
			var dataVol = [];
			var dataR1 = [];
			var dataR2 = [];
			var dataR3 = [];
			for (i = start; i <= end; i++) {
				if (ShowAllPoint == false && i % SkipPoints != 0) {
					continue
				}
				cols = dt[i];
				dataHLOCV.push([cols[0], cols[1], cols[2], cols[3], cols[4]]);
				dataVol.push([cols[0], cols[5]]);
				dataR1.push([cols[0], cols[6]]);
				dataR2.push([cols[0], cols[7]]);
				dataR3.push([cols[0], parseInt(cols[6] - cols[7], 10)])
			}
			var AxesY;
			if (Logarithmic) {
				AxesY = ii.Axes.LogY
			} else {
				AxesY = ii.Axes.LinearY
			}
			var Sery = ii.Series.Candlestick;
			Sery.data = dataHLOCV;
			$("#chp1" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [AxesY, ii.Axes.DateTimeHidden],
				series: [Sery]
			});
			$("#chp1" + chNo).bind("tooltipFormat", function(e, data) {
				return "<table><tr><td colspan=2>" + toPersianDate(data.x) + "</td></tr><tr><td>Open</td><td>" + data.open + "</td></tr><tr><td>High</td><td>" + data.high + "</td></tr><tr><td>Low</td><td>" + data.low + "</td></tr><tr><td>Close</td><td>" + data.close + "</td></tr></table>"
			});
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				tooltips: {
					type: "shared"
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
				series: [{
					type: "line",
					data: dataR1,
					strokeStyle: "red",
					lineWidth: 1,
					markers: {
						size: 0
					}
				}, {
					type: "line",
					data: dataR2,
					strokeStyle: "blue",
					lineWidth: 1,
					markers: {
						size: 0
					}
				}, {
					type: "column",
					data: dataR3
				}]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return toPersianDate(data[0].x) + "<br/>" + data[0].y + " " + data[1].y + " " + data[2].y
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			$("#chp3" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeLong],
				series: [Sery]
			});
			$("#chp3" + chNo).bind("tooltipFormat", function(e, data) {
				return toPersianDate(data.x) + "<br/>" + bigNumber(data.y)
			})
		},
		DailyChartInit: function(type) {
			HideAllWindow();
			var chNo = ii.ChartNo++;
			var chHeight = 355;
			var chTitle = "";
			var chParts = "";
			var Chart2 = "<div id='chp1" + chNo + "' style='height:230px;text-align:left;direction:ltr'></div><div id='chp2" + chNo + "' style='height:75px;text-align:left;direction:ltr'></div>";
			var Chart3 = "<div id='chp1" + chNo + "' style='height:230px;text-align:left;direction:ltr'></div><div id='chp2" + chNo + "' style='height:230px;text-align:left;direction:ltr'></div><div id='chp3" + chNo + "' style='height:75px;text-align:left;direction:ltr'></div>";
			switch (type) {
				case "ph":
				case "phl":
					chHeight = 355;
					chTitle = "نمودار تاریخچه حجم - قیمت";
					chParts = Chart2;
					break
			}
			$("#ExtraChart").prepend("<div id='CustomChart" + chNo + "' class=\"box1 white tbl z4_4\" style='height:" + chHeight + 'px\'><div class="header">' + chTitle + "<span style='float:left'><a href='#' onclick=\"ExportToImage('#CustomChart" + chNo + "')\" class='saveBtn'>&nbsp;</a>&nbsp;<a href='#' onclick=\"$('#CustomChart" + chNo + "').remove()\" class='closeBtn'>&nbsp;</a></span></div>" + chParts + "</div>");
			$.ajax({
				url: MembersSite() + "/tsev2/chart/data/IntraDayFinancial.aspx",
				cache: true,
				data: {
					i: InsCode,
					t: type
				},
				dataType: "text",
				success: function(data) {
					var dt = [];
					var dr = [];
					var rows = data.split(";");
					var cols;
					if (rows.length <= 1) {
						$("#chp1" + chNo).html(ii.NoDataMsg)
					} else {
						for (i = 0; i < rows.length; i++) {
							cols = rows[i].split(",");
							heven = cols[0].split(":");
							dr = [];
							dr.push(new Date(1, 1, 1, heven[0], heven[1], heven[2], 0));
							for (j = 1; j < cols.length; j++) {
								dr.push(parseFloat(cols[j]))
							}
							dt.push(dr)
						}
						switch (type) {
							case "ema20":
							case "ma20":
								ii.DailyMovingAverage(chNo, type, dt);
								break;
							case "bb":
								ii.DailyBollingerBands(chNo, type, dt);
								break;
							case "mfi":
							case "cmf":
							case "rsi":
							case "mm":
							case "obv":
							case "wil":
							case "vol":
							case "mcc":
							case "cci":
							case "adl":
							case "atr":
							case "adi":
							case "aoc":
							case "bop":
							case "bad":
								ii.DailyMoneyFlowIndex(chNo, type, dt);
								break;
							case "macd":
								ii.DailyMACD(chNo, type, dt);
								break;
							case "sto":
								ii.DailyStochasticOscillator(chNo, type, dt);
								break
						}
					}
				}
			})
		},
		DailyMovingAverage: function(chNo, type, dt) {
			var dataHLOCV = [];
			var dataVol = [];
			var dataMovAvg = [];
			for (i = 0; i < dt.length; i++) {
				cols = dt[i];
				dataHLOCV.push([cols[0], cols[1], cols[2], cols[3], cols[4]]);
				dataVol.push([cols[0], cols[5]]);
				dataMovAvg.push([cols[0], cols[6]])
			}
			var Sery = ii.Series.Candlestick;
			Sery.data = dataHLOCV;
			$("#chp1" + chNo).jqChart({
				legend: {
					visible: false
				},
				tooltips: {
					type: "shared"
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
				series: [Sery, {
					type: "line",
					lineWidth: 1,
					data: dataMovAvg,
					strokeStyle: "blue",
					markers: {
						size: 0
					}
				}]
			});
			$("#chp1" + chNo).bind("tooltipFormat", function(e, data) {
				return "<table><tr><td colspan=2>" + data[0].x.getHours() + ":" + data[0].x.getMinutes() + "</td></tr><tr><td>Open</td><td>" + data[0].open + "</td></tr><tr><td>High</td><td>" + data[0].high + "</td></tr><tr><td>Low</td><td>" + data[0].low + "</td></tr><tr><td>Close</td><td>" + data[0].close + "</td></tr><tr><td></td><td>" + data[1].y + "</td></tr></table>"
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeIntra],
				series: [Sery]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return data.x.getHours() + ":" + data.x.getMinutes() + "<br/>" + bigNumber(data.y)
			})
		},
		DailyStochasticOscillator: function(chNo, type, dt) {
			var dataHLOCV = [];
			var dataVol = [];
			var dataSTO1 = [];
			var dataSTO2 = [];
			for (i = 0; i < dt.length; i++) {
				cols = dt[i];
				dataHLOCV.push([cols[0], cols[1], cols[2], cols[3], cols[4]]);
				dataVol.push([cols[0], cols[5]]);
				dataSTO1.push([cols[0], cols[6]]);
				dataSTO2.push([cols[0], cols[7]])
			}
			var Sery = ii.Series.Candlestick;
			Sery.data = dataHLOCV;
			$("#chp1" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeIntra],
				series: [Sery]
			});
			$("#chp1" + chNo).bind("tooltipFormat", function(e, data) {
				return "<table><tr><td colspan=2>" + data.x.getHours() + ":" + data.x.getMinutes() + "</td></tr><tr><td>Open</td><td>" + data.open + "</td></tr><tr><td>High</td><td>" + data.high + "</td></tr><tr><td>Low</td><td>" + data.low + "</td></tr><tr><td>Close</td><td>" + data.close + "</td></tr></table>"
			});
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				tooltips: {
					type: "shared"
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
				series: [{
					type: "line",
					data: dataSTO1,
					lineWidth: 1,
					strokeStyle: "green",
					markers: {
						size: 0
					}
				}, {
					type: "line",
					data: dataSTO2,
					lineWidth: 1,
					strokeStyle: "red",
					markers: {
						size: 0
					}
				}]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return data[0].x.getHours() + ":" + data[0].x.getMinutes() + "<br/>" + data[0].y + " " + data[1].y
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			$("#chp3" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeIntra],
				series: [Sery]
			});
			$("#chp3" + chNo).bind("tooltipFormat", function(e, data) {
				return data.x.getHours() + ":" + data.x.getMinutes() + "<br/>" + bigNumber(data.y)
			})
		},
		DailyBollingerBands: function(chNo, type, dt) {
			var dataHLOCV = [];
			var dataVol = [];
			var dataMovAvg = [];
			var dataUpper = [];
			var dataLower = [];
			for (i = 0; i < dt.length; i++) {
				cols = dt[i];
				dataHLOCV.push([cols[0], cols[1], cols[2], cols[3], cols[4]]);
				dataVol.push([cols[0], cols[5]]);
				dataMovAvg.push([cols[0], cols[6]]);
				dataUpper.push([cols[0], cols[7]]);
				dataLower.push([cols[0], cols[8]])
			}
			var Sery = ii.Series.Candlestick;
			Sery.data = dataHLOCV;
			$("#chp1" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				tooltips: {
					type: "shared"
				},
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
				series: [Sery, {
					type: "line",
					lineWidth: 1,
					data: dataMovAvg,
					strokeStyle: "blue",
					markers: {
						size: 0
					}
				}, {
					type: "line",
					lineWidth: 1,
					data: dataUpper,
					strokeStyle: "green",
					markers: {
						size: 0
					}
				}, {
					type: "line",
					lineWidth: 1,
					data: dataLower,
					strokeStyle: "green",
					markers: {
						size: 0
					}
				}]
			});
			$("#chp1" + chNo).bind("tooltipFormat", function(e, data) {
				return "<table><tr><td colspan=2>" + data[0].x.getHours() + ":" + data[0].x.getMinutes() + "</td></tr><tr><td>Open</td><td>" + data[0].open + "</td></tr><tr><td>High</td><td>" + data[0].high + "</td></tr><tr><td>Low</td><td>" + data[0].low + "</td></tr><tr><td>Close</td><td>" + data[0].close + "</td></tr><tr><td></td><td>" + data[1].y + "</td></tr><tr><td></td><td>" + data[2].y + "</td></tr><tr><td></td><td>" + data[3].y + "</td></tr></table>"
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeIntra],
				series: [Sery]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return data.x.getHours() + ":" + data.x.getMinutes() + "<br/>" + bigNumber(data.y)
			})
		},
		DailyMoneyFlowIndex: function(chNo, type, dt) {
			var dataHLOCV = [];
			var dataVol = [];
			var dataMFI = [];
			for (i = 0; i < dt.length; i++) {
				cols = dt[i];
				dataHLOCV.push([cols[0], cols[1], cols[2], cols[3], cols[4]]);
				dataVol.push([cols[0], cols[5]]);
				dataMFI.push([cols[0], cols[6]])
			}
			var Sery = ii.Series.Candlestick;
			Sery.data = dataHLOCV;
			$("#chp1" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
				series: [Sery]
			});
			$("#chp1" + chNo).bind("tooltipFormat", function(e, data) {
				return "<table><tr><td colspan=2>" + data.x.getHours() + ":" + data.x.getMinutes() + "</td></tr><tr><td>Open</td><td>" + data.open + "</td></tr><tr><td>High</td><td>" + data.high + "</td></tr><tr><td>Low</td><td>" + data.low + "</td></tr><tr><td>Close</td><td>" + data.close + "</td></tr></table>"
			});
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
				series: [{
					type: "line",
					data: dataMFI,
					lineWidth: 1,
					strokeStyle: "green",
					markers: {
						size: 0
					}
				}]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return data.x.getHours() + ":" + data.x.getMinutes() + "<br/>" + data.y
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			$("#chp3" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeIntra],
				series: [Sery]
			});
			$("#chp3" + chNo).bind("tooltipFormat", function(e, data) {
				return data.x.getHours() + ":" + data.x.getMinutes() + "<br/>" + bigNumber(data.y)
			})
		},
		DailyMACD: function(chNo, type, dt) {
			var dataHLOCV = [];
			var dataVol = [];
			var dataR1 = [];
			var dataR2 = [];
			var dataR3 = [];
			for (i = 0; i < dt.length; i++) {
				cols = dt[i];
				dataHLOCV.push([cols[0], cols[1], cols[2], cols[3], cols[4]]);
				dataVol.push([cols[0], cols[5]]);
				dataR1.push([cols[0], cols[6]]);
				dataR2.push([cols[0], cols[7]]);
				dataR3.push([cols[0], cols[6] - cols[7]])
			}
			var Sery = ii.Series.Candlestick;
			Sery.data = dataHLOCV;
			$("#chp1" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeIntra],
				series: [Sery]
			});
			$("#chp1" + chNo).bind("tooltipFormat", function(e, data) {
				return "<table><tr><td colspan=2>" + data.x.getHours() + ":" + data.x.getMinutes() + "</td></tr><tr><td>Open</td><td>" + data.open + "</td></tr><tr><td>High</td><td>" + data.high + "</td></tr><tr><td>Low</td><td>" + data.low + "</td></tr><tr><td>Close</td><td>" + data.close + "</td></tr></table>"
			});
			$("#chp2" + chNo).jqChart({
				legend: {
					visible: false
				},
				tooltips: {
					type: "shared"
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
				series: [{
					type: "line",
					data: dataR1,
					strokeStyle: "red",
					lineWidth: 1,
					markers: {
						size: 0
					}
				}, {
					type: "line",
					data: dataR2,
					strokeStyle: "blue",
					lineWidth: 1,
					markers: {
						size: 0
					}
				}, {
					type: "column",
					data: dataR3
				}]
			});
			$("#chp2" + chNo).bind("tooltipFormat", function(e, data) {
				return data[0].x.getHours() + ":" + data[0].x.getMinutes() + "<br/>" + data[0].y + " " + data[1].y + " " + data[2].y
			});
			Sery = ii.Series.Volume;
			Sery.data = dataVol;
			$("#chp3" + chNo).jqChart({
				legend: {
					visible: false
				},
				border: ii.Border,
				axes: [ii.Axes.LinearY, ii.Axes.DateTimeIntra],
				series: [Sery]
			});
			$("#chp3" + chNo).bind("tooltipFormat", function(e, data) {
				return data.x.getHours() + ":" + data.x.getMinutes() + "<br/>" + bigNumber(data.y)
			})
		},
		ShowShareHolder: function(code) {
			$.ajax({
				url: "tsev2/data/ShareHolder.aspx",
				cache: true,
				data: {
					i: code
				},
				dataType: "text",
				success: function(data) {
					var DataArray = data.split("#");
					var chData = [];
					var rows = DataArray[0].split(";");
					var cols;
					var tdate;
					var cid = "SHChart" + Math.floor(Math.random() * 10000);
					for (i = 0; i < rows.length; i++) {
						cols = rows[i].split(",");
						tdate = new Date(cols[0].substring(0, 4), parseInt(cols[0].substring(4, 6), 10) - 1, cols[0].substring(6, 8));
						chData.push([tdate, parseInt(cols[1])])
					}
					var TblResult = "<div class='box1 white tbl'><div class='header'>تاریخچه تعداد سهام</div><div class='content'><table class='table1'><thead><tr><th>تاریخ</th><th>سهم</th></tr></thead><tbody>";
					for (i = rows.length - 2; i >= 0; i--) {
						cols = rows[i].split(",");
						TblResult += "<tr><td>" + toPersianDate(new Date(cols[0].substring(0, 4), parseInt(cols[0].substring(4, 6), 10) - 1, cols[0].substring(6, 8))) + "</td><td> " + bigNumber(parseInt(cols[1], 10)) + "</td></tr>"
					}
					TblResult += "</tbody></table></div></div>";
					var CoResult = "<div class='box1 white tbl'><div class='header'>سایر سهم های سهامدار عمده</div><div class='content'><table class='table1'><thead><tr><th>نام</th><th>سهم</th><th>درصد</th></tr></thead><tbody>";
					rows = DataArray[1].split(";");
					for (i = 0; i < rows.length - 1; i++) {
						cols = rows[i].split(",");
						CoResult += "<tr><td><a target='" + cols[0] + "' href='" + InstUrl(cols[0]) + "'>" + cols[1] + "</a></td><td> " + bigNumber(cols[2]) + "</td><td>" + cols[3] + "</td></tr>"
					}
					CoResult += "</tbody></table></div></div>";
					ShowModalStaticPro("اطلاعات سهامدار", '<div class="s900 h250" style="text-align:left;direction:ltr" id=\'' + cid + "'></div>" + TblResult + "&nbsp;&nbsp;" + CoResult);
					if (chData.length > 2) {
						$("#" + cid).bind("axisLabelCreating", function(e, data) {
							if (data.context.axis.location == "bottom") {
								data.text = toPersianDate(new Date(data.text))
							} else {
								data.text = $("<div></div>").html(bigNumber(data.text)).text()
							}
						});
						$("#" + cid).jqChart({
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
								data: chData,
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
						$("#" + cid).bind("tooltipFormat", function(e, data) {
							return toPersianDate(data.x) + "<br/>" + bigNumber(data.y)
						})
					}
				}
			})
		},
		CalendarData: [],
		CalendarSelYear: 0,
		CalendarSelMonth: 0,
		DrawDays: function(type, val) {
			if (type == "y") {
				$("#y" + val).addClass("act");
				$("#y" + ii.CalendarSelYear).removeClass("act");
				ii.CalendarSelYear = val
			} else {
				$("#m" + val).addClass("act");
				$("#m" + ii.CalendarSelMonth).removeClass("act");
				ii.CalendarSelMonth = val
			}
			var rowNo = ii.FindFirstRecord(ii.CalendarSelYear, ii.CalendarSelMonth);
			if (rowNo == -1) {
				$("#DayView").html("در تاریخ انتخاب شده اطلاعاتی موجود نیست");
				return
			}
			var GDate;
			var CDay;
			var html = "<ul class='historyDay'>";
			while (rowNo < ii.CalendarData.length && ii.CalendarSelMonth == ii.CalendarData[rowNo][1]) {
				GDate = new Date(ii.CalendarData[rowNo][3], ii.CalendarData[rowNo][4] - 1, ii.CalendarData[rowNo][5]);
				CDay = (GDate.getDay() + 1) % 7;
				html += "<li onclick=\"window.open('http://cdn.tsetmc.com/Loader.aspx?ParTree=15131P&i=" + InsCode + "&d=" + (10000 * ii.CalendarData[rowNo][3] + 100 * ii.CalendarData[rowNo][4] + ii.CalendarData[rowNo][5]) + "', '_blank')\");'><div class='historyDayCell0'>" + DayName[CDay] + "<br/>" + ii.CalendarData[rowNo][2] + "<br/>" + MonthName[ii.CalendarData[rowNo][1] - 1] + "</div><div class='historyDayCell1'>قیمت:" + addCommas(ii.CalendarData[rowNo][6]) + "<br/>حجم:" + bigNumber(ii.CalendarData[rowNo][7]) + "</div></li>";
				rowNo++
			}
			html += "</ul>";
			$("#DayView").html(html)
		},
		FindFirstRecord: function(year, month) {
			for (ipos = 0; ipos < ii.CalendarData.length; ipos++) {
				if (year == ii.CalendarData[ipos][0] && month == ii.CalendarData[ipos][1]) {
					return ipos
				}
			}
			return -1
		},
		ShowHistory: function() {
			$.ajax({
				url: "tsev2/data/InstCalendar.aspx",
				cache: true,
				data: {
					i: InsCode
				},
				dataType: "text",
				success: function(data) {
					var rows = data.split(";");
					var cols;
					for (i = 0; i < rows.length; i++) {
						cols = rows[i].split(",");
						deven = cols[0].split("/");
						ii.CalendarData.push([parseInt(deven[0]), parseInt(deven[1]), parseInt(deven[2]), parseInt(cols[1].substring(0, 4)), parseInt(cols[1].substring(4, 6), 10), parseInt(cols[1].substring(6, 8), 10), parseInt(cols[2]), parseInt(cols[3])])
					}
					var cls = "";
					var html = "";
					var dateStart = ii.CalendarData[0][0];
					var dateEnd = ii.CalendarData[ii.CalendarData.length - 1][0];
					ii.CalendarSelYear = dateEnd;
					html = "<ul class='historyYear'>";
					for (ipos = dateStart; ipos <= dateEnd; ipos++) {
						if (ipos == dateEnd) {
							cls = "act"
						} else {
							cls = ""
						}
						html += "<li id='y" + ipos + "' onclick='ii.DrawDays(\"y\"," + ipos + ");' class='" + cls + "'>" + ipos + "</li>"
					}
					html += "</ul>";
					html += "<ul class='historyMonth'>";
					for (ipos = 1; ipos <= 12; ipos++) {
						html += "<li id='m" + ipos + "' onclick='ii.DrawDays(\"m\"," + ipos + ");'>" + MonthName[ipos - 1] + "</li>"
					}
					html += "</ul>";
					html += "<div id='DayView'></div>";
					ShowModalStaticPro("تاریخچه معاملات", "<div class=\"box1 white z4_4\" id='CalendarDiv'>" + html + "</div>");
					ii.DrawDays("m", ii.CalendarData[ii.CalendarData.length - 1][1])
				}
			})
		},
		ShowTradeDetail: function() {
			ShowModalStaticPro("جزییات معاملات", '<div id="TradeDetail" width="500px" style="width:500px;background-color:white;direction:ltr">', 520);
			var Header = "-,زمان,حجم,قیمت";
			document.getElementById("TradeDetail").style.height = ($(window).height() - 155) + "px";
			gr = new dhtmlXGridObject("TradeDetail");
			gr.setImagePath("/tools/dhtmlxgrid/imgs/");
			gr.setHeader(Header);
			gr.setColTypes("ed,ed,ed,ed");
			gr.setColSorting("int,str,int,int");
			gr.setColAlign("left,left,left,left");
			gr.setSkin("modern");
			gr.setEditable(false);
			gr.init();
			gr.clearAll();
			var ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
			if (ismobile) {
				gr.enableAutoHeight(true)
			}
			gr.loadXML("tsev2/data/TradeDetail.aspx?i=" + InsCode)
		},
		ShowIntraDayPriceDetail: function() {
			ShowModalStaticPro("قیمت، حجم در طول روز", '<div id="IntraDayPriceDetail" width="600px" style="width:600px;background-color:white;direction:ltr">', 620);
			var Header = "زمان,بالاترین قیمت,پایین ترین قیمت,باز شدن,بسته شدن,حجم";
			document.getElementById("IntraDayPriceDetail").style.height = ($(window).height() - 155) + "px";
			gr = new dhtmlXGridObject("IntraDayPriceDetail");
			gr.setImagePath("/tools/dhtmlxgrid/imgs/");
			gr.setHeader(Header);
			gr.setColTypes("ed,ed,ed,ed,ed,ed");
			gr.setColSorting("str,str,str,str,str,str");
			gr.setColAlign("left,left,left,left,left,left");
			gr.setSkin("modern");
			gr.setEditable(false);
			gr.init();
			gr.clearAll();
			var ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
			if (ismobile) {
				gr.enableAutoHeight(true)
			}
			gr.loadXML("tsev2/data/IntraDayPriceDetail.aspx?i=" + InsCode)
		},
		ShowTradeOverview: function() {
			ShowModalStaticPro("جدول حجم - قیمت", '<div id="TradeOverview" width="500px" style="width:500px;background-color:white;direction:ltr">', 520);
			var Header = "اولین,آخرین,حجم,قیمت";
			document.getElementById("TradeOverview").style.height = ($(window).height() - 155) + "px";
			gr = new dhtmlXGridObject("TradeOverview");
			gr.setImagePath("/tools/dhtmlxgrid/imgs/");
			gr.setHeader(Header);
			gr.setColTypes("ed,ed,ed,ed");
			gr.setColSorting("str,str,int,int");
			gr.setColAlign("left,left,left,left");
			gr.setSkin("modern");
			gr.setEditable(false);
			gr.init();
			gr.clearAll();
			var ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
			if (ismobile) {
				gr.enableAutoHeight(true)
			}
			gr.loadXML("tsev2/data/TradeOverview.aspx?i=" + InsCode)
		},
		ShowTradeHistory: function(top, all) {
			var ShowAll = 0;
			var ShowAllKey = "InstTradeHistoryAll";
			if (typeof all == "undefined") {
				if (getData(ShowAllKey) != null) {
					ShowAll = getData(ShowAllKey)
				}
			} else {
				setData(ShowAllKey, all);
				ShowAll = all
			}
			$("#HistoryContent").html("<a style='font-size:11px;color:#6666ff' href='javascript:ii.ShowTradeHistory(999999,0)'>نمایش روزهای معامله شده</a> - <a style='font-size:11px;color:#6666ff' href='javascript:ii.ShowTradeHistory(999999,1)'>نمایش همه روزها</a>&nbsp;- <span style='color:red'>برای مشاهده اطلاعات بیشتر در هر روز معاملاتی بر روی سطر مورد نظر دبل کلیک کنید</span><div id=\"trade\" width=\"99%\" style=\"width:99%;background-color:white;direction:ltr\"></div><div id='paging'></div>");
			var Header = "#rspan,#rspan,#rspan,#rspan,درصد,تغییر,قیمت,درصد,تغییر,قیمت,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan";
			var Header2 = ",,بیشترین قیمت,کمترین قیمت,قیمت پایانی,#cspan,#cspan,قیمت آخرین معامله,#cspan,#cspan,اولین قیمت,قیمت دیروز,ارزش,حجم,تعداد,تاریخ";
			document.getElementById("trade").style.height = ($(window).height() - 180) + "px";
			gr = new dhtmlXGridObject("trade");
			gr.setImagePath("/tools/dhtmlxgrid/imgs/");
			gr.attachHeader(Header);
			gr.setHeader(Header2);
			gr.attachEvent("onRowDblClicked", ii.TradeHistoryClick);
			gr.setInitWidths("50,*,50,50,35,35,55,35,35,55,60,60,75,75,45,70");
			gr.setColTypes("ed,ed,cint,cint,dyn2,dyn2,cint,dyn2,dyn2,cint,cint,cint,bint,bint,ed,ed");
			gr.setColSorting("str,str,int,int,int,int,int,int,int,int,int,int,int,int,int,str");
			gr.setColAlign("left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,right");
			gr.setSkin("modern");
			gr.enablePaging(true, ($(window).height() - 180 - 55) / 20, 35, "paging");
			gr.setEditable(false);
			gr.init();
			gr.clearAll();
			var ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
			if (ismobile) {
				gr.enableAutoHeight(true)
			}
			$.ajax({
				url: MembersSite() + "/tsev2/data/InstTradeHistory.aspx",
				data: {
					i: InsCode,
					Top: top,
					A: ShowAll
				},
				cache: true,
				dataType: "text",
				success: function(data) {
					if (data.length == 0) {
						return
					}
					var inst = data.split(";");
					var cols;
					var ipos = 0;
					var rowid;
					var percent;
					var MyRow;
					for (ipos = 0; ipos < inst.length - 1; ipos++) {
						cols = inst[ipos].split("@");
						rowid = cols[0];
						var percentPClosing = 0;
						var percentPDrCotVal = 0;
						if (cols[6] != 0) {
							percentPClosing = AdvRound(100 * (cols[3] - cols[6]) / cols[6], 2);
							percentPDrCotVal = AdvRound(100 * (cols[4] - cols[6]) / cols[6], 2)
						}
						gr.addRowP0(rowid, [cols[0], "", cols[1], cols[2], percentPClosing, cols[3] - cols[6], cols[3], percentPDrCotVal, cols[4] - cols[6], cols[4], cols[5], cols[6], cols[7], cols[8], cols[9], devenToPersianDate(cols[0])])
					}
					gr.setColumnHidden(0, true);
					gr.addRowP1();
					gr.sortRows(0, gr.getColTypeById(0), "des")
				}
			})
		},
		TradeHistoryClick: function(ProwId, PcellId) {
			window.open("http://cdn.tsetmc.com/Loader.aspx?ParTree=15131P&i=" + InsCode + "&d=" + ProwId, "_blank")
		},
		CodalData: [],
		RenderAllCodal: function() {
			var html = [];
			html.push('<table class="table1"><tbody>');
			var preDate = "0/0";
			for (i = 0; i < ii.CodalData.length; i++) {
				var dpart = ii.CodalData[i][5].split(" ")[0].split("/");
				html.push('<tr style="cursor:pointer" onclick="CodalFilesWindow(ii.CodalData[' + i + '])">');
				html.push("<td style='width:56px'>" + ii.CodalData[i][5].split(" ")[0] + "</td>");
				html.push("<td style='width:590px'>" + ii.CodalData[i][3] + "</td>");
				html.push("</tr>")
			}
			html.push("</tbody></table>");
			$("#CodalChild").html(html.join(""))
		},
		ShowAllCodal: function() {
			var sheight = $(window).height() - 190;
			$("#CodalContent").append("<div style='direction:rtl;overflow:hidden;overflow-y:scroll;overflow-x:none;'><table><thead><tr><th style='width:44px'>تاریخ</th><th style='width:590px'>عنوان</th></tr></thead></table></div><div style='direction:rtl;overflow:hidden;overflow-y:scroll;overflow-x:none;height:" + sheight + "px' id='CodalChild'></div><span style='color:red'>مشاهده اطلاعات  دقیق در کدال</span>");
			$.ajax({
				url: "tsev2/data/CodalTopNew.aspx",
				cache: true,
				dataType: "text",
				data: {
					i: InsCode
				},
				success: function(data) {
					ii.CodalData = eval(data);
					ii.RenderAllCodal()
				}
			})
		},
		RenderCodal: function() {
			var html = [];
			html.push("<table class='table1'><tbody>");
			for (i = 0; i < CodalData.length; i++) {
				var dpart = CodalData[i][5].split(" ")[0].split("/");
				html.push('<tr style="cursor:pointer;height:20px" onclick="CodalFilesWindow(CodalData[' + i + '])">');
				html.push("<td style='white-space:nowrap'>" + CodalData[i][5].split(" ")[0] + "</td>");
				html.push("<td style='overflow:hidden;white-space:nowrap'>" + CodalData[i][3] + "</td>");
				html.push("</tr>")
			}
			html.push("</tbody></table>");
			$("#CodalDiv").html(html.join(""))
		},
		DrawTabs: function() {
			$("#MainBox").append('<div id="TseMsgContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="MeetingContent" class="tabcontent content" style="display:none"></div><div id="IdentityContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="StateChangeContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="ClientTypeContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="BoardMembersContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="ShareholderContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="EPSContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="DPSContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="ContactContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="InstValueContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="BalanceSheetContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="ProfitLossStatementContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="ProductAndSellContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="PortfoContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="AssemblyContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="HistoryContent" class="tabcontent content" style="text-align:center;display:none"></div><div id="CodalContent" class="tabcontent content" style="text-align:center;display:none"></div>');
			if (InstrumentID[2] != "T") {
				$("#tabs").html('<div class="menuHolder2" style="margin-top:-9px"><ul class="menu2"><li><a href="#" class="red" onclick="ii.ShowTab(0)">در یک نگاه</a></li><li><a href="#" class="green" onclick="ii.ShowTab(1)">پیام ناظر</a></li><li><a href="#" class="torquoise" onclick="ii.ShowTab(17)">سابقه</a></li><li><a href="#" class="darkred" onclick="ii.ShowTab(18)">اطلاعیه</a></li><li><a href="#" class="orange" onclick="ii.ShowTab(2)">آگهی مجمع</a></li><li><a href="#" class="blue" onclick="ii.ShowTab(4)">تغییر وضعیت</a></li><li><a href="#" class="yellow" onclick="ii.ShowTab(3)">شناسه</a></li><li><a href="#" class="indigo" onclick="ii.ShowTab(5)">هیات مدیره</a></li><li><a href="#" class="violet" onclick="ii.ShowTab(6)">حقیقی-حقوقی</a></li><li><a href="#" class="lightslategray" onclick="ii.ShowTab(7)">سهامداران</a></li><li><a href="#" class="crimson" onclick="ii.ShowTab(8)">EPS</a></li><li><a href="#" class="blue" onclick="ii.ShowTab(16)">DPS</a></li><li><a href="#" class="peru" onclick="ii.ShowTab(10)">آمارها</a></li><li><a href="#" class="teal" onclick="ii.ShowTab(9)">معرفی</a></li><li><a href="#" class="lime" onclick="ii.ShowTab(11)">ترازنامه</a></li><li><a href="#" class="darkred" onclick="ii.ShowTab(12)">سود و زیان</a></li><li><a href="#" class="torquoise" onclick="ii.ShowTab(13)">تولید و فروش</a></li><li><a href="#" class="pink" onclick="ii.ShowTab(14)">پورتفوی</a></li><li><a href="#" class="teal" onclick="ii.ShowTab(15)">تصمیمات مجمع</a></li></ul></div>')
			} else {
				$("#tabs").html('<div class="menuHolder2" style="margin-top:-9px"><ul class="menu2"><li><a href="#" class="red" onclick="ii.ShowTab(0)">در یک نگاه</a></li><li><a href="#" class="green" onclick="ii.ShowTab(1)">پیام ناظر</a></li><li><a href="#" class="torquoise" onclick="ii.ShowTab(17)">سابقه</a></li><li><a href="#" class="darkred" onclick="ii.ShowTab(18)">اطلاعیه</a></li><li><a href="#" class="blue" onclick="ii.ShowTab(4)">تغییر وضعیت</a></li><li><a href="#" class="yellow" onclick="ii.ShowTab(3)">شناسه</a></li><li><a href="#" class="indigo" onclick="ii.ShowTab(5)">ارکان صندوق</a></li><li><a href="#" class="violet" onclick="ii.ShowTab(6)">حقیقی-حقوقی</a></li><li><a href="#" class="lightslategray" onclick="ii.ShowTab(7)">دارندگان</a></li><li><a href="#" class="peru" onclick="ii.ShowTab(10)">آمارها</a></li><li><a href="#" class="teal" onclick="ii.ShowTab(9)">معرفی</a></li><li><a href="#" class="lime" onclick="ii.ShowTab(11)">ترازنامه</a></li><li><a href="#" class="darkred" onclick="ii.ShowTab(12)">سود و زیان</a></li><li><a href="#" class="pink" onclick="ii.ShowTab(14)">پورتفوی</a></li><li><a href="#" class="teal" onclick="ii.ShowTab(15)">تصمیمات مجمع</a></li></ul></div>')
			}
		},
		ShowTab: function(TabCode) {
			$(".tabcontent").css("display", "none");
			switch (TabCode) {
				case 0:
					$("#MainContent").css("display", "");
					break;
				case 1:
					$("#TseMsgContent").css("display", "");
					if ($("#TseMsgContent").html().length == 0) {
						$.ajax({
							url: "Loader.aspx?Partree=15131W&i=" + InsCode,
							cache: true,
							dataType: "text",
							success: function(data) {
								$("#TseMsgContent").html("توضیح: پیام های ناظر بازار مرتبط با هر سهم با جستجوی نماد هر سهم در متن و عنوان هر پیام نمایش داده می شود. بنابراین پیام های نمایش داده شده لزوما مرتبط با شرکت مورد نظر نمی باشد و همچنین در بعضی از موارد ممکن است بعضی از پیام های بازار مرتبط نمایش داده نشود.<br/>" + $("#PureData", data).html())
							}
						})
					}
					break;
				case 2:
					$("#MeetingContent").css("display", "");
					if ($("#MeetingContent").html().length == 0) {
						$.ajax({
							url: "tsev2/data/CodalContent.aspx",
							data: {
								s: LVal18AFC,
								r: 13
							},
							cache: true,
							dataType: "text",
							success: function(data) {
								ii.RenderCodalReport13(data)
							}
						})
					}
					break;
				case 3:
					$("#IdentityContent").css("display", "");
					if ($("#IdentityContent").html().length == 0) {
						$.ajax({
							url: "Loader.aspx?Partree=15131M&i=" + InsCode,
							cache: true,
							dataType: "text",
							success: function(data) {
								$("#IdentityContent").html($("#PureData", data))
							}
						})
					}
					break;
				case 4:
					$("#StateChangeContent").css("display", "");
					if ($("#StateChangeContent").html().length == 0) {
						$.ajax({
							url: "Loader.aspx?Partree=15131L&i=" + InsCode,
							cache: true,
							dataType: "text",
							success: function(data) {
								$("#StateChangeContent").html($("#PureData", data))
							}
						})
					}
					break;
				case 5:
					$("#BoardMembersContent").css("display", "");
					if ($("#BoardMembersContent").html().length == 0) {
						$.ajax({
							url: "tsev2/data/CodalContent.aspx",
							data: {
								s: LVal18AFC,
								r: 12
							},
							cache: true,
							dataType: "text",
							success: function(data) {
								ii.RenderCodalReport12(data)
							}
						})
					}
					break;
				case 6:
					$("#ClientTypeContent").css("display", "");
					if ($("#ClientTypeContent").html().length == 0) {
						$.ajax({
							url: "tsev2/data/clienttype.aspx",
							data: {
								i: InsCode
							},
							cache: true,
							dataType: "text",
							success: function(data) {
								ii.RenderClientType(data)
							}
						})
					}
					break;
				case 7:
					$("#ShareholderContent").css("display", "");
					if ($("#ShareholderContent").html().length == 0) {
						$.ajax({
							url: "Loader.aspx?Partree=15131T&c=" + CIsin,
							cache: true,
							dataType: "text",
							success: function(data) {
								$("#ShareholderContent").html($("#PureData", data))
							}
						})
					}
					break;
				case 8:
					$("#EPSContent").css("display", "");
					if ($("#EPSContent").html().length == 0) {
						$.ajax({
							url: "Loader.aspx?Partree=15131U&c=" + CIsin,
							cache: true,
							dataType: "text",
							success: function(data) {
								$("#EPSContent").html($("#PureData", data))
							}
						})
					}
					break;
				case 9:
					$("#ContactContent").css("display", "");
					if ($("#ContactContent").html().length == 0) {
						$.ajax({
							url: "Loader.aspx?Partree=15131V&s=" + LVal18AFC,
							cache: true,
							dataType: "text",
							success: function(data) {
								$("#ContactContent").html($("#PureData", data))
							}
						})
					}
					break;
				case 10:
					$("#InstValueContent").css("display", "");
					if ($("#InstValueContent").html().length == 0) {
						$.ajax({
							url: "tsev2/data/instValue.aspx",
							data: {
								i: InsCode,
								t: "i"
							},
							cache: true,
							dataType: "text",
							success: function(data) {
								ii.RenderInstValue(data)
							}
						})
					}
					break;
				case 11:
					$("#BalanceSheetContent").css("display", "");
					if ($("#BalanceSheetContent").html().length == 0) {
						$("#BalanceSheetContent").html("لطفا منتظر بمانید...");
						$.ajax({
							url: "tsev2/data/CodalContent.aspx",
							data: {
								s: LVal18AFC,
								r: 6,
								st: 6,
								pi: 0
							},
							cache: true,
							dataType: "text",
							success: function(data) {
								ii.RenderCodalReport6_0(data)
							}
						})
					}
					break;
				case 12:
					$("#ProfitLossStatementContent").css("display", "");
					if ($("#ProfitLossStatementContent").html().length == 0) {
						$("#ProfitLossStatementContent").html("لطفا منتظر بمانید...");
						$.ajax({
							url: "tsev2/data/CodalContent.aspx",
							data: {
								s: LVal18AFC,
								r: 6,
								st: 6,
								pi: 1
							},
							cache: true,
							dataType: "text",
							success: function(data) {
								ii.RenderCodalReport6_1(data)
							}
						})
					}
					break;
				case 13:
					$("#ProductAndSellContent").css("display", "");
					if ($("#ProductAndSellContent").html().length == 0) {
						$("#ProductAndSellContent").html("لطفا منتظر بمانید...");
						$.ajax({
							url: "tsev2/data/CodalContent.aspx",
							data: {
								s: LVal18AFC,
								r: 6,
								st: 6,
								pi: 2
							},
							cache: true,
							dataType: "text",
							success: function(data) {
								ii.RenderCodalReport6_2(data)
							}
						})
					}
					break;
				case 14:
					$("#PortfoContent").css("display", "");
					if ($("#PortfoContent").html().length == 0) {
						$("#PortfoContent").html("لطفا منتظر بمانید...");
						$.ajax({
							url: "tsev2/data/CodalContent.aspx",
							data: {
								s: LVal18AFC,
								r: 6,
								st: 8,
								pi: -1
							},
							cache: true,
							dataType: "text",
							success: function(data) {
								ii.RenderCodalReport8(data)
							}
						})
					}
					break;
				case 15:
					$("#AssemblyContent").css("display", "");
					if ($("#AssemblyContent").html().length == 0) {
						$.ajax({
							url: "tsev2/data/CodalContent.aspx",
							data: {
								s: LVal18AFC,
								r: 14
							},
							cache: true,
							dataType: "text",
							success: function(data) {
								ii.RenderCodalReport14(data)
							}
						})
					}
					break;
				case 16:
					$("#DPSContent").css("display", "");
					if ($("#DPSContent").html().length == 0) {
						$.ajax({
							url: "tsev2/data/DPSData.aspx",
							data: {
								s: LVal18AFC
							},
							cache: true,
							dataType: "text",
							success: function(data) {
								ii.RenderDPS(data)
							}
						})
					}
					break;
				case 17:
					$("#HistoryContent").css("display", "");
					if ($("#HistoryContent").html().length == 0) {
						ii.ShowTradeHistory(999999)
					}
					break;
				case 18:
					$("#CodalContent").css("display", "");
					if ($("#CodalContent").html().length == 0) {
						ii.ShowAllCodal()
					}
					break
			}
		},
		RenderInstContact: function(data) {
			$("#ContactContent").append("<table id='ContactTbl' class=\"table1\" style='direction:rtl ; text-align:right'></table>");
			var ds = eval(data);
			var strDetail = "";
			var strHead = "";
			var OldDisplayOrder = 0;
			var first = true;
			var box = "<div style='background-color:#335599;float:right;border-radius:4px;margin:2px;width:12px;height:12px;border:0px solid black'></div>";
			var subbox = "<div style='background-color:#bb3333;float:right;border-radius:4px;margin:2px;margin-right:20px;width:12px;height:12px;border:0px solid black'></div>";
			var CreatedByUser = function(code) {
				if (code == 0) {
					return ""
				} else {
					return "<span style='color:red'> (* پیشنهادی کاربر) </span>"
				}
			};
			for (ipos = 0; ipos < ds.length; ipos++) {
				if ((OldDisplayOrder != ds[ipos]["DisplayOrder"]) && (OldDisplayOrder != 0)) {
					ii.DrowContactRow(strHead, strDetail, OldDisplayOrder);
					strDetail = "";
					strHead = "";
					first = true
				}
				if (first) {
					strHead = "<td>" + box + ds[ipos]["CompanyData"] + CreatedByUser(ds[ipos]["CreatedByUser"]) + "</td><td style='width:50px' desc='تایید,در صورتی که از درستی این داده اطمینان دارید با تایید آن ارزش آن را افزایش دهید' onmouseover='ShowTooltip(this)' onmouseout='HideTooltip()'><a class='awesome green' href='#' onclick='ii.IncreaseVote(" + ds[ipos]["PhoneIdn"] + ", 1)'>˄&nbsp;" + ds[ipos]["UpVote"] + "</a></td><td style='width:50px' desc='ایراد,در صورتی که از تادرستی این داده اطمینان دارید، اطلاع دهید' onmouseover='ShowTooltip(this)' onmouseout='HideTooltip()'><a class='awesome red' href='#' onclick='ii.IncreaseVote(" + ds[ipos]["PhoneIdn"] + ", 2)'>˅&nbsp;" + ds[ipos]["DownVote"] + "</a></td>";
					first = false
				} else {
					strDetail += "<tr class='Info" + ds[ipos]["DisplayOrder"] + "'><td style='width:20px'></td><td>" + subbox + ds[ipos]["CompanyData"] + CreatedByUser(ds[ipos]["CreatedByUser"]) + "</td><td style='width:50px' desc='تایید,در صورتی که از درستی این داده اطمینان دارید با تایید آن ارزش آن را افزایش دهید' onmouseover='ShowTooltip(this)' onmouseout='HideTooltip()'><a class='awesome green' href='#' onclick='ii.IncreaseVote(" + ds[ipos]["PhoneIdn"] + ", 1)'>˄&nbsp;" + ds[ipos]["UpVote"] + "</a></td><td style='width:50px' desc='ایراد,در صورتی که از تادرستی این داده اطمینان دارید، اطلاع دهید' onmouseover='ShowTooltip(this)' onmouseout='HideTooltip()'><a class='awesome red' href='#' onclick='ii.IncreaseVote(" + ds[ipos]["PhoneIdn"] + ", 2)'>˅&nbsp;" + ds[ipos]["DownVote"] + "</a></td></tr>"
				}
				OldDisplayOrder = ds[ipos]["DisplayOrder"]
			}
			ii.DrowContactRow(strHead, strDetail, OldDisplayOrder);
			$("#ContactTbl").append("<tr><td colspan='4'><span style='color:red'>* اطلاعات پیشنهادی کاربران توسط شركت مديريت فناوري بورس تهران بررسی نمی گردد و این اطلاعات می تواند معتبر نباشد.</span><br/>شركت مديريت فناوري بورس تهران فقط گردآورنده ي اطلاعات براي معرفي شركت هاي پذيرفته شده در بورس و فرابورس است. اين شركت نظارت،مسئوليت  يا آگاهي درباره ي چگونگي ارائه خدمات اداره  سهام شركت ها، توزيع سود، وضعيت افزايش سرمايه آنها و موارد مشابه ديگر ندارد و مرجع رسيدگي به شكايات يا رفع كاستي هاي شركت ها نمي باشد.</td></tr><tr><td colspan='4'><a class='awesome tra' href='#' onclick='ii.GetContactInfo()'>درج اطلاعات جدید</a></td></tr><tr><td colspan='4' id='GetContact' ></td></tr>")
		},
		DrowContactRow: function(strHead, strDetail, DisplayOrder) {
			if (strDetail == "") {
				strHead = "<tr><td style='width:20px'></td>" + strHead + "</tr>"
			} else {
				strHead = "<tr><td style='width:30px' desc='اطلاعات جایگزین, اطلاعات بیشتر که توسط کاربران معرفی شده است' onmouseover='ShowTooltip(this)' onmouseout='HideTooltip()'><a class='awesome tra' href='#' onclick='ii.ShowUserContacts(" + DisplayOrder + ")' >...</a></td>" + strHead + "</tr>"
			}
			$("#ContactTbl").append(strHead + strDetail);
			if (strDetail != "") {
				$(".Info" + DisplayOrder).css("display", "none")
			}
		},
		GetContactInfo: function() {
			$("#tblGetContact").empty().remove();
			$.ajax({
				url: MembersSite() + "/tsev2/data/InstContact.aspx",
				data: {
					t: "t"
				},
				cache: true,
				dataType: "text",
				success: function(data) {
					var rows = data.split(";");
					var cols;
					var strOptions = "";
					for (ipos = 0; ipos < rows.length; ipos++) {
						cols = rows[ipos].split(",");
						strOptions += "<option value='" + cols[1] + "'>" + cols[0] + "</option>"
					}
					$("#GetContact").append("<table id='tblGetContact' class=\"table1\" style='direction:rtl ; text-align:right'><tr><td><select id=\"SelType\" style='font-family:tahoma;width:200px' tabindex='1'>" + strOptions + "</select></td></tr><tr><td><input tabindex='2' id='ContactValue' style='direction:ltr;width:600px'  maxlength='255'></td></tr><tr><td><a class='awesome tra' href='#' onclick='ii.InsertContactInfo()'>ارسال اطلاعات</a></td></tr></table>")
				}
			})
		},
		InsertContactInfo: function() {
			var _Type = $("#SelType").val();
			_Type = $("<div />").text(_Type).html();
			if ($("#ContactValue").val() == "") {
				ShowModalStaticPro("خطا", "<div style='font-size:medium'> اطلاعات درج شده صحیح نمیباشد </div>", 255, 50, "");
				return
			}
			var _Value = $("#ContactValue").val();
			_Value = $("<div />").text(_Value).html();
			$.ajax({
				url: MembersSite() + "/tsev2/data/InstContactInsert.aspx",
				data: {
					t: "i",
					i: CIsin,
					pt: _Type,
					pv: _Value
				},
				dataType: "text",
				error: function() {
					ShowModalStaticPro("خطا", "<div style='font-size:medium'> اطلاعات درج شده صحیح نمیباشد </div>", 255, 50, "")
				},
				success: function(data) {
					if (data == "") {
						ShowModalStaticPro("خطا", "<div style='font-size:medium'> اشکال در درج اطلاعات </div>", 255, 50, "")
					} else {
						ShowModalStaticPro("پیغام", "<div style='font-size:medium'> اطلاعات با موفقیت ارسال شد. اطلاعات بعد از تایید توسط سرپرست قابل رویت میباشد </div>", 255, 80, "");
						$("#tblGetContact").empty().remove()
					}
				}
			})
		},
		ShowUserContacts: function(part) {
			if ($(".Info" + part).length == 0) {
				return
			}
			if ($(".Info" + part)[0].style.display == "none") {
				$(".Info" + part).css("display", "")
			} else {
				$(".Info" + part).css("display", "none")
			}
		},
		IncreaseVote: function(PhoneIdn, VoteType) {
			$.ajax({
				url: MembersSite() + "/tsev2/data/InstContactInsert.aspx",
				data: {
					t: "v",
					pi: PhoneIdn,
					v: VoteType
				},
				dataType: "text",
				success: function(data) {
					if (data == "") {
						return
					}
					$.ajax({
						url: MembersSite() + "/tsev2/data/InstContact.aspx",
						data: {
							t: "l",
							i: CIsin
						},
						cache: false,
						dataType: "text",
						success: function(data) {
							$("#ContactTbl").empty().remove();
							ii.RenderInstContact(data);
							ShowModalStaticPro("پیغام", "با تشکر از همکاری شما، نظر شما درج گردید", 255, 80, "")
						}
					})
				}
			})
		},
		ShowTabPortfo: function(TabCode) {
			$(".tabcontentportfo").css("display", "none");
			switch (TabCode) {
				case 3:
					$("#Portfo3Content").css("display", "");
					break;
				case 4:
					$("#Portfo4Content").css("display", "");
					break;
				case 5:
					$("#Portfo5Content").css("display", "");
					break;
				case 6:
					$("#Portfo6Content").css("display", "");
					break;
				case 7:
					$("#Portfo7Content").css("display", "");
					break
			}
		},
		ChangeYear: function(direction, data) {
			var yearVal = $("#YearPart").val();
			yearVal = $("<div />").text(yearVal).html();
			var year = parseInt(yearVal);
			if (direction == 1) {
				year += 1
			} else {
				year -= 1
			}
			$("#YearPart").html(year);
			$("#YearPart").val(year);
			var rows = data.split(";");
			ii.ShowClientTypeInYear(year, rows)
		},
		RenderClientType: function(data) {
			var rows = data.split(";");
			if ((rows == null) || (typeof rows == "undefined")) {
				return
			}
			if ((rows.length == 0) || (rows[0] == "")) {
				return
			}
			var cols;
			var year = devenToPersianDate(rows[0].split(",")[0]).substring(0, 4);
			$("#ClientTypeContent").append("<div class='box1 white tbl z4_4'><div class='header'>حقیقی و حقوقی</div><div class='content'><table ><tr><td><a class='awesome green' onclick=\"ii.ChangeYear('1', '" + data + "')\" style='float:left'>+</a></td><td style='text-align:center; width:50px' id='YearPart'>" + year + "</td><td><a class='awesome green' onclick=\"ii.ChangeYear('-1', '" + data + "')\" style='float:right'>-</a></td></tr></table><table class='table1' id='ClientTypeTable'><tr>    <th rowspan='2'>تاریخ</th>    <th rowspan='2'></th>    <th colspan='2'>خرید</th>    <th colspan='2'>فروش</th></tr><tr>    <td>حقیقی</td>    <td>حقوقی</td>    <td>حقیقی</td>    <td>حقوقی</td></tr><tbody id='ClientTypeBody'></tbody></table></div></div>");
			$("#YearPart").val(year);
			ii.ShowClientTypeInYear(year, rows)
		},
		ShowClientTypeInYear: function(year, rows) {
			var ipos;
			$("#ClientTypeBody").html("");
			var Buy_I_Percent;
			var Buy_N_Percent;
			var Sell_I_Percent;
			var Sell_N_Percent;
			var Buy_I_Volume;
			var Buy_N_Volume;
			var Sell_I_Volume;
			var Sell_N_Volume;
			for (ipos = 0; ipos < rows.length; ipos++) {
				cols = rows[ipos].split(",");
				var persianDate = devenToPersianDate(cols[0]);
				if (persianDate.substring(0, 4) == year) {
					var dpart = persianDate.split("/");
					Buy_I_Percent = 0;
					Buy_N_Percent = 0;
					Sell_I_Percent = 0;
					Sell_N_Percent = 0;
					Buy_I_Volume = parseFloat(cols[5]);
					Buy_N_Volume = parseFloat(cols[6]);
					Sell_I_Volume = parseFloat(cols[7]);
					Sell_N_Volume = parseFloat(cols[8]);
					var Buy_Volume_Sum = Buy_I_Volume + Buy_N_Volume;
					var Sell_Volume_Sum = Sell_I_Volume + Sell_N_Volume;
					if (Buy_Volume_Sum > 0) {
						Buy_I_Percent = parseInt(100 * Buy_I_Volume / Buy_Volume_Sum);
						Buy_N_Percent = parseInt(100 * Buy_N_Volume / Buy_Volume_Sum)
					}
					if (Sell_Volume_Sum > 0) {
						Sell_I_Percent = parseInt(100 * Sell_I_Volume / Sell_Volume_Sum);
						Sell_N_Percent = parseInt(100 * Sell_N_Volume / Sell_Volume_Sum)
					}
					$("#ClientTypeBody").append("<tr><td rowspan='4'><div class='CalMonth '>" + MonthName[parseInt(dpart[1]) - 1] + "</div><div class='CalDay '>" + dpart[2] + "</div></td><td>تعداد</td><td>" + addCommas(cols[1]) + "</td><td>" + addCommas(cols[2]) + "</td><td>" + addCommas(cols[3]) + "</td><td>" + addCommas(cols[4]) + "</td></tr><tr><td>حجم</td><td>" + bigNumber(cols[5]) + "  (" + bigNumber(Buy_I_Percent) + "%)</td><td>" + bigNumber(cols[6]) + "  (" + bigNumber(Buy_N_Percent) + "%)</td><td>" + bigNumber(cols[7]) + "  (" + bigNumber(Sell_I_Percent) + "%)</td><td>" + bigNumber(cols[8]) + "  (" + bigNumber(Sell_N_Percent) + "%)</td></tr><tr><td>ارزش</td><td>" + bigNumber(cols[9]) + "</td><td>" + bigNumber(cols[10]) + "</td><td>" + bigNumber(cols[11]) + "</td><td>" + bigNumber(cols[12]) + "</td></tr><tr><td>قیمت میانگین</td><td>" + AdvRound(cols[1] == "0" ? "" : parseInt(cols[9]) / parseInt(cols[5]), 2) + "</td><td>" + AdvRound(cols[2] == "0" ? "" : parseInt(cols[10]) / parseInt(cols[6]), 2) + "</td><td>" + AdvRound(cols[3] == "0" ? "" : parseInt(cols[11]) / parseInt(cols[7]), 2) + "</td><td>" + AdvRound(cols[4] == "0" ? "" : parseInt(cols[12]) / parseInt(cols[8]), 2) + "</td></tr><tr><td></td><td colspan='2' >تغییر مالکیت حقوقی به حقیقی</td><td colspan='2' >" + bigNumber((cols[8]) - (cols[6])) + "</td></tr><tr><td colspan='6' style='height:1px;background-color:black'></td></tr>")
				}
			}
		},
		RenderInstValue: function(data) {
			var rows = data.split(";");
			var cols;
			var ipos = 0;
			$("#InstValueContent").append("برای مقایسه شرکت ها با یکدیگر بر روی پارامتر مورد نظر کلیک کنید.<br/><a class='awesome green' href='Loader.aspx?ParTree=15131X' style='float:left'>مقایسه چند شرکت</a><br/><br/>");
			for (var key in InstDataPartition) {
				if (InstDataPartition.hasOwnProperty(key)) {
					$("#InstValueContent").append('<div class="box1 tbl z2_4"><div class="header">' + InstDataPartition[key][1] + '</div><div class="content"><table class="table1" id=\'InstPartition' + InstDataPartition[key][0] + "'><tr><th></th><th></th></tr></table></div></div>")
				}
			}
			for (ipos = 0; ipos < rows.length; ipos++) {
				cols = rows[ipos].split(",");
				$("#InstPartition" + InstDataType["dt" + cols[0]][2]).append("<tr><td><a href='#' onclick='ii.ShowInstValueOneParamAllInst(" + cols[0] + ")'>" + InstDataType["dt" + cols[0]][1] + "</a></td><td><a href='#' onclick='ii.ShowInstValueOneParamAllInst(" + cols[0] + ")'>" + bigNumber(cols[1]) + "</a></td>")
			}
		},
		ShowInstValueOneParamAllInst: function(DataType) {
			$.ajax({
				url: "tsev2/data/instValue.aspx",
				data: {
					dt: DataType,
					t: "dt"
				},
				cache: true,
				dataType: "text",
				success: function(data) {
					var rows = data.split(";");
					var cols;
					var html = "";
					var ipos = 0;
					var WinNo = ShowModalStaticPro(InstDataType["dt" + DataType][1], "", 460);
					html = '<div class="box1 tbl"><div class="content"><table class="table1"><tr><th>نماد</th><th>مقدار</th></tr>';
					for (ipos = 0; ipos < rows.length; ipos++) {
						cols = rows[ipos].split(",");
						html += "<tr><td><a href='" + InstUrl(cols[0]) + "'>" + cols[1] + " - " + cols[2] + "</a></td><td>" + bigNumber(cols[3]) + "</td>"
					}
					html += "</table></div></div>";
					$("#ModalWindowInner" + WinNo).append(html)
				}
			})
		},
		SeeCodal: "برای مشاهده اطلاعات دقیق به سایت کدال مراجعه فرمایید",
		RenderCodalReport6_0: function(data) {
			var html = "";
			var ds = eval(data);
			var ipos = 0;
			var jpos = 0;
			if (ds.length > 0) {
				html += this.SeeCodal
			}
			for (ipos = 0; ipos < ds.length; ipos++) {
				try {
					if (ds[ipos][5] == "0") {
						if (ds[ipos][4].Root.table == null) {
							continue
						}
						html += '<div class="box1 red tbl z4_4"><div class="header">' + ds[ipos][0] + '</div><div class="content"><div style="display:inline-block;width:50px;vertical-align:top">';
						var dDate = ds[ipos][2].split(" ")[0].split("/");
						html += "<div class='CalMonth'>" + MonthName[parseInt(dDate[1], 10) - 1] + "</div><div class='CalDay'>" + dDate[2] + "</div>";
						html += '</div><div style="display:inline-block"><table class="table1">';
						var TR = ds[ipos][4].Root.table.tr;
						var cellStart = '<th style="background-color:#eeeeee;" >';
						var cellEnd = "</th>";
						for (lpos = 0; lpos < TR.length; lpos++) {
							html += "<tr>";
							var TD = TR[lpos].td;
							if (lpos == 1) {
								cellStart = '<td style="background-color: #ddddff" >';
								cellEnd = "</td>"
							} else {
								if (lpos > 1) {
									cellStart = "<td>";
									cellEnd = "</td>"
								}
							}
							for (mpos = 0; mpos < TD.length; mpos++) {
								if (typeof TD[mpos] == "string") {
									html += cellStart + TD[mpos] + cellEnd
								} else {
									html += cellStart;
									if ((TD[mpos] != null) && !(typeof TD[mpos]._text == "undefined")) {
										html += TD[mpos]._text
									}
									html += cellEnd
								}
							}
							html += "</tr>"
						}
						html += "</table>";
						html += "</div></div></div>"
					}
				} catch (err) {}
			}
			$("#BalanceSheetContent").html(html)
		},
		RenderCodalReport6_1: function(data) {
			var html = "";
			var ds = eval(data);
			var ipos = 0;
			var jpos = 0;
			if (ds.length > 0) {
				html += this.SeeCodal
			}
			for (ipos = 0; ipos < ds.length; ipos++) {
				if (ds[ipos][5] == "1") {
					if (ds[ipos][4].Root.table == null) {
						continue
					}
					html += '<div class="box1 red tbl z4_4"><div class="header">' + ds[ipos][0] + '</div><div class="content"><div style="display:inline-block;width:50px;vertical-align:top">';
					var dDate = ds[ipos][2].split(" ")[0].split("/");
					html += "<div class='CalMonth'>" + MonthName[parseInt(dDate[1], 10) - 1] + "</div><div class='CalDay'>" + dDate[2] + "</div>";
					html += '</div><div style="display:inline-block"><table class="table1">';
					var TR = ds[ipos][4].Root.table.tr;
					var cellStart = '<th style="background-color:#eeeeee;" >';
					var cellEnd = "</th>";
					for (lpos = 0; lpos < TR.length; lpos++) {
						html += "<tr>";
						var TD = TR[lpos].td;
						if (lpos > 0) {
							cellStart = '<td style="background-color: #ddddff" >';
							cellEnd = "</td>"
						}
						if (lpos > 1) {
							cellStart = "<td>";
							cellEnd = "</td>"
						}
						if (TD.length == 5 || TD.length == 6) {
							for (mpos = 0; mpos < TD.length; mpos++) {
								if ((lpos == 0) || (mpos != 1)) {
									if (typeof TD[mpos] == "string") {
										html += cellStart + TD[mpos] + cellEnd
									} else {
										html += cellStart;
										if ((TD[mpos] != null) && !(typeof TD[mpos]._text == "undefined")) {
											html += TD[mpos]._text
										}
										html += cellEnd
									}
								}
							}
						}
						html += "</tr>"
					}
					html += "</table>";
					html += "</div></div></div>"
				}
			}
			$("#ProfitLossStatementContent").html(html)
		},
		RenderCodalReport6_2: function(data) {
			var html = "";
			var ds = eval(data);
			var ipos = 0;
			var jpos = 0;
			if (ds.length > 0) {
				html += this.SeeCodal
			}
			console.log("1");
			var report6_2Titles = ["مقدار تولید", "مقدار فروش", "مبلغ فروش"];
			console.log("2");
			for (ipos = 0; ipos < ds.length; ipos++) {
				console.log("4: " + ipos.toString() + " : " + ds[ipos][0] + "---" + ds[ipos][5]);
				if (ds[ipos][5] == "2") {
					console.log("4:4 " + ds[ipos][4].Root.toString());
					if (ds[ipos][4].Root.Tables == null) {
						continue
					}
					console.log("3: " + ds[ipos][4].Root.Tables);
					console.log("4: " + ds[ipos][0]);
					console.log("9: ");
					html += '<div class="box1 red tbl z4_4"><div class="header">' + ds[ipos][0] + '</div><div class="content"><div style="display:inline-block;width:50px;vertical-align:top">';
					console.log("8: " + html);
					console.log("5-2:" + ds[ipos][2]);
					var dDate = ds[ipos][2].split(" ")[0].split("/");
					console.log("5-3:");
					console.log("5-1: " + dDate);
					console.log("5: " + dDate[1]);
					console.log("6: " + dDate[2]);
					html += "<div class='CalMonth'>" + MonthName[parseInt(dDate[1], 10) - 1] + "</div><div class='CalDay'>" + dDate[2] + "</div>";
					html += '</div><div style="display:inline-block">';
					var Tables = ds[ipos][4].Root.Tables.table;
					console.log("7: " + Tables.length);
					if (Tables.length == 3) {
						for (kpos = 0; kpos < Tables.length; kpos++) {
							html += '<table class="table1">';
							var TR = Tables[kpos].tr;
							html += '<th colspan="6" style="background-color:#eeeeee;" >' + report6_2Titles[kpos] + "</th>";
							var cellStart = '<td style="background-color: #ddddff" >';
							var cellEnd = "</td>";
							for (lpos = 0; lpos < TR.length; lpos++) {
								if (lpos > 0) {
									cellStart = "<td>";
									cellEnd = "</td>"
								}
								html += "<tr>";
								if (TR[lpos] != null) {
									var TD = TR[lpos].td;
									for (mpos = 0; mpos < TD.length; mpos++) {
										if (mpos != 1) {
											if (typeof TD[mpos] == "string") {
												html += cellStart + TD[mpos]
											} else {
												html += cellStart;
												if ((TD[mpos] != null) && !(typeof TD[mpos]._text == "undefined")) {
													html += TD[mpos]._text
												}
											}
											if (mpos == 2 || mpos == 3 || mpos == 5) {
												if (TD[1] != null && lpos != 0) {
													html += " " + TD[1]
												}
											}
											html += cellEnd
										}
									}
								}
								html += "</tr>"
							}
							html += "</table>"
						}
					}
					html += "</div></div></div>"
				}
			}
			$("#ProductAndSellContent").html(html)
		},
		RenderCodalReport8: function(data) {
			var html = ["", "", "", "", ""];
			var ds = eval(data);
			if (data == null || ds.length == 0) {
				$("#PortfoContent").html("<span>پورتفوی شرکت های سرمایه گذاری در این بخش قابل مشاهده می باشد</span>");
				return
			}
			$("#PortfoContent").html(this.SeeCodal + '<br /><span id="tabsPortfo"></span><div id="PortfoBox" class="box1 silver" >');
			$("#PortfoBox").append('<div id="Portfo3Content" class="tabcontentportfo content" style="text-align:center;display:none"></div><div id="Portfo4Content" class="tabcontentportfo content" style="display:none"></div><div id="Portfo5Content" class="tabcontentportfo content" style="text-align:center;display:none"></div><div id="Portfo6Content" class="tabcontentportfo content" style="text-align:center;display:none"></div><div id="Portfo7Content" class="tabcontentportfo content" style="text-align:center;display:none"></div>');
			$("#tabsPortfo").html('<div class="menuHolder2" ><ul class="menu2" ><li><a href="#url" class="red" onclick="ii.ShowTabPortfo(3)">به تفکیک گروه صنعت</a></li><li><a href="#url" class="green" onclick="ii.ShowTabPortfo(4)">پورتفوی شرکتهای بورسی</a></li><li><a href="#url" class="orange" onclick="ii.ShowTabPortfo(5)">پورتفوی شرکتهای غیر بورسی</a></li><li><a href="#url" class="blue" onclick="ii.ShowTabPortfo(6)">صورت ریز معاملات تحصیل شده</a></li><li><a href="#url" class="torquoise" onclick="ii.ShowTabPortfo(7)">صورت ریز معاملات واگذار شده</a></li></ul></div>');
			ii.ShowTabPortfo(3);
			var ipos = 0;
			var jpos = 0;
			for (ipos = 0; ipos < ds.length; ipos++) {
				try {
					var report8Type = parseInt(ds[ipos][5], 10);
					if (report8Type == 3) {
						if (ds[ipos][4].Root.table == null) {
							continue
						}
						html[report8Type - 3] += '<div class="box1 red tbl"><style type="text/css"> .CodalReport8HeaderBG0 { background-color : #eeeeee; }  .CodalReport8HeaderBG1 { background-color : #def5cf; }  .CodalReport8HeaderBG2 { background-color : #ffe6ed; }  .CodalReport8HeaderBG3 { background-color : #def5cf; } </style><div class="header">' + ds[ipos][0] + '</div><div class="content">';
						var dDate = ds[ipos][2].split(" ")[0].split("/");
						html[report8Type - 3] += '<div style="display:inline-block;"><table class="table1">';
						var TR = ds[ipos][4].Root.table.tr;
						html[report8Type - 3] += "<tr><th rowspan='3' style=\"font-weight:normal;\" ><div style=\"display:inline-block;width:50px;vertical-align:top\"><div class='CalMonth'>" + MonthName[parseInt(dDate[1], 10) - 1] + "</div><div class='CalDay'>" + dDate[2] + '</div></div></th><th colspan=\'6\' class="CodalReport8HeaderBG1" >پذیرفته شده در بورس</th><th colspan=\'4\' class="CodalReport8HeaderBG2" >خارج از بورس</th><th colspan=\'6\' class="CodalReport8HeaderBG3" >جمع سرمایه گذاری</th></tr><tr><th colspan=\'3\' class="CodalReport8HeaderBG1" >ابتدای دوره</th><th colspan=\'3\' class="CodalReport8HeaderBG1" >انتهای دوره</th><th colspan=\'2\' class="CodalReport8HeaderBG2" >ابتدای دوره</th><th colspan=\'2\' class="CodalReport8HeaderBG2" >انتهای دوره</th><th colspan=\'3\' class="CodalReport8HeaderBG3" >ابتدای دوره</th><th colspan=\'3\' class="CodalReport8HeaderBG3" >انتهای دوره</th></tr><tr><th class="CodalReport8HeaderBG1" >تعداد شرکت</th><th class="CodalReport8HeaderBG1" >بهای تمام شده</th><th class="CodalReport8HeaderBG1" >ارزش بازار</th><th class="CodalReport8HeaderBG1" >تعداد شرکت</th><th class="CodalReport8HeaderBG1" >بهای تمام شده</th><th class="CodalReport8HeaderBG1" >ارزش بازار</th><th class="CodalReport8HeaderBG2" >تعداد شرکت</th><th class="CodalReport8HeaderBG2" >بهای تمام شده</th><th class="CodalReport8HeaderBG2" >تعداد شرکت</th><th class="CodalReport8HeaderBG2" >بهای تمام شده</th><th class="CodalReport8HeaderBG3" >تعداد شرکت</th><th class="CodalReport8HeaderBG3" >بهای تمام شده</th><th class="CodalReport8HeaderBG3" >درصد کل</th><th class="CodalReport8HeaderBG3" >تعداد شرکت</th><th class="CodalReport8HeaderBG3" >بهای تمام شده</th><th class="CodalReport8HeaderBG3" >درصد کل</th>';
						var cellStart = '<td style="vertical-align:top;" >';
						var cellEnd = "</td>";
						for (lpos = 0; lpos < TR.length; lpos++) {
							if (TR[lpos] != null) {
								html[report8Type - 3] += "<tr>";
								try {
									var TD = TR[lpos].td;
									for (mpos = 0; mpos < TD.length; mpos++) {
										if (!(mpos == 4 || mpos == 5 || mpos == 11 || mpos == 17 || mpos == 18)) {
											var cellExtractedData;
											html[report8Type - 3] += cellStart;
											if (typeof TD[mpos] == "string") {
												cellExtractedData = TD[mpos]
											} else {
												if ((TD[mpos] != null) && !(typeof TD[mpos]._text == "undefined")) {
													cellExtractedData = TD[mpos]._text
												}
											}
											if (mpos != 0 && cellExtractedData != null) {
												html[report8Type - 3] += '<div style="white-space:nowrap;direction:ltr;" >' + bigNumber(cellExtractedData.replace(/,/g, "")) + "</div>"
											} else {
												html[report8Type - 3] += cellExtractedData
											}
											if (mpos == 7 || mpos == 8 || mpos == 13 || mpos == 20 || mpos == 21) {
												var differenceGoBack = 3;
												if (mpos == 13) {
													differenceGoBack = 2
												}
												var differenceCellVal;
												if (typeof TD[mpos - differenceGoBack] == "string") {
													differenceCellVal = TD[mpos - differenceGoBack]
												} else {
													if ((TD[mpos - differenceGoBack] != null) && !(typeof TD[mpos - differenceGoBack]._text == "undefined")) {
														differenceCellVal = TD[mpos - differenceGoBack]._text
													}
												}
												html[report8Type - 3] += "<br />";
												if (differenceCellVal.indexOf("(") !== -1) {
													html[report8Type - 3] += '<div style="color:red;" >';
													differenceCellVal = differenceCellVal.replace(/,/g, "");
													differenceCellVal = differenceCellVal.replace("(", "").replace(")", "");
													differenceCellVal = "-" + differenceCellVal
												} else {
													differenceCellVal = differenceCellVal.replace(/,/g, "");
													html[report8Type - 3] += '<div style="color:green;" >'
												}
												if (differenceCellVal.indexOf("-") !== -1) {
													differenceCellVal = differenceCellVal.replace("-", "");
													html[report8Type - 3] += '<div style="white-space:nowrap;direction:ltr;" >-' + bigNumber(differenceCellVal) + "</div></div>"
												} else {
													html[report8Type - 3] += '<div style="white-space:nowrap;direction:ltr;" >' + bigNumber(differenceCellVal) + "</div></div>"
												}
											}
											html[report8Type - 3] += cellEnd
										}
									}
								} catch (err) {}
								html[report8Type - 3] += "</tr>"
							}
						}
						html[report8Type - 3] += "</table>";
						html[report8Type - 3] += "</div></div></div>"
					} else {
						if (report8Type == 4 || report8Type == 5 || report8Type == 6 || report8Type == 7) {
							if (ds[ipos][4].Root.table == null) {
								continue
							}
							try {
								var TR = ds[ipos][4].Root.table.tr
							} catch (err) {
								continue
							}
							html[report8Type - 3] += '<div class="box1 red tbl"><div class="header">' + ds[ipos][0] + '</div><div class="content">';
							var dDate = ds[ipos][2].split(" ")[0].split("/");
							if (report8Type == 4 || report8Type == 5) {
								html[report8Type - 3] += '<div style="display:inline-block;"><table class="table1"><tr><th style="font-weight:normal;" ><div style="display:inline-block;width:50px;vertical-align:top"><div class=\'CalMonth\'>' + MonthName[parseInt(dDate[1], 10) - 1] + "</div><div class='CalDay'>" + dDate[2] + "</div></div></th>";
								if (report8Type == 4) {
									html[report8Type - 3] += "<th colspan='2' class=\"CodalReport8HeaderBG0\" > </th><th colspan='3' class=\"CodalReport8HeaderBG1\" >ابتدای دوره</th><th colspan='3' class=\"CodalReport8HeaderBG2\" >تغییرات</th><th colspan='6' class=\"CodalReport8HeaderBG3\" >انتهای دوره</th></tr>"
								} else {
									html[report8Type - 3] += "<th colspan='2' class=\"CodalReport8HeaderBG0\" > </th><th colspan='2' class=\"CodalReport8HeaderBG1\" >ابتدای دوره</th><th colspan='2' class=\"CodalReport8HeaderBG2\" >تغییرات</th><th colspan='3' class=\"CodalReport8HeaderBG3\" >انتهای دوره</th></tr>"
								}
							} else {
								html[report8Type - 3] += "<div style=\"display:inline-block;width:50px;vertical-align:top\"><div class='CalMonth'>" + MonthName[parseInt(dDate[1], 10) - 1] + "</div><div class='CalDay'>" + dDate[2] + '</div></div><div style="display:inline-block"><table class="table1"><div style="display:inline-block"><table class="table1">'
							}
							if (report8Type == 4) {
								html[report8Type - 3] += '<tr><th class="CodalReport8HeaderBG0" >نام شرکت</th><th class="CodalReport8HeaderBG0" >سرمایه (میلیون ریال)</th><th class="CodalReport8HeaderBG0" >ارزش اسمی هر سهم (ریال)</th><th class="CodalReport8HeaderBG1" >تعداد سهام</th><th class="CodalReport8HeaderBG1" >بهای تمام شده</th><th class="CodalReport8HeaderBG1" >ارزش بازار</th><th class="CodalReport8HeaderBG2" >تعداد سهام</th><th class="CodalReport8HeaderBG2" >بهای تمام شده</th><th class="CodalReport8HeaderBG2" >ارزش بازار</th><th class="CodalReport8HeaderBG3" >درصد مالکیت</th><th class="CodalReport8HeaderBG3" >بهای تمام شده</th><th class="CodalReport8HeaderBG3" >ارزش بازار</th><th class="CodalReport8HeaderBG3" >بهای تمام شده هر سهم (ریال)</th><th class="CodalReport8HeaderBG3" >ارزش هر سهم (ریال)</th><th class="CodalReport8HeaderBG3" >افزایش (کاهش)</th></tr>'
							} else {
								if (report8Type == 5) {
									html[report8Type - 3] += '<tr><th class="CodalReport8HeaderBG0" >نام شرکت</th><th class="CodalReport8HeaderBG0" >سرمایه (میلیون ریال)</th><th class="CodalReport8HeaderBG0" >ارزش اسمی هر سهم (ریال)</th><th class="CodalReport8HeaderBG1" >تعداد سهام</th><th class="CodalReport8HeaderBG1" >بهای تمام شده</th><th class="CodalReport8HeaderBG2" >تعداد سهام</th><th class="CodalReport8HeaderBG2" >بهای تمام شده</th><th class="CodalReport8HeaderBG3" >درصد مالکیت</th><th class="CodalReport8HeaderBG3" >بهای تمام شده</th><th class="CodalReport8HeaderBG3" >بهای تمام شده هر سهم (ریال)</th></tr>'
								} else {
									if (report8Type == 6) {
										html[report8Type - 3] += '<tr style="background-color : #eeeeee;" ><th>نام شرکت</th><th>تعداد سهام</th><th>بهای تمام شده هر سهم (ریال)</th><th>کل مبلغ بهای تمام شده پذیرفته شده در بورس</th><th>کل مبلغ بهای تمام شده خارج از بورس</th></tr>'
									} else {
										if (report8Type == 7) {
											html[report8Type - 3] += '<tr style="background-color : #eeeeee;" ><th>نام شرکت</th><th>تعداد سهام</th><th>بهای تمام شده هر سهم (ریال)</th><th>کل مبلغ بهای تمام شده</th><th>قیمت واگذاری هر سهم (ریال)</th><th>کل مبلغ واگذاری</th><th>سود(زیان) واگذاری</th></tr>'
										}
									}
								}
							}
							var cellStart = "<td>";
							var cellEnd = "</td>";
							for (lpos = 0; lpos < TR.length; lpos++) {
								if (TR[lpos] != null) {
									html[report8Type - 3] += "<tr>";
									try {
										var TD = TR[lpos].td;
										for (mpos = 0; mpos < TD.length; mpos++) {
											html[report8Type - 3] += cellStart;
											var cellExtractedData = "";
											if (typeof TD[mpos] == "string") {
												cellExtractedData = TD[mpos]
											} else {
												if ((TD[mpos] != null) && !(typeof TD[mpos]._text == "undefined")) {
													cellExtractedData = TD[mpos]._text
												}
											}
											if (((report8Type == 4) && (mpos == 6 || mpos == 7 || mpos == 8 || mpos == 14)) || ((report8Type == 5) && (mpos == 5 || mpos == 6)) || ((report8Type == 7) && (mpos == 6))) {
												if (cellExtractedData.indexOf("(") !== -1) {
													html[report8Type - 3] += '<div style="color:red;" >';
													cellExtractedData = cellExtractedData.replace("(", "").replace(")", "");
													cellExtractedData = "-" + cellExtractedData
												} else {
													html[report8Type - 3] += '<div style="color:green;" >'
												}
												if (report8Type != 4) {
													html[report8Type - 3] += cellExtractedData + "</div>"
												} else {
													cellExtractedData = cellExtractedData.replace(/,/g, "");
													if (cellExtractedData.indexOf("-") !== -1) {
														cellExtractedData = cellExtractedData.replace("-", "");
														html[report8Type - 3] += '<div style="white-space:nowrap;direction:ltr;" >-' + bigNumber(cellExtractedData) + "</div></div>"
													} else {
														html[report8Type - 3] += '<div style="white-space:nowrap;" >' + bigNumber(cellExtractedData) + "</div></div>"
													}
												}
											} else {
												if (report8Type != 4) {
													html[report8Type - 3] += cellExtractedData
												} else {
													if (mpos != 0 && mpos != null) {
														cellExtractedData = cellExtractedData.replace(/,/g, "");
														cellExtractedData = cellExtractedData.replace("(", "").replace(")", "");
														html[report8Type - 3] += '<div style="white-space:nowrap;" >' + bigNumber(cellExtractedData) + "</div>"
													} else {
														html[report8Type - 3] += cellExtractedData
													}
												}
											}
											html[report8Type - 3] += cellEnd
										}
									} catch (err) {}
									html[report8Type - 3] += "</tr>"
								}
							}
							html[report8Type - 3] += "</table>";
							html[report8Type - 3] += "</div></div></div>"
						}
					}
				} catch (err) {}
			}
			$("#Portfo3Content").html(html[0]);
			$("#Portfo4Content").html(html[1]);
			$("#Portfo5Content").html(html[2]);
			$("#Portfo6Content").html(html[3]);
			$("#Portfo7Content").html(html[4])
		},
		RenderCodalReport12: function(data) {
			var html = "";
			var ds = eval(data);
			var ipos = 0;
			var jpos = 0;
			var htmlTotal = "";
			for (ipos = 0; ipos < ds.length; ipos++) {
				try {
					html += '<div class="box1 red tbl z4_4"><div class="header">' + ds[ipos][0] + '</div><div class="content">';
					if (typeof ds[ipos][4].Root.AssemblyDate != "undefined") {
						html += 'تاریخ مجمع: <div style="display:inline-block" class="ltr">' + ds[ipos][4].Root.AssemblyDate + "</div><br/>"
					}
					if (typeof ds[ipos][4].Root.BoardMembersSessionDate != "undefined") {
						html += 'جلسۀ هیئت مدیرۀ: <div style="display:inline-block" class="ltr">' + ds[ipos][4].Root.BoardMembersSessionDate + "</div><br/>"
					}
					if ((typeof ds[ipos][4].Root.BoardMembers != "undefined") && (ds[ipos][4].Root.BoardMembers != null)) {
						var row = ds[ipos][4].Root.BoardMembers.BoardMember;
						html += '<table class="table1">اسامی اعضای هیئت مدیره:<br/><tr><th>نام عضو</th><th>شمارۀ ثبت /کد ملی</th><th>نام نماینده قبلی</th><th>نام نماینده</th><th>کد ملی</th><th>سمت</th><th>موظف/غیر موظف</th><th>مدرک تحصیلی</th></tr>';
						for (jpos = 0; jpos < row.length; jpos++) {
							html += "<tr><td>" + row[jpos].MemberName + "</td><td>" + row[jpos].NationalCode_RegisterNumber + "</td><td>" + (row[jpos].PreviuosAgent == null ? "" : row[jpos].PreviuosAgent) + "</td><td>" + row[jpos].Agent + "</td><td>" + row[jpos].AgentNationalCode + "</td><td>" + row[jpos].Designation + "</td><td>" + row[jpos].Charged + "</td><td>" + (row[jpos].EducationDegree == null ? "" : row[jpos].EducationDegree) + "</td></tr>"
						}
						html += "</table>"
					}
					if (typeof ds[ipos][4].Root.DirectorManager != "undefined") {
						html += '<table class="table1">مدیرعامل:<br/><tr><th>نام مدیر عامل	</th><th>کد ملی</th><th>مدرک تحصیلی</th></tr>';
						var row = ds[ipos][4].Root.DirectorManager;
						html += "<tr><td>" + row.DirectorManagerName + "</td><td>" + row.DirectorManagerNationalCode + "</td><td>" + (row.DirectorManagerEducationDegree == null ? "" : row.DirectorManagerEducationDegree) + "</td></tr>";
						html += "</table>"
					}
					html += "</div></div>"
				} catch (ex) {
					html = ""
				}
				htmlTotal += html;
				html = ""
			}
			$("#BoardMembersContent").html(htmlTotal)
		},
		RenderCodalReport13: function(data) {
			var html = "";
			var ds = eval(data);
			var ipos = 0;
			var jpos = 0;
			for (ipos = 0; ipos < ds.length; ipos++) {
				html += '<div class="box1 red tbl z4_4"><div class="header">' + ds[ipos][0] + '</div><div class="content"><div style="display:inline-block;width:50px;vertical-align:top">';
				var dDate = ds[ipos][4].Root.PlaceAndDateTime.Date.split("/");
				html += "<div class='CalMonth'>" + MonthName[parseInt(dDate[1], 10) - 1] + "</div><div class='CalDay'>" + dDate[2] + "</div>";
				html += '</div><div style="display:inline-block">زمان برگزاری: <div style="display:inline-block" class="ltr">' + ds[ipos][4].Root.PlaceAndDateTime.Date + "</div> ساعت " + ds[ipos][4].Root.PlaceAndDateTime.Time + "<br/>محل برگزاری: " + ds[ipos][4].Root.PlaceAndDateTime.Place + "<br/><br/>دستور جلسه <ul>";
				var Agenda = ds[ipos][4].Root.Agenda.AgendaItem;
				if (typeof Agenda == "string") {
					html += "<li>" + Agenda + "</li>"
				} else {
					for (jpos = 0; jpos < Agenda.length; jpos++) {
						html += "<li>" + Agenda[jpos] + "</li>"
					}
				}
				html += "</ul></div></div></div>"
			}
			$("#MeetingContent").html(html)
		},
		RenderCodalReport14: function(data) {
			var html = "برای مشاهده اطلاعات دقیق به کدال مراجعه کنید";
			var ds = eval(data);
			var ipos = 0;
			var jpos = 0;
			var lpos = 0;
			var mpos = 0;
			$("#AssemblyContent").html(html);
			for (ipos = 0; ipos < ds.length; ipos++) {
				html = "";
				html += '<div class="box1 red tbl z4_4"><div class="header">' + ds[ipos][0] + '</div><div class="content">';
				html += '<div id="AssemblyTabContainer' + ipos + '" ></div>';
				html += '<div id="AssemblyTabMain' + ipos + '" class="rainbow_assembly' + ipos + '_elm box1 white zFull">';
				html += '<br /><div style="display:inline-block;width:50px;vertical-align:top">';
				var dDate = ds[ipos][4].Root.PlaceAndDateTime.Date.split("/");
				html += "<div class='CalMonth'>" + MonthName[parseInt(dDate[1], 10) - 1] + "</div><div class='CalDay'>" + dDate[2] + "</div>";
				html += '</div><div style="display:inline-block">زمان برگزاری: <div style="display:inline-block" class="ltr">' + ds[ipos][4].Root.PlaceAndDateTime.Date + "</div> ساعت " + ds[ipos][4].Root.PlaceAndDateTime.Time + "<br/>محل برگزاری: " + ds[ipos][4].Root.PlaceAndDateTime.Place + "<br/><br/>";
				html += "<br /><br /></div></div>";
				var cellStart = "<td>";
				var cellEnd = "</td>";
				html += '<div id="AssemblyTabMembers' + ipos + '" style="display: none" class="rainbow_assembly' + ipos + '_elm box1 white zFull">';
				if (ds[ipos][4].Root.AssemblyShareHolder != null) {
					html += "حاضرین در جلسه مجمع عمومی : <br/><table>";
					var TrAssemblyShareHolder = ds[ipos][4].Root.AssemblyShareHolder.tr;
					html += '<tr><th style="background-color:#eeeeee;" >سهامدار</th><th style="background-color:#eeeeee;" >تعداد سهام</th><th style="background-color:#eeeeee;" >درصد</th></tr>';
					for (lpos = 0; lpos < TrAssemblyShareHolder.length; lpos++) {
						html += "<tr>";
						var TD = TrAssemblyShareHolder[lpos].td;
						for (mpos = 0; mpos < TD.length && mpos < 3; mpos++) {
							if (typeof TD[mpos] == "string") {
								html += cellStart + TD[mpos] + cellEnd
							} else {
								html += cellStart;
								if ((TD[mpos] != null) && !(typeof TD[mpos]._text == "undefined")) {
									html += TD[mpos]._text
								}
								html += cellEnd
							}
						}
						html += "</tr>"
					}
					html += "</table><br/><br/>"
				}
				if (ds[ipos][4].Root.Presidium != null) {
					html += "هیئت رئیسه : <br/><table>";
					var TrPresidium = ds[ipos][4].Root.Presidium.PresidiumMember;
					html += '<tr><th style="background-color:#eeeeee;" >اسامی</th></tr>';
					for (lpos = 0; lpos < TrPresidium.length; lpos++) {
						html += "<tr>";
						if (typeof TrPresidium[lpos] == "string") {
							html += cellStart + TrPresidium[lpos] + cellEnd
						} else {
							html += cellStart;
							if ((TrPresidium[lpos] != null) && !(typeof TrPresidium[lpos]._text == "undefined")) {
								html += TrPresidium[lpos]._text
							}
							html += cellEnd
						}
						html += "</tr>"
					}
					html += "</table><br/><br/>"
				}
				html += "</div>";
				html += '<div id="AssemblyTabIncomeStatement' + ipos + '" style="display: none" class="rainbow_assembly' + ipos + '_elm box1 white zFull">';
				if (ds[ipos][4].Root.IncomeStatement != null) {
					html += "صورت سود ( زیان ) با توجه به مصوبات مجمع برای سال مالی " + ds[ipos][4].Root.IncomeStatement.YearEndToDate + " به شرح ذیل می باشد : <br/><table>";
					var TrIncomeStatement = ds[ipos][4].Root.IncomeStatement.tr;
					html += '<tr><th style="background-color:#eeeeee;" >شرح</th><th style="background-color:#eeeeee;" >واقعی سال مالی منتهی به ' + ds[ipos][4].Root.IncomeStatement.YearEndToDate + '(میلیون ریال)</th><th style="background-color:#eeeeee;" >درصد نسبت به فروش</th><th style="background-color:#eeeeee;" >دلایل تغییرات عملکرد واقعی نسبت به صورتهای مالی حسابرسی شده</th></tr>';
					for (lpos = 1; lpos < TrIncomeStatement.length; lpos++) {
						html += "<tr>";
						var TD = TrIncomeStatement[lpos].td;
						for (mpos = 0; mpos < TD.length && mpos < 3; mpos++) {
							if (typeof TD[mpos] == "string") {
								html += cellStart + TD[mpos] + cellEnd
							} else {
								html += cellStart;
								if ((TD[mpos] != null) && !(typeof TD[mpos]._text == "undefined")) {
									html += TD[mpos]._text
								}
								html += cellEnd
							}
						}
						html += "</tr>"
					}
					html += "</table><br/><br/>"
				}
				html += "</div>";
				html += '<div id="AssemblyTabDividedRetainedEarning' + ipos + '" style="display: none" class="rainbow_assembly' + ipos + '_elm box1 white zFull">';
				if (ds[ipos][4].Root.DividedRetainedEarning != null) {
					html += "میزان سود قابل تخصیص و نحوه تخصیص سود بر اساس مصوبات مجمع به شرح ذیل میباشد : <br/><table>";
					var TrDividedRetainedEarning = ds[ipos][4].Root.DividedRetainedEarning.tr;
					html += '<tr><th style="background-color:#eeeeee;" >شرح</th><th style="background-color:#eeeeee;" >مبلغ ( میلیون ریال )</th></tr>';
					for (lpos = 1; lpos < TrDividedRetainedEarning.length; lpos++) {
						html += "<tr>";
						var TD = TrDividedRetainedEarning[lpos].td;
						for (mpos = 0; mpos < TD.length; mpos++) {
							if (typeof TD[mpos] == "string") {
								html += cellStart + TD[mpos] + cellEnd
							} else {
								html += cellStart;
								if ((TD[mpos] != null) && !(typeof TD[mpos]._text == "undefined")) {
									html += TD[mpos]._text
								}
								html += cellEnd
							}
						}
						html += "</tr>"
					}
					html += "</table><br/><br/>"
				}
				html += "</div>";
				html += '<div id="AssemblyTabOther' + ipos + '" style="display: none" class="rainbow_assembly' + ipos + '_elm box1 white zFull">';
				html += "<br/>";
				if (ds[ipos][4].Root.Inspector != null) {
					html += "بازرس<br/><ul><li>" + ds[ipos][4].Root.Inspector.PureText + "</li></ul><br/>"
				}
				if (ds[ipos][4].Root.NewsPapers != null) {
					html += "روزنامه<br/><ul>";
					var TD = ds[ipos][4].Root.NewsPapers.NewsPaper;
					if (TD.toString().indexOf(",") == -1) {
						html += "<li>" + TD + "</li>"
					} else {
						for (mpos = 0; mpos < TD.length; mpos++) {
							if (typeof TD[mpos] == "string") {
								html += "<li>" + TD[mpos] + "</li>"
							} else {
								html += "<li>";
								if ((TD[mpos] != null) && !(typeof TD[mpos]._text == "undefined")) {
									html += TD[mpos]._text
								}
								html += "</li>"
							}
						}
					}
					html += "</ul><br/>"
				}
				if (ds[ipos][4].Root.BoardMemberWage != null) {
					html += "تعیین حق حضور اعضای غیر موظف هیئت مدیره :<br/><ul><li>" + ds[ipos][4].Root.BoardMemberWage + "</li></ul><br/>"
				}
				if (ds[ipos][4].Root.BoardMemberGift != null) {
					html += "تعیین پاداش هیئت مدیره :<br/><ul><li>" + ds[ipos][4].Root.BoardMemberGift + "</li></ul><br/>"
				}
				if (ds[ipos][4].Root.Other != null) {
					html += "سایر موارد :<br/><ul><li>" + ds[ipos][4].Root.Other + "</li></ul><br/>"
				}
				html += "</div>";
				html += "</div></div></div>";
				$("#AssemblyContent").html($("#AssemblyContent").html() + html);
				DrawRainbowTab({
					tabName: "assembly" + ipos,
					tabPlace: "#AssemblyTabContainer" + ipos,
					firstColor: 0,
					item: [{
						Title: "زمان و محل",
						RelatedElement: "#AssemblyTabMain" + ipos,
						OnShowFunction: ""
					}, {
						Title: "حاضرین",
						RelatedElement: "#AssemblyTabMembers" + ipos,
						OnShowFunction: ""
					}, {
						Title: "صورت سود و زیان",
						RelatedElement: "#AssemblyTabIncomeStatement" + ipos,
						OnShowFunction: ""
					}, {
						Title: "سود قابل تخصیص",
						RelatedElement: "#AssemblyTabDividedRetainedEarning" + ipos,
						OnShowFunction: ""
					}, {
						Title: "سایر موارد",
						RelatedElement: "#AssemblyTabOther" + ipos,
						OnShowFunction: ""
					}]
				})
			}
		},
		RenderDPS: function(data) {
			var html = "برای مشاهده اطلاعات دقیق به کدال مراجعه کنید";
			$("#DPSContent").html(html);
			if (data.length == 0) {
				return
			}
			var rows = data.split(";");
			var cols;
			html += '<table class="table1"><tr><th style="background-color:#eeeeee;">انتشار</th><th style="background-color:#eeeeee;">تاریخ مجمع</th><th style="background-color:#eeeeee;">سال مالی</th><th style="background-color:#eeeeee;">سود یا زیان پس از کسر مالیات</th><th style="background-color:#eeeeee;">سود قابل تخصیص</th><th style="background-color:#eeeeee;">سود انباشته پایان دوره</th><th style="background-color:#eeeeee;">سود نقدی هر سهم</th><tr>';
			for (i = 0; i < rows.length; i++) {
				cols = rows[i].split("@");
				html += '<tr style="direction:ltr;text-align:left"><td style="direction:rtl;text-align:right">' + cols[0] + '</td><td style="direction:rtl;text-align:right">' + cols[1] + '</td><td style="direction:rtl;text-align:right">' + cols[2] + "</td><td>" + cols[3] + "</td><td>" + cols[4] + "</td><td>" + cols[5] + "</td><td>" + cols[6] + "</td></tr>"
			}
			$("#DPSContent").html(html)
		},
		DrawTopBox: function() {
			if (getData("InstInfoBox1") == null) {
				setData("InstInfoBox1", "0")
			}
			var HaghighyHoghoghi = '<div class="box2 zi2"><div class="box6"><table><tr><td>حجم</td><td>خرید</td><td>فروش</td><tr><td>حقیقی</td><td class="ltr" id="e0"/><td class="ltr" id="e3"/><tr><td>حقوقی</td><td class="ltr" id="e1"/><td class="ltr" id="e4"/><tr><td>تعداد</td><td>خرید</td><td>فروش</td><tr><td>مجموع</td><td class="ltr" id="e10"/><td class="ltr" id="e11"/><tr><td>حقیقی</td><td class="ltr" id="e5"/><td class="ltr" id="e8"/><tr><td>حقوقی</td><td class="ltr" id="e6"/><td class="ltr" id="e9"/></table></div><div class="box6" style="text-align:center;height:71px"><span>ابزار تغییر مکان یا نمایش اطلاعات</span><br/><div id="theme"></div></div></div>';
			var boxes = [
				["<div class='box6 h80'><table><tr><td>خرید</td><td>معامله</td><td>فروش</td></tr><tr><td id='dbp'></td><td id='d02'></td><td id='dsp'></td></tr><tr><td>اولین</td><td>پایانی</td><td>دیروز</td></tr><tr><td id='d04'></td><td id='d03'></td><td id='d05'></td></tr></table><div onclick='setData(\"InstInfoBox1\", \"\" + (1-parseInt(getData(\"InstInfoBox1\"))));HideTooltip();ii.DrawTopBox()' class='setting' desc='تنظیمات,مشاهده بصورت سطری یا ستونی' onmouseover='ShowTooltip(this)' onmouseout='HideTooltip()'></div></div>", "<div class='box6 h80'><table><tr><td>آخرین معامله</td><td id='d02'></tr><tr><td>قیمت پایانی</td><td id='d03'></tr><tr><td>اولین قیمت</td><td id='d04'></tr><tr><td>قیمت دیروز</td><td id='d05'></tr></table><div onclick='setData(\"InstInfoBox1\", \"\" + (1-parseInt(getData(\"InstInfoBox1\"))));HideTooltip();ii.DrawTopBox()' class='setting' desc='تنظیمات,مشاهده بصورت سطری یا ستونی' onmouseover='ShowTooltip(this)' onmouseout='HideTooltip()'></div></div>"]
			];
			if (InstrumentID[2] != "T") {
				var supervisionWarning = "<div id='divSupervision' style='color:#800040;font-size:12px;vertical-align:middle;' ></div>";
				var warning = "";
				if (false) {
					var modalContent = "";
					supervisionWarning = "<div id='divSupervision' style='color:#800040;font-size:14px;margin-bottom:2px;' ></div>"
				}
				if (CgrValCot[0] == "P" || CgrValCot[0] == "C" || CgrValCot[0] == "L" || CgrValCot[0] == "1" || (InstrumentID.substring(0, 4) == "IRB3")) {
					warning = "<div style='color:blue;font-weight: bold;font-size:14px;' >" + FaraDesc + "</div>"
				}
				if (InstrumentID.substring(0, 5) == "IRK1K") {
					warning = "<div style='color:red'>در سامانه معاملات هر سکه معادل 100 واحد معاملاتی محسوب می شود. بنابراین قیمت مشاهده شده یک صدم قیمت سکه بهار آزادی می باشد. </div>"
				} else {
					if (InstrumentID.substring(0, 4) == "IRB4") {
						warning = "<a target='_blank' href='http://www.ifb.ir/MFI/qualifiedMFI.aspx'><div style='color:blue;font-weight: bold;font-size:14px;' > اوراق دارای شرایط متفاوت، اطلاعات کامل تر در سایت فرابورس ایران</div></a>"
					}
				}
				$("#TopBox").html(supervisionWarning + " " + warning + '<div class="box2 zi1">' + boxes[0][parseInt(getData("InstInfoBox1"))] + '<div class="box6 h80"><table><tr><td>بازه روز</td><td id="d06"></td><td id="d07"></td></tr><tr><td>قیمت مجاز</td><td id="PRange1">' + addCommas(PSGelStaMax) + '</td><td id="PRange2">' + addCommas(PSGelStaMin) + "</td></tr><tr><td>بازه هفته</td><td>" + addCommas(MaxWeek) + "</td><td>" + addCommas(MinWeek) + "</td></tr><tr><td>بازه سال</td><td>" + addCommas(MaxYear) + "</td><td>" + addCommas(MinYear) + '</td></tr></table></div><div class="box6 h80"><table><tr><td>تعداد معاملات</td><td id="d08"></td></tr><tr><td>حجم معاملات</td><td id="d09"></td></tr>' + ((ContractSize == "0") ? "<tr><td> ارزش معاملات " + ((InstrumentID.substr(0, 4) == "IROP") ? "(دلار)" : "") + '</td><td id="d10"></td></tr><tr><td>' + ((InstrumentID.substr(0, 4) == "IROP") ? "ارزش معاملات(ریال)" : "ارزش بازار") + '</td><td id="d11"></td></tr>' : '<tr><td>ارزش معاملات</td><td id="d10"></td></tr><tr><td>ارزش مفهومی معاملات</td><td id="d11"></td></tr>') + "</table></div><div " + (((InstrumentID.substr(0, 4) == "IRO2") || (InstrumentID.substr(0, 4) == "IROP")) ? 'style="display:none;"' : "") + ' class="box6 h80"><table><tr><td>تعداد سهام</td><td>' + bigNumber(ZTitad) + "</td></tr><tr><td>حجم مبنا</td><td>" + bigNumber(BaseVol) + "</td></tr><tr><td>سهام شناور</td><td>" + KAjCapValCpsIdx + "%</td></tr><tr><td>میانگین حجم ماه</td><td>" + bigNumber(QTotTran5JAvg) + '</td></tr></table></div><div  class="box6 h40"><table><tr title="قیمت پایانی ناشی از اقدامات شرکتی و معامله"><td>آخرین اطلاعات قیمت</td><td id="d00"></td></tr><tr><td>وضعیت</td><td id="d01"></td></tr></table></div><div ' + (((InstrumentID.substr(0, 4) == "IRO2") || (InstrumentID.substr(0, 4) == "IROP")) ? 'style="display:none;"' : "") + ' class="box6 h40"><table>' + ((InstrumentID.substr(0, 6) == "IRO1OS") ? (((EstimatedEPS == "NotAvailable") ? ("<tr><td>NAV:</td><td>" + NAV + '</td><td>EPS</td><td>-</td><td width="50%" colspan="6" class="codal" style="color:red;font-size:8px;">به علت تغییر سال مالی فعلا امکان محاسبه سود هر سهم میسر نمی باشد.(اطلاعات بیشتر در کدال)</td></tr>') : ("<tr><td>NAV:</td><td>" + NAV + "</td><td>EPS:</td><td>" + EstimatedEPS + '</td><td>P/E:</td><td id="d12"></td><td>P/Eگروه:</td><td>' + SectorPE + '</td><td>P/S:</td><td id="d25"></td></tr>')) + '<tr><td width="50%" colspan="10" class="codal" style="color:red;font-size:8px;">EPS بر مبنای سود و زیان 12 ماهه اخیر (TTM) و نسبت P/S برای شرکتهای تولیدی و بر مبنای فروش 12 ماه اخیر (TTM) محاسبه شده است. برای اطلاعات بیشتر به کدال مراجعه کنید.</td></tr></table></div>') : (((EstimatedEPS == "NotAvailable") ? ('<tr><td>EPS</td><td>-</td><td width="50%" colspan="6" class="codal" style="color:red;font-size:8px;">به علت تغییر سال مالی فعلا امکان محاسبه سود هر سهم میسر نمی باشد.(اطلاعات بیشتر در کدال)</td></tr>') : ("<tr><td>EPS:</td><td>" + EstimatedEPS + '</td><td>P/E:</td><td id="d12"></td><td>P/Eگروه:</td><td>' + SectorPE + '</td><td>P/S:</td><td id="d25"></td></tr>')) + '<tr><td width="50%" colspan="8" class="codal" style="color:red;font-size:8px;">EPS بر مبنای سود و زیان 12 ماهه اخیر (TTM) و نسبت P/S برای شرکتهای تولیدی و بر مبنای فروش 12 ماه اخیر (TTM) محاسبه شده است. برای اطلاعات بیشتر به کدال مراجعه کنید.</td></tr></table></div>')) + "</div>" + HaghighyHoghoghi + '<div id="ExtraChart"></div>')
			} else {
				$("#TopBox").html('<div class="box2 zi1">' + boxes[0][0] + '<div class="box6 h80"><table><tr><td>بازه روز</td><td id="d06"></td><td id="d07"></td></tr><tr><td>قیمت مجاز</td><td>' + addCommas(PSGelStaMax) + "</td><td>" + addCommas(PSGelStaMin) + "</td></tr><tr><td>بازه هفته</td><td>" + addCommas(MaxWeek) + "</td><td>" + addCommas(MinWeek) + "</td></tr><tr><td>بازه سال</td><td>" + addCommas(MaxYear) + "</td><td>" + addCommas(MinYear) + '</td></tr></table></div><div class="box6 h80"><table><tr><td>تعداد معاملات</td><td id="d08"></td></tr><tr><td>حجم معاملات</td><td id="d09"></td></tr>' + (ContractSize == "0" ? '<tr><td>ارزش معاملات</td><td id="d10"></td></tr><tr><td>ارزش بازار</td><td id="d11_"></td></tr>' : '<tr><td>ارزش معاملات</td><td id="d10"></td></tr><tr><td>ارزش مفهومی معاملات</td><td id="d11_"></td></tr>') + '</table></div><div class="box6"><table><tr><td>تعداد واحد</td><td><!--' + bigNumber(ZTitad) + "--></td></tr><tr><td>حجم مبنا</td><td>" + bigNumber(BaseVol) + "</td></tr><tr><td></td><td></td></tr><tr><td>میانگین حجم ماه</td><td>" + bigNumber(QTotTran5JAvg) + '</td></tr></table></div><div class="box6"><table><tr><td>آخرین اطلاعات قیمت</td><td id="d00"></td></tr><tr><td>وضعیت</td><td id="d01"></td></tr></table></div><div class="box6"><table><tr><td>NAV ابطال</td><td id="PRedTran"></td></tr><tr><td>زمان اعلام</td><td id="NAVDate"></td></tr></table></div></div>' + HaghighyHoghoghi + '<div id="ExtraChart"></div>')
			}
			ii.DrawThemeBuilder()
		},
		DisplayBestLimitChart: function() {
			document.getElementById("BBChart").style.display = "none";
			return;
			if (getData("InstInfoBLChart") == null) {
				setData("InstInfoBLChart", "1")
			}
			if (getData("InstInfoBLChart") == "1") {
				document.getElementById("BBChart").style.display = ""
			} else {
				document.getElementById("BBChart").style.display = "none"
			}
		},
		StartInstInfo: function() {
			if (TopInst == 1) {
				ii.UpdateUrl = "tsev2/data/instinfofast.aspx"
			} else {
				ii.UpdateUrl = "tsev2/data/instinfodata.aspx";
				ii.UpdateSpeed.normal = ii.UpdateSpeed.normal * 2;
				ii.UpdateSpeed.fast = ii.UpdateSpeed.fast * 2
			}
			ii.DrawTabs();
			ShowFastView();
			var baseMaerketCgrValCot = ["P", "C", "L"];
			$("#MainBox").prepend('<div class="header bigheader" style ="background-color:' + ((CgrValCot.substring(0, 1) == "P") ? "#fbf6a4" : ((CgrValCot.substring(0, 1) == "C") ? "#faac58" : ((CgrValCot.substring(0, 1) == "L") ? "#cc0000" : "#ccc"))) + ';">' + Title + ' <div id="CStatus"></div><div ID="ToolsBtn"></div><span style="color:#555555;margin-left:3px;font-size:12px;margin-top:7px;float:left" desc="ساعت,زمان نشان داده شده در این بخش زمان سامانه معاملات می باشد (با دقت ±1 ثانیه) " onmouseover="ShowTooltip(this)" onmouseout="HideTooltip()" class="RealServerTime"></span></div>');
			var ChartHTML = '<div class="box1 blue tbl z2_4 h250" style="display:none" id="Section_bestlimit"><div class="content"><table class="table1"><tbody id="bl"><tr><th class="blutd">تعداد</th><th class="blutd">حجم</th><th class="blutd">خرید</th><th class="redtd">فروش</th><th class="redtd">حجم</th><th class="redtd">تعداد</th></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td colspan="6" style="height:130px"><div style="height:105px" id="BBChart"></div></td></tr></tbody></table></div></div> <div class="box1 white tbl z2_4 h250"  style="display:none" id="Section_chart"><div class="header"><span id="SmallChartTitle"></span>&nbsp;<span style="float:left"></span></div><div class="content" id="SmallChart"></div></div><div class="box1 olive tbl z2_4 h250" style="display:none" id="Section_codal"><div class="header pointer" onclick="ii.ShowTab(18)">اطلاعیه- مشاهده اطلاعات  دقیق در کدال</div><div class="content" id="CodalDiv"></div></div>';
			$("#ThemePlace").append(ChartHTML);
			var TradeHistoryHTML = "";
			if (DEven != "0") {
				TradeHistoryHTML = "<tr><td colspan='8'><a class='inst' href='http://cdn.tsetmc.com/Loader.aspx?ParTree=151321&i=" + InsCode + "' target='{i}'>" + toPersianDate(new Date(DEven.substring(0, 4) + "/" + DEven.substring(4, 6) + "/" + DEven.substring(6, 8))) + " - برای مشاهده سابقه معاملات روز جاری کلیک کنید</a></td></tr>"
			}
			for (ipos = 0; ipos < TradeHistory.length; ipos++) {
				TradeHistoryHTML += "<tr><td><a class='inst' href='http://cdn.tsetmc.com/Loader.aspx?ParTree=15131P&i=" + InsCode + "&d=" + TradeHistory[ipos][0] + "' target='{i}'>" + toPersianDate(new Date(TradeHistory[ipos][0].substring(0, 4) + "/" + TradeHistory[ipos][0].substring(4, 6) + "/" + TradeHistory[ipos][0].substring(6, 8))) + "</a></td><td>" + addCommas(TradeHistory[ipos][1]) + "</td><td>" + AdvRoundColor(100 * (TradeHistory[ipos][1] - TradeHistory[ipos][2]) / TradeHistory[ipos][2], 2) + "</td><td>" + addCommas(TradeHistory[ipos][3]) + "</td><td>" + addCommas(TradeHistory[ipos][4]) + "</td><td>" + addCommas(TradeHistory[ipos][5]) + "</td><td>" + bigNumber(TradeHistory[ipos][6]) + "</td><td>" + bigNumber(TradeHistory[ipos][7]) + "</td></tr>"
			}
			$("#Section_history").append('<div class="header pointer" onclick="ii.ShowTab(17)">سابقه معاملات</div><div class="content"><table class="table1"><thead><tr><th>تاریخ</th><th colspan="2">پایانی</th><th>کمترین</th><th>بیشترین</th><th>تعداد</th><th>حجم</th><th>ارزش</th></tr></thead><tbody id="bodyTradeHistory">' + TradeHistoryHTML + "</tbody></table></div>");
			var RCompaniesHTML = "";
			for (ipos = 0; ipos < RelatedCompanies.length; ipos++) {
				RCompaniesHTML += "<tr id='" + RelatedCompanies[ipos][0] + "' data-LVal='" + RelatedCompanies[ipos][1] + "," + RelatedCompanies[ipos][2] + "'><td>" + RelatedCompanies[ipos][1] + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"
			}
			var RefPortfoHTML = "";
			if (InstrumentID.substr(0, 4) == "IRO2" && RefPortfo != null && RefPortfo != "") {
				for (ipos = 0; ipos < RefPortfo.length; ipos++) {
					RefPortfoHTML += "<tr id='" + RefPortfo[ipos][0] + "' data-LVal='" + RefPortfo[ipos][1] + "," + RefPortfo[ipos][2] + "'><td>" + RefPortfo[ipos][1] + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"
				}
			}
			if ((InstrumentID.substr(0, 4) != "IRO2")) {
				$("#Section_relco").append('<div class="header">گروه:' + LSecVal + '&nbsp;<a style="float:left;color:blue;font-size:10px" href="Loader.aspx?ParTree=15131X&g=' + CSecVal + '">مقایسه شرکت های گروه</a></div><div class="content"><div class="RelCompany"><table class="table1"><thead><tr><th>نماد</th><th colspan="2">آخرین</th><th colspan="2">پایانی</th><th>تعداد</th><th>حجم</th><th>ارزش</th><th>30 روز</th></tr></thead><tbody id="rctbl">' + RCompaniesHTML + "</tbody></table></div></div>")
			} else {
				$("#Section_relco").append('<div class="header">سبد مرجع</div><div class="content"><div class="RefPortfo"><table class="table1"><thead><tr><th>نماد</th><th colspan="2">آخرین</th><th colspan="2">پایانی</th><th>تعداد</th><th>حجم</th><th>ارزش</th><th>30 روز</th><th>تعداد سهم</th></tr></thead><tbody id="rctbl">' + RefPortfoHTML + "</tbody></table></div></div>")
			}
			$("#Section_tcsconfirmedorders").append('<div class="header">معاملات در انتظار تایید</div><div class="content"><div class="TCSConfirmedOrders"><table class="table1"><thead><tr><th>تعداد</th><th>حجم</th><th>قیمت</th></tr></thead><tbody id="tcstbl"></tbody></table></div></div>');
			ii.DisplayBestLimitChart();
			ii.DrawTopBox();
			ii.RenderCodal();
			$("#ToolsBtn").html("<div id='InsInteractiveChart' title='نمودار تعاملی' class='InsBtn' role='link' aria-label='نمودار تعاملی'></div><div id='InsMenu' title='اطلاعات تکمیلی [U]' class='InsBtn' role='link' aria-label='اطلاعات تکمیلی - کلید میانبر:U'></div><div id='InsChart' title='سابقه قیمت حجم [C]' class='InsBtn' role='link' aria-label='نمودار قیمت حجم - کلید میانبر:C'></div><div id='InsExport' title='تهیه خروجی [E]' class='InsBtn' role='link' aria-label='تهیه خروجی اکسل - کلید میانبر:E' ></div><div id='InsSms' title='پیام کوتاه [S]' class='InsBtn' ></div><div id='InsAdd' title='مدیریت سبد [P]' class='InsBtn' ></div>");
			$("#InsInteractiveChart").click(function() {
				window.open("http://dev.tsetmc.com/Loader.aspx?ParTree=151323&i=" + InsCode, "_blank")
			});
			$("#InsMenu").click(function() {
				ii.ShowHideTools()
			});
			$("#InsSms").click(function() {
				ShowModalFrame("https://members.tsetmc.com/tsev2/page/TseAlert.aspx?i=" + InsCode, 400, 300)
			});
			$("#InsAdd").click(function() {
				ManageBaskets(InsCode)
			});
			$("#InsChart").click(function() {
				ii.ShowHideCharts()
			});
			$("#InsExport").click(function() {
				window.open("tsev2/data/Export-txt.aspx?t=i&a=1&b=0&i=" + InsCode)
			});
			$(document).keypress(function(event) {
				if (document.activeElement != null && document.activeElement.tagName == "INPUT") {
					return
				}
				var k = event.which;
				if (k == 85 || k == 117) {
					ii.ShowHideTools()
				} else {
					if (k == 69 || k == 101) {
						window.open("tsev2/data/Export-txt.aspx?t=i&a=1&b=0&i=" + InsCode)
					} else {
						if (k == 83 || k == 115) {
							ShowModalFrame("https://members.tsetmc.com//tsev2/page/TseAlert.aspx?i=" + InsCode, 400, 300)
						} else {
							if (k == 80 || k == 112) {
								ManageBaskets(InsCode)
							}
						}
					}
				}
			});
			ii.UpdateData();
			setData("ActiveTab", InsCode);
			$(window).focus(function() {
				setData("ActiveTab", InsCode)
			});
			ii.SmallChartType = getData("SmallChartType");
			if (ii.SmallChartType == null) {
				ii.SmallChartType = 2
			}
			ii.ChangeChart(ii.SmallChartType);
			var rctbl = document.getElementById("rctbl");
			var lval;
			var rcid;
			for (var qpos = 0; qpos < rctbl.children.length; qpos++) {
				lval = rctbl.children[qpos].getAttribute("data-lval").split(",");
				rcid = rctbl.children[qpos].id;
				rctbl.children[qpos].children[0].innerHTML = "<a target='_blank' href='Loader.aspx?ParTree=151311&i=" + rcid + "' title='" + lval[1] + "'>" + lval[0] + "</a>";
				rctbl.children[qpos].children[8].innerHTML = "<img class='rc' src='tsev2/chart/img/Inst.aspx?i=" + rcid + "'/>"
			}
			var DefaultInstCharts = getData("DefaultInstCharts");
			if (DefaultInstCharts != null && DefaultInstCharts.length != 0) {
				var AllCharts = DefaultInstCharts.split(",");
				for (var qpos = 0; qpos < AllCharts.length; qpos++) {
					if (AllCharts[qpos][0] != "0" && AllCharts[qpos][0] != "1") {
						continue
					}
					ii.CustomChartInit(AllCharts[qpos].substring(1), parseInt(AllCharts[qpos][0], 10))
				}
			}
		},
		Theme: [
			["bestlimit", true],
			["chart", true],
			["relco", true],
			["codal", false],
			["history", false],
			["tcsconfirmedorders", true]
		],
		ThemeTitle: {
			bestlimit: "سفارش",
			chart: "نمودار",
			relco: "همگروه",
			codal: "اطلاعیه",
			history: "سابقه",
			tcsconfirmedorders: "تاییدشده"
		},
		ThemeOnOff: function(section) {
			for (var qpos = 0; qpos < ThemeCount; qpos++) {
				if (ii.Theme[qpos][0] == section) {
					ii.Theme[qpos][1] = !ii.Theme[qpos][1];
					setData("InstInfoTheme", JSON.stringify(ii.Theme));
					break
				}
			}
			ii.DrawThemeBuilder()
		},
		ThemeChangePosition: function() {
			var NewTheme = [];
			var section;
			var visibility;
			for (var qpos = 0; qpos < ThemeCount; qpos++) {
				section = document.getElementById("theme").children[qpos].getAttribute("data-sec");
				for (var ipos = 0; ipos < ThemeCount; ipos++) {
					if (ii.Theme[ipos][0] == section) {
						visibility = ii.Theme[ipos][1];
						break
					}
				}
				NewTheme.push([section, visibility])
			}
			ii.Theme = NewTheme;
			setData("InstInfoTheme", JSON.stringify(ii.Theme));
			for (var qpos = 0; qpos < ThemeCount; qpos++) {
				document.getElementById("ThemePlace").appendChild(document.getElementById("Section_" + ii.Theme[qpos][0]))
			}
			for (var qpos = 0; qpos < ThemeCount; qpos++) {
				document.getElementById("Section_" + ii.Theme[qpos][0]).style.display = ((ii.Theme[qpos][1] == true) ? "inline-block" : "none")
			}
		},
		DrawThemeBuilder: function() {
			if (getData("InstInfoTheme") == null || JSON.parse(getData("InstInfoTheme")).length != ii.Theme.length) {
				setData("InstInfoTheme", JSON.stringify(ii.Theme))
			}
			ii.Theme = JSON.parse(getData("InstInfoTheme"));
			var html = "";
			var OnOff = "";
			var style = "style='cursor:move;border-radius:3px;margin:1px;background-color:#eeeeee;height:40px;width:47px;float:right'";
			for (var qpos = 0; qpos < ThemeCount; qpos++) {
				OnOff = "<br/><span style='cursor:pointer;background-color:" + ((ii.Theme[qpos][1] == true) ? "#ddffdd" : "#ffdddd") + "' onclick='ii.ThemeOnOff(\"" + ii.Theme[qpos][0] + "\")' >" + ((ii.Theme[qpos][1] == true) ? "نمایش" : "مخفی") + "</span>";
				html += "<div " + style + " data-sec='" + ii.Theme[qpos][0] + "'>" + ii.ThemeTitle[ii.Theme[qpos][0]] + OnOff + "</div>";
				document.getElementById("ThemePlace").appendChild(document.getElementById("Section_" + ii.Theme[qpos][0]))
			}
			for (var qpos = 0; qpos < ThemeCount; qpos++) {
				document.getElementById("Section_" + ii.Theme[qpos][0]).style.display = ((ii.Theme[qpos][1] == true) ? "inline-block" : "none")
			}
			$("#theme").html(html);
			$("#theme").sortable().bind("sortupdate", function() {
				ii.ThemeChangePosition()
			})
		},
		SmallChartType: "3",
		ShowChartName: function(type) {
			switch (type) {
				case "1":
				case "2":
					$("#SmallChartTitle").html("قیمت،حجم،میانگین متحرک 20 روز");
					break;
				case "3":
					$("#SmallChartTitle").html("قیمت،حجم در طول روز");
					break;
				case "4":
					$("#SmallChartTitle").html("نمودار هفتگی");
					break
			}
		},
		ChangeChartWindow: function() {
			var WinNo = ShowModalStaticPro("نحوه نمایش نمودار", "", 300, 140);
			var CreateBasket = "<br/><a href='#' class='s250 awesome tra' onclick=\"ii.ChangeChart('2');$('#ModalWindowOuter" + ModalWindowNo + "').remove()\">قیمت،حجم،میانگین متحرک</a><br/><br/><a href='#' class='s250 awesome tra' onclick=\"ii.ChangeChart('3');$('#ModalWindowOuter" + ModalWindowNo + "').remove()\">قیمت،حجم در طول روز</a><br/><br/><a href='#' class='s250 awesome tra' onclick=\"ii.ChangeChart('4');$('#ModalWindowOuter" + ModalWindowNo + "').remove()\">نمودار هفتگی</a><br/><br/>";
			$("#ModalWindowInner" + WinNo).append(CreateBasket)
		},
		ChangeChart: function(type) {
			type = "3";
			setData("SmallChartType", type);
			ii.SmallChartType = type;
			ii.ShowChartName(type);
			switch (type) {
				case "2":
					ii.SmallChart2();
					break;
				case "3":
					ii.SmallChart3();
					break;
				case "4":
					ii.SmallChart4();
					break
			}
		},
		SmallChart4: function() {
			if (ii.SmallChartType != 4) {
				return
			}
			$.ajax({
				url: "tsev2/chart/data/WeekPrice.aspx",
				cache: true,
				data: {
					i: InsCode
				},
				dataType: "text",
				error: function() {
					window.setTimeout("ii.SmallChart4()", 300000)
				},
				success: function(data) {
					var intraDayData = [];
					var intraDayVol = [];
					var categoryData = [];
					var rows = data.split(";");
					if (rows.length <= 1) {
						$("#scp1").html(ii.NoDataMsg)
					} else {
						var cols;
						var RowDate;
						var iii;
						for (iii = 0; iii < rows.length - 1; iii++) {
							cols = rows[iii].split(",");
							categoryData.push("");
							intraDayData.push(parseInt(cols[1], 10));
							intraDayVol.push(parseInt(cols[2], 10))
						}
						$("#SmallChart").html("<div id='scp1' style='height:150px;text-align:left;direction:ltr'></div><div id='scp2' style='position:relative;top:-10px;height:60px;text-align:left;direction:ltr'></div>");
						var Sery = ii.Series.Line;
						Sery.data = intraDayData;
						$("#scp1").jqChart({
							legend: {
								visible: false
							},
							border: ii.Border,
							axes: [ii.Axes.LinearY, {
								type: "category",
								location: "bottom",
								labels: {
									lineWidth: 1,
									visible: false
								},
								minorTickMarks: {
									visible: false
								},
								majorTickMarks: {
									visible: false
								},
								majorGridLines: {
									interval: 43,
									lineWidth: 1,
									strokeStyle: "#aa9999"
								},
								categories: categoryData
							}],
							series: [Sery]
						});
						Sery = ii.Series.Volume;
						Sery.data = intraDayVol;
						$("#scp2").jqChart({
							legend: {
								visible: false
							},
							border: ii.Border,
							axes: [ii.Axes.LinearY, {
								type: "category",
								location: "bottom",
								labels: {
									lineWidth: 1,
									visible: false
								},
								minorTickMarks: {
									visible: false
								},
								majorTickMarks: {
									visible: false
								},
								majorGridLines: {
									interval: 43,
									lineWidth: 1,
									strokeStyle: "#aa9999"
								},
								categories: categoryData
							}],
							series: [Sery]
						})
					}
					window.setTimeout("ii.SmallChart4()", 120000)
				}
			})
		},
		SmallChart3: function() {
			if (ii.SmallChartType != 3) {
				return
			}
			$.ajax({
				url: "tsev2/chart/data/IntraDayPrice.aspx",
				cache: true,
				data: {
					i: InsCode
				},
				dataType: "text",
				error: function() {
					window.setTimeout("ii.SmallChart3()", 120000)
				},
				success: function(data) {
					var intraDayData = [];
					var intraDayVol = [];
					var rows = data.split(";");
					if (rows.length <= 1) {
						$("#scp1").html(ii.NoDataMsg)
					} else {
						var cols;
						for (i = 0; i < rows.length; i++) {
							cols = rows[i].split(",");
							heven = cols[0].split(":");
							intraDayData.push([new Date(2010, 1, 1, heven[0], heven[1]), parseInt(cols[1]), parseInt(cols[2]), parseInt(cols[3]), parseInt(cols[4])]);
							intraDayVol.push([new Date(2010, 1, 1, heven[0], heven[1]), parseInt(cols[5])])
						}
						$("#SmallChart").html("<div id='scp1' style='height:150px;text-align:left;direction:ltr'></div><div id='scp2' style='position:relative;top:-10px;height:60px;text-align:left;direction:ltr'></div>");
						var Sery = ii.Series.Candlestick;
						Sery.data = intraDayData;
						$("#scp1").jqChart({
							legend: {
								visible: false
							},
							border: ii.Border,
							axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
							series: [Sery]
						});
						$("#scp1").bind("tooltipFormat", function(e, data) {
							return "<table><tr><td colspan=2>" + data.x.getHours() + ":" + data.x.getMinutes() + "</td></tr><tr><td>Open</td><td>" + data.open + "</td></tr><tr><td>High</td><td>" + data.high + "</td></tr><tr><td>Low</td><td>" + data.low + "</td></tr><tr><td>Close</td><td>" + data.close + "</td></tr></table>"
						});
						Sery = ii.Series.Volume;
						Sery.data = intraDayVol;
						$("#scp2").jqChart({
							legend: {
								visible: false
							},
							border: ii.Border,
							axes: [ii.Axes.LinearY, ii.Axes.DateTimeIntra],
							series: [Sery]
						});
						$("#scp2").bind("tooltipFormat", function(e, data) {
							return data.x.getHours() + ":" + data.x.getMinutes() + "<br/>" + bigNumber(data.y)
						})
					}
					window.setTimeout("ii.SmallChart3()", 120000)
				}
			})
		},
		SmallChart2: function() {
			var type = "ma20";
			var adj = "0";
			if (typeof ii.ChartData[type + adj] == "undefined") {
				$.ajax({
					url: MembersSite() + "/tsev2/chart/data/Financial.aspx",
					async: false,
					cache: true,
					data: {
						i: InsCode,
						t: type,
						a: adj
					},
					dataType: "text",
					success: function(data) {
						var dt = [];
						var dr = [];
						var rows = data.split(";");
						var cols;
						for (i = 0; i < rows.length; i++) {
							cols = rows[i].split(",");
							dr = [];
							dr.push(new Date(cols[0].substring(0, 4), parseInt(cols[0].substring(4, 6), 10) - 1, cols[0].substring(6, 8)));
							for (j = 1; j < cols.length; j++) {
								dr.push(parseFloat(cols[j]))
							}
							dt.push(dr)
						}
						ii.ChartData[type + adj] = dt
					}
				})
			}
			if (ii.ChartData[type + adj].length <= 1) {
				$("#scp1").html(ii.NoDataMsg)
			} else {
				var start = 0;
				var end = ii.ChartData[type + adj].length - 1;
				if (end > 40) {
					start = end - 40
				}
				var dt = ii.ChartData[type + adj];
				var dataHLOCV = [];
				var dataVol = [];
				var dataMovAvg = [];
				for (i = start; i <= end; i++) {
					cols = dt[i];
					dataHLOCV.push([cols[0], cols[1], cols[2], cols[3], cols[4]]);
					dataVol.push([cols[0], cols[5]]);
					dataMovAvg.push([cols[0], cols[6]])
				}
				$("#SmallChart").html("<div id='scp1' style='height:150px;text-align:left;direction:ltr'></div><div id='scp2' style='position:relative;top:-10px;height:60px;text-align:left;direction:ltr'></div>");
				var Sery = ii.Series.Candlestick;
				Sery.data = dataHLOCV;
				$("#scp1").jqChart({
					legend: {
						visible: false
					},
					tooltips: {
						type: "shared"
					},
					border: ii.Border,
					axes: [ii.Axes.LinearY, ii.Axes.DateTimeHidden],
					series: [Sery, {
						type: "line",
						lineWidth: 1,
						data: dataMovAvg,
						strokeStyle: "blue",
						markers: {
							size: 0
						}
					}]
				});
				$("#scp1").bind("tooltipFormat", function(e, data) {
					return "<table><tr><td colspan=2>" + toPersianDate(data[0].x) + "</td></tr><tr><td>Open</td><td>" + data[0].open + "</td></tr><tr><td>High</td><td>" + data[0].high + "</td></tr><tr><td>Low</td><td>" + data[0].low + "</td></tr><tr><td>Close</td><td>" + data[0].close + "</td></tr><tr><td></td><td>" + data[1].y + "</td></tr></table>"
				});
				Sery = ii.Series.Volume;
				Sery.data = dataVol;
				$("#scp2").bind("axisLabelCreating", function(e, data) {
					if (data.context.axis.location == "bottom") {
						data.text = toPersianDate(new Date(data.text))
					} else {
						data.text = bigNumberTxt(data.text)
					}
				});
				$("#scp2").jqChart({
					legend: {
						visible: false
					},
					border: ii.Border,
					axes: [ii.Axes.LinearY, ii.Axes.DateTimeLong],
					series: [Sery]
				});
				$("#scp2").bind("tooltipFormat", function(e, data) {
					return toPersianDate(data.x) + "<br/>" + bigNumber(data.y)
				})
			}
		},
		ChartDataPrice: [],
		ChartDataSell: [],
		ChartDataBuy: [],
		ToolsHTML: '<div class="box3"><div class="header">اطلاعات تکمیلی</div><div class="content"><div style="display:inline-block;width:390px;vertical-align:top;direction:rtl;font-size:12px;margin:1px"><ul><li><a href="javascript:ii.ShowHistory()">تقویم معاملات</a><br/><li><a href="#" onclick="ShowModalWindow(\'Loader.aspx?Partree=15131G&i=' + InsCode + '\')">تعدیل قیمت</a><br/><li><a href="#" onclick="ShowModalWindow(\'Loader.aspx?Partree=15131H&i=' + InsCode + '\')">افزایش سرمایه</a><br/><li>معاملات <ul><li><a href="#" onclick="ii.ShowTradeOverview()">جدول حجم قیمت</a></li><li><a href="#" onclick="ii.ShowTradeDetail()">ریز معاملات</a></li><li><a href="#" onclick="ii.ShowIntraDayPriceDetail()">جدول قیمت،حجم در طول روز</a></li><li><a href="tsev2/excel/IntraDayPrice.aspx?i=' + InsCode + '&m=1" >جدول قیمت،حجم در طول روز (اکسل)</a></li><li><a href="tsev2/excel/IntraDayPrice.aspx?i=' + InsCode + '&m=30" >جدول قیمت،حجم در طول روز - بازه 30 دقیقه ای (اکسل)</a></li></ul></il></ul></div></div></div>',
		ChartHTML: "<div id='charttab'></div><table style='background-color:#fcc;font-size:13px' id='chartlist0' class='table1 rainbow_chartlist_elm'><tr><td><a href=\"javascript:ii.CustomChartInit('ph',0)\">حجم - قيمت</a> (<a href=\"javascript:ii.CustomChartInit('phl',0)\">خطی</a>)</td><td style='width:25%;'></td><td style='width:25%;'></td><td style='width:25%;'></td></tr></table><table style='width:100%;background-color:#cfc;font-size:13px' id='chartlist1' class='table1 rainbow_chartlist_elm'><tr><td colspan='4'>قیمت های تعدیل شده بصورت آزمایشی در این بخش نمایش داده می شود و برای اطمینان این اطلاعات را با قیمت های تعدیل شده منابع دیگر مقایسه کنید</td></tr><tr><tr><td><a href=\"javascript:ii.CustomChartInit('ph',1)\">حجم - قيمت</a> (<a href=\"javascript:ii.CustomChartInit('phl',1)\">خطی</a>)</td><td style='width:25%;'></td><td style='width:25%;'></td><td style='width:25%;'></td></tr></table><table style='width:100%;background-color:#feb;font-size:13px' id='chartlist2' class='table1 rainbow_chartlist_elm'></table>",
		ShowHideTools: function() {
			var WinNo = ShowModalStaticPro("", ii.ToolsHTML, 420, 200)
		},
		ShowHideCharts: function() {
			var WinNo = ShowModalStaticPro("", ii.ChartHTML, null, 200);
			DrawRainbowTab({
				tabName: "chartlist",
				tabPlace: "#charttab",
				firstColor: 0,
				RememberLastTab: "1",
				item: [{
					Title: "(تاریخچه)",
					RelatedElement: "#chartlist0",
					OnShowFunction: ""
				}, {
					Title: "(تاریخچه - تعدیل شده)",
					RelatedElement: "#chartlist1",
					OnShowFunction: ""
				}, {
					Title: "(در طول روز)",
					RelatedElement: "#chartlist2",
					OnShowFunction: ""
				}]
			})
		},
		UpdateChart: function(PdrCotVal, Buy, Sell) {
			if (typeof PdrCotVal == "undefined" && ii.ChartDataPrice.length == 0) {
				return
			}
			var i;
			if (typeof PdrCotVal != "undefined") {
				if (ii.ChartDataPrice.length == 0) {
					for (i = 0; i < 60; i++) {
						ii.ChartDataPrice.push([i, PdrCotVal]);
						ii.ChartDataSell.push([i, Sell == 0 ? null : Sell]);
						ii.ChartDataBuy.push([i, Buy == 0 ? null : Buy])
					}
				}
				ii.ChartDataPrice.splice(0, 1);
				ii.ChartDataSell.splice(0, 1);
				ii.ChartDataBuy.splice(0, 1);
				i = ii.ChartDataPrice[ii.ChartDataPrice.length - 1][0] + 1;
				ii.ChartDataPrice.push([i, PdrCotVal]);
				ii.ChartDataSell.push([i, Sell == 0 ? null : Sell]);
				ii.ChartDataBuy.push([i, Buy == 0 ? null : Buy])
			}
			var plotLines = [];
			var allmin, allmax;
			allmin = Math.min.apply(Math, ii.ChartDataPrice);
			allmin = Math.min(allmin, Math.min.apply(Math, ii.ChartDataSell));
			allmin = Math.min(allmin, Math.min.apply(Math, ii.ChartDataBuy));
			allmax = Math.max.apply(Math, ii.ChartDataPrice);
			allmax = Math.max(allmax, Math.max.apply(Math, ii.ChartDataSell));
			allmax = Math.max(allmax, Math.max.apply(Math, ii.ChartDataBuy));
			if (parseInt(PriceYesterday) >= allmin && parseInt(PriceYesterday) <= allmax) {
				plotLines.push({
					lineWidth: 2,
					strokeStyle: "#888888",
					value: PriceYesterday,
					title: {
						text: "قیمت دیروز",
						hAlign: "right",
						fillStyle: "black"
					}
				})
			}
			var axes = [{
				location: "left",
				type: "linear",
				plotLines: plotLines
			}, {
				type: "linear",
				location: "bottom",
				labels: {
					visible: false
				},
				majorTickMarks: {
					visible: false
				}
			}];
			$("#BBChart").jqChart({
				border: {
					cornerRadius: 0,
					lineWidth: 0,
					strokeStyle: "green"
				},
				axes: axes,
				legend: {
					visible: false
				},
				tooltips: {
					type: "shared"
				},
				series: [{
					type: "line",
					data: ii.ChartDataPrice,
					strokeStyle: "black",
					markers: {
						size: 0
					}
				}, {
					type: "line",
					data: ii.ChartDataBuy,
					strokeStyle: "blue",
					markers: {
						size: 0
					}
				}, {
					type: "line",
					data: ii.ChartDataSell,
					strokeStyle: "red",
					markers: {
						size: 0
					}
				}]
			});
			$("#BBChart").bind("tooltipFormat", function(e, data) {
				eg = data;
				if (data.length != 3) {
					return ""
				}
				return "<table><tr style='color:red'><td>فروش</td><td>" + (typeof data[2].y != "undefined" ? addCommas(data[2].y) : "") + "</td></tr><tr style='color:blue'><td>خرید</td><td>" + (typeof data[1].y != "undefined" ? addCommas(data[1].y) : "") + "</td></tr><tr style='color:black'><td>آخرین معامله</td><td>" + addCommas(data[0].y) + "</td></tr></table>"
			})
		},
		p1: 0,
		p2: 0,
		p3: 0,
		UpdateCounter: 0,
		LastTime: 0,
		LastData: "",
		UpdateSpeed: {
			normal: 3650,
			inactive: 6150,
			error: 9300,
			fast: 3150,
			tcs: 16000
		},
		UpdateUrl: "",
		SetTimeoutUpdateData: function(spd) {
			window.setTimeout("ii.UpdateData()", spd)
		},
		UpdateData: function() {
			ii.UpdateCounter++;
			if (getData("ActiveTab") != InsCode && ii.UpdateCounter % 30 != 0) {
				ii.SetTimeoutUpdateData(ii.UpdateSpeed.inactive);
				return
			}
			var c1 = "highlight1";
			var c2 = "highlight2";
			var c3 = "highlight3";
			$.ajax({
				url: ii.UpdateUrl,
				cache: true,
				data: (InstrumentID[2] != "T") ? ((InstrumentID.substring(0, 4) == "IRO2") ? {
					i: InsCode,
					c: CSecVal,
					p: 1
				} : {
					i: InsCode,
					c: CSecVal
				}) : ({
					i: InsCode,
					c: CSecVal,
					e: 1
				}),
				dataType: "text",
				timeout: 10000,
				error: function() {
					$("#CStatus").html("<div class='connKO' title='ارتباط با سرور قطع می باشد'></div>");
					ii.SetTimeoutUpdateData(ii.UpdateSpeed.error)
				},
				success: function(data) {
					var newVal;
					if (data.length == 0) {
						return
					}
					if (data == ii.LastData) {
						ii.SetTimeoutUpdateData(ii.UpdateSpeed.fast);
						return
					} else {
						ii.LastData = data
					}
					$("." + c1).removeClass(c1);
					$("." + c2).removeClass(c2);
					$("." + c3).removeClass(c3);
					var l1;
					var l2;
					var l3;
					$("#CStatus").html("<div class='connOK' title='ارتباط بدون مشکل'></div>");
					var AllData = data.split(";");
					var RelCompany = AllData[5].split(",");
					var TCSConfirmed;
					if (AllData[7].split("@")[0] == "1" || AllData[7].split("@")[0] == "2") {
						$("#CStatus").html("<div class='connOK' title='ارتباط بدون مشکل'></div>&nbsp;<div class='underSupervision" + (AllData[7].split("@")[0] == "1" ? "" : "2") + "' onclick='ii.ShowSupervisionDetail();' title='" + UnderSupervision(AllData[7].split("@")[0]) + "' ></div>")
					} else {
						$("#CStatus").html("<div class='connOK' title='ارتباط بدون مشکل'></div>")
					}
					var RefPortfo = AllData[8].split(",");
					var Ov = AllData[0].split(",");
					var LastTime = parseInt(Ov[12], 10) * 1000000 + parseInt(Ov[13], 10);
					if (LastTime < ii.LastTime) {
						ii.SetTimeoutUpdateData(ii.UpdateSpeed.error);
						return
					} else {
						ii.LastTime = LastTime
					}
					ChangeContentStyle("#d00", Ov[0], c1);
					ChangeContentStyle("#d01", InsState(Ov[1]), c1);
					PriceYesterday = parseInt(Ov[5]);
					var PdrCotValNew = parseInt(Ov[2]);
					var PClosingNew = parseInt(Ov[3]);
					var Last = Ov[11];
					var PdrCotValCss = "";
					var PClosingCss = "";
					if (Last == 1 || Ov[8] == "0") {
						PClosingCss = "<span style='font-size:15px;font-weight:bold'>" + addCommas(Ov[3]) + "</span>";
						PdrCotValCss = addCommas(Ov[2])
					} else {
						PClosingCss = addCommas(Ov[3]);
						PdrCotValCss = "<span style='font-size:15px;font-weight:bold'>" + addCommas(Ov[2]) + "</span>"
					}
					if (PriceYesterday == PdrCotValNew || parseInt(Ov[8]) == 0) {
						newVal = PdrCotValCss
					} else {
						if (PriceYesterday > PdrCotValNew) {
							newVal = PdrCotValCss + "&nbsp;&nbsp;<span style='font-size:11px;color:red'>(" + addCommas(PriceYesterday - PdrCotValNew) + ")&nbsp;&nbsp;[" + AdvRound(100 * (PriceYesterday - PdrCotValNew) / PriceYesterday, 2) + "%-]</span>"
						} else {
							if (PriceYesterday < PdrCotValNew) {
								newVal = PdrCotValCss + "&nbsp;&nbsp;<span style='font-size:11px;color:green'>" + addCommas(PdrCotValNew - PriceYesterday) + "&nbsp;&nbsp;[" + AdvRound(100 * (PdrCotValNew - PriceYesterday) / PriceYesterday, 2) + "%]</span>"
							}
						}
					}
					if (Ov[2] != PdrCotVal) {
						$("#d02").addClass(c1)
					}
					$("#d02").html(newVal);
					PdrCotVal = Ov[2];
					if (PriceYesterday > PClosingNew) {
						newVal = PClosingCss + "&nbsp;&nbsp;<span style='font-size:11px;color:red'>(" + addCommas(PriceYesterday - PClosingNew) + ")&nbsp;&nbsp;[" + AdvRound(100 * (PriceYesterday - PClosingNew) / PriceYesterday, 2) + "%-]</span>"
					} else {
						if (PriceYesterday < PClosingNew) {
							newVal = PClosingCss + "&nbsp;&nbsp;<span style='font-size:11px;color:green'>" + addCommas(PClosingNew - PriceYesterday) + "&nbsp;&nbsp;[" + AdvRound(100 * (PClosingNew - PriceYesterday) / PriceYesterday, 2) + "%]</span>"
						} else {
							newVal = PClosingCss
						}
					}
					if (Ov[3] != PClosing) {
						$("#d03").addClass(c1)
					}
					$("#d03").html(newVal);
					PClosing = Ov[3];
					ChangeContentStyle("#d04", addCommas(Ov[4]), c1);
					ChangeContentStyle("#d05", addCommas(Ov[5]), c1);
					ChangeContentStyle("#d06", addCommas(Ov[6]), c1);
					ChangeContentStyle("#d07", addCommas(Ov[7]), c1);
					ChangeContentStyle("#d08", addCommas(Ov[8]), c1);
					PriceMin = parseInt(Ov[7]);
					PriceMax = parseInt(Ov[6]);
					ChangeContentStyle("#d09", bigNumber(Ov[9]), c1);
					ChangeContentStyle("#d10", bigNumber(Ov[10]), c1);
					if ((InstrumentID.substr(0, 4) == "IROP")) {
						try {
							if (AllData[7].split("@")[2] != undefined) {
								ChangeContentStyle("#d11", bigNumber(AllData[7].split("@")[2]), c1)
							}
						} catch (err) {}
					} else {
						if (Flow != "3") {
							ChangeContentStyle("#d11", bigNumber(parseInt(Ov[3]) * ZTitad), c1)
						} else {
							if (ContractSize != "0") {
								if (AllData[7].split("@").length > 1) {
									ChangeContentStyle("#d11", bigNumber(AllData[7].split("@")[1]), c1)
								} else {
									ChangeContentStyle("#d11", bigNumber(0), c1)
								}
							}
						}
					}
					if (EstimatedEPS.length != 0) {
						ChangeContentStyle("#d12", "" + AdvRound(parseInt(Ov[3]) / parseInt(EstimatedEPS), 2), c1)
					}
					if (PSR != null && PSR.length != 0 && PSR != "0") {
						ChangeContentStyle("#d25", "" + AdvRound(parseInt(Ov[3]) / parseInt(PSR), 2), c1)
					}
					if (InstrumentID[2] == "T" && Ov[15].length != 0) {
						ChangeContentStyle("#PRedTran", addCommas(Ov[15]), c1);
						ChangeContentStyle("#NAVDate", Ov[14], c1)
					}
					document.title = LVal18AFC + " " + addCommas(Ov[2]);
					var FastView = AllData[1].split(",");
					if (AllData[1].length != 0) {
						UpdateFastView(FastView)
					}
					if (AllData[2].length > 1) {
						var BLRows = AllData[2].split(",");
						console.log("001225A");
						console.log(BLRows.length);
						if (CgrValCot[0] == "1" && CgrValCot[1] == "A") {
							for (ipos = 0; ipos < (BLRows.length - 1) && ipos < 5; ipos++) {
								var BLCols = BLRows[ipos].split("@");
								var CellData;
								var bl = document.getElementById("bl");
								if (BLCols[2] == "c") {
									BLCols[2] = "مذاکره"
								}
								if (BLCols[3] == "c") {
									BLCols[3] = "مذاکره"
								}
								for (jpos = 0; jpos < 3; jpos++) {
									CellData = parseInt(BLCols[jpos], 10) == 0 ? "&nbsp;" : addCommas(BLCols[jpos]);
									ChangeContentStyle(bl.children[ipos + 1].children[jpos], CellData, c2);
									CellData = parseInt(BLCols[jpos + 3], 10) == 0 ? "&nbsp;" : addCommas(BLCols[jpos + 3]);
									ChangeContentStyle(bl.children[ipos + 1].children[jpos + 3], CellData, c2)
								}
								l2 = parseInt(BLRows[0].split("@")[2]);
								l3 = parseInt(BLRows[0].split("@")[3])
							}
						} else {
							for (ipos = 0; ipos < (BLRows.length - 1) && ipos < 5; ipos++) {
								var BLCols = BLRows[ipos].split("@");
								var CellData;
								var RowStyle;
								var RowTitle = "سفارش خارج از بازه مجاز - این سفارش بصورت معتبر تا لغو یا معتبر تا تاریخ وارد سامانه معاملات شده و با توجه به بازه مجاز روز قابل اجرا نمی باشد";
								var bl = document.getElementById("bl");
								for (jpos = 0; jpos < 3; jpos++) {
									if (jpos == 0) {
										if (parseInt(BLCols[2], 10) != 0 && (parseInt(BLCols[2], 10) > parseInt(PSGelStaMax, 10) || parseInt(BLCols[2], 10) < parseInt(PSGelStaMin, 10))) {
											RowStyle = "OutOfRangeBestLimit"
										} else {
											RowStyle = ""
										}
										for (var kpos = 0; kpos < 3; kpos++) {
											bl.children[ipos + 1].children[kpos].className = RowStyle;
											bl.children[ipos + 1].children[kpos].title = RowStyle.length == 0 ? "" : RowTitle
										}
										if (parseInt(BLCols[3], 10) != 0 && (parseInt(BLCols[3], 10) > parseInt(PSGelStaMax, 10) || parseInt(BLCols[3], 10) < parseInt(PSGelStaMin, 10))) {
											RowStyle = "OutOfRangeBestLimit"
										} else {
											RowStyle = ""
										}
										for (var kpos = 3; kpos < 6; kpos++) {
											bl.children[ipos + 1].children[kpos].className = RowStyle;
											bl.children[ipos + 1].children[kpos].title = RowStyle.length == 0 ? "" : RowTitle
										}
									}
									CellData = parseInt(BLCols[jpos], 10) == 0 ? "&nbsp;" : addCommas(BLCols[jpos]);
									ChangeContentStyle(bl.children[ipos + 1].children[jpos], CellData, c2);
									CellData = parseInt(BLCols[jpos + 3], 10) == 0 ? "&nbsp;" : addCommas(BLCols[jpos + 3]);
									ChangeContentStyle(bl.children[ipos + 1].children[jpos + 3], CellData, c2)
								}
								l2 = parseInt(BLRows[0].split("@")[2]);
								l3 = parseInt(BLRows[0].split("@")[3])
							}
						}
					}
					if (l2 == 0 || (l2 > parseInt(PSGelStaMax, 10) || l2 < parseInt(PSGelStaMin, 10))) {
						$("#dbp").html("")
					} else {
						ChangeContentStyle("#dbp", addCommas(l2), c1)
					}
					if (l3 == 0 || (l3 > parseInt(PSGelStaMax, 10) || l3 < parseInt(PSGelStaMin, 10))) {
						$("#dsp").html("")
					} else {
						ChangeContentStyle("#dsp", addCommas(l3), c1)
					}
					HandleMsg(AllData[3]);
					if (AllData[4].length != 0) {
						var eData = AllData[4].split(",");
						ii.RenderHaghighiHoghoghi(eData, c1)
					}
					if ((InstrumentID.substr(0, 4) != "IRO2")) {
						ii.RenderRelatedCompany(RelCompany, c3)
					} else {
						ii.RenderRefPortfo(RefPortfo, c3)
					}
					l1 = parseInt(Ov[2]);
					if (ii.p1 != l1 || ii.p2 != l2 || ii.p3 != l3) {
						ii.p1 = l1;
						ii.p2 = l2;
						ii.p3 = l3;
						ii.UpdateChart(l1, l2, l3)
					}
					ii.SetTimeoutUpdateData(ii.UpdateSpeed.normal)
				}
			})
		},
		RenderRelatedCompany: function(RelCompany, c3) {
			for (ipos = 0; ipos < RelCompany.length - 1; ipos++) {
				var RelCoCols = RelCompany[ipos].split("@");
				var RelCoEl = document.getElementById(RelCoCols[0]).children;
				ChangeContentStyle(RelCoEl[1], addCommas(RelCoCols[1]), c3);
				RelCoEl[2].innerHTML = RelCoCols[4] == "0" ? "0" : AdvRoundColor(100 * (RelCoCols[1] - RelCoCols[3]) / RelCoCols[3], 2);
				ChangeContentStyle(RelCoEl[3], addCommas(RelCoCols[2]), c3);
				RelCoEl[4].innerHTML = AdvRoundColor(100 * (RelCoCols[2] - RelCoCols[3]) / RelCoCols[3], 2);
				ChangeContentStyle(RelCoEl[5], addCommas(RelCoCols[4]), c3);
				ChangeContentStyle(RelCoEl[6], bigNumber(RelCoCols[5]), c3);
				ChangeContentStyle(RelCoEl[7], bigNumber(RelCoCols[6], 1), c3)
			}
		},
		RenderTCSConfirmedOrders: function(TCSConfirmed) {
			var tcstablecontent = "";
			for (ipos = 0; ipos < TCSConfirmed.length - 1; ipos++) {
				var TCSConfirmedCols = TCSConfirmed[ipos].split("@");
				tcstablecontent += "<tr><td>" + addCommas(TCSConfirmedCols[0]) + "</td><td>" + addCommas(TCSConfirmedCols[1]) + "</td><td>" + addCommas(TCSConfirmedCols[2]) + "</td></tr>"
			}
			$("#tcstbl").html(tcstablecontent)
		},
		RenderRefPortfo: function(RefPortfo, c3) {
			for (ipos = 0; ipos < RefPortfo.length - 1; ipos++) {
				var RefPortfoCols = RefPortfo[ipos].split("@");
				var RefPortfoEl = document.getElementById(RefPortfoCols[0]).children;
				ChangeContentStyle(RefPortfoEl[1], addCommas(RefPortfoCols[1]), c3);
				RefPortfoEl[2].innerHTML = RefPortfoCols[4] == "0" ? "0" : AdvRoundColor(100 * (RefPortfoCols[1] - RefPortfoCols[3]) / RefPortfoCols[3], 2);
				ChangeContentStyle(RefPortfoEl[3], addCommas(RefPortfoCols[2]), c3);
				RefPortfoEl[4].innerHTML = AdvRoundColor(100 * (RefPortfoCols[2] - RefPortfoCols[3]) / RefPortfoCols[3], 2);
				ChangeContentStyle(RefPortfoEl[5], addCommas(RefPortfoCols[4]), c3);
				ChangeContentStyle(RefPortfoEl[6], bigNumber(RefPortfoCols[5]), c3);
				ChangeContentStyle(RefPortfoEl[7], bigNumber(RefPortfoCols[6], 1), c3);
				ChangeContentStyle(RefPortfoEl[9], bigNumber(RefPortfoCols[7], 1), c3)
			}
		},
		RenderHaghighiHoghoghi: function(eData, c1) {
			var sumBuy = parseInt(eData[0]) + parseInt(eData[1]) + parseInt(eData[2]);
			var sumSell = parseInt(eData[3]) + parseInt(eData[4]);
			var BuyA = 0;
			var BuyB = 0;
			var BuyC = 0;
			var SellB = 0;
			var SellC = 0;
			if (sumBuy != 0) {
				if (eData[0] != 0) {
					BuyA = 100 * parseInt(eData[0]) / sumBuy
				} else {
					BuyA = 0
				}
				if (eData[1] != 0) {
					BuyB = 100 * parseInt(eData[1]) / sumBuy
				} else {
					BuyB = 0
				}
				if (eData[2] != 0) {
					BuyC = 100 * parseInt(eData[2]) / sumBuy
				} else {
					BuyC = 0
				}
				if (eData[3] != 0) {
					SellA = 100 * parseInt(eData[3]) / sumSell
				} else {
					SellA = 0
				}
				if (eData[4] != 0) {
					SellB = 100 * parseInt(eData[4]) / sumSell
				} else {
					SellB = 0
				}
			}
			ChangeContentStyle("#e0", bigNumber(eData[0]) + "&nbsp;[" + bigNumber(BuyA, 1) + "%]", c1);
			ChangeContentStyle("#e1", bigNumber(eData[1]) + "&nbsp;[" + bigNumber(BuyB, 1) + "%]", c1);
			ChangeContentStyle("#e3", bigNumber(eData[3]) + "&nbsp;[" + bigNumber(SellA, 1) + "%]", c1);
			ChangeContentStyle("#e4", bigNumber(eData[4]) + "&nbsp;[" + bigNumber(SellB, 1) + "%]", c1);
			ChangeContentStyle("#e10", addCommas(parseInt(eData[5]) + parseInt(eData[6]) + parseInt(eData[7])), c1);
			ChangeContentStyle("#e11", addCommas(parseInt(eData[8]) + parseInt(eData[9])), c1);
			ChangeContentStyle("#e5", addCommas(eData[5]), c1);
			ChangeContentStyle("#e6", addCommas(eData[6]), c1);
			ChangeContentStyle("#e8", addCommas(eData[8]), c1);
			ChangeContentStyle("#e9", addCommas(eData[9]), c1)
		}
	};
	return InstInfo
};;