// source from: http://old.tsetmc.com/tsev2/res/loader.aspx?t=j&_550
// It appears as a network request when loading watch page[1].
// [1]: http://old.tsetmc.com/Loader.aspx?ParTree=15131F
// Formatted using https://beautifier.io/
var InstDataType = {
    dt18: [18, 'تعداد روزهای منفی در 3 ماه گذشته', '1', '10', '0'],
    dt19: [19, 'تعداد روزهای منفی در 12 ماه گذشته', '1', '11', '0'],
    dt20: [20, 'درصد روزهای منفی در 3 ماه گذشته', '1', '12', '0'],
    dt21: [21, 'درصد روزهای منفی در 12 ماه گذشته', '1', '13', '0'],
    dt22: [22, 'رتبه روزهای منفی در 3 ماه گذشته', '1', '14', '0'],
    dt23: [23, 'رتبه روزهای منفی در 12 ماه گذشته', '1', '15', '0'],
    dt26: [26, 'تعداد روزهای مثبت در 3 ماه گذشته', '2', '18', '1'],
    dt27: [27, 'تعداد روزهای مثبت در 12 ماه گذشته', '2', '19', '1'],
    dt28: [28, 'درصد روزهای مثبت در 3 ماه گذشته', '2', '20', '1'],
    dt29: [29, 'درصد روزهای مثبت در 12 ماه گذشته', '2', '21', '1'],
    dt30: [30, 'رتبه روزهای مثبت در 3 ماه گذشته', '2', '22', '1'],
    dt31: [31, 'رتبه روزهای مثبت در 12 ماه گذشته', '2', '23', '1'],
    dt32: [32, 'روزهای با معامله در 3 ماه گذشته', '3', '24', '1'],
    dt33: [33, 'روزهای با معامله در 12 ماه گذشته', '3', '25', '1'],
    dt34: [34, 'رتبه روزهای با معامله در 3 ماه گذشته', '3', '26', '1'],
    dt35: [35, 'رتبه روزهای با معامله در 12 ماه گذشته', '3', '27', '1'],
    dt24: [24, 'روزهای بدون معامله در 3 ماه گذشته', '3', '28', '0'],
    dt25: [25, 'روزهای بدون معامله در 12 ماه گذشته', '3', '29', '0'],
    dt9: [9, 'میانگین دفعات معاملات روزانه در 3 ماه گذشته', '4', '10', '1'],
    dt10: [10, 'میانگین دفعات معاملات روزانه در 12 ماه گذشته', '4', '11', '1'],
    dt11: [11, 'رتبه دفعات معاملات روزانه در 3 ماه گذشته', '4', '12', '1'],
    dt12: [12, 'رتبه دفعات معاملات روزانه در 12 ماه گذشته', '4', '13', '1'],
    dt17: [17, 'دفعات معاملات در آخرین روز', '4', '14', '1'],
    dt15: [15, 'ارزش معاملات آخرین روز', '5', '10', '1'],
    dt1: [1, 'میانگین ارزش معاملات در 3 ماه گذشته ', '5', '11', '1'],
    dt2: [2, 'میانگین ارزش معاملات در 12 ماه گذشته ', '5', '12', '1'],
    dt3: [3, 'رتبه ارزش معاملات در 3 ماه گذشته ', '5', '13', '1'],
    dt4: [4, 'رتبه ارزش معاملات در 12 ماه گذشته ', '5', '14', '1'],
    dt36: [36, 'ارزش شرکت در آخرین روز', '6', '10', '1'],
    dt37: [37, 'رتبه ارزش شرکت در آخرین روز', '6', '11', '1'],
    dt5: [5, 'میانگین حجم معاملات در 3 ماه گذشته ', '7', '10', '1'],
    dt6: [6, 'میانگین حجم معاملات در 12 ماه گذشته ', '7', '11', '1'],
    dt7: [7, 'رتبه حجم معاملات در 3 ماه گذشته ', '7', '12', '1'],
    dt8: [8, 'رتبه حجم معاملات در 12 ماه گذشته ', '7', '13', '1'],
    dt16: [16, 'حجم معاملات آخرین روز', '7', '14', '1'],
    dt13: [13, 'قیمت میانگین وزنی آخرین روز - بدون دخالت حجم مبنا', '8', '10', '1'],
    dt14: [14, 'قیمت میانگین وزنی آخرین روز - با دخالت حجم مبنا', '8', '11', '1'],
    dt38: [38, 'تعداد روزهای باز در 3 ماه گذشته', '9', '11', '1'],
    dt39: [39, 'تعداد روزهای باز در 12 ماه گذشته', '9', '12', '1'],
    dt40: [40, 'درصد روزهای باز در 3 ماه گذشته', '9', '13', '1'],
    dt41: [41, 'درصد روزهای باز در 12 ماه گذشته', '9', '14', '1'],
    dt42: [42, 'رتبه روزهای باز در 3 ماه گذشته', '9', '15', '1'],
    dt43: [43, 'رتبه روزهای باز در 12 ماه گذشته', '9', '16', '1'],
    dt44: [44, 'تعداد روزهای بسته در 3 ماه گذشته', '9', '17', '0'],
    dt45: [45, 'تعداد روزهای بسته در 12 ماه گذشته', '9', '18', '0'],
    dt46: [46, 'درصد روزهای بسته در 3 ماه گذشته', '9', '19', '0'],
    dt47: [47, 'درصد روزهای بسته در 12 ماه گذشته', '9', '20', '0'],
    dt48: [48, 'رتبه روزهای بسته در 3 ماه گذشته', '9', '21', '0'],
    dt49: [49, 'رتبه روزهای بسته در 12 ماه گذشته', '9', '22', '0'],
    dt66: [66, 'میانگین تعداد خریداران در 3 ماه گذشته', '10', '27', '1'],
    dt67: [67, 'میانگین تعداد خریداران در 12 ماه گذشته', '10', '28', '1'],
    dt68: [68, 'رتبه تعداد خریداران در 3 ماه گذشته', '10', '29', '1'],
    dt69: [69, 'رتبه تعداد خریداران در 12 ماه گذشته', '10', '30', '1'],
    dt86: [86, 'میانگین تعداد فروشندگان در 3 ماه گذشته', '10', '47', '1'],
    dt87: [87, 'میانگین تعداد فروشندگان در 12 ماه گذشته', '10', '48', '1'],
    dt88: [88, 'رتبه تعداد فروشندگان در 3 ماه گذشته', '10', '49', '1'],
    dt89: [89, 'رتبه تعداد فروشندگان در 12 ماه گذشته', '10', '50', '1'],
    dt50: [50, 'میانگین حجم خرید حقیقی در 3 ماه گذشته', '11', '11', '1'],
    dt51: [51, 'میانگین حجم خرید حقیقی در 12 ماه گذشته', '11', '12', '1'],
    dt52: [52, 'رتبه حجم خرید حقیقی در 3 ماه گذشته', '11', '13', '1'],
    dt53: [53, 'رتبه حجم خرید حقیقی در 12 ماه گذشته', '11', '14', '1'],
    dt54: [54, 'میانگین حجم خرید حقوقی در 3 ماه گذشته', '11', '15', '1'],
    dt55: [55, 'میانگین حجم خرید حقوقی در 12 ماه گذشته', '11', '16', '1'],
    dt56: [56, 'رتبه حجم خرید حقوقی در 3 ماه گذشته', '11', '17', '1'],
    dt57: [57, 'رتبه حجم خرید حقوقی در 12 ماه گذشته', '11', '18', '1'],
    dt58: [58, 'میانگین تعداد خریدار حقیقی در 3 ماه گذشته', '11', '19', '1'],
    dt59: [59, 'میانگین تعداد خریدار حقیقی در 12 ماه گذشته', '11', '20', '1'],
    dt60: [60, 'رتبه تعداد خریدار حقیقی در 3 ماه گذشته', '11', '21', '1'],
    dt61: [61, 'رتبه تعداد خریدار حقیقی در 12 ماه گذشته', '11', '22', '1'],
    dt62: [62, 'میانگین تعداد خریدار حقوقی در 3 ماه گذشته', '11', '23', '1'],
    dt63: [63, 'میانگین تعداد خریدار حقوقی در 12 ماه گذشته', '11', '24', '1'],
    dt64: [64, 'رتبه تعداد خریدار حقوقی در 3 ماه گذشته', '11', '25', '1'],
    dt65: [65, 'رتبه تعداد خریدار حقوقی در 12 ماه گذشته', '11', '26', '1'],
    dt70: [70, 'میانگین حجم فروش حقیقی در 3 ماه گذشته', '11', '31', '1'],
    dt71: [71, 'میانگین حجم فروش حقیقی در 12 ماه گذشته', '11', '32', '1'],
    dt72: [72, 'رتبه حجم فروش حقیقی در 3 ماه گذشته', '11', '33', '1'],
    dt73: [73, 'رتبه حجم فروش حقیقی در 12 ماه گذشته', '11', '34', '1'],
    dt74: [74, 'میانگین حجم فروش حقوقی در 3 ماه گذشته', '11', '35', '1'],
    dt75: [75, 'میانگین حجم فروش حقوقی در 12 ماه گذشته', '11', '36', '1'],
    dt76: [76, 'رتبه حجم فروش حقوقی در 3 ماه گذشته', '11', '37', '1'],
    dt77: [77, 'رتبه حجم فروش حقوقی در 12 ماه گذشته', '11', '38', '1'],
    dt78: [78, 'میانگین تعداد فروشنده حقیقی در 3 ماه گذشته', '11', '39', '1'],
    dt79: [79, 'میانگین تعداد فروشنده حقیقی در 12 ماه گذشته', '11', '40', '1'],
    dt80: [80, 'رتبه تعداد فروشنده حقیقی در 3 ماه گذشته', '11', '41', '1'],
    dt81: [81, 'رتبه تعداد فروشنده حقیقی در 12 ماه گذشته', '11', '42', '1'],
    dt82: [82, 'میانگین تعداد فروشنده حقوقی در 3 ماه گذشته', '11', '43', '1'],
    dt83: [83, 'میانگین تعداد فروشنده حقوقی در 12 ماه گذشته', '11', '44', '1'],
    dt84: [84, 'رتبه تعداد فروشنده حقوقی در 3 ماه گذشته', '11', '45', '1'],
    dt85: [85, 'رتبه تعداد فروشنده حقوقی در 12 ماه گذشته', '11', '46', '1']
};
var InstDataPartition = {
    dp1: [1, 'آمار روزهای منفی', 1],
    dp2: [2, 'آمار روزهای مثبت', 2],
    dp3: [3, 'آمار روزهای معاملات', 3],
    dp4: [4, 'دفعات معامله', 4],
    dp5: [5, 'ارزش معاملات', 5],
    dp6: [6, 'ارزش شرکت', 6],
    dp7: [7, 'حجم معاملات', 7],
    dp8: [8, 'قیمت ها', 8],
    dp9: [9, 'وضعیت نماد', 9],
    dp10: [10, 'خریداران و فروشندگان', 10],
    dp11: [11, 'حقیقی حقوقی', 11]
};
var InstDataType = {
    dt18: [18, 'تعداد روزهای منفی در 3 ماه گذشته', '1', '10', '0'],
    dt19: [19, 'تعداد روزهای منفی در 12 ماه گذشته', '1', '11', '0'],
    dt20: [20, 'درصد روزهای منفی در 3 ماه گذشته', '1', '12', '0'],
    dt21: [21, 'درصد روزهای منفی در 12 ماه گذشته', '1', '13', '0'],
    dt22: [22, 'رتبه روزهای منفی در 3 ماه گذشته', '1', '14', '0'],
    dt23: [23, 'رتبه روزهای منفی در 12 ماه گذشته', '1', '15', '0'],
    dt26: [26, 'تعداد روزهای مثبت در 3 ماه گذشته', '2', '18', '1'],
    dt27: [27, 'تعداد روزهای مثبت در 12 ماه گذشته', '2', '19', '1'],
    dt28: [28, 'درصد روزهای مثبت در 3 ماه گذشته', '2', '20', '1'],
    dt29: [29, 'درصد روزهای مثبت در 12 ماه گذشته', '2', '21', '1'],
    dt30: [30, 'رتبه روزهای مثبت در 3 ماه گذشته', '2', '22', '1'],
    dt31: [31, 'رتبه روزهای مثبت در 12 ماه گذشته', '2', '23', '1'],
    dt32: [32, 'روزهای با معامله در 3 ماه گذشته', '3', '24', '1'],
    dt33: [33, 'روزهای با معامله در 12 ماه گذشته', '3', '25', '1'],
    dt34: [34, 'رتبه روزهای با معامله در 3 ماه گذشته', '3', '26', '1'],
    dt35: [35, 'رتبه روزهای با معامله در 12 ماه گذشته', '3', '27', '1'],
    dt24: [24, 'روزهای بدون معامله در 3 ماه گذشته', '3', '28', '0'],
    dt25: [25, 'روزهای بدون معامله در 12 ماه گذشته', '3', '29', '0'],
    dt9: [9, 'میانگین دفعات معاملات روزانه در 3 ماه گذشته', '4', '10', '1'],
    dt10: [10, 'میانگین دفعات معاملات روزانه در 12 ماه گذشته', '4', '11', '1'],
    dt11: [11, 'رتبه دفعات معاملات روزانه در 3 ماه گذشته', '4', '12', '1'],
    dt12: [12, 'رتبه دفعات معاملات روزانه در 12 ماه گذشته', '4', '13', '1'],
    dt17: [17, 'دفعات معاملات در آخرین روز', '4', '14', '1'],
    dt15: [15, 'ارزش معاملات آخرین روز', '5', '10', '1'],
    dt1: [1, 'میانگین ارزش معاملات در 3 ماه گذشته ', '5', '11', '1'],
    dt2: [2, 'میانگین ارزش معاملات در 12 ماه گذشته ', '5', '12', '1'],
    dt3: [3, 'رتبه ارزش معاملات در 3 ماه گذشته ', '5', '13', '1'],
    dt4: [4, 'رتبه ارزش معاملات در 12 ماه گذشته ', '5', '14', '1'],
    dt36: [36, 'ارزش شرکت در آخرین روز', '6', '10', '1'],
    dt37: [37, 'رتبه ارزش شرکت در آخرین روز', '6', '11', '1'],
    dt5: [5, 'میانگین حجم معاملات در 3 ماه گذشته ', '7', '10', '1'],
    dt6: [6, 'میانگین حجم معاملات در 12 ماه گذشته ', '7', '11', '1'],
    dt7: [7, 'رتبه حجم معاملات در 3 ماه گذشته ', '7', '12', '1'],
    dt8: [8, 'رتبه حجم معاملات در 12 ماه گذشته ', '7', '13', '1'],
    dt16: [16, 'حجم معاملات آخرین روز', '7', '14', '1'],
    dt13: [13, 'قیمت میانگین وزنی آخرین روز - بدون دخالت حجم مبنا', '8', '10', '1'],
    dt14: [14, 'قیمت میانگین وزنی آخرین روز - با دخالت حجم مبنا', '8', '11', '1'],
    dt38: [38, 'تعداد روزهای باز در 3 ماه گذشته', '9', '11', '1'],
    dt39: [39, 'تعداد روزهای باز در 12 ماه گذشته', '9', '12', '1'],
    dt40: [40, 'درصد روزهای باز در 3 ماه گذشته', '9', '13', '1'],
    dt41: [41, 'درصد روزهای باز در 12 ماه گذشته', '9', '14', '1'],
    dt42: [42, 'رتبه روزهای باز در 3 ماه گذشته', '9', '15', '1'],
    dt43: [43, 'رتبه روزهای باز در 12 ماه گذشته', '9', '16', '1'],
    dt44: [44, 'تعداد روزهای بسته در 3 ماه گذشته', '9', '17', '0'],
    dt45: [45, 'تعداد روزهای بسته در 12 ماه گذشته', '9', '18', '0'],
    dt46: [46, 'درصد روزهای بسته در 3 ماه گذشته', '9', '19', '0'],
    dt47: [47, 'درصد روزهای بسته در 12 ماه گذشته', '9', '20', '0'],
    dt48: [48, 'رتبه روزهای بسته در 3 ماه گذشته', '9', '21', '0'],
    dt49: [49, 'رتبه روزهای بسته در 12 ماه گذشته', '9', '22', '0'],
    dt66: [66, 'میانگین تعداد خریداران در 3 ماه گذشته', '10', '27', '1'],
    dt67: [67, 'میانگین تعداد خریداران در 12 ماه گذشته', '10', '28', '1'],
    dt68: [68, 'رتبه تعداد خریداران در 3 ماه گذشته', '10', '29', '1'],
    dt69: [69, 'رتبه تعداد خریداران در 12 ماه گذشته', '10', '30', '1'],
    dt86: [86, 'میانگین تعداد فروشندگان در 3 ماه گذشته', '10', '47', '1'],
    dt87: [87, 'میانگین تعداد فروشندگان در 12 ماه گذشته', '10', '48', '1'],
    dt88: [88, 'رتبه تعداد فروشندگان در 3 ماه گذشته', '10', '49', '1'],
    dt89: [89, 'رتبه تعداد فروشندگان در 12 ماه گذشته', '10', '50', '1'],
    dt50: [50, 'میانگین حجم خرید حقیقی در 3 ماه گذشته', '11', '11', '1'],
    dt51: [51, 'میانگین حجم خرید حقیقی در 12 ماه گذشته', '11', '12', '1'],
    dt52: [52, 'رتبه حجم خرید حقیقی در 3 ماه گذشته', '11', '13', '1'],
    dt53: [53, 'رتبه حجم خرید حقیقی در 12 ماه گذشته', '11', '14', '1'],
    dt54: [54, 'میانگین حجم خرید حقوقی در 3 ماه گذشته', '11', '15', '1'],
    dt55: [55, 'میانگین حجم خرید حقوقی در 12 ماه گذشته', '11', '16', '1'],
    dt56: [56, 'رتبه حجم خرید حقوقی در 3 ماه گذشته', '11', '17', '1'],
    dt57: [57, 'رتبه حجم خرید حقوقی در 12 ماه گذشته', '11', '18', '1'],
    dt58: [58, 'میانگین تعداد خریدار حقیقی در 3 ماه گذشته', '11', '19', '1'],
    dt59: [59, 'میانگین تعداد خریدار حقیقی در 12 ماه گذشته', '11', '20', '1'],
    dt60: [60, 'رتبه تعداد خریدار حقیقی در 3 ماه گذشته', '11', '21', '1'],
    dt61: [61, 'رتبه تعداد خریدار حقیقی در 12 ماه گذشته', '11', '22', '1'],
    dt62: [62, 'میانگین تعداد خریدار حقوقی در 3 ماه گذشته', '11', '23', '1'],
    dt63: [63, 'میانگین تعداد خریدار حقوقی در 12 ماه گذشته', '11', '24', '1'],
    dt64: [64, 'رتبه تعداد خریدار حقوقی در 3 ماه گذشته', '11', '25', '1'],
    dt65: [65, 'رتبه تعداد خریدار حقوقی در 12 ماه گذشته', '11', '26', '1'],
    dt70: [70, 'میانگین حجم فروش حقیقی در 3 ماه گذشته', '11', '31', '1'],
    dt71: [71, 'میانگین حجم فروش حقیقی در 12 ماه گذشته', '11', '32', '1'],
    dt72: [72, 'رتبه حجم فروش حقیقی در 3 ماه گذشته', '11', '33', '1'],
    dt73: [73, 'رتبه حجم فروش حقیقی در 12 ماه گذشته', '11', '34', '1'],
    dt74: [74, 'میانگین حجم فروش حقوقی در 3 ماه گذشته', '11', '35', '1'],
    dt75: [75, 'میانگین حجم فروش حقوقی در 12 ماه گذشته', '11', '36', '1'],
    dt76: [76, 'رتبه حجم فروش حقوقی در 3 ماه گذشته', '11', '37', '1'],
    dt77: [77, 'رتبه حجم فروش حقوقی در 12 ماه گذشته', '11', '38', '1'],
    dt78: [78, 'میانگین تعداد فروشنده حقیقی در 3 ماه گذشته', '11', '39', '1'],
    dt79: [79, 'میانگین تعداد فروشنده حقیقی در 12 ماه گذشته', '11', '40', '1'],
    dt80: [80, 'رتبه تعداد فروشنده حقیقی در 3 ماه گذشته', '11', '41', '1'],
    dt81: [81, 'رتبه تعداد فروشنده حقیقی در 12 ماه گذشته', '11', '42', '1'],
    dt82: [82, 'میانگین تعداد فروشنده حقوقی در 3 ماه گذشته', '11', '43', '1'],
    dt83: [83, 'میانگین تعداد فروشنده حقوقی در 12 ماه گذشته', '11', '44', '1'],
    dt84: [84, 'رتبه تعداد فروشنده حقوقی در 3 ماه گذشته', '11', '45', '1'],
    dt85: [85, 'رتبه تعداد فروشنده حقوقی در 12 ماه گذشته', '11', '46', '1']
};
var InstDataPartition = {
    dp1: [1, 'آمار روزهای منفی', 1],
    dp2: [2, 'آمار روزهای مثبت', 2],
    dp3: [3, 'آمار روزهای معاملات', 3],
    dp4: [4, 'دفعات معامله', 4],
    dp5: [5, 'ارزش معاملات', 5],
    dp6: [6, 'ارزش شرکت', 6],
    dp7: [7, 'حجم معاملات', 7],
    dp8: [8, 'قیمت ها', 8],
    dp9: [9, 'وضعیت نماد', 9],
    dp10: [10, 'خریداران و فروشندگان', 10],
    dp11: [11, 'حقیقی حقوقی', 11]
}; /*! jQuery v3.5.1 | (c) JS Foundation and other contributors | jquery.org/license */
! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(C, e) {
    "use strict";
    var t = [],
        r = Object.getPrototypeOf,
        s = t.slice,
        g = t.flat ? function(e) {
            return t.flat.call(e)
        } : function(e) {
            return t.concat.apply([], e)
        },
        u = t.push,
        i = t.indexOf,
        n = {},
        o = n.toString,
        v = n.hasOwnProperty,
        a = v.toString,
        l = a.call(Object),
        y = {},
        m = function(e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        },
        x = function(e) {
            return null != e && e === e.window
        },
        E = C.document,
        c = {
            type: !0,
            src: !0,
            nonce: !0,
            noModule: !0
        };

    function b(e, t, n) {
        var r, i, o = (n = n || E).createElement("script");
        if (o.text = e, t)
            for (r in c)(i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
        n.head.appendChild(o).parentNode.removeChild(o)
    }

    function w(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e
    }
    var f = "3.5.1",
        S = function(e, t) {
            return new S.fn.init(e, t)
        };

    function p(e) {
        var t = !!e && "length" in e && e.length,
            n = w(e);
        return !m(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    S.fn = S.prototype = {
        jquery: f,
        constructor: S,
        length: 0,
        toArray: function() {
            return s.call(this)
        },
        get: function(e) {
            return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = S.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function(e) {
            return S.each(this, e)
        },
        map: function(n) {
            return this.pushStack(S.map(this, function(e, t) {
                return n.call(e, t, e)
            }))
        },
        slice: function() {
            return this.pushStack(s.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        even: function() {
            return this.pushStack(S.grep(this, function(e, t) {
                return (t + 1) % 2
            }))
        },
        odd: function() {
            return this.pushStack(S.grep(this, function(e, t) {
                return t % 2
            }))
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: u,
        sort: t.sort,
        splice: t.splice
    }, S.extend = S.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || m(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e) r = e[t], "__proto__" !== t && a !== r && (l && r && (S.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || S.isPlainObject(n) ? n : {}, i = !1, a[t] = S.extend(l, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }, S.extend({
        expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof(n = v.call(t, "constructor") && t.constructor) && a.call(n) === l)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        globalEval: function(e, t, n) {
            b(e, {
                nonce: t && t.nonce
            }, n)
        },
        each: function(e, t) {
            var n, r = 0;
            if (p(e)) {
                for (n = e.length; r < n; r++)
                    if (!1 === t.call(e[r], r, e[r])) break
            } else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r])) break;
            return e
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (p(Object(e)) ? S.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : i.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) !== a && r.push(e[i]);
            return r
        },
        map: function(e, t, n) {
            var r, i, o = 0,
                a = [];
            if (p(e))
                for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && a.push(i);
            else
                for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
            return g(a)
        },
        guid: 1,
        support: y
    }), "function" == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]), S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        n["[object " + t + "]"] = t.toLowerCase()
    });
    var d = function(n) {
        var e, d, b, o, i, h, f, g, w, u, l, T, C, a, E, v, s, c, y, S = "sizzle" + 1 * new Date,
            p = n.document,
            k = 0,
            r = 0,
            m = ue(),
            x = ue(),
            A = ue(),
            N = ue(),
            D = function(e, t) {
                return e === t && (l = !0), 0
            },
            j = {}.hasOwnProperty,
            t = [],
            q = t.pop,
            L = t.push,
            H = t.push,
            O = t.slice,
            P = function(e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t) return n;
                return -1
            },
            R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            M = "[\\x20\\t\\r\\n\\f]",
            I = "(?:\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
            W = "\\[" + M + "*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]",
            F = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)",
            B = new RegExp(M + "+", "g"),
            $ = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
            _ = new RegExp("^" + M + "*," + M + "*"),
            z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
            U = new RegExp(M + "|>"),
            X = new RegExp(F),
            V = new RegExp("^" + I + "$"),
            G = {
                ID: new RegExp("^#(" + I + ")"),
                CLASS: new RegExp("^\\.(" + I + ")"),
                TAG: new RegExp("^(" + I + "|[*])"),
                ATTR: new RegExp("^" + W),
                PSEUDO: new RegExp("^" + F),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + R + ")$", "i"),
                needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
            },
            Y = /HTML$/i,
            Q = /^(?:input|select|textarea|button)$/i,
            J = /^h\d$/i,
            K = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ee = /[+~]/,
            te = new RegExp("\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])", "g"),
            ne = function(e, t) {
                var n = "0x" + e.slice(1) - 65536;
                return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
            },
            re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            ie = function(e, t) {
                return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            oe = function() {
                T()
            },
            ae = be(function(e) {
                return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            H.apply(t = O.call(p.childNodes), p.childNodes), t[p.childNodes.length].nodeType
        } catch (e) {
            H = {
                apply: t.length ? function(e, t) {
                    L.apply(e, O.call(t))
                } : function(e, t) {
                    var n = e.length,
                        r = 0;
                    while (e[n++] = t[r++]);
                    e.length = n - 1
                }
            }
        }

        function se(t, e, n, r) {
            var i, o, a, s, u, l, c, f = e && e.ownerDocument,
                p = e ? e.nodeType : 9;
            if (n = n || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return n;
            if (!r && (T(e), e = e || C, E)) {
                if (11 !== p && (u = Z.exec(t)))
                    if (i = u[1]) {
                        if (9 === p) {
                            if (!(a = e.getElementById(i))) return n;
                            if (a.id === i) return n.push(a), n
                        } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i) return n.push(a), n
                    } else {
                        if (u[2]) return H.apply(n, e.getElementsByTagName(t)), n;
                        if ((i = u[3]) && d.getElementsByClassName && e.getElementsByClassName) return H.apply(n, e.getElementsByClassName(i)), n
                    } if (d.qsa && !N[t + " "] && (!v || !v.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) {
                    if (c = t, f = e, 1 === p && (U.test(t) || z.test(t))) {
                        (f = ee.test(t) && ye(e.parentNode) || e) === e && d.scope || ((s = e.getAttribute("id")) ? s = s.replace(re, ie) : e.setAttribute("id", s = S)), o = (l = h(t)).length;
                        while (o--) l[o] = (s ? "#" + s : ":scope") + " " + xe(l[o]);
                        c = l.join(",")
                    }
                    try {
                        return H.apply(n, f.querySelectorAll(c)), n
                    } catch (e) {
                        N(t, !0)
                    } finally {
                        s === S && e.removeAttribute("id")
                    }
                }
            }
            return g(t.replace($, "$1"), e, n, r)
        }

        function ue() {
            var r = [];
            return function e(t, n) {
                return r.push(t + " ") > b.cacheLength && delete e[r.shift()], e[t + " "] = n
            }
        }

        function le(e) {
            return e[S] = !0, e
        }

        function ce(e) {
            var t = C.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function fe(e, t) {
            var n = e.split("|"),
                r = n.length;
            while (r--) b.attrHandle[n[r]] = t
        }

        function pe(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (n)
                while (n = n.nextSibling)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function de(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }

        function he(n) {
            return function(e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n
            }
        }

        function ge(t) {
            return function(e) {
                return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ae(e) === t : e.disabled === t : "label" in e && e.disabled === t
            }
        }

        function ve(a) {
            return le(function(o) {
                return o = +o, le(function(e, t) {
                    var n, r = a([], e.length, o),
                        i = r.length;
                    while (i--) e[n = r[i]] && (e[n] = !(t[n] = e[n]))
                })
            })
        }

        function ye(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        for (e in d = se.support = {}, i = se.isXML = function(e) {
                var t = e.namespaceURI,
                    n = (e.ownerDocument || e).documentElement;
                return !Y.test(t || n && n.nodeName || "HTML")
            }, T = se.setDocument = function(e) {
                var t, n, r = e ? e.ownerDocument || e : p;
                return r != C && 9 === r.nodeType && r.documentElement && (a = (C = r).documentElement, E = !i(C), p != C && (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", oe, !1) : n.attachEvent && n.attachEvent("onunload", oe)), d.scope = ce(function(e) {
                    return a.appendChild(e).appendChild(C.createElement("div")), "undefined" != typeof e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
                }), d.attributes = ce(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), d.getElementsByTagName = ce(function(e) {
                    return e.appendChild(C.createComment("")), !e.getElementsByTagName("*").length
                }), d.getElementsByClassName = K.test(C.getElementsByClassName), d.getById = ce(function(e) {
                    return a.appendChild(e).id = S, !C.getElementsByName || !C.getElementsByName(S).length
                }), d.getById ? (b.filter.ID = function(e) {
                    var t = e.replace(te, ne);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }, b.find.ID = function(e, t) {
                    if ("undefined" != typeof t.getElementById && E) {
                        var n = t.getElementById(e);
                        return n ? [n] : []
                    }
                }) : (b.filter.ID = function(e) {
                    var n = e.replace(te, ne);
                    return function(e) {
                        var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                        return t && t.value === n
                    }
                }, b.find.ID = function(e, t) {
                    if ("undefined" != typeof t.getElementById && E) {
                        var n, r, i, o = t.getElementById(e);
                        if (o) {
                            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                            i = t.getElementsByName(e), r = 0;
                            while (o = i[r++])
                                if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                        }
                        return []
                    }
                }), b.find.TAG = d.getElementsByTagName ? function(e, t) {
                    return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var n, r = [],
                        i = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        while (n = o[i++]) 1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }, b.find.CLASS = d.getElementsByClassName && function(e, t) {
                    if ("undefined" != typeof t.getElementsByClassName && E) return t.getElementsByClassName(e)
                }, s = [], v = [], (d.qsa = K.test(C.querySelectorAll)) && (ce(function(e) {
                    var t;
                    a.appendChild(e).innerHTML = "<a id='" + S + "'></a><select id='" + S + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll("[id~=" + S + "-]").length || v.push("~="), (t = C.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || v.push("\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + S + "+*").length || v.push(".#.+[+~]"), e.querySelectorAll("\\\f"), v.push("[\\r\\n\\f]")
                }), ce(function(e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = C.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
                })), (d.matchesSelector = K.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ce(function(e) {
                    d.disconnectedMatch = c.call(e, "*"), c.call(e, "[s!='']:x"), s.push("!=", F)
                }), v = v.length && new RegExp(v.join("|")), s = s.length && new RegExp(s.join("|")), t = K.test(a.compareDocumentPosition), y = t || K.test(a.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                } : function(e, t) {
                    if (t)
                        while (t = t.parentNode)
                            if (t === e) return !0;
                    return !1
                }, D = t ? function(e, t) {
                    if (e === t) return l = !0, 0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e == C || e.ownerDocument == p && y(p, e) ? -1 : t == C || t.ownerDocument == p && y(p, t) ? 1 : u ? P(u, e) - P(u, t) : 0 : 4 & n ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return l = !0, 0;
                    var n, r = 0,
                        i = e.parentNode,
                        o = t.parentNode,
                        a = [e],
                        s = [t];
                    if (!i || !o) return e == C ? -1 : t == C ? 1 : i ? -1 : o ? 1 : u ? P(u, e) - P(u, t) : 0;
                    if (i === o) return pe(e, t);
                    n = e;
                    while (n = n.parentNode) a.unshift(n);
                    n = t;
                    while (n = n.parentNode) s.unshift(n);
                    while (a[r] === s[r]) r++;
                    return r ? pe(a[r], s[r]) : a[r] == p ? -1 : s[r] == p ? 1 : 0
                }), C
            }, se.matches = function(e, t) {
                return se(e, null, null, t)
            }, se.matchesSelector = function(e, t) {
                if (T(e), d.matchesSelector && E && !N[t + " "] && (!s || !s.test(t)) && (!v || !v.test(t))) try {
                    var n = c.call(e, t);
                    if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
                } catch (e) {
                    N(t, !0)
                }
                return 0 < se(t, C, null, [e]).length
            }, se.contains = function(e, t) {
                return (e.ownerDocument || e) != C && T(e), y(e, t)
            }, se.attr = function(e, t) {
                (e.ownerDocument || e) != C && T(e);
                var n = b.attrHandle[t.toLowerCase()],
                    r = n && j.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
                return void 0 !== r ? r : d.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }, se.escape = function(e) {
                return (e + "").replace(re, ie)
            }, se.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, se.uniqueSort = function(e) {
                var t, n = [],
                    r = 0,
                    i = 0;
                if (l = !d.detectDuplicates, u = !d.sortStable && e.slice(0), e.sort(D), l) {
                    while (t = e[i++]) t === e[i] && (r = n.push(i));
                    while (r--) e.splice(n[r], 1)
                }
                return u = null, e
            }, o = se.getText = function(e) {
                var t, n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
                    } else if (3 === i || 4 === i) return e.nodeValue
                } else
                    while (t = e[r++]) n += o(t);
                return n
            }, (b = se.selectors = {
                cacheLength: 50,
                createPseudo: le,
                match: G,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(te, ne).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = m[e + " "];
                        return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && m(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(n, r, i) {
                        return function(e) {
                            var t = se.attr(e, n);
                            return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(B, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"))
                        }
                    },
                    CHILD: function(h, e, t, g, v) {
                        var y = "nth" !== h.slice(0, 3),
                            m = "last" !== h.slice(-4),
                            x = "of-type" === e;
                        return 1 === g && 0 === v ? function(e) {
                            return !!e.parentNode
                        } : function(e, t, n) {
                            var r, i, o, a, s, u, l = y !== m ? "nextSibling" : "previousSibling",
                                c = e.parentNode,
                                f = x && e.nodeName.toLowerCase(),
                                p = !n && !x,
                                d = !1;
                            if (c) {
                                if (y) {
                                    while (l) {
                                        a = e;
                                        while (a = a[l])
                                            if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) return !1;
                                        u = l = "only" === h && !u && "nextSibling"
                                    }
                                    return !0
                                }
                                if (u = [m ? c.firstChild : c.lastChild], m && p) {
                                    d = (s = (r = (i = (o = (a = c)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]) && r[2], a = s && c.childNodes[s];
                                    while (a = ++s && a && a[l] || (d = s = 0) || u.pop())
                                        if (1 === a.nodeType && ++d && a === e) {
                                            i[h] = [k, s, d];
                                            break
                                        }
                                } else if (p && (d = s = (r = (i = (o = (a = e)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]), !1 === d)
                                    while (a = ++s && a && a[l] || (d = s = 0) || u.pop())
                                        if ((x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) && ++d && (p && ((i = (o = a[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [k, d]), a === e)) break;
                                return (d -= v) === g || d % g == 0 && 0 <= d / g
                            }
                        }
                    },
                    PSEUDO: function(e, o) {
                        var t, a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                        return a[S] ? a(o) : 1 < a.length ? (t = [e, e, "", o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? le(function(e, t) {
                            var n, r = a(e, o),
                                i = r.length;
                            while (i--) e[n = P(e, r[i])] = !(t[n] = r[i])
                        }) : function(e) {
                            return a(e, 0, t)
                        }) : a
                    }
                },
                pseudos: {
                    not: le(function(e) {
                        var r = [],
                            i = [],
                            s = f(e.replace($, "$1"));
                        return s[S] ? le(function(e, t, n, r) {
                            var i, o = s(e, null, r, []),
                                a = e.length;
                            while (a--)(i = o[a]) && (e[a] = !(t[a] = i))
                        }) : function(e, t, n) {
                            return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop()
                        }
                    }),
                    has: le(function(t) {
                        return function(e) {
                            return 0 < se(t, e).length
                        }
                    }),
                    contains: le(function(t) {
                        return t = t.replace(te, ne),
                            function(e) {
                                return -1 < (e.textContent || o(e)).indexOf(t)
                            }
                    }),
                    lang: le(function(n) {
                        return V.test(n || "") || se.error("unsupported lang: " + n), n = n.replace(te, ne).toLowerCase(),
                            function(e) {
                                var t;
                                do {
                                    if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var t = n.location && n.location.hash;
                        return t && t.slice(1) === e.id
                    },
                    root: function(e) {
                        return e === a
                    },
                    focus: function(e) {
                        return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: ge(!1),
                    disabled: ge(!0),
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !b.pseudos.empty(e)
                    },
                    header: function(e) {
                        return J.test(e.nodeName)
                    },
                    input: function(e) {
                        return Q.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: ve(function() {
                        return [0]
                    }),
                    last: ve(function(e, t) {
                        return [t - 1]
                    }),
                    eq: ve(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: ve(function(e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: ve(function(e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: ve(function(e, t, n) {
                        for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;) e.push(r);
                        return e
                    }),
                    gt: ve(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                        return e
                    })
                }
            }).pseudos.nth = b.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) b.pseudos[e] = de(e);
        for (e in {
                submit: !0,
                reset: !0
            }) b.pseudos[e] = he(e);

        function me() {}

        function xe(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r
        }

        function be(s, e, t) {
            var u = e.dir,
                l = e.next,
                c = l || u,
                f = t && "parentNode" === c,
                p = r++;
            return e.first ? function(e, t, n) {
                while (e = e[u])
                    if (1 === e.nodeType || f) return s(e, t, n);
                return !1
            } : function(e, t, n) {
                var r, i, o, a = [k, p];
                if (n) {
                    while (e = e[u])
                        if ((1 === e.nodeType || f) && s(e, t, n)) return !0
                } else
                    while (e = e[u])
                        if (1 === e.nodeType || f)
                            if (i = (o = e[S] || (e[S] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase()) e = e[u] || e;
                            else {
                                if ((r = i[c]) && r[0] === k && r[1] === p) return a[2] = r[2];
                                if ((i[c] = a)[2] = s(e, t, n)) return !0
                            } return !1
            }
        }

        function we(i) {
            return 1 < i.length ? function(e, t, n) {
                var r = i.length;
                while (r--)
                    if (!i[r](e, t, n)) return !1;
                return !0
            } : i[0]
        }

        function Te(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
            return a
        }

        function Ce(d, h, g, v, y, e) {
            return v && !v[S] && (v = Ce(v)), y && !y[S] && (y = Ce(y, e)), le(function(e, t, n, r) {
                var i, o, a, s = [],
                    u = [],
                    l = t.length,
                    c = e || function(e, t, n) {
                        for (var r = 0, i = t.length; r < i; r++) se(e, t[r], n);
                        return n
                    }(h || "*", n.nodeType ? [n] : n, []),
                    f = !d || !e && h ? c : Te(c, s, d, n, r),
                    p = g ? y || (e ? d : l || v) ? [] : t : f;
                if (g && g(f, p, n, r), v) {
                    i = Te(p, u), v(i, [], n, r), o = i.length;
                    while (o--)(a = i[o]) && (p[u[o]] = !(f[u[o]] = a))
                }
                if (e) {
                    if (y || d) {
                        if (y) {
                            i = [], o = p.length;
                            while (o--)(a = p[o]) && i.push(f[o] = a);
                            y(null, p = [], i, r)
                        }
                        o = p.length;
                        while (o--)(a = p[o]) && -1 < (i = y ? P(e, a) : s[o]) && (e[i] = !(t[i] = a))
                    }
                } else p = Te(p === t ? p.splice(l, p.length) : p), y ? y(null, t, p, r) : H.apply(t, p)
            })
        }

        function Ee(e) {
            for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = be(function(e) {
                    return e === i
                }, a, !0), l = be(function(e) {
                    return -1 < P(i, e)
                }, a, !0), c = [function(e, t, n) {
                    var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
                    return i = null, r
                }]; s < r; s++)
                if (t = b.relative[e[s].type]) c = [be(we(c), t)];
                else {
                    if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
                        for (n = ++s; n < r; n++)
                            if (b.relative[e[n].type]) break;
                        return Ce(1 < s && we(c), 1 < s && xe(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace($, "$1"), t, s < n && Ee(e.slice(s, n)), n < r && Ee(e = e.slice(n)), n < r && xe(e))
                    }
                    c.push(t)
                } return we(c)
        }
        return me.prototype = b.filters = b.pseudos, b.setFilters = new me, h = se.tokenize = function(e, t) {
            var n, r, i, o, a, s, u, l = x[e + " "];
            if (l) return t ? 0 : l.slice(0);
            a = e, s = [], u = b.preFilter;
            while (a) {
                for (o in n && !(r = _.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = z.exec(a)) && (n = r.shift(), i.push({
                        value: n,
                        type: r[0].replace($, " ")
                    }), a = a.slice(n.length)), b.filter) !(r = G[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({
                    value: n,
                    type: o,
                    matches: r
                }), a = a.slice(n.length));
                if (!n) break
            }
            return t ? a.length : a ? se.error(e) : x(e, s).slice(0)
        }, f = se.compile = function(e, t) {
            var n, v, y, m, x, r, i = [],
                o = [],
                a = A[e + " "];
            if (!a) {
                t || (t = h(e)), n = t.length;
                while (n--)(a = Ee(t[n]))[S] ? i.push(a) : o.push(a);
                (a = A(e, (v = o, m = 0 < (y = i).length, x = 0 < v.length, r = function(e, t, n, r, i) {
                    var o, a, s, u = 0,
                        l = "0",
                        c = e && [],
                        f = [],
                        p = w,
                        d = e || x && b.find.TAG("*", i),
                        h = k += null == p ? 1 : Math.random() || .1,
                        g = d.length;
                    for (i && (w = t == C || t || i); l !== g && null != (o = d[l]); l++) {
                        if (x && o) {
                            a = 0, t || o.ownerDocument == C || (T(o), n = !E);
                            while (s = v[a++])
                                if (s(o, t || C, n)) {
                                    r.push(o);
                                    break
                                } i && (k = h)
                        }
                        m && ((o = !s && o) && u--, e && c.push(o))
                    }
                    if (u += l, m && l !== u) {
                        a = 0;
                        while (s = y[a++]) s(c, f, t, n);
                        if (e) {
                            if (0 < u)
                                while (l--) c[l] || f[l] || (f[l] = q.call(r));
                            f = Te(f)
                        }
                        H.apply(r, f), i && !e && 0 < f.length && 1 < u + y.length && se.uniqueSort(r)
                    }
                    return i && (k = h, w = p), c
                }, m ? le(r) : r))).selector = e
            }
            return a
        }, g = se.select = function(e, t, n, r) {
            var i, o, a, s, u, l = "function" == typeof e && e,
                c = !r && h(e = l.selector || e);
            if (n = n || [], 1 === c.length) {
                if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && b.relative[o[1].type]) {
                    if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0])) return n;
                    l && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                i = G.needsContext.test(e) ? 0 : o.length;
                while (i--) {
                    if (a = o[i], b.relative[s = a.type]) break;
                    if ((u = b.find[s]) && (r = u(a.matches[0].replace(te, ne), ee.test(o[0].type) && ye(t.parentNode) || t))) {
                        if (o.splice(i, 1), !(e = r.length && xe(o))) return H.apply(n, r), n;
                        break
                    }
                }
            }
            return (l || f(e, c))(r, t, !E, n, !t || ee.test(e) && ye(t.parentNode) || t), n
        }, d.sortStable = S.split("").sort(D).join("") === S, d.detectDuplicates = !!l, T(), d.sortDetached = ce(function(e) {
            return 1 & e.compareDocumentPosition(C.createElement("fieldset"))
        }), ce(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || fe("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), d.attributes && ce(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || fe("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), ce(function(e) {
            return null == e.getAttribute("disabled")
        }) || fe(R, function(e, t, n) {
            var r;
            if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), se
    }(C);
    S.find = d, S.expr = d.selectors, S.expr[":"] = S.expr.pseudos, S.uniqueSort = S.unique = d.uniqueSort, S.text = d.getText, S.isXMLDoc = d.isXML, S.contains = d.contains, S.escapeSelector = d.escape;
    var h = function(e, t, n) {
            var r = [],
                i = void 0 !== n;
            while ((e = e[t]) && 9 !== e.nodeType)
                if (1 === e.nodeType) {
                    if (i && S(e).is(n)) break;
                    r.push(e)
                } return r
        },
        T = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        k = S.expr.match.needsContext;

    function A(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

    function D(e, n, r) {
        return m(n) ? S.grep(e, function(e, t) {
            return !!n.call(e, t, e) !== r
        }) : n.nodeType ? S.grep(e, function(e) {
            return e === n !== r
        }) : "string" != typeof n ? S.grep(e, function(e) {
            return -1 < i.call(n, e) !== r
        }) : S.filter(n, e, r)
    }
    S.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? S.find.matchesSelector(r, e) ? [r] : [] : S.find.matches(e, S.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, S.fn.extend({
        find: function(e) {
            var t, n, r = this.length,
                i = this;
            if ("string" != typeof e) return this.pushStack(S(e).filter(function() {
                for (t = 0; t < r; t++)
                    if (S.contains(i[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; t < r; t++) S.find(e, i[t], n);
            return 1 < r ? S.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(D(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(D(this, e || [], !0))
        },
        is: function(e) {
            return !!D(this, "string" == typeof e && k.test(e) ? S(e) : e || [], !1).length
        }
    });
    var j, q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (S.fn.init = function(e, t, n) {
        var r, i;
        if (!e) return this;
        if (n = n || j, "string" == typeof e) {
            if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : q.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof S ? t[0] : t, S.merge(this, S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)), N.test(r[1]) && S.isPlainObject(t))
                    for (r in t) m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return (i = E.getElementById(r[2])) && (this[0] = i, this.length = 1), this
        }
        return e.nodeType ? (this[0] = e, this.length = 1, this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(S) : S.makeArray(e, this)
    }).prototype = S.fn, j = S(E);
    var L = /^(?:parents|prev(?:Until|All))/,
        H = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };

    function O(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType);
        return e
    }
    S.fn.extend({
        has: function(e) {
            var t = S(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (S.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                o = [],
                a = "string" != typeof e && S(e);
            if (!k.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && S.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        } return this.pushStack(1 < o.length ? S.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? i.call(S(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), S.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return h(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return h(e, "parentNode", n)
        },
        next: function(e) {
            return O(e, "nextSibling")
        },
        prev: function(e) {
            return O(e, "previousSibling")
        },
        nextAll: function(e) {
            return h(e, "nextSibling")
        },
        prevAll: function(e) {
            return h(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return h(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return h(e, "previousSibling", n)
        },
        siblings: function(e) {
            return T((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return T(e.firstChild)
        },
        contents: function(e) {
            return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (A(e, "template") && (e = e.content || e), S.merge([], e.childNodes))
        }
    }, function(r, i) {
        S.fn[r] = function(e, t) {
            var n = S.map(this, i, e);
            return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = S.filter(t, n)), 1 < this.length && (H[r] || S.uniqueSort(n), L.test(r) && n.reverse()), this.pushStack(n)
        }
    });
    var P = /[^\x20\t\r\n\f]+/g;

    function R(e) {
        return e
    }

    function M(e) {
        throw e
    }

    function I(e, t, n, r) {
        var i;
        try {
            e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    S.Callbacks = function(r) {
        var e, n;
        r = "string" == typeof r ? (e = r, n = {}, S.each(e.match(P) || [], function(e, t) {
            n[t] = !0
        }), n) : S.extend({}, r);
        var i, t, o, a, s = [],
            u = [],
            l = -1,
            c = function() {
                for (a = a || r.once, o = i = !0; u.length; l = -1) {
                    t = u.shift();
                    while (++l < s.length) !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length, t = !1)
                }
                r.memory || (t = !1), i = !1, a && (s = t ? [] : "")
            },
            f = {
                add: function() {
                    return s && (t && !i && (l = s.length - 1, u.push(t)), function n(e) {
                        S.each(e, function(e, t) {
                            m(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== w(t) && n(t)
                        })
                    }(arguments), t && !i && c()), this
                },
                remove: function() {
                    return S.each(arguments, function(e, t) {
                        var n;
                        while (-1 < (n = S.inArray(t, s, n))) s.splice(n, 1), n <= l && l--
                    }), this
                },
                has: function(e) {
                    return e ? -1 < S.inArray(e, s) : 0 < s.length
                },
                empty: function() {
                    return s && (s = []), this
                },
                disable: function() {
                    return a = u = [], s = t = "", this
                },
                disabled: function() {
                    return !s
                },
                lock: function() {
                    return a = u = [], t || i || (s = t = ""), this
                },
                locked: function() {
                    return !!a
                },
                fireWith: function(e, t) {
                    return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), i || c()), this
                },
                fire: function() {
                    return f.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!o
                }
            };
        return f
    }, S.extend({
        Deferred: function(e) {
            var o = [
                    ["notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2],
                    ["resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected"]
                ],
                i = "pending",
                a = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return s.done(arguments).fail(arguments), this
                    },
                    "catch": function(e) {
                        return a.then(null, e)
                    },
                    pipe: function() {
                        var i = arguments;
                        return S.Deferred(function(r) {
                            S.each(o, function(e, t) {
                                var n = m(i[t[4]]) && i[t[4]];
                                s[t[1]](function() {
                                    var e = n && n.apply(this, arguments);
                                    e && m(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
                                })
                            }), i = null
                        }).promise()
                    },
                    then: function(t, n, r) {
                        var u = 0;

                        function l(i, o, a, s) {
                            return function() {
                                var n = this,
                                    r = arguments,
                                    e = function() {
                                        var e, t;
                                        if (!(i < u)) {
                                            if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution");
                                            t = e && ("object" == typeof e || "function" == typeof e) && e.then, m(t) ? s ? t.call(e, l(u, o, R, s), l(u, o, M, s)) : (u++, t.call(e, l(u, o, R, s), l(u, o, M, s), l(u, o, R, o.notifyWith))) : (a !== R && (n = void 0, r = [e]), (s || o.resolveWith)(n, r))
                                        }
                                    },
                                    t = s ? e : function() {
                                        try {
                                            e()
                                        } catch (e) {
                                            S.Deferred.exceptionHook && S.Deferred.exceptionHook(e, t.stackTrace), u <= i + 1 && (a !== M && (n = void 0, r = [e]), o.rejectWith(n, r))
                                        }
                                    };
                                i ? t() : (S.Deferred.getStackHook && (t.stackTrace = S.Deferred.getStackHook()), C.setTimeout(t))
                            }
                        }
                        return S.Deferred(function(e) {
                            o[0][3].add(l(0, e, m(r) ? r : R, e.notifyWith)), o[1][3].add(l(0, e, m(t) ? t : R)), o[2][3].add(l(0, e, m(n) ? n : M))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? S.extend(e, a) : a
                    }
                },
                s = {};
            return S.each(o, function(e, t) {
                var n = t[2],
                    r = t[5];
                a[t[1]] = n.add, r && n.add(function() {
                    i = r
                }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), s[t[0]] = function() {
                    return s[t[0] + "With"](this === s ? void 0 : this, arguments), this
                }, s[t[0] + "With"] = n.fireWith
            }), a.promise(s), e && e.call(s, s), s
        },
        when: function(e) {
            var n = arguments.length,
                t = n,
                r = Array(t),
                i = s.call(arguments),
                o = S.Deferred(),
                a = function(t) {
                    return function(e) {
                        r[t] = this, i[t] = 1 < arguments.length ? s.call(arguments) : e, --n || o.resolveWith(r, i)
                    }
                };
            if (n <= 1 && (I(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || m(i[t] && i[t].then))) return o.then();
            while (t--) I(i[t], a(t), o.reject);
            return o.promise()
        }
    });
    var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    S.Deferred.exceptionHook = function(e, t) {
        C.console && C.console.warn && e && W.test(e.name) && C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
    }, S.readyException = function(e) {
        C.setTimeout(function() {
            throw e
        })
    };
    var F = S.Deferred();

    function B() {
        E.removeEventListener("DOMContentLoaded", B), C.removeEventListener("load", B), S.ready()
    }
    S.fn.ready = function(e) {
        return F.then(e)["catch"](function(e) {
            S.readyException(e)
        }), this
    }, S.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --S.readyWait : S.isReady) || (S.isReady = !0) !== e && 0 < --S.readyWait || F.resolveWith(E, [S])
        }
    }), S.ready.then = F.then, "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? C.setTimeout(S.ready) : (E.addEventListener("DOMContentLoaded", B), C.addEventListener("load", B));
    var $ = function(e, t, n, r, i, o, a) {
            var s = 0,
                u = e.length,
                l = null == n;
            if ("object" === w(n))
                for (s in i = !0, n) $(e, t, s, n[s], !0, o, a);
            else if (void 0 !== r && (i = !0, m(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                    return l.call(S(e), n)
                })), t))
                for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        },
        _ = /^-ms-/,
        z = /-([a-z])/g;

    function U(e, t) {
        return t.toUpperCase()
    }

    function X(e) {
        return e.replace(_, "ms-").replace(z, U)
    }
    var V = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };

    function G() {
        this.expando = S.expando + G.uid++
    }
    G.uid = 1, G.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t) i[X(t)] = n;
            else
                for (r in t) i[X(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(X) : (t = X(t)) in r ? [t] : t.match(P) || []).length;
                    while (n--) delete r[t[n]]
                }(void 0 === t || S.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !S.isEmptyObject(t)
        }
    };
    var Y = new G,
        Q = new G,
        J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        K = /[A-Z]/g;

    function Z(e, t, n) {
        var r, i;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(K, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
                try {
                    n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : J.test(i) ? JSON.parse(i) : i)
                } catch (e) {}
                Q.set(e, t, n)
            } else n = void 0;
        return n
    }
    S.extend({
        hasData: function(e) {
            return Q.hasData(e) || Y.hasData(e)
        },
        data: function(e, t, n) {
            return Q.access(e, t, n)
        },
        removeData: function(e, t) {
            Q.remove(e, t)
        },
        _data: function(e, t, n) {
            return Y.access(e, t, n)
        },
        _removeData: function(e, t) {
            Y.remove(e, t)
        }
    }), S.fn.extend({
        data: function(n, e) {
            var t, r, i, o = this[0],
                a = o && o.attributes;
            if (void 0 === n) {
                if (this.length && (i = Q.get(o), 1 === o.nodeType && !Y.get(o, "hasDataAttrs"))) {
                    t = a.length;
                    while (t--) a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = X(r.slice(5)), Z(o, r, i[r]));
                    Y.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof n ? this.each(function() {
                Q.set(this, n)
            }) : $(this, function(e) {
                var t;
                if (o && void 0 === e) return void 0 !== (t = Q.get(o, n)) ? t : void 0 !== (t = Z(o, n)) ? t : void 0;
                this.each(function() {
                    Q.set(this, n, e)
                })
            }, null, e, 1 < arguments.length, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                Q.remove(this, e)
            })
        }
    }), S.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = Y.get(e, t), n && (!r || Array.isArray(n) ? r = Y.access(e, t, S.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = S.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = S._queueHooks(e, t);
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function() {
                S.dequeue(e, t)
            }, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Y.get(e, n) || Y.access(e, n, {
                empty: S.Callbacks("once memory").add(function() {
                    Y.remove(e, [t + "queue", n])
                })
            })
        }
    }), S.fn.extend({
        queue: function(t, n) {
            var e = 2;
            return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? S.queue(this[0], t) : void 0 === n ? this : this.each(function() {
                var e = S.queue(this, t, n);
                S._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && S.dequeue(this, t)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                S.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = S.Deferred(),
                o = this,
                a = this.length,
                s = function() {
                    --r || i.resolveWith(o, [o])
                };
            "string" != typeof e && (t = e, e = void 0), e = e || "fx";
            while (a--)(n = Y.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
        ne = ["Top", "Right", "Bottom", "Left"],
        re = E.documentElement,
        ie = function(e) {
            return S.contains(e.ownerDocument, e)
        },
        oe = {
            composed: !0
        };
    re.getRootNode && (ie = function(e) {
        return S.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument
    });
    var ae = function(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === S.css(e, "display")
    };

    function se(e, t, n, r) {
        var i, o, a = 20,
            s = r ? function() {
                return r.cur()
            } : function() {
                return S.css(e, t, "")
            },
            u = s(),
            l = n && n[3] || (S.cssNumber[t] ? "" : "px"),
            c = e.nodeType && (S.cssNumber[t] || "px" !== l && +u) && te.exec(S.css(e, t));
        if (c && c[3] !== l) {
            u /= 2, l = l || c[3], c = +u || 1;
            while (a--) S.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
            c *= 2, S.style(e, t, c + l), n = n || []
        }
        return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
    }
    var ue = {};

    function le(e, t) {
        for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)(r = e[c]).style && (n = r.style.display, t ? ("none" === n && (l[c] = Y.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && ae(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, s = i.nodeName, (u = ue[s]) || (o = a.body.appendChild(a.createElement(s)), u = S.css(o, "display"), o.parentNode.removeChild(o), "none" === u && (u = "block"), ue[s] = u)))) : "none" !== n && (l[c] = "none", Y.set(r, "display", n)));
        for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
        return e
    }
    S.fn.extend({
        show: function() {
            return le(this, !0)
        },
        hide: function() {
            return le(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                ae(this) ? S(this).show() : S(this).hide()
            })
        }
    });
    var ce, fe, pe = /^(?:checkbox|radio)$/i,
        de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        he = /^$|^module$|\/(?:java|ecma)script/i;
    ce = E.createDocumentFragment().appendChild(E.createElement("div")), (fe = E.createElement("input")).setAttribute("type", "radio"), fe.setAttribute("checked", "checked"), fe.setAttribute("name", "t"), ce.appendChild(fe), y.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked, ce.innerHTML = "<textarea>x</textarea>", y.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue, ce.innerHTML = "<option></option>", y.option = !!ce.lastChild;
    var ge = {
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };

    function ve(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && A(e, t) ? S.merge([e], n) : n
    }

    function ye(e, t) {
        for (var n = 0, r = e.length; n < r; n++) Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"))
    }
    ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td, y.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]);
    var me = /<|&#?\w+;/;

    function xe(e, t, n, r, i) {
        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
            if ((o = e[d]) || 0 === o)
                if ("object" === w(o)) S.merge(p, o.nodeType ? [o] : o);
                else if (me.test(o)) {
            a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + S.htmlPrefilter(o) + u[2], c = u[0];
            while (c--) a = a.lastChild;
            S.merge(p, a.childNodes), (a = f.firstChild).textContent = ""
        } else p.push(t.createTextNode(o));
        f.textContent = "", d = 0;
        while (o = p[d++])
            if (r && -1 < S.inArray(o, r)) i && i.push(o);
            else if (l = ie(o), a = ve(f.appendChild(o), "script"), l && ye(a), n) {
            c = 0;
            while (o = a[c++]) he.test(o.type || "") && n.push(o)
        }
        return f
    }
    var be = /^key/,
        we = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Te = /^([^.]*)(?:\.(.+)|)/;

    function Ce() {
        return !0
    }

    function Ee() {
        return !1
    }

    function Se(e, t) {
        return e === function() {
            try {
                return E.activeElement
            } catch (e) {}
        }() == ("focus" === t)
    }

    function ke(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (r = r || n, n = void 0), t) ke(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = Ee;
        else if (!i) return e;
        return 1 === o && (a = i, (i = function(e) {
            return S().off(e), a.apply(this, arguments)
        }).guid = a.guid || (a.guid = S.guid++)), e.each(function() {
            S.event.add(this, t, i, r, n)
        })
    }

    function Ae(e, i, o) {
        o ? (Y.set(e, i, !1), S.event.add(e, i, {
            namespace: !1,
            handler: function(e) {
                var t, n, r = Y.get(this, i);
                if (1 & e.isTrigger && this[i]) {
                    if (r.length)(S.event.special[i] || {}).delegateType && e.stopPropagation();
                    else if (r = s.call(arguments), Y.set(this, i, r), t = o(this, i), this[i](), r !== (n = Y.get(this, i)) || t ? Y.set(this, i, !1) : n = {}, r !== n) return e.stopImmediatePropagation(), e.preventDefault(), n.value
                } else r.length && (Y.set(this, i, {
                    value: S.event.trigger(S.extend(r[0], S.Event.prototype), r.slice(1), this)
                }), e.stopImmediatePropagation())
            }
        })) : void 0 === Y.get(e, i) && S.event.add(e, i, Ce)
    }
    S.event = {
        global: {},
        add: function(t, e, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = Y.get(t);
            if (V(t)) {
                n.handler && (n = (o = n).handler, i = o.selector), i && S.find.matchesSelector(re, i), n.guid || (n.guid = S.guid++), (u = v.events) || (u = v.events = Object.create(null)), (a = v.handle) || (a = v.handle = function(e) {
                    return "undefined" != typeof S && S.event.triggered !== e.type ? S.event.dispatch.apply(t, arguments) : void 0
                }), l = (e = (e || "").match(P) || [""]).length;
                while (l--) d = g = (s = Te.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = S.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = S.event.special[d] || {}, c = S.extend({
                    type: d,
                    origType: g,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && S.expr.match.needsContext.test(i),
                    namespace: h.join(".")
                }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), S.event.global[d] = !0)
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = Y.hasData(e) && Y.get(e);
            if (v && (u = v.events)) {
                l = (t = (t || "").match(P) || [""]).length;
                while (l--)
                    if (d = g = (s = Te.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d) {
                        f = S.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;
                        while (o--) c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                        a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || S.removeEvent(e, d, v.handle), delete u[d])
                    } else
                        for (d in u) S.event.remove(e, d + t[l], n, r, !0);
                S.isEmptyObject(u) && Y.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, r, i, o, a, s = new Array(arguments.length),
                u = S.event.fix(e),
                l = (Y.get(this, "events") || Object.create(null))[u.type] || [],
                c = S.event.special[u.type] || {};
            for (s[0] = u, t = 1; t < arguments.length; t++) s[t] = arguments[t];
            if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
                a = S.event.handlers.call(this, u, l), t = 0;
                while ((i = a[t++]) && !u.isPropagationStopped()) {
                    u.currentTarget = i.elem, n = 0;
                    while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped()) u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, u.data = o.data, void 0 !== (r = ((S.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation()))
                }
                return c.postDispatch && c.postDispatch.call(this, u), u.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a, s = [],
                u = t.delegateCount,
                l = e.target;
            if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                        for (o = [], a = {}, n = 0; n < u; n++) void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < S(i, this).index(l) : S.find(i, this, null, [l]).length), a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        })
                    } return l = this, u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }), s
        },
        addProp: function(t, e) {
            Object.defineProperty(S.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: m(e) ? function() {
                    if (this.originalEvent) return e(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[t]
                },
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function(e) {
            return e[S.expando] ? e : new S.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && A(t, "input") && Ae(t, "click", Ce), !1
                },
                trigger: function(e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && A(t, "input") && Ae(t, "click"), !0
                },
                _default: function(e) {
                    var t = e.target;
                    return pe.test(t.type) && t.click && A(t, "input") && Y.get(t, "click") || A(t, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, S.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, S.Event = function(e, t) {
        if (!(this instanceof S.Event)) return new S.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ce : Ee, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && S.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[S.expando] = !0
    }, S.Event.prototype = {
        constructor: S.Event,
        isDefaultPrevented: Ee,
        isPropagationStopped: Ee,
        isImmediatePropagationStopped: Ee,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = Ce, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = Ce, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = Ce, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, S.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && be.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && we.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, S.event.addProp), S.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        S.event.special[e] = {
            setup: function() {
                return Ae(this, e, Se), !1
            },
            trigger: function() {
                return Ae(this, e), !0
            },
            delegateType: t
        }
    }), S.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, i) {
        S.event.special[e] = {
            delegateType: i,
            bindType: i,
            handle: function(e) {
                var t, n = e.relatedTarget,
                    r = e.handleObj;
                return n && (n === this || S.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t
            }
        }
    }), S.fn.extend({
        on: function(e, t, n, r) {
            return ke(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return ke(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, S(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Ee), this.each(function() {
                S.event.remove(this, e, n, t)
            })
        }
    });
    var Ne = /<script|<style|<link/i,
        De = /checked\s*(?:[^=]|=\s*.checked.)/i,
        je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function qe(e, t) {
        return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && S(e).children("tbody")[0] || e
    }

    function Le(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function He(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
    }

    function Oe(e, t) {
        var n, r, i, o, a, s;
        if (1 === t.nodeType) {
            if (Y.hasData(e) && (s = Y.get(e).events))
                for (i in Y.remove(t, "handle events"), s)
                    for (n = 0, r = s[i].length; n < r; n++) S.event.add(t, i, s[i][n]);
            Q.hasData(e) && (o = Q.access(e), a = S.extend({}, o), Q.set(t, a))
        }
    }

    function Pe(n, r, i, o) {
        r = g(r);
        var e, t, a, s, u, l, c = 0,
            f = n.length,
            p = f - 1,
            d = r[0],
            h = m(d);
        if (h || 1 < f && "string" == typeof d && !y.checkClone && De.test(d)) return n.each(function(e) {
            var t = n.eq(e);
            h && (r[0] = d.call(this, e, t.html())), Pe(t, r, i, o)
        });
        if (f && (t = (e = xe(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
            for (s = (a = S.map(ve(e, "script"), Le)).length; c < f; c++) u = e, c !== p && (u = S.clone(u, !0, !0), s && S.merge(a, ve(u, "script"))), i.call(n[c], u, c);
            if (s)
                for (l = a[a.length - 1].ownerDocument, S.map(a, He), c = 0; c < s; c++) u = a[c], he.test(u.type || "") && !Y.access(u, "globalEval") && S.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? S._evalUrl && !u.noModule && S._evalUrl(u.src, {
                    nonce: u.nonce || u.getAttribute("nonce")
                }, l) : b(u.textContent.replace(je, ""), u, l))
        }
        return n
    }

    function Re(e, t, n) {
        for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || S.cleanData(ve(r)), r.parentNode && (n && ie(r) && ye(ve(r, "script")), r.parentNode.removeChild(r));
        return e
    }
    S.extend({
        htmlPrefilter: function(e) {
            return e
        },
        clone: function(e, t, n) {
            var r, i, o, a, s, u, l, c = e.cloneNode(!0),
                f = ie(e);
            if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || S.isXMLDoc(e)))
                for (a = ve(c), r = 0, i = (o = ve(e)).length; r < i; r++) s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && pe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
            if (t)
                if (n)
                    for (o = o || ve(e), a = a || ve(c), r = 0, i = o.length; r < i; r++) Oe(o[r], a[r]);
                else Oe(e, c);
            return 0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")), c
        },
        cleanData: function(e) {
            for (var t, n, r, i = S.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (V(n)) {
                    if (t = n[Y.expando]) {
                        if (t.events)
                            for (r in t.events) i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle);
                        n[Y.expando] = void 0
                    }
                    n[Q.expando] && (n[Q.expando] = void 0)
                }
        }
    }), S.fn.extend({
        detach: function(e) {
            return Re(this, e, !0)
        },
        remove: function(e) {
            return Re(this, e)
        },
        text: function(e) {
            return $(this, function(e) {
                return void 0 === e ? S.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return Pe(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || qe(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return Pe(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = qe(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return Pe(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return Pe(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (S.cleanData(ve(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return S.clone(this, e, t)
            })
        },
        html: function(e) {
            return $(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !Ne.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = S.htmlPrefilter(e);
                    try {
                        for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (S.cleanData(ve(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var n = [];
            return Pe(this, arguments, function(e) {
                var t = this.parentNode;
                S.inArray(this, n) < 0 && (S.cleanData(ve(this)), t && t.replaceChild(e, this))
            }, n)
        }
    }), S.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, a) {
        S.fn[e] = function(e) {
            for (var t, n = [], r = S(e), i = r.length - 1, o = 0; o <= i; o++) t = o === i ? this : this.clone(!0), S(r[o])[a](t), u.apply(n, t.get());
            return this.pushStack(n)
        }
    });
    var Me = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
        Ie = function(e) {
            var t = e.ownerDocument.defaultView;
            return t && t.opener || (t = C), t.getComputedStyle(e)
        },
        We = function(e, t, n) {
            var r, i, o = {};
            for (i in t) o[i] = e.style[i], e.style[i] = t[i];
            for (i in r = n.call(e), t) e.style[i] = o[i];
            return r
        },
        Fe = new RegExp(ne.join("|"), "i");

    function Be(e, t, n) {
        var r, i, o, a, s = e.style;
        return (n = n || Ie(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || ie(e) || (a = S.style(e, t)), !y.pixelBoxStyles() && Me.test(a) && Fe.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
    }

    function $e(e, t) {
        return {
            get: function() {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }! function() {
        function e() {
            if (l) {
                u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", re.appendChild(u).appendChild(l);
                var e = C.getComputedStyle(l);
                n = "1%" !== e.top, s = 12 === t(e.marginLeft), l.style.right = "60%", o = 36 === t(e.right), r = 36 === t(e.width), l.style.position = "absolute", i = 12 === t(l.offsetWidth / 3), re.removeChild(u), l = null
            }
        }

        function t(e) {
            return Math.round(parseFloat(e))
        }
        var n, r, i, o, a, s, u = E.createElement("div"),
            l = E.createElement("div");
        l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", y.clearCloneStyle = "content-box" === l.style.backgroundClip, S.extend(y, {
            boxSizingReliable: function() {
                return e(), r
            },
            pixelBoxStyles: function() {
                return e(), o
            },
            pixelPosition: function() {
                return e(), n
            },
            reliableMarginLeft: function() {
                return e(), s
            },
            scrollboxSize: function() {
                return e(), i
            },
            reliableTrDimensions: function() {
                var e, t, n, r;
                return null == a && (e = E.createElement("table"), t = E.createElement("tr"), n = E.createElement("div"), e.style.cssText = "position:absolute;left:-11111px", t.style.height = "1px", n.style.height = "9px", re.appendChild(e).appendChild(t).appendChild(n), r = C.getComputedStyle(t), a = 3 < parseInt(r.height), re.removeChild(e)), a
            }
        }))
    }();
    var _e = ["Webkit", "Moz", "ms"],
        ze = E.createElement("div").style,
        Ue = {};

    function Xe(e) {
        var t = S.cssProps[e] || Ue[e];
        return t || (e in ze ? e : Ue[e] = function(e) {
            var t = e[0].toUpperCase() + e.slice(1),
                n = _e.length;
            while (n--)
                if ((e = _e[n] + t) in ze) return e
        }(e) || e)
    }
    var Ve = /^(none|table(?!-c[ea]).+)/,
        Ge = /^--/,
        Ye = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Qe = {
            letterSpacing: "0",
            fontWeight: "400"
        };

    function Je(e, t, n) {
        var r = te.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function Ke(e, t, n, r, i, o) {
        var a = "width" === t ? 1 : 0,
            s = 0,
            u = 0;
        if (n === (r ? "border" : "content")) return 0;
        for (; a < 4; a += 2) "margin" === n && (u += S.css(e, n + ne[a], !0, i)), r ? ("content" === n && (u -= S.css(e, "padding" + ne[a], !0, i)), "margin" !== n && (u -= S.css(e, "border" + ne[a] + "Width", !0, i))) : (u += S.css(e, "padding" + ne[a], !0, i), "padding" !== n ? u += S.css(e, "border" + ne[a] + "Width", !0, i) : s += S.css(e, "border" + ne[a] + "Width", !0, i));
        return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u
    }

    function Ze(e, t, n) {
        var r = Ie(e),
            i = (!y.boxSizingReliable() || n) && "border-box" === S.css(e, "boxSizing", !1, r),
            o = i,
            a = Be(e, t, r),
            s = "offset" + t[0].toUpperCase() + t.slice(1);
        if (Me.test(a)) {
            if (!n) return a;
            a = "auto"
        }
        return (!y.boxSizingReliable() && i || !y.reliableTrDimensions() && A(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === S.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === S.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + Ke(e, t, n || (i ? "border" : "content"), o, r, a) + "px"
    }

    function et(e, t, n, r, i) {
        return new et.prototype.init(e, t, n, r, i)
    }
    S.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Be(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = X(t),
                    u = Ge.test(t),
                    l = e.style;
                if (u || (t = Xe(s)), a = S.cssHooks[t] || S.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                "string" === (o = typeof n) && (i = te.exec(n)) && i[1] && (n = se(e, t, i), o = "number"), null != n && n == n && ("number" !== o || u || (n += i && i[3] || (S.cssNumber[s] ? "" : "px")), y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = X(t);
            return Ge.test(t) || (t = Xe(s)), (a = S.cssHooks[t] || S.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Be(e, t, r)), "normal" === i && t in Qe && (i = Qe[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }), S.each(["height", "width"], function(e, u) {
        S.cssHooks[u] = {
            get: function(e, t, n) {
                if (t) return !Ve.test(S.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Ze(e, u, n) : We(e, Ye, function() {
                    return Ze(e, u, n)
                })
            },
            set: function(e, t, n) {
                var r, i = Ie(e),
                    o = !y.scrollboxSize() && "absolute" === i.position,
                    a = (o || n) && "border-box" === S.css(e, "boxSizing", !1, i),
                    s = n ? Ke(e, u, n, a, i) : 0;
                return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - Ke(e, u, "border", !1, i) - .5)), s && (r = te.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t, t = S.css(e, u)), Je(0, t, s)
            }
        }
    }), S.cssHooks.marginLeft = $e(y.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(Be(e, "marginLeft")) || e.getBoundingClientRect().left - We(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px"
    }), S.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(i, o) {
        S.cssHooks[i + o] = {
            expand: function(e) {
                for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[i + ne[t] + o] = r[t] || r[t - 2] || r[0];
                return n
            }
        }, "margin" !== i && (S.cssHooks[i + o].set = Je)
    }), S.fn.extend({
        css: function(e, t) {
            return $(this, function(e, t, n) {
                var r, i, o = {},
                    a = 0;
                if (Array.isArray(t)) {
                    for (r = Ie(e), i = t.length; a < i; a++) o[t[a]] = S.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? S.style(e, t, n) : S.css(e, t)
            }, e, t, 1 < arguments.length)
        }
    }), ((S.Tween = et).prototype = {
        constructor: et,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || S.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (S.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = et.propHooks[this.prop];
            return e && e.get ? e.get(this) : et.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = et.propHooks[this.prop];
            return this.options.duration ? this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : et.propHooks._default.set(this), this
        }
    }).init.prototype = et.prototype, (et.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                S.fx.step[e.prop] ? S.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !S.cssHooks[e.prop] && null == e.elem.style[Xe(e.prop)] ? e.elem[e.prop] = e.now : S.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = et.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, S.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, S.fx = et.prototype.init, S.fx.step = {};
    var tt, nt, rt, it, ot = /^(?:toggle|show|hide)$/,
        at = /queueHooks$/;

    function st() {
        nt && (!1 === E.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(st) : C.setTimeout(st, S.fx.interval), S.fx.tick())
    }

    function ut() {
        return C.setTimeout(function() {
            tt = void 0
        }), tt = Date.now()
    }

    function lt(e, t) {
        var n, r = 0,
            i = {
                height: e
            };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = ne[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function ct(e, t, n) {
        for (var r, i = (ft.tweeners[t] || []).concat(ft.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function ft(o, e, t) {
        var n, a, r = 0,
            i = ft.prefilters.length,
            s = S.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (a) return !1;
                for (var e = tt || ut(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++) l.tweens[r].run(n);
                return s.notifyWith(o, [l, n, t]), n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1)
            },
            l = s.promise({
                elem: o,
                props: S.extend({}, e),
                opts: S.extend(!0, {
                    specialEasing: {},
                    easing: S.easing._default
                }, t),
                originalProperties: e,
                originalOptions: t,
                startTime: tt || ut(),
                duration: t.duration,
                tweens: [],
                createTween: function(e, t) {
                    var n = S.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
                    return l.tweens.push(n), n
                },
                stop: function(e) {
                    var t = 0,
                        n = e ? l.tweens.length : 0;
                    if (a) return this;
                    for (a = !0; t < n; t++) l.tweens[t].run(1);
                    return e ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]), this
                }
            }),
            c = l.props;
        for (! function(e, t) {
                var n, r, i, o, a;
                for (n in e)
                    if (i = t[r = X(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = S.cssHooks[r]) && "expand" in a)
                        for (n in o = a.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i);
                    else t[r] = i
            }(c, l.opts.specialEasing); r < i; r++)
            if (n = ft.prefilters[r].call(l, o, c, l.opts)) return m(n.stop) && (S._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)), n;
        return S.map(c, ct, l), m(l.opts.start) && l.opts.start.call(o, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), S.fx.timer(S.extend(u, {
            elem: o,
            anim: l,
            queue: l.opts.queue
        })), l
    }
    S.Animation = S.extend(ft, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return se(n.elem, e, te.exec(t), n), n
            }]
        },
        tweener: function(e, t) {
            m(e) ? (t = e, e = ["*"]) : e = e.match(P);
            for (var n, r = 0, i = e.length; r < i; r++) n = e[r], ft.tweeners[n] = ft.tweeners[n] || [], ft.tweeners[n].unshift(t)
        },
        prefilters: [function(e, t, n) {
            var r, i, o, a, s, u, l, c, f = "width" in t || "height" in t,
                p = this,
                d = {},
                h = e.style,
                g = e.nodeType && ae(e),
                v = Y.get(e, "fxshow");
            for (r in n.queue || (null == (a = S._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                    a.unqueued || s()
                }), a.unqueued++, p.always(function() {
                    p.always(function() {
                        a.unqueued--, S.queue(e, "fx").length || a.empty.fire()
                    })
                })), t)
                if (i = t[r], ot.test(i)) {
                    if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                        if ("show" !== i || !v || void 0 === v[r]) continue;
                        g = !0
                    }
                    d[r] = v && v[r] || S.style(e, r)
                } if ((u = !S.isEmptyObject(t)) || !S.isEmptyObject(d))
                for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = v && v.display) && (l = Y.get(e, "display")), "none" === (c = S.css(e, "display")) && (l ? c = l : (le([e], !0), l = e.style.display || l, c = S.css(e, "display"), le([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === S.css(e, "float") && (u || (p.done(function() {
                        h.display = l
                    }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function() {
                        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                    })), u = !1, d) u || (v ? "hidden" in v && (g = v.hidden) : v = Y.access(e, "fxshow", {
                    display: l
                }), o && (v.hidden = !g), g && le([e], !0), p.done(function() {
                    for (r in g || le([e]), Y.remove(e, "fxshow"), d) S.style(e, r, d[r])
                })), u = ct(g ? v[r] : 0, r, p), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0))
        }],
        prefilter: function(e, t) {
            t ? ft.prefilters.unshift(e) : ft.prefilters.push(e)
        }
    }), S.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? S.extend({}, e) : {
            complete: n || !n && t || m(e) && e,
            duration: e,
            easing: n && t || t && !m(t) && t
        };
        return S.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in S.fx.speeds ? r.duration = S.fx.speeds[r.duration] : r.duration = S.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            m(r.old) && r.old.call(this), r.queue && S.dequeue(this, r.queue)
        }, r
    }, S.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(ae).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(t, e, n, r) {
            var i = S.isEmptyObject(t),
                o = S.speed(e, n, r),
                a = function() {
                    var e = ft(this, S.extend({}, t), o);
                    (i || Y.get(this, "finish")) && e.stop(!0)
                };
            return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(i, e, o) {
            var a = function(e) {
                var t = e.stop;
                delete e.stop, t(o)
            };
            return "string" != typeof i && (o = e, e = i, i = void 0), e && this.queue(i || "fx", []), this.each(function() {
                var e = !0,
                    t = null != i && i + "queueHooks",
                    n = S.timers,
                    r = Y.get(this);
                if (t) r[t] && r[t].stop && a(r[t]);
                else
                    for (t in r) r[t] && r[t].stop && at.test(t) && a(r[t]);
                for (t = n.length; t--;) n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
                !e && o || S.dequeue(this, i)
            })
        },
        finish: function(a) {
            return !1 !== a && (a = a || "fx"), this.each(function() {
                var e, t = Y.get(this),
                    n = t[a + "queue"],
                    r = t[a + "queueHooks"],
                    i = S.timers,
                    o = n ? n.length : 0;
                for (t.finish = !0, S.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;) i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1));
                for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish
            })
        }
    }), S.each(["toggle", "show", "hide"], function(e, r) {
        var i = S.fn[r];
        S.fn[r] = function(e, t, n) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(lt(r, !0), e, t, n)
        }
    }), S.each({
        slideDown: lt("show"),
        slideUp: lt("hide"),
        slideToggle: lt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, r) {
        S.fn[e] = function(e, t, n) {
            return this.animate(r, e, t, n)
        }
    }), S.timers = [], S.fx.tick = function() {
        var e, t = 0,
            n = S.timers;
        for (tt = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || S.fx.stop(), tt = void 0
    }, S.fx.timer = function(e) {
        S.timers.push(e), S.fx.start()
    }, S.fx.interval = 13, S.fx.start = function() {
        nt || (nt = !0, st())
    }, S.fx.stop = function() {
        nt = null
    }, S.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, S.fn.delay = function(r, e) {
        return r = S.fx && S.fx.speeds[r] || r, e = e || "fx", this.queue(e, function(e, t) {
            var n = C.setTimeout(e, r);
            t.stop = function() {
                C.clearTimeout(n)
            }
        })
    }, rt = E.createElement("input"), it = E.createElement("select").appendChild(E.createElement("option")), rt.type = "checkbox", y.checkOn = "" !== rt.value, y.optSelected = it.selected, (rt = E.createElement("input")).value = "t", rt.type = "radio", y.radioValue = "t" === rt.value;
    var pt, dt = S.expr.attrHandle;
    S.fn.extend({
        attr: function(e, t) {
            return $(this, S.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                S.removeAttr(this, e)
            })
        }
    }), S.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? S.prop(e, t, n) : (1 === o && S.isXMLDoc(e) || (i = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? pt : void 0)), void 0 !== n ? null === n ? void S.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = S.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!y.radioValue && "radio" === t && A(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0,
                i = t && t.match(P);
            if (i && 1 === e.nodeType)
                while (n = i[r++]) e.removeAttribute(n)
        }
    }), pt = {
        set: function(e, t, n) {
            return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, S.each(S.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var a = dt[t] || S.find.attr;
        dt[t] = function(e, t, n) {
            var r, i, o = t.toLowerCase();
            return n || (i = dt[o], dt[o] = r, r = null != a(e, t, n) ? o : null, dt[o] = i), r
        }
    });
    var ht = /^(?:input|select|textarea|button)$/i,
        gt = /^(?:a|area)$/i;

    function vt(e) {
        return (e.match(P) || []).join(" ")
    }

    function yt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function mt(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(P) || []
    }
    S.fn.extend({
        prop: function(e, t) {
            return $(this, S.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[S.propFix[e] || e]
            })
        }
    }), S.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && S.isXMLDoc(e) || (t = S.propFix[t] || t, i = S.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = S.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : ht.test(e.nodeName) || gt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), y.optSelected || (S.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        S.propFix[this.toLowerCase()] = this
    }), S.fn.extend({
        addClass: function(t) {
            var e, n, r, i, o, a, s, u = 0;
            if (m(t)) return this.each(function(e) {
                S(this).addClass(t.call(this, e, yt(this)))
            });
            if ((e = mt(t)).length)
                while (n = this[u++])
                    if (i = yt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
                        a = 0;
                        while (o = e[a++]) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        i !== (s = vt(r)) && n.setAttribute("class", s)
                    } return this
        },
        removeClass: function(t) {
            var e, n, r, i, o, a, s, u = 0;
            if (m(t)) return this.each(function(e) {
                S(this).removeClass(t.call(this, e, yt(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ((e = mt(t)).length)
                while (n = this[u++])
                    if (i = yt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
                        a = 0;
                        while (o = e[a++])
                            while (-1 < r.indexOf(" " + o + " ")) r = r.replace(" " + o + " ", " ");
                        i !== (s = vt(r)) && n.setAttribute("class", s)
                    } return this
        },
        toggleClass: function(i, t) {
            var o = typeof i,
                a = "string" === o || Array.isArray(i);
            return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : m(i) ? this.each(function(e) {
                S(this).toggleClass(i.call(this, e, yt(this), t), t)
            }) : this.each(function() {
                var e, t, n, r;
                if (a) {
                    t = 0, n = S(this), r = mt(i);
                    while (e = r[t++]) n.hasClass(e) ? n.removeClass(e) : n.addClass(e)
                } else void 0 !== i && "boolean" !== o || ((e = yt(this)) && Y.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Y.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            t = " " + e + " ";
            while (n = this[r++])
                if (1 === n.nodeType && -1 < (" " + vt(yt(n)) + " ").indexOf(t)) return !0;
            return !1
        }
    });
    var xt = /\r/g;
    S.fn.extend({
        val: function(n) {
            var r, e, i, t = this[0];
            return arguments.length ? (i = m(n), this.each(function(e) {
                var t;
                1 === this.nodeType && (null == (t = i ? n.call(this, e, S(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = S.map(t, function(e) {
                    return null == e ? "" : e + ""
                })), (r = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value") || (this.value = t))
            })) : t ? (r = S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof(e = t.value) ? e.replace(xt, "") : null == e ? "" : e : void 0
        }
    }), S.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = S.find.attr(e, "value");
                    return null != t ? t : vt(S.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i = e.options,
                        o = e.selectedIndex,
                        a = "select-one" === e.type,
                        s = a ? null : [],
                        u = a ? o + 1 : i.length;
                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
                            if (t = S(n).val(), a) return t;
                            s.push(t)
                        } return s
                },
                set: function(e, t) {
                    var n, r, i = e.options,
                        o = S.makeArray(t),
                        a = i.length;
                    while (a--)((r = i[a]).selected = -1 < S.inArray(S.valHooks.option.get(r), o)) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), S.each(["radio", "checkbox"], function() {
        S.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t)) return e.checked = -1 < S.inArray(S(e).val(), t)
            }
        }, y.checkOn || (S.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), y.focusin = "onfocusin" in C;
    var bt = /^(?:focusinfocus|focusoutblur)$/,
        wt = function(e) {
            e.stopPropagation()
        };
    S.extend(S.event, {
        trigger: function(e, t, n, r) {
            var i, o, a, s, u, l, c, f, p = [n || E],
                d = v.call(e, "type") ? e.type : e,
                h = v.call(e, "namespace") ? e.namespace.split(".") : [];
            if (o = f = a = n = n || E, 3 !== n.nodeType && 8 !== n.nodeType && !bt.test(d + S.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(), h.sort()), u = d.indexOf(":") < 0 && "on" + d, (e = e[S.expando] ? e : new S.Event(d, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : S.makeArray(t, [e]), c = S.event.special[d] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
                if (!r && !c.noBubble && !x(n)) {
                    for (s = c.delegateType || d, bt.test(s + d) || (o = o.parentNode); o; o = o.parentNode) p.push(o), a = o;
                    a === (n.ownerDocument || E) && p.push(a.defaultView || a.parentWindow || C)
                }
                i = 0;
                while ((o = p[i++]) && !e.isPropagationStopped()) f = o, e.type = 1 < i ? s : c.bindType || d, (l = (Y.get(o, "events") || Object.create(null))[e.type] && Y.get(o, "handle")) && l.apply(o, t), (l = u && o[u]) && l.apply && V(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault());
                return e.type = d, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !V(n) || u && m(n[d]) && !x(n) && ((a = n[u]) && (n[u] = null), S.event.triggered = d, e.isPropagationStopped() && f.addEventListener(d, wt), n[d](), e.isPropagationStopped() && f.removeEventListener(d, wt), S.event.triggered = void 0, a && (n[u] = a)), e.result
            }
        },
        simulate: function(e, t, n) {
            var r = S.extend(new S.Event, n, {
                type: e,
                isSimulated: !0
            });
            S.event.trigger(r, null, t)
        }
    }), S.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                S.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return S.event.trigger(e, t, n, !0)
        }
    }), y.focusin || S.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, r) {
        var i = function(e) {
            S.event.simulate(r, e.target, S.event.fix(e))
        };
        S.event.special[r] = {
            setup: function() {
                var e = this.ownerDocument || this.document || this,
                    t = Y.access(e, r);
                t || e.addEventListener(n, i, !0), Y.access(e, r, (t || 0) + 1)
            },
            teardown: function() {
                var e = this.ownerDocument || this.document || this,
                    t = Y.access(e, r) - 1;
                t ? Y.access(e, r, t) : (e.removeEventListener(n, i, !0), Y.remove(e, r))
            }
        }
    });
    var Tt = C.location,
        Ct = {
            guid: Date.now()
        },
        Et = /\?/;
    S.parseXML = function(e) {
        var t;
        if (!e || "string" != typeof e) return null;
        try {
            t = (new C.DOMParser).parseFromString(e, "text/xml")
        } catch (e) {
            t = void 0
        }
        return t && !t.getElementsByTagName("parsererror").length || S.error("Invalid XML: " + e), t
    };
    var St = /\[\]$/,
        kt = /\r?\n/g,
        At = /^(?:submit|button|image|reset|file)$/i,
        Nt = /^(?:input|select|textarea|keygen)/i;

    function Dt(n, e, r, i) {
        var t;
        if (Array.isArray(e)) S.each(e, function(e, t) {
            r || St.test(n) ? i(n, t) : Dt(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i)
        });
        else if (r || "object" !== w(e)) i(n, e);
        else
            for (t in e) Dt(n + "[" + t + "]", e[t], r, i)
    }
    S.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                var n = m(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (null == e) return "";
        if (Array.isArray(e) || e.jquery && !S.isPlainObject(e)) S.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) Dt(n, e[n], t, i);
        return r.join("&")
    }, S.fn.extend({
        serialize: function() {
            return S.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = S.prop(this, "elements");
                return e ? S.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !S(this).is(":disabled") && Nt.test(this.nodeName) && !At.test(e) && (this.checked || !pe.test(e))
            }).map(function(e, t) {
                var n = S(this).val();
                return null == n ? null : Array.isArray(n) ? S.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(kt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(kt, "\r\n")
                }
            }).get()
        }
    });
    var jt = /%20/g,
        qt = /#.*$/,
        Lt = /([?&])_=[^&]*/,
        Ht = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Ot = /^(?:GET|HEAD)$/,
        Pt = /^\/\//,
        Rt = {},
        Mt = {},
        It = "*/".concat("*"),
        Wt = E.createElement("a");

    function Ft(o) {
        return function(e, t) {
            "string" != typeof e && (t = e, e = "*");
            var n, r = 0,
                i = e.toLowerCase().match(P) || [];
            if (m(t))
                while (n = i[r++]) "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
        }
    }

    function Bt(t, i, o, a) {
        var s = {},
            u = t === Mt;

        function l(e) {
            var r;
            return s[e] = !0, S.each(t[e] || [], function(e, t) {
                var n = t(i, o, a);
                return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), l(n), !1)
            }), r
        }
        return l(i.dataTypes[0]) || !s["*"] && l("*")
    }

    function $t(e, t) {
        var n, r, i = S.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && S.extend(!0, e, r), e
    }
    Wt.href = Tt.href, S.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Tt.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Tt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": It,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": S.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? $t($t(e, S.ajaxSettings), t) : $t(S.ajaxSettings, e)
        },
        ajaxPrefilter: Ft(Rt),
        ajaxTransport: Ft(Mt),
        ajax: function(e, t) {
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var c, f, p, n, d, r, h, g, i, o, v = S.ajaxSetup({}, t),
                y = v.context || v,
                m = v.context && (y.nodeType || y.jquery) ? S(y) : S.event,
                x = S.Deferred(),
                b = S.Callbacks("once memory"),
                w = v.statusCode || {},
                a = {},
                s = {},
                u = "canceled",
                T = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (h) {
                            if (!n) {
                                n = {};
                                while (t = Ht.exec(p)) n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2])
                            }
                            t = n[e.toLowerCase() + " "]
                        }
                        return null == t ? null : t.join(", ")
                    },
                    getAllResponseHeaders: function() {
                        return h ? p : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, a[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == h && (v.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (h) T.always(e[T.status]);
                            else
                                for (t in e) w[t] = [w[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || u;
                        return c && c.abort(t), l(0, t), this
                    }
                };
            if (x.promise(T), v.url = ((e || v.url || Tt.href) + "").replace(Pt, Tt.protocol + "//"), v.type = t.method || t.type || v.method || v.type, v.dataTypes = (v.dataType || "*").toLowerCase().match(P) || [""], null == v.crossDomain) {
                r = E.createElement("a");
                try {
                    r.href = v.url, r.href = r.href, v.crossDomain = Wt.protocol + "//" + Wt.host != r.protocol + "//" + r.host
                } catch (e) {
                    v.crossDomain = !0
                }
            }
            if (v.data && v.processData && "string" != typeof v.data && (v.data = S.param(v.data, v.traditional)), Bt(Rt, v, t, T), h) return T;
            for (i in (g = S.event && v.global) && 0 == S.active++ && S.event.trigger("ajaxStart"), v.type = v.type.toUpperCase(), v.hasContent = !Ot.test(v.type), f = v.url.replace(qt, ""), v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(jt, "+")) : (o = v.url.slice(f.length), v.data && (v.processData || "string" == typeof v.data) && (f += (Et.test(f) ? "&" : "?") + v.data, delete v.data), !1 === v.cache && (f = f.replace(Lt, "$1"), o = (Et.test(f) ? "&" : "?") + "_=" + Ct.guid++ + o), v.url = f + o), v.ifModified && (S.lastModified[f] && T.setRequestHeader("If-Modified-Since", S.lastModified[f]), S.etag[f] && T.setRequestHeader("If-None-Match", S.etag[f])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType), T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + It + "; q=0.01" : "") : v.accepts["*"]), v.headers) T.setRequestHeader(i, v.headers[i]);
            if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h)) return T.abort();
            if (u = "abort", b.add(v.complete), T.done(v.success), T.fail(v.error), c = Bt(Mt, v, t, T)) {
                if (T.readyState = 1, g && m.trigger("ajaxSend", [T, v]), h) return T;
                v.async && 0 < v.timeout && (d = C.setTimeout(function() {
                    T.abort("timeout")
                }, v.timeout));
                try {
                    h = !1, c.send(a, l)
                } catch (e) {
                    if (h) throw e;
                    l(-1, e)
                }
            } else l(-1, "No Transport");

            function l(e, t, n, r) {
                var i, o, a, s, u, l = t;
                h || (h = !0, d && C.clearTimeout(d), c = void 0, p = r || "", T.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (s = function(e, t, n) {
                    var r, i, o, a, s = e.contents,
                        u = e.dataTypes;
                    while ("*" === u[0]) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (i in s)
                            if (s[i] && s[i].test(r)) {
                                u.unshift(i);
                                break
                            } if (u[0] in n) o = u[0];
                    else {
                        for (i in n) {
                            if (!u[0] || e.converters[i + " " + u[0]]) {
                                o = i;
                                break
                            }
                            a || (a = i)
                        }
                        o = o || a
                    }
                    if (o) return o !== u[0] && u.unshift(o), n[o]
                }(v, T, n)), !i && -1 < S.inArray("script", v.dataTypes) && (v.converters["text script"] = function() {}), s = function(e, t, n, r) {
                    var i, o, a, s, u, l = {},
                        c = e.dataTypes.slice();
                    if (c[1])
                        for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
                    o = c.shift();
                    while (o)
                        if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                            if ("*" === o) o = u;
                            else if ("*" !== u && u !== o) {
                        if (!(a = l[u + " " + o] || l["* " + o]))
                            for (i in l)
                                if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                    !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                                    break
                                } if (!0 !== a)
                            if (a && e["throws"]) t = a(t);
                            else try {
                                t = a(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: a ? e : "No conversion from " + u + " to " + o
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: t
                    }
                }(v, s, T, i), i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (S.lastModified[f] = u), (u = T.getResponseHeader("etag")) && (S.etag[f] = u)), 204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || l) + "", i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]), T.statusCode(w), w = void 0, g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]), b.fireWith(y, [T, l]), g && (m.trigger("ajaxComplete", [T, v]), --S.active || S.event.trigger("ajaxStop")))
            }
            return T
        },
        getJSON: function(e, t, n) {
            return S.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return S.get(e, void 0, t, "script")
        }
    }), S.each(["get", "post"], function(e, i) {
        S[i] = function(e, t, n, r) {
            return m(t) && (r = r || n, n = t, t = void 0), S.ajax(S.extend({
                url: e,
                type: i,
                dataType: r,
                data: t,
                success: n
            }, S.isPlainObject(e) && e))
        }
    }), S.ajaxPrefilter(function(e) {
        var t;
        for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
    }), S._evalUrl = function(e, t, n) {
        return S.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(e) {
                S.globalEval(e, t, n)
            }
        })
    }, S.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (m(e) && (e = e.call(this[0])), t = S(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(n) {
            return m(n) ? this.each(function(e) {
                S(this).wrapInner(n.call(this, e))
            }) : this.each(function() {
                var e = S(this),
                    t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n)
            })
        },
        wrap: function(t) {
            var n = m(t);
            return this.each(function(e) {
                S(this).wrapAll(n ? t.call(this, e) : t)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                S(this).replaceWith(this.childNodes)
            }), this
        }
    }), S.expr.pseudos.hidden = function(e) {
        return !S.expr.pseudos.visible(e)
    }, S.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, S.ajaxSettings.xhr = function() {
        try {
            return new C.XMLHttpRequest
        } catch (e) {}
    };
    var _t = {
            0: 200,
            1223: 204
        },
        zt = S.ajaxSettings.xhr();
    y.cors = !!zt && "withCredentials" in zt, y.ajax = zt = !!zt, S.ajaxTransport(function(i) {
        var o, a;
        if (y.cors || zt && !i.crossDomain) return {
            send: function(e, t) {
                var n, r = i.xhr();
                if (r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields)
                    for (n in i.xhrFields) r[n] = i.xhrFields[n];
                for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) r.setRequestHeader(n, e[n]);
                o = function(e) {
                    return function() {
                        o && (o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(_t[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                            binary: r.response
                        } : {
                            text: r.responseText
                        }, r.getAllResponseHeaders()))
                    }
                }, r.onload = o(), a = r.onerror = r.ontimeout = o("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function() {
                    4 === r.readyState && C.setTimeout(function() {
                        o && a()
                    })
                }, o = o("abort");
                try {
                    r.send(i.hasContent && i.data || null)
                } catch (e) {
                    if (o) throw e
                }
            },
            abort: function() {
                o && o()
            }
        }
    }), S.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), S.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return S.globalEval(e), e
            }
        }
    }), S.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), S.ajaxTransport("script", function(n) {
        var r, i;
        if (n.crossDomain || n.scriptAttrs) return {
            send: function(e, t) {
                r = S("<script>").attr(n.scriptAttrs || {}).prop({
                    charset: n.scriptCharset,
                    src: n.url
                }).on("load error", i = function(e) {
                    r.remove(), i = null, e && t("error" === e.type ? 404 : 200, e.type)
                }), E.head.appendChild(r[0])
            },
            abort: function() {
                i && i()
            }
        }
    });
    var Ut, Xt = [],
        Vt = /(=)\?(?=&|$)|\?\?/;
    S.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Xt.pop() || S.expando + "_" + Ct.guid++;
            return this[e] = !0, e
        }
    }), S.ajaxPrefilter("json jsonp", function(e, t, n) {
        var r, i, o, a = !1 !== e.jsonp && (Vt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Vt.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Vt, "$1" + r) : !1 !== e.jsonp && (e.url += (Et.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
            return o || S.error(r + " was not called"), o[0]
        }, e.dataTypes[0] = "json", i = C[r], C[r] = function() {
            o = arguments
        }, n.always(function() {
            void 0 === i ? S(C).removeProp(r) : C[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, Xt.push(r)), o && m(i) && i(o[0]), o = i = void 0
        }), "script"
    }), y.createHTMLDocument = ((Ut = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Ut.childNodes.length), S.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (y.createHTMLDocument ? ((r = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href, t.head.appendChild(r)) : t = E), o = !n && [], (i = N.exec(e)) ? [t.createElement(i[1])] : (i = xe([e], t, o), o && o.length && S(o).remove(), S.merge([], i.childNodes)));
        var r, i, o
    }, S.fn.load = function(e, t, n) {
        var r, i, o, a = this,
            s = e.indexOf(" ");
        return -1 < s && (r = vt(e.slice(s)), e = e.slice(0, s)), m(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), 0 < a.length && S.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, a.html(r ? S("<div>").append(S.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }), this
    }, S.expr.pseudos.animated = function(t) {
        return S.grep(S.timers, function(e) {
            return t === e.elem
        }).length
    }, S.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l = S.css(e, "position"),
                c = S(e),
                f = {};
            "static" === l && (e.style.position = "relative"), s = c.offset(), o = S.css(e, "top"), u = S.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), m(t) && (t = t.call(e, n, S.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : ("number" == typeof f.top && (f.top += "px"), "number" == typeof f.left && (f.left += "px"), c.css(f))
        }
    }, S.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                S.offset.setOffset(this, t, e)
            });
            var e, n, r = this[0];
            return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                top: e.top + n.pageYOffset,
                left: e.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n, r = this[0],
                    i = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === S.css(r, "position")) t = r.getBoundingClientRect();
                else {
                    t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;
                    while (e && (e === n.body || e === n.documentElement) && "static" === S.css(e, "position")) e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && ((i = S(e).offset()).top += S.css(e, "borderTopWidth", !0), i.left += S.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - i.top - S.css(r, "marginTop", !0),
                    left: t.left - i.left - S.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent;
                while (e && "static" === S.css(e, "position")) e = e.offsetParent;
                return e || re
            })
        }
    }), S.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, i) {
        var o = "pageYOffset" === i;
        S.fn[t] = function(e) {
            return $(this, function(e, t, n) {
                var r;
                if (x(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n) return r ? r[i] : e[t];
                r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n
            }, t, e, arguments.length)
        }
    }), S.each(["top", "left"], function(e, n) {
        S.cssHooks[n] = $e(y.pixelPosition, function(e, t) {
            if (t) return t = Be(e, n), Me.test(t) ? S(e).position()[n] + "px" : t
        })
    }), S.each({
        Height: "height",
        Width: "width"
    }, function(a, s) {
        S.each({
            padding: "inner" + a,
            content: s,
            "": "outer" + a
        }, function(r, o) {
            S.fn[o] = function(e, t) {
                var n = arguments.length && (r || "boolean" != typeof e),
                    i = r || (!0 === e || !0 === t ? "margin" : "border");
                return $(this, function(e, t, n) {
                    var r;
                    return x(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? S.css(e, t, i) : S.style(e, t, n, i)
                }, s, n ? e : void 0, n)
            }
        })
    }), S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        S.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), S.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
        S.fn[n] = function(e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
        }
    });
    var Gt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    S.proxy = function(e, t) {
        var n, r, i;
        if ("string" == typeof t && (n = e[t], t = e, e = n), m(e)) return r = s.call(arguments, 2), (i = function() {
            return e.apply(t || this, r.concat(s.call(arguments)))
        }).guid = e.guid = e.guid || S.guid++, i
    }, S.holdReady = function(e) {
        e ? S.readyWait++ : S.ready(!0)
    }, S.isArray = Array.isArray, S.parseJSON = JSON.parse, S.nodeName = A, S.isFunction = m, S.isWindow = x, S.camelCase = X, S.type = w, S.now = Date.now, S.isNumeric = function(e) {
        var t = S.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }, S.trim = function(e) {
        return null == e ? "" : (e + "").replace(Gt, "")
    }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return S
    });
    var Yt = C.jQuery,
        Qt = C.$;
    return S.noConflict = function(e) {
        return C.$ === S && (C.$ = Qt), e && C.jQuery === S && (C.jQuery = Yt), S
    }, "undefined" == typeof e && (C.jQuery = C.$ = S), S
});;
g_days_in_month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
j_days_in_month = new Array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29);

function div(c, d) {
    return Math.floor(c / d)
}

function gregorian_to_jalali(a) {
    var e, d, c;
    var n, m, l;
    var b, h;
    var k;
    var f;
    e = a[0] - 1600;
    d = a[1] - 1;
    c = a[2] - 1;
    b = 365 * e + div((e + 3), 4) - div((e + 99), 100) + div((e + 399), 400);
    for (f = 0; f < d; ++f) {
        b += g_days_in_month[f]
    }
    if (d > 1 && ((e % 4 == 0 && e % 100 != 0) || (e % 400 == 0))) {
        ++b
    }
    b += c;
    h = b - 79;
    k = div(h, 12053);
    h %= 12053;
    n = 979 + 33 * k + 4 * div(h, 1461);
    h %= 1461;
    if (h >= 366) {
        n += div((h - 1), 365);
        h = (h - 1) % 365
    }
    for (f = 0; f < 11 && h >= j_days_in_month[f]; ++f) {
        h -= j_days_in_month[f]
    }
    m = f + 1;
    l = h + 1;
    return new Array(n, m, l)
}

function jalali_to_gregorian(f) {
    var d, c, b;
    var l, k, h;
    var a, g;
    var m;
    var e;
    l = f[0] - 979;
    k = f[1] - 1;
    h = f[2] - 1;
    g = 365 * l + div(l, 33) * 8 + div((l % 33 + 3), 4);
    for (e = 0; e < k; ++e) {
        g += j_days_in_month[e]
    }
    g += h;
    a = g + 79;
    d = 1600 + 400 * div(a, 146097);
    a = a % 146097;
    m = 1;
    if (a >= 36525) {
        a--;
        d += 100 * div(a, 36524);
        a = a % 36524;
        if (a >= 365) {
            a++
        } else {
            m = 0
        }
    }
    d += 4 * div(a, 1461);
    a %= 1461;
    if (a >= 366) {
        m = 0;
        a--;
        d += div(a, 365);
        a = a % 365
    }
    for (e = 0; a >= g_days_in_month[e] + (e == 1 && m); e++) {
        a -= g_days_in_month[e] + (e == 1 && m)
    }
    c = e + 1;
    b = a + 1;
    return new Array(d, c, b)
}

function jalali_today() {
    Today = new Date();
    j = gregorian_to_jalali(new Array(Today.getFullYear(), Today.getMonth() + 1, Today.getDate()));
    return j[2] + "/" + j[1] + "/" + j[0]
}

function jalali_toString(a) {
    return a[0] + "/" + a[1] + "/" + a[2]
}

function devenToPersianDate(a) {
    j = gregorian_to_jalali(new Array(a.substring(0, 4), a.substring(4, 6), a.substring(6)));
    return j[0] + "/" + ("0" + j[1]).slice(-2) + "/" + ("0" + j[2]).slice(-2)
}

function toPersianDate(a) {
    j = gregorian_to_jalali(new Array(a.getFullYear(), a.getMonth() + 1, a.getDate()));
    return j[0] + "/" + ("0" + j[1]).slice(-2) + "/" + ("0" + j[2]).slice(-2)
}

function showFakePersianDate(a) {
    return a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate()
};;
(function(a) {
    a.fn.jqChart = function(b, d, e) {
        if (typeof b === "object") d = b;
        else if (typeof b === "string") {
            b = b.toLowerCase();
            if (a.fn.jqChart.methods[b]) return a.fn.jqChart.methods[b].call(this, d, e);
            else a.error("Method " + method + " does not exist on jQuery.jqChart")
        }
        var c = this.data("data");
        if (!c) {
            c = new f(this);
            this.data("data", c)
        }
        c._setOptions(d);
        return this
    };
    a.fn.jqChart.methods = {
        chart: function() {
            return this.data("data")
        },
        destroy: function() {
            var a = this.data("data");
            if (a) {
                a.destroy();
                this.removeData("data")
            }
        },
        options: function() {
            var a = this.data("data");
            return !a ? void 0 : a.options
        },
        option: function(b, c) {
            var a = this.data("data");
            if (!a) return;
            if (!c) return a.options[b];
            a.options[b] = c;
            a._setOptions(a.options)
        },
        update: function(c) {
            var b = this.data("data");
            if (!b) return this;
            var d = a.extend(false, {}, b.options, c || {});
            b._setOptions(d)
        },
        todataurl: function(b) {
            var a = this.data("data");
            return !a ? null : a.toDataURL(b)
        },
        highlightdata: function(b) {
            var a = this.data("data");
            a && a.highlightData(b)
        },
        ismouseover: function() {
            var a = this.data("data");
            return a ? a.isMouseOver : false
        }
    };
    a.fn.jqChart.defaults = {
        title: {
            margin: 8,
            font: "22px sans-serif"
        },
        tooltips: {
            disabled: false,
            type: "normal",
            borderColor: "auto",
            snapArea: 25,
            highlighting: true,
            highlightingFillStyle: "rgba(204, 204, 204, 0.5)",
            highlightingStrokeStyle: "rgba(204, 204, 204, 0.5)"
        },
        crosshairs: {
            enabled: false,
            snapToDataPoints: true,
            hLine: {
                visible: true,
                strokeStyle: "red"
            },
            vLine: {
                visible: true,
                strokeStyle: "red"
            }
        },
        globalAlpha: 1,
        mouseInteractionMode: "panning",
        selectionRect: {
            fillStyle: "rgba(125,125,125,0.2)",
            strokeStyle: "gray",
            lineWidth: 0
        },
        shadows: {
            enabled: false,
            shadowColor: "#cccccc",
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 2
        },
        watermark: {
            hAlign: "right",
            vAlign: "bottom"
        },
        toolbar: {
            visibility: "auto",
            resetZoomTooltipText: "Reset Zoom (100%)",
            zoomingTooltipText: "Zoom in to selection area",
            panningTooltipText: "Pan the chart"
        }
    };
    a.fn.jqChart.labelFormatter = function(b, c) {
        return !b ? String(c) : a.fn.jqSprintf(b, c)
    };
    a.fn.jqMouseCapture = function(b) {
        var c = a(document);
        this.each(function() {
            var d = a(this),
                e = {};
            d.mousedown(function(h) {
                var f;
                if (b.move) {
                    f = function(a) {
                        b.move.call(d, a, e)
                    };
                    c.mousemove(f)
                }
                var a, g = function() {
                    b.move && c.unbind("mousemove", f);
                    c.unbind("mouseup", a)
                };
                if (b.up) a = function(a) {
                    g();
                    return b.up.call(d, a, e)
                };
                else a = g;
                c.mouseup(a);
                h.preventDefault();
                return b.down.call(d, h, e)
            })
        });
        return this
    };
    a.fn.jqSprintf = function() {
        function e(a, c, e, d) {
            var b = a.length >= c ? "" : Array(1 + c - a.length >>> 0).join(e);
            return d ? a + b : b + a
        }

        function d(a, d, b, c, g) {
            var f = c - a.length;
            if (f > 0)
                if (b || !g) a = e(a, c, " ", b);
                else a = a.slice(0, d.length) + e("", f, "0", true) + a.slice(d.length);
            return a
        }

        function c(b, f, a, g, i, h, j) {
            var c = b >>> 0;
            a = a && c && ({
                "2": "0b",
                "8": "0",
                "16": "0x"
            })[f] || "";
            b = a + e(c.toString(f), h || 0, "0", false);
            return d(b, a, g, i, j)
        }

        function g(a, c, e, b, f) {
            if (b != null) a = a.slice(0, b);
            return d(a, "", c, e, f)
        }
        var b = arguments,
            f = 0,
            h = b[f++];
        return h.replace(a.fn.jqSprintf.regex, function(t, s, q, a, w, h, m) {
            if (t == "%%") return "%";
            for (var j = false, n = "", k = false, l = false, r = 0; q && r < q.length; r++) switch (q.charAt(r)) {
                case " ":
                    n = " ";
                    break;
                case "+":
                    n = "+";
                    break;
                case "-":
                    j = true;
                    break;
                case "0":
                    k = true;
                    break;
                case "#":
                    l = true
            }
            if (!a) a = 0;
            else if (a == "*") a = +b[f++];
            else if (a.charAt(0) == "*") a = +b[a.slice(1, -1)];
            else a = +a;
            if (a < 0) {
                a = -a;
                j = true
            }
            if (!isFinite(a)) throw new Error("sprintf: (minimum-)width must be finite");
            if (!h) h = "fFeE".indexOf(m) > -1 ? 6 : m == "d" ? 0 : void 0;
            else if (h == "*") h = +b[f++];
            else if (h.charAt(0) == "*") h = +b[h.slice(1, -1)];
            else h = +h;
            var i = s ? b[s.slice(0, -1)] : b[f++];
            switch (m) {
                case "s":
                    return g(String(i), j, a, h, k);
                case "c":
                    return g(String.fromCharCode(+i), j, a, h, k);
                case "b":
                    return c(i, 2, l, j, a, h, k);
                case "o":
                    return c(i, 8, l, j, a, h, k);
                case "x":
                    return c(i, 16, l, j, a, h, k);
                case "X":
                    return c(i, 16, l, j, a, h, k).toUpperCase();
                case "u":
                    return c(i, 10, l, j, a, h, k);
                case "i":
                case "d":
                    var o = parseInt(+i),
                        p = o < 0 ? "-" : n;
                    i = p + e(String(Math.abs(o)), h, "0", false);
                    return d(i, p, j, a, k);
                case "e":
                case "E":
                case "f":
                case "F":
                case "g":
                case "G":
                    var o = +i,
                        p = o < 0 ? "-" : n,
                        v = (["toExponential", "toFixed", "toPrecision"])["efg".indexOf(m.toLowerCase())],
                        u = (["toString", "toUpperCase"])["eEfFgG".indexOf(m) % 2];
                    i = p + Math.abs(o)[v](h);
                    return d(i, p, j, a, k)[u]();
                default:
                    return t
            }
        })
    };
    a.fn.jqSprintf.regex = /%%|%(\d+\$)?([-+#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
    a.fn.jqDateFormat = function() {
        var e = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            d = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            c = /[^-+\dA-Z]/g,
            b = function(a, b) {
                a = String(a);
                b = b || 2;
                while (a.length < b) a = "0" + a;
                return a
            };
        return function(f, g, l) {
            var j = a.fn.jqDateFormat;
            if (arguments.length == 1 && Object.prototype.toString.call(f) == "[object String]" && !/\d/.test(f)) {
                g = f;
                f = undefined
            }
            f = f ? new Date(f) : new Date;
            if (isNaN(f)) throw SyntaxError("invalid date");
            g = String(j.masks[g] || g || j.masks["default"]);
            if (g.slice(0, 4) == "UTC:") {
                g = g.slice(4);
                l = true
            }
            var i = l ? "getUTC" : "get",
                k = f[i + "Date"](),
                q = f[i + "Day"](),
                n = f[i + "Month"](),
                t = f[i + "FullYear"](),
                h = f[i + "Hours"](),
                r = f[i + "Minutes"](),
                s = f[i + "Seconds"](),
                m = f[i + "Milliseconds"](),
                o = l ? 0 : f.getTimezoneOffset(),
                p = {
                    d: k,
                    dd: b(k),
                    ddd: j.i18n.dayNames[q],
                    dddd: j.i18n.dayNames[q + 7],
                    m: n + 1,
                    mm: b(n + 1),
                    mmm: j.i18n.monthNames[n],
                    mmmm: j.i18n.monthNames[n + 12],
                    yy: String(t).slice(2),
                    yyyy: t,
                    h: h % 12 || 12,
                    hh: b(h % 12 || 12),
                    H: h,
                    HH: b(h),
                    M: r,
                    MM: b(r),
                    s: s,
                    ss: b(s),
                    l: b(m, 3),
                    L: b(m > 99 ? Math.round(m / 10) : m),
                    t: h < 12 ? "a" : "p",
                    tt: h < 12 ? "am" : "pm",
                    T: h < 12 ? "A" : "P",
                    TT: h < 12 ? "AM" : "PM",
                    Z: l ? "UTC" : (String(f).match(d) || [""]).pop().replace(c, ""),
                    o: (o > 0 ? "-" : "+") + b(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: (["th", "st", "nd", "rd"])[k % 10 > 3 ? 0 : (k % 100 - k % 10 != 10) * k % 10]
                };
            return g.replace(e, function(a) {
                return a in p ? p[a] : a.slice(1, a.length - 1)
            })
        }
    }();
    a.fn.jqDateFormat.masks = {
        "default": "ddd mmm dd yyyy HH:MM:ss",
        shortDate: "m/d/yy",
        mediumDate: "mmm d, yyyy",
        longDate: "mmmm d, yyyy",
        fullDate: "dddd, mmmm d, yyyy",
        shortTime: "h:MM TT",
        mediumTime: "h:MM:ss TT",
        longTime: "h:MM:ss TT Z",
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };
    a.fn.jqDateFormat.i18n = {
        dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };

    function Kb(a) {
        this.callback = a;
        this.animations = []
    }
    Kb.prototype = {
        begin: function() {
            if (g.use_excanvas) return;
            var a = this.animations;
            if (!a || a.length == 0) return;
            this.stopped = false;
            for (var d = new Date, b = 0; b < a.length; b++) {
                var c = a[b];
                c.begin(d)
            }
            this.animate()
        },
        animate: function() {
            if (this.stopped) return;
            for (var d = this.animations, g = new Date, b = false, c = 0; c < d.length; c++) {
                var e = d[c],
                    f = e.animate(g);
                b = b || f
            }
            if (!b) return;
            this.callback();
            Jb(a.proxy(this.animate, this))
        },
        stop: function() {
            this.stopped = true
        },
        clear: function() {
            this.animations = []
        },
        addAnimation: function(a) {
            this.animations.push(a)
        }
    };
    var Jb = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
            return window.setTimeout(function() {
                a()
            }, 25)
        }
    }();

    function Ob(e) {
        var c = e,
            a = false,
            b = false;

        function d() {
            if (a) {
                c();
                Jb(d);
                b = true;
                a = false
            } else b = false
        }
        this.kick = function() {
            a = true;
            !b && d()
        };
        this.end = function(d) {
            var e = c;
            if (!d) return;
            if (!b) d();
            else {
                c = a ? function() {
                    e();
                    d()
                } : d;
                a = true
            }
        }
    }

    function gb(a, b, c, d, e) {
        if (!a) return;
        this.enabled = !(a.enabled === false);
        this.delayTime = a.delayTime || 0;
        this.duration = a.duration || 2;
        this.from = d;
        this.to = e;
        this.object = b;
        this.option = c
    }
    gb.prototype = {
        begin: function(a) {
            this.startTime = d.addSeconds(a, this.delayTime);
            this.endTime = d.addSeconds(this.startTime, this.duration);
            this.timeDiff = this.endTime.getTime() - this.startTime.getTime();
            this.valueDiff = this.to - this.from;
            this.object[this.option] = this.from;
            this.lastIsSet = false
        },
        animate: function(a) {
            if (a >= this.endTime) {
                if (!this.lastIsSet) {
                    this.object[this.option] = this.to;
                    this.lastIsSet = true;
                    return true
                }
                return false
            }
            if (a > this.startTime) {
                var c = a.getTime() - this.startTime.getTime(),
                    b = this.from + this.valueDiff * c / this.timeDiff;
                if (b === this.to) this.lastIsSet = true;
                this.object[this.option] = b
            }
            return true
        }
    };

    function kb(a, b, c, d, e) {
        gb.call(this, a, b, c, d, e)
    }
    kb.prototype = new gb;
    kb.constructor = kb;
    kb.prototype.begin = function(a) {
        this.startTime = d.addSeconds(a, this.delayTime);
        this.endTime = d.addSeconds(this.startTime, this.duration);
        this.object[this.option] = this.from;
        this.lastIsSet = false
    };
    kb.prototype.animate = function(a) {
        if (a >= this.endTime) {
            if (!this.lastIsSet) {
                this.object[this.option] = this.to;
                this.lastIsSet = true;
                return true
            }
            return false
        }
        return true
    };

    function N(a) {
        this.view = a
    }
    N.prototype = {
        canStart: function() {
            return false
        },
        start: function() {},
        keyDown: function() {},
        keyUp: function() {},
        mouseMove: function() {},
        mouseDown: function() {},
        mouseUp: function() {},
        touchStart: function() {},
        touchMove: function() {},
        touchEnd: function() {},
        stop: function() {},
        stopTool: function() {
            this.view.currentTool == this && this.view.setCurrentTool(null)
        }
    };

    function Y(a) {
        N.call(this, a)
    }
    Y.prototype = new N;
    Y.constructor = Y;
    Y.prototype.mouseDown = function(d) {
        for (var b = this.view.mouseDownTools, a = 0; a < b.length; a++) {
            var c = b[a];
            if (c.canStart(d)) {
                this.view.setCurrentTool(c);
                return
            }
        }
    };
    Y.prototype.mouseMove = function(d) {
        for (var b = this.view.mouseMoveTools, a = 0; a < b.length; a++) {
            var c = b[a];
            if (c.canStart(d)) {
                this.view.setCurrentTool(c);
                return
            }
        }
        this.view._processMouseMove(d)
    };
    Y.prototype.touchStart = function(d) {
        for (var b = this.view.touchStartTools, a = 0; a < b.length; a++) {
            var c = b[a];
            if (c.canStart(d)) {
                this.view.setCurrentTool(c);
                return
            }
        }
        this.view._processTouchStart(d)
    };
    Y.prototype.touchMove = function(d) {
        for (var b = this.view.touchMoveTools, a = 0; a < b.length; a++) {
            var c = b[a];
            if (c.canStart(d)) {
                this.view.setCurrentTool(c);
                return
            }
        }
        this.view._processTouchMove(d)
    };

    function g(a) {
        if (!a) return;
        this.shapes = [];
        this.mouseDownTools = [];
        this.mouseMoveTools = [];
        this.touchStartTools = [];
        this.touchMoveTools = [];
        this.defaultTool = new Y(this);
        this.currentTool = this.defaultTool;
        this._createElements(a)
    }
    g.support_canvas = function() {
        return !!document.createElement("canvas").getContext
    };
    g.setShadows = function(d, a, e) {
        if (!e) return;
        var c = e.options.shadows;
        d.shadowColor = !b.isNull(a.shadowColor) ? a.shadowColor : c.shadowColor;
        d.shadowBlur = !b.isNull(a.shadowBlur) ? a.shadowBlur : c.shadowBlur;
        d.shadowOffsetX = !b.isNull(a.shadowOffsetX) ? a.shadowOffsetX : c.shadowOffsetX;
        d.shadowOffsetY = !b.isNull(a.shadowOffsetY) ? a.shadowOffsetY : c.shadowOffsetY
    };
    g.use_excanvas = !g.support_canvas() ? true : false;
    g.isTouchDevice = !!("ontouchstart" in window);
    g.isGestureDevice = !!("ongesturestart" in window);
    g.prototype = {
        _createElements: function(c) {
            this.elem = c;
            var b = this;
            c.mouseenter(function(a) {
                b._mouseEnter(a)
            });
            c.mouseleave(function(a) {
                b._mouseLeave(a)
            });
            c.jqMouseCapture({
                down: a.proxy(b._mouseDown, this),
                move: a.proxy(b._mouseMove, this),
                up: a.proxy(b._mouseUp, this)
            });
            c.mousemove(function(a) {
                !b.isMouseDown && b._mouseMove(a)
            });
            c.keydown(function(a) {
                b._keyDown(a)
            });
            c.keyup(function(a) {
                b._keyUp(a)
            });
            c.resize(function() {
                b._resize()
            });
            a(window).bind("resize.jqChart", function() {
                b._resize()
            });
            a(window.document).bind("keydown.jqChart", function(a) {
                b._keyDown(a)
            });
            if (g.isTouchDevice) {
                c.bind("touchstart", function(a) {
                    b._touchStart(a)
                });
                c.bind("touchmove", function(a) {
                    b._touchMove(a)
                });
                c.bind("touchend", function(a) {
                    b._touchEnd(a)
                })
            }
            this.canvas = this._createCanvas();
            this.tooltip = this._createTooltip();
            this.shapeRenderer = new O(this.canvas, this);
            this.ctx = this.shapeRenderer.ctx
        },
        _setOptions: function() {
            this.locOffset = null;
            var a = this.elem;
            this.originalCursor = "auto";
            !a.hasClass(this.pluginClass) && a.addClass(this.pluginClass);
            a.css("position") == "static" && a.css("position", "relative");
            !this.tooltip.hasClass(this.tooltipClass) && this.tooltip.addClass(this.tooltipClass)
        },
        _createHighlightRenderer: function() {
            if (g.use_excanvas) {
                this.hlCanvas = this._createCanvas(true);
                var b = a('<div style="position:absolute"></div>');
                this.elem.append(b);
                b.append(this.hlCanvas);
                this.hlRenderer = new O(this.hlCanvas, this);
                this.hlRenderer.div = b
            } else {
                this.hlCanvas = this._createCanvas();
                this.hlRenderer = new O(this.hlCanvas, this)
            }
            this.hlRenderer.isHighlighting = true
        },
        _createCanvas: function(c) {
            var b = document.createElement("canvas");
            b.width = 10;
            b.height = 10;
            a(b).css({
                position: "absolute",
                left: 0,
                top: 0
            });
            if (g.use_excanvas) {
                window.G_vmlCanvasManager.init_(document);
                window.G_vmlCanvasManager.initElement(b)
            }!c && this.elem.append(b);
            return b
        },
        _setCanvasSize: function(a, c, b) {
            a.width = c;
            a.height = b
        },
        _createTooltip: function() {
            var b = a('<div style="position:absolute;display:none"></div>');
            this.elem.append(b);
            return b
        },
        _measure: function() {},
        _arrange: function() {},
        _keyDown: function(a) {
            this.currentTool.keyDown(a)
        },
        _keyUp: function(a) {
            this.currentTool.keyUp(a)
        },
        _mouseEnter: function() {
            this.isMouseOver = true
        },
        _mouseLeave: function() {
            this._clearRenderers();
            this.locOffset = null;
            this.isMouseOver = false
        },
        _mouseDown: function(a) {
            this._oldShape != null && this._triggerShapeEvent("MouseDown", this._oldShape);
            this.isMouseDown = true;
            this.currentTool.mouseDown(a)
        },
        _mouseMove: function(a) {
            this._initMouseInput(a);
            this._processMouseEvents();
            this.currentTool.mouseMove(a)
        },
        _mouseUp: function(a) {
            this._oldShape != null && this._triggerShapeEvent("MouseUp", this._oldShape);
            this.isMouseDown = false;
            this.currentTool.mouseUp(a)
        },
        _touchStart: function(a) {
            this._initTouchInput(a);
            this.isTouchOver = true;
            this._processTouchEvents();
            this.currentTool.touchStart(a)
        },
        _touchMove: function(b) {
            this._initTouchInput(b);
            var a = this.touchInput[0];
            this.isTouchOver = this.contains(a.locX, a.locY);
            this._processTouchEvents();
            this.currentTool.touchMove(b)
        },
        _touchEnd: function(a) {
            this._initTouchInput(a);
            if (this._oldShape != null) {
                this._triggerShapeEvent("TouchEnd", this._oldShape);
                this._oldShape = null
            }
            this.currentTool.touchEnd(a)
        },
        _initMouseInput: function(b) {
            this.isMouseOver = true;
            var c = b.pageX,
                d = b.pageY;
            if (!this.locOffset) this.locOffset = this.elem.offset();
            var a = this.locOffset,
                f = c - a.left,
                g = d - a.top,
                e = {
                    x: c,
                    y: d,
                    locX: f,
                    locY: g
                };
            this.mouseInput = e
        },
        _initTouchInput: function(j) {
            var b = j.originalEvent.touches;
            if (!this.locOffset) this.locOffset = this.elem.offset();
            for (var c = this.locOffset, d = [], a = 0; a < b.length; a++) {
                var e = b[a],
                    f = e.pageX,
                    g = e.pageY,
                    h = f - c.left,
                    i = g - c.top;
                d.push({
                    x: f,
                    y: g,
                    locX: h,
                    locY: i
                })
            }
            this.touchInput = d
        },
        getAllTouches: function(h) {
            for (var f = ["touches", "changedTouches"], b = [], c = 0; c < f.length; c++)
                for (var e = h.originalEvent[f[c]], d = 0; d < e.length; d++) {
                    var g = e[d];
                    a.inArray(g, b) == -1 && b.push(g)
                }
            return b
        },
        _resize: function() {
            var c = this.elem,
                e = c.width(),
                d = c.height();
            if (e != this._width || d != this._height) {
                var a = this.options;
                if (a) {
                    if (!b.isNull(a.width)) a.width = e;
                    if (!b.isNull(a.height)) a.height = d
                }
                this._setOptions(this.options)
            }
        },
        _clearRenderers: function() {
            if (this._oldTShapes) {
                this._oldTShapes = null;
                this.elem.trigger("dataHighlighting", null)
            }
            this._oldShape = null;
            this._resetCursor();
            this.hideTooltip();
            this.hlRenderer && this.hlRenderer._clear()
        },
        _processMouseMove: function() {
            this._processTooltips(this.mouseInput)
        },
        _processMouseEvents: function() {
            var b = this.mouseInput,
                a = this.hitTest(b.locX, b.locY);
            if (this._oldShape != null && this._oldShape == a) this._triggerShapeEvent("MouseMove", this._oldShape);
            else {
                if (this._oldShape != null) {
                    this._triggerShapeEvent("MouseLeave", this._oldShape);
                    this._oldShape.cursor && this._resetCursor()
                }
                if (a != null) {
                    this._triggerShapeEvent("MouseEnter", a);
                    a.cursor && this.elem.css("cursor", a.cursor)
                }
                this._oldShape = a
            }
        },
        _processTouchEvents: function() {
            var b = this.touchInput[0];
            if (!b) return;
            var a = this.hitTest(b.locX, b.locY);
            if (this._oldShape != null && this._oldShape == a) this._triggerShapeEvent("TouchMove", this._oldShape);
            else {
                this._oldShape != null && this._triggerShapeEvent("TouchEnd", this._oldShape);
                a != null && this._triggerShapeEvent("TouchStart", a);
                this._oldShape = a
            }
        },
        _processTooltips: function(c) {
            var d = this.hasTooltips,
                f = this.hasHighlighting;
            if (!d && !f) return;
            var g = this.options.tooltips.snapArea,
                a = this._getTooltipShapes(c.locX, c.locY, g, c),
                e = true;
            if (this._oldTShapes == null || !b.compareArrays(this._oldTShapes, a)) {
                if (a != null) {
                    this._initTooltip(a);
                    this._highlightShapes(a)
                }
                if (a) this._oldTShapes = a
            } else e = false;
            a && d && e && this._setTooltipPos(a, c)
        },
        _setTooltipPos: function(d, g) {
            var k = this.tooltip.outerWidth(true),
                f = this.tooltip.outerHeight(true),
                h = this._width,
                e = this._height,
                j = d[0]._getTooltipPosition(g, k, f, h, e),
                c = j.y,
                i = d.length,
                l = this;
            if (i > 1) {
                c = 0;
                a.each(d, function() {
                    c += this._getTooltipPosition(g, k, f, h, e).y
                });
                c /= i
            }
            c = b.fitInRange(c, 0, e - f);
            this.tooltip.stop();
            this.tooltip.animate({
                left: j.x,
                top: c
            }, 100)
        },
        _processTouchStart: function() {
            this._processTooltips(this.touchInput[0])
        },
        _processTouchMove: function() {
            this._processTooltips(this.touchInput[0])
        },
        _initTooltip: function(b) {
            if (!this.hasTooltips || !b || !b.length) return;
            var g = b.length,
                f = "",
                d;
            if (g == 1) d = b[0].context;
            else {
                d = [];
                a.each(b, function() {
                    d.push(this.context)
                })
            }
            if (!d) return;
            var e = new jQuery.Event("tooltipFormat");
            this.elem.trigger(e, [d]);
            var h = this;
            if (e.result) f = e.result;
            else f = this._getTooltipText(b);
            this.tooltip.html(f);
            var c = this.options.tooltips;
            if (g == 1)
                if (c.borderColor) {
                    c.borderColor == "auto" && this.tooltip.css("border-color", b[0].getTooltipColor());
                    this.tooltip.css("border-color", c.borderColor)
                } c.background && this.tooltip.css("background", c.background);
            this.showTooltip()
        },
        _highlightShapes: function(f) {
            if (!this.hasHighlighting) return;
            this.hlRenderer._clear();
            var e = this.options.tooltips,
                b = [];
            a.each(f, function(d, c) {
                var a = c._createHighlightShape(e.highlightingFillStyle, e.highlightingStrokeStyle);
                b.push(a)
            });
            var c;
            if (b.length == 1) {
                c = b[0].context;
                c.shape = b[0]
            } else {
                c = [];
                a.each(b, function() {
                    c.push(this.context);
                    c.shape = this
                })
            }
            var d = new jQuery.Event("dataHighlighting");
            this.elem.trigger(d, [c]);
            if (d.result !== false)
                if (g.use_excanvas) this.hlRenderer._render(b);
                else {
                    this.hlRenderer.ctx.save();
                    this._setClip && this._setClip(this.hlRenderer.ctx);
                    this.hlRenderer._render(b);
                    this.hlRenderer.ctx.restore()
                }
        },
        _getClosestShape: function(b, g, f) {
            for (var a = b[0], d = 1; d < b.length; d++) {
                var e = b[d];
                if (c.compare(a, e, f, g) == false) a = e
            }
            return a
        },
        _getTooltip: function() {
            return "Tooltip"
        },
        _getTooltipText: function(c) {
            var b = "",
                d = this;
            a.each(c, function() {
                b += d._getTooltip(this)
            });
            return b
        },
        _getTooltipShapes: function(h, i, b, e) {
            if (!b) b = 0;
            for (var d = [], f = this.shapes.length - 1; f >= 0; f--) {
                var a = this.shapes[f];
                if (!a.context || a.isLegendItem || a.isAxisLabel) continue;
                var c = a.hitTest(e.locX, e.locY, b);
                if (c === true) d.push(a);
                else c && d.push(c)
            }
            var g = this._getClosestShape(d, b, e);
            return !g ? null : [g]
        },
        _resetCursor: function() {
            this.elem.css("cursor") != this.originalCursor && this.elem.css("cursor", this.originalCursor)
        },
        _triggerShapeEvent: function(b, a) {
            a.context.shape = a;
            this.elem.trigger("dataPoint" + b, a.context)
        },
        getCurrentTool: function() {
            return this.currentTool
        },
        setCurrentTool: function(a) {
            if (this.currentTool == a) return;
            this.currentTool != null && this.currentTool.stop();
            if (!a) this.currentTool = this.defaultTool;
            else this.currentTool = a;
            this.currentTool && this.currentTool.start()
        },
        contains: function(a, b) {
            return a >= 0 && a <= this._width && b >= 0 && b <= this._height
        },
        hitTest: function(d, e, b) {
            if (!b) b = 0;
            for (var c = this.shapes.length - 1; c >= 0; c--) {
                var a = this.shapes[c];
                if (!a.context) continue;
                if (a.hitTest(d, e, b)) return a
            }
        },
        showTooltip: function() {
            this.tooltip.show()
        },
        hideTooltip: function() {
            this.tooltip.hide()
        },
        stringFormat: function(b, c) {
            return a.type(b) == "date" ? a.fn.jqDateFormat(b, c) : a.fn.jqSprintf(c, b)
        },
        clear: function() {
            this._clearRenderers();
            this.shapeRenderer._clear()
        },
        render: function() {},
        destroy: function() {
            var b = this.elem;
            b.unbind("mouseenter");
            b.unbind("mouseleave");
            b.unbind("mousedown");
            b.unbind("mousemove");
            b.unbind("mouseup");
            b.unbind("kedown");
            b.unbind("keyup");
            b.unbind("resize");
            a(window).unbind("resize.jqChart");
            a(window.document).unbind("keydown.jqChart");
            if (g.isTouchDevice) {
                b.unbind("touchstart");
                b.unbind("touchmove");
                b.unbind("touchend")
            }
            b.children().remove();
            var c = this.options;
            b.hasClass(this.pluginClass) && b.removeClass(this.pluginClass)
        },
        toDataURL: function(a) {
            return g.use_excanvas ? null : this.canvas.toDataURL(a)
        },
        getShapesPerData: function(d) {
            var b = [],
                c = this.shapes;
            a.each(d, function() {
                var d = this;
                a.each(c, function() {
                    if (this.context) this.context.dataItem == d && b.push(this)
                })
            });
            return b
        },
        highlightData: function(b) {
            if (!b) {
                this._clearRenderers();
                return null
            }
            var a = this.getShapesPerData(b);
            if (a.length == 0) return null;
            this._highlightShapes(a);
            this._initTooltip(a);
            var c = a[0].getCenter();
            this._setTooltipPos(a, {
                locX: c.x,
                locY: c.y
            });
            return a
        }
    };

    function Bb(b) {
        a.extend(this, {
            maxInter200Px: 8,
            lblMargin: 4,
            origin: 0,
            length: 300,
            x: 0,
            y: 0
        });
        this.setOptions(b)
    }
    Bb.prototype = {
        _calculateActualInterval: function(m, l) {
            if (this.interval) return this.interval;
            var h = 1;
            if (!this.getOrientation || this.getOrientation() == "x") h = .8;
            for (var k = h * this.maxInter200Px, e = Math.max(this.length * k / 200, 1), g = l - m, a = g / e, j = Math.pow(10, Math.floor(b.log10(a))), f = [10, 5, 2, 1], c = 0; c < f.length; c++) {
                var i = f[c],
                    d = j * i;
                if (e < g / d) break;
                a = d
            }
            return a
        },
        _setVisibleRanges: function() {
            this.actualVisibleMinimum = b.isNull(this.visibleMinimum) ? this.actualMinimum : this.visibleMinimum;
            this.actualVisibleMaximum = b.isNull(this.visibleMaximum) ? this.actualMaximum : this.visibleMaximum;
            if (a.type(this.actualVisibleMinimum) == "date") this.actualVisibleMinimum = this.actualVisibleMinimum.getTime();
            if (a.type(this.actualVisibleMaximum) == "date") this.actualVisibleMaximum = this.actualVisibleMaximum.getTime();
            if (this.options) {
                this.options.visibleMinimum = this.visibleMinimum;
                this.options.visibleMaximum = this.visibleMaximum
            }
        },
        _setMinMax: function(c, a) {
            if (this.logarithmic) {
                this.actualMinimum = b.isNull(this.minimum) ? c : b.log(this.minimum, this.logBase);
                this.actualMaximum = b.isNull(this.maximum) ? a : b.log(this.maximum, this.logBase)
            } else {
                this.actualMinimum = b.isNull(this.minimum) ? c : this.minimum;
                this.actualMaximum = b.isNull(this.maximum) ? a : this.maximum
            }
        },
        _getNextPosition: function(c, a) {
            return b.round(c + a)
        },
        _getMarkInterval: function(b, c) {
            var a;
            if (b.interval) a = b.interval;
            else if (c) a = this.actualInterval;
            else a = this.actualInterval / 2;
            return a
        },
        _getIntervals: function(c, b) {
            var d = 0;
            if (b && b.intervalOffset) d = b.intervalOffset;
            for (var e = [], f = this._getIntervalStart(this.actualVisibleMinimum, c), a = f + d; a <= this.actualVisibleMaximum; a = this._getNextPosition(a, c)) e.push(a);
            return e
        },
        _getIntervalStart: function(d, b) {
            var c = d - this.crossing,
                a = this._alignToInterval(c, b);
            if (a < d) a = this._alignToInterval(c + b, b);
            return a
        },
        _alignToInterval: function(c, a) {
            return b.round(b.round(Math.floor(c / a)) * a) + this.crossing
        },
        _createLabel: function(c, d) {
            var b = new q(c);
            b.isAxisLabel = true;
            b.context = {
                chart: this.chart,
                axis: this,
                text: c
            };
            a.extend(b, d);
            this.chart.elem.trigger("axisLabelCreating", b);
            b.measure(this.chart.ctx);
            return b
        },
        _getLabelIntervals: function(a, b) {
            return this._getIntervals(a, b)
        },
        _measureRotatedLabels: function(g) {
            for (var h = this.isAxisVertical, c = 0, b = 0, d = 0; d < g.length; d++) {
                var a = g[d],
                    e = Math.sqrt(a.width * a.width + a.height * a.height),
                    f = a.rotationAngle;
                if (h) {
                    var j = Math.abs(Math.cos(f) * e);
                    c = Math.max(c, j)
                } else {
                    var i = Math.abs(Math.sin(f) * e);
                    b = Math.max(b, i)
                }
            }
            if (this.labels.position == "inside") {
                this.lblsW = c;
                this.lblsH = b;
                return {
                    w: 0,
                    h: 0
                }
            }
            return {
                w: c,
                h: b
            }
        },
        _correctLabelsPositions: function(n) {
            var i = 0,
                h = 0,
                o = this.reversed === true,
                p = this.labels.position == "inside",
                q = this.isAxisVertical,
                g = this.lblMargin;
            if (q) {
                for (var e = [], d = 0; d < n.length; d++) {
                    var a = n[d],
                        f = false,
                        k = a.y;
                    switch (a.textBaseline) {
                        case "middle":
                            k -= a.height / 2;
                            break;
                        case "bottom":
                            k -= a.height
                    }
                    for (var c = 0, c = 0; c < e.length; c++) {
                        var b = e[c];
                        if (o) f = k > b.y + b.h;
                        else f = b.y > k + a.height;
                        if (f) {
                            b.y = k;
                            b.h = a.height;
                            b.w = Math.max(b.w, a.width + g);
                            b.labels.push(a);
                            break
                        }
                    }
                    if (f == false) e[c] = {
                        y: k,
                        h: a.height,
                        w: a.width + g,
                        labels: [a]
                    }
                }
                var m = this.location == "right";
                m = p ? !m : m;
                i = 0;
                for (var d = 0; d < e.length; d++) {
                    for (var b = e[d], c = 0; c < b.labels.length; c++) {
                        var a = b.labels[c];
                        if (m) a.x += i;
                        else a.x -= i
                    }
                    i += b.w
                }
            } else {
                for (var e = [], d = 0; d < n.length; d++) {
                    var a = n[d],
                        j = a.x;
                    switch (a.textAlign) {
                        case "center":
                            j -= a.width / 2;
                            break;
                        case "right":
                            j -= a.width
                    }
                    for (var f = false, c = 0, c = 0; c < e.length; c++) {
                        var b = e[c];
                        if (o) f = b.x > j + a.width + g;
                        else f = j > b.x + b.w + g;
                        if (f) {
                            b.x = j;
                            b.w = a.width;
                            b.h = Math.max(b.h, a.height + g);
                            b.labels.push(a);
                            f = true;
                            break
                        }
                    }
                    if (f == false) e[c] = {
                        x: j,
                        w: a.width,
                        h: a.height + g,
                        labels: [a]
                    }
                }
                var l = this.location == "bottom";
                l = p ? !l : l;
                h = 0;
                for (var d = 0; d < e.length; d++) {
                    for (var b = e[d], c = 0; c < b.labels.length; c++) {
                        var a = b.labels[c];
                        if (l) a.y += h;
                        else a.y -= h
                    }
                    h += b.h
                }
            }
            if (this.labels.position == "inside") {
                this.lblsW = i;
                this.lblsH = h;
                return {
                    w: 0,
                    h: 0
                }
            }
            return {
                w: i,
                h: h
            }
        },
        _removeOverlappedLabels: function(c) {
            var f = 0,
                e = 0,
                i = 0,
                o = 0,
                l = 0,
                j = 0,
                n = 0,
                m = h,
                s = this.reversed === true,
                u = this.labels.position == "inside",
                r = this.isAxisVertical,
                g = this.lblMargin,
                k = 2 * g;
            if (r)
                for (var v = [], b = 0; b < c.length; b++) {
                    var d = b;
                    if (this.reversed) d = c.length - b - 1;
                    var a = c[d],
                        t = false,
                        q = a.y;
                    switch (a.textBaseline) {
                        case "middle":
                            q -= a.height / 2;
                            break;
                        case "bottom":
                            q -= a.height
                    }
                    j = a.y;
                    n = j + a.height + k;
                    if (n < m) m = j;
                    else {
                        a.visible = false;
                        continue
                    }
                    f = Math.max(f, a.width + g)
                } else
                    for (var b = 0; b < c.length; b++) {
                        var d = b;
                        if (this.reversed) d = c.length - b - 1;
                        var a = c[d],
                            p = a.x;
                        switch (a.textAlign) {
                            case "center":
                                p -= a.width / 2;
                                break;
                            case "right":
                                p -= a.width
                        }
                        i = a.x;
                        o = i + a.width + k;
                        if (i > l) l = o;
                        else {
                            a.visible = false;
                            continue
                        }
                        e = Math.max(e, a.height + g)
                    }
            if (this.labels.position == "inside") {
                this.lblsW = f;
                this.lblsH = e;
                return {
                    w: 0,
                    h: 0
                }
            }
            return {
                w: f,
                h: e
            }
        },
        _measure: function() {
            var b = 0;
            if (this.zoomEnabled) b = this.rangeSlider.breadth;
            var a = {
                w: 0,
                h: 0
            };
            if (this.labels)
                if (this.labels.angle) a = this._measureRotatedLabels(this._getLabels());
                else switch (this.labels.resolveOverlappingMode) {
                    case "hide":
                        a = this._removeOverlappedLabels(this._getLabels());
                        break;
                    case "multipleRows":
                    default:
                        a = this._correctLabelsPositions(this._getLabels())
                }
            this.title._measure();
            var c = this.title.height + b + this.lineWidth;
            if (this.isAxisVertical) a.w += c;
            else a.h += c;
            var d = this.margin + this._getMaxOutsideTickMarksLength();
            if (this.isAxisVertical) {
                if (this.isCustomWidth == false) {
                    var f = a.w + d;
                    if (this.width != f) {
                        this.width = f;
                        return true
                    }
                }
            } else if (this.isCustomHeight == false) {
                var e = a.h + d;
                if (this.height != e) {
                    this.height = e;
                    return true
                }
            }
            return false
        },
        _arrange: function() {
            var a = this.x,
                d = this.y,
                c = this.x + this.width,
                e = this.y + this.height;
            switch (this.location) {
                case "left":
                    c = a = this.x + this.width - this.lineWidth / 2;
                    break;
                case "right":
                    c = a = this.x + this.lineWidth / 2;
                    break;
                case "top":
                    e = d = this.y + this.height - this.lineWidth / 2;
                    break;
                case "bottom":
                    e = d = this.y + this.lineWidth / 2
            }
            if (this.title.text) switch (this.location) {
                case "left":
                    this.title.rotX = this.x;
                    this.title.rotY = this.y + (this.height + this.title.width) / 2;
                    this.title.rotationAngle = b.radians(-90);
                    break;
                case "right":
                    this.title.rotX = this.x + this.width;
                    this.title.rotY = this.y + (this.height - this.title.width) / 2;
                    this.title.rotationAngle = b.radians(90);
                    break;
                case "top":
                    this.title.x = this.x + (this.width - this.title.width) / 2;
                    this.title.y = this.y;
                    break;
                case "bottom":
                    this.title.x = this.x + (this.width - this.title.width) / 2;
                    this.title.y = this.y + this.height - this.title.height
            }
            this.x1 = a;
            this.y1 = d;
            this.x2 = c;
            this.y2 = e;
            this.offset = this.lineWidth
        },
        _updateOrigin: function() {
            if (this.isAxisVertical) {
                this.origin = this.y;
                this.length = this.height
            } else {
                this.origin = this.x;
                this.length = this.width
            }
        },
        _render: function(c) {
            var e = this._getTickMarks(this.minorTickMarks, false);
            a.merge(c, e);
            var d = this._getTickMarks(this.majorTickMarks, true);
            a.merge(c, d);
            var f = this._getMainLine();
            c.push(f);
            var b = this._getLabels();
            if (this.labels && !this.labels.angle) switch (this.labels.resolveOverlappingMode) {
                case "hide":
                    this._removeOverlappedLabels(b);
                    break;
                case "multipleRows":
                default:
                    this._correctLabelsPositions(b)
            }
            this._filterLabels(b);
            this.title._render(c);
            if (this.labels && this.labels.position == "inside") return {
                postShapes: b,
                contextShapes: b
            };
            a.merge(c, b);
            return {
                contextShapes: b
            }
        },
        _getMainLine: function() {
            var a = new n(this.x1, this.y1, this.x2, this.y2);
            a.strokeStyle = this.strokeStyle;
            a.lineWidth = this.lineWidth;
            a.strokeDashArray = this.strokeDashArray;
            return a
        },
        _getMaxInsideTickMarksLength: function() {
            var a = 0;
            if (this.minorTickMarks != null && this.minorTickMarks.visible && this.minorTickMarks.isInside()) a = Math.max(a, this.minorTickMarks.length);
            if (this.majorTickMarks != null && this.majorTickMarks.visible && this.majorTickMarks.isInside()) a = Math.max(a, this.majorTickMarks.length);
            return a
        },
        _getMaxOutsideTickMarksLength: function() {
            var a = 0;
            if (this.minorTickMarks != null && this.minorTickMarks.visible && !this.minorTickMarks.isInside()) a = Math.max(a, this.minorTickMarks.length);
            if (this.majorTickMarks != null && this.majorTickMarks.visible && !this.majorTickMarks.isInside()) a = Math.max(a, this.majorTickMarks.length);
            return a
        },
        _getLabels: function() {
            var c = this.labels;
            if (c == null || c.visible === false) return [];
            var g = c.position == "inside",
                e = this.lblMargin,
                j = this.offset,
                l = this.isAxisVertical;
            if (l && c.vAlign == "center" || !l && c.hAlign == "center") e += g ? this._getMaxInsideTickMarksLength() : this._getMaxOutsideTickMarksLength();
            var m = [],
                o = this._getMarkInterval(c, true);
            if (!o) return [];
            for (var n = this._getLabelIntervals(o, c), p = n.length, r = c.showFirstLabel, s = c.showLastLabel, h = 0; h < p; h++) {
                if (!r && h == 0 || !s && h == p - 1) continue;
                var q = n[h],
                    t = this.getLabel(q),
                    a = this._createLabel(t, c),
                    k = this.getPosition(q);
                switch (this.location) {
                    case "left":
                        if (g) a.x = this.x + this.width + e;
                        else {
                            a.x = this.x + this.width - e - j;
                            a.textAlign = "right"
                        }
                        a.y = k;
                        switch (c.vAlign) {
                            case "bottom":
                                a.textBaseline = "top";
                                break;
                            case "top":
                                a.textBaseline = "bottom"
                        }
                        if (this.labels.angle) {
                            var d = Math.min(90, Math.max(-90, this.labels.angle)),
                                f = b.radians(d);
                            a.rotX = a.x;
                            a.rotY = a.y;
                            a.rotationAngle = f
                        }
                        break;
                    case "right":
                        if (g) {
                            a.x = this.x - e;
                            a.textAlign = "right"
                        } else a.x = this.x + e + j;
                        a.y = k;
                        switch (c.vAlign) {
                            case "bottom":
                                a.textBaseline = "top";
                                break;
                            case "top":
                                a.textBaseline = "bottom"
                        }
                        if (this.labels.angle) {
                            var d = Math.min(90, Math.max(-90, this.labels.angle)),
                                f = b.radians(d);
                            a.rotX = a.x;
                            a.rotY = a.y;
                            a.rotationAngle = f
                        }
                        break;
                    case "top":
                        a.x = k;
                        if (g) a.y = this.y + this.height + e + a.height / 2;
                        else a.y = this.y + this.height - e - a.height / 2 - j;
                        a.textBaseline = "middle";
                        switch (c.hAlign) {
                            case "center":
                                a.textAlign = "center";
                                break;
                            case "left":
                                a.textAlign = "right";
                                break;
                            case "right":
                                a.textAlign = "left"
                        }
                        if (this.labels.angle) {
                            var d = Math.min(90, Math.max(-90, this.labels.angle));
                            a.flip = d > 0;
                            if (d > 0) d = -180 + d;
                            var f = b.radians(d),
                                i = Math.sqrt(a.width * a.width + a.height * a.height);
                            a.rotX = a.x + .5 * Math.cos(f) * i;
                            a.rotY = a.y + .5 * Math.sin(f) * i;
                            a.rotationAngle = f
                        }
                        break;
                    case "bottom":
                        a.x = k;
                        if (g) a.y = this.y - e - a.height / 2;
                        else a.y = this.y + e + a.height / 2 + j;
                        a.textBaseline = "middle";
                        switch (c.hAlign) {
                            case "center":
                                a.textAlign = "center";
                                break;
                            case "left":
                                a.textAlign = "right";
                                break;
                            case "right":
                                a.textAlign = "left"
                        }
                        if (this.labels.angle) {
                            var d = Math.min(90, Math.max(-90, this.labels.angle));
                            a.flip = d < 0;
                            if (d < 0) d = 180 + d;
                            var f = b.radians(d),
                                i = Math.sqrt(a.width * a.width + a.height * a.height);
                            a.rotX = a.x + .5 * Math.cos(f) * i;
                            a.rotY = a.y + .5 * Math.sin(f) * i;
                            a.rotationAngle = f
                        }
                }
                m.push(a)
            }
            return m
        },
        _filterLabels: function(b) {
            if (!this.labels || this.labels.position != "inside") return;
            for (var c = this.chart.gridArea, i = c.x, j = c.y, h = c.width, g = c.height, d = b.length - 1; d >= 0; d--) {
                var e = b[d];
                if (!e.isInRect(i, j, h, g)) {
                    var f = a.inArray(e, b);
                    b.splice(f, 1)
                }
            }
        },
        _getTickMarks: function(c, m) {
            if (c == null || c.visible != true) return [];
            for (var k = [], h = this.offset, g = c.position == "inside", p = this._getMarkInterval(c, m), b = c.length, l = this._getIntervals(p, c, m), d, f, e, a, j = 0; j < l.length; j++) {
                var i = this.getPosition(l[j]);
                switch (this.location) {
                    case "left":
                        f = a = i;
                        if (g) e = this.x + this.width + b;
                        else e = this.x + this.width - h;
                        d = e - b;
                        break;
                    case "right":
                        f = a = i;
                        if (g) d = this.x - b;
                        else d = this.x + h;
                        e = d + b;
                        break;
                    case "top":
                        d = e = i;
                        if (g) a = this.y + this.height + b;
                        else a = this.y + this.height - h;
                        f = a - b;
                        break;
                    case "bottom":
                        d = e = i;
                        if (g) a = this.y - b;
                        else a = this.y + h;
                        f = a + b
                }
                var o = new n(d, f, e, a);
                c._setLineSettings(o);
                k.push(o)
            }
            return k
        },
        _setChart: function(a) {
            this.chart = a;
            this.title.chart = a
        },
        _getValue: function(a) {
            return a
        },
        _initRadialMeasures: function() {
            var a = Math.min(this.width, this.height);
            this.cx = this.x + this.width / 2;
            this.cy = this.y + this.height / 2;
            this.radius = a / 2
        },
        getZoom: function() {
            if (!this.actualMaximum) return 1;
            var b = this.actualMaximum - this.actualMinimum,
                a = this.actualVisibleMaximum - this.actualVisibleMinimum,
                c = a / b;
            return c
        },
        setOptions: function(c) {
            if (c != null && typeof c.title == "string") {
                c.title = {
                    text: c.title
                };
                a.extend(c.title, this.defaults.title)
            }
            var b = a.extend(true, {}, this.defaults, c || {});
            a.extend(this, b);
            this.options = c;
            this.isCustomWidth = this.width != null;
            this.isCustomHeight = this.height != null;
            this.majorTickMarks = new Db(b.majorTickMarks);
            if (b.minorTickMarks) {
                this.minorTickMarks = new Db(b.minorTickMarks);
                this.minorTickMarks.major = this.majorTickMarks
            }
            if (b.majorGridLines) this.majorGridLines = new Cb(b.majorGridLines);
            if (b.minorGridLines) {
                this.minorGridLines = new Cb(b.minorGridLines);
                this.minorGridLines.major = this.majorGridLines
            }
            this.isAxisVertical = this.isVertical();
            this.title = new T(b.title)
        },
        getPosition: function(f) {
            var e = this.actualVisibleMaximum,
                d = this.actualVisibleMinimum,
                a = this.length / (e - d) * (f - d),
                b = this.reversed === true,
                c = this.isAxisVertical;
            if (c && b === false || c === false && b) a = this.origin + this.length - a;
            else a += this.origin;
            return a
        },
        getValue: function(f) {
            var e = this.actualVisibleMaximum,
                a = this.actualVisibleMinimum,
                b = (f - this.origin) * (e - a) / this.length + a,
                c = this.reversed === true,
                d = this.isAxisVertical;
            if (d && c === false || d === false && c) b = a + e - b;
            return b
        },
        getLabel: function(d) {
            var b = null;
            if (this.labels != null) b = this.labels.stringFormat;
            var c = a.fn.jqChart.labelFormatter(b, d);
            return c
        },
        isVertical: function() {
            return this.location == "left" || this.location == "right" ? true : false
        },
        isValueVisible: function(a) {
            if (this.logarithmic) a = b.log(a, this.logBase);
            return a >= this.actualVisibleMinimum && a <= this.actualVisibleMaximum
        },
        isInVisibleRange: function(d) {
            var c = this.visibleMinimum,
                a = this.visibleMaximum;
            if (b.isNull(c) || b.isNull(a)) return true;
            if (this.logarithmic) {
                c = b.log(c, this.logBase);
                a = b.log(a, this.logBase)
            }
            return d >= c && d <= a
        },
        defaults: {
            location: "left",
            labels: {
                visible: true,
                fillStyle: "black",
                lineWidth: 1,
                font: "11px sans-serif",
                position: "outside",
                showLastLabel: true,
                showFirstLabel: true,
                hAlign: "center",
                vAlign: "center"
            },
            title: {
                font: "14px sans-serif",
                margin: 2
            },
            strokeStyle: "black",
            lineWidth: 1,
            margin: 5,
            crossing: 0,
            visible: true,
            reversed: false,
            zoomEnabled: false
        }
    };
    var j = -Number.MAX_VALUE,
        h = Number.MAX_VALUE;

    function b() {}
    b.isNull = function(a) {
        return a === null || a === undefined
    };
    b.roundH = function(a) {
        return Math.round(a) - .5
    };
    b.round = function(a) {
        var c = 1 / a;
        if (Math.abs(c) > 1e4) {
            var d = b.log10(Math.abs(c));
            if (d > 13) return a
        }
        var e = a.toPrecision(14),
            f = parseFloat(e);
        return f
    };
    b.log10 = function(a) {
        return Math.log(a) / Math.LN10
    };
    b.log = function(b, a) {
        return Math.log(b) / Math.log(a)
    };
    b.radians = function(a) {
        return a * (Math.PI / 180)
    };
    b.fitInRange = function(a, c, b) {
        if (a < c) a = c;
        else if (a > b) a = b;
        return a
    };
    b.sum = function(b) {
        for (var c = 0, a = 0; a < b.length; a++) c += b[a];
        return c
    };
    b.compareArrays = function(a, b) {
        if (!a && !b) return true;
        if (!a || !b) return false;
        if (a.length != b.length) return false;
        for (var c = 0; c < a.length; c++)
            if (a[c] !== b[c]) return false;
        return true
    };
    b.rotatePointAt = function(j, k, c, a, b) {
        var e = Math.sin(c),
            d = Math.cos(c),
            f = j - a,
            g = k - b,
            h = a + f * d - g * e,
            i = b + f * e + g * d;
        return {
            x: h,
            y: i
        }
    };
    b.rotatePointsAt = function(d, h, f, g) {
        for (var c = [], a = 0; a < d.length; a += 2) {
            var e = b.rotatePointAt(d[a], d[a + 1], h, f, g);
            c.push(e.x);
            c.push(e.y)
        }
        return c
    };
    b.reversePoints = function(c) {
        for (var b = [], a = c.length - 2; a >= 0; a -= 2) {
            b.push(c[a]);
            b.push(c[a + 1])
        }
        return b
    };

    function d() {}
    d.ticksInDay = 24 * 60 * 60 * 1e3;
    d.getDaysInMonth = function(b, a) {
        return a == 1 ? (new Date(b, 1, 29)).getDate() == 29 ? 29 : 28 : ([31, undefined, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])[a]
    };
    d.addSeconds = function(c, b) {
        return new Date(c.getTime() + b * 1e3)
    };
    d.addDays = function(c, a) {
        a = Math.max(a, 1);
        var b = new Date(c.getTime());
        b.setDate(c.getDate() + a);
        return b
    };
    d.addYears = function(b, c) {
        var a = new Date(b.getTime());
        a.setFullYear(b.getFullYear() + c);
        return a
    };
    d.addMonths = function(c, b) {
        var a = new Date(c.getTime()),
            e = a.getDate();
        a.setDate(1);
        a.setMonth(a.getMonth() + b);
        a.setDate(Math.min(e, d.getDaysInMonth(a.getFullYear(), a.getMonth())));
        return a
    };
    d.getDayOfWeek = function(b) {
        var a = b.getDay();
        return a === 0 ? 7 : a
    };
    d.fromDays = function(a) {
        return a * d.ticksInDay
    };
    d.fromHours = function(a) {
        return a * 60 * 60 * 1e3
    };
    d.fromMinutes = function(a) {
        return a * 60 * 1e3
    };
    d.fromSeconds = function(a) {
        return a * 1e3
    };
    d.roundToDay = function(a) {
        return new Date(a.getFullYear(), a.getMonth(), a.getDate())
    };

    function c() {
        this.fillStyle = "black";
        this.strokeStyle = "black";
        this.lineWidth = 1;
        this.lineCap = "butt";
        this.lineJoin = "miter";
        this.miterLimit = 10;
        this.visible = true;
        this.shadowColor = "rgba(0, 0, 0, 0)";
        this.shadowBlur = 0;
        this.shadowOffsetX = 0;
        this.shadowOffsetY = 0
    }
    c.compare = function(b, e, a, j) {
        if (!b.useHitTestArea && !e.useHitTestArea) return true;
        if (b.useHitTestArea && !e.useHitTestArea) return b.hitTest(a.locX, a.locY, j / 3);
        if (b.hitTest(a.locX, a.locY, 0)) return true;
        var f = b.getCenter(a),
            g = e.getCenter(a),
            c = a.locX - f.x,
            d = a.locY - f.y,
            h = Math.sqrt(c * c + d * d);
        c = a.locX - g.x;
        d = a.locY - g.y;
        var i = Math.sqrt(c * c + d * d);
        return h <= i
    };
    c.getColorFromFillStyle = function(a) {
        if (a == null) return "#dddddd";
        if (typeof a == "string") return a;
        if (a.colorStops && a.colorStops[0]) {
            var b = a.colorStops[0].color;
            return b != "white" && b != "#ffffff" ? b : a.colorStops[1].color
        }
        return "#dddddd"
    };
    c.prototype.hitTest = function() {
        return false
    };
    c.prototype.boundsHitTest = function(b, c, a) {
        if (!this.useHitTestArea) a = 0;
        return b >= this.x - a && b <= this.x + this.width + a && c >= this.y - a && c <= this.y + this.height + a
    };
    c.prototype.render = function(b, a) {
        !a && this.setProperties(b)
    };
    c.prototype.renderDashedLine = function(f, h, g, i, l, c) {
        var r = function(a, b) {
                return a <= b
            },
            q = function(a, b) {
                return a >= b
            },
            n = function(a, b) {
                return Math.min(a, b)
            },
            m = function(a, b) {
                return Math.max(a, b)
            },
            d = {
                thereYet: q,
                cap: n
            },
            e = {
                thereYet: q,
                cap: n
            };
        c.beginPath();
        if (h - i > 0) {
            e.thereYet = r;
            e.cap = m
        }
        if (f - g > 0) {
            d.thereYet = r;
            d.cap = m
        }
        c.moveTo(f, h);
        var a = f,
            b = h,
            k = 0,
            j = true,
            s = l.length;
        while (!(d.thereYet(a, g) && e.thereYet(b, i))) {
            var o = Math.atan2(i - h, g - f),
                p = l[k];
            a = d.cap(g, a + Math.cos(o) * p);
            b = e.cap(i, b + Math.sin(o) * p);
            if (j) c.lineTo(a, b);
            else c.moveTo(a, b);
            k = (k + 1) % s;
            j = !j
        }
        this.strokeStyle != null && this.lineWidth > 0 && c.stroke()
    };
    c.prototype.setProperties = function(a) {
        a.fillStyle = this._createGradient(a, this.fillStyle) || "#000000";
        a.strokeStyle = this.strokeStyle || "#000000";
        a.lineWidth = this.lineWidth || 0;
        a.lineCap = this.lineCap;
        a.lineJoin = this.lineJoin;
        a.miterLimit = this.miterLimit;
        a.shadowColor = this.shadowColor;
        a.shadowBlur = this.shadowBlur;
        a.shadowOffsetX = this.shadowOffsetX;
        a.shadowOffsetY = this.shadowOffsetY
    };
    c.prototype.calculateBounds = function(a) {
        if (a == null) return;
        for (var b = h, c = h, e = j, f = j, d = 0; d < a.length; d += 2) {
            var g = a[d],
                i = a[d + 1];
            b = Math.min(b, g);
            c = Math.min(c, i);
            e = Math.max(e, g);
            f = Math.max(f, i)
        }
        this.x = b;
        this.y = c;
        this.width = e - b;
        this.height = f - c;
        this.center = this.getCenter()
    };
    c.prototype.getCenter = function() {
        return this.center ? this.center : {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
    };
    c.prototype.getTooltipColor = function() {
        return c.getColorFromFillStyle(this.fillStyle)
    };
    c.prototype._createGradient = function(h, c) {
        if (c == null || typeof c == "string" || this.width == null || this.height == null || this.x == null || this.y == null) return c;
        var d, b = {
            x0: 0,
            y0: 0,
            x1: 1,
            y1: 1,
            r0: 0,
            r1: 1
        };
        a.extend(b, c);
        switch (c.type) {
            case "radialGradient":
                var k = this.x + b.x0 * this.width,
                    m = this.y + b.y0 * this.height,
                    i = b.r0 * this.width / 2,
                    l = this.x + b.x1 * this.width,
                    n = this.y + b.y1 * this.height,
                    j = b.r1 * this.width / 2;
                d = h.createRadialGradient(k, m, i, l, n, j);
                break;
            default:
                var q = this.x + b.x0 * this.width,
                    r = this.y + b.y0 * this.height,
                    p = this.x + b.x1 * this.width,
                    o = this.y + b.y1 * this.height;
                d = h.createLinearGradient(q, r, p, o)
        }
        var e = b.colorStops;
        if (e != null)
            for (var f = 0; f < e.length; f++) {
                var g = e[f];
                d.addColorStop(g.offset || 0, g.color)
            }
        return d
    };
    c.prototype._createHighlightShape = function(d) {
        var b = new c;
        a.extend(b, this);
        b.fillStyle = b.highlightingFillStyle || d;
        return b
    };
    c.prototype._getTooltipPosition = function(d, f, e, c, b) {
        var a = this._getTooltipOrigin(d);
        return this._getTooltipPositionFromOrigin(a.x, a.y, f, e, c, b)
    };
    c.prototype._getTooltipOrigin = function() {
        return this.tooltipOrigin ? this.tooltipOrigin : {
            x: this.x + this.width / 2,
            y: this.y
        }
    };
    c.prototype._getTooltipPositionFromOrigin = function(d, e, g, f) {
        var a = 15,
            b = d - g - a,
            c = e - f + 10;
        if (b < 0) b = Math.max(0, d + a);
        if (c < 0) c = Math.max(0, e - a);
        return {
            x: b,
            y: c
        }
    };
    c.prototype._getAnimationPoints = function(c, a) {
        if (c.length == a) return c;
        var d = a % 2;
        a -= d;
        var f = c.slice(0, a);
        d /= 2;
        var i = c[a - 2],
            g = c[a - 1],
            h = c[a],
            e = c[a + 1];
        if (!b.isNull(g) && !b.isNull(e)) {
            h = i + (h - i) * d;
            e = g + (e - g) * d;
            f.push(h);
            f.push(e)
        }
        return f
    };

    function n(a, d, b, e) {
        c.call(this);
        this.x1 = a;
        this.y1 = d;
        this.x2 = b;
        this.y2 = e;
        this.useHitTestArea = true
    }
    n.prototype = new c;
    n.constructor = new n;
    n.prototype.hitTest = function(f, g, j) {
        var b = this.x1,
            d = this.y1,
            c = this.x2,
            e = this.y2,
            a = Math.max(j, Math.max(3, this.lineWidth / 2));
        if (b == c) {
            var h = f + 1;
            return h > b - a && h < c + a && g >= d - a && g <= e + a ? true : false
        }
        if (d == e) {
            var i = g + .5;
            return f >= b - a && f <= c + a && i > d - a && i < e + a ? true : false
        }
        return false
    };
    n.prototype.hitTestNonHV = function(k, l, j) {
        var a = this.x1,
            b = this.y1,
            c = this.x2,
            d = this.y2;
        if (a < c) {
            this.x = a;
            this.width = c - a
        } else {
            this.x = c;
            this.width = a - c
        }
        if (b < d) {
            this.y = b;
            this.width = d - b
        } else {
            this.y = d;
            this.width = b - d
        }
        if (this.boundsHitTest(k, l, j) == false) return false;
        var g = c - a,
            h = d - b,
            e, f, i;
        if (g == 0) {
            e = 1;
            f = 0;
            i = -a
        } else if (h == 0) {
            e = 0;
            f = -1;
            i = -b
        } else if (Math.abs(g) < Math.abs(h)) {
            e = 1;
            f = g / h;
            i = -((a * d - b * c) / h)
        } else {
            e = -(h / g);
            f = -1;
            i = -((b * c - a * d) / g)
        }
        var n = Math.sqrt(e * e + f * f),
            m = (e * k - f * l + i) / n,
            o = Math.max(j, 3);
        return Math.abs(m) < o ? true : false
    };
    n.prototype.render = function(a, i) {
        if (!this.visible) return;
        c.prototype.render.call(this, a, i);
        var d = Math.floor(this.lineWidth % 2) ? b.roundH : Math.round;
        if (this.dontRound) d = function(a) {
            return a
        };
        var e = d(this.x1),
            g = d(this.y1),
            f = d(this.x2),
            h = d(this.y2);
        if (this.strokeDashArray) {
            this.renderDashedLine(e, g, f, h, this.strokeDashArray, a);
            return
        }
        a.beginPath();
        a.moveTo(e, g);
        a.lineTo(f, h);
        this.strokeStyle != null && this.lineWidth > 0 && a.stroke()
    };

    function i(d, e, b, a) {
        c.call(this);
        this.x = d;
        this.y = e;
        this.width = b;
        this.height = a;
        this.cornerRadius = 0
    }
    i.prototype = new c;
    i.constructor = new i;
    i.prototype.hitTest = function(b, c, a) {
        return this.boundsHitTest(b, c, a)
    };
    i.prototype.render = function(d, o) {
        if (!this.visible) return;
        c.prototype.render.call(this, d, o);
        var k = this.strokeStyle != null && this.lineWidth > 0,
            n = k && Math.floor(this.lineWidth % 2) ? b.roundH : Math.round,
            m = this.correction || 0;
        m = Math.round(m);
        var h = n(this.x),
            j = n(this.y),
            f = Math.round(this.width),
            e = Math.round(this.height),
            a = this.context;
        if (this.xDecrease) {
            var l = a.series.realYAxis.crossing,
                g = Math.round(this.xDecrease);
            f -= g;
            if (a && (a.y < l || a.from >= a.to)) h += g
        }
        if (!b.isNull(this.yDecrease)) {
            var l = a.series.realYAxis.crossing,
                g = Math.round(this.yDecrease);
            e -= g;
            if (!a || a.y >= l || a.from < a.to) j += g
        }
        if (f <= 0 || e <= 0) return;
        if (this.cornerRadius == 0) i.renderRectPath(d, h, j, f, e);
        else this.renderRoundedRectPath(d, h, j, f, e);
        this.fillStyle != null && d.fill();
        k && d.stroke()
    };
    i.renderRectPath = function(a, b, c, e, d) {
        a.beginPath();
        a.moveTo(b, c);
        a.lineTo(b + e, c);
        a.lineTo(b + e, c + d);
        a.lineTo(b, c + d);
        a.closePath()
    };
    i.prototype.renderRoundedRectPath = function(b, c, d, g, f) {
        var a = this.cornerRadius,
            e = Math.PI / 2;
        b.beginPath();
        b.moveTo(c + a, d);
        b.lineTo(c + g - a, d);
        b.arc(c + g - a, d + a, a, -e, 0, false);
        b.lineTo(c + g, d + f - a);
        b.arc(c + g - a, d + f - a, a, 0, e, false);
        b.lineTo(c + a, d + f);
        b.arc(c + a, d + f - a, a, e, 2 * e, false);
        b.lineTo(c, d + a);
        b.arc(c + a, d + a, a, 2 * e, -e, false);
        b.closePath()
    };

    function Eb(d, e, b, a) {
        c.call(this);
        this.x = d;
        this.y = e;
        this.width = b;
        this.height = a
    }
    Eb.prototype = new c;
    Eb.constructor = new Eb;
    Eb.prototype.hitTest = function(f, g, a) {
        if (this.boundsHitTest(f, g, a) == false) return false;
        var c = (this.width + a) / 2,
            b = (this.height + a) / 2,
            h = this.x + c,
            i = this.y + b,
            d = f - h,
            e = g - i,
            j = d * d / (c * c),
            k = e * e / (b * b);
        return j + k <= 1
    };
    Eb.prototype.render = function(a, m) {
        if (!this.visible) return;
        c.prototype.render.call(this, a, m);
        var d = this.x,
            f = this.y,
            l = this.width,
            k = this.height,
            g = this.width / 2 * .5522848,
            h = this.height / 2 * .5522848,
            i = d + l,
            j = f + k,
            e = d + l / 2,
            b = f + k / 2;
        a.beginPath();
        a.moveTo(d, b);
        a.bezierCurveTo(d, b - h, e - g, f, e, f);
        a.bezierCurveTo(e + g, f, i, b - h, i, b);
        a.bezierCurveTo(i, b + h, e + g, j, e, j);
        a.bezierCurveTo(e - g, j, d, b + h, d, b);
        a.closePath();
        this.fillStyle != null && a.fill();
        this.strokeStyle != null && this.lineWidth > 0 && a.stroke()
    };

    function ab(b, d, a) {
        c.call(this);
        this.x = b;
        this.y = d;
        this.radius = a;
        this.width = this.height = 2 * a
    }
    ab.prototype = new c;
    ab.constructor = new ab;
    ab.prototype.hitTest = function(e, f, a) {
        if (!this.useHitTestArea) a = 0;
        var c = this.x + this.width / 2,
            d = this.y + this.height / 2,
            b = Math.pow(e - c, 2) + Math.pow(f - d, 2);
        return b > Math.pow(this.radius + a, 2) ? false : true
    };
    ab.prototype.render = function(a, d) {
        if (!this.visible) return;
        c.prototype.render.call(this, a, d);
        a.beginPath();
        var b = this.radius;
        a.arc(Math.round(this.x + b), Math.round(this.y + b), Math.round(b), 0, Math.PI * 2, false);
        a.closePath();
        this.fillStyle != null && a.fill();
        this.strokeStyle != null && this.lineWidth > 0 && a.stroke()
    };

    function mb(f, g, a, b, d) {
        c.call(this);
        this.x = f;
        this.y = g;
        this.radius = a;
        this.startAngle = b;
        this.endAngle = d;
        this.width = this.height = 2 * a;
        var e = (b + d) / 2,
            h = f + a * Math.cos(e),
            i = g + a * Math.sin(e);
        this.center = this.tooltipOrigin = {
            x: h,
            y: i
        }
    }
    mb.prototype = new c;
    mb.constructor = new mb;
    mb.prototype.hitTest = function(d, e) {
        var b = this.x,
            c = this.y,
            f = Math.pow(d - b, 2) + Math.pow(e - c, 2);
        if (f > Math.pow(this.radius, 2)) return false;
        var g = b - d,
            h = c - e,
            a = Math.atan2(h, g) + Math.PI;
        if (a > 3 * Math.PI / 2) a -= 2 * Math.PI;
        return a >= this.startAngle && a < this.endAngle ? true : false
    };
    mb.prototype.render = function(a, e) {
        if (!this.visible) return;
        if (this.startAngle == this.endAngle) return;
        c.prototype.render.call(this, a, e);
        a.beginPath();
        var b = Math.round(this.x),
            d = Math.round(this.y);
        a.moveTo(b, d);
        a.arc(b, d, Math.round(this.radius), this.startAngle, this.endAngle, false);
        a.closePath();
        this.fillStyle != null && a.fill();
        this.strokeStyle != null && this.lineWidth > 0 && a.stroke()
    };

    function t() {
        c.call(this)
    }
    t.prototype = new c;
    t.constructor = new t;
    t.prototype.hitTest = function(k, l, g) {
        var e = this.context;
        if (!e || !e.points) return this.boundsHitTest(k, l, g);
        for (var d = this.pts, m = Math.pow(g, 2), c = -1, f = h, i, j, b, a = 0; a < d.length; a += 2) {
            i = d[a];
            j = d[a + 1];
            b = Math.pow(k - i, 2) + Math.pow(l - j, 2);
            if (b > f || b > m) continue;
            f = b;
            c = a
        }
        return c == -1 ? false : this.createHighlightMark(c)
    };
    t.prototype.createHighlightMark = function(c) {
        if (c == -1) return null;
        var d = this.context,
            f = this.pts,
            g = d.points[c / 2],
            e = 5,
            b = new ab(f[c] - e, f[c + 1] - e, e);
        b.fillStyle = b.highlightingFillStyle = this.strokeStyle;
        b.strokeStyle = "white";
        b.lineWidth = 1;
        b.useHitTestArea = true;
        b.context = {
            series: d.series,
            chart: d.chart
        };
        a.extend(b.context, g);
        return b
    };
    t.prototype.getCenter = function(g) {
        if (this.center) return this.center;
        var e = this.context;
        if (!e || !e.points) return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
        for (var b = this.pts, a = 0, f = h, i = g.locX, d, c = 0; c < b.length; c += 2) {
            d = Math.abs(b[c] - i);
            if (f > d) {
                f = d;
                a = c
            }
        }
        return {
            x: b[a],
            y: b[a + 1],
            mark: this.createHighlightMark(a)
        }
    };
    t.prototype.getLength = function() {
        return this.pts.length
    };

    function C(b, a) {
        t.call(this);
        this.pts = b;
        if (a) {
            this.isBoundsHitTest = a;
            this.calculateBounds(b)
        }
    }
    C.prototype = new t;
    C.constructor = new C;
    C.prototype.renderPoints = function(a, c) {
        var g = c.length;
        if (g <= 2) return;
        if (this.strokeDashArray) {
            this.renderDashed(a, c);
            return
        }
        for (var h = this.nullHandling != "connect", e = true, b = 2; b < g; b += 2) {
            var d = c[b];
            if (d == null) {
                if (h) {
                    a.stroke();
                    e = false
                }
                continue
            }
            var f = c[b + 1];
            if (!e) {
                a.beginPath();
                a.moveTo(d, f);
                e = true;
                continue
            }
            a.lineTo(d, f);
            if (b % 1e3 == 0) {
                a.stroke();
                a.beginPath();
                a.moveTo(d, f)
            }
        }
    };
    C.prototype.render = function(d, f) {
        if (!this.visible) return;
        c.prototype.render.call(this, d, f);
        var a = this.pts;
        if (!b.isNull(this.length)) a = this._getAnimationPoints(a, this.length);
        var e = a.length;
        if (e <= 2) return;
        d.beginPath();
        d.moveTo(a[0], a[1]);
        this.renderPoints(d, a);
        this.strokeStyle != null && this.lineWidth > 0 && d.stroke()
    };
    C.prototype.renderDashed = function(k, f) {
        for (var j = f.length, i = this.nullHandling != "connect", h = this.strokeDashArray, c = false, d, e, a = 0; a < j; a += 2) {
            var b = f[a];
            if (b == null) {
                if (i) c = false;
                continue
            }
            var g = f[a + 1];
            if (!c) {
                d = b;
                e = g;
                c = true;
                continue
            }
            this.renderDashedLine(d, e, b, g, h, k);
            d = b;
            e = g
        }
    };

    function u(a, b) {
        t.call(this);
        if (!a) return;
        this.closed = b;
        this.pts = a;
        this.calculateBounds(a)
    }
    u.prototype = new t;
    u.constructor = new u;
    u.prototype.renderPoints = function(f, i) {
        var g = .4,
            h = this.closed,
            b = [];
        a.merge(b, i);
        var d = [],
            e = b.length;
        if (e <= 2) return;
        if (e == 4) {
            f.lineTo(b[2], b[3]);
            return
        }
        if (h) {
            b.push(b[0], b[1], b[2], b[3]);
            b.unshift(b[e - 1]);
            b.unshift(b[e - 1]);
            for (var c = 0; c < e; c += 2) d = d.concat(this.getControlPoints(b[c], b[c + 1], b[c + 2], b[c + 3], b[c + 4], b[c + 5], g));
            d = d.concat(d[0], d[1]);
            for (var c = 2; c < e + 2; c += 2) f.bezierCurveTo(d[2 * c - 2], d[2 * c - 1], d[2 * c], d[2 * c + 1], b[c + 2], b[c + 3])
        } else {
            for (var c = 0; c < e - 4; c += 2) d = d.concat(this.getControlPoints(b[c], b[c + 1], b[c + 2], b[c + 3], b[c + 4], b[c + 5], g));
            f.quadraticCurveTo(d[0], d[1], b[2], b[3]);
            for (var c = 2; c < e - 5; c += 2) f.bezierCurveTo(d[2 * c - 2], d[2 * c - 1], d[2 * c], d[2 * c + 1], b[c + 2], b[c + 3]);
            f.quadraticCurveTo(d[2 * e - 10], d[2 * e - 9], b[e - 2], b[e - 1])
        }
    };
    u.prototype.render = function(a, f) {
        if (!this.visible) return;
        c.prototype.render.call(this, a, f);
        var d = this.pts;
        if (!b.isNull(this.length)) d = this._getAnimationPoints(d, this.length);
        var e = d.length;
        if (e < 4) return;
        a.beginPath();
        a.moveTo(d[0], d[1]);
        this.renderPoints(a, d);
        if (this.closed) {
            a.closePath();
            this.fillStyle != null && a.fill()
        }
        this.strokeStyle != null && this.lineWidth > 0 && a.stroke()
    };
    u.prototype.getControlPoints = function(d, f, a, b, e, g, j) {
        var h = Math.sqrt(Math.pow(a - d, 2) + Math.pow(b - f, 2)),
            k = Math.sqrt(Math.pow(e - a, 2) + Math.pow(g - b, 2)),
            c = j * h / (h + k),
            i = j - c,
            l = a + c * (d - e),
            m = b + c * (f - g),
            n = a - i * (d - e),
            o = b - i * (f - g);
        return [l, m, n, o]
    };

    function bb(b, c, e, f) {
        t.call(this);
        this.pts = b;
        this.crossPos = c;
        this.vertical = e;
        this.isCurve = f;
        if (b && b.length >= 2) {
            var d = [];
            a.merge(d, b);
            if (e) a.merge(d, [c, b[b.length - 1], c, b[1]]);
            else a.merge(d, [b[b.length - 2], c, b[0], c]);
            this.calculateBounds(d)
        }
    }
    bb.prototype = new t;
    bb.constructor = new bb;
    bb.prototype.render = function(d, g) {
        if (!this.visible) return;
        c.prototype.render.call(this, d, g);
        var a = this.pts;
        if (!b.isNull(this.length)) a = this._getAnimationPoints(a, this.length);
        var f = a.length;
        if (f <= 2) return;
        var e;
        if (this.isCurve) e = new u(a);
        else e = new C(a);
        d.beginPath();
        d.moveTo(a[0], a[1]);
        e.renderPoints(d, a);
        if (this.vertical) {
            d.lineTo(this.crossPos, a[a.length - 1]);
            d.lineTo(this.crossPos, a[1])
        } else {
            d.lineTo(a[a.length - 2], this.crossPos);
            d.lineTo(a[0], this.crossPos)
        }
        d.closePath();
        this.fillStyle != null && d.fill();
        this.strokeStyle != null && this.lineWidth > 0 && d.stroke()
    };

    function fb(c, d, e) {
        t.call(this);
        if (!c) return;
        this.pts1 = c;
        this.pts2 = d;
        this.pts = [];
        a.merge(this.pts, c);
        a.merge(this.pts, b.reversePoints(d));
        this.calculateBounds(this.pts);
        this.isCurve = e
    }
    fb.prototype = new t;
    fb.constructor = new fb;
    fb.prototype.getLength = function() {
        return this.pts.length / 2
    };
    fb.prototype.render = function(d, h) {
        if (!this.visible) return;
        c.prototype.render.call(this, d, h);
        var e = this.pts1,
            a = this.pts2;
        if (!b.isNull(this.length)) {
            e = this._getAnimationPoints(e, this.length);
            a = this._getAnimationPoints(a, this.length)
        }
        a = b.reversePoints(a);
        var g = e.length;
        if (g < 2) return;
        var f;
        if (this.isCurve) f = new u(e);
        else f = new C(e);
        d.beginPath();
        d.moveTo(e[0], e[1]);
        f.renderPoints(d, e);
        d.lineTo(a[0], a[1]);
        if (this.isCurve) f = new u(a);
        else f = new C(a);
        f.renderPoints(d, a);
        d.closePath();
        this.fillStyle != null && d.fill();
        this.strokeStyle != null && this.lineWidth > 0 && d.stroke()
    };

    function M(a) {
        t.call(this);
        this.pts = a;
        this.calculateBounds(a)
    }
    M.prototype = new t;
    M.constructor = new M;
    M.prototype.hitTest = function(j, a, h) {
        var k = this.context;
        if (k && k.points) return t.prototype.hitTest.call(this, j, a, h);
        var n = this.boundsHitTest(j, a, h);
        if (n == false) return false;
        if (this.isBoundsHitTest && h) return true;
        for (var b = this.pts, g = false, l = b.length, i, c, m, e, d = 0, f = 0; f < l; f += 2) {
            d += 2;
            if (d == l) d = 0;
            i = b[f];
            c = b[f + 1];
            m = b[d];
            e = b[d + 1];
            if (c < a && e >= a || e < a && c >= a)
                if (i + (a - c) / (e - c) * (m - i) < j) g = !g
        }
        return g
    };
    M.prototype.render = function(a, h) {
        if (!this.visible) return;
        c.prototype.render.call(this, a, h);
        var d = this.pts,
            g = d.length;
        if (g < 4) return;
        var e = Math.floor(this.lineWidth % 2) ? b.roundH : Math.round;
        if (this.dontRound) e = function(a) {
            return a
        };
        a.beginPath();
        a.moveTo(e(d[0]), e(d[1]));
        for (var f = 2; f < g; f += 2) a.lineTo(e(d[f]), e(d[f + 1]));
        a.closePath();
        this.fillStyle != null && a.fill();
        this.strokeStyle != null && this.lineWidth > 0 && a.stroke()
    };

    function q(a, b, c) {
        this.text = a;
        this.x = b;
        this.y = c;
        this.strokeStyle = null;
        this.textBaseline = "middle";
        this.font = "10px sans-serif";
        this.textAlign = "left"
    }
    q.prototype = new c;
    q.constructor = q;
    q.prototype.render = function(a, f) {
        if (!this.visible) return;
        c.prototype.render.call(this, a, f);
        var d = b.roundH(this.x),
            e = b.roundH(this.y);
        if (this.rotationAngle && !b.isNull(this.rotX) && !b.isNull(this.rotY)) {
            a.save();
            a.translate(this.rotX, this.rotY);
            a.rotate(this.rotationAngle);
            this.flip && a.scale(-1, -1);
            this.renderBg(a);
            this.fillStyle != null && a.fillText(this.text, 0, 0);
            this.strokeStyle != null && a.strokeText(this.text, 0, 0);
            a.restore()
        } else {
            this.renderBg(a);
            this.fillStyle != null && a.fillText(this.text, d, e);
            this.strokeStyle != null && a.strokeText(this.text, d, e)
        }
    };
    q.prototype.renderBg = function(a) {
        var e = this.background;
        if (!e) return;
        var g = b.roundH(this.x),
            h = b.roundH(this.y);
        !this.width && this.measure(a);
        var d = Math.round(this.width),
            c = Math.round(this.height);
        a.fillStyle = this._createGradient(a, e) || "#000000";
        var f = this._correctXY(g, h, d, c);
        i.renderRectPath(a, f.x, f.y, d, c);
        a.fill();
        a.fillStyle = this._createGradient(a, this.fillStyle) || "#000000"
    };
    q.prototype.measure = function(a) {
        this.setProperties(a);
        var d = a.measureText(this.text),
            b = parseFloat(this.font) || 0,
            c = d.width;
        this.width = c;
        this.height = b;
        return {
            width: c,
            height: b
        }
    };
    q.prototype._correctXY = function(a, b, d, c) {
        switch (this.textAlign) {
            case "center":
                a -= d / 2;
                break;
            case "right":
                a -= d
        }
        switch (this.textBaseline) {
            case "middle":
                b -= c / 2;
                break;
            case "bottom":
                b -= c
        }
        return {
            x: a,
            y: b
        }
    };
    q.prototype.isInRect = function(e, f, h, g) {
        var a = this.x,
            b = this.y,
            d = this.width,
            c = this.height;
        switch (this.textAlign) {
            case "center":
                a -= d / 2;
                break;
            case "right":
                a -= d
        }
        switch (this.textBaseline) {
            case "middle":
                b -= c / 2;
                break;
            case "bottom":
                b -= c
        }
        return a >= e && b >= f && a + d <= e + h && b + c <= f + g
    };
    q.prototype.setProperties = function(a) {
        c.prototype.setProperties.call(this, a);
        a.font = this.font;
        a.textAlign = this.textAlign;
        a.textBaseline = this.textBaseline
    };
    q.prototype.hitTest = function(a, b, e) {
        if (!this.isLegendItem && !this.isAxisLabel) return false;
        var d = this.width,
            c = this.height;
        switch (this.textAlign) {
            case "center":
                a += d / 2;
                break;
            case "right":
                a += d
        }
        switch (this.textBaseline) {
            case "middle":
                b += c / 2;
                break;
            case "bottom":
                b += c
        }
        return this.boundsHitTest(a, b, e)
    };

    function db(b, c, a) {
        this.x = b;
        this.y = c;
        this.src = a
    }
    db.prototype = new c;
    db.constructor = db;
    db.prototype.hitTest = function(b, c, a) {
        return this.boundsHitTest(b, c, a)
    };
    db.prototype.render = function(e) {
        if (!this.visible) return;
        var b = new Image,
            c = this.x,
            d = this.y,
            a = this;
        b.onload = function() {
            var g = b.width,
                f = b.height;
            c -= g / 2;
            d -= f / 2;
            a.x = c;
            a.y = d;
            if (a.offsetX) c += a.offsetX;
            if (a.offsetY) d += a.offsetY;
            a.width = g;
            a.height = f;
            e.drawImage(b, c, d)
        };
        b.src = this.src
    };
    db.prototype._createHighlightShape = function(b) {
        var a = new i;
        a.context = this.context;
        a.x = this.x;
        a.y = this.y;
        a.width = this.width;
        a.height = this.height;
        a.fillStyle = b;
        a.strokeStyle = "grey";
        return a
    };

    function lb(a) {
        c.call(this);
        this.shapes = a
    }
    lb.prototype = new c;
    lb.constructor = new lb;
    lb.prototype.hitTest = function(e, f, c) {
        for (var b = this.shapes, a = 0; a < b.length; a++) {
            var d = b[a];
            if (d.hitTest(e, f, c)) return true
        }
        return false
    };
    lb.prototype._getTooltipOrigin = function(a) {
        return {
            x: a.locX,
            y: a.locY
        }
    };
    lb.prototype.render = function(d) {
        if (!this.visible) return;
        c.prototype.render.call(this, d);
        for (var b = this.shapes, a = 0; a < b.length; a++) {
            var e = b[a];
            e.render(d, true)
        }
    };

    function O(a, b) {
        if (this.canvas == null) {
            this.canvas = a;
            this.ctx = this._getContext(this.canvas)
        }
        this.chart = b
    }
    O.prototype._getContext = function(a) {
        return a.getContext ? a.getContext("2d") : null
    };
    O.emptyColor = "rgba(0, 0, 0, 0)";
    O.prototype._render = function(g) {
        var e = this.offsetX && this.offsetY,
            f = this.chart.options,
            c = this.ctx;
        if (!b.isNull(f.globalAlpha)) c.globalAlpha = f.globalAlpha;
        if (e) {
            c.save();
            c.translate(this.offsetX, this.offsetY)
        }
        for (var d = 0; d < g.length; d++) {
            var a = g[d];
            if (a) {
                !this.isHighlighting && a.context && a.context.series && !a.isLegendItem && !(a instanceof q) && this.chart.elem.trigger("shapeRendering", a);
                if (a.src && this.isExcanvas) {
                    a.offsetX = this.offsetX;
                    a.offsetY = this.offsetY;
                    c.translate(-this.offsetX, -this.offsetY);
                    a.render(c);
                    c.translate(this.offsetX, this.offsetY)
                } else {
                    var h = a.shadowColor;
                    a.shadowColor = O.emptyColor;
                    a.render(c);
                    a.shadowColor = h
                }
            }
        }
        e && c.restore()
    };
    O.prototype._renderShadows = function(h) {
        if (g.use_excanvas) return;
        var f = this.offsetX && this.offsetY,
            c = this.chart.options;
        if (!c.shadows || !c.shadows.enabled) return;
        var a = this.ctx;
        if (!b.isNull(c.globalAlpha)) a.globalAlpha = c.globalAlpha;
        if (f) {
            a.save();
            a.translate(this.offsetX, this.offsetY)
        }
        for (var e = 0; e < h.length; e++) {
            var d = h[e];
            d && d.shadowColor && d.shadowColor != "rgba(0, 0, 0, 0)" && d.render(a)
        }
        f && a.restore()
    };
    O.prototype._clear = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    };

    function T(a) {
        this.defaults = {
            font: "14px sans-serif",
            fillStyle: "black",
            lineWidth: 0,
            margin: 6
        };
        this.x = 0;
        this.y = 0;
        this.setOptions(a)
    }
    T.prototype._render = function(a) {
        if (this.text == null) return;
        this.textBlock.x = this.x + this.margin;
        this.textBlock.y = this.y + this.margin;
        this.textBlock.rotX = this.rotX;
        this.textBlock.rotY = this.rotY;
        this.textBlock.rotationAngle = this.rotationAngle;
        a.push(this.textBlock)
    };
    T.prototype._measure = function() {
        var a;
        if (!this.text) {
            this.width = 0;
            this.height = 0;
            return
        }
        a = this.textBlock.measure(this.chart.ctx);
        var b = 2 * this.margin;
        this.width = a.width + b;
        this.height = a.height + b
    };
    T.prototype.setOptions = function(c) {
        var b = a.extend({}, this.defaults, c || {});
        a.extend(this, b);
        this.textBlock = new q(this.text);
        this.textBlock.textBaseline = "top";
        this.textBlock.font = this.font;
        this.textBlock.fillStyle = this.fillStyle;
        this.textBlock.strokeStyle = this.strokeStyle;
        this.textBlock.lineWidth = this.lineWidth
    };

    function Ab(a) {
        this.chart = a
    }
    Ab.prototype = new T;
    Ab.constructor = Ab;
    Ab.prototype._render = function(f) {
        var c = this.chart;
        if (this.text == null || !c) return;
        var e = c._width,
            d = c._height,
            a = this.margin + this.textBlock.width / 2,
            b = this.margin;
        switch (this.hAlign) {
            case "center":
                a += (e - this.width) / 2;
                break;
            case "right":
                a += e - this.width
        }
        switch (this.vAlign) {
            case "center":
                b += (d - this.height) / 2;
                break;
            case "bottom":
                b += d - this.height
        }
        this.textBlock.textAlign = "center";
        this.textBlock.x = a;
        this.textBlock.y = b;
        this.textBlock.rotX = a;
        this.textBlock.rotY = b;
        this.textBlock.rotationAngle = this.angle;
        f.push(this.textBlock)
    };

    function hb(a) {
        this.defaults = {
            visible: true,
            strokeStyle: "black",
            lineWidth: 1,
            lineCap: "butt",
            lineJoin: "miter",
            miterLimit: 10,
            cornerRadius: 10,
            padding: 4
        };
        this.x = 0;
        this.y = 0;
        this.setOptions(a)
    }
    hb.prototype._setShapeSettings = function(a) {
        a.fillStyle = this.fillStyle;
        a.strokeStyle = this.strokeStyle;
        a.lineWidth = this.lineWidth;
        a.lineCap = this.lineCap;
        a.lineJoin = this.lineJoin;
        a.miterLimit = this.miterLimit;
        a.cornerRadius = this.cornerRadius
    };
    hb.prototype._render = function(c) {
        if (!this.visible) return;
        var a = this.lineWidth / 2,
            f = this.x + a,
            g = this.y + a,
            e = this.width - 2 * a,
            d = this.height - 2 * a,
            b = new i(f, g, e, d);
        this._setShapeSettings(b);
        c.push(b)
    };
    hb.prototype.setOptions = function(c) {
        var b = a.extend({}, this.defaults, c || {});
        a.extend(this, b)
    };
    hb.prototype.getPadding = function() {
        return !this.visible ? 0 : this.lineWidth + this.cornerRadius / 2 + this.padding
    };

    function Cb(a) {
        this.defaults = {
            strokeStyle: "gray",
            lineWidth: 1,
            visible: true
        };
        this.setOptions(a)
    }
    Cb.prototype._setLineSettings = function(a) {
        a.strokeStyle = this.strokeStyle;
        a.lineWidth = this.lineWidth;
        a.strokeDashArray = this.strokeDashArray
    };
    Cb.prototype.setOptions = function(c) {
        var b = a.extend({}, this.defaults, c || {});
        a.extend(this, b)
    };

    function Db(a) {
        this.defaults = {
            strokeStyle: "black",
            lineWidth: 1,
            length: 6,
            position: "outside",
            visible: true,
            zIndex: 2,
            offset: .4
        };
        this.setOptions(a)
    }
    Db.prototype.isInside = function() {
        return this.position == "inside"
    };
    Db.prototype._setLineSettings = function(a) {
        a.strokeStyle = this.strokeStyle;
        a.lineWidth = this.lineWidth;
        a.strokeDashArray = this.strokeDashArray
    };
    Db.prototype.setOptions = function(c) {
        var b = a.extend({}, this.defaults, c || {});
        a.extend(this, b)
    };

    function Hb(a) {
        this.defaults = {
            fillStyle: "rgba(204, 204, 204, 0.5)",
            lineWidth: 1
        };
        this.setOptions(a)
    }
    Hb.prototype._setSettings = function(a) {
        a.fillStyle = this.fillStyle;
        a.strokeStyle = this.strokeStyle;
        a.lineWidth = this.lineWidth
    };
    Hb.prototype.setOptions = function(c) {
        var b = a.extend({}, this.defaults, c || {});
        a.extend(this, b)
    };

    function Q(a) {
        N.call(this, a)
    }
    Q.prototype = new N;
    Q.constructor = Q;
    Q.prototype.canStart = function(a) {
        if (this.view.options.mouseInteractionMode != "zooming") return false;
        if (!this.view.gridArea.isMouseOver) return false;
        if (this.view.canZoom) {
            a.preventDefault();
            return true
        }
        return false
    };
    Q.prototype.start = function() {
        this.view._clearRenderers();
        this.zoomableAxes = this.view.axes.getZoomableAxes();
        this.mouseInput1 = this.view.mouseInput;
        this.currCursor = this.view.elem.css("cursor").toString();
        if (this.view.canZoomHor && this.view.canZoomVer) this.view.elem.css("cursor", "crosshair");
        else if (this.view.canZoomHor) this.view.elem.css("cursor", "e-resize");
        else this.view.elem.css("cursor", "s-resize")
    };
    Q.prototype.mouseMove = function() {
        var a = this.view.mouseInput;
        this.view._renderSelectionRect(this.mouseInput1, a)
    };
    Q.prototype.mouseUp = function() {
        for (var c = this.view.mouseInput, b = this.zoomableAxes, a = 0; a < b.length; a++) b[a]._scaleToRegion(this.mouseInput1, c);
        this.view.partialDelayedUpdate();
        this.stopTool()
    };
    Q.prototype.keyDown = function(a) {
        if (a.which == 27) {
            a.preventDefault();
            this.stopTool()
        }
    };
    Q.prototype.stop = function() {
        this.zoomableAxes = null;
        this.view._clearSelectionRect();
        this.view.elem.css("cursor", this.currCursor);
        N.prototype.stop.call(this)
    };

    function S(a) {
        N.call(this, a)
    }
    S.prototype = new N;
    S.constructor = S;
    S.prototype.canStart = function(a) {
        if (this.view.options.mouseInteractionMode != "panning") return false;
        if (!this.view.gridArea.isMouseOver) return false;
        if (this.view.canZoom) {
            a.preventDefault();
            return true
        }
        return false
    };
    S.prototype.start = function() {
        this.zoomableAxes = this.view.axes.getZoomableAxes();
        this.oldMouseInput = this.view.mouseInput;
        this.currCursor = this.view.originalCursor;
        var b = this.view.originalCursor = a.browser && a.browser.mozilla ? "-moz-grabbing" : "move";
        this.view.elem.css("cursor", b)
    };
    S.prototype.mouseMove = function() {
        for (var f = this.zoomableAxes, a = this.view.mouseInput, c = this.zoomableAxes, d = this.oldMouseInput.locX - a.locX, e = this.oldMouseInput.locY - a.locY, b = 0; b < c.length; b++) c[b]._moveVisibleRange(d, e);
        this.oldMouseInput = a;
        this.view.partialDelayedUpdate()
    };
    S.prototype.mouseUp = function() {
        this.stopTool()
    };
    S.prototype.stop = function() {
        this.zoomableAxes = null;
        this.view.originalCursor = this.currCursor;
        this.view._resetCursor();
        N.prototype.stop.call(this)
    };

    function L(a) {
        N.call(this, a)
    }
    L.prototype = new N;
    L.constructor = L;
    L.prototype.canStart = function(d) {
        if (!this.view.canZoom) return false;
        for (var b = this.view.touchInput, a = 0; a < b.length; a++) {
            var c = b[a];
            if (!this.view.gridArea._contains(c.locX, c.locY)) return false
        }
        d.preventDefault();
        return true
    };
    L.prototype.start = function() {
        this.zoomableAxes = this.view.axes.getZoomableAxes();
        this.oldTouchInput = this.view.touchInput
    };
    L.prototype.touchMove = function(b) {
        b.preventDefault();
        if (!this.oldTouchInput) {
            this.oldTouchInput = this.view.touchInput;
            return
        }
        var c = this.view.touchInput.length;
        if (c > 2) return;
        var a = false;
        if (c == 2) a = true;
        if (this.isScaling != a) {
            this.oldTouchInput = this.view.touchInput;
            this.isScaling = a
        }
        if (a) this.doScale(b);
        else this.doPan(b)
    };
    L.prototype.touchEnd = function() {
        if (this.view.touchInput.length == 0) this.stopTool();
        else this.oldTouchInput = null
    };
    L.prototype.stop = function() {
        this.zoomableAxes = null;
        this.oldTouchInput = null;
        N.prototype.stop.call(this)
    };
    L.prototype.doPan = function() {
        for (var e = this.zoomableAxes, c = this.view.touchInput, d = c[0], b = this.oldTouchInput[0], f = b.locX - d.locX, g = b.locY - d.locY, a = 0; a < e.length; a++) e[a]._moveVisibleRange(f, g);
        this.oldTouchInput = c;
        this.view.partialDelayedUpdate()
    };
    L.prototype.doScale = function() {
        var a = this.view.touchInput;
        if (!this.oldTouchInput || this.oldTouchInput.length != 2) {
            this.oldTouchInput = a;
            return
        }
        for (var d = this.getTwoTouchPointData(this.oldTouchInput), e = this.getTwoTouchPointData(a), c = this.zoomableAxes, b = 0; b < c.length; b++) c[b]._scaleVisibleRange(d, e);
        this.oldTouchInput = a;
        this.view.partialDelayedUpdate()
    };
    L.prototype.getTwoTouchPointData = function(b) {
        var a = {
            x1: b[0].locX,
            y1: b[0].locY,
            x2: b[1].locX,
            y2: b[1].locY
        };
        a.centerX = (a.x1 + a.x2) / 2;
        a.centerY = (a.y1 + a.y2) / 2;
        a.dx = Math.abs(a.x2 - a.x1);
        a.dy = Math.abs(a.y2 - a.y1);
        return a
    };

    function f(b) {
        this.pluginClass = "ui-jqchart";
        this.tooltipClass = "ui-jqchart-tooltip";
        g.call(this, b);
        this.timer = new Ob(a.proxy(this.partialUpdate, this));
        this.storyboard = new Kb(a.proxy(this._renderShapes, this));
        this.mouseDownTools.push(new S(this));
        this.mouseDownTools.push(new Q(this));
        this.touchMoveTools.push(new L(this))
    }
    f.prototype = new g;
    f.constructor = f;
    f.prototype._createElements = function(c) {
        g.prototype._createElements.call(this, c);
        if (g.use_excanvas) {
            this.areaCanvas = this._createCanvas(true);
            var b = a('<div style="position:absolute"></div>');
            this.elem.append(b);
            b.append(this.areaCanvas);
            this.areaRenderer = new O(this.areaCanvas, this);
            this.areaRenderer.div = b;
            this.areaRenderer.isExcanvas = true
        }
        this.chCanvas = this._createCanvas();
        this.chRenderer = new O(this.chCanvas, this);
        this._createHighlightRenderer();
        this.gridArea = new y(this);
        this.border = new hb;
        this.paletteColors = new Fb;
        this.title = new T;
        this.title.chart = this;
        this.legend = new ib;
        this.legend.chart = this;
        this.watermark = new Ab(this);
        this.toolbar = new Ib(this);
        this.series = new v(this);
        this.axes = new p(this)
    };
    f.prototype._setOptions = function(j) {
        if (!this.elem || this.elem.length == 0) return;
        var c = j || {};
        if (typeof c.title == "string") c.title = {
            text: c.title
        };
        c.title = c.title || {};
        c.title = a.extend({}, a.fn.jqChart.defaults.title, c.title);
        c.crosshairs = a.extend(true, {}, a.fn.jqChart.defaults.crosshairs, c.crosshairs);
        c.tooltips = a.extend(true, {}, a.fn.jqChart.defaults.tooltips, c.tooltips);
        c.shadows = a.extend(true, {}, a.fn.jqChart.defaults.shadows, c.shadows);
        c.selectionRect = a.extend(true, {}, a.fn.jqChart.defaults.selectionRect, c.selectionRect);
        c.watermark = a.extend(true, {}, a.fn.jqChart.defaults.watermark, c.watermark);
        c.toolbar = a.extend(true, {}, a.fn.jqChart.defaults.toolbar, c.toolbar);
        c.globalAlpha = b.isNull(c.globalAlpha) ? a.fn.jqChart.defaults.globalAlpha : c.globalAlpha;
        c.mouseInteractionMode = c.mouseInteractionMode || a.fn.jqChart.defaults.mouseInteractionMode;
        this.hasCrosshairs = c.crosshairs.enabled === true;
        this.hasTooltips = c.tooltips && !c.tooltips.disabled;
        this.hasHighlighting = c.tooltips && c.tooltips.highlighting;
        this.options = c;
        g.prototype._setOptions.call(this, c);
        var d = j || {};
        if (d.width) this.elem.css("width", d.width);
        else this.elem.width() == 0 && this.elem.css("width", "400px");
        if (d.height) this.elem.css("height", d.height);
        else this.elem.height() == 0 && this.elem.css("height", "250px");
        var f = this._width = this.elem.width(),
            e = this._height = this.elem.height(),
            c = this.options;
        this.border.setOptions(c.border);
        this.border.fillStyle = c.background || this.border.fillStyle;
        this.gridArea.fillStyle = c.chartAreaBackground;
        this.paletteColors.setOptions(c.paletteColors);
        this.title.setOptions(c.title);
        this.legend.setOptions(c.legend);
        this.watermark.setOptions(c.watermark);
        this.toolbar.setOptions(c.toolbar);
        this.series.setOptions(c.series);
        this.axes.setOptions(c.axes);
        this._setCanvasSize(this.canvas, f, e);
        this._setCanvasSize(this.chCanvas, f, e);
        this._setCanvasSize(this.hlCanvas, f, e);
        this.areaCanvas && this._setCanvasSize(this.areaCanvas, f, e);
        var h = this.options.scaleX,
            i = this.options.scaleY;
        if (h && i) {
            this._width /= h;
            this._height /= i;
            var k = this.canvas.getContext("2d");
            k.scale(h, i)
        }
        this.update()
    };
    f.prototype._mouseEnter = function(a) {
        g.prototype._mouseEnter.call(this, a);
        this.toolbar.show()
    };
    f.prototype._mouseLeave = function(a) {
        g.prototype._mouseLeave.call(this, a);
        this.toolbar.hide()
    };
    f.prototype._measure = function() {
        this.title._measure();
        this.legend._measure();
        this.watermark._measure();
        return this.axes._measure()
    };
    f.prototype._arrange = function() {
        var f = this._width,
            g = this._height;
        this.border.width = f;
        this.border.height = g;
        var c = this.border.getPadding();
        f -= 2 * c;
        g -= 2 * c;
        var d = c,
            e = c + this.title.height,
            m = this.axes._getTotalWidth(),
            l = this.axes._getTotalHeight();
        if (this.legend._isHorizontal()) {
            this.gridArea.width = Math.round(f - m);
            this.gridArea.height = Math.round(g - (l + this.title.height + this.legend.height))
        } else {
            this.gridArea.width = Math.round(f - (m + this.legend.width));
            this.gridArea.height = Math.round(g - (l + this.title.height))
        }
        switch (this.legend.location) {
            case "left":
                d += this.legend.width;
                break;
            case "top":
                e += this.legend.height
        }
        for (var i = this.axes._getAxesInLoc("left"), b = i.length - 1; b >= 0; b--) {
            var a = i[b];
            a.x = d;
            a.height = this.gridArea.height;
            d = Math.ceil(d + a.width)
        }
        this.gridArea.x = d;
        d += this.gridArea.width;
        for (var j = this.axes._getAxesInLoc("right"), b = 0; b < j.length; b++) {
            var a = j[b];
            a.x = d;
            a.height = this.gridArea.height;
            d = Math.ceil(d + a.width)
        }
        for (var n = this.axes._getAxesInLoc("top"), b = n.length - 1; b >= 0; b--) {
            var a = n[b];
            a.x = this.gridArea.x;
            a.y = e;
            a.width = this.gridArea.width;
            e = Math.ceil(e + a.height)
        }
        this.gridArea.y = e;
        e += this.gridArea.height;
        for (var h = this.axes._getAxesInLoc("bottom"), b = 0; b < h.length; b++) {
            var a = h[b];
            a.x = this.gridArea.x;
            a.y = e;
            a.width = this.gridArea.width;
            e = Math.ceil(e + a.height)
        }
        for (var k = i.concat(j), b = 0; b < k.length; b++) {
            var a = k[b];
            a.y = this.gridArea.y
        }
        for (var h = this.axes._getAxesInLoc("radial"), b = 0; b < h.length; b++) {
            var a = h[b];
            a.x = this.gridArea.x;
            a.y = this.gridArea.y;
            a.width = this.gridArea.width;
            a.height = this.gridArea.height
        }
        this.title.x = c + (f - this.title.width) / 2;
        this.title.y = c;
        switch (this.legend.location) {
            case "bottom":
                this.legend.x = c + (f - this.legend.width) / 2;
                this.legend.y = c + g - this.legend.height;
                break;
            case "left":
                this.legend.x = c;
                this.legend.y = c + this.gridArea.y + (this.gridArea.height - this.legend.height) / 2;
                break;
            case "top":
                this.legend.x = c + (f - this.legend.width) / 2;
                this.legend.y = c + this.title.height;
                break;
            case "right":
            default:
                this.legend.x = c + f - this.legend.width;
                this.legend.y = this.gridArea.y + (this.gridArea.height - this.legend.height) / 2
        }
        this.gridArea._arrange();
        this.axes._arrange();
        this.legend._arrange()
    };
    f.prototype._processMouseMove = function() {
        var a = this.mouseInput;
        if (this.gridArea) {
            var b = this.gridArea._contains(a.locX, a.locY);
            if (this.gridArea.isMouseOver != b) {
                !b && this._clearRenderers();
                this.gridArea.isMouseOver = b
            }
        }
        this._processMouseEvents();
        if (this.gridArea.isMouseOver) {
            this._processTooltips(a);
            this._initCrosshairs(a)
        }
    };
    f.prototype._initTouchInput = function(c) {
        g.prototype._initTouchInput.call(this, c);
        var b = this.touchInput[0];
        if (!this.gridArea || !b) return;
        var a = this.gridArea._contains(b.locX, b.locY);
        if (this.gridArea.isTouchOver != a) {
            !a && this._clearRenderers();
            this.gridArea.isTouchOver = a
        }
    };
    f.prototype._processTouchStart = function(b) {
        if (!this.gridArea.isTouchOver) return;
        var a = this.touchInput[0];
        b.preventDefault();
        this._processTooltips(a);
        this._initCrosshairs(a)
    };
    f.prototype._processTouchMove = function(b) {
        if (!this.gridArea.isTouchOver) return;
        var a = this.touchInput[0];
        b.preventDefault();
        this._processTouchEvents();
        this._processTooltips(a);
        this._initCrosshairs(a)
    };
    f.prototype._clearRenderers = function() {
        g.prototype._clearRenderers.call(this);
        this.chRenderer && this.chRenderer._clear()
    };
    f.prototype._getClosestShapeAtX = function(e, f) {
        for (var c = null, i = h, j = f.locX, d = e.length - 1; d >= 0; d--) {
            var a = e[d];
            if (!a.context || a.isLegendItem || a.isAxisLabel) continue;
            var b = a.getCenter(f),
                g = Math.abs(b.x - j);
            if (i > g) {
                i = g;
                c = a;
                if (b.mark) c = b.mark
            }
        }
        return c
    };
    f.prototype._getClosestShapeAtY = function(c, d) {
        for (var b = null, g = h, j = d.locY, a = c.length - 1; a >= 0; a--) {
            var e = c[a],
                i = e.getCenter(d).y,
                f = Math.abs(i - j);
            if (g > f) {
                g = f;
                b = e
            }
        }
        return b
    };
    f.prototype._getShapesAtX = function(g, c, e, f) {
        var b = [c],
            d = [c.context.series];
        a.each(e, function() {
            if (this != c && this.context && !this.isLegendItem && !this.isAxisLabel) {
                var h = this.context.series,
                    e = this.getCenter(f);
                if (a.inArray(h, d) == -1 && Math.abs(g - e.x) < 3) {
                    if (e.mark) b.push(e.mark);
                    else b.push(this);
                    d.push(h)
                }
            }
        });
        return b
    };
    f.prototype._getTooltipShapes = function(h, i, f, c) {
        var b = null,
            e = this.options.tooltips;
        if (e.type == "shared") {
            var d = this._getClosestShapeAtX(this.shapes, c);
            if (d) b = this._getShapesAtX(d.getCenter(c).x, d, this.shapes, c)
        } else b = g.prototype._getTooltipShapes.call(this, h, i, f, c);
        if (b) {
            series = this.series.items;
            b.sort(function(d, e) {
                var b = a.inArray(d.context.series, series),
                    c = a.inArray(e.context.series, series);
                return b - c
            })
        }
        return b
    };
    f.prototype._getTooltip = function(a) {
        return a.context.series._getTooltip(a.context)
    };
    f.prototype._getTooltipText = function(d) {
        for (var e = "", i = this, g = [], f = 0; f < d.length; f++) {
            var c = d[f];
            if (!c.context.series) continue;
            var b = c.context.series.realXAxis;
            if (b && c.context.x && a.inArray(b, g) == -1) {
                var h = b._getTooltip(c.context.x);
                e += h;
                g.push(b)
            }
        }
        a.each(d, function() {
            var a = i._getTooltip(this);
            if (a) e += a
        });
        return e
    };
    f.prototype._initCrosshairs = function(a) {
        if (!this.hasCrosshairs) return;
        var f = this.options.crosshairs,
            d = a.locX,
            e = a.locY;
        if (f.snapToDataPoints) {
            var b = this._getClosestShapeAtX(this.shapes, a);
            if (b) {
                var g = this._getShapesAtX(b.getCenter(a).x, b, this.shapes, a);
                b = this._getClosestShapeAtY(g, a);
                if (b) {
                    var c = b.getCenter(a);
                    d = c.x;
                    e = c.y
                }
            }
        }
        this._renderCrosshairs(d, e)
    };
    f.prototype._renderCrosshairs = function(e, f) {
        if (!this.hasCrosshairs) return;
        var c = this.gridArea;
        if (!c._contains(e, f)) return;
        var b = this.options.crosshairs,
            d = [];
        if (b.hLine && b.hLine.visible) {
            var g = new n(c.x, f, c.x + c.width, f);
            b.hLine && a.extend(g, b.hLine);
            d.push(g)
        }
        if (b.vLine && b.vLine.visible) {
            var h = new n(e, c.y, e, c.y + c.height);
            b.vLine && a.extend(h, b.vLine);
            d.push(h)
        }
        this.chRenderer._clear();
        this.chRenderer._render(d)
    };
    f.prototype._renderSelectionRect = function(g, h) {
        var b = this.gridArea,
            c = b.fitHor(g.locX),
            e = b.fitVer(g.locY),
            d = b.fitHor(h.locX),
            f = b.fitVer(h.locY);
        if (!this.canZoomVer) {
            e = b.y;
            f = b.y + b.height
        } else if (!this.canZoomHor) {
            c = b.x;
            d = b.x + b.width
        }
        var m = Math.min(c, d),
            n = Math.min(e, f),
            l = Math.abs(c - d),
            k = Math.abs(e - f),
            j = new i(m, n, l, k);
        a.extend(j, this.options.selectionRect);
        this.chRenderer._clear();
        this.chRenderer._render([j])
    };
    f.prototype._clearSelectionRect = function() {
        this.chRenderer._clear()
    };
    f.prototype._initZooming = function() {
        var b = this;
        b.canZoomVer = false;
        b.canZoomHor = false;
        a.each(this.axes.items, function() {
            if (this.zoomEnabled)
                if (this.location != "radial")
                    if (this.isAxisVertical) b.canZoomVer = true;
                    else b.canZoomHor = true
        });
        this.canZoom = this.canZoomVer || this.canZoomHor
    };
    f.prototype._triggerShapeEvent = function(c, a) {
        var b = a.isLegendItem ? "legendItem" : "dataPoint";
        if (a.isAxisLabel) b = "axisLabel";
        a.context.shape = a;
        this.elem.trigger(b + c, a.context)
    };
    f.prototype.setOptions = function() {};
    f.prototype.clear = function() {
        g.prototype.clear.call(this);
        g.use_excanvas && this.areaRenderer._clear()
    };
    f.prototype._setClip = function(b) {
        var a = this.gridArea;
        b.beginPath();
        b.rect(a.x, a.y, a.width, a.height);
        b.clip()
    };
    f.prototype._createShapes = function() {
        var b = {},
            h = this.gridArea,
            c = b.shapes = [];
        this.border._render(c);
        this.title._render(c);
        var i = this.legend._render(c);
        b.gaShapes = [];
        h._render(b.gaShapes);
        b.axesShapes = [];
        var f = this.axes._render(b.axesShapes);
        b.postAxisShapes = f.postShapes;
        var e = b.nonGridAreaSerShapes = [];
        this.series._render(e);
        var g = b.serShapes = [];
        h._renderSeries(g);
        c = b.ws = [];
        this.watermark._render(c);
        var d = [];
        a.merge(d, g);
        a.merge(d, e);
        a.merge(d, i);
        a.merge(d, f.contextShapes);
        this.shapes = d;
        this.allShapes = b
    };
    f.prototype._renderShapes = function() {
        this.shapeRenderer._clear();
        g.use_excanvas && this.areaRenderer._clear();
        var e = this.gridArea,
            a = this.allShapes;
        this.shapeRenderer._render(a.shapes);
        var d = a.gaShapes;
        if (g.use_excanvas) this.areaRenderer._render(d);
        else {
            this.ctx.save();
            this._setClip(this.ctx);
            this.shapeRenderer._renderShadows(d);
            this.shapeRenderer._render(d);
            this.ctx.restore()
        }
        this.shapeRenderer._render(a.axesShapes);
        var c = a.nonGridAreaSerShapes;
        c.length > 0 && this.elem.trigger("seriesShapesRendering", [c]);
        this.shapeRenderer._renderShadows(c);
        this.shapeRenderer._render(c);
        var b = a.serShapes;
        b.length > 0 && this.elem.trigger("seriesShapesRendering", [b]);
        if (g.use_excanvas) this.areaRenderer._render(b);
        else {
            this.ctx.save();
            this._setClip(this.ctx);
            this.shapeRenderer._renderShadows(b);
            this.shapeRenderer._render(b);
            this.ctx.restore()
        }
        this.shapeRenderer._render(a.postAxisShapes);
        this.shapeRenderer._render(a.ws)
    };
    f.prototype.render = function() {
        this._clearRenderers();
        this._createShapes();
        this._renderShapes()
    };
    f.prototype.findAxis = function(a) {
        if (this.axes) return this.axes.find(a)
    };
    f.prototype.update = function() {
        this.series._initData();
        this.axes._initSeriesAxes();
        this.axes._initSeries();
        this._initZooming();
        this.axes._initRanges();
        this.series._initVisibleData();
        this.series._initColors();
        this.legend._init();
        this.axes._resetWH();
        for (var a = false, b = 0; b < 10; b++) {
            a = this._measure();
            this._arrange();
            this.axes._updateOrigins();
            this.axes._initRanges();
            this.axes._correctOrigins();
            if (a == false) break
        }
        this.toolbar._init();
        this.render();
        this.storyboard.begin()
    };
    f.prototype.partialDelayedUpdate = function() {
        this.timer.kick()
    };
    f.prototype.partialUpdate = function() {
        this.series._initVisibleData();
        this.axes._resetWH();
        var a = false;
        this.axes._initRanges();
        for (var b = 0; b < 10; b++) {
            a = this._measure();
            this._arrange();
            this.axes._updateOrigins();
            this.axes._initRanges();
            this.axes._correctOrigins();
            if (a == false) break
        }
        this.render()
    };
    f.prototype.highlightData = function(c) {
        var a = g.prototype.highlightData.call(this, c);
        if (a) {
            var b = a[0].getCenter();
            this._renderCrosshairs(b.x, b.y)
        }
    };
    f.prototype.destroy = function() {
        this.axes.clear();
        g.prototype.destroy.call(this)
    };

    function K(d, a, b, g, e, f) {
        c.call(this);
        this.x = d - f / 2;
        this.width = f;
        this.height = Math.abs(a - b);
        this.y = Math.min(a, b);
        this.isUp = e < g;
        this.tooltipOrigin = {
            x: d,
            y: Math.min(a, b)
        };
        this.center = {
            x: d,
            y: (g + e) / 2
        };
        this.createElements && this.createElements(d, a, b, g, e, f)
    }
    K.prototype = new c;
    K.constructor = new K;
    K.prototype.createElements = function(a, h, i, e, d, g) {
        var c = [],
            f = g / 2,
            b = new n(a, h, a, i);
        c.push(b);
        b = new n(a - f, e, a, e);
        c.push(b);
        b = new n(a, d, a + f, d);
        c.push(b);
        this.items = c
    };
    K.prototype.hitTest = function(c, d, a) {
        if (a) return this.boundsHitTest(c, d, a);
        for (var b = 0; b < this.items.length; b++) {
            var e = this.items[b];
            if (e.hitTest(c, d, a)) return true
        }
        return false
    };
    K.prototype.render = function(d) {
        if (!this.visible) return;
        c.prototype.render.call(this, d);
        for (var b = 0; b < this.items.length; b++) {
            var a = this.items[b];
            this.setProperties(a);
            if (this.isUp) {
                if (this.priceUpStrokeStyle) a.strokeStyle = this.priceUpStrokeStyle
            } else if (this.priceDownStrokeStyle) a.strokeStyle = this.priceDownStrokeStyle;
            a.render(d)
        }
    };
    K.prototype._createHighlightShape = function(c, d) {
        var b = new K;
        a.extend(b, this);
        b.fillStyle = c;
        b.priceUpFillStyle = c;
        b.priceDownFillStyle = c;
        b.strokeStyle = d;
        b.lineWidth += 2;
        return b
    };
    K.prototype.getTooltipColor = function() {
        if (this.isUp)
            if (this.priceUpStrokeStyle) return c.getColorFromFillStyle(this.priceUpStrokeStyle);
        return this.priceDownStrokeStyle ? c.getColorFromFillStyle(this.priceDownStrokeStyle) : c.prototype.getTooltipColor.call(this)
    };

    function cb(f, c, e, d, a, b) {
        K.call(this, f, c, e, d, a, b)
    }
    cb.prototype = new K;
    cb.constructor = new cb;
    cb.prototype.createElements = function(b, e, f, o, l, m) {
        var d = [],
            g = Math.floor(m / 2),
            b = Math.round(b),
            a = Math.round(o),
            c = Math.round(l);
        if (a > c) {
            var k = c;
            c = a;
            a = k
        }
        if (e > f) {
            var k = f;
            f = e;
            e = k
        }
        if (c - a >= 1) {
            var j = new i(b - g, a, 2 * g, c - a);
            j.useHitTestArea = true;
            d.push(j)
        } else {
            var h = new n(b - g, a, b + g, a);
            d.push(h)
        }
        var h = new n(b, e, b, a);
        d.push(h);
        var h = new n(b, c, b, f);
        d.push(h);
        this.items = d
    };
    cb.prototype.render = function(d) {
        if (!this.visible) return;
        c.prototype.render.call(this, d);
        for (var b = 0; b < this.items.length; b++) {
            var a = this.items[b];
            this.setProperties(a);
            if (a instanceof i)
                if (this.isUp) a.fillStyle = this.priceUpFillStyle;
                else a.fillStyle = this.priceDownFillStyle;
            a.render(d)
        }
    };
    cb.prototype.getTooltipColor = function() {
        return this.isUp ? c.getColorFromFillStyle(this.priceUpFillStyle) : c.getColorFromFillStyle(this.priceDownFillStyle)
    };

    function Fb(a) {
        this.colorsDefault = ["#418CF0", "#FCB441", "#E0400A", "#056492", "#BFBFBF", "#1A3B69", "#FFE382", "#129CDD", "#CA6B4B", "#005CDB", "#F3D288", "#506381", "#F1B9A8", "#E0830A", "#7893BE"];
        this.colorsGrayScale = Nb();
        this.defaults = {
            type: "default"
        };
        this.setOptions(a)
    }
    Fb.prototype.setOptions = function(c) {
        var b = a.extend({}, this.defaults, c || {});
        a.extend(this, b)
    };

    function Nb() {
        for (var e = 16, c = [], b = 0; b < e; b++) {
            var a = 200 - b * 11;
            a = a.toString();
            var d = "rgb(" + a + "," + a + "," + a + ")";
            c.push(d)
        }
        return c
    }
    Fb.prototype.getColor = function(b) {
        var a = this.getColors(this.type),
            c = a.length;
        b %= c;
        return a[b]
    };
    Fb.prototype.getColors = function(a) {
        switch (a.toLowerCase()) {
            case "customcolors":
                return this.customColors;
            case "grayscale":
                return this.colorsGrayScale;
            case "default":
            default:
                return this.colorsDefault
        }
    };

    function Ib(a) {
        this.chart = a
    }
    Ib.prototype = {
        _init: function() {
            var b = this.toolbar,
                c = this.chart;
            if (this.visibility == "hidden" || this.visibility == "auto" && !c.canZoom) {
                if (b) {
                    b.remove();
                    this.toolbar = null
                }
                return
            }
            if (!b) {
                this.toolbar = b = a('<ul onselectstart="return false;" class="ui-jqchart-toolbar ui-widget ui-widget-content ui-corner-all"></ul>');
                this._addButtons();
                b.hide();
                c.elem.append(b);
                b.mousedown(function(a) {
                    a.preventDefault();
                    return false
                });
                b.mouseenter(function(a) {
                    c._clearRenderers();
                    a.preventDefault();
                    return false
                });
                b.mousemove(function(a) {
                    a.preventDefault();
                    return false
                })
            }
            var e = b.outerWidth(),
                h = b.outerHeight(),
                d = c.gridArea,
                f = d.x + d.width - e,
                g = d.y;
            b.css({
                left: f,
                top: g
            })
        },
        _addButtons: function() {
            var f = this.toolbar,
                d = this.chart,
                e = a("<li class='ui-corner-all ui-widget-header'><span class='ui-icon ui-icon-arrow-4-diag'></span></li>");
            f.append(e);
            this._addHover(e);
            e.attr("title", this.resetZoomTooltipText);
            e.mousedown(function(c) {
                c.preventDefault();
                for (var b = d.axes.items, a = 0; a < b.length; a++) b[a].resetZoom();
                d.partialDelayedUpdate();
                return false
            });
            var g = a("<li class='ui-jqchart-toolbar-separator'></li>");
            f.append(g);
            var c = a("<li class='ui-corner-all ui-widget-header'><span class='ui-icon ui-icon-arrow-4'></span></li>");
            f.append(c);
            this._addHover(c);
            c.attr("title", this.panningTooltipText);
            c.mousedown(function(a) {
                a.preventDefault();
                d.options.mouseInteractionMode = "panning";
                c.addClass("ui-state-active");
                b.removeClass("ui-state-active");
                return false
            });
            var b = a("<li class='ui-corner-all ui-widget-header'><span class='ui-icon ui-icon-zoomin'></span></li>");
            f.append(b);
            this._addHover(b);
            b.attr("title", this.zoomingTooltipText);
            b.mousedown(function(a) {
                a.preventDefault();
                d.options.mouseInteractionMode = "zooming";
                c.removeClass("ui-state-active");
                b.addClass("ui-state-active");
                return false
            });
            switch (d.options.mouseInteractionMode) {
                case "zooming":
                    b.addClass("ui-state-active");
                    break;
                default:
                    c.addClass("ui-state-active")
            }
        },
        _addHover: function(b) {
            b.hover(function() {
                a(this).addClass("ui-state-hover")
            }, function() {
                a(this).removeClass("ui-state-hover")
            })
        },
        show: function() {
            this.toolbar && this.toolbar.stop(true, true).fadeIn("slow")
        },
        hide: function() {
            this.toolbar && this.toolbar.stop(true, true).fadeOut("slow")
        },
        setOptions: function(c) {
            var b = a.extend({}, this.defaults, c || {});
            a.extend(this, b)
        }
    };

    function R(a) {
        this.defaults = {
            lineWidth: 1,
            lineCap: "butt",
            lineJoin: "miter",
            miterLimit: 10,
            size: 8,
            offset: 0,
            linkLineWidth: 1,
            type: "circle"
        };
        this.setOptions(a)
    }
    R.prototype._setShapeSettings = function(a) {
        a.fillStyle = this.fillStyle;
        a.strokeStyle = this.strokeStyle;
        a.lineWidth = this.lineWidth;
        a.lineCap = this.lineCap;
        a.lineJoin = this.lineJoin;
        a.miterLimit = this.miterLimit;
        a.shadowColor = this.shadowColor;
        a.shadowBlur = this.shadowBlur;
        a.shadowOffsetX = this.shadowOffsetX;
        a.shadowOffsetY = this.shadowOffsetY;
        a.cursor = this.cursor
    };
    R.prototype._setLineSettings = function(a) {
        a.lineWidth = this.linkLineWidth;
        a.strokeStyle = this.linkLineStrokeStyle
    };
    R.prototype.setOptions = function(c) {
        var b = a.extend({}, this.defaults, c || {});
        a.extend(this, b)
    };
    R.prototype.getSize = function() {
        return {
            width: this.size,
            height: this.size
        }
    };
    R.prototype.getShape = function(c, d, b, f) {
        if (this.visible === false) return null;
        var g = 2 * b,
            e = null;
        switch (this.type) {
            case "circle":
                e = new ab(c - b, d - b, b);
                break;
            case "rectangle":
                e = new i(c - b, d - b, g, g);
                break;
            case "diamond":
                var a = [];
                a.push(c);
                a.push(d - b);
                a.push(c + b);
                a.push(d);
                a.push(c);
                a.push(d + b);
                a.push(c - b);
                a.push(d);
                e = new M(a);
                e.isBoundsHitTest = true;
                break;
            case "triangle":
                var a = [];
                a.push(c);
                a.push(d - b);
                a.push(c + b);
                a.push(d + b);
                a.push(c - b);
                a.push(d + b);
                e = new M(a);
                e.isBoundsHitTest = true;
                break;
            case "line":
                e = new n(c - b, d, c + b, d);
                break;
            case "plus":
                var a = [];
                a.push(c - b);
                a.push(d);
                a.push(c + b);
                a.push(d);
                a.push(null);
                a.push(null);
                a.push(c);
                a.push(d - b);
                a.push(c);
                a.push(d + b);
                e = new C(a, true);
                break;
            case "image":
                if (!f) return null;
                e = new db(c, d, f)
        }
        e.useHitTestArea = true;
        e.center = {
            x: Math.round(c),
            y: Math.round(d)
        };
        return e
    };
    R.prototype.isVisible = function() {
        return this.visible !== false && this.type != "none"
    };

    function Mb(a) {
        this.defaults = {
            strokeStyle: "gray",
            lineWidth: 1,
            title: {
                margin: 2,
                hAlign: "left",
                vAlign: "top"
            }
        };
        this.setOptions(a)
    }
    Mb.prototype = {
        _setLineSettings: function(a) {
            a.strokeStyle = this.strokeStyle;
            a.lineWidth = this.lineWidth;
            a.strokeDashArray = this.strokeDashArray
        },
        setOptions: function(b) {
            if (b != null && typeof b.title == "string") {
                b.title = {
                    text: b.title
                };
                a.extend(b.title, this.defaults.title)
            }
            var c = a.extend(true, {}, this.defaults, b || {});
            a.extend(this, c)
        }
    };

    function Lb(a) {
        this.defaults = {
            fillStyle: "gray",
            lineWidth: 0,
            title: {
                margin: 2,
                hAlign: "left",
                vAlign: "top"
            }
        };
        this.setOptions(a)
    }
    Lb.prototype = {
        _setShapeSettings: function(a) {
            a.fillStyle = this.fillStyle;
            a.strokeStyle = this.strokeStyle;
            a.lineWidth = this.lineWidth;
            a.strokeDashArray = this.strokeDashArray
        },
        setOptions: function(b) {
            if (b != null && typeof b.title == "string") {
                b.title = {
                    text: b.title
                };
                a.extend(b.title, this.defaults.title)
            }
            var c = a.extend(true, {}, this.defaults, b || {});
            a.extend(this, c)
        }
    };

    function ib(a) {
        this.defaults = {
            location: "right",
            title: {
                margin: 0
            },
            border: {
                padding: 2,
                strokeStyle: "grey",
                cornerRadius: 6
            },
            margin: 4,
            visible: true
        };
        this._itemMargin = 4;
        this.setOptions(a)
    }
    ib.prototype._isHorizontal = function() {
        return this.location == "top" || this.location == "bottom" ? true : false
    };
    ib.prototype._init = function() {
        this.items = [];
        if (this.visible == false) return;
        if (this.customItems)
            for (var d = 0; d < this.customItems.length; d++) {
                var b = this.customItems[d];
                if (b != null && typeof b.text == "string") b.text = {
                    text: b.text
                };
                var h = {
                    marker: {
                        type: "rectangle",
                        fillStyle: "#418CF0"
                    }
                };
                b = a.extend(true, {}, h, b || {});
                var i = new R(b.marker);
                b.marker = i;
                var c = {};
                a.extend(c, b);
                c.text = b.text.text;
                c.font = b.text.font || "12px sans-serif";
                c.textFillStyle = b.text.fillStyle || "black";
                c.textStrokeStyle = b.text.strokeStyle;
                c.textLineWidth = b.text.lineWidth;
                var e = new eb(c);
                e.chart = this.chart;
                this.items.push(e)
            } else
                for (var g = {
                        font: this.font,
                        textStrokeStyle: this.textStrokeStyle,
                        textFillStyle: this.textFillStyle,
                        textLineWidth: this.textLineWidth,
                        cursor: this.itemsCursor
                    }, f = this.chart.series.items, d = 0; d < f.length; d++) {
                    var j = f[d];
                    a.merge(this.items, j._getLegendItems(g))
                }
    };
    ib.prototype._measure = function() {
        if (this.visible == false) {
            this.width = 0;
            this.height = 0;
            return
        }
        this.padding = this.border.getPadding();
        this.title._measure();
        var i = this.title.width,
            f = this.title.height;
        if (this.title.text) f += this.padding;
        for (var j = this._isHorizontal(), b = 0, a = 0, d = 0, g = 0; g < this.items.length; g++) {
            var c = this.items[g];
            c._measure();
            if (j) {
                b += c.width + this._itemMargin;
                a = Math.max(a, c.height);
                d = Math.max(d, c.width + this._itemMargin)
            } else {
                b = Math.max(b, c.width);
                a += c.height
            }
        }
        var h = 2 * this.margin + 2 * this.padding,
            k = this.chart._width - 2 * this.chart.border.getPadding() - h;
        if (j && b > k) {
            var e = Math.floor(k / d) || 1,
                l = Math.ceil(this.items.length / e);
            this.rows = e;
            this.cellHeight = a + this._itemMargin;
            this.cellWidth = d;
            b = e * d;
            a = l * a + (l - 1) * this._itemMargin
        } else this.rows = 0;
        i = Math.max(i, b);
        f += a;
        this.width = i + h;
        this.height = f + h
    };
    ib.prototype._arrange = function() {
        if (this.visible == false) return;
        var d = this.x + this.margin,
            b = this.y + this.margin,
            g = 2 * this.margin;
        this.border.x = d;
        this.border.y = b;
        var f = this.width - g;
        this.border.width = f;
        this.border.height = this.height - g;
        f -= 2 * this.padding;
        d += this.padding;
        b += this.padding;
        if (this.title.text) {
            this.title.x = d + (f - this.title.width) / 2;
            this.title.y = b;
            b += this.title.height + this.padding
        }
        for (var h = this._isHorizontal(), e = this.rows, c = 0; c < this.items.length; c++) {
            var a = this.items[c];
            a.x = d;
            a.y = b;
            if (h)
                if (e) {
                    a.x += c % e * this.cellWidth;
                    a.y += Math.floor(c / e) * this.cellHeight
                } else d += a.width + this._itemMargin;
            else b += a.height;
            a._arrange()
        }
    };
    ib.prototype._render = function(b) {
        if (this.visible == false) return [];
        this.border._render(b);
        this.title._render(b);
        for (var d = [], c = 0; c < this.items.length; c++) {
            var f = this.items[c],
                e = f._render(b);
            a.merge(d, e)
        }
        return d
    };
    ib.prototype.setOptions = function(b) {
        if (b != null && typeof b.title == "string") {
            b.title = {
                text: b.title
            };
            a.extend(b.title, this.defaults.title)
        }
        var c = a.extend(true, {}, this.defaults, b || {});
        a.extend(this, c);
        this.margin = c.margin;
        this.border = new hb(c.border);
        this.border.fillStyle = this.background || this.border.fillStyle;
        this.title = new T(c.title);
        this.title.chart = this.chart
    };

    function eb(a) {
        this.defaults = {
            font: "12px sans-serif",
            textFillStyle: "black"
        };
        this.lblMargin = 4;
        this.setOptions(a)
    }
    eb.prototype._measure = function() {
        var a;
        if (this.text) a = this.textBlock.measure(this.chart.ctx);
        else a = {
            width: 0,
            height: 0
        };
        this.width = a.width + this.marker.size + this.lblMargin;
        this.height = a.height
    };
    eb.prototype._arrange = function() {
        var a = this.marker.size / 2,
            b = this.x + a,
            c = this.y + a + (this.height - this.marker.size) / 2;
        this.markerShape = this.marker.getShape(b, c, a);
        if (this.markerShape) {
            this.marker._setShapeSettings(this.markerShape);
            this.markerShape.context = this.context;
            this.markerShape.cursor = this.cursor;
            this.markerShape.isLegendItem = true
        }
        this.textBlock.x = this.x + this.marker.size + this.lblMargin;
        this.textBlock.y = this.y
    };
    eb.prototype._render = function(a) {
        a.push(this.markerShape);
        a.push(this.textBlock);
        return [this.markerShape, this.textBlock]
    };
    eb.prototype.setOptions = function(c) {
        var b = a.extend(false, {}, this.defaults, c || {});
        a.extend(this, b);
        this.textBlock = new q(this.text);
        this.textBlock.textBaseline = "top";
        this.textBlock.font = this.font;
        this.textBlock.fillStyle = this.textFillStyle;
        this.textBlock.strokeStyle = this.textStrokeStyle;
        this.textBlock.lineWidth = this.textLineWidth;
        this.textBlock.cursor = this.cursor;
        this.textBlock.context = this.context;
        this.textBlock.isLegendItem = true
    };

    function y(a) {
        this.chart = a;
        this.border = new hb;
        this.border.cornerRadius = 0;
        this.border.lineWidth = 0;
        this.isMouseOver = false
    }
    y.prototype._arrange = function() {
        var a = this.x,
            b = this.y;
        this.border.x = a;
        this.border.y = b;
        this.border.width = this.width;
        this.border.height = this.height;
        this._arrangeRenderer(this.chart.areaRenderer);
        this._arrangeRenderer(this.chart.hlRenderer)
    };
    y.prototype._arrangeRenderer = function(a) {
        if (!g.use_excanvas) return;
        var e = this.x,
            f = this.y,
            b = a.canvas,
            h = a.div,
            d = Math.max(this.width, 0),
            c = Math.max(this.height, 0);
        h.css({
            left: e,
            top: f,
            width: d,
            height: c
        });
        b.width = d;
        b.height = c;
        a.offsetX = -e;
        a.offsetY = -f
    };
    y.prototype._render = function(a) {
        this.border.fillStyle = this.fillStyle;
        this.border._render(a);
        this._renderGridLines(a);
        this._renderPlots(a)
    };
    y.prototype._renderSeries = function(d) {
        for (var b = this.chart.series.items, a = 0; a < b.length; a++) {
            var c = b[a];
            !c.notInGridArea && c._render(d)
        }
    };
    y.prototype._renderStripes = function(e) {
        for (var c = this.chart.axes.items, b = 0; b < c.length; b++) {
            var f = c[b],
                d = this._getStripes(f);
            a.merge(e, d)
        }
    };
    y.prototype._renderPlots = function(c) {
        for (var d = this.chart.axes.items, b = 0; b < d.length; b++) {
            var e = d[b],
                f = this._getPlotBands(e);
            a.merge(c, f);
            var g = this._getPlotLines(e);
            a.merge(c, g)
        }
    };
    y.prototype._renderGridLines = function(e) {
        for (var f = this.chart.axes.items, d = 0; d < f.length; d++) {
            var b = f[d],
                c = b.majorGridLines;
            if (c == null && b.getOrientation() == "y") {
                c = new Cb;
                if (b.minorGridLines != null) b.minorGridLines.major = c
            }
            var h = this._getGridLines(b, b.minorGridLines, false);
            a.merge(e, h);
            var g = this._getGridLines(b, c, true);
            a.merge(e, g)
        }
    };
    y.prototype._getStripes = function(b) {
        var d = b.stripes;
        if (d == null || a.isArray(d) != true) return [];
        var c = this,
            e = [];
        a.each(d, function() {
            var a = new Hb(this),
                k;
            if (a.interval) k = a.interval;
            else k = 2 * b.actualInterval;
            var j;
            if (a.width) j = a.width;
            else j = b.actualInterval;
            for (var h = a.lineWidth, o = h / 2, n = b._getIntervals(k, a, true), m = 0; m < n.length; m++) {
                var l = n[m];
                if (l >= b.actualVisibleMaximum) continue;
                var d = b.getPosition(l),
                    p = b._getNextPosition(l, j),
                    f = b.getPosition(p),
                    g;
                if (b.isAxisVertical) g = new i(c.x + o, Math.min(d, f), c.width - h, Math.abs(f - d));
                else g = new i(Math.min(d, f), c.y + o, Math.abs(f - d), c.height - h);
                a._setSettings(g);
                e.push(g)
            }
        });
        return e
    };
    y.prototype._getGridLines = function(a, b, j) {
        if (a.location == "radial" || b == null || b.visible != true) return [];
        for (var h = [], m = a._getMarkInterval(b, j), i = a._getIntervals(m, b, j), c, d, e, f, g = 0; g < i.length; g++) {
            var l = a.getPosition(i[g]);
            if (a.isAxisVertical) {
                d = f = l;
                c = this.x;
                e = c + this.width
            } else {
                c = e = l;
                d = this.y;
                f = d + this.height
            }
            var k = new n(c, d, e, f);
            b._setLineSettings(k);
            h.push(k)
        }
        return h
    };
    y.prototype._getPlotLines = function(h) {
        var g = h.plotLines;
        if (g == null || a.isArray(g) != true) return [];
        for (var e = this, i = [], j = 0; j < g.length; j++) {
            var d = new Mb;
            if (!h.isAxisVertical) d.defaults.title.hAlign = "right";
            d.setOptions(g[j]);
            var f = d.lineWidth / 2,
                l = h.getPosition(d.value),
                c = new T(d.title);
            c.chart = this.chart;
            c._measure();
            if (h.isAxisVertical) {
                y1 = y2 = l;
                x1 = this.x;
                x2 = x1 + this.width;
                c.x = x1;
                c.y = y1;
                switch (c.hAlign) {
                    case "center":
                        c.x = e.x + (e.width - c.width) / 2;
                        break;
                    case "right":
                        c.x = e.x + e.width - c.width
                }
                switch (c.vAlign) {
                    case "bottom":
                        c.y += f;
                        break;
                    case "center":
                        c.y -= c.height / 2;
                        break;
                    case "top":
                        c.y -= c.height + f
                }
            } else {
                x1 = x2 = l;
                y1 = this.y;
                y2 = y1 + this.height;
                c.x = x1;
                c.y = y1;
                switch (c.hAlign) {
                    case "right":
                        c.x += f;
                        break;
                    case "center":
                        c.x -= c.height / 2;
                        break;
                    case "left":
                        c.x -= c.height + f
                }
                switch (c.vAlign) {
                    case "center":
                        c.y += (e.height - c.width) / 2;
                        break;
                    case "bottom":
                        c.y += e.height - c.width
                }
                c.rotX = c.x + c.height - c.margin;
                c.rotY = c.y + c.margin;
                c.rotationAngle = b.radians(90)
            }
            var k = new n(x1, y1, x2, y2);
            d._setLineSettings(k);
            i.push(k);
            c._render(i)
        }
        return i
    };
    y.prototype._getPlotBands = function(g) {
        var k = g.plotBands;
        if (k == null || a.isArray(k) != true) return [];
        for (var l = this, p = [], q = 0; q < k.length; q++) {
            var d = new Lb;
            if (!g.isAxisVertical) d.defaults.title.hAlign = "right";
            d.setOptions(k[q]);
            var o = d.lineWidth,
                s = o / 2,
                m = g.getPosition(d.from),
                n = g.getPosition(d.to),
                h, j, f, e;
            if (g.isAxisVertical) {
                h = l.x + s;
                j = Math.min(m, n);
                f = l.width - o;
                e = Math.abs(n - m)
            } else {
                h = Math.min(m, n);
                j = l.y + s;
                f = Math.abs(n - m);
                e = l.height - o
            }
            var r = new i(h, j, f, e);
            d._setShapeSettings(r);
            p.push(r);
            var c = new T(d.title);
            c.chart = this.chart;
            c._measure();
            if (g.isAxisVertical) {
                c.x = h;
                c.y = j;
                switch (c.hAlign) {
                    case "center":
                        c.x += (f - c.width) / 2;
                        break;
                    case "right":
                        c.x += f - c.width
                }
                switch (c.vAlign) {
                    case "center":
                        c.y += (e - c.height) / 2;
                        break;
                    case "bottom":
                        c.y += e - c.height
                }
            } else {
                c.x = h;
                c.y = j;
                switch (c.hAlign) {
                    case "center":
                        c.x += (f - c.height) / 2;
                        break;
                    case "right":
                        c.x += f - c.height
                }
                switch (c.vAlign) {
                    case "center":
                        c.y += (e - c.width) / 2;
                        break;
                    case "bottom":
                        c.y += e - c.width
                }
                c.rotX = c.x + c.height - c.margin;
                c.rotY = c.y + c.margin;
                c.rotationAngle = b.radians(90)
            }
            c._render(p)
        }
        return p
    };
    y.prototype._contains = function(a, b) {
        return a >= this.x && a <= this.x + this.width && b >= this.y && b <= this.y + this.height
    };
    y.prototype.getRight = function() {
        return this.x + this.width
    };
    y.prototype.fitHor = function(a) {
        return b.fitInRange(a, this.x, this.getRight())
    };
    y.prototype.fitVer = function(a) {
        return b.fitInRange(a, this.y, this.y + this.height)
    };

    function v(b, a) {
        this.chart = b;
        a && this.setOptions(a)
    }
    v.prototype.setOptions = function(e) {
        this.items = [];
        if (a.isArray(e) == false) return;
        for (var f = 0; f < e.length; f++) {
            var c = e[f];
            if (c == null) continue;
            var b, d = c.type || "column";
            d = d.toLowerCase();
            switch (d) {
                case "area":
                    b = new Z(c);
                    break;
                case "splinearea":
                    b = new ub(c);
                    break;
                case "bar":
                    b = new o(c);
                    break;
                case "bubble":
                    b = new X(c);
                    break;
                case "line":
                    b = new J(c);
                    break;
                case "spline":
                    b = new zb(c);
                    break;
                case "pie":
                    b = new x(c);
                    break;
                case "scatter":
                    b = new yb(c);
                    break;
                case "stackedcolumn":
                    b = new U(c);
                    break;
                case "stackedbar":
                    b = new V(c);
                    break;
                case "rangecolumn":
                    b = new G(c);
                    break;
                case "rangebar":
                    b = new H(c);
                    break;
                case "stock":
                    b = new B(c);
                    break;
                case "candlestick":
                    b = new jb(c);
                    break;
                case "radar":
                case "radarline":
                    b = new z(c);
                    break;
                case "radararea":
                    b = new xb(c);
                    break;
                case "radarspline":
                    b = new sb(c);
                    break;
                case "radarsplinearea":
                    b = new ob(c);
                    break;
                case "polar":
                case "polarline":
                    b = new w(c);
                    break;
                case "polararea":
                    b = new wb(c);
                    break;
                case "polarspline":
                    b = new rb(c);
                    break;
                case "polarsplinearea":
                    b = new nb(c);
                    break;
                case "polarscatter":
                    b = new qb(c);
                    break;
                case "trendline":
                    b = new P(c);
                    break;
                case "verticalline":
                    b = new I(c);
                    break;
                case "verticalspline":
                    b = new vb(c);
                    break;
                case "verticalarea":
                    b = new W(c);
                    break;
                case "verticalsplinearea":
                    b = new pb(c);
                    break;
                case "range":
                    b = new s(c);
                    break;
                case "splinerange":
                    b = new tb(c);
                    break;
                case "column":
                default:
                    b = new A(c)
            }
            b.type = d;
            b.chart = this.chart;
            this.items.push(b)
        }
    };
    v.prototype._initData = function() {
        for (var b = this.items, a = 0; a < b.length; a++) {
            var c = b[a];
            c._initData()
        }
    };
    v.prototype._initVisibleData = function() {
        for (var b = this.items, a = 0; a < b.length; a++) {
            var c = b[a];
            c._initVisibleData()
        }
    };
    v.prototype._initCategories = function() {
        for (var d = [], e = 0, a = 0, f = this.items, c = 0; c < f.length; c++) {
            var b = f[c];
            if (!b.categories) continue;
            for (a = e; a < b.categories.length; a++) {
                var g = b.categories[a];
                d.push(g)
            }
            e = a
        }
        this.categories = d
    };
    v.prototype._initRanges = function() {
        for (var e = h, d = j, c = h, b = j, g = this.items, f = 0; f < g.length; f++) {
            var a = g[f];
            if (e > a.min) e = a.min;
            if (d < a.max) d = a.max;
            if (c > a.minX) c = a.minX;
            if (b < a.maxX) b = a.maxX
        }
        this.min = e;
        this.max = d;
        this.minX = c;
        this.maxX = b
    };
    v.prototype._findClusters = function(g, f) {
        for (var c = -1, a = 0, d = this.items, b = 0; b < d.length; b++) {
            var e = d[b];
            if (e == g) c = a;
            if (e.type == f) a++
        }
        return {
            index: c,
            count: a
        }
    };
    v.prototype._findStackedClusters = function(h, e) {
        for (var f = h.stackedGroupName, g = this._getStackedGroupsFromType(e), l = a.inArray(f, g), k = g.length, i = -1, b = 0, j = this.items, d = 0; d < j.length; d++) {
            var c = j[d];
            if (c == h) i = b;
            if (c.type == e && c.stackedGroupName == f) b++
        }
        return {
            index: i,
            count: b,
            groupIndex: l,
            groupCount: k
        }
    };
    v.prototype._getSeriesFromType = function(e) {
        for (var b = [], c = this.items, a = 0; a < c.length; a++) {
            var d = c[a];
            d.type == e && b.push(d)
        }
        return b
    };
    v.prototype._getStackedSeriesFromType = function(e, f) {
        for (var c = [], d = this.items, b = 0; b < d.length; b++) {
            var a = d[b];
            a.type == e && a.stackedGroupName == f && c.push(a)
        }
        return c
    };
    v.prototype._getStackedGroupsFromType = function(c) {
        var b = [];
        a.each(this.items, function() {
            if (this.type == c) {
                var d = a.inArray(this.stackedGroupName, b);
                d == -1 && b.push(this.stackedGroupName)
            }
        });
        return b
    };
    v.prototype._initColors = function() {
        for (var b = this.chart.paletteColors, c = this.items, a = 0; a < c.length; a++) {
            var d = c[a];
            d._initColors(b.getColor(a), b)
        }
    };
    v.prototype._getPixelMargins = function(f) {
        for (var b = 0, a = 0, e = this.items, c = 0; c < e.length; c++) {
            var g = e[c],
                d = g._getPixelMargins(f);
            b = Math.max(b, d.left);
            a = Math.max(a, d.right)
        }
        return {
            left: b,
            right: a
        }
    };
    v.prototype._isAnchoredToOrigin = function() {
        for (var b = this.items, a = 0; a < b.length; a++) {
            var c = b[a];
            if (c._isAnchoredToOrigin()) return true
        }
        return false
    };
    v.prototype._render = function(d) {
        for (var b = this.items, a = 0; a < b.length; a++) {
            var c = b[a];
            c.notInGridArea && c._render(d)
        }
    };
    v.prototype.getSeries = function(a) {
        return this.items[a]
    };

    function e(a) {
        this.setOptions(a)
    }
    e.prototype = {
        _getMarker: function(d, e, b, f, c) {
            if (b == null) b = this.markers.size / 2;
            var a = this.markers.getShape(d, e, b, c);
            if (a == null) return null;
            this.markers._setShapeSettings(a);
            this._setMarkerSettings(a);
            return a
        },
        _addMarker: function(d, e, i, c, h) {
            var a = this._correctMarkerPosition(d, e, c),
                f = this._getMarker(a.x, a.y, i, c, h),
                g = this.markers.offset,
                b = null;
            if (g) {
                b = new n(d, e, a.x, a.y);
                this.markers._setLineSettings(b);
                this._setMarkerLinkLineSettings(b)
            }
            return {
                marker: f,
                line: b,
                offset: a.offset
            }
        },
        _correctMarkerPosition: function(e, b, d) {
            var a = this.markers.offset;
            if (a) {
                var c = d >= this.realYAxis.crossing;
                b = c ? b - a : b + a
            }
            return {
                x: e,
                y: b,
                offset: a
            }
        },
        _addMarkerAndLabel: function(f, n, j, k, a, h, i, c, m, d) {
            var g = 0,
                p = i ? i : a;
            if (this.markers && this.markers.isVisible() && this.realYAxis.isValueVisible(c)) {
                if (!d) d = {
                    chart: this.chart,
                    series: this,
                    dataItem: this.data[a],
                    index: a,
                    x: this.realXAxis._getValue(p),
                    y: c
                };
                var o = d.dataItem[2],
                    b = this._addMarker(j, k, null, c, o);
                if (b.marker) {
                    b.marker.context = d;
                    b.line && f.push(b.line);
                    f.push(b.marker);
                    g = this.markers.offset;
                    this._addShapeAnimation(b.marker, a, h)
                }
            }
            if (this.labels && this.labels.visible !== false) {
                var l = this._getLabelValue(c, a),
                    e = this._getDataPointLabel(c, j, k, m + g, l);
                e.context = {
                    chart: this.chart,
                    series: this,
                    dataItem: this.data[a],
                    index: a
                };
                this.chart.elem.trigger("dataPointLabelCreating", e);
                n.push(e);
                this._addShapeAnimation(e, a, h)
            }
        },
        _getAnimation: function() {
            return this.animation || this.chart.options.animation
        },
        _addShapeAnimation: function(e, g, f) {
            var b = this._getAnimation();
            if (!b || b.enabled === false) return;
            var a = new kb(b, e, "visible", false, true),
                c = a.duration / f,
                d = a.delayTime + g * c;
            a.delayTime = d;
            a.duration = c;
            this.chart.storyboard.addAnimation(a)
        },
        _addLengthAnimation: function(b) {
            var a = this._getAnimation();
            if (!a || a.enabled === false) return;
            var c = new gb(a, b, "length", 0, b.getLength());
            this.chart.storyboard.addAnimation(c)
        },
        _setMarkerSettings: function(a) {
            a.fillStyle = a.fillStyle || this.fillStyle;
            a.cursor = a.cursor || this.cursor;
            var c = this.chart.options.shadows;
            if (b.isNull(a.shadowColor)) a.shadowColor = !b.isNull(this.shadowColor) ? this.shadowColor : c.shadowColor;
            if (b.isNull(a.shadowBlur)) a.shadowBlur = !b.isNull(this.shadowBlur) ? this.shadowBlur : c.shadowBlur;
            if (b.isNull(a.shadowOffsetX)) a.shadowOffsetX = !b.isNull(this.shadowOffsetX) ? this.shadowOffsetX : c.shadowOffsetX;
            if (b.isNull(a.shadowOffsetY)) a.shadowOffsetY = !b.isNull(this.shadowOffsetY) ? this.shadowOffsetY : c.shadowOffsetY
        },
        _setMarkerLinkLineSettings: function(a) {
            a.strokeStyle = a.strokeStyle || this.markers.strokeStyle || this.fillStyle
        },
        _setShapeSettings: function(a, c) {
            if (this.fillStyles && !b.isNull(c)) a.fillStyle = this.fillStyles[c % this.fillStyles.length];
            else a.fillStyle = this.fillStyle;
            a.strokeStyle = this.strokeStyle;
            a.lineWidth = this.lineWidth;
            a.lineCap = this.lineCap;
            a.lineJoin = this.lineJoin;
            a.miterLimit = this.miterLimit;
            a.strokeDashArray = this.strokeDashArray;
            g.setShadows(a, this, this.chart);
            a.nullHandling = this.nullHandling;
            a.cursor = this.cursor
        },
        _getXAxisType: function() {
            var b = this.data;
            if (a.isArray(b) == false) return "none";
            for (var d = 0; d < b.length; d++) {
                var c = b[d];
                if (c == null) continue;
                if (a.isArray(c) == false) return "CategoryAxis";
                var e = c[0];
                if (e == null) continue;
                var f = a.type(e);
                switch (f) {
                    case "number":
                        return "LinearAxis";
                    case "date":
                        return "DateTimeAxis";
                    case "string":
                        return "CategoryAxis";
                    default:
                        return "none"
                }
            }
            return "none"
        },
        _resolveAxisType: function(b) {
            var a = b.location;
            if (!a) return;
            if (this.isVertical) {
                if (a == "bottom" || a == "top") return
            } else if (a == "left" || a == "right") return;
            var c = this._getXAxisType();
            switch (c) {
                case "LinearAxis":
                    b.type = "linear";
                    break;
                case "DateTimeAxis":
                    b.type = "dateTime";
                    break;
                case "CategoryAxis":
                    b.type = "category"
            }
        },
        _initXYData: function() {
            for (var l = this.data, g = h, f = j, e = h, d = j, m = l.length, k = 0; k < m; k++) {
                var i = l[k];
                if (i == null) continue;
                var c = i[0];
                if (e > c) e = c;
                if (d < c) d = c;
                var a = i[1];
                if (!b.isNull(a)) {
                    if (g > a) g = a;
                    if (f < a) f = a
                }
            }
            this.min = g;
            this.max = f;
            this.minX = e;
            this.maxX = d
        },
        _initCatValueData: function() {
            for (var k = this.data, i = h, g = j, f = [], l = k.length, e = 0; e < l; e++) {
                var d = k[e];
                if (d == null) {
                    f.push((e + 1).toString());
                    continue
                }
                var c = d;
                if (a.isArray(d) == false) f.push((e + 1).toString());
                else {
                    f.push(d[0]);
                    c = d[1]
                }
                if (!b.isNull(c)) {
                    if (i > c) i = c;
                    if (g < c) g = c
                }
            }
            this.min = i;
            this.max = g;
            this.categories = f
        },
        _initDateValueData: function() {
            for (var l = this.data, g = h, f = j, e = h, d = j, m = l.length, k = 0; k < m; k++) {
                var i = l[k];
                if (i == null) continue;
                var c = i[0].getTime();
                if (e > c) e = c;
                if (d < c) d = c;
                var a = i[1];
                if (!b.isNull(a)) {
                    if (g > a) g = a;
                    if (f < a) f = a
                }
            }
            this.min = g;
            this.max = f;
            this.minX = e;
            this.maxX = d
        },
        _initXYDataRange: function(n, p) {
            for (var m = this.data, i = h, g = j, f = h, e = j, o = m.length, k = 0; k < o; k++) {
                var d = m[k];
                if (d == null || a.isArray(d) == false) continue;
                var b = d[0];
                if (f > b) f = b;
                if (e < b) e = b;
                for (var l = n; l < p; l++) {
                    var c = d[l];
                    if (i > c) i = c;
                    if (g < c) g = c
                }
            }
            this.min = i;
            this.max = g;
            this.minX = f;
            this.maxX = e
        },
        _initCatValueDataRange: function(k, m) {
            for (var i = this.data, e = h, d = j, c = [], l = i.length, b = 0; b < l; b++) {
                var f = i[b];
                if (f == null) {
                    c.push((b + 1).toString());
                    continue
                }
                c.push(f[0]);
                for (var g = k; g < m; g++) {
                    var a = f[g];
                    if (e > a) e = a;
                    if (d < a) d = a
                }
            }
            this.min = e;
            this.max = d;
            this.categories = c
        },
        _initDateValueDataRange: function(n, p) {
            for (var m = this.data, i = h, g = j, f = h, e = j, o = m.length, k = 0; k < o; k++) {
                var d = m[k];
                if (d == null || a.isArray(d) == false) continue;
                var b = d[0].getTime();
                if (f > b) f = b;
                if (e < b) e = b;
                for (var l = n; l < p; l++) {
                    var c = d[l];
                    if (i > c) i = c;
                    if (g < c) g = c
                }
            }
            this.min = i;
            this.max = g;
            this.minX = f;
            this.maxX = e
        },
        _initData: function() {
            var a = this._getXAxisType();
            this.xAxisType = a;
            switch (a) {
                case "LinearAxis":
                    this._initXYData();
                    return;
                case "DateTimeAxis":
                    this._initDateValueData();
                    return;
                case "CategoryAxis":
                    this._initCatValueData();
                    return
            }
        },
        _initVisibleData: function() {
            var a = this._getXAxisType();
            this.xAxisType = a;
            switch (a) {
                case "LinearAxis":
                case "DateTimeAxis":
                    this._initVisibleXYData();
                    return;
                case "CategoryAxis":
                    this._initVisibleCatValueData();
                    return
            }
        },
        _initVisibleXYData: function() {
            if (this.realYAxis.zoomEnabled) return;
            var a = this.realXAxis,
                e = a.visibleMinimum || a.minimum,
                d = a.visibleMaximum || a.maximum,
                m = !b.isNull(e),
                l = !b.isNull(d);
            if (!m && !l) return;
            if (a.skipEmptyDays) {
                e = a._addEmptyDaysOffset(e);
                d = a._addEmptyDaysOffset(d)
            }
            for (var n = this.data, g = h, f = j, p = n.length, k = 0; k < p; k++) {
                var i = n[k];
                if (i == null) continue;
                var c = i[1];
                if (b.isNull(c)) continue;
                var o = i[0];
                if (m && o < e || l && o > d) continue;
                if (g > c) g = c;
                if (f < c) f = c
            }
            this.min = g;
            this.max = f
        },
        _initVisibleCatValueData: function() {
            if (this.realYAxis.zoomEnabled) return;
            var e = this.realXAxis,
                o = e.visibleMinimum || e.minimum,
                n = e.visibleMaximum || e.maximum,
                l = !b.isNull(o),
                k = !b.isNull(n);
            if (!l && !k) return;
            for (var m = this.data, i = h, g = j, p = m.length, d = 0; d < p; d++) {
                var f = m[d];
                if (f == null) continue;
                var c = f;
                if (a.isArray(f)) c = f[1];
                if (b.isNull(c)) continue;
                if (l && d + 1 < o || k && d > n) continue;
                if (i > c) i = c;
                if (g < c) g = c
            }
            this.min = i;
            this.max = g
        },
        _initVisibleCatValueDataRange: function(p, r) {
            if (this.realYAxis.zoomEnabled) return;
            var c = this.realXAxis,
                n = c.visibleMinimum || c.minimum,
                m = c.visibleMaximum || c.maximum,
                k = !b.isNull(n),
                i = !b.isNull(m);
            if (!k && !i) return;
            for (var l = this.data, f = h, e = j, q = l.length, a = 0; a < q; a++) {
                var o = l[a];
                if (o == null) continue;
                if (k && a + 1 < n || i && a > m) continue;
                for (var g = p; g < r; g++) {
                    var d = o[g];
                    if (f > d) f = d;
                    if (e < d) e = d
                }
            }
            this.min = f;
            this.max = e
        },
        _initVisibleXYDataRange: function(q, s) {
            if (this.realYAxis.zoomEnabled) return;
            var a = this.realXAxis,
                d = a.visibleMinimum || a.minimum,
                c = a.visibleMaximum || a.maximum,
                n = !b.isNull(d),
                m = !b.isNull(c);
            if (!n && !m) return;
            if (a.skipEmptyDays) {
                d = a._addEmptyDaysOffset(d);
                c = a._addEmptyDaysOffset(c)
            }
            for (var o = this.data, g = h, f = j, r = o.length, k = 0; k < r; k++) {
                var i = o[k];
                if (i == null) continue;
                var p = i[0];
                if (n && p < d || m && p > c) continue;
                for (var l = q; l < s; l++) {
                    var e = i[l];
                    if (g > e) g = e;
                    if (f < e) f = e
                }
            }
            this.min = g;
            this.max = f
        },
        _createXAxis: function() {
            var b = {
                    location: "bottom",
                    orientation: "x"
                },
                a;
            switch (this.xAxisType) {
                case "DateTimeAxis":
                    a = new l(b);
                    break;
                case "CategoryAxis":
                    a = new E(b);
                    break;
                default:
                    a = new k(b)
            }
            a.chart = this.chart;
            return a
        },
        _createYAxis: function() {
            var a = new k({
                location: "left",
                orientation: "y"
            });
            a.chart = this.chart;
            return a
        },
        _initXAxis: function(b) {
            var a = this._findXAxis(b);
            if (a == null) {
                a = this._createXAxis();
                b.push(a)
            }
            this.realXAxis = a
        },
        _initYAxis: function(b) {
            var a = this._findYAxis(b);
            if (a == null) {
                a = this._createYAxis();
                b.push(a)
            }
            this.realYAxis = a
        },
        _initSharedAxes: function() {
            if (this.realXAxis && this.realYAxis) {
                this.realXAxis.sharedAxis = this.realYAxis;
                this.realYAxis.sharedAxis = this.realXAxis
            }
        },
        _findAxis: function(b, d) {
            if (d != null)
                for (var a = 0; a < b.length; a++) {
                    var c = b[a];
                    if (c.name == d) return c
                }
            return null
        },
        _findXAxis: function(b) {
            var a = this._findAxis(b, this.axisX);
            if (a != null) return a;
            for (var c = 0; c < b.length; c++) {
                a = b[c];
                if (a.getOrientation(this) != "x" || a.isVertical()) continue;
                if (a.DataType == this.xAxisType) return a
            }
            return null
        },
        _findYAxis: function(b) {
            var a = this._findAxis(b, this.axisY);
            if (a != null) return a;
            for (var c = 0; c < b.length; c++) {
                a = b[c];
                if (a.getOrientation(this) != "y" || a.isVertical() == false) continue;
                if (a.DataType == "LinearAxis") return a
            }
            return null
        },
        _getLegendItems: function(c) {
            var f = [],
                d;
            if (this.title != null) d = this.title;
            else {
                var h = a.inArray(this, this.chart.series.items) + 1;
                d = "Series " + h.toString()
            }
            var b = new R;
            b.fillStyle = this.fillStyle;
            b.lineWidth = this.lineWidth;
            b.strokeStyle = this.strokeStyle;
            switch (this.type) {
                case "line":
                case "trendline":
                    b.type = "line";
                    break;
                case "scatter":
                    b.fillStyle = this.fillStyle;
                    b.lineWidth = 0;
                    if (this.markers) b.type = this.markers.type
            }
            var g = {
                chart: this.chart,
                series: this
            };
            c = a.extend(false, {}, c, {
                context: g,
                text: d,
                marker: b
            });
            var e = new eb(c);
            e.chart = this.chart;
            e.series = this;
            f.push(e);
            return f
        },
        _initColors: function(a) {
            this.fillStyle = this.fillStyle || a;
            this.strokeStyle = this.strokeStyle || a
        },
        _getPixelMargins: function(f) {
            var h = 4,
                g = 0,
                d;
            if (this.markers) {
                d = this.markers.getSize();
                g = this.markers.offset
            } else d = {
                width: 0,
                height: 0
            };
            var c;
            if (this.labels && this.labels.visible !== false) {
                var i = new q("TEST");
                a.extend(i, this.labels);
                c = i.measure(this.chart.ctx)
            } else c = {
                width: 0,
                height: 0
            };
            var e = f.isVertical(),
                j = this.isVertical,
                b;
            if (e) b = d.height / 2 + c.height + h;
            else b = d.width / 2 + c.width + h;
            if (j && !e || !j && e) {
                b += g;
                b *= 1.25;
                var k = b / f.length;
                b *= 1 + k
            }
            if (f.getOrientation(this) == "x") b = Math.max(b, 6);
            else b = Math.max(b, 12);
            return {
                left: b,
                right: b
            }
        },
        _isAnchoredToOrigin: function() {
            return false
        },
        _getLabelText: function(c) {
            return a.fn.jqChart.labelFormatter(this.labels.stringFormat, c)
        },
        _getLabelValue: function(a, b) {
            switch (this.labels.valueType) {
                case "percentage":
                    a = this.getPercentage(a, b)
            }
            return a
        },
        _getDataPointLabel: function(i, j, d, c, e) {
            var f = i >= this.realYAxis.crossing,
                h = this._getLabelText(e),
                b = new q(h);
            g.setShadows(b, this, this.chart);
            a.extend(b, this.labels);
            b.textAlign = "center";
            b.x = j;
            if (f) {
                b.y = d - c;
                b.textBaseline = "bottom"
            } else {
                b.y = d + c;
                b.textBaseline = "top"
            }
            return b
        },
        _initStackedData: function(b) {
            var f = this._getXAxisType();
            this.xAxisType = f;
            var c = this.data;
            if (a.isArray(c) == false) return;
            var g = this.chart.series._findStackedClusters(this, b),
                e = this.chart.series._getStackedSeriesFromType(b, this.stackedGroupName),
                d = this._calcStackedData(c, g, e);
            a.extend(this, d)
        },
        _initVisibleStackedData: function(b) {
            var f = this._getXAxisType();
            this.xAxisType = f;
            var c = this.data;
            if (a.isArray(c) == false) return;
            var g = this.chart.series._findStackedClusters(this, b),
                e = this.chart.series._getStackedSeriesFromType(b, this.stackedGroupName),
                d = this._calcVisibleStackedData(c, g, e);
            a.extend(this, d)
        },
        _getTotal: function(h, i) {
            for (var f = this.chart.series._getSeriesFromType(h), e = 0, d = 0, c = 0; c < f.length; c++) {
                var j = f[c],
                    g = j.data;
                if (g == null) continue;
                var b = g[i];
                if (a.isArray(b)) b = b[1];
                if (b == null) continue;
                if (b > 0) e += b;
                else d += b
            }
            return {
                positive: e,
                negative: d
            }
        },
        _getStackedTotal: function(e, f) {
            for (var d = 0, c = 0, b = 0; b < e.length; b++) {
                var g = e[b],
                    a = g.dataValues[f];
                if (a.actualValue > 0) d += a.actualValue;
                else c += a.actualValue
            }
            return {
                positive: d,
                negative: c
            }
        },
        _getPrevStackedPosition: function(g, f, h, e, c, d) {
            for (var b = f - 1; b >= 0; b--) {
                var a = g[b].dataValues[h];
                if (d) {
                    if (a.value == a.positive) return c.getPosition(a.value)
                } else if (a.value == a.negative) return c.getPosition(a.value)
            }
            return e
        },
        _calcStackedData: function(m, l, n) {
            for (var i = h, g = j, f = [], p = m.length, k = [], d = 0; d < p; d++) {
                var b = {
                        positive: 0,
                        negative: 0
                    },
                    e = null;
                if (l.index > 0) {
                    e = n[l.index - 1].dataValues[d];
                    b.positive = e.positive;
                    b.negative = e.negative
                }
                var c = m[d];
                if (c == null) {
                    f.push((d + 1).toString());
                    continue
                }
                if (a.isArray(c) == false) f.push((d + 1).toString());
                else f.push(c[0]);
                if (a.isArray(c)) c = c[1];
                b.actualValue = c;
                if (c > 0) {
                    b.positive += c;
                    b.value = b.positive
                } else if (c < 0) {
                    b.negative += c;
                    b.value = b.negative
                } else if (e != null) b.value = e.value;
                else b.value = 0;
                k[d] = b;
                g = Math.max(g, b.value);
                i = Math.min(i, b.value)
            }
            var o = {
                min: i,
                max: g,
                dataValues: k,
                categories: f
            };
            return o
        },
        _calcVisibleStackedData: function(n, m, q) {
            var g = this.realXAxis,
                u = this.realYAxis,
                t = g.zoomEnabled,
                v = u.zoomEnabled;
            if (v || !t) return;
            var p = g.visibleMinimum,
                o = g.visibleMaximum;
            if (b.isNull(p) || b.isNull(o)) return;
            for (var k = h, i = j, r = [], w = n.length, l = [], e = 0; e < w; e++) {
                if (e + 1 < p || e > o) continue;
                var c = {
                        positive: 0,
                        negative: 0
                    },
                    f = null;
                if (m.index > 0) {
                    f = q[m.index - 1].dataValues[e];
                    c.positive = f.positive;
                    c.negative = f.negative
                }
                var d = n[e];
                if (a.isArray(d)) d = d[1];
                c.actualValue = d;
                if (d > 0) {
                    c.positive += d;
                    c.value = c.positive
                } else if (d < 0) {
                    c.negative += d;
                    c.value = c.negative
                } else if (f != null) c.value = f.value;
                else c.value = 0;
                l[e] = c;
                i = Math.max(i, c.value);
                k = Math.min(k, c.value)
            }
            var s = {
                min: k,
                max: i,
                dataValues: l,
                categories: r
            };
            return s
        },
        _getTooltip: function(b) {
            var a = "<b>" + b.y + "</b><br/>";
            if (this.title) {
                var d = c.getColorFromFillStyle(this.fillStyle);
                a = '<span style="color:' + d + '">' + this.title + "</span>: " + a
            }
            return a
        },
        _getDataLengthSum: function() {
            if (this.xAxisType == "CategoryAxis") return this.data.length;
            var c = this.chart.series._getSeriesFromType(this.type),
                b = 0;
            a.each(c, function(c, a) {
                if (a.data) b += a.data.length
            });
            return b
        },
        _getScaleDiff: function() {
            return 1;
            var c = this.realXAxis.series,
                b = this.realXAxis.actualMinimum,
                a = this.realXAxis.actualMaximum;
            if (this.realXAxis.skipEmptyDays) {
                b = this.realXAxis._addEmptyDaysOffset(b);
                a = this.realXAxis._addEmptyDaysOffset(a)
            }
            return (c.maxX - c.minX) / (a - b)
        },
        getPercentage: function(a, d) {
            var b = this._getTotal(this.type, d),
                c = a > 0 ? b.positive : b.negative;
            a = c != 0 ? 100 * Math.abs(a) / Math.abs(c) : 0;
            return a
        },
        setOptions: function(c) {
            var b = a.extend({}, this.defaults, c || {});
            a.extend(this, b);
            if (b.markers != null) this.markers = new R(b.markers)
        },
        defaults: {
            nullHandling: "break",
            lineCap: "butt",
            lineJoin: "round",
            lineWidth: 1,
            strokeStyle: null,
            miterLimit: 10,
            pointWidth: .6
        }
    };

    function J(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 2,
            markers: {}
        });
        this.defaults = c;
        e.call(this, b)
    }
    J.prototype = new e;
    J.constructor = J;
    J.prototype._render = function(b) {
        if (!this.data) return;
        var a = this._getXAxisType();
        this.xAxisType = a;
        switch (a) {
            case "LinearAxis":
            case "DateTimeAxis":
                this._renderXYData(b);
                return;
            case "CategoryAxis":
                this._renderCatValueData(b);
                return
        }
    };
    J.prototype._renderCatValueData = function(j) {
        for (var o = this.data.length, f = this.markers != null && this.markers.isVisible(), c = [], i = [], n = [], l = [], q = f ? this.markers.size / 2 : 0, h, k, p, d, e = 0; e < o; e++) {
            var g = this.data[e];
            if (g === null) {
                c.push(null);
                c.push(null);
                !f && i.push(null);
                continue
            }
            p = h = e + .5;
            if (a.isArray(g) == false) d = g;
            else {
                d = g[1];
                if (b.isNull(d)) {
                    c.push(null);
                    c.push(null);
                    !f && i.push(null);
                    continue
                }
            }
            h = this.realXAxis.getPosition(h);
            k = this.realYAxis.getPosition(d);
            c.push(h);
            c.push(k);
            !f && i.push({
                dataItem: g,
                index: e,
                x: p,
                y: d
            });
            if (this.realYAxis.isValueVisible(d) === false) continue;
            this._addMarkerAndLabel(n, l, h, k, e, o, null, d, q)
        }
        var m = this._createShape(c, j);
        if (!f && m) m.context = {
            chart: this.chart,
            series: this,
            points: i
        };
        else a.merge(j, n);
        a.merge(j, l)
    };
    J.prototype._renderXYData = function(i) {
        var k = this.data.length,
            d = this.markers != null && this.markers.isVisible(),
            q = this.labels != null && this.labels.visible !== false;
        if (k > 1e3 && d == false && q == false) {
            this._renderLargeXYData(i);
            return
        }
        for (var c = [], h = [], p = [], n = [], r = d ? this.markers.size / 2 : 0, l, m, f, e, g = 0; g < k; g++) {
            var j = this.data[g];
            if (j === null) {
                c.push(null);
                c.push(null);
                !d && h.push(null);
                continue
            }
            f = j[0];
            e = j[1];
            if (b.isNull(f) || b.isNull(e)) {
                c.push(null);
                c.push(null);
                !d && h.push(null);
                continue
            }
            l = this.realXAxis.getPosition(f);
            m = this.realYAxis.getPosition(e);
            c.push(l);
            c.push(m);
            !d && h.push({
                dataItem: j,
                index: g,
                x: f,
                y: e
            });
            if (this.realYAxis.isValueVisible(e) === false) continue;
            this._addMarkerAndLabel(p, n, l, m, g, k, f, e, r)
        }
        var o = this._createShape(c, i);
        if (!d && o) o.context = {
            chart: this.chart,
            series: this,
            points: h
        };
        else a.merge(i, p);
        a.merge(i, n)
    };
    J.prototype._renderLargeXYData = function(s) {
        for (var x = this.data.length, w = this.chart.gridArea.width, r = this.chart.gridArea.height, i = this.realXAxis, j = this.realYAxis, t = 2 * (i.actualVisibleMaximum - i.actualVisibleMinimum) / w, u = 2 * (j.actualVisibleMaximum - j.actualVisibleMinimum) / r, a = [], p, q, c, b, n = 0, o = 0, k = 0, l = 0, d, f, g, v = 0, e = [], h = 0; h < x; h++) {
            d = this.data[h];
            if (d === null) {
                a.push(null);
                a.push(null);
                e.push(null);
                continue
            }
            c = d[0];
            b = d[1];
            if (b === null) {
                a.push(null);
                a.push(null);
                e.push(null);
                continue
            }
            f = n - c;
            g = o - b;
            k += f < 0 ? -f : f;
            l += g < 0 ? -g : g;
            if (k < t && l < u) {
                v++;
                continue
            }
            k = 0;
            l = 0;
            n = c;
            o = b;
            p = i.getPosition(c);
            q = j.getPosition(b);
            a.push(p);
            a.push(q);
            e.push({
                dataItem: d,
                index: h,
                x: c,
                y: b
            })
        }
        var m = this._createShape(a, s);
        if (m) m.context = {
            chart: this.chart,
            series: this,
            points: e
        }
    };
    J.prototype._createShape = function(c, b) {
        var a = new C(c);
        this._setShapeSettings(a);
        b.push(a);
        this._addLengthAnimation(a);
        return a
    };

    function Z(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 0,
            markers: null
        });
        this.defaults = c;
        e.call(this, b)
    }
    Z.prototype = new J;
    Z.constructor = Z;
    Z.prototype._createShape = function(i, h) {
        var g = [];
        a.merge(g, i);
        var c = new C(g);
        this._setShapeSettings(c);
        var f = this.chart.gridArea,
            k = f.y,
            j = f.y + f.height,
            e = this.realYAxis.getCrossingPosition();
        e = b.fitInRange(e, k, j);
        var d = new bb(i, e);
        this._setShapeSettings(d);
        d.lineWidth = 0;
        h.push(d);
        h.push(c);
        this._addLengthAnimation(d);
        this._addLengthAnimation(c);
        return c
    };
    Z.prototype._isAnchoredToOrigin = function() {
        return true
    };

    function ub(a) {
        Z.call(this, a)
    }
    ub.prototype = new Z;
    ub.constructor = ub;
    ub.prototype._createShape = function(i, h) {
        var g = [];
        a.merge(g, i);
        var d = new u(g);
        this._setShapeSettings(d);
        var f = this.chart.gridArea,
            k = f.y,
            j = f.y + f.height,
            e = this.realYAxis.getCrossingPosition();
        e = b.fitInRange(e, k, j);
        var c = new bb(i, e, false, true);
        this._setShapeSettings(c);
        c.lineWidth = 0;
        h.push(c);
        h.push(d);
        this._addLengthAnimation(c);
        this._addLengthAnimation(d);
        return d
    };

    function o(a) {
        this.isVertical = true;
        e.call(this, a)
    }
    o.prototype = new e;
    o.constructor = o;
    o.prototype._createXAxis = function() {
        var b = {
                location: "left",
                orientation: "x"
            },
            a;
        switch (this.xAxisType) {
            case "DateTimeAxis":
                a = new l(b);
                break;
            case "CategoryAxis":
                a = new E(b);
                break;
            default:
                a = new k(b)
        }
        a.chart = this.chart;
        return a
    };
    o.prototype._createYAxis = function() {
        var a = new k({
            location: "bottom",
            orientation: "y"
        });
        a.chart = this.chart;
        return a
    };
    o.prototype._findXAxis = function(b) {
        var a = this._findAxis(b, this.axisX);
        if (a != null) return a;
        var c;
        if (this.categories) c = E;
        else c = k;
        for (var d = 0; d < b.length; d++) {
            a = b[d];
            if (a.getOrientation(this) != "x" || a.isVertical() == false) continue;
            if (a instanceof c) return a
        }
        return null
    };
    o.prototype._findYAxis = function(b) {
        var a = this._findAxis(b, this.axisY);
        if (a != null) return a;
        for (var c = 0; c < b.length; c++) {
            a = b[c];
            if (a.getOrientation(this) != "y" || a.isVertical()) continue;
            if (a instanceof k) return a
        }
        return null
    };
    o.prototype._render = function(a) {
        if (!this.data) return;
        switch (this.xAxisType) {
            case "LinearAxis":
            case "DateTimeAxis":
                this._renderLinearData(a);
                break;
            case "CategoryAxis":
                this._renderCatData(a)
        }
    };
    o.prototype._renderCatData = function(p) {
        var j = this.chart.gridArea,
            y = j.x,
            D = y + j.width,
            e = this.realYAxis.getCrossingPosition();
        e = b.fitInRange(e, y, D);
        e = Math.round(e);
        var q = this.chart.series._findClusters(this, this.type),
            m = this._getDataLengthSum(),
            B = j.height / this.realXAxis.getZoom(),
            w = B / m,
            E = w / q.count,
            h = Math.round(this.pointWidth * E),
            A = q.count * h,
            o = (w - A) / 2;
        o = Math.round(o + q.index * h);
        for (var u = [], r = [], C = this.markers && this.markers.isVisible() ? this.markers.size / 2 + 2 : 2, c, l, d = 0; d < m; d++) {
            var n = this.data[d];
            if (n == null) continue;
            var F = d,
                g;
            if (a.isArray(n) == false) g = n;
            else g = n[1];
            if (g == null) continue;
            l = Math.round(this.realXAxis.getPosition(F) - o - h);
            c = Math.round(this.realYAxis.getPosition(g));
            var z = c,
                f;
            if (c <= e) {
                f = e - c;
                var v = j.x - 10;
                if (c < v) {
                    var x = v - c;
                    c += x;
                    f -= x
                }
            } else {
                f = c - e;
                c = e;
                var s = j.getRight() + 10;
                if (c + f > s) f = s - c
            }
            var t = {
                    chart: this.chart,
                    series: this,
                    dataItem: this.data[d],
                    index: d,
                    x: this.realXAxis._getValue(d),
                    y: g
                },
                k = new i(c, l, f, h);
            k.context = t;
            k.center = {
                x: Math.round(z),
                y: Math.round(l + h / 2)
            };
            this._setShapeSettings(k, d);
            p.push(k);
            this._addAnimation(k, d, m);
            l += h / 2;
            this._addMarkerAndLabel(u, r, z, l, d, m, null, g, C, t)
        }
        a.merge(p, u);
        a.merge(p, r)
    };
    o.prototype._renderLinearData = function(m) {
        var g = this.chart.gridArea,
            w = g.x,
            C = w + g.width,
            d = this.realYAxis.getCrossingPosition();
        d = b.fitInRange(d, w, C);
        d = Math.round(d);
        for (var j = this._getDataLengthSum(), z = g.height / this.realXAxis.getZoom(), n = this._getScaleDiff(), B = n * z / j, p = this.pointWidth * B, u = [], r = [], A = this.markers && this.markers.isVisible() ? this.markers.size / 2 : 0, c, q, e = 0; e < j; e++) {
            var l = this.data[e];
            if (l == null || a.isArray(l) == false) continue;
            var o = l[0],
                k = l[1];
            if (o == null || k == null) continue;
            var t = {
                chart: this.chart,
                series: this,
                dataItem: this.data[e],
                index: e,
                x: o,
                y: k
            };
            q = this.realXAxis.getPosition(o);
            c = Math.round(this.realYAxis.getPosition(k));
            var y = c,
                f;
            if (c <= d) {
                f = d - c;
                var v = g.x - 10;
                if (c < v) {
                    var n = v - c;
                    c += n;
                    f -= n
                }
            } else {
                f = c - d;
                c = d;
                var s = g.getRight() + 10;
                if (c + f > s) f = s - c
            }
            var x = q - p / 2,
                h = new i(c, x, f, p);
            h.context = t;
            h.center = {
                x: Math.round(y),
                y: Math.round(x + p / 2)
            };
            this._setShapeSettings(h, e);
            m.push(h);
            this._addAnimation(h, e, j);
            this._addMarkerAndLabel(u, r, y, q, e, j, null, k, A, t)
        }
        a.merge(m, u);
        a.merge(m, r)
    };
    o.prototype._addAnimation = function(d, g, f) {
        var b = this._getAnimation();
        if (!b || b.enabled === false) return;
        var a = new gb(b, d, "xDecrease", d.width, 0),
            c = a.duration / f,
            e = a.delayTime + g * c;
        a.delayTime = e;
        a.duration = c;
        this.chart.storyboard.addAnimation(a)
    };
    o.prototype._correctMarkerPosition = function(a, e, d) {
        var b = this.markers.offset;
        if (b) {
            var c = d >= this.realYAxis.crossing;
            a = c ? a + b : a - b
        }
        return {
            x: a,
            y: e
        }
    };
    o.prototype._getPixelMargins = function(a) {
        if (a.isVertical() == false) {
            var b = e.prototype._getPixelMargins.call(this, a),
                c = a.length / 10,
                i = Math.max(c, b.left),
                h = Math.max(c, b.right);
            return {
                left: i,
                right: h
            }
        }
        if (this.data == null) return {
            left: 0,
            right: 0
        };
        var g = 4,
            j = this._getDataLengthSum(),
            f = a.length,
            d = .5 * f / j + g;
        return {
            left: d,
            right: d
        }
    };
    o.prototype._isAnchoredToOrigin = function() {
        return true
    };
    o.prototype._getDataPointLabel = function(k, f, l, e, h) {
        var i = k <= this.realYAxis.crossing,
            j = this._getLabelText(h),
            b = new q(j);
        g.setShadows(b, this, this.chart);
        a.extend(b, this.labels);
        b.measure(this.chart.ctx);
        b.y = l;
        var c = this.chart.gridArea;
        if (i) {
            b.x = f - e;
            b.textAlign = "right";
            if (b.x - b.width < c.x + 4) b.x = c.x + b.width + 4
        } else {
            b.x = f + e;
            b.textAlign = "left";
            var d = c.getRight() - 4;
            if (b.x + b.width > d) b.x = d - b.width
        }
        return b
    };
    o.prototype._initColors = function(a) {
        this.fillStyle = this.fillStyle || a
    };

    function X(b) {
        var c = a.extend(true, {}, this.defaults, {
            markers: {
                strokeStyle: null
            }
        });
        this.defaults = c;
        e.call(this, b)
    }
    X.prototype = new e;
    X.constructor = X;
    X.prototype._initData = function() {
        if (!this.data) return;
        var q = this._getXAxisType();
        this.xAxisType = q;
        var c = [];
        a.merge(c, this.data);
        for (var p = this.chart.series.items, b = 0; b < p.length; b++) {
            var m = p[b];
            if (m == this || m.type != "bubble") continue;
            a.merge(c, m.data)
        }
        if (a.isArray(c) == false) return;
        for (var l = h, k = j, i = h, g = j, e = h, d = j, r = c.length, b = 0; b < r; b++) {
            var n = c[b][0],
                o = c[b][1],
                f = c[b][2];
            if (n == null || o == null || f == null) continue;
            i = Math.min(i, n);
            g = Math.max(g, n);
            l = Math.min(l, o);
            k = Math.max(k, o);
            e = Math.min(e, f);
            d = Math.max(d, f)
        }
        this.min = l;
        this.max = k;
        this.minX = i;
        this.maxX = g;
        this.minSize = e;
        this.maxSize = d
    };
    X.prototype._render = function(l) {
        if (!this.data) return;
        var n = this.chart,
            o = n.options,
            g = o.maxBubbleSize;
        if (!g) {
            var q = n.gridArea;
            g = Math.min(q.width, q.height) * .25
        }
        var f = o.maxBubbleScale;
        if (!f) f = this.maxSize;
        for (var i = this.data.length, j, k, e, c, b, a = 0; a < i; a++) {
            var d = this.data[a];
            if (d == null) continue;
            c = d[0];
            b = d[1];
            e = d[2];
            if (c == null || b == null || e == null) continue;
            var t = e / f,
                p = Math.max(t * g, 0);
            j = this.realXAxis.getPosition(c);
            k = this.realYAxis.getPosition(b);
            if (this.markers && this.markers.isVisible()) {
                var s = {
                        chart: this.chart,
                        series: this,
                        dataItem: this.data[a],
                        index: a,
                        x: c,
                        y: b,
                        size: e
                    },
                    h = this._getMarker(j, k, p / 2);
                h.context = s;
                l.push(h);
                this._addShapeAnimation(h, a, i)
            }
            if (this.labels && this.labels.visible !== false) {
                var r = this._getLabelValue(b, a),
                    m = this._getDataPointLabel(b, j, k, p / 2, r);
                l.push(m);
                this._addShapeAnimation(m, a, i)
            }
        }
    };
    X.prototype._getPixelMargins = function() {
        var a = this.chart.gridArea;
        if (a.width == null) return {
            left: 0,
            right: 0
        };
        var c = Math.min(a.width, a.height) * .35,
            b = c / 2;
        return {
            left: b + 4,
            right: b + 4
        }
    };
    X.prototype._getTooltip = function(b) {
        var a = "y: <b>" + b.y.toString() + "</b></br>size: <b>" + b.size.toString() + "</b>";
        if (this.title) {
            var d = c.getColorFromFillStyle(this.fillStyle);
            a = '<div style="color:' + d + '">' + this.title + "</div>" + a
        }
        return a
    };

    function A(a) {
        e.call(this, a)
    }
    A.prototype = new e;
    A.constructor = A;
    A.prototype._render = function(a) {
        if (!this.data) return;
        switch (this.xAxisType) {
            case "LinearAxis":
            case "DateTimeAxis":
                this._renderLinearData(a);
                break;
            case "CategoryAxis":
                this._renderCatData(a)
        }
    };
    A.prototype._renderCatData = function(p) {
        var k = this.chart.gridArea,
            B = k.y,
            A = k.y + k.height,
            d = this.realYAxis.getCrossingPosition();
        d = b.fitInRange(d, B, A);
        d = Math.round(d);
        var q = this.chart.series._findClusters(this, this.type),
            l = this._getDataLengthSum(),
            x = k.width / this.realXAxis.getZoom(),
            u = x / l,
            z = u / q.count,
            j = Math.round(this.pointWidth * z),
            w = q.count * j,
            o = (u - w) / 2;
        o = Math.round(o + q.index * j);
        for (var t = [], r = [], y = this.markers && this.markers.isVisible() ? this.markers.size / 2 : 0, f, g, c = 0; c < l; c++) {
            var m = this.data[c];
            if (m == null) continue;
            f = c;
            var e;
            if (a.isArray(m) == false) e = m;
            else e = m[1];
            if (e == null) continue;
            f = Math.round(this.realXAxis.getPosition(f) + o);
            g = Math.round(this.realYAxis.getPosition(e));
            var v = g,
                n;
            if (g <= d) n = d - g;
            else {
                n = g - d;
                g = d
            }
            var s = {
                    chart: this.chart,
                    series: this,
                    dataItem: this.data[c],
                    index: c,
                    x: this.realXAxis._getValue(c),
                    y: e
                },
                h = new i(f, g, j, n);
            h.context = s;
            h.center = {
                x: Math.round(f + j / 2),
                y: Math.round(v)
            };
            this._setShapeSettings(h, c);
            p.push(h);
            this._addAnimation(h, c, l);
            if (this.realYAxis.isValueVisible(e) === false) continue;
            f += j / 2;
            this._addMarkerAndLabel(t, r, f, v, c, l, null, e, y, s)
        }
        a.merge(p, t);
        a.merge(p, r)
    };
    A.prototype._renderLinearData = function(n) {
        var j = this.chart.gridArea,
            z = j.y,
            x = j.y + j.height,
            c = this.realYAxis.getCrossingPosition();
        c = b.fitInRange(c, z, x);
        c = Math.round(c);
        for (var k = this._getDataLengthSum(), u = j.width / this.realXAxis.getZoom(), y = this._getScaleDiff(), w = y * u / k, o = this.pointWidth * w, r = [], p = [], v = this.markers && this.markers.isVisible() ? this.markers.size / 2 : 0, e, f, d = 0; d < k; d++) {
            var l = this.data[d];
            if (l == null || a.isArray(l) == false) continue;
            e = l[0];
            var h = l[1];
            if (e == null || h == null) continue;
            var q = {
                chart: this.chart,
                series: this,
                dataItem: this.data[d],
                index: d,
                x: e,
                y: h
            };
            e = this.realXAxis.getPosition(e);
            f = Math.round(this.realYAxis.getPosition(h));
            var t = f,
                m;
            if (f <= c) m = c - f;
            else {
                m = f - c;
                f = c
            }
            var s = e - o / 2,
                g = new i(s, f, o, m);
            g.context = q;
            g.center = {
                x: Math.round(s + o / 2),
                y: Math.round(t)
            };
            this._setShapeSettings(g, d);
            n.push(g);
            this._addAnimation(g, d, k);
            if (this.realYAxis.isValueVisible(h) === false) continue;
            this._addMarkerAndLabel(r, p, e, t, d, k, null, h, v, q)
        }
        a.merge(n, r);
        a.merge(n, p)
    };
    A.prototype._addAnimation = function(d, g, f) {
        var b = this._getAnimation();
        if (!b || b.enabled === false) return;
        var a = new gb(b, d, "yDecrease", d.height, 0),
            c = a.duration / f,
            e = a.delayTime + g * c;
        a.delayTime = e;
        a.duration = c;
        this.chart.storyboard.addAnimation(a)
    };
    A.prototype._getPixelMargins = function(a) {
        if (a.isVertical()) {
            var b = e.prototype._getPixelMargins.call(this, a),
                c = a.length / 10,
                i = Math.max(c, b.left),
                h = Math.max(c, b.right);
            return {
                left: i,
                right: h
            }
        }
        if (this.data == null) return {
            left: 0,
            right: 0
        };
        var g = 4,
            j = this._getDataLengthSum(),
            f = a.length,
            d = .5 * f / j + g;
        return {
            left: d,
            right: d
        }
    };
    A.prototype._isAnchoredToOrigin = function() {
        return true
    };
    A.prototype._initColors = function(a) {
        this.fillStyle = this.fillStyle || a
    };

    function x(a) {
        e.call(this, a)
    }
    x.prototype = new e;
    x.constructor = x;
    x.prototype._initXAxis = function() {};
    x.prototype._initYAxis = function() {};
    x.prototype._initVisibleData = function() {};
    x.prototype._getYValues = function() {
        for (var e = [], f = this.data.length, d = 0; d < f; d++) {
            var b = this.data[d];
            if (b == null) continue;
            var c;
            if (a.isArray(b) == false) c = b;
            else c = b[1];
            e.push(Math.abs(c))
        }
        return e
    };
    x.prototype._render = function(s) {
        if (!this.data) return;
        var k = this.chart.gridArea,
            o = k.width,
            n = k.height,
            j = this._getYValues(),
            v = b.sum(j),
            l = j.length,
            r = 10,
            h;
        if (o < n) h = o / 2 - r;
        else h = n / 2 - r;
        if (h < 0) return;
        for (var w = k.x + o / 2, x = k.y + n / 2, u = Math.PI * 2 / v, f = -Math.PI / 2, m = this.fillStyles, c = 0; c < l; c++) {
            var e = j[c],
                i = f + e * u,
                g = new mb(w, x, h, f, i);
            this._setShapeSettings(g);
            if (m) g.fillStyle = m[c % m.length];
            else g.fillStyle = this.palette.getColor(c);
            var y = {
                chart: this.chart,
                series: this,
                dataItem: this.data[c],
                index: c,
                value: e
            };
            g.context = y;
            s.push(g);
            this._addSliceAnimation(g, c, l);
            f = i
        }
        if (!this.labels || this.labels.visible === false) return;
        for (var f = -Math.PI / 2, c = 0; c < l; c++) {
            var e = j[c],
                i = f + e * u;
            switch (this.labels.valueType) {
                case "percentage":
                    e = 100 * e / v
            }
            if (e == 0) continue;
            var z = this._getLabelText(e),
                d = new q(z);
            d.textBaseline = "top";
            a.extend(d, this.labels);
            var t = d.measure(this.chart.ctx),
                p = this._getSliceCenter(w, x, (f + i) / 2, h * .6);
            d.x = p.x - t.width / 2;
            d.y = p.y - t.height / 2;
            d.context = {
                chart: this.chart,
                series: this,
                dataItem: this.data[c],
                index: c,
                value: e
            };
            this.chart.elem.trigger("dataPointLabelCreating", d);
            s.push(d);
            this._addShapeAnimation(d, c, l);
            f = i
        }
    };
    x.prototype._getSliceCenter = function(c, d, b, a) {
        return {
            x: c + a * Math.cos(b),
            y: d + a * Math.sin(b)
        }
    };
    x.prototype._getLegendItems = function(d) {
        var e = [];
        if (!this.data) return e;
        for (var j = this._getYValues(), f, l = this.data.length, b = 0; b < l; b++) {
            var c = this.data[b];
            if (c == null) continue;
            var m;
            if (a.isArray(c) == false) {
                var k = b + 1;
                f = k.toString()
            } else f = c[0];
            var h = new R;
            h.fillStyle = this.palette.getColor(b);
            var i = {
                chart: this.chart,
                series: this,
                dataItem: c,
                index: b,
                value: j[b]
            };
            d = a.extend(false, {}, d, {
                context: i,
                text: f,
                marker: h
            });
            var g = new eb(d);
            g.chart = this.chart;
            g.series = this;
            e.push(g)
        }
        return e
    };
    x.prototype._initColors = function(b, a) {
        this.palette = a
    };
    x.prototype._getTooltip = function(b) {
        var a = this.getPercentage(b.value);
        a = this.chart.stringFormat(a, "%.2f%%");
        var c = "<b>" + b.value + " (" + a + ")</b><br/>",
            d = b.dataItem[0];
        if (d) c = d + "</br>" + c;
        return c
    };
    x.prototype._addSliceAnimation = function(c, g, f) {
        var b = this._getAnimation();
        if (!b || b.enabled === false) return;
        var a = new gb(b, c, "endAngle", c.startAngle, c.endAngle),
            d = a.duration / f,
            e = a.delayTime + g * d;
        a.delayTime = e;
        a.duration = d;
        this.chart.storyboard.addAnimation(a)
    };
    x.prototype.getTotal = function() {
        var a = this._getYValues(),
            c = b.sum(a);
        return c
    };
    x.prototype.getPercentage = function(b) {
        var a = this.getTotal();
        return 100 * b / a
    };

    function yb(b) {
        var c = a.extend(true, {}, this.defaults, {
            markers: {
                type: "diamond"
            }
        });
        this.defaults = c;
        e.call(this, b)
    }
    yb.prototype = new J;
    yb.constructor = yb;
    yb.prototype._createShape = function() {
        return null
    };

    function zb(a) {
        J.call(this, a)
    }
    zb.prototype = new J;
    zb.constructor = zb;
    zb.prototype._createShape = function(c, b) {
        var a = new u(c);
        this._setShapeSettings(a);
        b.push(a);
        this._addLengthAnimation(a);
        return a
    };

    function U(b) {
        var c = a.extend(true, {}, this.defaults, {
            stackedGroupName: ""
        });
        this.defaults = c;
        A.call(this, b)
    }
    U.prototype = new A;
    U.constructor = U;
    U.prototype._initData = function() {
        this._initStackedData("stackedcolumn")
    };
    U.prototype._initVisibleData = function() {
        this._initVisibleStackedData("stackedcolumn")
    };
    U.prototype._render = function(u) {
        if (!this.data) return;
        var q = this.chart.gridArea,
            K = q.y,
            J = q.y + q.height,
            h = this.realYAxis.getCrossingPosition();
        h = b.fitInRange(h, K, J);
        h = Math.round(h);
        var c = this.chart.series._findStackedClusters(this, "stackedcolumn"),
            C = this.data.length,
            F = q.width / this.realXAxis.getZoom(),
            A = F / C,
            I = A / c.groupCount,
            m = Math.round(this.pointWidth * I),
            E = c.groupCount * m,
            t = (A - E) / 2;
        t = Math.round(t + c.groupIndex * m);
        for (var z = [], y = [], w = this.chart.series._getStackedSeriesFromType("stackedcolumn", this.stackedGroupName), G = this.markers && this.markers.isVisible() ? this.markers.size / 2 : 0, e, f, g, d = 0; d < C; d++) {
            var g = this.dataValues[d];
            if (g == null) continue;
            var l = g.value;
            e = d;
            e = Math.round(this.realXAxis.getPosition(e) + t);
            f = Math.round(this.realYAxis.getPosition(l));
            var o = this._getPrevStackedPosition(w, c.index, d, h, this.realYAxis, l >= 0),
                v = f,
                p;
            if (f <= o) p = o - f;
            else {
                p = f - o;
                f = o
            }
            var r = {
                    chart: this.chart,
                    series: this,
                    dataItem: this.data[d],
                    index: d,
                    value: g.actualValue,
                    x: this.realXAxis._getValue(d),
                    y: l
                },
                k = new i(e, f, m, p);
            k.context = r;
            k.center = {
                x: Math.round(e + m / 2),
                y: Math.round(v)
            };
            this._setShapeSettings(k, d);
            u.push(k);
            this._addAnimation(k, c.index, c.count);
            e += m / 2;
            if (this.markers && this.realYAxis.isValueVisible(l)) {
                var s = this._getMarker(e, v, null, l);
                s.context = r;
                z.push(s);
                this._addShapeAnimation(s, c.index, c.count)
            }
            if (this.labels && this.labels.visible !== false && g.actualValue != 0) {
                var n = g.actualValue;
                switch (this.labels.valueType) {
                    case "percentage":
                        var B = this._getStackedTotal(w, d),
                            D = n > 0 ? B.positive : B.negative;
                        n = D != 0 ? 100 * Math.abs(n) / Math.abs(D) : 0
                }
                var x = this.labels.position == "outside",
                    H = x ? G : -p / 2,
                    j = this._getDataPointLabel(g.actualValue, e, v, H, n);
                if (!x) j.textBaseline = "middle";
                j.context = r;
                this.chart.elem.trigger("dataPointLabelCreating", j);
                y.push(j);
                this._addShapeAnimation(j, c.index, c.count)
            }
        }
        a.merge(u, z);
        a.merge(u, y)
    };
    U.prototype._getTooltip = function(b) {
        var a = "<b>" + b.value + "</b><br/>";
        if (this.title) {
            var d = c.getColorFromFillStyle(this.fillStyle);
            a = '<span style="color:' + d + '">' + this.title + "</span>: " + a
        }
        return a
    };

    function V(b) {
        var c = a.extend(true, {}, this.defaults, {
            stackedGroupName: ""
        });
        this.defaults = c;
        o.call(this, b)
    }
    V.prototype = new o;
    V.constructor = V;
    V.prototype._initData = function() {
        this._initStackedData("stackedbar")
    };
    V.prototype._initVisibleData = function() {
        this._initVisibleStackedData("stackedbar")
    };
    V.prototype._render = function(t) {
        if (!this.data) return;
        var u = this.chart.gridArea,
            C = u.x,
            J = C + u.width,
            k = this.realYAxis.getCrossingPosition();
        k = b.fitInRange(k, C, J);
        k = Math.round(k);
        var c = this.chart.series._findStackedClusters(this, "stackedbar"),
            D = this.data.length,
            G = u.height / this.realXAxis.getZoom(),
            A = G / D,
            K = A / c.groupCount,
            h = Math.round(this.pointWidth * K),
            F = c.groupCount * h,
            s = (A - F) / 2;
        s = Math.round(s + c.groupIndex * h);
        for (var z = [], y = [], w = this.chart.series._getStackedSeriesFromType("stackedbar", this.stackedGroupName), H = this.markers && this.markers.isVisible() ? this.markers.size / 2 + 2 : 2, e, j, g, d = 0; d < D; d++) {
            var g = this.dataValues[d];
            if (g == null) continue;
            var m = g.value;
            e = d;
            j = Math.round(this.realXAxis.getPosition(e) - s - h);
            e = Math.round(this.realYAxis.getPosition(m));
            var o = this._getPrevStackedPosition(w, c.index, d, k, this.realYAxis, m >= 0),
                v = e,
                p;
            if (e <= o) p = o - e;
            else {
                p = e - o;
                e = o
            }
            var q = {
                    chart: this.chart,
                    series: this,
                    dataItem: this.data[d],
                    index: d,
                    value: g.actualValue,
                    x: this.realXAxis._getValue(d),
                    y: m
                },
                l = new i(e, j, p, h);
            l.context = q;
            l.center = {
                x: Math.round(v),
                y: Math.round(j + h / 2)
            };
            this._setShapeSettings(l, d);
            t.push(l);
            this._addAnimation(l, c.index, c.count);
            j += h / 2;
            if (this.markers && this.realYAxis.isValueVisible(m)) {
                var r = this._getMarker(v, j, null, m);
                r.context = q;
                z.push(r);
                this._addShapeAnimation(r, c.index, c.count)
            }
            if (this.labels && this.labels.visible !== false && g.actualValue != 0) {
                var n = g.actualValue;
                switch (this.labels.valueType) {
                    case "percentage":
                        var B = this._getStackedTotal(w, d),
                            E = n > 0 ? B.positive : B.negative;
                        n = E != 0 ? 100 * Math.abs(n) / Math.abs(E) : 0
                }
                var x = this.labels.position == "outside",
                    I = x ? H : -p / 2,
                    f = this._getDataPointLabel(g.actualValue, v, j, I, n);
                if (!x) {
                    f.textBaseline = "middle";
                    f.textAlign = "center"
                }
                f.context = q;
                this.chart.elem.trigger("dataPointLabelCreating", f);
                y.push(f);
                this._addShapeAnimation(f, c.index, c.count)
            }
        }
        a.merge(t, z);
        a.merge(t, y)
    };
    V.prototype._getTooltip = function(b) {
        var a = "<b>" + b.value + "</b><br/>";
        if (this.title) {
            var d = c.getColorFromFillStyle(this.fillStyle);
            a = '<span style="color:' + d + '">' + this.title + "</span>: " + a
        }
        return a
    };

    function G(a) {
        A.call(this, a)
    }
    G.prototype = new A;
    G.constructor = G;
    G.prototype._initXYData = function() {
        this._initXYDataRange(1, 3)
    };
    G.prototype._initCatValueData = function() {
        this._initCatValueDataRange(1, 3)
    };
    G.prototype._initDateValueData = function() {
        this._initDateValueDataRange(1, 3)
    };
    G.prototype._initVisibleCatValueData = function() {
        this._initVisibleCatValueDataRange(1, 3)
    };
    G.prototype._initVisibleXYData = function() {
        this._initVisibleXYDataRange(1, 3)
    };
    G.prototype._renderCatData = function(u) {
        var v = this.chart.gridArea,
            b = this.chart.series._findClusters(this, this.type),
            g = this._getDataLengthSum();
        b.count = 1;
        b.index = 0;
        var q = v.width / this.realXAxis.getZoom(),
            m = q / g,
            r = m / b.count,
            l = Math.round(this.pointWidth * r),
            p = b.count * l,
            d = (m - p) / 2;
        d = Math.round(d + b.index * l);
        for (var o, j, k, n, e, f, a = 0; a < g; a++) {
            var h = this.data[a];
            if (h == null) continue;
            n = a;
            e = h[1];
            f = h[2];
            o = Math.round(this.realXAxis.getPosition(n) + d);
            j = Math.round(this.realYAxis.getPosition(e));
            k = Math.round(this.realYAxis.getPosition(f));
            var s = {
                    chart: this.chart,
                    series: this,
                    dataItem: this.data[a],
                    index: a,
                    x: this.realXAxis._getValue(a),
                    from: e,
                    to: f
                },
                w = Math.min(j, k),
                t = Math.abs(j - k),
                c = new i(o, w, l, t);
            c.context = s;
            this._setShapeSettings(c, a);
            u.push(c);
            this._addAnimation(c, a, g)
        }
    };
    G.prototype._renderLinearData = function(r) {
        for (var s = this.chart.gridArea, k = this._getDataLengthSum(), n = s.width / this.realXAxis.getZoom(), o = n / k, l = this.pointWidth * o, m, h, j, g, e, f, b = 0; b < k; b++) {
            var c = this.data[b];
            if (c == null || a.isArray(c) == false) continue;
            g = c[0];
            e = c[1];
            f = c[2];
            var p = {
                chart: this.chart,
                series: this,
                dataItem: this.data[b],
                index: b,
                x: g,
                from: e,
                to: f
            };
            m = this.realXAxis.getPosition(g);
            h = Math.round(this.realYAxis.getPosition(e));
            j = Math.round(this.realYAxis.getPosition(f));
            var t = m - l / 2,
                u = Math.min(h, j),
                q = Math.abs(h - j),
                d = new i(t, u, l, q);
            d.context = p;
            this._setShapeSettings(d, b);
            r.push(d)
        }
    };
    G.prototype._setShapeSettings = function(a) {
        e.prototype._setShapeSettings.call(this, a);
        if (a.context.from <= a.context.to) {
            if (this.priceUpStrokeStyle) a.strokeStyle = this.priceUpStrokeStyle;
            if (this.priceUpFillStyle) a.fillStyle = this.priceUpFillStyle
        } else {
            if (this.priceDownStrokeStyle) a.strokeStyle = this.priceDownStrokeStyle;
            if (this.priceDownFillStyle) a.fillStyle = this.priceDownFillStyle
        }
    };
    G.prototype._getTooltip = function(b) {
        var a = "From: <b>" + b.from.toString() + "</b></br>To: <b>" + b.to.toString() + "</b>";
        if (this.title) {
            var d = c.getColorFromFillStyle(this.fillStyle);
            a = '<div style="color:' + d + '">' + this.title + "</div>" + a
        }
        return a
    };

    function H(a) {
        o.call(this, a)
    }
    H.prototype = new o;
    H.constructor = H;
    H.prototype._initXYData = function() {
        this._initXYDataRange(1, 3)
    };
    H.prototype._initCatValueData = function() {
        this._initCatValueDataRange(1, 3)
    };
    H.prototype._initDateValueData = function() {
        this._initDateValueDataRange(1, 3)
    };
    H.prototype._initVisibleCatValueData = function() {
        this._initVisibleCatValueDataRange(1, 3)
    };
    H.prototype._initVisibleXYData = function() {
        this._initVisibleXYDataRange(1, 3)
    };
    H.prototype._renderCatData = function(s) {
        var t = this.chart.gridArea,
            b = this.chart.series._findClusters(this, this.type),
            h = this._getDataLengthSum();
        b.count = 1;
        b.index = 0;
        var q = t.height / this.realXAxis.getZoom(),
            m = q / h,
            v = m / b.count,
            d = Math.round(this.pointWidth * v),
            p = b.count * d,
            e = (m - p) / 2;
        e = Math.round(e + b.index * d);
        for (var k, l, o, n, f, g, a = 0; a < h; a++) {
            var j = this.data[a];
            if (j == null) continue;
            n = a;
            f = j[1];
            g = j[2];
            o = Math.round(this.realXAxis.getPosition(n) - e - d);
            k = Math.round(this.realYAxis.getPosition(f));
            l = Math.round(this.realYAxis.getPosition(g));
            var r = {
                    chart: this.chart,
                    series: this,
                    dataItem: this.data[a],
                    index: a,
                    x: this.realXAxis._getValue(a),
                    from: f,
                    to: g
                },
                w = Math.min(k, l),
                u = Math.abs(k - l),
                c = new i(w, o, u, d);
            c.context = r;
            this._setShapeSettings(c, a);
            s.push(c);
            this._addAnimation(c, a, h)
        }
    };
    H.prototype._renderLinearData = function(q) {
        for (var r = this.chart.gridArea, g = this._getDataLengthSum(), n = r.height / this.realXAxis.getZoom(), p = n / g, l = this.pointWidth * p, j, k, m, h, e, f, b = 0; b < g; b++) {
            var c = this.data[b];
            if (c == null || a.isArray(c) == false) continue;
            h = c[0];
            e = c[1];
            f = c[2];
            var o = {
                chart: this.chart,
                series: this,
                dataItem: this.data[b],
                index: b,
                x: h,
                from: e,
                to: f
            };
            m = this.realXAxis.getPosition(h);
            j = Math.round(this.realYAxis.getPosition(e));
            k = Math.round(this.realYAxis.getPosition(f));
            var t = m - l / 2,
                u = Math.min(j, k),
                s = Math.abs(j - k),
                d = new i(u, t, s, l);
            d.context = o;
            this._setShapeSettings(d, b);
            q.push(d);
            this._addAnimation(d, b, g)
        }
    };
    H.prototype._setShapeSettings = function(a) {
        e.prototype._setShapeSettings.call(this, a);
        if (a.context.from <= a.context.to) {
            if (this.priceUpStrokeStyle) a.strokeStyle = this.priceUpStrokeStyle;
            if (this.priceUpFillStyle) a.fillStyle = this.priceUpFillStyle
        } else {
            if (this.priceDownStrokeStyle) a.strokeStyle = this.priceDownStrokeStyle;
            if (this.priceDownFillStyle) a.fillStyle = this.priceDownFillStyle
        }
    };
    H.prototype._getTooltip = function(b) {
        var a = "From: <b>" + b.from.toString() + "</b></br>To: <b>" + b.to.toString() + "</b>";
        if (this.title) {
            var d = c.getColorFromFillStyle(this.fillStyle);
            a = '<div style="color:' + d + '">' + this.title + "</div>" + a
        }
        return a
    };

    function B(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 2
        });
        this.defaults = c;
        e.call(this, b)
    }
    B.prototype = new e;
    B.constructor = B;
    B.prototype._initXYData = function() {
        this._initXYDataRange(1, 5)
    };
    B.prototype._initCatValueData = function() {
        this._initCatValueDataRange(1, 5)
    };
    B.prototype._initDateValueData = function() {
        this._initDateValueDataRange(1, 5)
    };
    B.prototype._initVisibleCatValueData = function() {
        this._initVisibleCatValueDataRange(1, 5)
    };
    B.prototype._initVisibleXYData = function() {
        this._initVisibleXYDataRange(1, 5)
    };
    B.prototype._render = function(o) {
        if (!this.data) return;
        var p = this.chart.gridArea,
            i = this.data.length,
            d, f, h, g, e, m = i,
            l = p.width / this.realXAxis.getZoom(),
            q = this._getScaleDiff();
        width = q * this.pointWidth * l / m;
        for (var c = 0; c < i; c++) {
            var b = this.data[c];
            if (b == null || a.isArray(b) == false) continue;
            var k = c;
            switch (this.xAxisType) {
                case "LinearAxis":
                case "DateTimeAxis":
                    d = b[0];
                    k = d;
                    break;
                case "CategoryAxis":
                    d = c + .5
            }
            f = b[1];
            h = b[2];
            g = b[3];
            e = b[4];
            var n = {
                chart: this.chart,
                series: this,
                dataItem: b,
                index: c,
                x: this.realXAxis._getValue(k),
                high: f,
                low: h,
                open: g,
                close: e
            };
            d = this.realXAxis.getPosition(d);
            f = this.realYAxis.getPosition(f);
            h = this.realYAxis.getPosition(h);
            g = this.realYAxis.getPosition(g);
            e = this.realYAxis.getPosition(e);
            var j = this._createShape(d, f, h, g, e, width);
            j.context = n;
            this._addShapeAnimation(j, c, i);
            o.push(j)
        }
    };
    B.prototype._setShapeSettings = function(a) {
        e.prototype._setShapeSettings.call(this, a);
        a.priceDownStrokeStyle = this.priceDownStrokeStyle;
        a.priceUpStrokeStyle = this.priceUpStrokeStyle
    };
    B.prototype._createShape = function(g, d, f, e, b, c) {
        var a = new K(g, d, f, e, b, c);
        this._setShapeSettings(a);
        return a
    };
    B.prototype._getPixelMargins = function(a) {
        if (a.isVertical()) return e.prototype._getPixelMargins.call(this, a);
        if (this.data == null) return {
            left: 0,
            right: 0
        };
        var d = 4,
            f = this.data.length,
            c = a.length,
            b = .5 * c / f + d;
        return {
            left: b,
            right: b
        }
    };
    B.prototype._getTooltip = function(a) {
        var b = "Open: <b>" + a.open.toString() + "</b></br>High: <b>" + a.high.toString() + "</b></br>Low: <b>" + a.low.toString() + "</b></br>Close: <b>" + a.close.toString() + "</b>";
        if (this.title) {
            var d = c.getColorFromFillStyle(this.fillStyle);
            b = '<div style="color:' + d + '">' + this.title + "</div>" + b
        }
        return b
    };

    function jb(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 1
        });
        this.defaults = c;
        e.call(this, b)
    }
    jb.prototype = new B;
    jb.constructor = jb;
    jb.prototype._setShapeSettings = function(a) {
        a.priceDownFillStyle = this.priceDownFillStyle || this.fillStyle;
        a.priceUpFillStyle = this.priceUpFillStyle;
        a.strokeStyle = this.strokeStyle;
        a.lineWidth = this.lineWidth;
        a.lineCap = this.lineCap;
        a.lineJoin = this.lineJoin;
        a.miterLimit = this.miterLimit;
        g.setShadows(a, this, this.chart);
        a.cursor = this.cursor
    };
    jb.prototype._createShape = function(g, d, f, e, b, c) {
        var a = new cb(g, d, f, e, b, c);
        this._setShapeSettings(a);
        return a
    };

    function z(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 2,
            markers: {}
        });
        this.defaults = c;
        e.call(this, b);
        this.notInGridArea = true
    }
    z.prototype = new e;
    z.constructor = z;
    z.prototype._resolveAxisType = function() {};
    z.prototype._createXAxis = function() {
        var a = new F;
        a.chart = this.chart;
        return a
    };
    z.prototype._createYAxis = function() {
        var a = new r;
        a.chart = this.chart;
        return a
    };
    z.prototype._findXAxis = function(b) {
        var a = this._findAxis(b, this.axisX);
        if (a != null) return a;
        for (var c = 0; c < b.length; c++) {
            a = b[c];
            if (a instanceof F) return a
        }
        return null
    };
    z.prototype._findYAxis = function(b) {
        var a = this._findAxis(b, this.axisY);
        if (a != null) return a;
        for (var c = 0; c < b.length; c++) {
            a = b[c];
            if (a instanceof r) return a
        }
        return null
    };
    z.prototype._render = function(l) {
        if (!this.data) return;
        for (var x = this.data.length, i = this.markers != null && this.markers.isVisible(), s = this.labels != null && this.labels.visible !== false, e = [], j = [], n = [], m = [], t = i ? this.markers.size / 2 : 0, g, h, d, y = this.realYAxis.cx, p = this.realYAxis.cy, c = 0; c < x; c++) {
            var f = this.data[c];
            if (f === null) {
                e.push(null);
                e.push(null);
                !i && j.push(null);
                continue
            }
            if (a.isArray(f) == false) d = f;
            else {
                d = f[1];
                if (d === null) {
                    e.push(null);
                    e.push(null);
                    !i && j.push(null);
                    continue
                }
            }
            var w = this.realXAxis._getAngle(c);
            g = this.realYAxis.getPosition(d);
            h = p;
            var q = b.rotatePointAt(g, h, w, y, p);
            g = q.x;
            h = q.y;
            e.push(g);
            e.push(h);
            if (i) {
                var u = {
                        chart: this.chart,
                        series: this,
                        dataItem: f,
                        index: c,
                        x: this.realXAxis._getValue(c),
                        y: d
                    },
                    o = this._getMarker(g, h);
                o.context = u;
                n.push(o)
            } else j.push({
                dataItem: f,
                index: c,
                x: this.realXAxis._getValue(c),
                y: d
            });
            if (s) {
                var r = this._getLabelValue(d, c),
                    v = this._getDataPointLabel(d, g, h, t, r);
                m.push(v)
            }
        }
        var k = this._createShape(e);
        if (k) {
            l.push(k);
            if (!i) k.context = {
                chart: this.chart,
                series: this,
                points: j
            }
        }
        a.merge(l, n);
        a.merge(l, m)
    };
    z.prototype._createShape = function(b) {
        var a = new M(b);
        this._setShapeSettings(a);
        a.fillStyle = null;
        return a
    };
    z.prototype._getPixelMargins = function() {
        return {
            left: 0,
            right: 0
        }
    };

    function xb(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 0,
            markers: null
        });
        this.defaults = c;
        e.call(this, b)
    }
    xb.prototype = new z;
    xb.constructor = xb;
    xb.prototype._createShape = function(b) {
        var a = new M(b);
        this._setShapeSettings(a);
        return a
    };

    function ob(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 0,
            markers: null
        });
        this.defaults = c;
        e.call(this, b)
    }
    ob.prototype = new z;
    ob.constructor = ob;
    ob.prototype._createShape = function(b) {
        var a = new u(b, true);
        this._setShapeSettings(a);
        return a
    };

    function sb(a) {
        e.call(this, a)
    }
    sb.prototype = new z;
    sb.constructor = sb;
    sb.prototype._createShape = function(b) {
        var a = new u(b, true);
        this._setShapeSettings(a);
        a.fillStyle = null;
        return a
    };

    function w(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 2,
            markers: {}
        });
        this.defaults = c;
        e.call(this, b);
        this.notInGridArea = true
    }
    w.prototype = new e;
    w.constructor = w;
    w.prototype._resolveAxisType = function() {};
    w.prototype._createXAxis = function() {
        var a = new D;
        a.chart = this.chart;
        return a
    };
    w.prototype._createYAxis = function() {
        var a = new r;
        a.chart = this.chart;
        return a
    };
    w.prototype._findXAxis = function(b) {
        var a = this._findAxis(b, this.axisX);
        if (a != null) return a;
        for (var c = 0; c < b.length; c++) {
            a = b[c];
            if (a instanceof D) return a
        }
        return null
    };
    w.prototype._findYAxis = function(b) {
        var a = this._findAxis(b, this.axisY);
        if (a != null) return a;
        for (var c = 0; c < b.length; c++) {
            a = b[c];
            if (a instanceof r) return a
        }
        return null
    };
    w.prototype._render = function(m) {
        if (!this.data) return;
        for (var y = this.data.length, h = this.markers != null && this.markers.isVisible(), t = this.labels != null && this.labels.visible !== false, c = [], j = [], o = [], n = [], u = h ? this.markers.size / 2 : 0, f, g, i, d, z = this.realYAxis.cx, q = this.realYAxis.cy, e = 0; e < y; e++) {
            var k = this.data[e];
            if (k === null) {
                c.push(null);
                c.push(null);
                !h && j.push(null);
                continue
            }
            i = k[0];
            d = k[1];
            if (i === null || d === null) {
                c.push(null);
                c.push(null);
                !h && j.push(null);
                continue
            }
            var x = this.realXAxis._getAngle(i);
            f = this.realYAxis.getPosition(d);
            g = q;
            var r = b.rotatePointAt(f, g, x, z, q);
            f = r.x;
            g = r.y;
            c.push(f);
            c.push(g);
            if (h) {
                var v = {
                        chart: this.chart,
                        series: this,
                        dataItem: this.data[e],
                        index: e,
                        x: i,
                        y: d
                    },
                    p = this._getMarker(f, g);
                p.context = v;
                o.push(p)
            } else j.push({
                dataItem: k,
                index: e,
                x: i,
                y: d
            });
            if (t) {
                var s = this._getLabelValue(d, e),
                    w = this._getDataPointLabel(d, f, g, u, s);
                n.push(w)
            }
        }
        var l = this._createShape(c);
        if (l) {
            m.push(l);
            if (!h) l.context = {
                chart: this.chart,
                series: this,
                points: j
            }
        }
        a.merge(m, o);
        a.merge(m, n)
    };
    w.prototype._createShape = function(b) {
        var a = new M(b);
        this._setShapeSettings(a);
        a.fillStyle = null;
        return a
    };
    w.prototype._getPixelMargins = function() {
        return {
            left: 0,
            right: 0
        }
    };

    function wb(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 0,
            markers: null
        });
        this.defaults = c;
        e.call(this, b)
    }
    wb.prototype = new w;
    wb.constructor = wb;
    wb.prototype._createShape = function(b) {
        var a = new M(b);
        this._setShapeSettings(a);
        return a
    };

    function rb(a) {
        e.call(this, a)
    }
    rb.prototype = new w;
    rb.constructor = rb;
    rb.prototype._createShape = function(b) {
        var a = new u(b, true);
        this._setShapeSettings(a);
        a.fillStyle = null;
        return a
    };

    function nb(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 0,
            markers: null
        });
        this.defaults = c;
        e.call(this, b)
    }
    nb.prototype = new w;
    nb.constructor = nb;
    nb.prototype._createShape = function(b) {
        var a = new u(b, true);
        this._setShapeSettings(a);
        return a
    };

    function qb(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 0,
            markers: {
                type: "diamond"
            }
        });
        this.defaults = c;
        e.call(this, b)
    }
    qb.prototype = new w;
    qb.constructor = qb;
    qb.prototype._createShape = function() {
        return null
    };

    function P(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 2,
            trendlineType: "linear",
            markers: {}
        });
        this.defaults = c;
        e.call(this, b)
    }
    P.prototype = new e;
    P.constructor = P;
    P.prototype._initData = function() {
        var l = this._getXAxisType();
        this.xAxisType = l;
        for (var k = this.tData = this._getTrendlineResult(), f = h, e = j, d = h, c = j, m = k.length, i = 0; i < m; i++) {
            var g = k[i];
            if (g == null) continue;
            var a = g[0];
            if (d > a) d = a;
            if (c < a) c = a;
            var b = g[1];
            if (f > b) f = b;
            if (e < b) e = b
        }
        this.min = f;
        this.max = e;
        this.minX = d;
        this.maxX = c
    };
    P.prototype._getTrendlineResult = function() {
        for (var j = this.data, k = j.length, d, f, i = [], c = [], h = [], b = 0; b < k; b++) {
            var e = j[b];
            if (e == null) continue;
            if (a.isArray(e) == false) {
                c.push(b + .5);
                h.push(e)
            } else {
                var g = e[0];
                switch (this.xAxisType) {
                    case "CategoryAxis":
                        g = b + .5;
                        break;
                    case "DateTimeAxis":
                        g = g.getTime()
                }
                c.push(g);
                h.push(e[1])
            }
        }
        switch (this.trendlineType) {
            case "exp":
            case "exponential":
                d = this._getExpRegression(c, h);
                for (var b = 0; b < c.length; b++) {
                    f = d[1] * Math.pow(d[0], c[b]);
                    i.push([c[b], f])
                }
                break;
            case "linear":
            default:
                d = this._getLinearRegression(c, h);
                for (var b = 0; b < c.length; b++) {
                    f = d[0] * c[b] + d[1];
                    i.push([c[b], f])
                }
        }
        return i
    };
    P.prototype._getRegression = function(m, g) {
        var h = this.trendlineType,
            e = this.data.length,
            b = 0,
            f = 0,
            i = 0,
            j = 0,
            l = 0,
            d = [],
            c = [];
        if (h == "linear") {
            c = m;
            d = g
        } else if (h == "exp" || h == "exponential")
            for (var a = 0; a < g.length; a++)
                if (g[a] <= 0) e--;
                else {
                    c.push(m[a]);
                    d.push(Math.log(g[a]))
                } for (var a = 0; a < e; a++) {
            b = b + c[a];
            f = f + d[a];
            j = j + c[a] * d[a];
            i = i + c[a] * c[a];
            l = l + d[a] * d[a]
        }
        var k = (e * j - b * f) / (e * i - b * b),
            n = (f - k * b) / e;
        return [k, n]
    };
    P.prototype._getLinearRegression = function(a, b) {
        return this._getRegression(a, b)
    };
    P.prototype._getExpRegression = function(d, e) {
        var a = this._getRegression(d, e),
            c = Math.exp(a[0]),
            b = Math.exp(a[1]);
        return [c, b]
    };
    P.prototype._render = function(k) {
        if (!this.data) return;
        var c = this.tData,
            b = [],
            g = 1;
        if (this.trendlineType == "linear") g = c.length - 1;
        for (var i, j, e, f, d = 0; d < c.length; d += g) {
            var h = c[d];
            e = h[0];
            f = h[1];
            i = this.realXAxis.getPosition(e);
            j = this.realYAxis.getPosition(f);
            b.push(i);
            b.push(j)
        }
        var a;
        switch (this.trendlineType) {
            case "exp":
            case "exponential":
                a = new u(b);
                break;
            case "linear":
            default:
                a = new C(b)
        }
        this._setShapeSettings(a);
        k.push(a);
        this._addLengthAnimation(a)
    };

    function I(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 2,
            markers: {}
        });
        this.defaults = c;
        e.call(this, b)
    }
    I.prototype = new o;
    I.constructor = I;
    I.prototype._render = function(b) {
        if (!this.data) return;
        var a = this._getXAxisType();
        this.xAxisType = a;
        switch (a) {
            case "LinearAxis":
            case "DateTimeAxis":
                this._renderXYData(b);
                return;
            case "CategoryAxis":
                this._renderCatValueData(b);
                return
        }
    };
    I.prototype._renderCatValueData = function(j) {
        for (var o = this.data.length, f = this.markers != null && this.markers.isVisible(), c = [], i = [], n = [], l = [], q = f ? this.markers.size / 2 : 0, h, k, p, d, e = 0; e < o; e++) {
            var g = this.data[e];
            if (g === null) {
                c.push(null);
                c.push(null);
                !f && i.push(null);
                continue
            }
            p = h = e + .5;
            if (a.isArray(g) == false) d = g;
            else {
                d = g[1];
                if (b.isNull(d)) {
                    c.push(null);
                    c.push(null);
                    !f && i.push(null);
                    continue
                }
            }
            k = this.realXAxis.getPosition(h);
            h = this.realYAxis.getPosition(d);
            c.push(h);
            c.push(k);
            !f && i.push({
                dataItem: g,
                index: e,
                x: p,
                y: d
            });
            if (this.realYAxis.isValueVisible(d) === false) continue;
            this._addMarkerAndLabel(n, l, h, k, e, o, null, d, q)
        }
        var m = this._createShape(c, j);
        if (!f && m) m.context = {
            chart: this.chart,
            series: this,
            points: i
        };
        else a.merge(j, n);
        a.merge(j, l)
    };
    I.prototype._renderXYData = function(j) {
        for (var p = this.data.length, e = this.markers != null && this.markers.isVisible(), r = this.labels != null && this.labels.visible !== false, c = [], h = [], o = [], m = [], q = e ? this.markers.size / 2 : 0, k, l, f, d, g = 0; g < p; g++) {
            var i = this.data[g];
            if (i === null) {
                c.push(null);
                c.push(null);
                !e && h.push(null);
                continue
            }
            f = i[0];
            d = i[1];
            if (b.isNull(f) || b.isNull(d)) {
                c.push(null);
                c.push(null);
                !e && h.push(null);
                continue
            }
            l = this.realXAxis.getPosition(f);
            k = this.realYAxis.getPosition(d);
            c.push(k);
            c.push(l);
            !e && h.push({
                dataItem: i,
                index: g,
                x: f,
                y: d
            });
            if (this.realYAxis.isValueVisible(d) === false) continue;
            this._addMarkerAndLabel(o, m, k, l, g, p, f, d, q)
        }
        var n = this._createShape(c, j);
        if (!e && n) n.context = {
            chart: this.chart,
            series: this,
            points: h
        };
        else a.merge(j, o);
        a.merge(j, m)
    };
    I.prototype._createShape = function(c, b) {
        var a = new C(c);
        this._setShapeSettings(a);
        b.push(a);
        this._addLengthAnimation(a);
        return a
    };
    I.prototype._initColors = function(a) {
        this.fillStyle = this.fillStyle || a;
        this.strokeStyle = this.strokeStyle || a
    };
    I.prototype._getPixelMargins = function(a) {
        return e.prototype._getPixelMargins(a)
    };

    function vb(a) {
        I.call(this, a)
    }
    vb.prototype = new I;
    vb.constructor = vb;
    vb.prototype._createShape = function(c, b) {
        var a = new u(c);
        this._setShapeSettings(a);
        b.push(a);
        this._addLengthAnimation(a);
        return a
    };

    function W(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 0,
            markers: null
        });
        this.defaults = c;
        e.call(this, b)
    }
    W.prototype = new I;
    W.constructor = W;
    W.prototype._createShape = function(i, h) {
        var g = [];
        a.merge(g, i);
        var c = new C(g);
        this._setShapeSettings(c);
        var f = this.chart.gridArea,
            k = f.x,
            j = f.x + f.width,
            e = this.realYAxis.getCrossingPosition();
        e = b.fitInRange(e, k, j);
        var d = new bb(i, e, true);
        this._setShapeSettings(d);
        d.lineWidth = 0;
        h.push(d);
        h.push(c);
        this._addLengthAnimation(d);
        this._addLengthAnimation(c);
        return c
    };
    W.prototype._isAnchoredToOrigin = function() {
        return true
    };

    function pb(a) {
        W.call(this, a)
    }
    pb.prototype = new W;
    pb.constructor = pb;
    pb.prototype._createShape = function(i, h) {
        var g = [];
        a.merge(g, i);
        var d = new u(g);
        this._setShapeSettings(d);
        var f = this.chart.gridArea,
            k = f.x,
            j = f.x + f.width,
            e = this.realYAxis.getCrossingPosition();
        e = b.fitInRange(e, k, j);
        var c = new bb(i, e, true, true);
        this._setShapeSettings(c);
        c.lineWidth = 0;
        h.push(c);
        h.push(d);
        this._addLengthAnimation(c);
        this._addLengthAnimation(d);
        return d
    };

    function s(b) {
        var c = a.extend(true, {}, this.defaults, {
            lineWidth: 0,
            markers: null
        });
        this.defaults = c;
        e.call(this, b)
    }
    s.prototype = new e;
    s.constructor = s;
    s.prototype._initXYData = function() {
        this._initXYDataRange(1, 3)
    };
    s.prototype._initCatValueData = function() {
        this._initCatValueDataRange(1, 3)
    };
    s.prototype._initDateValueData = function() {
        this._initDateValueDataRange(1, 3)
    };
    s.prototype._initVisibleCatValueData = function() {
        this._initVisibleCatValueDataRange(1, 3)
    };
    s.prototype._initVisibleXYData = function() {
        this._initVisibleXYDataRange(1, 3)
    };
    s.prototype._render = function(b) {
        if (!this.data) return;
        var a = this._getXAxisType();
        this.xAxisType = a;
        switch (a) {
            case "LinearAxis":
            case "DateTimeAxis":
                this._renderXYData(b);
                return;
            case "CategoryAxis":
                this._renderCatValueData(b);
                return
        }
    };
    s.prototype._renderCatValueData = function(k) {
        for (var l = this.data.length, e = this.markers != null && this.markers.isVisible(), c = [], d = [], f = [], r = [], p = [], s = e ? this.markers.size / 2 : 0, j, n, o, m, g, h, b = 0; b < l; b++) {
            var i = this.data[b];
            if (i === null) {
                c.push(null);
                c.push(null);
                d.push(null);
                d.push(null);
                !e && f.push(null);
                continue
            }
            m = b + .5;
            g = i[1];
            h = i[2];
            j = this.realXAxis.getPosition(m);
            n = this.realYAxis.getPosition(g);
            o = this.realYAxis.getPosition(h);
            c.push(j);
            c.push(n);
            d.push(j);
            d.push(o);
            if (!e) f[b] = f[2 * l - b - 1] = {
                dataItem: i,
                index: b,
                x: m,
                from: g,
                to: h
            };
            this._addMarkersAndLabels(r, p, j, n, o, b, l, null, g, h, s)
        }
        var q = this._createShape(c, d, k);
        if (!e && q) q.context = {
            chart: this.chart,
            series: this,
            points: f
        };
        else a.merge(k, r);
        a.merge(k, p)
    };
    s.prototype._renderXYData = function(i) {
        for (var l = this.data.length, d = this.markers != null && this.markers.isVisible(), t = this.labels != null && this.labels.visible !== false, j = [], k = [], e = [], r = [], p = [], s = d ? this.markers.size / 2 : 0, h, n, o, m, f, g, b = 0; b < l; b++) {
            var c = this.data[b];
            if (c === null) {
                pts.push(null);
                pts.push(null);
                !d && e.push(null);
                continue
            }
            m = c[0];
            f = c[1];
            g = c[2];
            h = this.realXAxis.getPosition(m);
            n = this.realYAxis.getPosition(f);
            o = this.realYAxis.getPosition(g);
            j.push(h);
            j.push(n);
            k.push(h);
            k.push(o);
            if (!d) e[b] = e[2 * l - b - 1] = {
                dataItem: c,
                index: b,
                x: m,
                from: f,
                to: g
            };
            this._addMarkersAndLabels(r, p, h, n, o, b, l, null, f, g, s)
        }
        var q = this._createShape(j, k, i);
        if (!d && q) q.context = {
            chart: this.chart,
            series: this,
            points: e
        };
        else a.merge(i, r);
        a.merge(i, p)
    };
    s.prototype._createShape = function(c, d, b) {
        var a = new fb(c, d);
        this._setShapeSettings(a);
        b.push(a);
        this._addLengthAnimation(a);
        return a
    };
    s.prototype._addMarkersAndLabels = function(g, m, i, p, q, b, h, o, d, e, l) {
        var k = 0,
            r = o ? o : b;
        if (this.markers && this.markers.isVisible()) {
            var f = {
                chart: this.chart,
                series: this,
                dataItem: this.data[b],
                index: b,
                x: this.realXAxis._getValue(r),
                from: d,
                to: e
            };
            k = this.markers.offset;
            var n = f.dataItem[3],
                a = this._addMarker(i, p, null, d, n);
            if (a.marker) {
                a.marker.context = f;
                a.line && g.push(a.line);
                g.push(a.marker);
                this._addShapeAnimation(a.marker, b, h)
            }
            a = this._addMarker(i, q, null, e, n);
            if (a.marker) {
                a.marker.context = f;
                a.line && g.push(a.line);
                g.push(a.marker);
                this._addShapeAnimation(a.marker, b, h)
            }
        }
        if (this.labels && this.labels.visible !== false) {
            var j = this._getLabelValue(d, b),
                c = this._getDataPointLabel(d, i, p, l + k, j, d > e),
                f = {
                    chart: this.chart,
                    series: this,
                    dataItem: this.data[b],
                    index: b
                };
            c.context = f;
            this.chart.elem.trigger("dataPointLabelCreating", c);
            m.push(c);
            this._addShapeAnimation(c, b, h);
            j = this._getLabelValue(e, b);
            c = this._getDataPointLabel(e, i, q, l + k, j, e > d);
            c.context = f;
            this.chart.elem.trigger("dataPointLabelCreating", c);
            m.push(c);
            this._addShapeAnimation(c, b, h)
        }
    };
    s.prototype._getDataPointLabel = function(j, i, d, c, e, f) {
        var h = this._getLabelText(e),
            b = new q(h);
        g.setShadows(b, this, this.chart);
        a.extend(b, this.labels);
        b.textAlign = "center";
        b.x = i;
        if (f) {
            b.y = d - c;
            b.textBaseline = "bottom"
        } else {
            b.y = d + c;
            b.textBaseline = "top"
        }
        return b
    };
    s.prototype._getTooltip = function(b) {
        var a = "From: <b>" + b.from.toString() + "</b></br>To: <b>" + b.to.toString() + "</b>";
        if (this.title) {
            var d = c.getColorFromFillStyle(this.fillStyle);
            a = '<div style="color:' + d + '">' + this.title + "</div>" + a
        }
        return a
    };

    function tb(a) {
        s.call(this, a)
    }
    tb.prototype = new s;
    tb.constructor = tb;
    tb.prototype._createShape = function(c, d, b) {
        var a = new fb(c, d, true);
        this._setShapeSettings(a);
        b.push(a);
        this._addLengthAnimation(a);
        return a
    };

    function p(b, a) {
        this.chart = b;
        a && this.setOptions(a)
    }
    p.prototype.setOptions = function(c) {
        this.clear();
        c = c || {};
        for (var e = [], d = 0; d < c.length; d++) {
            var a = c[d];
            this._resolveType(a);
            var b;
            switch (a.type) {
                case "category":
                    b = new E(a);
                    break;
                case "dateTime":
                    b = new l(a);
                    break;
                case "linearRadius":
                    b = new r(a);
                    break;
                case "categoryAngle":
                    b = new F(a);
                    break;
                case "linearAngle":
                    b = new D(a);
                    break;
                case "linear":
                default:
                    b = new k(a)
            }
            b._setChart(this.chart);
            e.push(b)
        }
        this.userAxes = e
    };
    p.prototype._resolveType = function(a) {
        if (a.type) return;
        var b = this.chart.series.items;
        if (b.length < 1) return;
        b[0]._resolveAxisType(a)
    };
    p.prototype._initSeriesAxes = function() {
        var b = [];
        a.merge(b, this.userAxes);
        for (var e = this.chart.series.items, d = 0; d < e.length; d++) {
            var c = e[d];
            c._initXAxis(b);
            c._initYAxis(b);
            c._initSharedAxes()
        }
        this.items = b
    };
    p.prototype._initSeries = function() {
        for (var b = this.items, a = 0; a < b.length; a++) {
            var c = b[a];
            c._initSeries()
        }
    };
    p.prototype._initRanges = function() {
        for (var b = this.items, a = 0; a < b.length; a++) {
            var c = b[a];
            c._initRange()
        }
    };
    p.prototype._resetWH = function() {
        for (var c = this.items, b = 0; b < c.length; b++) {
            var a = c[b];
            if (!a.isCustomWidth) {
                a.width = 0;
                a.height = 0
            }
        }
    };
    p.prototype._measure = function() {
        for (var c = this.items, a = false, b = 0; b < c.length; b++) {
            var e = c[b],
                d = e._measure();
            a = a || d
        }
        return a
    };
    p.prototype._arrange = function() {
        for (var b = this.items, a = 0; a < b.length; a++) {
            var c = b[a];
            c._arrange()
        }
    };
    p.prototype._getAxesInLoc = function(e) {
        for (var d = [], b = this.items, a = 0; a < b.length; a++) {
            var c = b[a];
            c.location == e && d.push(c)
        }
        return d
    };
    p.prototype._getVAxes = function() {
        for (var d = [], b = this.items, a = 0; a < b.length; a++) {
            var c = b[a];
            c.isVertical() && d.push(c)
        }
        return d
    };
    p.prototype._getHAxes = function() {
        for (var d = [], b = this.items, a = 0; a < b.length; a++) {
            var c = b[a];
            c.isVertical() == false && d.push(c)
        }
        return d
    };
    p.prototype._getTotalWidth = function() {
        for (var a = 0, c = this.items, b = 0; b < c.length; b++) {
            var d = c[b];
            if (d.isVertical()) a = a + d.width
        }
        return a
    };
    p.prototype._getTotalHeight = function() {
        for (var a = 0, c = this.items, b = 0; b < c.length; b++) {
            var d = c[b];
            if (d.isVertical() == false) a = a + d.height
        }
        return a
    };
    p.prototype._render = function(g) {
        for (var f = this.items, e = [], d = [], c = 0; c < f.length; c++) {
            var h = f[c],
                b = h._render(g);
            b.postShapes && a.merge(e, b.postShapes);
            b.contextShapes && a.merge(d, b.contextShapes)
        }
        return {
            postShapes: e,
            contextShapes: d
        }
    };
    p.prototype._updateOrigins = function() {
        for (var b = this.items, a = 0; a < b.length; a++) {
            var c = b[a];
            c._updateOrigin()
        }
    };
    p.prototype._correctOrigins = function() {
        for (var b = this.items, a = 0; a < b.length; a++) {
            var c = b[a];
            c._correctOrigin && c._correctOrigin()
        }
    };
    p.prototype.getZoomableAxes = function() {
        for (var d = [], b = this.items, a = 0; a < b.length; a++) {
            var c = b[a];
            c.zoomEnabled && d.push(c)
        }
        return d
    };
    p.prototype.find = function(d) {
        var b = this.items;
        if (d != null)
            for (var a = 0; a < b.length; a++) {
                var c = b[a];
                if (c.name == d) return c
            }
        return null
    };
    p.prototype.clear = function() {
        if (!this.items) return;
        a.each(this.items, function() {
            this.clear()
        })
    };

    function m(b) {
        var c = a.extend(true, {}, this.defaults, {
            rangeSlider: {
                visible: true,
                breadth: 20
            }
        });
        this.defaults = c;
        Bb.call(this, b)
    }
    m.prototype = new Bb;
    m.constructor = m;
    m.prototype._initSeries = function() {
        for (var c = new v(null, this.chart), d = this.chart.series.items, b = 0; b < d.length; b++) {
            var a = d[b];
            (a.realXAxis == this || a.realYAxis == this) && c.items.push(a)
        }
        this.series = c
    };
    m.prototype._setVisibleRanges = function() {
        Bb.prototype._setVisibleRanges.call(this);
        if (!this.jqRangeSlider) return;
        var a = (this.actualMaximum - this.actualMinimum) / 10;
        this.jqRangeSlider.jqRangeSlider("update", {
            minimum: this.actualMinimum,
            maximum: this.actualMaximum,
            smallChange: a,
            largeChange: 2 * a,
            minRange: a / 100,
            range: {
                minimum: this.actualVisibleMinimum,
                maximum: this.actualVisibleMaximum
            }
        })
    };
    m.prototype._arrange = function() {
        Bb.prototype._arrange.call(this);
        if (!this.zoomEnabled) {
            this.clear();
            return
        }
        var c = this.rangeSlider.breadth;
        if (this.rangeSlider.visible === false) return;
        this.offset += c;
        var e = this.offset;
        if (!this.jqRangeSlider) {
            var d = a('<div style="position:absolute"></div>').jqRangeSlider({}),
                f = this;
            d.bind("rangeChanging", function(b, a) {
                f._sliderZoom(a)
            });
            d.bind("rangeChanged", function(b, a) {
                f._sliderZoom(a)
            });
            this.chart.elem.append(d);
            this.jqRangeSlider = d
        }
        var b;
        switch (this.location) {
            case "left":
                b = {
                    left: this.x + this.width - e,
                    top: this.y,
                    width: c,
                    height: this.height
                };
                break;
            case "right":
                b = {
                    left: this.x + this.lineWidth,
                    top: this.y,
                    width: c,
                    height: this.height
                };
                break;
            case "top":
                b = {
                    left: this.x,
                    top: this.y + this.height - e,
                    width: this.width,
                    height: c
                };
                break;
            case "bottom":
                b = {
                    left: this.x,
                    top: this.y + this.lineWidth,
                    width: this.width,
                    height: c
                }
        }
        if (b) {
            var g = this.isAxisVertical ? "vertical" : "horizontal";
            this.jqRangeSlider.css(b).jqRangeSlider("update", {
                orientation: g,
                reversed: this.reversed
            })
        }
    };
    m.prototype._moveVisibleRange = function(f, g) {
        var e = this.isAxisVertical,
            c = this.actualVisibleMinimum,
            b = this.actualVisibleMaximum,
            d = b - c,
            a = 0;
        if (e) a = -d * g / this.length;
        else a = d * f / this.length;
        if (this.reversed) a = -a;
        a = Math.max(a, this.actualMinimum - c);
        a = Math.min(a, this.actualMaximum - b);
        this.visibleMinimum = c + a;
        this.visibleMaximum = b + a;
        this._setVisibleRanges();
        this._zoom()
    };
    m.prototype._scaleVisibleRange = function(a, f) {
        var e = this.actualVisibleMinimum,
            d = this.actualVisibleMaximum,
            h = d - e,
            i = this.getZoom(),
            l, b, c, m = this.isAxisVertical;
        if (m) {
            l = a.dy / f.dy;
            var p = f.y1 - a.y1,
                q = f.y2 - a.y2;
            b = -h * q / this.length / i;
            c = -h * p / this.length / i;
            if (a.y1 > a.y2) {
                var j = b;
                b = c;
                c = j
            }
        } else {
            l = a.dx / f.dx;
            var n = f.x1 - a.x1,
                o = f.x2 - a.x2;
            b = h * n / this.length / i;
            c = h * o / this.length / i;
            if (a.x1 > a.x2) {
                var j = b;
                b = c;
                c = j
            }
        }
        if (this.reversed) {
            var j = b;
            b = -c;
            c = -j
        }
        var k = (e + d) / 2,
            g = (this.actualMaximum - this.actualMinimum) / 1e3;
        e = Math.max(this.actualMinimum, e - b);
        d = Math.min(this.actualMaximum, d - c);
        if (e > d - g) {
            g /= 2;
            e = k - g;
            d = k + g
        }
        this.visibleMinimum = e;
        this.visibleMaximum = d;
        this._setVisibleRanges();
        this._zoom()
    };
    m.prototype._scaleToRegion = function(j, k) {
        var c = this.chart.gridArea,
            d = c.fitHor(j.locX),
            f = c.fitVer(j.locY),
            e = c.fitHor(k.locX),
            g = c.fitVer(k.locY),
            i = this.reversed,
            a, b;
        if (this.isAxisVertical)
            if (i) {
                a = Math.min(f, g);
                b = Math.max(f, g)
            } else {
                a = Math.max(f, g);
                b = Math.min(f, g)
            }
        else if (i) {
            a = Math.max(d, e);
            b = Math.min(d, e)
        } else {
            a = Math.min(d, e);
            b = Math.max(d, e)
        }
        a = this.getValue(a);
        b = this.getValue(b);
        var h = (this.actualMaximum - this.actualMinimum) / 1e3;
        if (b - a < h) {
            var l = (h - (b - a)) / 2;
            a -= l;
            b += l
        }
        this.visibleMinimum = a;
        this.visibleMaximum = b;
        this._setVisibleRanges();
        this._zoom()
    };
    m.prototype._sliderZoom = function(a) {
        this.visibleMinimum = this.options.visibleMinimum = a.minimum;
        this.visibleMaximum = this.options.visibleMaximum = a.maximum;
        this.chart.partialDelayedUpdate();
        this._zoom()
    };
    m.prototype._zoom = function() {
        this.chart.elem.trigger("axisZoom", {
            chart: this.chart,
            axis: this
        })
    };
    m.prototype._getTooltip = function(a) {
        return "<b>" + a + "</b></br>"
    };
    m.prototype.resetZoom = function() {
        if (!this.zoomEnabled) return;
        this.visibleMinimum = this.actualMinimum;
        this.visibleMaximum = this.actualMaximum;
        this._setVisibleRanges();
        this._zoom()
    };
    m.prototype.clear = function() {
        if (this.jqRangeSlider) {
            this.jqRangeSlider.jqRangeSlider("destroy");
            this.jqRangeSlider.remove();
            this.jqRangeSlider = null
        }
    };

    function E(a) {
        m.call(this, a);
        this.DataType = "CategoryAxis"
    }
    E.prototype = new m;
    E.constructor = E;
    E.prototype._initRange = function() {
        var b = this.series;
        b._initCategories();
        var c = b.categories,
            a = c.length;
        if (this.categories) a = Math.max(a, this.categories.length);
        this.actualMinimum = 0;
        this.actualMaximum = a;
        this._setVisibleRanges();
        this.actualInterval = 1;
        this.seriesCategories = c
    };
    E.prototype._getLabelIntervals = function(d, c) {
        var e = 0;
        if (c && c.intervalOffset) e = c.intervalOffset;
        for (var f = [], h = Math.round(this.actualVisibleMinimum), g = this._getIntervalStart(h, d) + .5, a = g + e; a <= this.actualVisibleMaximum; a = b.round(a + d)) f.push(a);
        return f
    };
    E.prototype._getIntervalCount = function() {
        return this.categories.length
    };
    E.prototype._getValue = function(c) {
        var b = Math.round(c),
            a;
        if (this.categories && b < this.categories.length) a = this.categories[b];
        else a = this.seriesCategories[b];
        return a
    };
    E.prototype.getLabel = function(d) {
        var b;
        if (a.type(d) == "string") b = d;
        else {
            var c = Math.round(d - .5);
            if (this.categories && c < this.categories.length) b = this.categories[c];
            else b = this.seriesCategories[c]
        }
        return m.prototype.getLabel.call(this, b)
    };
    E.prototype.getOrientation = function() {
        return "x"
    };

    function Gb(a) {
        m.call(this, a)
    }
    Gb.prototype = new m;
    Gb.constructor = Gb;

    function k(b) {
        var c = a.extend(true, {}, this.defaults, {
            logarithmic: false,
            logBase: 10,
            labels: {
                resolveOverlappingMode: "hide"
            }
        });
        this.defaults = c;
        m.call(this, b);
        this.DataType = "LinearAxis"
    }
    k.prototype = new m;
    k.constructor = k;
    k.prototype._initRange = function() {
        var i = this.series;
        i._initRanges();
        var g, f;
        if (this.getOrientation() == "x") {
            g = i.minX;
            f = i.maxX
        } else {
            g = i.min;
            f = i.max
        }
        if (g == h && f == j) {
            g = 0;
            f = 10
        }
        var p = this._addPlotsInRange(g, f);
        g = p.min;
        f = p.max;
        if (this.skipEmptyDays) f -= this.totalEmptyDaysTicks;
        var n = Math.abs(f - g);
        if (n == 0) n = 1;
        var m = 0,
            l = 0,
            d = i._getPixelMargins(this);
        if (this.isAxisVertical) {
            d.left = b.isNull(this.bottomMargin) ? d.left + .5 : this.bottomMargin;
            d.right = b.isNull(this.topMargin) ? d.right + .5 : this.topMargin
        } else {
            d.left = b.isNull(this.leftMargin) ? d.left + .5 : this.leftMargin;
            d.right = b.isNull(this.rightMargin) ? d.right + .5 : this.rightMargin
        }
        var o = n / this.length;
        m = o * d.left;
        l = o * d.right;
        if (this.logarithmic === true) {
            m = b.log(m, this.logBase);
            l = b.log(l, this.logBase)
        }
        var a = g - m,
            c = f + l,
            r = this.series._isAnchoredToOrigin(),
            e = this.crossing;
        if (r && this.getOrientation() == "y")
            if (g >= e && a < e) a = e;
            else if (f <= e && c > e) c = e;
        if (this.extendRangeToOrigin)
            if (a > e) a = e;
            else if (c < e) c = e;
        if (this.logarithmic === true) {
            var q = 1;
            if (a < q) a = q;
            a = b.log(a, this.logBase);
            c = b.log(c, this.logBase);
            var k = this._calculateActualIntervalLogarithmic(a, c);
            a = b.round(Math.floor(a / k) * k);
            c = b.round(Math.ceil(c / k) * k)
        }
        this._setMinMax(a, c);
        this._setVisibleRanges();
        if (this.logarithmic === true) this.actualInterval = this._calculateActualIntervalLogarithmic(this.actualVisibleMinimum, this.actualVisibleMaximum);
        else this.actualInterval = this._calculateActualInterval(this.actualVisibleMinimum, this.actualVisibleMaximum)
    };
    k.prototype._addPlotsInRange = function(b, a) {
        var e = this.plotLines;
        if (e)
            for (var c = 0; c < e.length; c++) {
                var h = e[c].value;
                b = Math.min(b, h);
                a = Math.max(a, h)
            }
        var d = this.plotBands;
        if (d)
            for (var c = 0; c < d.length; c++) {
                var f = d[c].from,
                    g = d[c].to;
                b = Math.min(b, f);
                a = Math.max(a, f);
                b = Math.min(b, g);
                a = Math.max(a, g)
            }
        return {
            min: b,
            max: a
        }
    };
    k.prototype._calculateActualIntervalLogarithmic = function(e, d) {
        if (this.interval) return this.interval;
        var c = (d - e) / 3,
            a = Math.floor(b.log10(Math.abs(c)));
        if (a == 0) a = 1;
        return b.round(Math.floor(c / a) * a)
    };
    k.prototype._getIntervals = function(c, a, h) {
        if (this.logarithmic === false) return m.prototype._getIntervals.call(this, c, a);
        if (h === false) return this._getLogarithmicMinorIntervals(c, a);
        var e = 0;
        if (a && a.intervalOffset) e = a.intervalOffset;
        for (var f = [], g = this._getIntervalStart(this.actualVisibleMinimum, c), d = g + e; d <= this.actualVisibleMaximum; d = b.round(d + c)) f.push(Math.pow(this.logBase, d));
        return f
    };
    k.prototype._getLogarithmicMinorIntervals = function(m, k) {
        for (var l = this._getMarkInterval(k.major, true), h = this._getIntervals(l, k.major, true), j = [], d = null, g = 0; g < h.length; g++) {
            var f = h[g];
            if (d == null) {
                d = f;
                continue
            }
            var a = d,
                c = f;
            if (a < c) {
                var n = a;
                a = c;
                c = n
            }
            var i = (a - c) * m / 10,
                e = c + i;
            while (e < a) {
                j.push(b.round(e));
                e += i
            }
            d = f
        }
        return j
    };
    k.prototype._getIntervalCount = function() {
        return Math.ceil(this.actualMaximum - this.actualMinimum)
    };
    k.prototype.getCrossingPosition = function() {
        return this.getPosition(this.crossing)
    };
    k.prototype.getOrientation = function(b) {
        var a = this.isVertical();
        if (this.series)
            for (var c = 0; c < this.series.items.length; c++) b = this.series.items[c];
        if (b && b.isVertical) a = !a;
        return a ? "y" : "x"
    };
    k.prototype.getPosition = function(a) {
        if (this.logarithmic == true) a = b.log(a, this.logBase);
        var c = m.prototype.getPosition.call(this, a);
        return c
    };

    function l(b) {
        var c = a.extend(true, {}, this.defaults, {
            labels: {
                yearsIntervalStringFormat: "yyyy",
                monthsIntervalStringFormat: a.fn.jqDateFormat.masks.shortDate,
                weeksIntervalStringFormat: a.fn.jqDateFormat.masks.shortDate,
                daysIntervalStringFormat: a.fn.jqDateFormat.masks.shortDate,
                hoursIntervalStringFormat: "m/d/yy HH:MM",
                minutesIntervalStringFormat: a.fn.jqDateFormat.masks.shortTime,
                secondsIntervalStringFormat: a.fn.jqDateFormat.masks.mediumTime,
                millisecondsIntervalStringFormat: a.fn.jqDateFormat.masks.mediumTime
            },
            skipEmptyDays: false
        });
        this.defaults = c;
        k.call(this, b);
        this.DataType = "DateTimeAxis"
    }
    l.prototype = new k;
    l.constructor = l;
    l.prototype._initRange = function() {
        if (this.skipEmptyDays) {
            this.emptyDays = this._getEmptyDays();
            this.totalEmptyDaysTicks = this.emptyDays.length * d.ticksInDay
        } else this.totalEmptyDaysTicks = 0;
        k.prototype._initRange.call(this);
        this._initActualStringFormat()
    };
    l.prototype._setMinMax = function(c, b) {
        if (this.minimum != null)
            if (a.type(this.minimum) == "date") this.actualMinimum = this.minimum.getTime();
            else this.actualMinimum = this.minimum;
        else this.actualMinimum = c;
        if (this.maximum != null)
            if (a.type(this.minimum) == "date") this.actualMaximum = this.maximum.getTime();
            else this.actualMaximum = this.maximum;
        else this.actualMaximum = b
    };
    l.prototype._calculateActualInterval = function(c, b) {
        if (this.skipEmptyDays) b += this.totalEmptyDaysTicks;
        var a = this._calculateDateTimeInterval(c, b);
        if (this.intervalType != null) this.actualIntervalType = this.intervalType;
        else this.actualIntervalType = this.type;
        if (this.interval != null) a = this.interval;
        return a
    };
    l.prototype._calculateDateTimeInterval = function(j, i) {
        var h = i - j,
            f = .8 * this.maxInter200Px,
            g = Math.max(1, this.length),
            e = g / (200 * 10 / f),
            b = h / e;
        this.type = "year";
        var a = b / (1e3 * 60);
        if (a <= 1) {
            if (b <= 10) {
                this.type = "milliseconds";
                return 1
            }
            if (b <= 50) {
                this.type = "milliseconds";
                return 4
            }
            if (b <= 200) {
                this.type = "milliseconds";
                return 20
            }
            if (b <= 500) {
                this.type = "milliseconds";
                return 50
            }
            var c = b / 1e3;
            if (c <= 7) {
                this.type = "seconds";
                return 1
            }
            if (c <= 15) {
                this.type = "seconds";
                return 2
            }
            if (c <= 30) {
                this.type = "seconds";
                return 5
            }
            if (c <= 60) {
                this.type = "seconds";
                return 10
            }
        } else if (a <= 2) {
            this.type = "seconds";
            return 20
        }
        if (a <= 3) {
            this.type = "seconds";
            return 30
        }
        if (a <= 10) {
            this.type = "minutes";
            return 1
        }
        if (a <= 20) {
            this.type = "minutes";
            return 2
        }
        if (a <= 60) {
            this.type = "minutes";
            return 5
        }
        if (a <= 120) {
            this.type = "minutes";
            return 10
        }
        if (a <= 180) {
            this.type = "minutes";
            return 30
        }
        if (a <= 60 * 12) {
            this.type = "hours";
            return 1
        }
        if (a <= 60 * 24) {
            this.type = "hours";
            return 4
        }
        if (a <= 60 * 24 * 2) {
            this.type = "hours";
            return 6
        }
        if (a <= 60 * 24 * 3) {
            this.type = "hours";
            return 12
        }
        if (a <= 60 * 24 * 10) {
            this.type = "days";
            return 1
        }
        if (a <= 60 * 24 * 20) {
            this.type = "days";
            return 2
        }
        if (a <= 60 * 24 * 30) {
            this.type = "days";
            return 3
        }
        if (a <= 60 * 24 * 30.5 * 2) {
            this.type = "weeks";
            return 1
        }
        if (a <= 60 * 24 * 30.5 * 5) {
            this.type = "weeks";
            return 2
        }
        if (a <= 60 * 24 * 30.5 * 12) {
            this.type = "months";
            return 1
        }
        if (a <= 60 * 24 * 30.5 * 24) {
            this.type = "months";
            return 3
        }
        if (a <= 60 * 24 * 30.5 * 48) {
            this.type = "months";
            return 6
        }
        this.type = "years";
        var d = a / 60 / 24 / 365;
        return d < 5 ? 1 : d < 10 ? 2 : Math.floor(d / 5)
    };
    l.prototype._getNextPosition = function(b, a) {
        return this._incrementDateTime(b, a, this.actualIntervalType)
    };
    l.prototype._incrementDateTime = function(h, b, c) {
        var a = new Date(h),
            e = 0;
        if (c == "days") a = d.addDays(a, b);
        else if (c == "hours") e = d.fromHours(b);
        else if (c == "milliseconds") e = b;
        else if (c == "seconds") e = d.fromSeconds(b);
        else if (c == "minutes") e = d.fromMinutes(b);
        else if (c == "weeks") a = d.addDays(a, 7 * b);
        else if (c == "months") {
            var f = false;
            if (a.getDate() == d.getDaysInMonth(a.getFullYear(), a.getMonth())) f = true;
            a = d.addMonths(a, Math.floor(b));
            e = d.fromDays(30 * (b - Math.floor(b)));
            if (f && e == 0) {
                var g = d.getDaysInMonth(a.getFullYear(), a.getMonth());
                a = d.addDays(a, g - a.getDate())
            }
        } else if (c == "years") {
            a = d.addYears(a, Math.floor(b));
            e = d.fromDays(365 * (b - Math.floor(b)))
        }
        return a.getTime() + e
    };
    l.prototype._getIntervalStart = function(j, b, e) {
        if (e == null) return j;
        var a = new Date(j);
        if (b > 0 && b != 1)
            if (e == "months" && b <= 12 && b > 1) {
                var i = a,
                    c = new Date(a.getFullYear(), 0, 1, 0, 0, 0);
                while (c < a) {
                    i = c;
                    c = d.addMonths(c, b)
                }
                a = i;
                return a.getTime()
            } switch (e) {
            case "years":
                var g = a.getFullYear() / b * b;
                if (g <= 0) g = 1;
                a = new Date(g, 0, 1, 0, 0, 0);
                break;
            case "months":
                var f = a.getMonth() / b * b;
                if (f < 0) f = 0;
                a = new Date(a.getFullYear(), f, 1, 0, 0, 0);
                break;
            case "days":
                var h = a.getDate() / b * b;
                if (h <= 0) h = 1;
                a = new Date(a.getFullYear(), a.getMonth(), h, 0, 0, 0);
                break;
            case "hours":
                var n = a.getHours() / b * b;
                a = new Date(a.getFullYear(), a.getMonth(), a.getDate(), n, 0, 0);
                break;
            case "minutes":
                var l = a.getMinutes() / b * b;
                a = new Date(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), l, 0);
                break;
            case "seconds":
                var m = a.getSeconds() / b * b;
                a = new Date(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), m, 0);
                break;
            case "milliseconds":
                var k = a.getMilliseconds() / b * b;
                a = new Date(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), k);
                break;
            case "weeks":
                a = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 0, 0, 0);
                a = d.addDays(a, -d.getDayOfWeek(a))
        }
        return a.getTime()
    };
    l.prototype._initActualStringFormat = function() {
        if (!this.labels || this.labels.visible === false) return;
        if (this.labels.stringFormat) {
            this.actualStringFormat = this.labels.stringFormat;
            return
        }
        switch (this.actualIntervalType) {
            case "years":
                this.actualStringFormat = this.labels.yearsIntervalStringFormat;
                break;
            case "months":
                this.actualStringFormat = this.labels.monthsIntervalStringFormat;
                break;
            case "weeks":
                this.actualStringFormat = this.labels.weeksIntervalStringFormat;
                break;
            case "days":
                this.actualStringFormat = this.labels.daysIntervalStringFormat;
                break;
            case "hours":
                this.actualStringFormat = this.labels.hoursIntervalStringFormat;
                break;
            case "minutes":
                this.actualStringFormat = this.labels.minutesIntervalStringFormat;
                break;
            case "seconds":
                this.actualStringFormat = this.labels.secondsIntervalStringFormat;
                break;
            case "milliseconds":
                this.actualStringFormat = this.labels.millisecondsIntervalStringFormat;
                break;
            default:
                this.actualStringFormat = "default"
        }
    };
    l.prototype._getIntervals = function(f, c) {
        var i = [],
            e = this.actualVisibleMinimum,
            g = this.actualVisibleMaximum;
        if (this.skipEmptyDays) {
            e = this._addEmptyDaysOffset(e);
            g = this._addEmptyDaysOffset(g)
        }
        var a = this._getIntervalStart(e, f, this.actualIntervalType);
        while (a < e) a = this._incrementDateTime(a, f, this.actualIntervalType);
        if (c && c.intervalOffset) {
            var h = this.actualIntervalType,
                j = c.intervalOffset;
            if (c.intervalOffsetType) h = c.intervalOffsetType;
            a = this._incrementDateTime(a, j, h)
        }
        for (var b = a; b <= g; b = this._incrementDateTime(b, f, this.actualIntervalType)) {
            var d = this._getNextNonEmptyDay(b);
            if (d) {
                if (this.skipEmptyDays && b < d) b = d;
                i.push(d)
            }
        }
        return i
    };
    l.prototype._getIntervalCount = function() {
        var a = this.actualMaximum - this.actualMinimum;
        a = Math.ceil(a / d.ticksInDay);
        return a
    };
    l.prototype._getNextNonEmptyDay = function(b) {
        if (!this.emptyDays) return b;
        var e = a.inArray(b, this.emptyDays);
        if (e == -1) return b;
        var h = d.addDays(new Date(b), 1),
            g = this.actualMaximum;
        if (this.skipEmptyDays) g += this.totalEmptyDaysTicks;
        for (var c = h; c <= g; c = d.addDays(c, 1)) {
            var f = c.getTime(),
                e = a.inArray(f, this.emptyDays);
            if (e == -1) return f
        }
        return null
    };
    l.prototype._getEmptyDaysOffset = function(c) {
        if (!this.emptyDays) return 0;
        for (var b = 0, a = 0; a < this.emptyDays.length; a++) {
            var e = this.emptyDays[a];
            if (e < c) b++;
            else break
        }
        return b * d.ticksInDay
    };
    l.prototype._addEmptyDaysOffset = function(c) {
        if (b.isNull(c)) return null;
        var a = c + this._getEmptyDaysOffset(c),
            d = this._getEmptyDaysOffset(a) - this._getEmptyDaysOffset(c);
        c = a;
        a += d;
        while (d) {
            var d = this._getEmptyDaysOffset(a) - this._getEmptyDaysOffset(c);
            c = a;
            a += d
        }
        return a
    };
    l.prototype._getEmptyDays = function() {
        for (var b = [], a = 0; a < this.series.items.length; a++) {
            var c = this.series.items[a];
            if (a == 0) b = this._getEmptyDaysFromSeries(c);
            else this._excludeDaysFromSeries(c, b)
        }
        return b
    };
    l.prototype._getEmptyDaysFromSeries = function(i) {
        var g = [],
            b = [];
        a.merge(b, i.data);
        b.sort(function(a, b) {
            return a[0] - b[0]
        });
        for (var c = d.roundToDay(b[0][0]), e = 1; e < b.length; e++) {
            for (var h = d.roundToDay(b[e][0]), j = (h - c) / d.ticksInDay, f = 1; f < j; f++) g.push(d.addDays(c, f).getTime());
            c = h
        }
        return g
    };
    l.prototype._excludeDaysFromSeries = function(c, b) {
        a.each(c.data, function(g, e) {
            var f = d.roundToDay(e[0]).getTime(),
                c = a.inArray(f, b);
            c != -1 && b.splice(c, 1)
        })
    };
    l.prototype._getTooltip = function(a) {
        var b = "";
        if (a.getSeconds() != 0) b += "ddd, mmm dS HH:MM:ss yyyy";
        else if (a.getHours() != 0 || a.getMinutes() != 0) b += "ddd, mmm d HH:MM yyyy";
        else b = "ddd, mmm d yyyy";
        var a = this.chart.stringFormat(a, b);
        return "<b>" + a + "</b></br>"
    };
    l.prototype.getPosition = function(b) {
        if (a.type(b) == "date") b = b.getTime();
        var c = 0;
        if (this.skipEmptyDays) c = this._getEmptyDaysOffset(b);
        var d = k.prototype.getPosition.call(this, b - c);
        return d
    };
    l.prototype.getLabel = function(b) {
        if (!this.labels || this.labels.visible === false || !this.actualStringFormat) return;
        var c = new Date(b);
        return a.fn.jqDateFormat(c, this.actualStringFormat)
    };

    function r(b) {
        var c = a.extend(true, {}, this.defaults, {
            innerExtent: .2,
            renderStyle: "circle",
            majorTickMarks: {
                visible: false
            },
            location: "radial",
            majorGridLines: {
                strokeStyle: "grey",
                lineWidth: 1,
                visible: true
            }
        });
        this.defaults = c;
        k.call(this, b);
        this.DataType = "LinearRadiusAxis"
    }
    r.prototype = new k;
    r.constructor = r;
    r.prototype.getOrientation = function() {
        return "y"
    };
    r.prototype._measure = function() {
        this.width = 0;
        this.height = 0;
        return false
    };
    r.prototype._arrange = function() {
        this._initRadialMeasures()
    };
    r.prototype._updateOrigin = function() {
        var a = this.innerExtent * this.radius;
        this.origin = this.cx + a;
        this.length = this.radius - a;
        this.extent = a
    };
    r.prototype._getLabels = function() {
        var a = this.labels;
        if (a == null || a.visible === false) return [];
        for (var j = this._getMaxOutsideTickMarksLength() + this.lblMargin, e = [], k = this._getMarkInterval(a, true), f = this._getLabelIntervals(k, a), d = 0; d < f.length; d++) {
            var g = f[d],
                i = this.getLabel(g),
                c = this._createLabel(i, a),
                l = this.getPosition(g),
                n = this.cy,
                m = l,
                h = b.rotatePointAt(m, n, -Math.PI / 2, this.cx, this.cy);
            c.x = h.x - j;
            c.y = h.y;
            c.textAlign = "right";
            e.push(c)
        }
        return e
    };
    r.prototype._getTickMarks = function(a, k) {
        if (a == null || a.visible != true) return [];
        for (var h = [], s = this._getMarkInterval(a, k), t = a.length, j = this._getIntervals(s, a, k), g = this.sharedAxis, f = g._getIntervals(g.actualInterval), p, r, q, c, d = 0; d < j.length; d++) {
            var u = this.getPosition(j[d]);
            p = q = u;
            c = this.cy;
            r = c - t;
            for (var e = 0; e < f.length; e++) {
                var v = f[e],
                    i = this.sharedAxis._getAngle(v),
                    m = b.rotatePointAt(p, r, i, this.cx, this.cy),
                    o = b.rotatePointAt(q, c, i, this.cx, this.cy),
                    l = new n(m.x, m.y, o.x, o.y);
                a._setLineSettings(l);
                h.push(l)
            }
        }
        return h
    };
    r.prototype._getGridLines = function(a, g) {
        if (a == null || a.visible != true) return [];
        for (var d = [], h = this._getMarkInterval(a, g), e = this._getIntervals(h, a, true), c = 0; c < e.length; c++) {
            var f = e[c],
                b = this._getRenderShape(f);
            a._setLineSettings(b);
            b.fillStyle = null;
            d.push(b)
        }
        return d
    };
    r.prototype._render = function(d) {
        var g = this._getGridLines(this.minorGridLines, false);
        a.merge(d, g);
        var f = this._getGridLines(this.majorGridLines, true);
        a.merge(d, f);
        var c = [],
            i = this._getTickMarks(this.minorTickMarks, false);
        a.merge(c, i);
        var h = this._getTickMarks(this.majorTickMarks, true);
        a.merge(c, h);
        var b = this._getRenderShape(this.actualMinimum);
        b.strokeStyle = this.strokeStyle;
        b.lineWidth = this.lineWidth;
        b.strokeDashArray = this.strokeDashArray;
        b.fillStyle = null;
        d.push(b);
        var e = this._getLabels();
        a.merge(c, e);
        return {
            postShapes: c,
            contextShapes: e
        }
    };
    r.prototype._getRenderShape = function(b) {
        var d = this.getPosition(b),
            a = d - this.origin + this.extent,
            c = this._createRenderShape(this.cx - a, this.cy - a, a);
        return c
    };
    r.prototype._createRenderShape = function(g, h, f) {
        if (this.renderStyle != "polygon") return new ab(g, h, f);
        for (var j = this.sharedAxis, a = [], d = this.sharedAxis.actualMaximum, i = 2 * Math.PI / d, g = this.cx, h = this.cy - f, c = 0; c < d; c++) {
            var e = b.rotatePointAt(g, h, c * i, this.cx, this.cy);
            a.push(e.x);
            a.push(e.y)
        }
        return new M(a)
    };

    function F(b) {
        var c = a.extend(true, {}, this.defaults, {
            strokeStyle: "grey",
            renderLinesOverGraph: true,
            location: "radial"
        });
        this.defaults = c;
        m.call(this, b);
        this.DataType = "CategoryAngleAxis"
    }
    F.prototype = new E;
    F.constructor = F;
    F.prototype._measure = function() {
        this.width = 0;
        this.height = 0;
        return false
    };
    F.prototype._arrange = function() {
        this._initRadialMeasures()
    };
    F.prototype._updateOrigin = function() {
        this.origin = this.cx;
        this.length = 2 * Math.PI * this.radius
    };
    F.prototype._correctOrigin = function() {
        for (var a = 0, j = this.x, k = this.y, i = this.x + this.width, f = this.y + this.height, g = this._getLabels(), c = 0; c < g.length; c++) {
            var b = g[c];
            if (b.x < j) a = Math.max(a, j - b.x);
            var e = b.x + b.width;
            if (e > i) a = Math.max(a, e - i);
            var h = b.y - b.height / 2;
            if (h < k) a = Math.max(a, k - h);
            var d = b.y + b.height / 2;
            if (d > f) a = Math.max(a, d - f)
        }
        this.radius -= a;
        this.length = 2 * Math.PI * this.radius;
        if (this.sharedAxis) {
            this.sharedAxis.radius = this.radius;
            this.sharedAxis._updateOrigin();
            this.sharedAxis._initRange()
        }
    };
    F.prototype._getAngle = function(b) {
        var d = this.actualMaximum,
            c = 2 * Math.PI / d,
            a = b * c;
        if (this.reversed === true) a = 2 * Math.PI - a;
        return a - Math.PI / 2
    };
    F.prototype._getLabels = function() {
        var f = this.labels;
        if (f == null || f.visible === false) return [];
        var g = this.actualMaximum;
        if (g == 0) return;
        for (var i = this.cx, j = this.cy, n = i, o = j - this.radius, m = 2 * Math.PI / g, c = 8, h = [], f = this.labels, e = 0; e < g; e++) {
            var d = e * m,
                k = b.rotatePointAt(n, o, d, i, j),
                l = this.getLabel(e),
                a = this._createLabel(l, f);
            a.x = k.x;
            a.y = k.y;
            if (d == Math.PI) {
                a.x -= a.width / 2;
                a.y += c
            } else if (d == 0) {
                a.x -= a.width / 2;
                a.y -= c
            } else if (d > Math.PI) a.x -= a.width + c;
            else a.x += c;
            h.push(a)
        }
        return h
    };
    F.prototype._render = function(m) {
        var f = [],
            g = this.actualMaximum;
        if (g == 0) return;
        for (var d = this.cx, e = this.cy, q = d, s = e - this.sharedAxis.extent, r = d, t = e - this.radius, o = this.renderLinesOverGraph, p = 2 * Math.PI / g, h = 0; h < g; h++) {
            var j = h * p,
                k = b.rotatePointAt(q, s, j, d, e),
                l = b.rotatePointAt(r, t, j, d, e),
                c = new n(k.x, k.y, l.x, l.y);
            c.strokeStyle = this.strokeStyle;
            c.lineWidth = this.lineWidth;
            c.strokeDashArray = this.strokeDashArray;
            if (o) f.push(c);
            else m.push(c)
        }
        var i = this._getLabels();
        a.merge(f, i);
        return {
            postShapes: f,
            contextShapes: i
        }
    };

    function D(b) {
        var c = a.extend(true, {}, this.defaults, {
            minimum: 0,
            maximum: 360,
            renderLinesOverGraph: true,
            strokeStyle: "gray"
        });
        this.defaults = c;
        m.call(this, b);
        this.DataType = "LinearAngleAxis";
        this.location = "radial"
    }
    D.prototype = new k;
    D.constructor = D;
    D.prototype._initRange = function() {
        var i = this.series;
        i._initRanges();
        var f = i.minX,
            e = i.maxX;
        if (f == h && e == j) {
            f = 0;
            e = 10
        }
        var l = Math.abs(e - f);
        if (l == 0) l = 1;
        var a = f,
            c = e,
            m = this.series._isAnchoredToOrigin(),
            d = this.crossing;
        if (m && this.getOrientation() == "y")
            if (f >= d && a < d) a = d;
            else if (e <= d && c > d) c = d;
        if (this.extendRangeToOrigin)
            if (a > d) a = d;
            else if (c < d) c = d;
        if (this.logarithmic === true) {
            var k = 1;
            if (a < k) a = k;
            a = b.log(a, this.logBase);
            c = b.log(c, this.logBase);
            var g = this._calculateActualIntervalLogarithmic(a, c);
            a = b.round(Math.floor(a / g) * g);
            c = b.round(Math.ceil(c / g) * g)
        }
        this._setMinMax(a, c);
        this._setVisibleRanges();
        if (this.logarithmic === true) this.actualInterval = this._calculateActualIntervalLogarithmic(this.actualVisibleMinimum, this.actualVisibleMaximum);
        else this.actualInterval = this._calculateActualInterval(this.actualVisibleMinimum, this.actualVisibleMaximum)
    };
    D.prototype._measure = function() {
        this.width = 0;
        this.height = 0;
        return false
    };
    D.prototype._arrange = function() {
        this._initRadialMeasures()
    };
    D.prototype._updateOrigin = function() {
        this.origin = this.cx;
        this.length = 2 * Math.PI * this.radius
    };
    D.prototype._correctOrigin = function() {
        for (var a = 0, j = this.x, k = this.y, i = this.x + this.width, f = this.y + this.height, g = this._getLabels(), c = 0; c < g.length; c++) {
            var b = g[c];
            if (b.x < j) a = Math.max(a, j - b.x);
            var e = b.x + b.width;
            if (e > i) a = Math.max(a, e - i);
            var h = b.y - b.height / 2;
            if (h < k) a = Math.max(a, k - h);
            var d = b.y + b.height / 2;
            if (d > f) a = Math.max(a, d - f)
        }
        this.radius -= a;
        this.length = 2 * Math.PI * this.radius;
        if (this.sharedAxis) {
            this.sharedAxis.radius = this.radius;
            this.sharedAxis._updateOrigin();
            this.sharedAxis._initRange()
        }
    };
    D.prototype._getAngle = function(b) {
        var c = this.actualMaximum - this.actualMinimum,
            d = 2 * Math.PI / c,
            a = (b - this.actualMinimum) * d;
        if (this.reversed === true) a = 2 * Math.PI - a;
        return a - Math.PI / 2
    };
    D.prototype._getLabels = function() {
        var d = this.labels;
        if (d == null || d.visible === false) return [];
        for (var j = this.cx, k = this.cy, o = j + this.radius, p = k, e = 8, g = [], n = this._getMarkInterval(d, true), h = this._getLabelIntervals(n, d), f = 0; f < h.length - 1; f++) {
            var i = h[f],
                m = this.getLabel(i),
                c = this._getAngle(i),
                l = b.rotatePointAt(o, p, c, j, k),
                a = this._createLabel(m, d);
            a.x = l.x;
            a.y = l.y;
            c += Math.PI / 2;
            if (c == Math.PI) {
                a.x -= a.width / 2;
                a.y += e
            } else if (c == 0) {
                a.x -= a.width / 2;
                a.y -= e
            } else if (c > Math.PI) a.x -= a.width + e;
            else a.x += e;
            g.push(a)
        }
        return g
    };
    D.prototype._render = function(o) {
        var f = [],
            d = this.cx,
            e = this.cy,
            r = d,
            m = e;
        if (this.sharedAxis) m -= this.sharedAxis.extent;
        for (var s = d, t = e - this.radius, p = this.renderLinesOverGraph, j = this._getIntervals(this.actualInterval), g = 0; g < j.length - 1; g++) {
            var q = j[g],
                i = this._getAngle(q) + Math.PI / 2,
                k = b.rotatePointAt(r, m, i, d, e),
                l = b.rotatePointAt(s, t, i, d, e),
                c = new n(k.x, k.y, l.x, l.y);
            c.strokeStyle = this.strokeStyle;
            c.lineWidth = this.lineWidth;
            c.strokeDashArray = this.strokeDashArray;
            if (p) f.push(c);
            else o.push(c)
        }
        var h = this._getLabels();
        a.merge(f, h);
        return {
            postShapes: f,
            contextShapes: h
        }
    }
})(jQuery);
(function(a) {
    var b = function() {
        var s;
        var f;
        var h;
        var d;
        var e;
        var i;
        var c;
        var g;
        var o;
        var u;
        var k = {
            orientation: "horizontal",
            range: true,
            passedID: "",
            values: false,
            snap: false,
            change: function() {},
            blur: function() {}
        };
        var p = function(B) {
            B.pageX = B.pageX - f.offset().left;
            var C = d.position().left;
            var z = B.pageX - C;
            if (e) {
                var D = e.position().left;
                var A = B.pageX - D
            }
            if (!e || Math.abs(z) < Math.abs(A)) {
                if (z > 0) {
                    r(d, y(o) + C)
                }
                if (z < 0) {
                    r(d, -y(o) + C)
                }
            } else {
                if (A > 0) {
                    r(e, y(o) + D)
                }
                if (A < 0) {
                    r(e, -y(o) + D)
                }
            }
        };
        var r = function(z, C, E) {
            var B = f.width() - u;
            var A = 0;
            if (s.range) {
                if (z[0] === d[0]) {
                    B = e.position().left
                } else {
                    A = d.position().left
                }
            }
            if (C >= B) {
                C = B
            } else {
                if (C <= A) {
                    C = A
                }
            }
            if (s.snap && C !== B) {
                var D = y(s.snap);
                C = Math.round(C / D) * D
            }
            z.css({
                left: C,
                position: "absolute"
            });
            if (s.range) {
                w()
            }
            if (E !== false) {
                x()
            }
        };
        var n = function(z) {
            z.stopPropagation();
            z.preventDefault();
            c = a(this)
        };
        var l = function(z) {
            if (c) {
                z.preventDefault();
                var A = z.pageX - f.offset().left;
                r(c, A)
            }
        };
        var w = function() {
            var z = d.position().left;
            var A = e.position().left - z;
            i.css({
                left: z,
                width: A,
                position: "absolute"
            })
        };
        var m = function(z) {
            if (c) {
                c = null;
                s.blur(s.values)
            }
        };
        var x = function() {
            var z;
            if (s.range) {
                z = s.values.slice();
                s.values[0] = t(d);
                s.values[1] = t(e);
                g.val(s.values[0] + "," + s.values[1])
            } else {
                z = s.values;
                s.values = t(d);
                g.val(s.values)
            }
            if (s.values !== z) {
                s.change(s.values)
            }
        };
        var v = function() {
            if (s.values) {
                if (s.range) {
                    r(e, y(s.values[1]), false);
                    r(d, y(s.values[0]), false)
                } else {
                    r(d, y(s.values), false)
                }
            }
            x()
        };
        var t = function(z) {
            var C = f.width() - u;
            var A = z.position().left;
            var B = (A / (C / (s.max - s.min))) + s.min;
            if (s.snap) {
                return Math.floor(B / s.snap) * s.snap
            }
            return Math.round(B)
        };
        var y = function(A) {
            var B = f.width();
            var z = (A * (B / (s.max - s.min))) - s.min;
            return z
        };
        var j = function(z) {
            return Math.max(Math.min(z, s.max), s.min)
        };
        var q = {
            init: function(z) {
                if (a(this).data("TinyRange")) {
                    return this
                }
                k.min = parseFloat(a(this).attr("min"));
                k.max = parseFloat(a(this).attr("max"));
                k.snap = parseFloat(a(this).attr("step"));
                s = a.extend(k, z);
                if (s.values) {} else {
                    if (s.range) {
                        s.values = [0, s.max]
                    } else {
                        s.values = parseFloat(a(this).attr("value"))
                    }
                }
                o = s.snap ? s.snap : s.max / 10;
                f = a("<div/>", {
                    "class": "range-input",
                    style: "width:" + parseInt(a(this).attr("width")) + "px"
                }).mousedown(p);
                h = a("<div/>", {
                    "class": "range-rail"
                }).appendTo(f);
                if (s.range) {
                    i = a("<div/>", {
                        "class": "range-selection"
                    }).appendTo(f)
                }
                if (s.id != "") {
                    d = a("<a/>", {
                        id: s.passedID,
                        "class": "range-handle"
                    }).appendTo(f).mousedown(n)
                } else {
                    d = a("<a/>", {
                        "class": "range-handle"
                    }).appendTo(f).mousedown(n)
                }
                if (s.range) {
                    e = d.clone(true).appendTo(f)
                }
                a(this).after(f);
                a(this).hide();
                g = a(this);
                a(document).bind("mouseup touchend", m);
                a(document).bind("mousemove touchmove", l);
                u = d.width();
                v();
                return this
            },
            set: function(z) {
                if (typeof z === "string") {
                    s.values = j(z)
                } else {
                    if (typeof z === "object" && z.length === 2) {
                        s.values[0] = j(z[0]);
                        s.values[1] = j(z[1])
                    }
                }
                v()
            },
            destroy: function() {
                f.remove();
                a(this).show().data("TinyRange", false);
                a(document).unbind("mouseup touchend", m);
                a(document).unbind("mousemove touchmove", l);
                return this
            }
        };
        return q
    };
    a.fn.range = function(d) {
        var c = arguments;
        return this.each(function() {
            var e = a(this).data("TinyRange");
            if (e && e[d]) {
                e[d].apply(this, Array.prototype.slice.call(c, 1))
            } else {
                if (typeof d === "object" || !d) {
                    var f = (new b(this));
                    f.init.apply(this, c);
                    a(this).data("TinyRange", f)
                } else {
                    a.error("Method " + d + " does not exist on jQuery.range")
                }
            }
        })
    }
})(jQuery);;
dhtmlx = function(c) {
    for (var b in c) {
        dhtmlx[b] = c[b]
    }
    return dhtmlx
};
dhtmlx.extend_api = function(a, d, c) {
    var b = window[a];
    if (!b) {
        return
    }
    window[a] = function(g) {
        if (g && typeof g == "object" && !g.tagName) {
            var f = b.apply(this, (d._init ? d._init(g) : arguments));
            for (var e in dhtmlx) {
                if (d[e]) {
                    this[d[e]](dhtmlx[e])
                }
            }
            for (var e in g) {
                if (d[e]) {
                    this[d[e]](g[e])
                } else {
                    if (e.indexOf("on") == 0) {
                        this.attachEvent(e, g[e])
                    }
                }
            }
        } else {
            var f = b.apply(this, arguments)
        }
        if (d._patch) {
            d._patch(this)
        }
        return f || this
    };
    window[a].prototype = b.prototype;
    if (c) {
        dhtmlXHeir(window[a].prototype, c)
    }
};
dhtmlxAjax = {
    get: function(a, c) {
        var b = new dtmlXMLLoaderObject(true);
        b.async = (arguments.length < 3);
        b.waitCall = c;
        b.loadXML(a);
        return b
    },
    post: function(a, c, d) {
        var b = new dtmlXMLLoaderObject(true);
        b.async = (arguments.length < 4);
        b.waitCall = d;
        b.loadXML(a, true, c);
        return b
    },
    getSync: function(a) {
        return this.get(a, null, true)
    },
    postSync: function(a, b) {
        return this.post(a, b, null, true)
    }
};

function dtmlXMLLoaderObject(b, d, c, a) {
    this.xmlDoc = "";
    if (typeof(c) != "undefined") {
        this.async = c
    } else {
        this.async = true
    }
    this.onloadAction = b || null;
    this.mainObject = d || null;
    this.waitCall = null;
    this.rSeed = a || false;
    return this
}
dtmlXMLLoaderObject.prototype.waitLoadFunction = function(b) {
    var a = true;
    this.check = function() {
        if ((b) && (b.onloadAction != null)) {
            if ((!b.xmlDoc.readyState) || (b.xmlDoc.readyState == 4)) {
                if (!a) {
                    return
                }
                a = false;
                if (typeof b.onloadAction == "function") {
                    b.onloadAction(b.mainObject, null, null, null, b)
                }
                if (b.waitCall) {
                    b.waitCall.call(this, b);
                    b.waitCall = null
                }
            }
        }
    };
    return this.check
};
dtmlXMLLoaderObject.prototype.getXMLTopNode = function(c, a) {
    if (this.xmlDoc.responseXML) {
        var b = this.xmlDoc.responseXML.getElementsByTagName(c);
        if (b.length == 0 && c.indexOf(":") != -1) {
            var b = this.xmlDoc.responseXML.getElementsByTagName((c.split(":"))[1])
        }
        var e = b[0]
    } else {
        var e = this.xmlDoc.documentElement
    }
    if (e) {
        this._retry = false;
        return e
    }
    if ((_isIE) && (!this._retry)) {
        var d = this.xmlDoc.responseText;
        var a = this.xmlDoc;
        this._retry = true;
        this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        this.xmlDoc.async = false;
        this.xmlDoc.loadXML(d);
        return this.getXMLTopNode(c, a)
    }
    dhtmlxError.throwError("LoadXML", "Incorrect XML", [(a || this.xmlDoc), this.mainObject]);
    return document.createElement("DIV")
};
dtmlXMLLoaderObject.prototype.loadXMLString = function(a) {
    if (!_isIE) {
        var b = new DOMParser();
        this.xmlDoc = b.parseFromString(a, "text/xml")
    } else {
        this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        this.xmlDoc.async = this.async;
        this.xmlDoc.onreadystatechange = function() {};
        this.xmlDoc.loadXML(a)
    }
    if (this.onloadAction) {
        this.onloadAction(this.mainObject, null, null, null, this)
    }
    if (this.waitCall) {
        this.waitCall();
        this.waitCall = null
    }
};
dtmlXMLLoaderObject.prototype.loadXML = function(c, b, a, d) {
    if (this.rSeed) {
        c += ((c.indexOf("?") != -1) ? "&" : "?") + "a_dhx_rSeed=" + (new Date()).valueOf()
    }
    this.filePath = c;
    if ((!_isIE) && (window.XMLHttpRequest)) {
        this.xmlDoc = new XMLHttpRequest()
    } else {
        this.xmlDoc = new ActiveXObject("Microsoft.XMLHTTP")
    }
    if (this.async) {
        this.xmlDoc.onreadystatechange = new this.waitLoadFunction(this)
    }
    this.xmlDoc.open(b ? "POST" : "GET", c, this.async);
    if (d) {
        this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 (" + navigator.userAgent + ")");
        this.xmlDoc.setRequestHeader("Content-type", "text/xml")
    } else {
        if (b) {
            this.xmlDoc.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        }
    }
    this.xmlDoc.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    this.xmlDoc.send(null || a);
    if (!this.async) {
        (new this.waitLoadFunction(this))()
    }
};
dtmlXMLLoaderObject.prototype.destructor = function() {
    this._filterXPath = null;
    this._getAllNamedChilds = null;
    this._retry = null;
    this.async = null;
    this.rSeed = null;
    this.filePath = null;
    this.onloadAction = null;
    this.mainObject = null;
    this.xmlDoc = null;
    this.doXPath = null;
    this.doXPathOpera = null;
    this.doXSLTransToObject = null;
    this.doXSLTransToString = null;
    this.loadXML = null;
    this.loadXMLString = null;
    this.doSerialization = null;
    this.xmlNodeToJSON = null;
    this.getXMLTopNode = null;
    this.setXSLParamValue = null;
    return null
};
dtmlXMLLoaderObject.prototype.xmlNodeToJSON = function(d) {
    var c = {};
    for (var b = 0; b < d.attributes.length; b++) {
        c[d.attributes[b].name] = d.attributes[b].value
    }
    c._tagvalue = d.firstChild ? d.firstChild.nodeValue : "";
    for (var b = 0; b < d.childNodes.length; b++) {
        var a = d.childNodes[b].tagName;
        if (a) {
            if (!c[a]) {
                c[a] = []
            }
            c[a].push(this.xmlNodeToJSON(d.childNodes[b]))
        }
    }
    return c
};

function callerFunction(a, b) {
    this.handler = function(c) {
        if (!c) {
            c = window.event
        }
        a(c, b);
        return true
    };
    return this.handler
}

function getAbsoluteLeft(a) {
    return getOffset(a).left
}

function getAbsoluteTop(a) {
    return getOffset(a).top
}

function getOffsetSum(a) {
    var c = 0,
        b = 0;
    while (a) {
        c = c + parseInt(a.offsetTop);
        b = b + parseInt(a.offsetLeft);
        a = a.offsetParent
    }
    return {
        top: c,
        left: b
    }
}

function getOffsetRect(d) {
    var g = d.getBoundingClientRect();
    var h = document.body;
    var b = document.documentElement;
    var a = window.pageYOffset || b.scrollTop || h.scrollTop;
    var e = window.pageXOffset || b.scrollLeft || h.scrollLeft;
    var f = b.clientTop || h.clientTop || 0;
    var i = b.clientLeft || h.clientLeft || 0;
    var j = g.top + a - f;
    var c = g.left + e - i;
    return {
        top: Math.round(j),
        left: Math.round(c)
    }
}

function getOffset(a) {
    if (a.getBoundingClientRect) {
        return getOffsetRect(a)
    } else {
        return getOffsetSum(a)
    }
}

function convertStringToBoolean(a) {
    if (typeof(a) == "string") {
        a = a.toLowerCase()
    }
    switch (a) {
        case "1":
        case "true":
        case "yes":
        case "y":
        case 1:
        case true:
            return true;
            break;
        default:
            return false
    }
}

function getUrlSymbol(a) {
    if (a.indexOf("?") != -1) {
        return "&"
    } else {
        return "?"
    }
}

function dhtmlDragAndDropObject() {
    if (window.dhtmlDragAndDrop) {
        return window.dhtmlDragAndDrop
    }
    this.lastLanding = 0;
    this.dragNode = 0;
    this.dragStartNode = 0;
    this.dragStartObject = 0;
    this.tempDOMU = null;
    this.tempDOMM = null;
    this.waitDrag = 0;
    window.dhtmlDragAndDrop = this;
    return this
}
dhtmlDragAndDropObject.prototype.removeDraggableItem = function(a) {
    a.onmousedown = null;
    a.dragStarter = null;
    a.dragLanding = null
};
dhtmlDragAndDropObject.prototype.addDraggableItem = function(a, b) {
    a.onmousedown = this.preCreateDragCopy;
    a.dragStarter = b;
    this.addDragLanding(a, b)
};
dhtmlDragAndDropObject.prototype.addDragLanding = function(a, b) {
    a.dragLanding = b
};
dhtmlDragAndDropObject.prototype.preCreateDragCopy = function(a) {
    if ((a || window.event) && (a || event).button == 2) {
        return
    }
    if (window.dhtmlDragAndDrop.waitDrag) {
        window.dhtmlDragAndDrop.waitDrag = 0;
        document.body.onmouseup = window.dhtmlDragAndDrop.tempDOMU;
        document.body.onmousemove = window.dhtmlDragAndDrop.tempDOMM;
        return false
    }
    if (window.dhtmlDragAndDrop.dragNode) {
        window.dhtmlDragAndDrop.stopDrag(a)
    }
    window.dhtmlDragAndDrop.waitDrag = 1;
    window.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup;
    window.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove;
    window.dhtmlDragAndDrop.dragStartNode = this;
    window.dhtmlDragAndDrop.dragStartObject = this.dragStarter;
    document.body.onmouseup = window.dhtmlDragAndDrop.preCreateDragCopy;
    document.body.onmousemove = window.dhtmlDragAndDrop.callDrag;
    window.dhtmlDragAndDrop.downtime = new Date().valueOf();
    if ((a) && (a.preventDefault)) {
        a.preventDefault();
        return false
    }
    return false
};
dhtmlDragAndDropObject.prototype.callDrag = function(c) {
    if (!c) {
        c = window.event
    }
    dragger = window.dhtmlDragAndDrop;
    if ((new Date()).valueOf() - dragger.downtime < 100) {
        return
    }
    if (!dragger.dragNode) {
        if (dragger.waitDrag) {
            dragger.dragNode = dragger.dragStartObject._createDragNode(dragger.dragStartNode, c);
            if (!dragger.dragNode) {
                return dragger.stopDrag()
            }
            dragger.dragNode.onselectstart = function() {
                return false
            };
            dragger.gldragNode = dragger.dragNode;
            document.body.appendChild(dragger.dragNode);
            document.body.onmouseup = dragger.stopDrag;
            dragger.waitDrag = 0;
            dragger.dragNode.pWindow = window;
            dragger.initFrameRoute()
        } else {
            return dragger.stopDrag(c, true)
        }
    }
    if (dragger.dragNode.parentNode != window.document.body && dragger.gldragNode) {
        var a = dragger.gldragNode;
        if (dragger.gldragNode.old) {
            a = dragger.gldragNode.old
        }
        a.parentNode.removeChild(a);
        var b = dragger.dragNode.pWindow;
        if (a.pWindow && a.pWindow.dhtmlDragAndDrop.lastLanding) {
            a.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(a.pWindow.dhtmlDragAndDrop.lastLanding)
        }
        if (_isIE) {
            var f = document.createElement("Div");
            f.innerHTML = dragger.dragNode.outerHTML;
            dragger.dragNode = f.childNodes[0]
        } else {
            dragger.dragNode = dragger.dragNode.cloneNode(true)
        }
        dragger.dragNode.pWindow = window;
        dragger.gldragNode.old = dragger.dragNode;
        document.body.appendChild(dragger.dragNode);
        b.dhtmlDragAndDrop.dragNode = dragger.dragNode
    }
    dragger.dragNode.style.left = c.clientX + 15 + (dragger.fx ? dragger.fx * (-1) : 0) + (document.body.scrollLeft || document.documentElement.scrollLeft) + "px";
    dragger.dragNode.style.top = c.clientY + 3 + (dragger.fy ? dragger.fy * (-1) : 0) + (document.body.scrollTop || document.documentElement.scrollTop) + "px";
    if (!c.srcElement) {
        var d = c.target
    } else {
        d = c.srcElement
    }
    dragger.checkLanding(d, c)
};
dhtmlDragAndDropObject.prototype.calculateFramePosition = function(e) {
    if (window.name) {
        var c = parent.frames[window.name].frameElement.offsetParent;
        var d = 0;
        var b = 0;
        while (c) {
            d += c.offsetLeft;
            b += c.offsetTop;
            c = c.offsetParent
        }
        if ((parent.dhtmlDragAndDrop)) {
            var a = parent.dhtmlDragAndDrop.calculateFramePosition(1);
            d += a.split("_")[0] * 1;
            b += a.split("_")[1] * 1
        }
        if (e) {
            return d + "_" + b
        } else {
            this.fx = d
        }
        this.fy = b
    }
    return "0_0"
};
dhtmlDragAndDropObject.prototype.checkLanding = function(b, a) {
    if ((b) && (b.dragLanding)) {
        if (this.lastLanding) {
            this.lastLanding.dragLanding._dragOut(this.lastLanding)
        }
        this.lastLanding = b;
        this.lastLanding = this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, a.clientX, a.clientY, a);
        this.lastLanding_scr = (_isIE ? a.srcElement : a.target)
    } else {
        if ((b) && (b.tagName != "BODY")) {
            this.checkLanding(b.parentNode, a)
        } else {
            if (this.lastLanding) {
                this.lastLanding.dragLanding._dragOut(this.lastLanding, a.clientX, a.clientY, a)
            }
            this.lastLanding = 0;
            if (this._onNotFound) {
                this._onNotFound()
            }
        }
    }
};
dhtmlDragAndDropObject.prototype.stopDrag = function(b, c) {
    dragger = window.dhtmlDragAndDrop;
    if (!c) {
        dragger.stopFrameRoute();
        var a = dragger.lastLanding;
        dragger.lastLanding = null;
        if (a) {
            a.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject, a, (_isIE ? event.srcElement : b.target))
        }
    }
    dragger.lastLanding = null;
    if ((dragger.dragNode) && (dragger.dragNode.parentNode == document.body)) {
        dragger.dragNode.parentNode.removeChild(dragger.dragNode)
    }
    dragger.dragNode = 0;
    dragger.gldragNode = 0;
    dragger.fx = 0;
    dragger.fy = 0;
    dragger.dragStartNode = 0;
    dragger.dragStartObject = 0;
    document.body.onmouseup = dragger.tempDOMU;
    document.body.onmousemove = dragger.tempDOMM;
    dragger.tempDOMU = null;
    dragger.tempDOMM = null;
    dragger.waitDrag = 0
};
dhtmlDragAndDropObject.prototype.stopFrameRoute = function(c) {
    if (c) {
        window.dhtmlDragAndDrop.stopDrag(1, 1)
    }
    for (var a = 0; a < window.frames.length; a++) {
        try {
            if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {
                window.frames[a].dhtmlDragAndDrop.stopFrameRoute(window)
            }
        } catch (b) {}
    }
    try {
        if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {
            parent.dhtmlDragAndDrop.stopFrameRoute(window)
        }
    } catch (b) {}
};
dhtmlDragAndDropObject.prototype.initFrameRoute = function(c, d) {
    if (c) {
        window.dhtmlDragAndDrop.preCreateDragCopy();
        window.dhtmlDragAndDrop.dragStartNode = c.dhtmlDragAndDrop.dragStartNode;
        window.dhtmlDragAndDrop.dragStartObject = c.dhtmlDragAndDrop.dragStartObject;
        window.dhtmlDragAndDrop.dragNode = c.dhtmlDragAndDrop.dragNode;
        window.dhtmlDragAndDrop.gldragNode = c.dhtmlDragAndDrop.dragNode;
        window.document.body.onmouseup = window.dhtmlDragAndDrop.stopDrag;
        window.waitDrag = 0;
        if (((!_isIE) && (d)) && ((!_isFF) || (_FFrv < 1.8))) {
            window.dhtmlDragAndDrop.calculateFramePosition()
        }
    }
    try {
        if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {
            parent.dhtmlDragAndDrop.initFrameRoute(window)
        }
    } catch (b) {}
    for (var a = 0; a < window.frames.length; a++) {
        try {
            if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {
                window.frames[a].dhtmlDragAndDrop.initFrameRoute(window, ((!c || d) ? 1 : 0))
            }
        } catch (b) {}
    }
};
var _isFF = false;
var _isIE = false;
var _isOpera = false;
var _isKHTML = false;
var _isMacOS = false;
var _isChrome = false;
if (navigator.userAgent.indexOf("Macintosh") != -1) {
    _isMacOS = true
}
if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
    _isChrome = true
}
if ((navigator.userAgent.indexOf("Safari") != -1) || (navigator.userAgent.indexOf("Konqueror") != -1)) {
    var _KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari") + 7, 5));
    if (_KHTMLrv > 525) {
        _isFF = true;
        var _FFrv = 1.9
    } else {
        _isKHTML = true
    }
} else {
    if (navigator.userAgent.indexOf("Opera") != -1) {
        _isOpera = true;
        _OperaRv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera") + 6, 3))
    } else {
        if (navigator.appName.indexOf("Microsoft") != -1) {
            _isIE = true;
            if (navigator.appVersion.indexOf("MSIE 8.0") != -1 && document.compatMode != "BackCompat") {
                _isIE = 8
            }
            if (navigator.appVersion.indexOf("MSIE 9.0") != -1 && document.compatMode != "BackCompat") {
                _isIE = 8
            }
            if (navigator.appVersion.indexOf("MSIE 9.0") != -1 && document.compatMode != "BackCompat") {
                _isIE = 8
            }
        } else {
            _isFF = true;
            var _FFrv = parseFloat(navigator.userAgent.split("rv:")[1])
        }
    }
}
dtmlXMLLoaderObject.prototype.doXPath = function(c, e, d, i) {
    if (_isKHTML || (!_isIE && !window.XPathResult)) {
        return this.doXPathOpera(c, e)
    }
    if (_isIE) {
        if (!e) {
            if (!this.xmlDoc.nodeName) {
                e = this.xmlDoc.responseXML
            } else {
                e = this.xmlDoc
            }
        }
        if (!e) {
            dhtmlxError.throwError("LoadXML", "Incorrect XML", [(e || this.xmlDoc), this.mainObject])
        }
        if (d != null) {
            e.setProperty("SelectionNamespaces", "xmlns:xsl='" + d + "'")
        }
        if (i == "single") {
            return e.selectSingleNode(c)
        } else {
            return e.selectNodes(c) || new Array(0)
        }
    } else {
        var a = e;
        if (!e) {
            if (!this.xmlDoc.nodeName) {
                e = this.xmlDoc.responseXML
            } else {
                e = this.xmlDoc
            }
        }
        if (!e) {
            dhtmlxError.throwError("LoadXML", "Incorrect XML", [(e || this.xmlDoc), this.mainObject])
        }
        if (e.nodeName.indexOf("document") != -1) {
            a = e
        } else {
            a = e;
            e = e.ownerDocument
        }
        var g = XPathResult.ANY_TYPE;
        if (i == "single") {
            g = XPathResult.FIRST_ORDERED_NODE_TYPE
        }
        var f = new Array();
        var b = e.evaluate(c, a, function(j) {
            return d
        }, g, null);
        if (g == XPathResult.FIRST_ORDERED_NODE_TYPE) {
            return b.singleNodeValue
        }
        var h = b.iterateNext();
        while (h) {
            f[f.length] = h;
            h = b.iterateNext()
        }
        return f
    }
};

function _dhtmlxError(b, a, c) {
    if (!this.catches) {
        this.catches = new Array()
    }
    return this
}
_dhtmlxError.prototype.catchError = function(b, a) {
    this.catches[b] = a
};
_dhtmlxError.prototype.throwError = function(b, a, c) {
    if (this.catches[b]) {
        return this.catches[b](b, a, c)
    }
    if (this.catches.ALL) {
        return this.catches.ALL(b, a, c)
    }
    alert("Error type: " + arguments[0] + "\nDescription: " + arguments[1]);
    return null
};
window.dhtmlxError = new _dhtmlxError();
dtmlXMLLoaderObject.prototype.doXPathOpera = function(c, a) {
    var e = c.replace(/[\/]+/gi, "/").split("/");
    var d = null;
    var b = 1;
    if (!e.length) {
        return []
    }
    if (e[0] == ".") {
        d = [a]
    } else {
        if (e[0] == "") {
            d = (this.xmlDoc.responseXML || this.xmlDoc).getElementsByTagName(e[b].replace(/\[[^\]]*\]/g, ""));
            b++
        } else {
            return []
        }
    }
    for (b; b < e.length; b++) {
        d = this._getAllNamedChilds(d, e[b])
    }
    if (e[b - 1].indexOf("[") != -1) {
        d = this._filterXPath(d, e[b - 1])
    }
    return d
};
dtmlXMLLoaderObject.prototype._filterXPath = function(e, d) {
    var g = new Array();
    var d = d.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, "");
    for (var f = 0; f < e.length; f++) {
        if (e[f].getAttribute(d)) {
            g[g.length] = e[f]
        }
    }
    return g
};
dtmlXMLLoaderObject.prototype._getAllNamedChilds = function(e, d) {
    var h = new Array();
    if (_isKHTML) {
        d = d.toUpperCase()
    }
    for (var g = 0; g < e.length; g++) {
        for (var f = 0; f < e[g].childNodes.length; f++) {
            if (_isKHTML) {
                if (e[g].childNodes[f].tagName && e[g].childNodes[f].tagName.toUpperCase() == d) {
                    h[h.length] = e[g].childNodes[f]
                }
            } else {
                if (e[g].childNodes[f].tagName == d) {
                    h[h.length] = e[g].childNodes[f]
                }
            }
        }
    }
    return h
};

function dhtmlXHeir(e, d) {
    for (var f in d) {
        if (typeof(d[f]) == "function") {
            e[f] = d[f]
        }
    }
    return e
}

function dhtmlxEvent(b, c, a) {
    if (b.addEventListener) {
        b.addEventListener(c, a, false)
    } else {
        if (b.attachEvent) {
            b.attachEvent("on" + c, a)
        }
    }
}
dtmlXMLLoaderObject.prototype.xslDoc = null;
dtmlXMLLoaderObject.prototype.setXSLParamValue = function(b, c, d) {
    if (!d) {
        d = this.xslDoc
    }
    if (d.responseXML) {
        d = d.responseXML
    }
    var a = this.doXPath("/xsl:stylesheet/xsl:variable[@name='" + b + "']", d, "http://www.w3.org/1999/XSL/Transform", "single");
    if (a != null) {
        a.firstChild.nodeValue = c
    }
};
dtmlXMLLoaderObject.prototype.doXSLTransToObject = function(d, b) {
    if (!d) {
        d = this.xslDoc
    }
    if (d.responseXML) {
        d = d.responseXML
    }
    if (!b) {
        b = this.xmlDoc
    }
    if (b.responseXML) {
        b = b.responseXML
    }
    if (!_isIE) {
        if (!this.XSLProcessor) {
            this.XSLProcessor = new XSLTProcessor();
            this.XSLProcessor.importStylesheet(d)
        }
        var a = this.XSLProcessor.transformToDocument(b)
    } else {
        var a = new ActiveXObject("Msxml2.DOMDocument.3.0");
        try {
            b.transformNodeToObject(d, a)
        } catch (c) {
            a = b.transformNode(d)
        }
    }
    return a
};
dtmlXMLLoaderObject.prototype.doXSLTransToString = function(c, b) {
    var a = this.doXSLTransToObject(c, b);
    if (typeof(a) == "string") {
        return a
    }
    return this.doSerialization(a)
};
dtmlXMLLoaderObject.prototype.doSerialization = function(b) {
    if (!b) {
        b = this.xmlDoc
    }
    if (b.responseXML) {
        b = b.responseXML
    }
    if (!_isIE) {
        var a = new XMLSerializer();
        return a.serializeToString(b)
    } else {
        return b.xml
    }
};
dhtmlxEventable = function(obj) {
    obj.attachEvent = function(name, catcher, callObj) {
        name = "ev_" + name.toLowerCase();
        if (!this[name]) {
            this[name] = new this.eventCatcher(callObj || this)
        }
        return (name + ":" + this[name].addEvent(catcher))
    };
    obj.callEvent = function(name, arg0) {
        name = "ev_" + name.toLowerCase();
        if (this[name]) {
            return this[name].apply(this, arg0)
        }
        return true
    };
    obj.checkEvent = function(name) {
        return (!!this["ev_" + name.toLowerCase()])
    };
    obj.eventCatcher = function(obj) {
        var dhx_catch = [];
        var z = function() {
            var res = true;
            for (var i = 0; i < dhx_catch.length; i++) {
                if (dhx_catch[i] != null) {
                    var zr = dhx_catch[i].apply(obj, arguments);
                    res = res && zr
                }
            }
            return res
        };
        z.addEvent = function(ev) {
            if (typeof(ev) != "function") {
                ev = eval(ev)
            }
            if (ev) {
                return dhx_catch.push(ev) - 1
            }
            return false
        };
        z.removeEvent = function(id) {
            dhx_catch[id] = null
        };
        return z
    };
    obj.detachEvent = function(id) {
        if (id != false) {
            var list = id.split(":");
            this[list[0]].removeEvent(list[1])
        }
    };
    obj.detachAllEvents = function() {
        for (var name in this) {
            if (name.indexOf("ev_") == 0) {
                delete this[name]
            }
        }
    }
};;
var globalActiveDHTMLGridObject;
String.prototype._dhx_trim = function() {
    return this.replace(/&nbsp;/g, " ").replace(/(^[ \t]*)|([ \t]*$)/g, "")
};

function dhtmlxArray(a) {
    return dhtmlXHeir((a || new Array()), dhtmlxArray._master)
}
dhtmlxArray._master = {
    _dhx_find: function(b) {
        for (var a = 0; a < this.length; a++) {
            if (b == this[a]) {
                return a
            }
        }
        return -1
    },
    _dhx_insertAt: function(c, b) {
        this[this.length] = null;
        for (var a = this.length - 1; a >= c; a--) {
            this[a] = this[a - 1]
        }
        this[c] = b
    },
    _dhx_removeAt: function(a) {
        this.splice(a, 1)
    },
    _dhx_swapItems: function(a, c) {
        var b = this[a];
        this[a] = this[c];
        this[c] = b
    }
};

function dhtmlXGridObject(id) {
    if (_isIE) {
        try {
            document.execCommand("BackgroundImageCache", false, true)
        } catch (e) {}
    }
    if (id) {
        if (typeof(id) == "object") {
            this.entBox = id;
            this.entBox.id = "cgrid2_" + this.uid()
        } else {
            this.entBox = document.getElementById(id)
        }
    } else {
        this.entBox = document.createElement("DIV");
        this.entBox.id = "cgrid2_" + this.uid()
    }
    this.entBox.innerHTML = "";
    dhtmlxEventable(this);
    var self = this;
    this._wcorr = 0;
    this.cell = null;
    this.row = null;
    this.iconURL = "";
    this.editor = null;
    this._f2kE = true;
    this._dclE = true;
    this.combos = new Array(0);
    this.defVal = new Array(0);
    this.rowsAr = {};
    this.rowsBuffer = dhtmlxArray();
    this.rowsCol = dhtmlxArray();
    this._data_cache = {};
    this._ecache = {};
    this._ud_enabled = true;
    this.xmlLoader = new dtmlXMLLoaderObject(this.doLoadDetails, this, true, this.no_cashe);
    this._maskArr = [];
    this.selectedRows = dhtmlxArray();
    this.UserData = {};
    this._sizeFix = this._borderFix = 0;
    this.entBox.className += " gridbox";
    this.entBox.style.width = this.entBox.getAttribute("width") || (window.getComputedStyle ? (this.entBox.style.width || window.getComputedStyle(this.entBox, null)["width"]) : (this.entBox.currentStyle ? this.entBox.currentStyle.width : this.entBox.style.width || 0)) || "100%";
    this.entBox.style.height = this.entBox.getAttribute("height") || (window.getComputedStyle ? (this.entBox.style.height || window.getComputedStyle(this.entBox, null)["height"]) : (this.entBox.currentStyle ? this.entBox.currentStyle.height : this.entBox.style.height || 0)) || "100%";
    this.entBox.style.cursor = "default";
    this.entBox.onselectstart = function() {
        return false
    };
    var t_creator = function(name) {
        var t = document.createElement("TABLE");
        t.cellSpacing = t.cellPadding = 0;
        t.style.cssText = "width:100%;table-layout:fixed;";
        t.className = name.substr(2);
        return t
    };
    this.obj = t_creator("c_obj");
    this.hdr = t_creator("c_hdr");
    this.hdr.style.marginRight = "20px";
    this.hdr.style.paddingRight = "20px";
    this.objBox = document.createElement("DIV");
    this.objBox.style.width = "100%";
    this.objBox.style.overflow = "auto";
    this.objBox.appendChild(this.obj);
    this.objBox.className = "objbox";
    this.hdrBox = document.createElement("DIV");
    this.hdrBox.style.width = "100%";
    this.hdrBox.style.height = "25px";
    this.hdrBox.style.overflow = "hidden";
    this.hdrBox.className = "xhdr";
    this.preloadImagesAr = new Array(0);
    this.sortImg = document.createElement("IMG");
    this.sortImg.style.display = "none";
    this.hdrBox.appendChild(this.sortImg);
    this.hdrBox.appendChild(this.hdr);
    this.hdrBox.style.position = "relative";
    this.entBox.appendChild(this.hdrBox);
    this.entBox.appendChild(this.objBox);
    this.entBox.grid = this;
    this.objBox.grid = this;
    this.hdrBox.grid = this;
    this.obj.grid = this;
    this.hdr.grid = this;
    this.cellWidthPX = [];
    this.cellWidthPC = [];
    this.cellWidthType = this.entBox.cellwidthtype || "px";
    this.delim = this.entBox.delimiter || ",";
    this._csvDelim = ",";
    this.hdrLabels = [];
    this.columnIds = [];
    this.columnColor = [];
    this._hrrar = [];
    this.cellType = dhtmlxArray();
    this.cellAlign = [];
    this.initCellWidth = [];
    this.fldSort = [];
    this._srdh = (_isIE && (document.compatMode != "BackCompat") ? 24 : 20);
    this.imgURL = window.dhx_globalImgPath || "";
    this.isActive = false;
    this.isEditable = true;
    this.useImagesInHeader = false;
    this.pagingOn = false;
    this.rowsBufferOutSize = 0;
    dhtmlxEvent(window, "unload", function() {
        try {
            if (self.destructor) {
                self.destructor()
            }
        } catch (e) {}
    });
    this.setSkin = function(name) {
        this.skin_name = name;
        this.entBox.className = "gridbox gridbox_" + name;
        this.skin_h_correction = 0;
        this.enableAlterCss("ev_" + name, "odd_" + name, this.isTreeGrid());
        this._fixAlterCss();
        switch (name) {
            case "clear":
                this._topMb = document.createElement("DIV");
                this._topMb.className = "topMumba";
                this._topMb.innerHTML = "<img style='left:0px' src='" + this.imgURL + "skinC_top_left.gif'><img style='right:20px' src='" + this.imgURL + "skinC_top_right.gif'>";
                this.entBox.appendChild(this._topMb);
                this._botMb = document.createElement("DIV");
                this._botMb.className = "bottomMumba";
                this._botMb.innerHTML = "<img style='left:0px' src='" + this.imgURL + "skinD_bottom_left.gif'><img style='right:20px' src='" + this.imgURL + "skinD_bottom_right.gif'>";
                this.entBox.appendChild(this._botMb);
                this.entBox.style.position = "relative";
                this.skin_h_correction = 20;
                break;
            case "dhx_skyblue":
            case "dhx_web":
            case "glassy_blue":
            case "dhx_black":
            case "dhx_blue":
            case "modern":
            case "light":
                this._srdh = 20;
                this.forceDivInHeader = true;
                break;
            case "xp":
                this.forceDivInHeader = true;
                if ((_isIE) && (document.compatMode != "BackCompat")) {
                    this._srdh = 25
                } else {
                    this._srdh = 22
                }
                break;
            case "mt":
                if ((_isIE) && (document.compatMode != "BackCompat")) {
                    this._srdh = 25
                } else {
                    this._srdh = 22
                }
                break;
            case "gray":
                if ((_isIE) && (document.compatMode != "BackCompat")) {
                    this._srdh = 22
                }
                break;
            case "sbdark":
                break
        }
        if (_isIE && this.hdr) {
            var d = this.hdr.parentNode;
            d.removeChild(this.hdr);
            d.appendChild(this.hdr)
        }
        this.setSizes()
    };
    if (_isIE) {
        this.preventIECaching(true)
    }
    if (window.dhtmlDragAndDropObject) {
        this.dragger = new dhtmlDragAndDropObject()
    }
    this._doOnScroll = function(e, mode) {
        this.callEvent("onScroll", [this.objBox.scrollLeft, this.objBox.scrollTop]);
        this.doOnScroll(e, mode)
    };
    this.doOnScroll = function(e, mode) {
        this.hdrBox.scrollLeft = this.objBox.scrollLeft;
        if (this.ftr) {
            this.ftr.parentNode.scrollLeft = this.objBox.scrollLeft
        }
        if (mode) {
            return
        }
        if (this._srnd) {
            if (this._dLoadTimer) {
                window.clearTimeout(this._dLoadTimer)
            }
            this._dLoadTimer = window.setTimeout(function() {
                if (self._update_srnd_view) {
                    self._update_srnd_view()
                }
            }, 100)
        }
    };
    this.attachToObject = function(obj) {
        obj.appendChild(this.globalBox ? this.globalBox : this.entBox);
        this.setSizes()
    };
    this.init = function(fl) {
        if ((this.isTreeGrid()) && (!this._h2)) {
            this._h2 = new dhtmlxHierarchy();
            if ((this._fake) && (!this._realfake)) {
                this._fake._h2 = this._h2
            }
            this._tgc = {
                imgURL: null
            }
        }
        if (!this._hstyles) {
            return
        }
        this.editStop();
        this.lastClicked = null;
        this.resized = null;
        this.fldSorted = this.r_fldSorted = null;
        this.cellWidthPX = [];
        this.cellWidthPC = [];
        if (this.hdr.rows.length > 0) {
            this.clearAll(true)
        }
        var hdrRow = this.hdr.insertRow(0);
        for (var i = 0; i < this.hdrLabels.length; i++) {
            hdrRow.appendChild(document.createElement("TH"));
            hdrRow.childNodes[i]._cellIndex = i;
            hdrRow.childNodes[i].style.height = "0px"
        }
        if (_isIE && _isIE < 8) {
            hdrRow.style.position = "absolute"
        } else {
            hdrRow.style.height = "auto"
        }
        var hdrRow = this.hdr.insertRow(_isKHTML ? 2 : 1);
        hdrRow._childIndexes = new Array();
        var col_ex = 0;
        for (var i = 0; i < this.hdrLabels.length; i++) {
            hdrRow._childIndexes[i] = i - col_ex;
            if ((this.hdrLabels[i] == this.splitSign) && (i != 0)) {
                if (_isKHTML) {
                    hdrRow.insertCell(i - col_ex)
                }
                hdrRow.cells[i - col_ex - 1].colSpan = (hdrRow.cells[i - col_ex - 1].colSpan || 1) + 1;
                hdrRow.childNodes[i - col_ex - 1]._cellIndex++;
                col_ex++;
                hdrRow._childIndexes[i] = i - col_ex;
                continue
            }
            hdrRow.insertCell(i - col_ex);
            hdrRow.childNodes[i - col_ex]._cellIndex = i;
            hdrRow.childNodes[i - col_ex]._cellIndexS = i;
            this.setColumnLabel(i, this.hdrLabels[i])
        }
        if (col_ex == 0) {
            hdrRow._childIndexes = null
        }
        this._cCount = this.hdrLabels.length;
        if (_isIE) {
            window.setTimeout(function() {
                self.setSizes()
            }, 1)
        }
        if (!this.obj.firstChild) {
            this.obj.appendChild(document.createElement("TBODY"))
        }
        var tar = this.obj.firstChild;
        if (!tar.firstChild) {
            tar.appendChild(document.createElement("TR"));
            tar = tar.firstChild;
            if (_isIE && _isIE < 8) {
                tar.style.position = "absolute"
            } else {
                tar.style.height = "auto"
            }
            for (var i = 0; i < this.hdrLabels.length; i++) {
                tar.appendChild(document.createElement("TH"));
                tar.childNodes[i].style.height = "0px"
            }
        }
        this._c_order = null;
        if (this.multiLine != true) {
            this.obj.className += " row20px"
        }
        this.sortImg.style.position = "absolute";
        this.sortImg.style.display = "none";
        this.sortImg.typ = "d";
        this.sortImg.src = "data:image/gif;base64,R0lGODlhCQAIAJEAAP///8HBwYCAgP///yH5BAUUAAMALAAAAAAJAAgAAAITnI4CFu3L3pjCBUgbznd6s31fAQA7";
        this.sortImg.defLeft = 0;
        if (this.noHeader) {
            this.hdrBox.style.display = "none"
        } else {
            this.noHeader = false
        }
        if (this._ivizcol) {
            this.setColHidden()
        }
        this.attachHeader();
        this.attachHeader(0, 0, "_aFoot");
        this.setSizes();
        if (fl) {
            this.parseXML()
        }
        this.obj.scrollTop = 0;
        if (this.dragAndDropOff) {
            this.dragger.addDragLanding(this.entBox, this)
        }
        if (this._initDrF) {
            this._initD()
        }
        if (this._init_point) {
            this._init_point()
        }
    };
    this.setColumnSizes = function(gridWidth) {
        var summ = 0;
        var fcols = [];
        for (var i = 0; i < this._cCount; i++) {
            if ((this.initCellWidth[i] == "*") && !this._hrrar[i]) {
                this._awdth = false;
                fcols.push(i);
                continue
            }
            if (this.cellWidthType == "%") {
                if (typeof this.cellWidthPC[i] == "undefined") {
                    this.cellWidthPC[i] = this.initCellWidth[i]
                }
                this.cellWidthPX[i] = Math.floor(gridWidth * this.cellWidthPC[i] / 100) || 0
            } else {
                if (typeof this.cellWidthPX[i] == "undefined") {
                    this.cellWidthPX[i] = this.initCellWidth[i]
                }
            }
            if (!this._hrrar[i]) {
                summ += this.cellWidthPX[i] * 1
            }
        }
        if (fcols.length) {
            var ms = Math.floor((gridWidth - summ) / fcols.length);
            if (ms < 0) {
                ms = 1
            }
            for (var i = 0; i < fcols.length; i++) {
                var next = Math.max((this._drsclmW ? this._drsclmW[fcols[i]] : 0), ms);
                this.cellWidthPX[fcols[i]] = next;
                summ += next
            }
            if (gridWidth > summ) {
                var last = fcols[fcols.length - 1];
                this.cellWidthPX[last] = this.cellWidthPX[last] + (gridWidth - summ);
                summ = gridWidth
            }
            this._setAutoResize()
        }
        this.obj.style.width = summ + "px";
        this.hdr.style.width = summ + "px";
        if (this.ftr) {
            this.ftr.style.width = summ + "px"
        }
        this.chngCellWidth();
        return summ
    };
    this.setSizes = function() {
        if ((!this.hdr.rows[0])) {
            return
        }
        var quirks = this.quirks = (_isIE && document.compatMode == "BackCompat");
        var outerBorder = (this.entBox.offsetWidth - this.entBox.clientWidth) / 2;
        if (this.globalBox) {
            var splitOuterBorder = (this.globalBox.offsetWidth - this.globalBox.clientWidth) / 2;
            if (this._delta_x && !this._realfake) {
                var ow = this.globalBox.clientWidth;
                this.globalBox.style.width = this._delta_x;
                this.entBox.style.width = Math.max(0, (this.globalBox.clientWidth + (quirks ? splitOuterBorder * 2 : 0)) - this._fake.entBox.clientWidth) + "px";
                if (ow != this.globalBox.clientWidth) {
                    this._fake._correctSplit(this._fake.entBox.clientWidth)
                }
            }
            if (this._delta_y && !this._realfake) {
                this.globalBox.style.height = this._delta_y;
                this.entBox.style.overflow = this._fake.entBox.style.overflow = "hidden";
                this.entBox.style.height = this._fake.entBox.style.height = this.globalBox.clientHeight + (quirks ? splitOuterBorder * 2 : 0) + "px"
            }
        } else {
            if (this._delta_x) {
                if (this.entBox.parentNode.tagName == "TD") {
                    this.entBox.style.width = "1px";
                    this.entBox.style.width = parseInt(this._delta_x) * this.entBox.parentNode.clientWidth / 100 - outerBorder * 2 + "px"
                } else {
                    this.entBox.style.width = this._delta_x
                }
            }
            if (this._delta_y) {
                this.entBox.style.height = this._delta_y
            }
        }
        window.clearTimeout(this._sizeTime);
        if (!this.entBox.offsetWidth && (!this.globalBox || !this.globalBox.offsetWidth)) {
            this._sizeTime = window.setTimeout(function() {
                self.setSizes()
            }, 250);
            return
        }
        var border_x = (((this.entBox.cmp || this._delta_x) && (this.skin_name || "").indexOf("dhx") == 0 && !quirks) ? 2 : 0);
        var border_y = (((this.entBox.cmp || this._delta_y) && (this.skin_name || "").indexOf("dhx") == 0 && !quirks) ? 2 : 0);
        var isVScroll = this.parentGrid ? false : (this.objBox.scrollHeight > this.objBox.offsetHeight);
        var scrfix = _isFF ? 18 : 18;
        var gridWidth = this.entBox.clientWidth - (this.skin_h_correction || 0) * (quirks ? 0 : 1) - border_x;
        var gridWidthActive = this.entBox.clientWidth - (this.skin_h_correction || 0) - border_x;
        var gridHeight = this.entBox.clientHeight - border_y;
        var summ = this.setColumnSizes(gridWidthActive - (isVScroll ? scrfix : 0));
        var isHScroll = this.parentGrid ? false : ((this.objBox.scrollWidth > this.objBox.offsetWidth) || (this.objBox.style.overflowX == "scroll"));
        var headerHeight = this.hdr.clientHeight;
        var footerHeight = this.ftr ? this.ftr.clientHeight : 0;
        var newWidth = gridWidth;
        var newHeight = gridHeight - headerHeight - footerHeight;
        if (this._awdth && this._awdth[0] && this._awdth[1] == 99999) {
            isHScroll = 0
        }
        if (this._ahgr) {
            if (this._ahgrMA) {
                newHeight = this.entBox.parentNode.clientHeight - headerHeight - footerHeight
            } else {
                newHeight = this.obj.offsetHeight + (isHScroll ? scrfix : 0)
            }
            if (this._ahgrM) {
                if (this._ahgrF) {
                    newHeight = Math.min(this._ahgrM, newHeight + headerHeight + footerHeight) - headerHeight - footerHeight
                } else {
                    newHeight = Math.min(this._ahgrM, newHeight)
                }
            }
            if (isVScroll && newHeight >= this.obj.scrollHeight + (isHScroll ? scrfix : 0)) {
                isVScroll = false;
                this.setColumnSizes(gridWidthActive)
            }
        }
        if ((this._awdth) && (this._awdth[0])) {
            if (this.cellWidthType == "%") {
                this.cellWidthType = "px"
            }
            if (this._fake) {
                summ += this._fake.entBox.clientWidth
            }
            var newWidth = Math.min(Math.max(summ + (isVScroll ? scrfix : 0), this._awdth[2]), this._awdth[1]);
            if (this._fake) {
                newWidth -= this._fake.entBox.clientWidth
            }
        }
        newHeight = Math.max(0, newHeight);
        this._ff_size_delta = (this._ff_size_delta == 0.1) ? 0.2 : 0.1;
        if (!_isFF) {
            this._ff_size_delta = 0
        }
        this.entBox.style.width = newWidth + (quirks ? 2 : 0) * outerBorder + this._ff_size_delta + "px";
        this.entBox.style.height = newHeight + (quirks ? 2 : 0) * outerBorder + headerHeight + footerHeight + "px";
        this.objBox.style.height = newHeight + ((quirks && !isVScroll) ? 2 : 0) * outerBorder + "px";
        this.hdrBox.style.height = headerHeight + "px";
        if (newHeight != gridHeight) {
            this.doOnScroll(0, !this._srnd)
        }
        var ext = this["setSizes_" + this.skin_name];
        if (ext) {
            ext.call(this)
        }
        this.setSortImgPos();
        if (headerHeight != this.hdr.clientHeight && this._ahgr) {
            this.setSizes()
        }
    };
    this.setSizes_clear = function() {
        var y = this.hdr.offsetHeight;
        var x = this.entBox.offsetWidth;
        var y2 = y + this.objBox.offsetHeight;
        this._topMb.style.top = (y || 0) + "px";
        this._topMb.style.width = (x + 20) + "px";
        this._botMb.style.top = (y2 - 3) + "px";
        this._botMb.style.width = (x + 20) + "px"
    };
    this.chngCellWidth = function() {
        if ((_isOpera) && (this.ftr)) {
            this.ftr.width = this.objBox.scrollWidth + "px"
        }
        var l = this._cCount;
        for (var i = 0; i < l; i++) {
            this.hdr.rows[0].cells[i].style.width = this.cellWidthPX[i] + "px";
            this.obj.rows[0].childNodes[i].style.width = this.cellWidthPX[i] + "px";
            if (this.ftr) {
                this.ftr.rows[0].cells[i].style.width = this.cellWidthPX[i] + "px"
            }
        }
    };
    this.setDelimiter = function(delim) {
        this.delim = delim
    };
    this.setInitWidthsP = function(wp) {
        this.cellWidthType = "%";
        this.initCellWidth = wp.split(this.delim.replace(/px/gi, ""));
        if (!arguments[1]) {
            this._setAutoResize()
        }
    };
    this._setAutoResize = function() {
        if (this._realfake) {
            return
        }
        var el = window;
        var self = this;
        dhtmlxEvent(window, "resize", function() {
            window.clearTimeout(self._resize_timer);
            if (self._setAutoResize) {
                self._resize_timer = window.setTimeout(function() {
                    self.setSizes();
                    if (self._fake) {
                        self._fake._correctSplit()
                    }
                }, 100)
            }
        })
    };
    this.setInitWidths = function(wp) {
        this.cellWidthType = "px";
        this.initCellWidth = wp.split(this.delim);
        if (_isFF) {
            for (var i = 0; i < this.initCellWidth.length; i++) {
                if (this.initCellWidth[i] != "*") {
                    this.initCellWidth[i] = parseInt(this.initCellWidth[i])
                }
            }
        }
    };
    this.enableMultiline = function(state) {
        this.multiLine = convertStringToBoolean(state)
    };
    this.enableMultiselect = function(state) {
        this.selMultiRows = convertStringToBoolean(state)
    };
    this.setImagePath = function(path) {
        this.imgURL = path
    };
    this.setImagesPath = this.setImagePath;
    this.setIconPath = function(path) {
        this.iconURL = path
    };
    this.setIconsPath = this.setIconPath;
    this.changeCursorState = function(ev) {
        var el = ev.target || ev.srcElement;
        if (el.tagName != "TD") {
            el = this.getFirstParentOfType(el, "TD")
        }
        if (!el) {
            return
        }
        if ((el.tagName == "TD") && (this._drsclmn) && (!this._drsclmn[el._cellIndex])) {
            return el.style.cursor = "default"
        }
        var check = (ev.layerX || 0) + (((!_isIE) && (ev.target.tagName == "DIV")) ? el.offsetLeft : 0);
        if ((el.offsetWidth - (ev.offsetX || (parseInt(this.getPosition(el, this.hdrBox)) - check) * -1)) < (_isOpera ? 20 : 10)) {
            el.style.cursor = "E-resize"
        } else {
            el.style.cursor = "default"
        }
        if (_isOpera) {
            this.hdrBox.scrollLeft = this.objBox.scrollLeft
        }
    };
    this.startColResize = function(ev) {
        if (this.resized) {
            this.stopColResize()
        }
        this.resized = null;
        var el = ev.target || ev.srcElement;
        if (el.tagName != "TD") {
            el = this.getFirstParentOfType(el, "TD")
        }
        var x = ev.clientX;
        var tabW = this.hdr.offsetWidth;
        var startW = parseInt(el.offsetWidth);
        if (el.tagName == "TD" && el.style.cursor != "default") {
            if ((this._drsclmn) && (!this._drsclmn[el._cellIndex])) {
                return
            }
            self._old_d_mm = document.body.onmousemove;
            self._old_d_mu = document.body.onmouseup;
            document.body.onmousemove = function(e) {
                if (self) {
                    self.doColResize(e || window.event, el, startW, x, tabW)
                }
            };
            document.body.onmouseup = function() {
                if (self) {
                    self.stopColResize()
                }
            }
        }
    };
    this.stopColResize = function() {
        document.body.onmousemove = self._old_d_mm || "";
        document.body.onmouseup = self._old_d_mu || "";
        this.setSizes();
        this.doOnScroll(0, 1);
        this.callEvent("onResizeEnd", [this])
    };
    this.doColResize = function(ev, el, startW, x, tabW) {
        el.style.cursor = "E-resize";
        this.resized = el;
        var fcolW = startW + (ev.clientX - x);
        var wtabW = tabW + (ev.clientX - x);
        if (!(this.callEvent("onResize", [el._cellIndex, fcolW, this]))) {
            return
        }
        if (_isIE) {
            this.objBox.scrollLeft = this.hdrBox.scrollLeft
        }
        if (el.colSpan > 1) {
            var a_sizes = new Array();
            for (var i = 0; i < el.colSpan; i++) {
                a_sizes[i] = Math.round(fcolW * this.hdr.rows[0].childNodes[el._cellIndexS + i].offsetWidth / el.offsetWidth)
            }
            for (var i = 0; i < el.colSpan; i++) {
                this._setColumnSizeR(el._cellIndexS + i * 1, a_sizes[i])
            }
        } else {
            this._setColumnSizeR(el._cellIndex, fcolW)
        }
        this.doOnScroll(0, 1);
        this.setSizes();
        if (this._fake && this._awdth) {
            this._fake._correctSplit()
        }
    };
    this._setColumnSizeR = function(ind, fcolW) {
        if (fcolW > ((this._drsclmW && !this._notresize) ? (this._drsclmW[ind] || 10) : 10)) {
            this.obj.rows[0].childNodes[ind].style.width = fcolW + "px";
            this.hdr.rows[0].childNodes[ind].style.width = fcolW + "px";
            if (this.ftr) {
                this.ftr.rows[0].childNodes[ind].style.width = fcolW + "px"
            }
            if (this.cellWidthType == "px") {
                this.cellWidthPX[ind] = fcolW
            } else {
                var gridWidth = parseInt(this.entBox.offsetWidth);
                if (this.objBox.scrollHeight > this.objBox.offsetHeight) {
                    gridWidth -= 17
                }
                var pcWidth = Math.round(fcolW / gridWidth * 100);
                this.cellWidthPC[ind] = pcWidth
            }
            if (this.sortImg.style.display != "none") {
                this.setSortImgPos()
            }
        }
    };
    this.setSortImgState = function(state, ind, order, row) {
        order = (order || "asc").toLowerCase();
        if (!convertStringToBoolean(state)) {
            this.sortImg.style.display = "none";
            this.fldSorted = null;
            return
        }
        if (order == "asc") {
            this.sortImg.typ = "a";
            this.sortImg.src = "data:image/gif;base64,R0lGODlhCQAIAJEAAP///8HBwYCAgP///yH5BAUUAAMALAAAAAAJAAgAAAIUnAWmIxG52ovOQVYnzhOBDy7iUAAAOw=="
        } else {
            this.sortImg.typ = "d";
            this.sortImg.src = "data:image/gif;base64,R0lGODlhCQAIAJEAAP///8HBwYCAgP///yH5BAUUAAMALAAAAAAJAAgAAAITnI4CFu3L3pjCBUgbznd6s31fAQA7"
        }
        this.sortImg.style.display = "";
        this.fldSorted = this.hdr.rows[0].childNodes[ind];
        var r = this.hdr.rows[row || 1];
        if (!r) {
            return
        }
        for (var i = 0; i < r.childNodes.length; i++) {
            if (r.childNodes[i]._cellIndexS == ind) {
                this.r_fldSorted = r.childNodes[i];
                return this.setSortImgPos()
            }
        }
        return this.setSortImgState(state, ind, order, (row || 1) + 1)
    };
    this.setSortImgPos = function(ind, mode, hRowInd, el) {
        if (this._hrrar && this._hrrar[this.r_fldSorted ? this.r_fldSorted._cellIndex : ind]) {
            return
        }
        if (!el) {
            if (!ind) {
                var el = this.r_fldSorted
            } else {
                var el = this.hdr.rows[hRowInd || 0].cells[ind]
            }
        }
        if (el != null) {
            var pos = this.getPosition(el, this.hdrBox);
            var wdth = el.offsetWidth;
            this.sortImg.style.left = Number(pos[0] + wdth - 13) + "px";
            this.sortImg.defLeft = parseInt(this.sortImg.style.left);
            this.sortImg.style.top = Number(pos[1] + 5) + "px";
            if ((!this.useImagesInHeader) && (!mode)) {
                this.sortImg.style.display = "inline"
            }
            this.sortImg.style.left = this.sortImg.defLeft + "px"
        }
    };
    this.setActive = function(fl) {
        if (arguments.length == 0) {
            var fl = true
        }
        if (fl == true) {
            if (globalActiveDHTMLGridObject && (globalActiveDHTMLGridObject != this)) {
                globalActiveDHTMLGridObject.editStop()
            }
            globalActiveDHTMLGridObject = this;
            this.isActive = true
        } else {
            this.isActive = false
        }
    };
    this._doClick = function(ev) {
        var selMethod = 0;
        var el = this.getFirstParentOfType(_isIE ? ev.srcElement : ev.target, "TD");
        if (!el) {
            return
        }
        var fl = true;
        if (this.markedCells) {
            var markMethod = 0;
            if (ev.shiftKey || ev.metaKey) {
                markMethod = 1
            }
            if (ev.ctrlKey) {
                markMethod = 2
            }
            this.doMark(el, markMethod);
            return true
        }
        if (this.selMultiRows != false) {
            if (ev.shiftKey && this.row != null) {
                selMethod = 1
            }
            if (ev.ctrlKey || ev.metaKey) {
                selMethod = 2
            }
        }
        this.doClick(el, fl, selMethod)
    };
    this._doContClick = function(ev) {
        var el = this.getFirstParentOfType(_isIE ? ev.srcElement : ev.target, "TD");
        if ((!el) || (typeof(el.parentNode.idd) == "undefined")) {
            return true
        }
        if (ev.button == 2 || (_isMacOS && ev.ctrlKey)) {
            if (!this.callEvent("onRightClick", [el.parentNode.idd, el._cellIndex, ev])) {
                var z = function(e) {
                    (e || event).cancelBubble = true;
                    return false
                };
                (ev.srcElement || ev.target).oncontextmenu = z;
                return z(ev)
            }
            if (this._ctmndx) {
                if (!(this.callEvent("onBeforeContextMenu", [el.parentNode.idd, el._cellIndex, this]))) {
                    return true
                }
                if (_isIE) {
                    ev.srcElement.oncontextmenu = function() {
                        event.cancelBubble = true;
                        return false
                    }
                }
                if (this._ctmndx.showContextMenu) {
                    var dEl0 = window.document.documentElement;
                    var dEl1 = window.document.body;
                    var corrector = new Array((dEl0.scrollLeft || dEl1.scrollLeft), (dEl0.scrollTop || dEl1.scrollTop));
                    if (_isIE) {
                        var x = ev.clientX + corrector[0];
                        var y = ev.clientY + corrector[1]
                    } else {
                        var x = ev.pageX;
                        var y = ev.pageY
                    }
                    this._ctmndx.showContextMenu(x - 1, y - 1);
                    this.contextID = this._ctmndx.contextMenuZoneId = el.parentNode.idd + "_" + el._cellIndex;
                    this._ctmndx._skip_hide = true
                } else {
                    el.contextMenuId = el.parentNode.idd + "_" + el._cellIndex;
                    el.contextMenu = this._ctmndx;
                    el.a = this._ctmndx._contextStart;
                    el.a(el, ev);
                    el.a = null
                }
                ev.cancelBubble = true;
                return false
            }
        } else {
            if (this._ctmndx) {
                if (this._ctmndx.hideContextMenu) {
                    this._ctmndx.hideContextMenu()
                } else {
                    this._ctmndx._contextEnd()
                }
            }
        }
        return true
    };
    this.doClick = function(el, fl, selMethod, show) {
        if (!this.selMultiRows) {
            selMethod = 0
        }
        var psid = this.row ? this.row.idd : 0;
        this.setActive(true);
        if (!selMethod) {
            selMethod = 0
        }
        if (this.cell != null) {
            this.cell.className = this.cell.className.replace(/cellselected/g, "")
        }
        if (el.tagName == "TD") {
            if (this.checkEvent("onSelectStateChanged")) {
                var initial = this.getSelectedId()
            }
            var prow = this.row;
            if (selMethod == 1) {
                var elRowIndex = this.rowsCol._dhx_find(el.parentNode);
                var lcRowIndex = this.rowsCol._dhx_find(this.lastClicked);
                if (elRowIndex > lcRowIndex) {
                    var strt = lcRowIndex;
                    var end = elRowIndex
                } else {
                    var strt = elRowIndex;
                    var end = lcRowIndex
                }
                for (var i = 0; i < this.rowsCol.length; i++) {
                    if ((i >= strt && i <= end)) {
                        if (this.rowsCol[i] && (!this.rowsCol[i]._sRow)) {
                            if (this.rowsCol[i].className.indexOf("rowselected") == -1 && this.callEvent("onBeforeSelect", [this.rowsCol[i].idd, psid])) {
                                this.rowsCol[i].className += " rowselected";
                                this.selectedRows[this.selectedRows.length] = this.rowsCol[i]
                            }
                        } else {
                            this.clearSelection();
                            return this.doClick(el, fl, 0, show)
                        }
                    }
                }
            } else {
                if (selMethod == 2) {
                    if (el.parentNode.className.indexOf("rowselected") != -1) {
                        el.parentNode.className = el.parentNode.className.replace(/rowselected/g, "");
                        this.selectedRows._dhx_removeAt(this.selectedRows._dhx_find(el.parentNode));
                        var skipRowSelection = true
                    }
                }
            }
            this.editStop();
            if (typeof(el.parentNode.idd) == "undefined") {
                return true
            }
            if ((!skipRowSelection) && (!el.parentNode._sRow)) {
                if (this.callEvent("onBeforeSelect", [el.parentNode.idd, psid])) {
                    if (selMethod == 0) {
                        this.clearSelection()
                    }
                    this.cell = el;
                    if ((prow == el.parentNode) && (this._chRRS)) {
                        fl = false
                    }
                    this.row = el.parentNode;
                    this.row.className += " rowselected";
                    if (this.cell && _isIE && _isIE == 8) {
                        var next = this.cell.nextSibling;
                        var parent = this.cell.parentNode;
                        parent.removeChild(this.cell);
                        parent.insertBefore(this.cell, next)
                    }
                    if (this.selectedRows._dhx_find(this.row) == -1) {
                        this.selectedRows[this.selectedRows.length] = this.row
                    }
                } else {
                    fl = false
                }
            }
            if (this.cell && this.cell.parentNode.className.indexOf("rowselected") != -1) {
                this.cell.className = this.cell.className.replace(/cellselected/g, "") + " cellselected"
            }
            if (selMethod != 1) {
                if (!this.row) {
                    return
                }
            }
            this.lastClicked = el.parentNode;
            var rid = this.row.idd;
            var cid = this.cell;
            if (fl && typeof(rid) != "undefined" && cid && !skipRowSelection) {
                self.onRowSelectTime = setTimeout(function() {
                    self.callEvent("onRowSelect", [rid, cid._cellIndex])
                }, 100)
            }
            if (this.checkEvent("onSelectStateChanged")) {
                var afinal = this.getSelectedId();
                if (initial != afinal) {
                    this.callEvent("onSelectStateChanged", [afinal, initial])
                }
            }
        }
        this.isActive = true;
        if (show !== false && this.cell && this.cell.parentNode.idd) {
            this.moveToVisible(this.cell)
        }
    };
    this.selectAll = function() {
        this.clearSelection();
        var coll = this.rowsBuffer;
        if (this.pagingOn) {
            coll = this.rowsCol
        }
        for (var i = 0; i < coll.length; i++) {
            this.render_row(i).className += " rowselected"
        }
        this.selectedRows = dhtmlxArray([].concat(coll));
        if (this.selectedRows.length) {
            this.row = this.selectedRows[0];
            this.cell = this.row.cells[0]
        }
        if ((this._fake) && (!this._realfake)) {
            this._fake.selectAll()
        }
    };
    this.selectCell = function(r, cInd, fl, preserve, edit, show) {
        if (!fl) {
            fl = false
        }
        if (typeof(r) != "object") {
            r = this.render_row(r)
        }
        if (!r || r == -1) {
            return null
        }
        if (r._childIndexes) {
            var c = r.childNodes[r._childIndexes[cInd]]
        } else {
            var c = r.childNodes[cInd]
        }
        if (!c) {
            c = r.childNodes[0]
        }
        if (preserve) {
            this.doClick(c, fl, 3, show)
        } else {
            this.doClick(c, fl, 0, show)
        }
        if (edit) {
            this.editCell()
        }
    };
    this.moveToVisible = function(cell_obj, onlyVScroll) {
        if (this.pagingOn) {
            var newPage = Math.floor(this.getRowIndex(cell_obj.parentNode.idd) / this.rowsBufferOutSize) + 1;
            if (newPage != this.currentPage) {
                this.changePage(newPage)
            }
        }
        if (!cell_obj.offsetHeight && this._srnd) {
            var mask = this._realfake ? this._fake.rowsAr[cell_obj.parentNode.idd] : cell_obj.parentNode;
            var h = this.rowsBuffer._dhx_find(mask) * this._srdh;
            return this.objBox.scrollTop = h
        }
        try {
            var distance = cell_obj.offsetLeft + cell_obj.offsetWidth + 20;
            var scrollLeft = 0;
            if (distance > (this.objBox.offsetWidth + this.objBox.scrollLeft)) {
                if (cell_obj.offsetLeft > this.objBox.scrollLeft) {
                    scrollLeft = cell_obj.offsetLeft - 5
                }
            } else {
                if (cell_obj.offsetLeft < this.objBox.scrollLeft) {
                    distance -= cell_obj.offsetWidth * 2 / 3;
                    if (distance < this.objBox.scrollLeft) {
                        scrollLeft = cell_obj.offsetLeft - 5
                    }
                }
            }
            if ((scrollLeft) && (!onlyVScroll)) {
                this.objBox.scrollLeft = scrollLeft
            }
            var distance = cell_obj.offsetTop + cell_obj.offsetHeight + 20;
            if (distance > (this.objBox.offsetHeight + this.objBox.scrollTop)) {
                var scrollTop = distance - this.objBox.offsetHeight
            } else {
                if (cell_obj.offsetTop < this.objBox.scrollTop) {
                    var scrollTop = cell_obj.offsetTop - 5
                }
            }
            if (scrollTop) {
                this.objBox.scrollTop = scrollTop
            }
        } catch (er) {}
    };
    this.editCell = function() {
        if (this.editor && this.cell == this.editor.cell) {
            return
        }
        this.editStop();
        if ((this.isEditable != true) || (!this.cell)) {
            return false
        }
        var c = this.cell;
        if (c.parentNode._locked) {
            return false
        }
        this.editor = this.cells4(c);
        if (this.editor != null) {
            if (this.editor.isDisabled()) {
                this.editor = null;
                return false
            }
            if (this.callEvent("onEditCell", [0, this.row.idd, this.cell._cellIndex]) != false && this.editor.edit) {
                this._Opera_stop = (new Date).valueOf();
                c.className += " editable";
                this.editor.edit();
                this.callEvent("onEditCell", [1, this.row.idd, this.cell._cellIndex])
            } else {
                this.editor = null
            }
        }
    };
    this.editStop = function(mode) {
        if (_isOpera) {
            if (this._Opera_stop) {
                if ((this._Opera_stop * 1 + 50) > (new Date).valueOf()) {
                    return
                }
                this._Opera_stop = null
            }
        }
        if (this.editor && this.editor != null) {
            this.editor.cell.className = this.editor.cell.className.replace("editable", "");
            if (mode) {
                var t = this.editor.val;
                this.editor.detach();
                this.editor.setValue(t);
                this.editor = null;
                return
            }
            if (this.editor.detach()) {
                this.cell.wasChanged = true
            }
            var g = this.editor;
            this.editor = null;
            var z = this.callEvent("onEditCell", [2, this.row.idd, this.cell._cellIndex, g.getValue(), g.val]);
            if ((typeof(z) == "string") || (typeof(z) == "number")) {
                g[g.setImage ? "setLabel" : "setValue"](z)
            } else {
                if (!z) {
                    g[g.setImage ? "setLabel" : "setValue"](g.val)
                }
            }
            if (this._ahgr && this.multiLine) {
                this.setSizes()
            }
        }
    };
    this._nextRowCell = function(row, dir, pos) {
        row = this._nextRow((this._groups ? this.rowsCol : this.rowsBuffer)._dhx_find(row), dir);
        if (!row) {
            return null
        }
        return row.childNodes[row._childIndexes ? row._childIndexes[pos] : pos]
    };
    this._getNextCell = function(acell, dir, i) {
        acell = acell || this.cell;
        var arow = acell.parentNode;
        if (this._tabOrder) {
            i = this._tabOrder[acell._cellIndex];
            if (typeof i != "undefined") {
                if (i < 0) {
                    acell = this._nextRowCell(arow, dir, Math.abs(i) - 1)
                } else {
                    acell = arow.childNodes[i]
                }
            }
        } else {
            var i = acell._cellIndex + dir;
            if (i >= 0 && i < this._cCount) {
                if (arow._childIndexes) {
                    i = arow._childIndexes[acell._cellIndex] + dir
                }
                acell = arow.childNodes[i]
            } else {
                acell = this._nextRowCell(arow, dir, (dir == 1 ? 0 : (this._cCount - 1)))
            }
        }
        if (!acell) {
            if ((dir == 1) && this.tabEnd) {
                this.tabEnd.focus();
                this.tabEnd.focus();
                this.setActive(false)
            }
            if ((dir == -1) && this.tabStart) {
                this.tabStart.focus();
                this.tabStart.focus();
                this.setActive(false)
            }
            return null
        }
        if (acell.style.display != "none" && (!this.smartTabOrder || !this.cells(acell.parentNode.idd, acell._cellIndex).isDisabled())) {
            return acell
        }
        return this._getNextCell(acell, dir)
    };
    this._nextRow = function(ind, dir) {
        var r = this.render_row(ind + dir);
        if (!r || r == -1) {
            return null
        }
        if (r && r.style.display == "none") {
            return this._nextRow(ind + dir, dir)
        }
        return r
    };
    this.scrollPage = function(dir) {
        if (!this.rowsBuffer.length) {
            return
        }
        var master = this._realfake ? this._fake : this;
        var new_ind = Math.floor((master._r_select || this.getRowIndex(this.row.idd) || 0) + (dir) * this.objBox.offsetHeight / (this._srdh || 20));
        if (new_ind < 0) {
            new_ind = 0
        }
        if (new_ind >= this.rowsBuffer.length) {
            new_ind = this.rowsBuffer.length - 1
        }
        if (this._srnd && !this.rowsBuffer[new_ind]) {
            this.objBox.scrollTop += Math.floor((dir) * this.objBox.offsetHeight / (this._srdh || 20)) * (this._srdh || 20);
            master._r_select = new_ind
        } else {
            this.selectCell(new_ind, this.cell._cellIndex, true, false, false, (this.multiLine || this._srnd));
            if (!this.multiLine && !this._srnd && !this._realfake) {
                this.objBox.scrollTop = this.getRowById(this.getRowId(new_ind)).offsetTop
            }
            master._r_select = null
        }
    };
    this.doKey = function(ev) {
        if (!ev) {
            return true
        }
        if ((ev.target || ev.srcElement).value !== window.undefined) {
            var zx = (ev.target || ev.srcElement);
            if ((!zx.parentNode) || (zx.parentNode.className.indexOf("editable") == -1)) {
                return true
            }
        }
        if ((globalActiveDHTMLGridObject) && (this != globalActiveDHTMLGridObject)) {
            return globalActiveDHTMLGridObject.doKey(ev)
        }
        if (this.isActive == false) {
            return true
        }
        if (this._htkebl) {
            return true
        }
        if (!this.callEvent("onKeyPress", [ev.keyCode, ev.ctrlKey, ev.shiftKey, ev])) {
            return false
        }
        var code = "k" + ev.keyCode + "_" + (ev.ctrlKey ? 1 : 0) + "_" + (ev.shiftKey ? 1 : 0);
        if (this.cell) {
            if (this._key_events[code]) {
                if (false === this._key_events[code].call(this)) {
                    return true
                }
                if (ev.preventDefault) {
                    ev.preventDefault()
                }
                ev.cancelBubble = true;
                return false
            }
            if (this._key_events.k_other) {
                this._key_events.k_other.call(this, ev)
            }
        }
        return true
    };
    this.selectRow = function(r, fl, preserve, show) {
        if (typeof(r) != "object") {
            r = this.render_row(r)
        }
        this.selectCell(r, 0, fl, preserve, false, show)
    };
    this.wasDblClicked = function(ev) {
        var el = this.getFirstParentOfType(_isIE ? ev.srcElement : ev.target, "TD");
        if (el) {
            var rowId = el.parentNode.idd;
            return this.callEvent("onRowDblClicked", [rowId, el._cellIndex])
        }
    };
    this._onHeaderClick = function(e, el) {
        var that = this.grid;
        el = el || that.getFirstParentOfType(_isIE ? event.srcElement : e.target, "TD");
        if (this.grid.resized == null) {
            if (!(this.grid.callEvent("onHeaderClick", [el._cellIndexS, (e || window.event)]))) {
                return false
            }
            that.sortField(el._cellIndexS, false, el)
        }
    };
    this.deleteSelectedRows = function() {
        var num = this.selectedRows.length;
        if (num == 0) {
            return
        }
        var tmpAr = this.selectedRows;
        this.selectedRows = dhtmlxArray();
        for (var i = num - 1; i >= 0; i--) {
            var node = tmpAr[i];
            if (!this.deleteRow(node.idd, node)) {
                this.selectedRows[this.selectedRows.length] = node
            } else {
                if (node == this.row) {
                    var ind = i
                }
            }
        }
        if (ind) {
            try {
                if (ind + 1 > this.rowsCol.length) {
                    ind--
                }
                this.selectCell(ind, 0, true)
            } catch (er) {
                this.row = null;
                this.cell = null
            }
        }
    };
    this.getSelectedRowId = function() {
        var selAr = new Array(0);
        var uni = {};
        for (var i = 0; i < this.selectedRows.length; i++) {
            var id = this.selectedRows[i].idd;
            if (uni[id]) {
                continue
            }
            selAr[selAr.length] = id;
            uni[id] = true
        }
        if (selAr.length == 0) {
            return null
        } else {
            return selAr.join(this.delim)
        }
    };
    this.getSelectedCellIndex = function() {
        if (this.cell != null) {
            return this.cell._cellIndex
        } else {
            return -1
        }
    };
    this.getColWidth = function(ind) {
        return parseInt(this.cellWidthPX[ind]) + ((_isFF) ? 2 : 0)
    };
    this.setColWidth = function(ind, value) {
        if (this._hrrar[ind]) {
            return
        }
        if (this.cellWidthType == "px") {
            this.cellWidthPX[ind] = parseInt(value) - +((_isFF) ? 2 : 0)
        } else {
            this.cellWidthPC[ind] = parseInt(value)
        }
        this.setSizes()
    };
    this.getRowIndex = function(row_id) {
        for (var i = 0; i < this.rowsBuffer.length; i++) {
            if (this.rowsBuffer[i] && this.rowsBuffer[i].idd == row_id) {
                return i
            }
        }
        return -1
    };
    this.getRowId = function(ind) {
        return this.rowsBuffer[ind] ? this.rowsBuffer[ind].idd : this.undefined
    };
    this.setRowId = function(ind, row_id) {
        this.changeRowId(this.getRowId(ind), row_id)
    };
    this.changeRowId = function(oldRowId, newRowId) {
        if (oldRowId == newRowId) {
            return
        }
        var row = this.rowsAr[oldRowId];
        row.idd = newRowId;
        if (this.UserData[oldRowId]) {
            this.UserData[newRowId] = this.UserData[oldRowId];
            this.UserData[oldRowId] = null
        }
        if (this._h2 && this._h2.get[oldRowId]) {
            this._h2.get[newRowId] = this._h2.get[oldRowId];
            this._h2.get[newRowId].id = newRowId;
            delete this._h2.get[oldRowId]
        }
        this.rowsAr[oldRowId] = null;
        this.rowsAr[newRowId] = row;
        for (var i = 0; i < row.childNodes.length; i++) {
            if (row.childNodes[i]._code) {
                row.childNodes[i]._code = this._compileSCL(row.childNodes[i]._val, row.childNodes[i])
            }
        }
        if (this._mat_links && this._mat_links[oldRowId]) {
            var a = this._mat_links[oldRowId];
            delete this._mat_links[oldRowId];
            for (var c in a) {
                for (var i = 0; i < a[c].length; i++) {
                    this._compileSCL(a[c][i].original, a[c][i])
                }
            }
        }
        this.callEvent("onRowIdChange", [oldRowId, newRowId])
    };
    this.setColumnIds = function(ids) {
        this.columnIds = ids.split(this.delim)
    };
    this.setColumnId = function(ind, id) {
        this.columnIds[ind] = id
    };
    this.getColIndexById = function(id) {
        for (var i = 0; i < this.columnIds.length; i++) {
            if (this.columnIds[i] == id) {
                return i
            }
        }
    };
    this.getColumnId = function(cin) {
        return this.columnIds[cin]
    };
    this.getColumnLabel = function(cin, ind, hdr) {
        var z = (hdr || this.hdr).rows[(ind || 0) + 1];
        for (var i = 0; i < z.cells.length; i++) {
            if (z.cells[i]._cellIndexS == cin) {
                return (_isIE ? z.cells[i].innerText : z.cells[i].textContent)
            }
        }
        return ""
    };
    this.getColLabel = this.getColumnLabel;
    this.getFooterLabel = function(cin, ind) {
        return this.getColumnLabel(cin, ind, this.ftr)
    };
    this.setRowTextBold = function(row_id) {
        var r = this.getRowById(row_id);
        if (r) {
            r.style.fontWeight = "bold"
        }
    };
    this.setRowTextStyle = function(row_id, styleString) {
        var r = this.getRowById(row_id);
        if (!r) {
            return
        }
        for (var i = 0; i < r.childNodes.length; i++) {
            var pfix = r.childNodes[i]._attrs.style || "";
            if ((this._hrrar) && (this._hrrar[i])) {
                pfix = "display:none;"
            }
            if (_isIE) {
                r.childNodes[i].style.cssText = pfix + "width:" + r.childNodes[i].style.width + ";" + styleString
            } else {
                r.childNodes[i].style.cssText = pfix + "width:" + r.childNodes[i].style.width + ";" + styleString
            }
        }
    };
    this.setRowColor = function(row_id, color) {
        var r = this.getRowById(row_id);
        for (var i = 0; i < r.childNodes.length; i++) {
            r.childNodes[i].bgColor = color
        }
    };
    this.setCellClass = function(row_id, ind, clsName) {
        var r = this.getRowById(row_id);
        if (!r) {
            return
        }
        var cell = r.childNodes[r._childIndexes ? r._childIndexes[ind] : ind];
        if (!cell) {
            return
        }
        cell.className = clsName
    };
    this.setCellTextStyle = function(row_id, ind, styleString) {
        var r = this.getRowById(row_id);
        if (!r) {
            return
        }
        var cell = r.childNodes[r._childIndexes ? r._childIndexes[ind] : ind];
        if (!cell) {
            return
        }
        var pfix = "";
        if ((this._hrrar) && (this._hrrar[ind])) {
            pfix = "display:none;"
        }
        if (_isIE) {
            cell.style.cssText = pfix + "width:" + cell.style.width + ";" + styleString
        } else {
            cell.style.cssText = pfix + "width:" + cell.style.width + ";" + styleString
        }
    };
    this.setRowTextNormal = function(row_id) {
        var r = this.getRowById(row_id);
        if (r) {
            r.style.fontWeight = "normal"
        }
    };
    this.doesRowExist = function(row_id) {
        if (this.getRowById(row_id) != null) {
            return true
        } else {
            return false
        }
    };
    this.getColumnsNum = function() {
        return this._cCount
    };
    this.moveRowUp = function(row_id) {
        var r = this.getRowById(row_id);
        if (this.isTreeGrid()) {
            return this.moveRowUDTG(row_id, -1)
        }
        var rInd = this.rowsCol._dhx_find(r);
        if ((r.previousSibling) && (rInd != 0)) {
            r.parentNode.insertBefore(r, r.previousSibling);
            this.rowsCol._dhx_swapItems(rInd, rInd - 1);
            this.setSizes();
            var bInd = this.rowsBuffer._dhx_find(r);
            this.rowsBuffer._dhx_swapItems(bInd, bInd - 1);
            if (this._cssEven) {
                this._fixAlterCss(rInd - 1)
            }
        }
    };
    this.moveRowDown = function(row_id) {
        var r = this.getRowById(row_id);
        if (this.isTreeGrid()) {
            return this.moveRowUDTG(row_id, 1)
        }
        var rInd = this.rowsCol._dhx_find(r);
        if (r.nextSibling) {
            this.rowsCol._dhx_swapItems(rInd, rInd + 1);
            if (r.nextSibling.nextSibling) {
                r.parentNode.insertBefore(r, r.nextSibling.nextSibling)
            } else {
                r.parentNode.appendChild(r)
            }
            this.setSizes();
            var bInd = this.rowsBuffer._dhx_find(r);
            this.rowsBuffer._dhx_swapItems(bInd, bInd + 1);
            if (this._cssEven) {
                this._fixAlterCss(rInd)
            }
        }
    };
    this.getCombo = function(col_ind) {
        if (!this.combos[col_ind]) {
            this.combos[col_ind] = new dhtmlXGridComboObject()
        }
        return this.combos[col_ind]
    };
    this.setUserData = function(row_id, name, value) {
        if (!row_id) {
            row_id = "gridglobaluserdata"
        }
        if (!this.UserData[row_id]) {
            this.UserData[row_id] = new Hashtable()
        }
        this.UserData[row_id].put(name, value)
    };
    this.getUserData = function(row_id, name) {
        if (!row_id) {
            row_id = "gridglobaluserdata"
        }
        this.getRowById(row_id);
        var z = this.UserData[row_id];
        return (z ? z.get(name) : "")
    };
    this.setEditable = function(fl) {
        this.isEditable = convertStringToBoolean(fl)
    };
    this.selectRowById = function(row_id, multiFL, show, call) {
        if (!call) {
            call = false
        }
        this.selectCell(this.getRowById(row_id), 0, call, multiFL, false, show)
    };
    this.clearSelection = function() {
        this.editStop();
        for (var i = 0; i < this.selectedRows.length; i++) {
            var r = this.rowsAr[this.selectedRows[i].idd];
            if (r) {
                r.className = r.className.replace(/rowselected/g, "")
            }
        }
        this.selectedRows = dhtmlxArray();
        this.row = null;
        if (this.cell != null) {
            this.cell.className = this.cell.className.replace(/cellselected/g, "");
            this.cell = null
        }
    };
    this.copyRowContent = function(from_row_id, to_row_id) {
        var frRow = this.getRowById(from_row_id);
        if (!this.isTreeGrid()) {
            for (var i = 0; i < frRow.cells.length; i++) {
                this.cells(to_row_id, i).setValue(this.cells(from_row_id, i).getValue())
            }
        } else {
            this._copyTreeGridRowContent(frRow, from_row_id, to_row_id)
        }
        if (!_isIE) {
            this.getRowById(from_row_id).cells[0].height = frRow.cells[0].offsetHeight
        }
    };
    this.setFooterLabel = function(c, label, ind) {
        return this.setColumnLabel(c, label, ind, this.ftr)
    };
    this.setColumnLabel = function(c, label, ind, hdr) {
        var z = (hdr || this.hdr).rows[ind || 1];
        var col = (z._childIndexes ? z._childIndexes[c] : c);
        if (!z.cells[col]) {
            return
        }
        if (!this.useImagesInHeader) {
            var hdrHTML = "<div class='hdrcell'>";
            if (label.indexOf("img:[") != -1) {
                var imUrl = label.replace(/.*\[([^>]+)\].*/, "$1");
                label = label.substr(label.indexOf("]") + 1, label.length);
                hdrHTML += "<img width='18px' height='18px' align='absmiddle' src='" + imUrl + "' hspace='2'>"
            }
            hdrHTML += label;
            hdrHTML += "</div>";
            z.cells[col].innerHTML = hdrHTML;
            if (this._hstyles[col]) {
                z.cells[col].style.cssText = this._hstyles[col]
            }
        } else {
            z.cells[col].style.textAlign = "left";
            z.cells[col].innerHTML = "<img src='" + this.imgURL + "" + label + "' onerror='this.src = \"" + this.imgURL + "imageloaderror.gif\"'>";
            var a = new Image();
            a.src = this.imgURL + "" + label.replace(/(\.[a-z]+)/, ".des$1");
            this.preloadImagesAr[this.preloadImagesAr.length] = a;
            var b = new Image();
            b.src = this.imgURL + "" + label.replace(/(\.[a-z]+)/, ".asc$1");
            this.preloadImagesAr[this.preloadImagesAr.length] = b
        }
        if ((label || "").indexOf("#") != -1) {
            var t = label.match(/(^|{)#([^}]+)(}|$)/);
            if (t) {
                var tn = "_in_header_" + t[2];
                if (this[tn]) {
                    this[tn]((this.forceDivInHeader ? z.cells[col].firstChild : z.cells[col]), col, label.split(t[0]))
                }
            }
        }
    };
    this.setColLabel = function(a, b, ind, c) {
        return this.setColumnLabel(a, b, (ind || 0) + 1, c)
    };
    this.clearAll = function(header) {
        if (!this.obj.rows[0]) {
            return
        }
        if (this._h2) {
            this._h2 = new dhtmlxHierarchy();
            if (this._fake) {
                if (this._realfake) {
                    this._h2 = this._fake._h2
                } else {
                    this._fake._h2 = this._h2
                }
            }
        }
        this.limit = this._limitC = 0;
        this.editStop(true);
        if (this._dLoadTimer) {
            window.clearTimeout(this._dLoadTimer)
        }
        if (this._dload) {
            this.objBox.scrollTop = 0;
            this.limit = this._limitC || 0;
            this._initDrF = true
        }
        var len = this.rowsCol.length;
        len = this.obj.rows.length;
        for (var i = len - 1; i > 0; i--) {
            var t_r = this.obj.rows[i];
            t_r.parentNode.removeChild(t_r)
        }
        if (header) {
            this._master_row = null;
            this.obj.rows[0].parentNode.removeChild(this.obj.rows[0]);
            for (var i = this.hdr.rows.length - 1; i >= 0; i--) {
                var t_r = this.hdr.rows[i];
                t_r.parentNode.removeChild(t_r)
            }
            if (this.ftr) {
                this.ftr.parentNode.removeChild(this.ftr);
                this.ftr = null
            }
            this._aHead = this.ftr = this.cellWidth = this._aFoot = null;
            this.cellType = dhtmlxArray();
            this._hrrar = [];
            this.columnIds = [];
            this.combos = []
        }
        this.row = null;
        this.cell = null;
        this.rowsCol = dhtmlxArray();
        this.rowsAr = [];
        this._RaSeCol = [];
        this.rowsBuffer = dhtmlxArray();
        this.UserData = [];
        this.selectedRows = dhtmlxArray();
        if (this.pagingOn || this._srnd) {
            this.xmlFileUrl = ""
        }
        if (this.pagingOn) {
            this.changePage(1)
        }
        if (this._contextCallTimer) {
            window.clearTimeout(this._contextCallTimer)
        }
        if (this._sst) {
            this.enableStableSorting(true)
        }
        this._fillers = this.undefined;
        this.setSortImgState(false);
        this.setSizes();
        this.callEvent("onClearAll", [])
    };
    this.sortField = function(ind, repeatFl, r_el) {
        if (this.getRowsNum() == 0) {
            return false
        }
        var el = this.hdr.rows[0].cells[ind];
        if (!el) {
            return
        }
        if (el.tagName == "TH" && (this.fldSort.length - 1) >= el._cellIndex && this.fldSort[el._cellIndex] != "na") {
            var data = this.getSortingState();
            var sortType = (data[0] == ind && data[1] == "asc") ? "des" : "asc";
            if (!this.callEvent("onBeforeSorting", [ind, this.fldSort[ind], sortType])) {
                return
            }
            this.sortImg.typ = (sortType == "asc" ? "a" : "d");
            this.sortImg.src = (sortType == "asc" ? "data:image/gif;base64,R0lGODlhCQAIAJEAAP///8HBwYCAgP///yH5BAUUAAMALAAAAAAJAAgAAAIUnAWmIxG52ovOQVYnzhOBDy7iUAAAOw==" : "data:image/gif;base64,R0lGODlhCQAIAJEAAP///8HBwYCAgP///yH5BAUUAAMALAAAAAAJAAgAAAITnI4CFu3L3pjCBUgbznd6s31fAQA7");
            if (this.useImagesInHeader) {
                var cel = this.hdr.rows[1].cells[el._cellIndex].firstChild;
                if (this.fldSorted != null) {
                    var celT = this.hdr.rows[1].cells[this.fldSorted._cellIndex].firstChild;
                    celT.src = celT.src.replace(/(\.asc\.)|(\.des\.)/, ".")
                }
                cel.src = cel.src.replace(/(\.[a-z]+)$/, "." + sortType + "$1")
            }
            this.sortRows(el._cellIndex, this.fldSort[el._cellIndex], sortType);
            this.fldSorted = el;
            this.r_fldSorted = r_el;
            var c = this.hdr.rows[1];
            var c = r_el.parentNode;
            var real_el = c._childIndexes ? c._childIndexes[el._cellIndex] : el._cellIndex;
            this.setSortImgPos(false, false, false, r_el)
        }
    };
    this.setCustomSorting = function(func, col) {
        if (!this._customSorts) {
            this._customSorts = new Array()
        }
        this._customSorts[col] = (typeof(func) == "string") ? eval(func) : func;
        this.fldSort[col] = "cus"
    };
    this.enableHeaderImages = function(fl) {
        this.useImagesInHeader = fl
    };
    this.setHeader = function(hdrStr, splitSign, styles) {
        if (typeof(hdrStr) != "object") {
            var arLab = this._eSplit(hdrStr)
        } else {
            arLab = [].concat(hdrStr)
        }
        var arWdth = new Array(0);
        var arTyp = new dhtmlxArray(0);
        var arAlg = new Array(0);
        var arVAlg = new Array(0);
        var arSrt = new Array(0);
        for (var i = 0; i < arLab.length; i++) {
            arWdth[arWdth.length] = Math.round(100 / arLab.length);
            arTyp[arTyp.length] = "ed";
            arAlg[arAlg.length] = "left";
            arVAlg[arVAlg.length] = "middle";
            arSrt[arSrt.length] = "na"
        }
        this.splitSign = splitSign || "#cspan";
        this.hdrLabels = arLab;
        this.cellWidth = arWdth;
        if (!this.initCellWidth.length) {
            this.setInitWidthsP(arWdth.join(this.delim), true)
        }
        this.cellType = arTyp;
        this.cellAlign = arAlg;
        this.cellVAlign = arVAlg;
        this.fldSort = arSrt;
        this._hstyles = styles || []
    };
    this._eSplit = function(str) {
        if (![].push) {
            return str.split(this.delim)
        }
        var a = "r" + (new Date()).valueOf();
        var z = this.delim.replace(/([\|\+\*\^])/g, "\\$1");
        return (str || "").replace(RegExp(z, "g"), a).replace(RegExp("\\\\" + a, "g"), this.delim).split(a)
    };
    this.getColType = function(cInd) {
        return this.cellType[cInd]
    };
    this.getColTypeById = function(cID) {
        return this.cellType[this.getColIndexById(cID)]
    };
    this.setColTypes = function(typeStr) {
        this.cellType = dhtmlxArray(typeStr.split(this.delim));
        this._strangeParams = new Array();
        for (var i = 0; i < this.cellType.length; i++) {
            if ((this.cellType[i].indexOf("[") != -1)) {
                var z = this.cellType[i].split(/[\[\]]+/g);
                this.cellType[i] = z[0];
                this.defVal[i] = z[1];
                if (z[1].indexOf("=") == 0) {
                    this.cellType[i] = "math";
                    this._strangeParams[i] = z[0]
                }
            }
            if (!window["eXcell_" + this.cellType[i]]) {
                dhtmlxError.throwError("Configuration", "Incorrect cell type: " + this.cellType[i], [this, this.cellType[i]])
            }
        }
    };
    this.setColSorting = function(sortStr) {
        this.fldSort = sortStr.split(this.delim);
        for (var i = 0; i < this.fldSort.length; i++) {
            if (((this.fldSort[i]).length > 4) && (typeof(window[this.fldSort[i]]) == "function")) {
                if (!this._customSorts) {
                    this._customSorts = new Array()
                }
                this._customSorts[i] = window[this.fldSort[i]];
                this.fldSort[i] = "cus"
            }
        }
    };
    this.setColAlign = function(alStr) {
        this.cellAlign = alStr.split(this.delim);
        for (var i = 0; i < this.cellAlign.length; i++) {
            this.cellAlign[i] = this.cellAlign[i]._dhx_trim()
        }
    };
    this.setColVAlign = function(valStr) {
        this.cellVAlign = valStr.split(this.delim)
    };
    this.setNoHeader = function(fl) {
        this.noHeader = convertStringToBoolean(fl)
    };
    this.showRow = function(rowID) {
        this.getRowById(rowID);
        if (this._h2) {
            this.openItem(this._h2.get[rowID].parent.id)
        }
        var c = this.getRowById(rowID).childNodes[0];
        while (c && c.style.display == "none") {
            c = c.nextSibling
        }
        if (c) {
            this.moveToVisible(c, true)
        }
    };
    this.setStyle = function(ss_header, ss_grid, ss_selCell, ss_selRow) {
        this.ssModifier = [ss_header, ss_grid, ss_selCell, ss_selCell, ss_selRow];
        var prefs = ["#" + this.entBox.id + " table.hdr td", "#" + this.entBox.id + " table.obj td", "#" + this.entBox.id + " table.obj tr.rowselected td.cellselected", "#" + this.entBox.id + " table.obj td.cellselected", "#" + this.entBox.id + " table.obj tr.rowselected td"];
        for (var i = 0; i < prefs.length; i++) {
            if (this.ssModifier[i]) {
                if (_isIE) {
                    document.styleSheets[0].addRule(prefs[i], this.ssModifier[i])
                } else {
                    document.styleSheets[0].insertRule(prefs[i] + (" {" + this.ssModifier[i] + " };"), document.styleSheets[0].cssRules.length)
                }
            }
        }
    };
    this.setColumnColor = function(clr) {
        this.columnColor = clr.split(this.delim)
    };
    this.enableAlterCss = function(cssE, cssU, perLevel, levelUnique) {
        if (cssE || cssU) {
            this.attachEvent("onGridReconstructed", function() {
                this._fixAlterCss();
                if (this._fake) {
                    this._fake._fixAlterCss()
                }
            })
        }
        this._cssSP = perLevel;
        this._cssSU = levelUnique;
        this._cssEven = cssE;
        this._cssUnEven = cssU
    };
    this._fixAlterCss = function(ind) {
        if (this._h2 && (this._cssSP || this._cssSU)) {
            return this._fixAlterCssTGR(ind)
        }
        if (!this._cssEven && !this._cssUnEven) {
            return
        }
        ind = ind || 0;
        var j = ind;
        for (var i = ind; i < this.rowsCol.length; i++) {
            if (!this.rowsCol[i]) {
                continue
            }
            if (this.rowsCol[i].style.display != "none") {
                if (this.rowsCol[i]._cntr) {
                    j = 1;
                    continue
                }
                if (this.rowsCol[i].className.indexOf("rowselected") != -1) {
                    if (j % 2 == 1) {
                        this.rowsCol[i].className = this._cssUnEven + " rowselected " + (this.rowsCol[i]._css || "")
                    } else {
                        this.rowsCol[i].className = this._cssEven + " rowselected " + (this.rowsCol[i]._css || "")
                    }
                } else {
                    if (j % 2 == 1) {
                        this.rowsCol[i].className = this._cssUnEven + " " + (this.rowsCol[i]._css || "")
                    } else {
                        this.rowsCol[i].className = this._cssEven + " " + (this.rowsCol[i]._css || "")
                    }
                }
                j++
            }
        }
    };
    this.clearChangedState = function() {
        for (var i = 0; i < this.rowsCol.length; i++) {
            var row = this.rowsCol[i];
            var cols = row.childNodes.length;
            for (var j = 0; j < cols; j++) {
                row.childNodes[j].wasChanged = false
            }
        }
    };
    this.getChangedRows = function(and_added) {
        var res = new Array();
        this.forEachRow(function(id) {
            var row = this.rowsAr[id];
            if (row.tagName != "TR") {
                return
            }
            var cols = row.childNodes.length;
            if (and_added && row._added) {
                res[res.length] = row.idd
            } else {
                for (var j = 0; j < cols; j++) {
                    if (row.childNodes[j].wasChanged) {
                        res[res.length] = row.idd;
                        break
                    }
                }
            }
        });
        return res.join(this.delim)
    };
    this._sUDa = false;
    this._sAll = false;
    this.setSerializationLevel = function(userData, fullXML, config, changedAttr, onlyChanged, asCDATA) {
        this._sUDa = userData;
        this._sAll = fullXML;
        this._sConfig = config;
        this._chAttr = changedAttr;
        this._onlChAttr = onlyChanged;
        this._asCDATA = asCDATA
    };
    this.setSerializableColumns = function(list) {
        if (!list) {
            this._srClmn = null;
            return
        }
        this._srClmn = (list || "").split(",");
        for (var i = 0; i < this._srClmn.length; i++) {
            this._srClmn[i] = convertStringToBoolean(this._srClmn[i])
        }
    };
    this._serialise = function(rCol, inner, closed) {
        this.editStop();
        var out = [];
        var close = "</" + this.xml.s_row + ">";
        if (this.isTreeGrid()) {
            this._h2.forEachChildF(0, function(el) {
                var temp = this._serializeRow(this.render_row_tree(-1, el.id));
                out.push(temp);
                if (temp) {
                    return true
                } else {
                    return false
                }
            }, this, function() {
                out.push(close)
            })
        } else {
            for (var i = 0; i < this.rowsBuffer.length; i++) {
                if (this.rowsBuffer[i]) {
                    var temp = this._serializeRow(this.render_row(i));
                    out.push(temp);
                    if (temp) {
                        out.push(close)
                    }
                }
            }
        }
        return [out.join("")]
    };
    this._serializeRow = function(r, i) {
        var out = [];
        var ra = this.xml.row_attrs;
        var ca = this.xml.cell_attrs;
        out.push("<" + this.xml.s_row);
        out.push(" id='" + r.idd + "'");
        if ((this._sAll) && this.selectedRows._dhx_find(r) != -1) {
            out.push(" selected='1'")
        }
        if (this._h2 && this._h2.get[r.idd].state == "minus") {
            out.push(" open='1'")
        }
        if (ra.length) {
            for (var i = 0; i < ra.length; i++) {
                out.push(" " + ra[i] + "='" + r._attrs[ra[i]] + "'")
            }
        }
        out.push(">");
        if (this._sUDa && this.UserData[r.idd]) {
            keysAr = this.UserData[r.idd].getKeys();
            for (var ii = 0; ii < keysAr.length; ii++) {
                out.push("<userdata name='" + keysAr[ii] + "'>" + (this._asCDATA ? "<![CDATA[" : "") + this.UserData[r.idd].get(keysAr[ii]) + (this._asCDATA ? "]]>" : "") + "</userdata>")
            }
        }
        var changeFl = false;
        for (var jj = 0; jj < this._cCount; jj++) {
            if ((!this._srClmn) || (this._srClmn[jj])) {
                var zx = this.cells3(r, jj);
                out.push("<cell");
                if (ca.length) {
                    for (var i = 0; i < ca.length; i++) {
                        out.push(" " + ca[i] + "='" + zx.cell._attrs[ca[i]] + "'")
                    }
                }
                zxVal = zx[this._agetm]();
                if (this._asCDATA) {
                    zxVal = "<![CDATA[" + zxVal + "]]>"
                }
                if ((this._ecspn) && (zx.cell.colSpan) && zx.cell.colSpan > 1) {
                    out.push(' colspan="' + zx.cell.colSpan + '" ')
                }
                if (this._chAttr) {
                    if (zx.wasChanged()) {
                        out.push(' changed="1"');
                        changeFl = true
                    }
                } else {
                    if ((this._onlChAttr) && (zx.wasChanged())) {
                        changeFl = true
                    }
                }
                if (this._sAll && this.cellType[jj] == "tree") {
                    out.push((this._h2 ? (" image='" + this._h2.get[r.idd].image + "'") : "") + ">" + zxVal + "</cell>")
                } else {
                    out.push(">" + zxVal + "</cell>")
                }
                if ((this._ecspn) && (zx.cell.colSpan)) {
                    for (var u = 0; u < zx.cell.colSpan - 1; u++) {
                        out.push("<cell/>");
                        jj++
                    }
                }
            }
        }
        if ((this._onlChAttr) && (!changeFl) && (!r._added)) {
            return ""
        }
        return out.join("")
    };
    this._serialiseConfig = function() {
        var out = "<head>";
        for (var i = 0; i < this.hdr.rows[0].cells.length; i++) {
            if (this._srClmn && !this._srClmn[i]) {
                continue
            }
            var sort = this.fldSort[i];
            if (sort == "cus") {
                sort = this._customSorts[i].toString();
                sort = sort.replace(/function[\ ]*/, "").replace(/\([^\f]*/, "")
            }
            out += "<column width='" + this.getColWidth(i) + "' align='" + this.cellAlign[i] + "' type='" + this.cellType[i] + "' sort='" + (sort || "na") + "' color='" + this.columnColor[i] + "'" + (this.columnIds[i] ? (" id='" + this.columnIds[i] + "'") : "") + ">";
            if (this._asCDATA) {
                out += "<![CDATA[" + this.getHeaderCol(i) + "]]>"
            } else {
                out += this.getHeaderCol(i)
            }
            var z = this.getCombo(i);
            if (z) {
                for (var j = 0; j < z.keys.length; j++) {
                    out += "<option value='" + z.keys[j] + "'>" + z.values[j] + "</option>"
                }
            }
            out += "</column>"
        }
        return out += "</head>"
    };
    this.serialize = function() {
        var out = '<?xml version="1.0"?><rows>';
        if (this._mathSerialization) {
            this._agetm = "getMathValue"
        } else {
            this._agetm = "getValue"
        }
        if (this._sUDa && this.UserData.gridglobaluserdata) {
            var keysAr = this.UserData.gridglobaluserdata.getKeys();
            for (var i = 0; i < keysAr.length; i++) {
                out += "<userdata name='" + keysAr[i] + "'>" + this.UserData.gridglobaluserdata.get(keysAr[i]) + "</userdata>"
            }
        }
        if (this._sConfig) {
            out += this._serialiseConfig()
        }
        out += this._serialise();
        out += "</rows>";
        return out
    };
    this.getPosition = function(oNode, pNode) {
        if (!pNode && !_isChrome) {
            var pos = getOffset(oNode);
            return [pos.left, pos.top]
        }
        pNode = pNode || document.body;
        var oCurrentNode = oNode;
        var iLeft = 0;
        var iTop = 0;
        while ((oCurrentNode) && (oCurrentNode != pNode)) {
            iLeft += oCurrentNode.offsetLeft - oCurrentNode.scrollLeft;
            iTop += oCurrentNode.offsetTop - oCurrentNode.scrollTop;
            oCurrentNode = oCurrentNode.offsetParent
        }
        if (pNode == document.body) {
            if (_isIE) {
                iTop += document.body.offsetTop || document.documentElement.offsetTop;
                iLeft += document.body.offsetLeft || document.documentElement.offsetLeft
            } else {
                if (!_isFF) {
                    iLeft += document.body.offsetLeft;
                    iTop += document.body.offsetTop
                }
            }
        }
        return [iLeft, iTop]
    };
    this.getFirstParentOfType = function(obj, tag) {
        while (obj && obj.tagName != tag && obj.tagName != "BODY") {
            obj = obj.parentNode
        }
        return obj
    };
    this.objBox.onscroll = function() {
        this.grid._doOnScroll()
    };
    if ((!_isOpera) || (_OperaRv > 8.5)) {
        this.hdr.onmousemove = function(e) {
            this.grid.changeCursorState(e || window.event)
        };
        this.hdr.onmousedown = function(e) {
            return this.grid.startColResize(e || window.event)
        }
    }
    this.obj.onmousemove = this._drawTooltip;
    this.obj.onclick = function(e) {
        this.grid._doClick(e || window.event);
        if (this.grid._sclE) {
            this.grid.editCell(e || window.event)
        }(e || event).cancelBubble = true
    };
    if (_isMacOS) {
        this.entBox.oncontextmenu = function(e) {
            e.cancelBubble = true;
            e.returnValue = false;
            return this.grid._doContClick(e || window.event)
        }
    } else {
        this.entBox.onmousedown = function(e) {
            return this.grid._doContClick(e || window.event)
        };
        this.entBox.oncontextmenu = function(e) {
            if (this.grid._ctmndx) {
                (e || event).cancelBubble = true
            }
            return !this.grid._ctmndx
        }
    }
    this.obj.ondblclick = function(e) {
        if (!this.grid.wasDblClicked(e || window.event)) {
            return false
        }
        if (this.grid._dclE) {
            var row = this.grid.getFirstParentOfType((_isIE ? event.srcElement : e.target), "TR");
            if (row == this.grid.row) {
                this.grid.editCell(e || window.event)
            }
        }(e || event).cancelBubble = true;
        if (_isOpera) {
            return false
        }
    };
    this.hdr.onclick = this._onHeaderClick;
    this.sortImg.onclick = function() {
        self._onHeaderClick.apply({
            grid: self
        }, [null, self.r_fldSorted])
    };
    this.hdr.ondblclick = this._onHeaderDblClick;
    if (!document.body._dhtmlxgrid_onkeydown) {
        dhtmlxEvent(document, _isOpera ? "keypress" : "keydown", function(e) {
            if (globalActiveDHTMLGridObject) {
                return globalActiveDHTMLGridObject.doKey(e || window.event)
            }
        });
        document.body._dhtmlxgrid_onkeydown = true
    }
    dhtmlxEvent(document.body, "click", function() {
        if (self.editStop) {
            self.editStop()
        }
    });
    this.entBox.onbeforeactivate = function() {
        this._still_active = null;
        this.grid.setActive();
        event.cancelBubble = true
    };
    this.entBox.onbeforedeactivate = function() {
        if (this.grid._still_active) {
            this.grid._still_active = null
        } else {
            this.grid.isActive = false
        }
        event.cancelBubble = true
    };
    if (this.entBox.style.height.toString().indexOf("%") != -1) {
        this._delta_y = this.entBox.style.height
    }
    if (this.entBox.style.width.toString().indexOf("%") != -1) {
        this._delta_x = this.entBox.style.width
    }
    if (this._delta_x || this._delta_y) {
        this._setAutoResize()
    }
    this.setColHidden = this.setColumnsVisibility;
    this.enableCollSpan = this.enableColSpan;
    this.setMultiselect = this.enableMultiselect;
    this.setMultiLine = this.enableMultiline;
    this.deleteSelectedItem = this.deleteSelectedRows;
    this.getSelectedId = this.getSelectedRowId;
    this.getHeaderCol = this.getColumnLabel;
    this.isItemExists = this.doesRowExist;
    this.getColumnCount = this.getColumnsNum;
    this.setSelectedRow = this.selectRowById;
    this.setHeaderCol = this.setColumnLabel;
    this.preventIECashing = this.preventIECaching;
    this.enableAutoHeigth = this.enableAutoHeight;
    this.getUID = this.uid;
    if (dhtmlx.image_path) {
        this.setImagePath(dhtmlx.image_path)
    }
    if (dhtmlx.skin) {
        this.setSkin(dhtmlx.skin)
    }
    return this
}
dhtmlXGridObject.prototype = {
    getRowAttribute: function(b, a) {
        return this.getRowById(b)._attrs[a]
    },
    setRowAttribute: function(c, a, b) {
        this.getRowById(c)._attrs[a] = b
    },
    isTreeGrid: function() {
        return (this.cellType._dhx_find("tree") != -1)
    },
    setRowHidden: function(g, c) {
        var b = convertStringToBoolean(c);
        var e = this.getRowById(g);
        if (!e) {
            return
        }
        if (e.expand === "") {
            this.collapseKids(e)
        }
        if ((c) && (e.style.display != "none")) {
            e.style.display = "none";
            var d = this.selectedRows._dhx_find(e);
            if (d != -1) {
                e.className = e.className.replace("rowselected", "");
                for (var a = 0; a < e.childNodes.length; a++) {
                    e.childNodes[a].className = e.childNodes[a].className.replace(/cellselected/g, "")
                }
                this.selectedRows._dhx_removeAt(d)
            }
            this.callEvent("onGridReconstructed", [])
        }
        if ((!c) && (e.style.display == "none")) {
            e.style.display = "";
            this.callEvent("onGridReconstructed", [])
        }
        this.setSizes()
    },
    setColumnHidden: function(c, b) {
        if (!this.hdr.rows.length) {
            if (!this._ivizcol) {
                this._ivizcol = []
            }
            return this._ivizcol[c] = b
        }
        if ((this.fldSorted) && (this.fldSorted.cellIndex == c) && (b)) {
            this.sortImg.style.display = "none"
        }
        var a = convertStringToBoolean(b);
        if (a) {
            if (!this._hrrar) {
                this._hrrar = new Array()
            } else {
                if (this._hrrar[c]) {
                    return
                }
            }
            this._hrrar[c] = "display:none;";
            this._hideShowColumn(c, "none")
        } else {
            if ((!this._hrrar) || (!this._hrrar[c])) {
                return
            }
            this._hrrar[c] = "";
            this._hideShowColumn(c, "")
        }
        if ((this.fldSorted) && (this.fldSorted.cellIndex == c) && (!b)) {
            this.sortImg.style.display = "inline"
        }
        this.setSortImgPos();
        this.callEvent("onColumnHidden", [c, b])
    },
    isColumnHidden: function(a) {
        if ((this._hrrar) && (this._hrrar[a])) {
            return true
        }
        return false
    },
    setColumnsVisibility: function(b) {
        if (b) {
            this._ivizcol = b.split(this.delim)
        }
        if (this.hdr.rows.length && this._ivizcol) {
            for (var a = 0; a < this._ivizcol.length; a++) {
                this.setColumnHidden(a, this._ivizcol[a])
            }
        }
    },
    _fixHiddenRowsAll: function(h, c, a, b, f) {
        f = f || "_cellIndex";
        var g = h.rows.length;
        for (var e = 0; e < g; e++) {
            var k = h.rows[e].childNodes;
            if (k.length != this._cCount) {
                for (var d = 0; d < k.length; d++) {
                    if (k[d][f] == c) {
                        k[d].style[a] = b;
                        break
                    }
                }
            } else {
                k[c].style[a] = b
            }
        }
    },
    _hideShowColumn: function(e, d) {
        var a = e;
        if ((this.hdr.rows[1]._childIndexes) && (this.hdr.rows[1]._childIndexes[e] != e)) {
            a = this.hdr.rows[1]._childIndexes[e]
        }
        if (d == "none") {
            this.hdr.rows[0].cells[e]._oldWidth = this.hdr.rows[0].cells[e].style.width || (this.initCellWidth[e] + "px");
            this.hdr.rows[0].cells[e]._oldWidthP = this.cellWidthPC[e];
            this.obj.rows[0].cells[e].style.width = "0px";
            var b = {
                rows: [this.obj.rows[0]]
            };
            this.forEachRow(function(f) {
                if (this.rowsAr[f].tagName == "TR") {
                    b.rows.push(this.rowsAr[f])
                }
            });
            this._fixHiddenRowsAll(b, e, "display", "none");
            if (this.isTreeGrid()) {
                this._fixHiddenRowsAllTG(e, "none")
            }
            if ((_isOpera && _OperaRv < 9) || _isKHTML || (_isFF)) {
                this._fixHiddenRowsAll(this.hdr, e, "display", "none", "_cellIndexS")
            }
            if (this.ftr) {
                this._fixHiddenRowsAll(this.ftr.childNodes[0], e, "display", "none")
            }
            this._fixHiddenRowsAll(this.hdr, e, "whiteSpace", "nowrap", "_cellIndexS");
            if (!this.cellWidthPX.length && !this.cellWidthPC.length) {
                this.cellWidthPX = [].concat(this.initCellWidth)
            }
            if (this.cellWidthPX[e]) {
                this.cellWidthPX[e] = 0
            }
            if (this.cellWidthPC[e]) {
                this.cellWidthPC[e] = 0
            }
        } else {
            if (this.hdr.rows[0].cells[e]._oldWidth) {
                var c = this.hdr.rows[0].cells[e];
                if (_isOpera || _isKHTML || (_isFF)) {
                    this._fixHiddenRowsAll(this.hdr, e, "display", "", "_cellIndexS")
                }
                if (this.ftr) {
                    this._fixHiddenRowsAll(this.ftr.childNodes[0], e, "display", "")
                }
                var b = {
                    rows: [this.obj.rows[0]]
                };
                this.forEachRow(function(f) {
                    if (this.rowsAr[f].tagName == "TR") {
                        b.rows.push(this.rowsAr[f])
                    }
                });
                this._fixHiddenRowsAll(b, e, "display", "");
                if (this.isTreeGrid()) {
                    this._fixHiddenRowsAllTG(e, "")
                }
                this._fixHiddenRowsAll(this.hdr, e, "whiteSpace", "normal", "_cellIndexS");
                if (c._oldWidthP) {
                    this.cellWidthPC[e] = c._oldWidthP
                }
                if (c._oldWidth) {
                    this.cellWidthPX[e] = parseInt(c._oldWidth)
                }
            }
        }
        this.setSizes();
        if ((!_isIE) && (!_isFF)) {
            this.obj.border = 1;
            this.obj.border = 0
        }
    },
    enableColSpan: function(a) {
        this._ecspn = convertStringToBoolean(a)
    },
    enableRowsHover: function(b, a) {
        this._unsetRowHover(false, true);
        this._hvrCss = a;
        if (convertStringToBoolean(b)) {
            if (!this._elmnh) {
                this.obj._honmousemove = this.obj.onmousemove;
                this.obj.onmousemove = this._setRowHover;
                if (_isIE) {
                    this.obj.onmouseleave = this._unsetRowHover
                } else {
                    this.obj.onmouseout = this._unsetRowHover
                }
                this._elmnh = true
            }
        } else {
            if (this._elmnh) {
                this.obj.onmousemove = this.obj._honmousemove;
                if (_isIE) {
                    this.obj.onmouseleave = null
                } else {
                    this.obj.onmouseout = null
                }
                this._elmnh = false
            }
        }
    },
    enableEditEvents: function(b, c, a) {
        this._sclE = convertStringToBoolean(b);
        this._dclE = convertStringToBoolean(c);
        this._f2kE = convertStringToBoolean(a)
    },
    enableLightMouseNavigation: function(a) {
        if (convertStringToBoolean(a)) {
            if (!this._elmn) {
                this.entBox._onclick = this.entBox.onclick;
                this.entBox.onclick = function() {
                    return true
                };
                this.obj._onclick = this.obj.onclick;
                this.obj.onclick = function(b) {
                    var d = this.grid.getFirstParentOfType(b ? b.target : event.srcElement, "TD");
                    if (!d) {
                        return
                    }
                    this.grid.editStop();
                    this.grid.doClick(d);
                    this.grid.editCell();
                    (b || event).cancelBubble = true
                };
                this.obj._onmousemove = this.obj.onmousemove;
                this.obj.onmousemove = this._autoMoveSelect;
                this._elmn = true
            }
        } else {
            if (this._elmn) {
                this.entBox.onclick = this.entBox._onclick;
                this.obj.onclick = this.obj._onclick;
                this.obj.onmousemove = this.obj._onmousemove;
                this._elmn = false
            }
        }
    },
    _unsetRowHover: function(b, d) {
        if (d) {
            that = this
        } else {
            that = this.grid
        }
        if ((that._lahRw) && (that._lahRw != d)) {
            for (var a = 0; a < that._lahRw.childNodes.length; a++) {
                that._lahRw.childNodes[a].className = that._lahRw.childNodes[a].className.replace(that._hvrCss, "")
            }
            that._lahRw = null
        }
    },
    _setRowHover: function(b) {
        var d = this.grid.getFirstParentOfType(b ? b.target : event.srcElement, "TD");
        if (d && d.parentNode != this.grid._lahRw) {
            this.grid._unsetRowHover(0, d);
            d = d.parentNode;
            if (!d.idd || d.idd == "__filler__") {
                return
            }
            for (var a = 0; a < d.childNodes.length; a++) {
                d.childNodes[a].className += " " + this.grid._hvrCss
            }
            this.grid._lahRw = d
        }
        this._honmousemove(b)
    },
    _autoMoveSelect: function(a) {
        if (!this.grid.editor) {
            var b = this.grid.getFirstParentOfType(a ? a.target : event.srcElement, "TD");
            if (b.parentNode.idd) {
                this.grid.doClick(b, true, 0)
            }
        }
        this._onmousemove(a)
    },
    enableDistributedParsing: function(c, a, b) {
        if (convertStringToBoolean(c)) {
            this._ads_count = a || 10;
            this._ads_time = b || 250
        } else {
            this._ads_count = 0
        }
    },
    destructor: function() {
        this.editStop(true);
        if (this._sizeTime) {
            this._sizeTime = window.clearTimeout(this._sizeTime)
        }
        this.entBox.className = (this.entBox.className || "").replace(/gridbox.*/, "");
        if (this.formInputs) {
            for (var c = 0; c < this.formInputs.length; c++) {
                this.parentForm.removeChild(this.formInputs[c])
            }
        }
        var b;
        this.xmlLoader = this.xmlLoader.destructor();
        for (var c = 0; c < this.rowsCol.length; c++) {
            if (this.rowsCol[c]) {
                this.rowsCol[c].grid = null
            }
        }
        for (c in this.rowsAr) {
            if (this.rowsAr[c]) {
                this.rowsAr[c] = null
            }
        }
        this.rowsCol = new dhtmlxArray();
        this.rowsAr = new Array();
        this.entBox.innerHTML = "";
        var d = function() {};
        this.entBox.onclick = this.entBox.onmousedown = this.entBox.onbeforeactivate = this.entBox.onbeforedeactivate = this.entBox.onbeforedeactivate = this.entBox.onselectstart = d;
        this.setSizes = this._update_srnd_view = this.callEvent = d;
        this.entBox.grid = this.objBox.grid = this.hdrBox.grid = this.obj.grid = this.hdr.grid = null;
        for (b in this) {
            if ((this[b]) && (this[b].m_obj)) {
                this[b].m_obj = null
            }
            this[b] = null
        }
        if (this == globalActiveDHTMLGridObject) {
            globalActiveDHTMLGridObject = null
        }
        return null
    },
    getSortingState: function() {
        var a = new Array();
        if (this.fldSorted) {
            a[0] = this.fldSorted._cellIndex;
            a[1] = (this.sortImg.typ == "d") ? "des" : "asc"
        }
        return a
    },
    enableAutoHeight: function(c, b, a) {
        this._ahgr = convertStringToBoolean(c);
        this._ahgrF = convertStringToBoolean(a);
        this._ahgrM = b || null;
        if (arguments.length == 1) {
            this.objBox.style.overflowY = c ? "hidden" : "auto"
        }
        if (b == "auto") {
            this._ahgrM = null;
            this._ahgrMA = true;
            this._setAutoResize()
        }
    },
    enableStableSorting: function(a) {
        this._sst = convertStringToBoolean(a);
        this.rowsCol.stablesort = function(f) {
            var e = this.length - 1;
            for (var d = 0; d < this.length - 1; d++) {
                for (var c = 0; c < e; c++) {
                    if (f(this[c], this[c + 1]) > 0) {
                        var b = this[c];
                        this[c] = this[c + 1];
                        this[c + 1] = b
                    }
                }
                e--
            }
        }
    },
    enableKeyboardSupport: function(a) {
        this._htkebl = !convertStringToBoolean(a)
    },
    enableContextMenu: function(a) {
        this._ctmndx = a
    },
    setScrollbarWidthCorrection: function(a) {},
    enableTooltips: function(b) {
        this._enbTts = b.split(",");
        for (var a = 0; a < this._enbTts.length; a++) {
            this._enbTts[a] = convertStringToBoolean(this._enbTts[a])
        }
    },
    enableResizing: function(b) {
        this._drsclmn = b.split(",");
        for (var a = 0; a < this._drsclmn.length; a++) {
            this._drsclmn[a] = convertStringToBoolean(this._drsclmn[a])
        }
    },
    setColumnMinWidth: function(a, b) {
        if (arguments.length == 2) {
            if (!this._drsclmW) {
                this._drsclmW = new Array()
            }
            this._drsclmW[b] = a
        } else {
            this._drsclmW = a.split(",")
        }
    },
    enableCellIds: function(a) {
        this._enbCid = convertStringToBoolean(a)
    },
    lockRow: function(a, c) {
        var b = this.getRowById(a);
        if (b) {
            b._locked = convertStringToBoolean(c);
            if ((this.cell) && (this.cell.parentNode.idd == a)) {
                this.editStop()
            }
        }
    },
    _getRowArray: function(e) {
        var d = new Array();
        for (var c = 0; c < e.childNodes.length; c++) {
            var b = this.cells3(e, c);
            d[c] = b.getValue()
        }
        return d
    },
    setDateFormat: function(b, a) {
        this._dtmask = b;
        this._dtmask_inc = a
    },
    setNumberFormat: function(h, c, e, g) {
        var d = h.replace(/[^0\,\.]*/g, "");
        var a = d.indexOf(".");
        if (a > -1) {
            a = d.length - a - 1
        }
        var b = d.indexOf(",");
        if (b > -1) {
            b = d.length - a - 2 - b
        }
        if (typeof e != "string") {
            e = this.i18n.decimal_separator
        }
        if (typeof g != "string") {
            g = this.i18n.group_separator
        }
        var i = h.split(d)[0];
        var f = h.split(d)[1];
        this._maskArr[c] = [a, b, i, f, e, g]
    },
    _aplNFb: function(e, d) {
        var b = this._maskArr[d];
        if (!b) {
            return e
        }
        var c = parseFloat(e.toString().replace(/[^0-9]*/g, ""));
        if (e.toString().substr(0, 1) == "-") {
            c = c * -1
        }
        if (b[0] > 0) {
            c = c / Math.pow(10, b[0])
        }
        return c
    },
    _aplNF: function(f, e) {
        var b = this._maskArr[e];
        if (!b) {
            return f
        }
        var g = (parseFloat(f) < 0 ? "-" : "") + b[2];
        f = Math.abs(Math.round(parseFloat(f) * Math.pow(10, b[0] > 0 ? b[0] : 0))).toString();
        f = (f.length < b[0] ? Math.pow(10, b[0] + 1 - f.length).toString().substr(1, b[0] + 1) + f.toString() : f).split("").reverse();
        f[b[0]] = (f[b[0]] || "0") + b[4];
        if (b[1] > 0) {
            for (var d = (b[0] > 0 ? 0 : 1) + b[0] + b[1]; d < f.length; d += b[1]) {
                f[d] += b[5]
            }
        }
        return g + f.reverse().join("") + b[3]
    },
    _launchCommands: function(a) {
        for (var d = 0; d < a.length; d++) {
            var c = new Array();
            for (var b = 0; b < a[d].childNodes.length; b++) {
                if (a[d].childNodes[b].nodeType == 1) {
                    c[c.length] = a[d].childNodes[b].firstChild.data
                }
            }
            this[a[d].getAttribute("command")].apply(this, c)
        }
    },
    _parseHead: function(r) {
        var g = this.xmlLoader.doXPath("./head", r);
        if (g.length) {
            var b = this.xmlLoader.doXPath("./column", g[0]);
            var k = this.xmlLoader.doXPath("./settings", g[0]);
            var l = "setInitWidths";
            var o = false;
            if (k[0]) {
                for (var t = 0; t < k[0].childNodes.length; t++) {
                    switch (k[0].childNodes[t].tagName) {
                        case "colwidth":
                            if (k[0].childNodes[t].firstChild && k[0].childNodes[t].firstChild.data == "%") {
                                l = "setInitWidthsP"
                            }
                            break;
                        case "splitat":
                            o = (k[0].childNodes[t].firstChild ? k[0].childNodes[t].firstChild.data : false);
                            break
                    }
                }
            }
            this._launchCommands(this.xmlLoader.doXPath("./beforeInit/call", g[0]));
            if (b.length > 0) {
                if (this.hdr.rows.length > 0) {
                    this.clearAll(true)
                }
                var n = [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ];
                var p = ["", "width", "type", "align", "sort", "color", "format", "hidden", "id"];
                var q = ["", l, "setColTypes", "setColAlign", "setColSorting", "setColumnColor", "", "", "setColumnIds"];
                for (var h = 0; h < b.length; h++) {
                    for (var f = 1; f < p.length; f++) {
                        n[f].push(b[h].getAttribute(p[f]))
                    }
                    n[0].push((b[h].firstChild ? b[h].firstChild.data : "").replace(/^\s*((\s\S)*.+)\s*$/gi, "$1"))
                }
                this.setHeader(n[0]);
                for (var h = 0; h < q.length; h++) {
                    if (q[h]) {
                        this[q[h]](n[h].join(this.delim))
                    }
                }
                for (var h = 0; h < b.length; h++) {
                    if ((this.cellType[h].indexOf("co") == 0) || (this.cellType[h] == "clist")) {
                        var e = this.xmlLoader.doXPath("./option", b[h]);
                        if (e.length) {
                            var a = new Array();
                            if (this.cellType[h] == "clist") {
                                for (var f = 0; f < e.length; f++) {
                                    a[a.length] = e[f].firstChild ? e[f].firstChild.data : ""
                                }
                                this.registerCList(h, a)
                            } else {
                                var c = this.getCombo(h);
                                for (var f = 0; f < e.length; f++) {
                                    c.put(e[f].getAttribute("value"), e[f].firstChild ? e[f].firstChild.data : "")
                                }
                            }
                        }
                    } else {
                        if (n[6][h]) {
                            if ((this.cellType[h].toLowerCase().indexOf("calendar") != -1) || (this.fldSort[h] == "date")) {
                                this.setDateFormat(n[6][h])
                            } else {
                                this.setNumberFormat(n[6][h], h)
                            }
                        }
                    }
                }
                this.init();
                var d = n[7].join(this.delim);
                if (this.setColHidden && d.replace(/,/g, "") != "") {
                    this.setColHidden(d)
                }
                if ((o) && (this.splitAt)) {
                    this.splitAt(o)
                }
            }
            this._launchCommands(this.xmlLoader.doXPath("./afterInit/call", g[0]))
        }
        var m = this.xmlLoader.doXPath("//rows/userdata", r);
        if (m.length > 0) {
            if (!this.UserData.gridglobaluserdata) {
                this.UserData.gridglobaluserdata = new Hashtable()
            }
            for (var f = 0; f < m.length; f++) {
                this.UserData.gridglobaluserdata.put(m[f].getAttribute("name"), m[f].firstChild ? m[f].firstChild.data : "")
            }
        }
    },
    getCheckedRows: function(a) {
        var b = new Array();
        this.forEachRowA(function(c) {
            if (this.cells(c, a).getValue() != 0) {
                b.push(c)
            }
        }, true);
        return b.join(",")
    },
    checkAll: function() {
        var b = arguments.length ? arguments[0] : 1;
        for (var a = 0; a < this.getColumnsNum(); a++) {
            if (this.getColType(a) == "ch") {
                this.setCheckedRows(a, b)
            }
        }
    },
    uncheckAll: function() {
        this.checkAll(0)
    },
    setCheckedRows: function(b, a) {
        this.forEachRowA(function(c) {
            if (this.cells(c, b).isCheckbox()) {
                this.cells(c, b).setValue(a)
            }
        })
    },
    _drawTooltip: function(f) {
        var g = this.grid.getFirstParentOfType(f ? f.target : event.srcElement, "TD");
        if (!g || ((this.grid.editor) && (this.grid.editor.cell == g))) {
            return true
        }
        var d = g.parentNode;
        if (!d.idd || d.idd == "__filler__") {
            return
        }
        var b = (f ? f.target : event.srcElement);
        if (d.idd == window.unknown) {
            return true
        }
        if (!this.grid.callEvent("onMouseOver", [d.idd, g._cellIndex, (f || window.event)])) {
            return true
        }
        if ((this.grid._enbTts) && (!this.grid._enbTts[g._cellIndex])) {
            if (b.title) {
                b.title = ""
            }
            return true
        }
        if (g._cellIndex >= this.grid._cCount) {
            return
        }
        var a = this.grid.cells3(d, g._cellIndex);
        if (!a || !a.cell || !a.cell._attrs) {
            return
        }
        if (b._title) {
            a.cell.title = ""
        }
        if (!a.cell._attrs.title) {
            b._title = true
        }
        if (a) {
            b.title = a.cell._attrs.title || (a.getTitle ? a.getTitle() : (a.getValue() || "").toString().replace(/<[^>]*>/gi, ""))
        }
        return true
    },
    enableCellWidthCorrection: function(a) {
        if (_isFF) {
            this._wcorr = parseInt(a)
        }
    },
    getAllRowIds: function(c) {
        var a = [];
        for (var b = 0; b < this.rowsBuffer.length; b++) {
            if (this.rowsBuffer[b]) {
                a.push(this.rowsBuffer[b].idd)
            }
        }
        return a.join(c || this.delim)
    },
    getAllItemIds: function() {
        return this.getAllRowIds()
    },
    setColspan: function(b, p, d) {
        if (!this._ecspn) {
            return
        }
        var a = this.getRowById(b);
        if ((a._childIndexes) && (a.childNodes[a._childIndexes[p]])) {
            var g = a._childIndexes[p];
            var e = a.childNodes[g];
            var f = e.colSpan;
            e.colSpan = 1;
            if ((f) && (f != 1)) {
                for (var k = 1; k < f; k++) {
                    var o = document.createElement("TD");
                    if (e.nextSibling) {
                        a.insertBefore(o, e.nextSibling)
                    } else {
                        a.appendChild(o)
                    }
                    a._childIndexes[p + k] = g + k;
                    o._cellIndex = p + k;
                    o.style.textAlign = this.cellAlign[k];
                    o.style.verticalAlign = this.cellVAlign[k];
                    e = o;
                    this.cells3(a, p + k).setValue("")
                }
            }
            for (var l = p * 1 + 1 * f; l < a._childIndexes.length; l++) {
                a._childIndexes[l] += (f - 1) * 1
            }
        }
        if ((d) && (d > 1)) {
            if (a._childIndexes) {
                var g = a._childIndexes[p]
            } else {
                var g = p;
                a._childIndexes = new Array();
                for (var l = 0; l < a.childNodes.length; l++) {
                    a._childIndexes[l] = l
                }
            }
            a.childNodes[g].colSpan = d;
            for (var l = 1; l < d; l++) {
                a._childIndexes[a.childNodes[g + 1]._cellIndex] = g;
                a.removeChild(a.childNodes[g + 1])
            }
            var h = a.childNodes[a._childIndexes[p]]._cellIndex;
            for (var l = h * 1 + 1 * d; l < a._childIndexes.length; l++) {
                a._childIndexes[l] -= (d - 1)
            }
        }
    },
    preventIECaching: function(a) {
        this.no_cashe = convertStringToBoolean(a);
        this.xmlLoader.rSeed = this.no_cashe
    },
    enableColumnAutoSize: function(a) {
        this._eCAS = convertStringToBoolean(a)
    },
    _onHeaderDblClick: function(c) {
        var b = this.grid;
        var a = b.getFirstParentOfType(_isIE ? event.srcElement : c.target, "TD");
        if (!b._eCAS) {
            return false
        }
        b.adjustColumnSize(a._cellIndexS)
    },
    adjustColumnSize: function(f, h) {
        if (this._hrrar && this._hrrar[f]) {
            return
        }
        this._notresize = true;
        var b = 0;
        this._setColumnSizeR(f, 20);
        for (var e = 1; e < this.hdr.rows.length; e++) {
            var d = this.hdr.rows[e];
            d = d.childNodes[(d._childIndexes) ? d._childIndexes[f] : f];
            if ((d) && ((!d.colSpan) || (d.colSpan < 2)) && d._cellIndex == f) {
                if ((d.childNodes[0]) && (d.childNodes[0].className == "hdrcell")) {
                    d = d.childNodes[0]
                }
                b = Math.max(b, ((_isFF || _isOpera) ? (d.textContent.length * 7) : d.scrollWidth))
            }
        }
        var c = this.obj.rows.length;
        for (var g = 1; g < c; g++) {
            var k = this.obj.rows[g];
            if (!this.rowsAr[k.idd]) {
                continue
            }
            if (k._childIndexes && k._childIndexes[f] != f || !k.childNodes[f]) {
                continue
            }
            if (_isFF || _isOpera || h) {
                k = k.childNodes[f].textContent.length * 7
            } else {
                k = k.childNodes[f].scrollWidth
            }
            if (k > b) {
                b = k
            }
        }
        b += 20 + (h || 0);
        this._setColumnSizeR(f, b);
        this._notresize = false;
        this.setSizes()
    },
    detachHeader: function(a, c) {
        c = c || this.hdr;
        var b = c.rows[a + 1];
        if (b) {
            b.parentNode.removeChild(b)
        }
        this.setSizes()
    },
    detachFooter: function(a) {
        this.detachHeader(a, this.ftr)
    },
    attachHeader: function(a, d, b) {
        if (typeof(a) == "string") {
            a = this._eSplit(a)
        }
        if (typeof(d) == "string") {
            d = d.split(this.delim)
        }
        b = b || "_aHead";
        if (this.hdr.rows.length) {
            if (a) {
                this._createHRow([a, d], this[(b == "_aHead") ? "hdr" : "ftr"])
            } else {
                if (this[b]) {
                    for (var c = 0; c < this[b].length; c++) {
                        this.attachHeader.apply(this, this[b][c])
                    }
                }
            }
        } else {
            if (!this[b]) {
                this[b] = new Array()
            }
            this[b][this[b].length] = [a, d, b]
        }
    },
    _createHRow: function(c, l) {
        if (!l) {
            if (this.entBox.style.position != "absolute") {
                this.entBox.style.position = "relative"
            }
            var g = document.createElement("DIV");
            g.className = "c_ftr".substr(2);
            this.entBox.appendChild(g);
            var o = document.createElement("TABLE");
            o.cellPadding = o.cellSpacing = 0;
            if (!_isIE) {
                o.width = "100%";
                o.style.paddingRight = "20px"
            }
            o.style.marginRight = "20px";
            o.style.tableLayout = "fixed";
            g.appendChild(o);
            o.appendChild(document.createElement("TBODY"));
            this.ftr = l = o;
            var f = o.insertRow(0);
            var a = ((this.hdrLabels.length <= 1) ? c[0].length : this.hdrLabels.length);
            for (var d = 0; d < a; d++) {
                f.appendChild(document.createElement("TH"));
                f.childNodes[d]._cellIndex = d
            }
            if (_isIE && _isIE < 8) {
                f.style.position = "absolute"
            } else {
                f.style.height = "auto"
            }
        }
        var e = c[1];
        var g = document.createElement("TR");
        l.rows[0].parentNode.appendChild(g);
        for (var d = 0; d < c[0].length; d++) {
            if (c[0][d] == "#cspan") {
                var h = g.cells[g.cells.length - 1];
                h.colSpan = (h.colSpan || 1) + 1;
                continue
            }
            if ((c[0][d] == "#rspan") && (l.rows.length > 1)) {
                var q = l.rows.length - 2;
                var p = false;
                var h = null;
                while (!p) {
                    var h = l.rows[q];
                    for (var b = 0; b < h.cells.length; b++) {
                        if (h.cells[b]._cellIndex == d) {
                            p = b + 1;
                            break
                        }
                    }
                    q--
                }
                h = h.cells[p - 1];
                h.rowSpan = (h.rowSpan || 1) + 1;
                continue
            }
            var k = document.createElement("TD");
            k._cellIndex = k._cellIndexS = d;
            if (this._hrrar && this._hrrar[d] && !_isIE) {
                k.style.display = "none"
            }
            if (typeof c[0][d] == "object") {
                k.appendChild(c[0][d])
            } else {
                if (this.forceDivInHeader) {
                    k.innerHTML = "<div class='hdrcell'>" + (c[0][d] || "&nbsp;") + "</div>"
                } else {
                    k.innerHTML = (c[0][d] || "&nbsp;")
                }
                if ((c[0][d] || "").indexOf("#") != -1) {
                    var o = c[0][d].match(/(^|{)#([^}]+)(}|$)/);
                    if (o) {
                        var m = "_in_header_" + o[2];
                        if (this[m]) {
                            this[m]((this.forceDivInHeader ? k.firstChild : k), d, c[0][d].split(o[0]))
                        }
                    }
                }
            }
            if (e) {
                k.style.cssText = e[d]
            }
            g.appendChild(k)
        }
        var n = l;
        if (_isKHTML) {
            if (l._kTimer) {
                window.clearTimeout(l._kTimer)
            }
            l._kTimer = window.setTimeout(function() {
                l.rows[1].style.display = "none";
                window.setTimeout(function() {
                    l.rows[1].style.display = ""
                }, 1)
            }, 500)
        }
    },
    attachFooter: function(a, b) {
        this.attachHeader(a, b, "_aFoot")
    },
    setCellExcellType: function(c, a, b) {
        this.changeCellType(this.getRowById(c), a, b)
    },
    changeCellType: function(c, d, b) {
        b = b || this.cellType[d];
        var e = this.cells3(c, d);
        var a = e.getValue();
        e.cell._cellType = b;
        var e = this.cells3(c, d);
        e.setValue(a)
    },
    setRowExcellType: function(c, b) {
        var d = this.rowsAr[c];
        for (var a = 0; a < d.childNodes.length; a++) {
            this.changeCellType(d, a, b)
        }
    },
    setColumnExcellType: function(a, c) {
        for (var b = 0; b < this.rowsBuffer.length; b++) {
            if (this.rowsBuffer[b] && this.rowsBuffer[b].tagName == "TR") {
                this.changeCellType(this.rowsBuffer[b], a, c)
            }
        }
        if (this.cellType[a] == "math") {
            this._strangeParams[b] = c
        } else {
            this.cellType[a] = c
        }
    },
    forEachRow: function(c) {
        for (var b in this.rowsAr) {
            if (this.rowsAr[b] && this.rowsAr[b].idd) {
                c.apply(this, [this.rowsAr[b].idd])
            }
        }
    },
    forEachRowA: function(c) {
        for (var b = 0; b < this.rowsBuffer.length; b++) {
            if (this.rowsBuffer[b]) {
                c.call(this, this.render_row(b).idd)
            }
        }
    },
    forEachCell: function(c, b) {
        var d = this.getRowById(c);
        if (!d) {
            return
        }
        for (var a = 0; a < this._cCount; a++) {
            b(this.cells3(d, a), a)
        }
    },
    enableAutoWidth: function(c, a, b) {
        this._awdth = [convertStringToBoolean(c), parseInt(a || 99999), parseInt(b || 0)];
        if (arguments.length == 1) {
            this.objBox.style.overflowX = c ? "hidden" : "auto"
        }
    },
    updateFromXML: function(a, d, b, c) {
        if (typeof d == "undefined") {
            d = true
        }
        this._refresh_mode = [true, d, b];
        this.load(a, c)
    },
    _refreshFromXML: function(c) {
        if (this._f_rowsBuffer) {
            this.filterBy(0, "")
        }
        reset = false;
        if (window.eXcell_tree) {
            eXcell_tree.prototype.setValueX = eXcell_tree.prototype.setValue;
            eXcell_tree.prototype.setValue = function(k) {
                var i = this.grid._h2.get[this.cell.parentNode.idd];
                if (i && this.cell.parentNode.valTag) {
                    this.setLabel(k)
                } else {
                    this.setValueX(k)
                }
            }
        }
        var j = this.cellType._dhx_find("tree");
        c.getXMLTopNode("rows");
        var d = c.doXPath("//rows")[0].getAttribute("parent") || 0;
        var f = {};
        if (this._refresh_mode[2]) {
            if (j != -1) {
                this._h2.forEachChild(d, function(i) {
                    f[i.id] = true
                }, this)
            } else {
                this.forEachRow(function(i) {
                    f[i] = true
                })
            }
        }
        var h = c.doXPath("//row");
        for (var b = 0; b < h.length; b++) {
            var g = h[b];
            var a = g.getAttribute("id");
            f[a] = false;
            var d = g.parentNode.getAttribute("id") || d;
            if (this.rowsAr[a] && this.rowsAr[a].tagName != "TR") {
                if (this._h2) {
                    this._h2.get[a].buff.data = g
                } else {
                    this.rowsBuffer[this.getRowIndex(a)].data = g
                }
                this.rowsAr[a] = g
            } else {
                if (this.rowsAr[a]) {
                    this._process_xml_row(this.rowsAr[a], g, -1);
                    this._postRowProcessing(this.rowsAr[a], true)
                } else {
                    if (this._refresh_mode[1]) {
                        var e = {
                            idd: a,
                            data: g,
                            _parser: this._process_xml_row,
                            _locator: this._get_xml_data
                        };
                        if (this._refresh_mode[1] == "top") {
                            this.rowsBuffer.unshift(e)
                        } else {
                            this.rowsBuffer.push(e)
                        }
                        if (this._h2) {
                            reset = true;
                            (this._h2.add(a, (g.parentNode.getAttribute("id") || g.parentNode.getAttribute("parent")))).buff = this.rowsBuffer[this.rowsBuffer.length - 1]
                        }
                        this.rowsAr[a] = g;
                        g = this.render_row(this.rowsBuffer.length - 1);
                        this._insertRowAt(g, -1)
                    }
                }
            }
        }
        if (this._refresh_mode[2]) {
            for (a in f) {
                if (f[a] && this.rowsAr[a]) {
                    this.deleteRow(a)
                }
            }
        }
        this._refresh_mode = null;
        if (window.eXcell_tree) {
            eXcell_tree.prototype.setValue = eXcell_tree.prototype.setValueX
        }
        if (reset) {
            this._renderSort()
        }
        if (this._f_rowsBuffer) {
            this._f_rowsBuffer = null;
            this.filterByAll()
        }
    },
    getCustomCombo: function(c, b) {
        var a = this.cells(c, b).cell;
        if (!a._combo) {
            a._combo = new dhtmlXGridComboObject()
        }
        return a._combo
    },
    setTabOrder: function(b) {
        var d = b.split(this.delim);
        this._tabOrder = [];
        var a = this._cCount || b.length;
        for (var c = 0; c < a; c++) {
            d[c] = {
                c: parseInt(d[c]),
                ind: c
            }
        }
        d.sort(function(f, e) {
            return (f.c > e.c ? 1 : -1)
        });
        for (var c = 0; c < a; c++) {
            if (!d[c + 1] || (typeof d[c].c == "undefined")) {
                this._tabOrder[d[c].ind] = (d[0].ind + 1) * -1
            } else {
                this._tabOrder[d[c].ind] = d[c + 1].ind
            }
        }
    },
    i18n: {
        loading: "Loading",
        decimal_separator: ".",
        group_separator: ","
    },
    _key_events: {
        k13_1_0: function() {
            var a = this.rowsCol._dhx_find(this.row);
            this.selectCell(this.rowsCol[a + 1], this.cell._cellIndex, true)
        },
        k13_0_1: function() {
            var a = this.rowsCol._dhx_find(this.row);
            this.selectCell(this.rowsCol[a - 1], this.cell._cellIndex, true)
        },
        k13_0_0: function() {
            this.editStop();
            this.callEvent("onEnter", [(this.row ? this.row.idd : null), (this.cell ? this.cell._cellIndex : null)]);
            this._still_active = true
        },
        k9_0_0: function() {
            this.editStop();
            if (!this.callEvent("onTab", [true])) {
                return true
            }
            var a = this._getNextCell(null, 1);
            if (a) {
                this.selectCell(a.parentNode, a._cellIndex, (this.row != a.parentNode), false, true);
                this._still_active = true
            }
        },
        k9_0_1: function() {
            this.editStop();
            if (!this.callEvent("onTab", [false])) {
                return false
            }
            var a = this._getNextCell(null, -1);
            if (a) {
                this.selectCell(a.parentNode, a._cellIndex, (this.row != a.parentNode), false, true);
                this._still_active = true
            }
        },
        k113_0_0: function() {
            if (this._f2kE) {
                this.editCell()
            }
        },
        k32_0_0: function() {
            var a = this.cells4(this.cell);
            if (!a.changeState || (a.changeState() === false)) {
                return false
            }
        },
        k27_0_0: function() {
            this.editStop(true)
        },
        k33_0_0: function() {
            if (this.pagingOn) {
                this.changePage(this.currentPage - 1)
            } else {
                this.scrollPage(-1)
            }
        },
        k34_0_0: function() {
            if (this.pagingOn) {
                this.changePage(this.currentPage + 1)
            } else {
                this.scrollPage(1)
            }
        },
        k37_0_0: function() {
            if (!this.editor && this.isTreeGrid()) {
                this.collapseKids(this.row)
            } else {
                return false
            }
        },
        k39_0_0: function() {
            if (!this.editor && this.isTreeGrid()) {
                this.expandKids(this.row)
            } else {
                return false
            }
        },
        k40_0_0: function() {
            var b = this._realfake ? this._fake : this;
            if (this.editor && this.editor.combo) {
                this.editor.shiftNext()
            } else {
                if (!this.row.idd) {
                    return
                }
                var a = Math.max((b._r_select || 0), this.getRowIndex(this.row.idd)) + 1;
                if (this.rowsBuffer[a]) {
                    b._r_select = null;
                    this.selectCell(a, this.cell._cellIndex, true);
                    if (b.pagingOn) {
                        b.showRow(b.getRowId(a))
                    }
                } else {
                    this._key_events.k34_0_0.apply(this, []);
                    if (this.pagingOn && this.rowsCol[a]) {
                        this.selectCell(a, 0, true)
                    }
                }
            }
            this._still_active = true
        },
        k38_0_0: function() {
            var b = this._realfake ? this._fake : this;
            if (this.editor && this.editor.combo) {
                this.editor.shiftPrev()
            } else {
                if (!this.row.idd) {
                    return
                }
                var a = this.getRowIndex(this.row.idd) + 1;
                if (a != -1 && (!this.pagingOn || (a != 1))) {
                    var c = this._nextRow(a - 1, -1);
                    this.selectCell(c, this.cell._cellIndex, true);
                    if (b.pagingOn && c) {
                        b.showRow(c.idd)
                    }
                } else {
                    this._key_events.k33_0_0.apply(this, [])
                }
            }
            this._still_active = true
        }
    },
    _build_master_row: function() {
        var c = document.createElement("DIV");
        var b = ["<table><tr>"];
        for (var a = 0; a < this._cCount; a++) {
            b.push("<td></td>")
        }
        b.push("</tr></table>");
        c.innerHTML = b.join("");
        this._master_row = c.firstChild.rows[0]
    },
    _prepareRow: function(a) {
        if (!this._master_row) {
            this._build_master_row()
        }
        var c = this._master_row.cloneNode(true);
        for (var b = 0; b < c.childNodes.length; b++) {
            c.childNodes[b]._cellIndex = b;
            if (this._enbCid) {
                c.childNodes[b].id = "c_" + a + "_" + b
            }
            if (this.dragAndDropOff) {
                this.dragger.addDraggableItem(c.childNodes[b], this)
            }
        }
        c.idd = a;
        c.grid = this;
        return c
    },
    _process_jsarray_row: function(b, c) {
        b._attrs = {};
        for (var a = 0; a < b.childNodes.length; a++) {
            b.childNodes[a]._attrs = {}
        }
        this._fillRow(b, (this._c_order ? this._swapColumns(c) : c));
        return b
    },
    _get_jsarray_data: function(b, a) {
        return b[a]
    },
    _process_json_row: function(b, c) {
        b._attrs = {};
        for (var a = 0; a < b.childNodes.length; a++) {
            b.childNodes[a]._attrs = {}
        }
        this._fillRow(b, (this._c_order ? this._swapColumns(c.data) : c.data));
        return b
    },
    _get_json_data: function(b, a) {
        return b.data[a]
    },
    _process_csv_row: function(b, c) {
        b._attrs = {};
        for (var a = 0; a < b.childNodes.length; a++) {
            b.childNodes[a]._attrs = {}
        }
        this._fillRow(b, (this._c_order ? this._swapColumns(c.split(this.csv.cell)) : c.split(this.csv.cell)));
        return b
    },
    _get_csv_data: function(b, a) {
        return b.split(this.csv.cell)[a]
    },
    _process_xml_row: function(a, f) {
        var l = this.xmlLoader.doXPath(this.xml.cell, f);
        var h = [];
        a._attrs = this._xml_attrs(f);
        if (this._ud_enabled) {
            var k = this.xmlLoader.doXPath("./userdata", f);
            for (var d = k.length - 1; d >= 0; d--) {
                this.setUserData(a.idd, k[d].getAttribute("name"), k[d].firstChild ? k[d].firstChild.data : "")
            }
        }
        for (var c = 0; c < l.length; c++) {
            var e = l[this._c_order ? this._c_order[c] : c];
            if (!e) {
                continue
            }
            var b = a._childIndexes ? a._childIndexes[c] : c;
            var g = e.getAttribute("type");
            if (a.childNodes[b]) {
                if (g) {
                    a.childNodes[b]._cellType = g
                }
                a.childNodes[b]._attrs = this._xml_attrs(e)
            }
            if (!e.getAttribute("xmlcontent")) {
                if (e.firstChild) {
                    e = e.firstChild.data
                } else {
                    e = ""
                }
            }
            h.push(e)
        }
        for (c < l.length; c < a.childNodes.length; c++) {
            a.childNodes[c]._attrs = {}
        }
        if (a.parentNode && a.parentNode.tagName == "row") {
            a._attrs.parent = a.parentNode.getAttribute("idd")
        }
        this._fillRow(a, h);
        return a
    },
    _get_xml_data: function(b, a) {
        b = b.firstChild;
        while (true) {
            if (!b) {
                return ""
            }
            if (b.tagName == "cell") {
                a--
            }
            if (a < 0) {
                break
            }
            b = b.nextSibling
        }
        return (b.firstChild ? b.firstChild.data : "")
    },
    _fillRow: function(d, f) {
        if (this.editor) {
            this.editStop()
        }
        for (var b = 0; b < d.childNodes.length; b++) {
            if ((b < f.length) || (this.defVal[b])) {
                var c = d.childNodes[b]._cellIndex;
                var e = f[c];
                var a = this.cells4(d.childNodes[b]);
                if ((this.defVal[c]) && ((e == "") || (typeof(e) == "undefined"))) {
                    e = this.defVal[c]
                }
                if (a) {
                    a.setValue(e)
                }
            } else {
                d.childNodes[b].innerHTML = "&nbsp;";
                d.childNodes[b]._clearCell = true
            }
        }
        return d
    },
    _postRowProcessing: function(f, h) {
        if (f._attrs["class"]) {
            f._css = f.className = f._attrs["class"]
        }
        if (f._attrs.locked) {
            f._locked = true
        }
        if (f._attrs.bgColor) {
            f.bgColor = f._attrs.bgColor
        }
        var g = 0;
        for (var b = 0; b < f.childNodes.length; b++) {
            var j = f.childNodes[b];
            var e = j._cellIndex;
            var d = j._attrs.style || f._attrs.style;
            if (d) {
                j.style.cssText += ";" + d
            }
            if (j._attrs["class"]) {
                j.className = j._attrs["class"]
            }
            d = j._attrs.align || this.cellAlign[e];
            if (d) {
                j.align = d
            }
            j.vAlign = j._attrs.valign || this.cellVAlign[e];
            var a = j._attrs.bgColor || this.columnColor[e];
            if (a) {
                j.bgColor = a
            }
            if (j._attrs.colspan && !h) {
                this.setColspan(f.idd, b + g, j._attrs.colspan);
                g += (j._attrs.colspan - 1)
            }
            if (this._hrrar && this._hrrar[e] && !h) {
                j.style.display = "none"
            }
        }
        this.callEvent("onRowCreated", [f.idd, f, null])
    },
    load: function(a, c, b) {
        this.callEvent("onXLS", [this]);
        if (arguments.length == 2 && typeof c != "function") {
            b = c;
            c = null
        }
        b = b || "xml";
        if (!this.xmlFileUrl) {
            this.xmlFileUrl = a
        }
        this._data_type = b;
        this.xmlLoader.onloadAction = function(g, e, i, h, f) {
            if (!g.callEvent) {
                return
            }
            f = g["_process_" + b](f);
            if (!g._contextCallTimer) {
                g.callEvent("onXLE", [g, 0, 0, f])
            }
            if (c) {
                c();
                c = null
            }
        };
        this.xmlLoader.loadXML(a)
    },
    loadXMLString: function(c, b) {
        var a = new dtmlXMLLoaderObject(function() {});
        a.loadXMLString(c);
        this.parse(a, b, "xml")
    },
    loadXML: function(a, b) {
        this.load(a, b, "xml")
    },
    parse: function(c, b, a) {
        if (arguments.length == 2 && typeof b != "function") {
            a = b;
            b = null
        }
        a = a || "xml";
        this._data_type = a;
        c = this["_process_" + a](c);
        if (!this._contextCallTimer) {
            this.callEvent("onXLE", [this, 0, 0, c])
        }
        if (b) {
            b()
        }
    },
    xml: {
        top: "rows",
        row: "./row",
        cell: "./cell",
        s_row: "row",
        s_cell: "cell",
        row_attrs: [],
        cell_attrs: []
    },
    csv: {
        row: "\n",
        cell: ","
    },
    _xml_attrs: function(b) {
        var c = {};
        if (b.attributes.length) {
            for (var a = 0; a < b.attributes.length; a++) {
                c[b.attributes[a].name] = b.attributes[a].value
            }
        }
        return c
    },
    _process_xml: function(a) {
        if (!a.doXPath) {
            var c = new dtmlXMLLoaderObject(function() {});
            if (typeof a == "string") {
                c.loadXMLString(a)
            } else {
                if (a.responseXML) {
                    c.xmlDoc = a
                } else {
                    c.xmlDoc = {}
                }
                c.xmlDoc.responseXML = a
            }
            a = c
        }
        if (this._refresh_mode) {
            return this._refreshFromXML(a)
        }
        this._parsing = true;
        var g = a.getXMLTopNode(this.xml.top);
        if (g.tagName.toLowerCase() != this.xml.top) {
            return
        }
        this._parseHead(g);
        var f = a.doXPath(this.xml.row, g);
        var e = parseInt(a.doXPath("//" + this.xml.top)[0].getAttribute("pos") || 0);
        var d = parseInt(a.doXPath("//" + this.xml.top)[0].getAttribute("total_count") || 0);
        if (d && !this.rowsBuffer[d - 1]) {
            this.rowsBuffer[d - 1] = null
        }
        if (this.isTreeGrid()) {
            return this._process_tree_xml(a)
        }
        for (var b = 0; b < f.length; b++) {
            if (this.rowsBuffer[b + e]) {
                continue
            }
            var h = f[b].getAttribute("id") || (b + e + 1);
            this.rowsBuffer[b + e] = {
                idd: h,
                data: f[b],
                _parser: this._process_xml_row,
                _locator: this._get_xml_data
            };
            this.rowsAr[h] = f[b]
        }
        this.render_dataset();
        this._parsing = false;
        return a.xmlDoc.responseXML ? a.xmlDoc.responseXML : a.xmlDoc
    },
    _process_jsarray: function(data) {
        this._parsing = true;
        if (data && data.xmlDoc) {
            eval("data=" + data.xmlDoc.responseText + ";")
        }
        for (var i = 0; i < data.length; i++) {
            var id = i + 1;
            this.rowsBuffer.push({
                idd: id,
                data: data[i],
                _parser: this._process_jsarray_row,
                _locator: this._get_jsarray_data
            });
            this.rowsAr[id] = data[i]
        }
        this.render_dataset();
        this._parsing = false
    },
    _process_csv: function(d) {
        this._parsing = true;
        if (d.xmlDoc) {
            d = d.xmlDoc.responseText
        }
        d = d.replace(/\r/g, "");
        d = d.split(this.csv.row);
        if (this._csvHdr) {
            this.clearAll();
            var c = d.splice(0, 1)[0].split(this.csv.cell);
            if (!this._csvAID) {
                c.splice(0, 1)
            }
            this.setHeader(c.join(this.delim));
            this.init()
        }
        for (var b = 0; b < d.length; b++) {
            if (!d[b] && b == d.length - 1) {
                continue
            }
            if (this._csvAID) {
                var e = b + 1;
                this.rowsBuffer.push({
                    idd: e,
                    data: d[b],
                    _parser: this._process_csv_row,
                    _locator: this._get_csv_data
                })
            } else {
                var a = d[b].split(this.csv.cell);
                var e = a.splice(0, 1)[0];
                this.rowsBuffer.push({
                    idd: e,
                    data: a,
                    _parser: this._process_jsarray_row,
                    _locator: this._get_jsarray_data
                })
            }
            this.rowsAr[e] = d[b]
        }
        this.render_dataset();
        this._parsing = false
    },
    _process_json: function(data) {
        this._parsing = true;
        if (data && data.xmlDoc) {
            eval("data=" + data.xmlDoc.responseText + ";")
        }
        for (var i = 0; i < data.rows.length; i++) {
            var id = data.rows[i].id;
            this.rowsBuffer.push({
                idd: id,
                data: data.rows[i],
                _parser: this._process_json_row,
                _locator: this._get_json_data
            });
            this.rowsAr[id] = data[i]
        }
        this.render_dataset();
        this._parsing = false
    },
    render_dataset: function(c, a) {
        if (this._srnd) {
            if (this._fillers) {
                return this._update_srnd_view()
            }
            a = Math.min((this._get_view_size() + (this._srnd_pr || 0)), this.rowsBuffer.length)
        }
        if (this.pagingOn) {
            c = Math.max((c || 0), (this.currentPage - 1) * this.rowsBufferOutSize);
            a = Math.min(this.currentPage * this.rowsBufferOutSize, this.rowsBuffer.length)
        } else {
            c = c || 0;
            a = a || this.rowsBuffer.length
        }
        for (var b = c; b < a; b++) {
            var e = this.render_row(b);
            if (e == -1) {
                if (this.xmlFileUrl) {
                    if (this.callEvent("onDynXLS", [b, (this._dpref ? this._dpref : (a - b))])) {
                        this.load(this.xmlFileUrl + getUrlSymbol(this.xmlFileUrl) + "posStart=" + b + "&count=" + (this._dpref ? this._dpref : (a - b)), this._data_type)
                    }
                }
                a = b;
                break
            }
            if (!e.parentNode || !e.parentNode.tagName) {
                this._insertRowAt(e, b);
                if (e._attrs.selected || e._attrs.select) {
                    this.selectRow(e, e._attrs.call ? true : false, true);
                    e._attrs.selected = e._attrs.select = null
                }
            }
            if (this._ads_count && b - c == this._ads_count) {
                var d = this;
                this._context_parsing = this._context_parsing || this._parsing;
                return this._contextCallTimer = window.setTimeout(function() {
                    d._contextCallTimer = null;
                    d.render_dataset(b, a);
                    if (!d._contextCallTimer) {
                        if (d._context_parsing) {
                            d.callEvent("onXLE", [])
                        } else {
                            d._fixAlterCss()
                        }
                        d.callEvent("onDistributedEnd", []);
                        d._context_parsing = false
                    }
                }, this._ads_time)
            }
        }
        if (this._srnd && !this._fillers) {
            this._fillers = [this._add_filler(a, this.rowsBuffer.length - a)]
        }
        this.setSizes()
    },
    render_row: function(b) {
        if (!this.rowsBuffer[b]) {
            return -1
        }
        if (this.rowsBuffer[b]._parser) {
            var a = this.rowsBuffer[b];
            if (this.rowsAr[a.idd] && this.rowsAr[a.idd].tagName == "TR") {
                return this.rowsBuffer[b] = this.rowsAr[a.idd]
            }
            var c = this._prepareRow(a.idd);
            this.rowsBuffer[b] = c;
            this.rowsAr[a.idd] = c;
            a._parser.call(this, c, a.data);
            this._postRowProcessing(c);
            return c
        }
        return this.rowsBuffer[b]
    },
    _get_cell_value: function(b, a, c) {
        if (b._locator) {
            if (this._c_order) {
                a = this._c_order[a]
            }
            return b._locator.call(this, b.data, a)
        }
        return this.cells3(b, a)[c ? c : "getValue"]()
    },
    sortRows: function(c, f, b) {
        b = (b || "asc").toLowerCase();
        f = (f || this.fldSort[c]);
        c = c || 0;
        if (this.isTreeGrid()) {
            this.sortTreeRows(c, f, b)
        } else {
            var a = {};
            var e = this.cellType[c];
            var g = "getValue";
            if (e == "link") {
                g = "getContent"
            }
            if (e == "dhxCalendar" || e == "dhxCalendarA") {
                g = "getDate"
            }
            for (var d = 0; d < this.rowsBuffer.length; d++) {
                a[this.rowsBuffer[d].idd] = this._get_cell_value(this.rowsBuffer[d], c, g)
            }
            this._sortRows(c, f, b, a)
        }
        this.callEvent("onAfterSorting", [c, f, b])
    },
    _sortCore: function(c, f, b, a, e) {
        var d = "sort";
        if (this._sst) {
            e.stablesort = this.rowsCol.stablesort;
            d = "stablesort"
        }
        if (f.length > 4) {
            f = window[f]
        }
        if (f == "cus") {
            var g = this._customSorts[c];
            e[d](function(i, h) {
                return g(a[i.idd], a[h.idd], b, i.idd, h.idd)
            })
        } else {
            if (typeof(f) == "function") {
                e[d](function(i, h) {
                    return f(a[i.idd], a[h.idd], b, i.idd, h.idd)
                })
            } else {
                if (f == "str") {
                    e[d](function(i, h) {
                        if (b == "asc") {
                            return a[i.idd] > a[h.idd] ? 1 : -1
                        } else {
                            return a[i.idd] < a[h.idd] ? 1 : -1
                        }
                    })
                } else {
                    if (f == "int") {
                        e[d](function(j, i) {
                            var h = parseFloat(a[j.idd]);
                            h = isNaN(h) ? -99999999999999 : h;
                            var k = parseFloat(a[i.idd]);
                            k = isNaN(k) ? -99999999999999 : k;
                            if (b == "asc") {
                                return h - k
                            } else {
                                return k - h
                            }
                        })
                    } else {
                        if (f == "date") {
                            e[d](function(j, i) {
                                var h = Date.parse(a[j.idd]) || (Date.parse("01/01/1900"));
                                var k = Date.parse(a[i.idd]) || (Date.parse("01/01/1900"));
                                if (b == "asc") {
                                    return h - k
                                } else {
                                    return k - h
                                }
                            })
                        }
                    }
                }
            }
        }
    },
    _sortRows: function(c, d, b, a) {
        this._sortCore(c, d, b, a, this.rowsBuffer);
        this._reset_view();
        this.callEvent("onGridReconstructed", [])
    },
    _reset_view: function(c) {
        if (!this.obj.rows[0]) {
            return
        }
        var a = this.obj.rows[0].parentNode;
        var d = a.removeChild(a.childNodes[0], true);
        if (_isKHTML) {
            for (var b = a.parentNode.childNodes.length - 1; b >= 0; b--) {
                if (a.parentNode.childNodes[b].tagName == "TR") {
                    a.parentNode.removeChild(a.parentNode.childNodes[b], true)
                }
            }
        } else {
            if (_isIE) {
                for (var b = a.childNodes.length - 1; b >= 0; b--) {
                    a.childNodes[b].removeNode(true)
                }
            } else {
                a.innerHTML = ""
            }
        }
        a.appendChild(d);
        this.rowsCol = dhtmlxArray();
        if (this._sst) {
            this.enableStableSorting(true)
        }
        this._fillers = this.undefined;
        if (!c) {
            if (_isIE && this._srnd) {
                this.render_dataset()
            } else {
                this.render_dataset()
            }
        }
    },
    deleteRow: function(b, d) {
        if (!d) {
            d = this.getRowById(b)
        }
        if (!d) {
            return
        }
        this.editStop();
        if (!this._realfake) {
            if (this.callEvent("onBeforeRowDeleted", [b]) == false) {
                return false
            }
        }
        var a = 0;
        if (this.cellType._dhx_find("tree") != -1 && !this._realfake) {
            a = this._h2.get[b].parent.id;
            this._removeTrGrRow(d)
        } else {
            if (d.parentNode) {
                d.parentNode.removeChild(d)
            }
            var g = this.rowsCol._dhx_find(d);
            if (g != -1) {
                this.rowsCol._dhx_removeAt(g)
            }
            for (var c = 0; c < this.rowsBuffer.length; c++) {
                if (this.rowsBuffer[c] && this.rowsBuffer[c].idd == b) {
                    this.rowsBuffer._dhx_removeAt(c);
                    g = c;
                    break
                }
            }
        }
        this.rowsAr[b] = null;
        for (var c = 0; c < this.selectedRows.length; c++) {
            if (this.selectedRows[c].idd == b) {
                this.selectedRows._dhx_removeAt(c)
            }
        }
        if (this._srnd) {
            for (var c = 0; c < this._fillers.length; c++) {
                var e = this._fillers[c];
                if (!e) {
                    continue
                }
                if (e[0] >= g) {
                    e[0] = e[0] - 1
                } else {
                    if (e[1] >= g) {
                        e[1] = e[1] - 1
                    }
                }
            }
            this._update_srnd_view()
        }
        if (this.pagingOn) {
            this.changePage()
        }
        if (!this._realfake) {
            this.callEvent("onAfterRowDeleted", [b, a])
        }
        this.callEvent("onGridReconstructed", []);
        if (this._ahgr) {
            this.setSizes()
        }
        return true
    },
    _addRow: function(a, k, g) {
        if (g == -1 || typeof g == "undefined") {
            g = this.rowsBuffer.length
        }
        if (typeof k == "string") {
            k = k.split(this.delim)
        }
        var h = this._prepareRow(a);
        h._attrs = {};
        for (var b = 0; b < h.childNodes.length; b++) {
            h.childNodes[b]._attrs = {}
        }
        this.rowsAr[h.idd] = h;
        if (this._h2) {
            this._h2.get[h.idd].buff = h
        }
        this._fillRow(h, k);
        this._postRowProcessing(h);
        if (this._skipInsert) {
            this._skipInsert = false;
            return this.rowsAr[h.idd] = h
        }
        if (this.pagingOn) {
            this.rowsBuffer._dhx_insertAt(g, h);
            this.rowsAr[h.idd] = h;
            return h
        }
        if (this._fillers) {
            this.rowsCol._dhx_insertAt(g, null);
            this.rowsBuffer._dhx_insertAt(g, h);
            if (this._fake) {
                this._fake.rowsCol._dhx_insertAt(g, null)
            }
            this.rowsAr[h.idd] = h;
            var e = false;
            for (var c = 0; c < this._fillers.length; c++) {
                var d = this._fillers[c];
                if (d && d[0] <= g && (d[0] + d[1]) >= g) {
                    d[1] = d[1] + 1;
                    d[2].firstChild.style.height = parseInt(d[2].firstChild.style.height) + this._srdh + "px";
                    e = true;
                    if (this._fake) {
                        this._fake._fillers[c][1]++
                    }
                }
                if (d && d[0] > g) {
                    d[0] = d[0] + 1;
                    if (this._fake) {
                        this._fake._fillers[c][0]++
                    }
                }
            }
            if (!e) {
                this._fillers.push(this._add_filler(g, 1, (g == 0 ? {
                    parentNode: this.obj.rows[0].parentNode,
                    nextSibling: (this.rowsCol[1])
                } : this.rowsCol[g - 1])))
            }
            return h
        }
        this.rowsBuffer._dhx_insertAt(g, h);
        return this._insertRowAt(h, g)
    },
    addRowP0: function(new_id, text, ind) {
        var r = this._addRow(new_id, text, ind);
        return r;
    },
    addRowP1: function() {
        this.setSizes();
        this.callEvent("onGridReconstructed", []);
    },
    addRow: function(a, d, c) {
        var b = this._addRow(a, d, c);
        if (!this.dragContext) {
            this.callEvent("onRowAdded", [a])
        }
        if (this.pagingOn) {
            this.changePage(this.currentPage)
        }
        if (this._srnd) {
            this._update_srnd_view()
        }
        b._added = true;
        if (this._ahgr) {
            this.setSizes()
        }
        this.callEvent("onGridReconstructed", []);
        return b
    },
    _insertRowAt: function(b, c, a) {
        this.rowsAr[b.idd] = b;
        if (this._skipInsert) {
            this._skipInsert = false;
            return b
        }
        if ((c < 0) || ((!c) && (parseInt(c) !== 0))) {
            c = this.rowsCol.length
        } else {
            if (c > this.rowsCol.length) {
                c = this.rowsCol.length
            }
        }
        if (this._cssEven) {
            if ((this._cssSP ? this.getLevel(b.idd) : c) % 2 == 1) {
                b.className += " " + this._cssUnEven + (this._cssSU ? (" " + this._cssUnEven + "_" + this.getLevel(b.idd)) : "")
            } else {
                b.className += " " + this._cssEven + (this._cssSU ? (" " + this._cssEven + "_" + this.getLevel(b.idd)) : "")
            }
        }
        if (!a) {
            if ((c == (this.obj.rows.length - 1)) || (!this.rowsCol[c])) {
                if (_isKHTML) {
                    this.obj.appendChild(b)
                } else {
                    this.obj.firstChild.appendChild(b)
                }
            } else {
                this.rowsCol[c].parentNode.insertBefore(b, this.rowsCol[c])
            }
        }
        this.rowsCol._dhx_insertAt(c, b);
        return b
    },
    getRowById: function(c) {
        var b = this.rowsAr[c];
        if (b) {
            if (b.tagName != "TR") {
                for (var a = 0; a < this.rowsBuffer.length; a++) {
                    if (this.rowsBuffer[a] && this.rowsBuffer[a].idd == c) {
                        return this.render_row(a)
                    }
                }
                if (this._h2) {
                    return this.render_row(null, b.idd)
                }
            }
            return b
        }
        return null
    },
    cellById: function(b, a) {
        return this.cells(b, a)
    },
    cells: function(d, b) {
        if (arguments.length == 0) {
            return this.cells4(this.cell)
        } else {
            var e = this.getRowById(d)
        }
        var a = (e._childIndexes ? e.childNodes[e._childIndexes[b]] : e.childNodes[b]);
        return this.cells4(a)
    },
    cellByIndex: function(b, a) {
        return this.cells2(b, a)
    },
    cells2: function(d, b) {
        var e = this.render_row(d);
        var a = (e._childIndexes ? e.childNodes[e._childIndexes[b]] : e.childNodes[b]);
        return this.cells4(a)
    },
    cells3: function(c, b) {
        var a = (c._childIndexes ? c.childNodes[c._childIndexes[b]] : c.childNodes[b]);
        return this.cells4(a)
    },
    cells4: function(a) {
        var b = window["eXcell_" + (a._cellType || this.cellType[a._cellIndex])];
        if (b) {
            return new b(a)
        }
    },
    cells5: function(a, c) {
        var c = c || (a._cellType || this.cellType[a._cellIndex]);
        if (!this._ecache[c]) {
            if (!window["eXcell_" + c]) {
                var b = eXcell_ro
            } else {
                var b = window["eXcell_" + c]
            }
            this._ecache[c] = new b(a)
        }
        this._ecache[c].cell = a;
        return this._ecache[c]
    },
    dma: function(a) {
        if (!this._ecache) {
            this._ecache = {}
        }
        if (a && !this._dma) {
            this._dma = this.cells4;
            this.cells4 = this.cells5
        } else {
            if (!a && this._dma) {
                this.cells4 = this._dma;
                this._dma = null
            }
        }
    },
    getRowsNum: function() {
        return this.rowsBuffer.length
    },
    enableEditTabOnly: function(a) {
        if (arguments.length > 0) {
            this.smartTabOrder = convertStringToBoolean(a)
        } else {
            this.smartTabOrder = true
        }
    },
    setExternalTabOrder: function(c, a) {
        var b = this;
        this.tabStart = (typeof(c) == "object") ? c : document.getElementById(c);
        this.tabStart.onkeydown = function(f) {
            var d = (f || window.event);
            if (d.keyCode == 9) {
                d.cancelBubble = true;
                b.selectCell(0, 0, 0, 0, 1);
                if (b.smartTabOrder && b.cells2(0, 0).isDisabled()) {
                    b._key_events.k9_0_0.call(b)
                }
                this.blur();
                return false
            }
        };
        if (_isOpera) {
            this.tabStart.onkeypress = this.tabStart.onkeydown
        }
        this.tabEnd = (typeof(a) == "object") ? a : document.getElementById(a);
        this.tabEnd.onkeydown = this.tabEnd.onkeypress = function(f) {
            var d = (f || window.event);
            if ((d.keyCode == 9) && d.shiftKey) {
                d.cancelBubble = true;
                b.selectCell((b.getRowsNum() - 1), (b.getColumnCount() - 1), 0, 0, 1);
                if (b.smartTabOrder && b.cells2((b.getRowsNum() - 1), (b.getColumnCount() - 1)).isDisabled()) {
                    b._key_events.k9_0_1.call(b)
                }
                this.blur();
                return false
            }
        };
        if (_isOpera) {
            this.tabEnd.onkeypress = this.tabEnd.onkeydown
        }
    },
    uid: function() {
        if (!this._ui_seed) {
            this._ui_seed = (new Date()).valueOf()
        }
        return this._ui_seed++
    },
    clearAndLoad: function() {
        var a = this._pgn_skin;
        this._pgn_skin = null;
        this.clearAll();
        this._pgn_skin = a;
        this.load.apply(this, arguments)
    },
    getStateOfView: function() {
        if (this.pagingOn) {
            var a = (this.currentPage - 1) * this.rowsBufferOutSize;
            return [this.currentPage, a, Math.min(a + this.rowsBufferOutSize, this.rowsBuffer.length), this.rowsBuffer.length]
        }
        return [Math.floor(this.objBox.scrollTop / this._srdh), Math.ceil(parseInt(this.objBox.offsetHeight) / this._srdh), this.rowsBuffer.length]
    }
};
(function() {
    function d(g, h) {
        this[g] = h
    }

    function f(g, h) {
        this[g].call(this, h)
    }

    function c(g, h) {
        this[g].call(this, h.join(this.delim))
    }

    function a(g, k) {
        for (var j = 0; j < k.length; j++) {
            if (typeof k[j] == "object") {
                var l = this.getCombo(j);
                for (var h in k[j]) {
                    l.put(h, k[j][h])
                }
            }
        }
    }

    function e(g, r, n) {
        var t = 1;
        var q = [];

        function s(k, h, u) {
            if (!q[h]) {
                q[h] = []
            }
            if (typeof u == "object") {
                u.toString = function() {
                    return this.text
                }
            }
            q[h][k] = u
        }
        for (var o = 0; o < r.length; o++) {
            if (typeof(r[o]) == "object" && r[o].length) {
                for (var m = 0; m < r[o].length; m++) {
                    s(o, m, r[o][m])
                }
            } else {
                s(o, 0, r[o])
            }
        }
        for (var o = 0; o < q.length; o++) {
            for (var m = 0; m < q[0].length; m++) {
                var p = q[o][m];
                q[o][m] = (p || "").toString() || "&nbsp;";
                if (p && p.colspan) {
                    for (var l = 1; l < p.colspan; l++) {
                        s(m + l, o, "#cspan")
                    }
                }
                if (p && p.rowspan) {
                    for (var l = 1; l < p.rowspan; l++) {
                        s(m, o + l, "#rspan")
                    }
                }
            }
        }
        this.setHeader(q[0]);
        for (var o = 1; o < q.length; o++) {
            this.attachHeader(q[o])
        }
    }
    var b = [{
        name: "label",
        def: "&nbsp;",
        operation: "setHeader",
        type: e
    }, {
        name: "id",
        def: "",
        operation: "columnIds",
        type: d
    }, {
        name: "width",
        def: "*",
        operation: "setInitWidths",
        type: c
    }, {
        name: "align",
        def: "left",
        operation: "cellAlign",
        type: d
    }, {
        name: "valign",
        def: "middle",
        operation: "cellVAlign",
        type: d
    }, {
        name: "sort",
        def: "na",
        operation: "fldSort",
        type: d
    }, {
        name: "type",
        def: "ro",
        operation: "setColTypes",
        type: c
    }, {
        name: "options",
        def: "",
        operation: "",
        type: a
    }];
    dhtmlx.extend_api("dhtmlXGridObject", {
        _init: function(g) {
            return [g.parent]
        },
        image_path: "setImagePath",
        columns: "columns",
        rows: "rows",
        headers: "headers",
        skin: "setSkin",
        smart_rendering: "enableSmartRendering",
        css: "enableAlterCss",
        auto_height: "enableAutoHeight",
        save_hidden: "enableAutoHiddenColumnsSaving",
        save_cookie: "enableAutoSaving",
        save_size: "enableAutoSizeSaving",
        auto_width: "enableAutoWidth",
        block_selection: "enableBlockSelection",
        csv_id: "enableCSVAutoID",
        csv_header: "enableCSVHeader",
        cell_ids: "enableCellIds",
        colspan: "enableColSpan",
        column_move: "enableColumnMove",
        context_menu: "enableContextMenu",
        distributed: "enableDistributedParsing",
        drag: "enableDragAndDrop",
        drag_order: "enableDragOrder",
        tabulation: "enableEditTabOnly",
        header_images: "enableHeaderImages",
        header_menu: "enableHeaderMenu",
        keymap: "enableKeyboardSupport",
        mouse_navigation: "enableLightMouseNavigation",
        markers: "enableMarkedCells",
        math_editing: "enableMathEditing",
        math_serialization: "enableMathSerialization",
        drag_copy: "enableMercyDrag",
        multiline: "enableMultiline",
        multiselect: "enableMultiselect",
        save_column_order: "enableOrderSaving",
        hover: "enableRowsHover",
        rowspan: "enableRowspan",
        smart: "enableSmartRendering",
        save_sorting: "enableSortingSaving",
        stable_sorting: "enableStableSorting",
        undo: "enableUndoRedo",
        csv_cell: "setCSVDelimiter",
        date_format: "setDateFormat",
        drag_behavior: "setDragBehavior",
        editable: "setEditable",
        without_header: "setNoHeader",
        submit_changed: "submitOnlyChanged",
        submit_serialization: "submitSerialization",
        submit_selected: "submitOnlySelected",
        submit_id: "submitOnlyRowID",
        xml: "load"
    }, {
        columns: function(m) {
            for (var g = 0; g < b.length; g++) {
                var l = [];
                for (var h = 0; h < m.length; h++) {
                    l[h] = m[h][b[g].name] || b[g].def
                }
                var k = b[g].type || f;
                k.call(this, b[g].operation, l, m)
            }
            this.init()
        },
        rows: function(g) {},
        headers: function(h) {
            for (var g = 0; g < h.length; g++) {
                this.attachHeader(h[g])
            }
        }
    })
})();
dhtmlXGridObject.prototype._dp_init = function(a) {
    a.attachEvent("insertCallback", function(b, d) {
        if (this.obj._h2) {
            this.obj.addRow(d, c, null, parent)
        } else {
            this.obj.addRow(d, [], 0)
        }
        var c = this.obj.getRowById(d);
        if (c) {
            this.obj._process_xml_row(c, b.firstChild);
            this.obj._postRowProcessing(c)
        }
    });
    a.attachEvent("updateCallback", function(b, d) {
        var c = this.obj.getRowById(d);
        if (c) {
            this.obj._process_xml_row(c, b.firstChild);
            this.obj._postRowProcessing(c)
        }
    });
    a.attachEvent("deleteCallback", function(b, c) {
        this.obj.setUserData(c, this.action_param, "true_deleted");
        this.obj.deleteRow(c)
    });
    a._methods = ["setRowTextStyle", "setCellTextStyle", "changeRowId", "deleteRow"];
    this.attachEvent("onEditCell", function(d, e, c) {
        if (a._columns && !a._columns[c]) {
            return true
        }
        var b = this.cells(e, c);
        if (d == 1) {
            if (b.isCheckbox()) {
                a.setUpdated(e, true)
            }
        } else {
            if (d == 2) {
                if (b.wasChanged()) {
                    a.setUpdated(e, true)
                }
            }
        }
        return true
    });
    this.attachEvent("onRowPaste", function(b) {
        a.setUpdated(b, true)
    });
    this.attachEvent("onRowIdChange", function(d, b) {
        var c = a.findRow(d);
        if (c < a.updatedRows.length) {
            a.updatedRows[c] = b
        }
    });
    this.attachEvent("onSelectStateChanged", function(b) {
        if (a.updateMode == "row") {
            a.sendData()
        }
        return true
    });
    this.attachEvent("onEnter", function(c, b) {
        if (a.updateMode == "row") {
            a.sendData()
        }
        return true
    });
    this.attachEvent("onBeforeRowDeleted", function(b) {
        if (!this.rowsAr[b]) {
            return true
        }
        if (this.dragContext && a.dnd) {
            window.setTimeout(function() {
                a.setUpdated(b, true)
            }, 1);
            return true
        }
        var c = a.getState(b);
        if (this._h2) {
            this._h2.forEachChild(b, function(d) {
                a.setUpdated(d.id, false);
                a.markRow(d.id, true, "deleted")
            }, this)
        }
        if (c == "inserted") {
            a.set_invalid(b, false);
            a.setUpdated(b, false);
            return true
        }
        if (c == "deleted") {
            return false
        }
        if (c == "true_deleted") {
            a.setUpdated(b, false);
            return true
        }
        a.setUpdated(b, true, "deleted");
        return false
    });
    this.attachEvent("onRowAdded", function(b) {
        if (this.dragContext && a.dnd) {
            return true
        }
        a.setUpdated(b, true, "inserted");
        return true
    });
    a._getRowData = function(d, m) {
        var g = [];
        g.gr_id = d;
        if (this.obj.isTreeGrid()) {
            g.gr_pid = this.obj.getParentId(d)
        }
        var b = this.obj.getRowById(d);
        for (var h = 0; h < this.obj._cCount; h++) {
            if (this.obj._c_order) {
                var k = this.obj._c_order[h]
            } else {
                var k = h
            }
            var l = this.obj.cells(b.idd, h);
            if (this._changed && !l.wasChanged()) {
                continue
            }
            if (this._endnm) {
                g[this.obj.getColumnId(h)] = l.getValue()
            } else {
                g["c" + k] = l.getValue()
            }
        }
        var e = this.obj.UserData[d];
        if (e) {
            for (var f = 0; f < e.keys.length; f++) {
                if (e.keys[f].indexOf("__") != 0) {
                    g[e.keys[f]] = e.values[f]
                }
            }
        }
        var e = this.obj.UserData.gridglobaluserdata;
        if (e) {
            for (var f = 0; f < e.keys.length; f++) {
                g[e.keys[f]] = e.values[f]
            }
        }
        return g
    };
    a._clearUpdateFlag = function(c) {
        var d = this.obj.getRowById(c);
        if (d) {
            for (var b = 0; b < this.obj._cCount; b++) {
                this.obj.cells(c, b).cell.wasChanged = false
            }
        }
    };
    a.checkBeforeUpdate = function(f) {
        var e = true;
        var b = [];
        for (var d = 0; d < this.obj._cCount; d++) {
            if (this.mandatoryFields[d]) {
                var c = this.mandatoryFields[d].call(this.obj, this.obj.cells(f, d).getValue(), f, d);
                if (typeof c == "string") {
                    this.messages.push(c);
                    e = false
                } else {
                    e &= c;
                    b[d] = !c
                }
            }
        }
        if (!e) {
            this.set_invalid(f, "invalid", b);
            this.setUpdated(f, false)
        }
        return e
    }
};;

function dhtmlXGridCellObject(a) {
    this.destructor = function() {
        this.cell.obj = null;
        this.cell = null;
        this.grid = null;
        this.base = null;
        return null
    };
    this.cell = a;
    this.getValue = function() {
        if ((this.cell.firstChild) && (this.cell.firstChild.tagName == "TEXTAREA")) {
            return this.cell.firstChild.value
        } else {
            return this.cell.innerHTML._dhx_trim()
        }
    };
    this.getMathValue = function() {
        if (this.cell.original) {
            return this.cell.original
        } else {
            return this.getValue()
        }
    };
    this.getFont = function() {
        arOut = new Array(3);
        if (this.cell.style.fontFamily) {
            arOut[0] = this.cell.style.fontFamily
        }
        if (this.cell.style.fontWeight == "bold" || this.cell.parentNode.style.fontWeight == "bold") {
            arOut[1] = "bold"
        }
        if (this.cell.style.fontStyle == "italic" || this.cell.parentNode.style.fontWeight == "italic") {
            arOut[1] += "italic"
        }
        if (this.cell.style.fontSize) {
            arOut[2] = this.cell.style.fontSize
        } else {
            arOut[2] = ""
        }
        return arOut.join("-")
    };
    this.getTextColor = function() {
        if (this.cell.style.color) {
            return this.cell.style.color
        } else {
            return "#000000"
        }
    };
    this.getBgColor = function() {
        if (this.cell.bgColor) {
            return this.cell.bgColor
        } else {
            return "#FFFFFF"
        }
    };
    this.getHorAlign = function() {
        if (this.cell.style.textAlign) {
            return this.cell.style.textAlign
        } else {
            if (this.cell.style.textAlign) {
                return this.cell.style.textAlign
            } else {
                return "left"
            }
        }
    };
    this.getWidth = function() {
        return this.cell.scrollWidth
    };
    this.setFont = function(b) {
        fntAr = b.split("-");
        this.cell.style.fontFamily = fntAr[0];
        this.cell.style.fontSize = fntAr[fntAr.length - 1];
        if (fntAr.length == 3) {
            if (/bold/.test(fntAr[1])) {
                this.cell.style.fontWeight = "bold"
            }
            if (/italic/.test(fntAr[1])) {
                this.cell.style.fontStyle = "italic"
            }
            if (/underline/.test(fntAr[1])) {
                this.cell.style.textDecoration = "underline"
            }
        }
    };
    this.setTextColor = function(b) {
        this.cell.style.color = b
    };
    this.setBgColor = function(b) {
        if (b == "") {
            b = null
        }
        this.cell.bgColor = b
    };
    this.setHorAlign = function(b) {
        if (b.length == 1) {
            if (b == "c") {
                this.cell.style.textAlign = "center"
            } else {
                if (b == "l") {
                    this.cell.style.textAlign = "left"
                } else {
                    this.cell.style.textAlign = "right"
                }
            }
        } else {
            this.cell.style.textAlign = b
        }
    };
    this.wasChanged = function() {
        if (this.cell.wasChanged) {
            return true
        } else {
            return false
        }
    };
    this.isCheckbox = function() {
        var b = this.cell.firstChild;
        if (b && b.tagName == "INPUT") {
            type = b.type;
            if (type == "radio" || type == "checkbox") {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    };
    this.isChecked = function() {
        if (this.isCheckbox()) {
            return this.cell.firstChild.checked
        }
    };
    this.isDisabled = function() {
        return this.cell._disabled
    };
    this.setChecked = function(b) {
        if (this.isCheckbox()) {
            if (b != "true" && b != 1) {
                b = false
            }
            this.cell.firstChild.checked = b
        }
    };
    this.setDisabled = function(b) {
        if (b != "true" && b != 1) {
            b = false
        }
        if (this.isCheckbox()) {
            this.cell.firstChild.disabled = b;
            if (this.disabledF) {
                this.disabledF(b)
            }
        }
        this.cell._disabled = b
    }
}
dhtmlXGridCellObject.prototype = {
    getAttribute: function(a) {
        return this.cell._attrs[a]
    },
    setAttribute: function(a, b) {
        this.cell._attrs[a] = b
    },
    getInput: function() {
        if (this.obj && (this.obj.tagName == "INPUT" || this.obj.tagName == "TEXTAREA")) {
            return this.obj
        }
        var a = (this.obj || this.cell).getElementsByTagName("TEXTAREA");
        if (!a.length) {
            a = (this.obj || this.cell).getElementsByTagName("INPUT")
        }
        return a[0]
    }
};
dhtmlXGridCellObject.prototype.setValue = function(a) {
    if ((typeof(a) != "number") && (!a || a.toString()._dhx_trim() == "")) {
        a = "&nbsp;";
        this.cell._clearCell = true
    } else {
        this.cell._clearCell = false
    }
    this.setCValue(a)
};
dhtmlXGridCellObject.prototype.getTitle = function() {
    return (_isIE ? this.cell.innerText : this.cell.textContent)
};
dhtmlXGridCellObject.prototype.setCValue = function(b, a) {
    this.cell.innerHTML = b;
    this.grid.callEvent("onCellChanged", [this.cell.parentNode.idd, this.cell._cellIndex, (arguments.length > 1 ? a : b)])
};
dhtmlXGridCellObject.prototype.setCTxtValue = function(a) {
    this.cell.innerHTML = "";
    this.cell.appendChild(document.createTextNode(a));
    this.grid.callEvent("onCellChanged", [this.cell.parentNode.idd, this.cell._cellIndex, a])
};
dhtmlXGridCellObject.prototype.setLabel = function(a) {
    this.cell.innerHTML = a
};
dhtmlXGridCellObject.prototype.getMath = function() {
    if (this._val) {
        return this.val
    } else {
        return this.getValue()
    }
};

function eXcell() {
    this.obj = null;
    this.val = null;
    this.changeState = function() {
        return false
    };
    this.edit = function() {
        this.val = this.getValue()
    };
    this.detach = function() {
        return false
    };
    this.getPosition = function(d) {
        var a = d;
        var c = 0;
        var b = 0;
        while (a.tagName != "BODY") {
            c += a.offsetLeft;
            b += a.offsetTop;
            a = a.offsetParent
        }
        return new Array(c, b)
    }
}
eXcell.prototype = new dhtmlXGridCellObject;

function eXcell_ed(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid
    }
    this.edit = function() {
        this.cell.atag = ((!this.grid.multiLine) && (_isKHTML || _isMacOS || _isFF)) ? "INPUT" : "TEXTAREA";
        this.val = this.getValue();
        this.obj = document.createElement(this.cell.atag);
        this.obj.setAttribute("autocomplete", "off");
        this.obj.style.height = (this.cell.offsetHeight - (_isIE ? 4 : 4)) + "px";
        this.obj.className = "dhx_combo_edit";
        this.obj.wrap = "soft";
        this.obj.style.textAlign = this.cell.style.textAlign;
        this.obj.onclick = function(b) {
            (b || event).cancelBubble = true
        };
        this.obj.onmousedown = function(b) {
            (b || event).cancelBubble = true
        };
        this.obj.value = this.val;
        this.cell.innerHTML = "";
        this.cell.appendChild(this.obj);
        if (_isFF) {
            this.obj.style.overflow = "visible";
            if ((this.grid.multiLine) && (this.obj.offsetHeight >= 18) && (this.obj.offsetHeight < 40)) {
                this.obj.style.height = "36px";
                this.obj.style.overflow = "scroll"
            }
        }
        this.obj.onselectstart = function(b) {
            if (!b) {
                b = event
            }
            b.cancelBubble = true;
            return true
        };
        if (_isIE) {
            this.obj.focus()
        }
        this.obj.focus()
    };
    this.getValue = function() {
        if ((this.cell.firstChild) && ((this.cell.atag) && (this.cell.firstChild.tagName == this.cell.atag))) {
            return this.cell.firstChild.value
        }
        if (this.cell._clearCell) {
            return ""
        }
        return this.cell.innerHTML.toString()._dhx_trim()
    };
    this.detach = function() {
        this.setValue(this.obj.value);
        return this.val != this.getValue()
    }
}
eXcell_ed.prototype = new eXcell;

function eXcell_edtxt(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid
    }
    this.getValue = function() {
        if ((this.cell.firstChild) && ((this.cell.atag) && (this.cell.firstChild.tagName == this.cell.atag))) {
            return this.cell.firstChild.value
        }
        if (this.cell._clearCell) {
            return ""
        }
        return (_isIE ? this.cell.innerText : this.cell.textContent)
    };
    this.setValue = function(b) {
        if (!b || b.toString()._dhx_trim() == "") {
            b = " ";
            this.cell._clearCell = true
        } else {
            this.cell._clearCell = false
        }
        this.setCTxtValue(b)
    }
}
eXcell_edtxt.prototype = new eXcell_ed;

function eXcell_edn(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid
    }
    this.getValue = function() {
        if ((this.cell.firstChild) && (this.cell.firstChild.tagName == "TEXTAREA")) {
            return this.cell.firstChild.value
        }
        if (this.cell._clearCell) {
            return ""
        }
        return this.grid._aplNFb(this.cell.innerHTML.toString()._dhx_trim(), this.cell._cellIndex)
    };
    this.detach = function() {
        var b = this.obj.value;
        this.setValue(b);
        return this.val != this.getValue()
    }
}
eXcell_edn.prototype = new eXcell_ed;
eXcell_edn.prototype.setValue = function(a) {
    if (!a || a.toString()._dhx_trim() == "") {
        this.cell._clearCell = true;
        return this.setCValue("&nbsp;", 0)
    } else {
        this.cell._clearCell = false
    }
    this.setCValue(this.grid._aplNF(a, this.cell._cellIndex))
};

function eXcell_ch(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid
    }
    this.disabledF = function(b) {
        if ((b == true) || (b == 1)) {
            this.cell.innerHTML = this.cell.innerHTML.replace("item_chk0.", "item_chk0_dis.").replace("item_chk1.", "item_chk1_dis.")
        } else {
            this.cell.innerHTML = this.cell.innerHTML.replace("item_chk0_dis.", "item_chk0.").replace("item_chk1_dis.", "item_chk1.")
        }
    };
    this.changeState = function() {
        if ((!this.grid.isEditable) || (this.cell.parentNode._locked) || (this.isDisabled())) {
            return
        }
        if (this.grid.callEvent("onEditCell", [0, this.cell.parentNode.idd, this.cell._cellIndex])) {
            this.val = this.getValue();
            if (this.val == "1") {
                this.setValue("0")
            } else {
                this.setValue("1")
            }
            this.cell.wasChanged = true;
            this.grid.callEvent("onEditCell", [1, this.cell.parentNode.idd, this.cell._cellIndex]);
            this.grid.callEvent("onCheckbox", [this.cell.parentNode.idd, this.cell._cellIndex, (this.val != "1")]);
            this.grid.callEvent("onCheck", [this.cell.parentNode.idd, this.cell._cellIndex, (this.val != "1")])
        } else {
            this.editor = null
        }
    };
    this.getValue = function() {
        return this.cell.chstate ? this.cell.chstate.toString() : "0"
    };
    this.isCheckbox = function() {
        return true
    };
    this.isChecked = function() {
        if (this.getValue() == "1") {
            return true
        } else {
            return false
        }
    };
    this.setChecked = function(b) {
        this.setValue(b.toString())
    };
    this.detach = function() {
        return this.val != this.getValue()
    };
    this.edit = null
}
eXcell_ch.prototype = new eXcell;
eXcell_ch.prototype.setValue = function(b) {
    this.cell.style.verticalAlign = "middle";
    if (b) {
        b = b.toString()._dhx_trim();
        if ((b == "false") || (b == "0")) {
            b = ""
        }
    }
    if (b) {
        b = "1";
        this.cell.chstate = "1"
    } else {
        b = "0";
        this.cell.chstate = "0"
    }
    var a = this;
    this.setCValue("<img src='" + this.grid.imgURL + "item_chk" + b + ".gif' onclick='new eXcell_ch(this.parentNode).changeState();(arguments[0]||event).cancelBubble=true;'>", this.cell.chstate)
};

function eXcell_ra(a) {
    this.base = eXcell_ch;
    this.base(a);
    this.grid = a.parentNode.grid;
    this.disabledF = function(b) {
        if ((b == true) || (b == 1)) {
            this.cell.innerHTML = this.cell.innerHTML.replace("radio_chk0.", "radio_chk0_dis.").replace("radio_chk1.", "radio_chk1_dis.")
        } else {
            this.cell.innerHTML = this.cell.innerHTML.replace("radio_chk0_dis.", "radio_chk0.").replace("radio_chk1_dis.", "radio_chk1.")
        }
    };
    this.changeState = function(b) {
        if (b === false && this.getValue() == 1) {
            return
        }
        if ((!this.grid.isEditable) || (this.cell.parentNode._locked)) {
            return
        }
        if (this.grid.callEvent("onEditCell", [0, this.cell.parentNode.idd, this.cell._cellIndex]) != false) {
            this.val = this.getValue();
            if (this.val == "1") {
                this.setValue("0")
            } else {
                this.setValue("1")
            }
            this.cell.wasChanged = true;
            this.grid.callEvent("onEditCell", [1, this.cell.parentNode.idd, this.cell._cellIndex]);
            this.grid.callEvent("onCheckbox", [this.cell.parentNode.idd, this.cell._cellIndex, (this.val != "1")]);
            this.grid.callEvent("onCheck", [this.cell.parentNode.idd, this.cell._cellIndex, (this.val != "1")])
        } else {
            this.editor = null
        }
    };
    this.edit = null
}
eXcell_ra.prototype = new eXcell_ch;
eXcell_ra.prototype.setValue = function(b) {
    this.cell.style.verticalAlign = "middle";
    if (b) {
        b = b.toString()._dhx_trim();
        if ((b == "false") || (b == "0")) {
            b = ""
        }
    }
    if (b) {
        if (!this.grid._RaSeCol) {
            this.grid._RaSeCol = []
        }
        if (this.grid._RaSeCol[this.cell._cellIndex]) {
            var a = this.grid.cells4(this.grid._RaSeCol[this.cell._cellIndex]);
            a.setValue("0");
            if (this.grid.rowsAr[a.cell.parentNode.idd]) {
                this.grid.callEvent("onEditCell", [1, a.cell.parentNode.idd, a.cell._cellIndex])
            }
        }
        this.grid._RaSeCol[this.cell._cellIndex] = this.cell;
        b = "1";
        this.cell.chstate = "1"
    } else {
        b = "0";
        this.cell.chstate = "0"
    }
    this.setCValue("<img src='" + this.grid.imgURL + "radio_chk" + b + ".gif' onclick='new eXcell_ra(this.parentNode).changeState(false);'>", this.cell.chstate)
};

function eXcell_txt(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid
    }
    this.edit = function() {
        this.val = this.getValue();
        this.obj = document.createElement("TEXTAREA");
        this.obj.className = "dhx_textarea";
        this.obj.onclick = function(f) {
            (f || event).cancelBubble = true
        };
        var c = this.grid.getPosition(this.cell);
        this.obj.value = this.val;
        this.obj.style.display = "";
        this.obj.style.textAlign = this.cell.style.textAlign;
        if (_isFF) {
            var b = document.createElement("DIV");
            b.appendChild(this.obj);
            b.style.overflow = "auto";
            b.className = "dhx_textarea";
            this.obj.style.margin = "0px 0px 0px 0px";
            this.obj.style.border = "0px";
            this.obj = b
        }
        document.body.appendChild(this.obj);
        if (_isOpera) {
            this.obj.onkeypress = function(e) {
                if (e.keyCode == 9) {
                    return false
                }
            }
        }
        this.obj.onkeydown = function(g) {
            var f = (g || event);
            if (f.keyCode == 9) {
                globalActiveDHTMLGridObject.entBox.focus();
                globalActiveDHTMLGridObject.doKey({
                    keyCode: f.keyCode,
                    shiftKey: f.shiftKey,
                    srcElement: "0"
                });
                return false
            }
        };
        this.obj.style.left = c[0] + "px";
        this.obj.style.top = c[1] + this.cell.offsetHeight + "px";
        if (this.cell.offsetWidth < 200) {
            var d = 200
        } else {
            var d = this.cell.offsetWidth
        }
        this.obj.style.width = d + (_isFF ? 18 : 16) + "px";
        if (_isFF) {
            this.obj.firstChild.style.width = parseInt(this.obj.style.width) + "px";
            this.obj.firstChild.style.height = this.obj.offsetHeight - 3 + "px"
        }
        if (_isIE) {
            this.obj.select();
            this.obj.value = this.obj.value
        }
        if (_isFF) {
            this.obj.firstChild.focus()
        } else {
            this.obj.focus()
        }
    };
    this.detach = function() {
        var b = "";
        if (_isFF) {
            b = this.obj.firstChild.value
        } else {
            b = this.obj.value
        }
        if (b == "") {
            this.cell._clearCell = true
        } else {
            this.cell._clearCell = false
        }
        this.setValue(b);
        document.body.removeChild(this.obj);
        this.obj = null;
        return this.val != this.getValue()
    };
    this.getValue = function() {
        if (this.obj) {
            if (_isFF) {
                return this.obj.firstChild.value
            } else {
                return this.obj.value
            }
        }
        if (this.cell._clearCell) {
            return ""
        }
        if ((!this.grid.multiLine)) {
            return this.cell._brval || this.cell.innerHTML
        } else {
            return this.cell.innerHTML.replace(/<br[^>]*>/gi, "\n")._dhx_trim()
        }
    }
}
eXcell_txt.prototype = new eXcell;

function eXcell_txttxt(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid
    }
    this.getValue = function() {
        if ((this.cell.firstChild) && (this.cell.firstChild.tagName == "TEXTAREA")) {
            return this.cell.firstChild.value
        }
        if (this.cell._clearCell) {
            return ""
        }
        if ((!this.grid.multiLine) && this.cell._brval) {
            return this.cell._brval
        }
        return (_isIE ? this.cell.innerText : this.cell.textContent)
    };
    this.setValue = function(b) {
        this.cell._brval = b;
        if (!b || b.toString()._dhx_trim() == "") {
            b = " "
        }
        this.setCTxtValue(b)
    }
}
eXcell_txttxt.prototype = new eXcell_txt;
eXcell_txt.prototype.setValue = function(a) {
    if (!a || a.toString()._dhx_trim() == "") {
        a = "&nbsp;";
        this.cell._clearCell = true
    } else {
        this.cell._clearCell = false
    }
    this.cell._brval = a;
    if ((!this.grid.multiLine)) {
        this.setCValue(a, a)
    } else {
        this.setCValue(a.replace(/\n/g, "<br/>"), a)
    }
};

function eXcell_co(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid;
        this.combo = (this.cell._combo || this.grid.getCombo(this.cell._cellIndex));
        this.editable = true
    }
    this.shiftNext = function() {
        var b = this.list.options[this.list.selectedIndex + 1];
        if (b) {
            b.selected = true
        }
        this.obj.value = this.list.options[this.list.selectedIndex].text;
        return true
    };
    this.shiftPrev = function() {
        if (this.list.selectedIndex != 0) {
            var b = this.list.options[this.list.selectedIndex - 1];
            if (b) {
                b.selected = true
            }
            this.obj.value = this.list.options[this.list.selectedIndex].text
        }
        return true
    };
    this.edit = function() {
        this.val = this.getValue();
        this.text = this.getText()._dhx_trim();
        var d = this.grid.getPosition(this.cell);
        this.obj = document.createElement("TEXTAREA");
        this.obj.className = "dhx_combo_edit";
        this.obj.style.height = (this.cell.offsetHeight - 4) + "px";
        this.obj.wrap = "soft";
        this.obj.style.textAlign = this.cell.style.textAlign;
        this.obj.onclick = function(i) {
            (i || event).cancelBubble = true
        };
        this.obj.value = this.text;
        this.obj.onselectstart = function(i) {
            if (!i) {
                i = event
            }
            i.cancelBubble = true;
            return true
        };
        var f = this;
        this.obj.onkeyup = function(l) {
            var k = (l || event).keyCode;
            if (k == 38 || k == 40 || k == 9) {
                return
            }
            var m = this.readonly ? String.fromCharCode(k) : this.value;
            var n = f.list.options;
            for (var j = 0; j < n.length; j++) {
                if (n[j].text.indexOf(m) == 0) {
                    return n[j].selected = true
                }
            }
        };
        this.list = document.createElement("SELECT");
        this.list.className = "dhx_combo_select";
        this.list.style.width = this.cell.offsetWidth + "px";
        this.list.style.left = d[0] + "px";
        this.list.style.top = d[1] + this.cell.offsetHeight + "px";
        this.list.onclick = function(k) {
            var j = k || window.event;
            var i = j.target || j.srcElement;
            if (i.tagName == "OPTION") {
                i = i.parentNode
            }
            f.editable = false;
            f.grid.editStop()
        };
        var b = this.combo.getKeys();
        var e = false;
        var h = 0;
        for (var c = 0; c < b.length; c++) {
            var g = this.combo.get(b[c]);
            this.list.options[this.list.options.length] = new Option(g, b[c]);
            if (b[c] == this.val) {
                h = this.list.options.length - 1;
                e = true
            }
        }
        if (e == false) {
            this.list.options[this.list.options.length] = new Option(this.text, this.val === null ? "" : this.val);
            h = this.list.options.length - 1
        }
        document.body.appendChild(this.list);
        this.list.size = "6";
        this.cstate = 1;
        if (this.editable) {
            this.cell.innerHTML = ""
        } else {
            this.obj.style.width = "1px";
            this.obj.style.height = "1px"
        }
        this.cell.appendChild(this.obj);
        this.list.options[h].selected = true;
        if ((!_isFF) || (this.editable)) {
            this.obj.focus();
            this.obj.focus()
        }
        if (!this.editable) {
            this.obj.style.visibility = "hidden";
            this.list.focus();
            this.list.onkeydown = function(i) {
                i = i || window.event;
                f.grid.setActive(true);
                if (i.keyCode < 30) {
                    return f.grid.doKey({
                        target: f.cell,
                        keyCode: i.keyCode,
                        shiftKey: i.shiftKey,
                        ctrlKey: i.ctrlKey
                    })
                }
            }
        }
    };
    this.getValue = function() {
        return ((this.cell.combo_value == window.undefined) ? "" : this.cell.combo_value)
    };
    this.detach = function() {
        if (this.val != this.getValue()) {
            this.cell.wasChanged = true
        }
        if (this.list.parentNode != null) {
            if (this.editable) {
                var b = this.list.options[this.list.selectedIndex];
                if (b && b.text == this.obj.value) {
                    this.setValue(this.list.value)
                } else {
                    var c = (this.cell._combo || this.grid.getCombo(this.cell._cellIndex));
                    var d = c.values._dhx_find(this.obj.value);
                    if (d != -1) {
                        this.setValue(c.keys[d])
                    } else {
                        this.setCValue(this.cell.combo_value = this.obj.value)
                    }
                }
            } else {
                this.setValue(this.list.value)
            }
        }
        if (this.list.parentNode) {
            this.list.parentNode.removeChild(this.list)
        }
        if (this.obj.parentNode) {
            this.obj.parentNode.removeChild(this.obj)
        }
        return this.val != this.getValue()
    }
}
eXcell_co.prototype = new eXcell;
eXcell_co.prototype.getText = function() {
    return this.cell.innerHTML
};
eXcell_co.prototype.setValue = function(d) {
    if (typeof(d) == "object") {
        var c = this.grid.xmlLoader.doXPath("./option", d);
        if (c.length) {
            this.cell._combo = new dhtmlXGridComboObject()
        }
        for (var b = 0; b < c.length; b++) {
            this.cell._combo.put(c[b].getAttribute("value"), c[b].firstChild ? c[b].firstChild.data : "")
        }
        d = d.firstChild.data
    }
    if ((d || "").toString()._dhx_trim() == "") {
        d = null
    }
    this.cell.combo_value = d;
    if (d !== null) {
        var a = (this.cell._combo || this.grid.getCombo(this.cell._cellIndex)).get(d);
        this.setCValue(a === null ? d : a, d)
    } else {
        this.setCValue("&nbsp;", d)
    }
};

function eXcell_coro(a) {
    this.base = eXcell_co;
    this.base(a);
    this.editable = false
}
eXcell_coro.prototype = new eXcell_co;

function eXcell_cotxt(a) {
    this.base = eXcell_co;
    this.base(a)
}
eXcell_cotxt.prototype = new eXcell_co;
eXcell_cotxt.prototype.getText = function() {
    return (_isIE ? this.cell.innerText : this.cell.textContent)
};
eXcell_cotxt.prototype.setValue = function(c) {
    if (typeof(c) == "object") {
        var b = this.grid.xmlLoader.doXPath("./option", c);
        if (b.length) {
            this.cell._combo = new dhtmlXGridComboObject()
        }
        for (var a = 0; a < b.length; a++) {
            this.cell._combo.put(b[a].getAttribute("value"), b[a].firstChild ? b[a].firstChild.data : "")
        }
        c = c.firstChild.data
    }
    if ((c || "").toString()._dhx_trim() == "") {
        c = null
    }
    if (c !== null) {
        this.setCTxtValue((this.cell._combo || this.grid.getCombo(this.cell._cellIndex)).get(c) || c, c)
    } else {
        this.setCTxtValue(" ", c)
    }
    this.cell.combo_value = c
};

function eXcell_corotxt(a) {
    this.base = eXcell_co;
    this.base(a);
    this.editable = false
}
eXcell_corotxt.prototype = new eXcell_cotxt;

function eXcell_cp(a) {
    try {
        this.cell = a;
        this.grid = this.cell.parentNode.grid
    } catch (b) {}
    this.edit = function() {
        this.val = this.getValue();
        this.obj = document.createElement("SPAN");
        this.obj.style.border = "1px solid black";
        this.obj.style.position = "absolute";
        var c = this.grid.getPosition(this.cell);
        this.colorPanel(4, this.obj);
        document.body.appendChild(this.obj);
        this.obj.style.left = c[0] + "px";
        this.obj.style.top = c[1] + this.cell.offsetHeight + "px"
    };
    this.toolDNum = function(c) {
        if (c.length == 1) {
            c = "0" + c
        }
        return c
    };
    this.colorPanel = function(l, p) {
        var h = document.createElement("TABLE");
        p.appendChild(h);
        h.cellSpacing = 0;
        h.editor_obj = this;
        h.style.cursor = "default";
        h.onclick = function(n) {
            var j = n || window.event;
            var c = j.target || j.srcElement;
            var i = c.parentNode.parentNode.parentNode.editor_obj;
            i.setValue(c._bg);
            i.grid.editStop()
        };
        var f = 256 / l;
        for (var g = 0; g <= (256 / f); g++) {
            var d = h.insertRow(g);
            for (var k = 0; k <= (256 / f); k++) {
                for (var e = 0; e <= (256 / f); e++) {
                    R = new Number(f * g) - (g == 0 ? 0 : 1);
                    G = new Number(f * k) - (k == 0 ? 0 : 1);
                    B = new Number(f * e) - (e == 0 ? 0 : 1);
                    var o = this.toolDNum(R.toString(16)) + "" + this.toolDNum(G.toString(16)) + "" + this.toolDNum(B.toString(16));
                    var m = d.insertCell(k);
                    m.width = "10px";
                    m.innerHTML = "&nbsp;";
                    m.title = o.toUpperCase();
                    m.style.backgroundColor = "#" + o;
                    m._bg = "#" + o;
                    if (this.val != null && "#" + o.toUpperCase() == this.val.toUpperCase()) {
                        m.style.border = "2px solid white"
                    }
                }
            }
        }
    };
    this.getValue = function() {
        return this.cell.firstChild._bg || ""
    };
    this.getRed = function() {
        return Number(parseInt(this.getValue().substr(1, 2), 16))
    };
    this.getGreen = function() {
        return Number(parseInt(this.getValue().substr(3, 2), 16))
    };
    this.getBlue = function() {
        return Number(parseInt(this.getValue().substr(5, 2), 16))
    };
    this.detach = function() {
        if (this.obj.offsetParent != null) {
            document.body.removeChild(this.obj)
        }
        return this.val != this.getValue()
    }
}
eXcell_cp.prototype = new eXcell;
eXcell_cp.prototype.setValue = function(a) {
    this.setCValue("<div style='width:100%;height:" + ((this.grid.multiLine ? this.cell.offsetHeight - 2 : 16)) + ";background-color:" + (a || "") + ";border:0px;'>&nbsp;</div>", a);
    this.cell.firstChild._bg = a
};

function eXcell_img(a) {
    try {
        this.cell = a;
        this.grid = this.cell.parentNode.grid
    } catch (b) {}
    this.getValue = function() {
        if (this.cell.firstChild.tagName == "IMG") {
            return this.cell.firstChild.src + (this.cell.titFl != null ? "^" + this.cell._brval : "")
        } else {
            if (this.cell.firstChild.tagName == "A") {
                var c = this.cell.firstChild.firstChild.src + (this.cell.titFl != null ? "^" + this.cell._brval : "");
                c += "^" + this.cell.lnk;
                if (this.cell.trg) {
                    c += "^" + this.cell.trg
                }
                return c
            }
        }
    };
    this.isDisabled = function() {
        return true
    }
}
eXcell_img.prototype = new eXcell;
eXcell_img.prototype.getTitle = function() {
    return this.cell._brval
};
eXcell_img.prototype.setValue = function(c) {
    var b = c;
    if (c.indexOf("^") != -1) {
        var a = c.split("^");
        c = a[0];
        b = this.cell._attrs.title || a[1];
        if (a.length > 2) {
            this.cell.lnk = a[2];
            if (a[3]) {
                this.cell.trg = a[3]
            }
        }
        this.cell.titFl = "1"
    }
    this.setCValue("<img src='" + this.grid.iconURL + (c || "")._dhx_trim() + "' border='0'>", c);
    if (this.cell.lnk) {
        this.cell.innerHTML = "<a href='" + this.cell.lnk + "' target='" + this.cell.trg + "'>" + this.cell.innerHTML + "</a>"
    }
    this.cell._brval = b
};

function eXcell_price(a) {
    this.base = eXcell_ed;
    this.base(a);
    this.getValue = function() {
        if (this.cell.childNodes.length > 1) {
            return this.cell.childNodes[1].innerHTML.toString()._dhx_trim()
        } else {
            return "0"
        }
    }
}
eXcell_price.prototype = new eXcell_ed;
eXcell_price.prototype.setValue = function(b) {
    if (isNaN(parseFloat(b))) {
        b = this.val || 0
    }
    var a = "green";
    if (b < 0) {
        a = "red"
    }
    this.setCValue("<span>$</span><span style='padding-right:2px;color:" + a + ";'>" + b + "</span>", b)
};

function eXcell_dyn(a) {
    this.base = eXcell_ed;
    this.base(a);
    this.getValue = function() {
        return this.cell.firstChild.childNodes[1].innerHTML.toString()._dhx_trim()
    }
}
eXcell_dyn.prototype = new eXcell_ed;
eXcell_dyn.prototype.setValue = function(c) {
    if (!c || isNaN(Number(c))) {
        if (c !== "") {
            c = 0
        }
    }
    if (c > 0) {
        var b = "green";
        var a = "dyn_up.gif"
    } else {
        if (c == 0) {
            var b = "black";
            var a = "dyn_.gif"
        } else {
            var b = "red";
            var a = "dyn_down.gif"
        }
    }
    this.setCValue("<div style='position:relative;padding-right:2px;width:100%;overflow:hidden;white-space:nowrap;'><img src='" + this.grid.imgURL + "" + a + "' height='15' style='position:absolute;top:0px;left:0px;'><span style=' padding-left:20px;width:100%;color:" + b + ";'>" + c + "</span></div>", c)
};

function eXcell_ro(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid
    }
    this.edit = function() {};
    this.isDisabled = function() {
        return true
    };
    this.getValue = function() {
        return this.cell._clearCell ? "" : this.cell.innerHTML.toString()._dhx_trim()
    }
}
eXcell_ro.prototype = new eXcell;

function eXcell_ron(a) {
    this.cell = a;
    this.grid = this.cell.parentNode.grid;
    this.edit = function() {};
    this.isDisabled = function() {
        return true
    };
    this.getValue = function() {
        return this.cell._clearCell ? "" : this.grid._aplNFb(this.cell.innerHTML.toString()._dhx_trim(), this.cell._cellIndex)
    }
}
eXcell_ron.prototype = new eXcell;
eXcell_ron.prototype.setValue = function(a) {
    if (a === 0) {} else {
        if (!a || a.toString()._dhx_trim() == "") {
            this.setCValue("&nbsp;");
            return this.cell._clearCell = true
        }
    }
    this.cell._clearCell = false;
    this.setCValue(a ? this.grid._aplNF(a, this.cell._cellIndex) : "0")
};

function eXcell_rotxt(a) {
    this.cell = a;
    this.grid = this.cell.parentNode.grid;
    this.edit = function() {};
    this.isDisabled = function() {
        return true
    };
    this.setValue = function(b) {
        if (!b || b.toString()._dhx_trim() == "") {
            b = " ";
            this.cell._clearCell = true
        } else {
            this.cell._clearCell = false
        }
        this.setCTxtValue(b)
    };
    this.getValue = function() {
        if (this.cell._clearCell) {
            return ""
        }
        return (_isIE ? this.cell.innerText : this.cell.textContent)
    }
}
eXcell_rotxt.prototype = new eXcell;

function dhtmlXGridComboObject() {
    this.keys = new dhtmlxArray();
    this.values = new dhtmlxArray();
    this.put = function(b, c) {
        for (var a = 0; a < this.keys.length; a++) {
            if (this.keys[a] == b) {
                this.values[a] = c;
                return true
            }
        }
        this.values[this.values.length] = c;
        this.keys[this.keys.length] = b
    };
    this.get = function(b) {
        for (var a = 0; a < this.keys.length; a++) {
            if (this.keys[a] == b) {
                return this.values[a]
            }
        }
        return null
    };
    this.clear = function() {
        this.keys = new dhtmlxArray();
        this.values = new dhtmlxArray()
    };
    this.remove = function(b) {
        for (var a = 0; a < this.keys.length; a++) {
            if (this.keys[a] == b) {
                this.keys._dhx_removeAt(a);
                this.values._dhx_removeAt(a);
                return true
            }
        }
    };
    this.size = function() {
        var a = 0;
        for (var b = 0; b < this.keys.length; b++) {
            if (this.keys[b] != null) {
                a++
            }
        }
        return a
    };
    this.getKeys = function() {
        var a = new Array(0);
        for (var b = 0; b < this.keys.length; b++) {
            if (this.keys[b] != null) {
                a[a.length] = this.keys[b]
            }
        }
        return a
    };
    this.save = function() {
        this._save = new Array();
        for (var a = 0; a < this.keys.length; a++) {
            this._save[a] = [this.keys[a], this.values[a]]
        }
    };
    this.restore = function() {
        if (this._save) {
            this.keys[a] = new Array();
            this.values[a] = new Array();
            for (var a = 0; a < this._save.length; a++) {
                this.keys[a] = this._save[a][0];
                this.values[a] = this._save[a][1]
            }
        }
    };
    return this
}

function Hashtable() {
    this.keys = new dhtmlxArray();
    this.values = new dhtmlxArray();
    return this
}
Hashtable.prototype = new dhtmlXGridComboObject;;

function dhtmlXGridFromTable(obj, init) {
    if (typeof(obj) != 'object')
        obj = document.getElementById(obj);
    obj.className = "";
    var w = document.createElement("DIV");
    w.setAttribute("width", obj.getAttribute("gridWidth") || (obj.offsetWidth ? (obj.offsetWidth + "px") : 0) || (window.getComputedStyle ? window.getComputedStyle(obj, null)["width"] : (obj.currentStyle ? obj.currentStyle["width"] : 0)));
    w.setAttribute("height", obj.getAttribute("gridHeight") || (obj.offsetHeight ? (obj.offsetHeight + "px") : 0) || (window.getComputedStyle ? window.getComputedStyle(obj, null)["height"] : (obj.currentStyle ? obj.currentStyle["height"] : 0)));
    var mr = obj;
    var drag = obj.getAttribute("dragAndDrop");
    mr.parentNode.insertBefore(w, mr);
    var f = mr.getAttribute("name") || ("name_" + (new Date()).valueOf());
    var windowf = new dhtmlXGridObject(w);
    window[f] = windowf;
    var acs = mr.getAttribute("onbeforeinit");
    var acs2 = mr.getAttribute("oninit");
    if (acs) eval(acs);
    windowf.setImagePath(mr.getAttribute("imgpath") || "");
    if (init) init(windowf);
    var hrow = mr.rows[0];
    var za = "";
    var zb = "";
    var zc = "";
    var zd = "";
    var ze = "";
    for (var i = 0; i < hrow.cells.length; i++) {
        za += (za ? "," : "") + hrow.cells[i].innerHTML;
        var width = hrow.cells[i].getAttribute("width") || hrow.cells[i].offsetWidth || (window.getComputedStyle ? window.getComputedStyle(hrow.cells[i], null)["width"] : (hrow.cells[i].currentStyle ? hrow.cells[i].currentStyle["width"] : 0));
        zb += (zb ? "," : "") + (width == "*" ? width : parseInt(width));
        zc += (zc ? "," : "") + (hrow.cells[i].getAttribute("align") || "left");
        zd += (zd ? "," : "") + (hrow.cells[i].getAttribute("type") || "ed");
        ze += (ze ? "," : "") + (hrow.cells[i].getAttribute("sort") || "str");
        var f_a = hrow.cells[i].getAttribute("format");
        if (f_a)
            if (hrow.cells[i].getAttribute("type").toLowerCase().indexOf("calendar") != -1)
                windowf._dtmask = f_a;
            else
                windowf.setNumberFormat(f_a, i);
    };
    windowf.setHeader(za);
    windowf.setInitWidths(zb)
    windowf.setColAlign(zc)
    windowf.setColTypes(zd);
    windowf.setColSorting(ze);
    if (obj.getAttribute("gridHeight") == "auto")
        windowf.enableAutoHeigth(true);
    if (obj.getAttribute("multiline")) windowf.enableMultiline(true);
    var lmn = mr.getAttribute("lightnavigation");
    if (lmn) windowf.enableLightMouseNavigation(lmn);
    var evr = mr.getAttribute("evenrow");
    var uevr = mr.getAttribute("unevenrow");
    if (evr || uevr) windowf.enableAlterCss(evr, uevr);
    if (drag) windowf.enableDragAndDrop(true);
    windowf.init();
    if (obj.getAttribute("split")) windowf.splitAt(obj.getAttribute("split"));
    windowf._process_inner_html(mr, 1);
    if (acs2) eval(acs2);
    if (obj.parentNode && obj.parentNode.removeChild) obj.parentNode.removeChild(obj);
    return windowf;
};
dhtmlXGridObject.prototype._process_html = function(xml) {
    if (xml.tagName && xml.tagName == "TABLE") return this._process_inner_html(xml, 0);
    var temp = document.createElement("DIV");
    temp.innerHTML = xml.xmlDoc.responseText;
    var mr = temp.getElementsByTagName("TABLE")[0];
    this._process_inner_html(mr, 0);
};
dhtmlXGridObject.prototype._process_inner_html = function(mr, start) {
    var n_l = mr.rows.length;
    for (var j = start; j < n_l; j++) {
        var id = mr.rows[j].getAttribute("id") || j;
        this.rowsBuffer.push({
            idd: id,
            data: mr.rows[j],
            _parser: this._process_html_row,
            _locator: this._get_html_data
        });
    };
    this.render_dataset();
    this.setSizes();
};
dhtmlXGridObject.prototype._process_html_row = function(r, xml) {
    var cellsCol = xml.getElementsByTagName('TD');
    var strAr = [];
    r._attrs = this._xml_attrs(xml);
    for (var j = 0; j < cellsCol.length; j++) {
        var cellVal = cellsCol[j];
        var exc = cellVal.getAttribute("type");
        if (r.childNodes[j]) {
            if (exc) r.childNodes[j]._cellType = exc;
            r.childNodes[j]._attrs = this._xml_attrs(cellsCol[j]);
        };
        if (cellVal.firstChild) strAr.push(cellVal.innerHTML);
        else strAr.push("");
        if (cellVal.colSpan > 1) {
            r.childNodes[j]._attrs["colspan"] = cellVal.colSpan;
            for (var k = 1; k < cellVal.colSpan; k++) {
                strAr.push("")
            }
        }
    };
    for (j < cellsCol.length; j < r.childNodes.length; j++) r.childNodes[j]._attrs = {};
    this._fillRow(r, (this._c_order ? this._swapColumns(strAr) : strAr));
    return r;
};
dhtmlXGridObject.prototype._get_html_data = function(data, ind) {
    data = data.firstChild;
    while (true) {
        if (!data) return "";
        if (data.tagName == "TD") ind--;
        if (ind < 0) break;
        data = data.nextSibling;
    };
    return (data.firstChild ? data.firstChild.data : "");
};
dhtmlxEvent(window, "load", function() {
    var z = document.getElementsByTagName("table");
    for (var a = 0; a < z.length; a++)
        if (z[a].className == "dhtmlxGrid") {
            dhtmlXGridFromTable(z[a]);
        }
});;
dhtmlXGridObject.prototype.startFastOperations = function() {
    this._disF = ["setSizes", "callEvent", "_fixAlterCss", "cells4", "forEachRow"];
    this._disA = [];
    for (var i = this._disF.length - 1; i >= 0; i--) {
        this._disA[i] = this[this._disF[i]];
        this[this._disF[i]] = function() {
            return true
        }
    };
    this._cellCache = [];
    this.cells4 = function(cell) {
        var c = this._cellCache[cell._cellIndex]
        if (!c) {
            c = this._cellCache[cell._cellIndex] = this._disA[3].apply(this, [cell]);
            c.destructor = function() {
                return true;
            };
            c.setCValue = function(val) {
                c.cell.innerHTML = val;
            }
        };
        c.cell = cell;
        c.combo = cell._combo || this.combos[cell._cellIndex];
        return c;
    }
};
dhtmlXGridObject.prototype.stopFastOperations = function() {
    if (!this._disF) return;
    for (var i = this._disF.length - 1; i >= 0; i--) {
        this[this._disF[i]] = this._disA[i];
    };
    this.setSizes();
    this.callEvent("onGridReconstructed", []);
};; //v.2.6 build 100722

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/

dhtmlXGridObject.prototype.enablePaging = function(fl, pageSize, pagesInGrp, parentObj, showRecInfo, recInfoParentObj) {
    this._pgn_parentObj = typeof(parentObj) == "string" ? document.getElementById(parentObj) : parentObj;
    this._pgn_recInfoParentObj = typeof(recInfoParentObj) == "string" ? document.getElementById(recInfoParentObj) : recInfoParentObj;
    this.pagingOn = fl;
    this.showRecInfo = showRecInfo;
    this.rowsBufferOutSize = parseInt(pageSize);
    this.currentPage = 1;
    this.pagesInGroup = parseInt(pagesInGrp);
    this._init_pgn_events()
    this.setPagingSkin("default");
};
dhtmlXGridObject.prototype.setXMLAutoLoading = function(filePath, bufferSize) {
    this.xmlFileUrl = filePath;
    this._dpref = bufferSize;
};
dhtmlXGridObject.prototype.changePageRelative = function(ind) {
    this.changePage(this.currentPage + ind);
};
dhtmlXGridObject.prototype.changePage = function(pageNum) {
    if (arguments.length == 0) pageNum = this.currentPage || 0;
    pageNum = parseInt(pageNum);
    pageNum = Math.max(1, Math.min(pageNum, Math.ceil(this.rowsBuffer.length / this.rowsBufferOutSize)));
    if (!this.callEvent("onBeforePageChanged", [this.currentPage, pageNum]))
        return;
    this.currentPage = parseInt(pageNum);
    this._reset_view();
    this._fixAlterCss();
    this.callEvent("onPageChanged", this.getStateOfView());
};
dhtmlXGridObject.prototype.setPagingSkin = function(name) {
    this._pgn_skin = this["_pgn_" + name];
    if (name == "toolbar") this._pgn_skin_tlb = arguments[1];
};
dhtmlXGridObject.prototype.setPagingTemplates = function(a, b) {
    this._pgn_templateA = this._pgn_template_compile(a);
    this._pgn_templateB = this._pgn_template_compile(b);
    this._page_skin_update();
};
dhtmlXGridObject.prototype._page_skin_update = function(name) {
    if (!this.pagesInGroup) this.pagesInGroup = Math.ceil(Math.min(5, this.rowsBuffer.length / this.rowsBufferOutSize));
    var totalPages = Math.ceil(this.rowsBuffer.length / this.rowsBufferOutSize);
    if (totalPages && totalPages < this.currentPage) return this.changePage(totalPages);
    if (this.pagingOn && this._pgn_skin) this._pgn_skin.apply(this, this.getStateOfView());
};
dhtmlXGridObject.prototype._init_pgn_events = function(name) {
    this.attachEvent("onXLE", this._page_skin_update)
    this.attachEvent("onClearAll", this._page_skin_update)
    this.attachEvent("onPageChanged", this._page_skin_update)
    this.attachEvent("onGridReconstructed", this._page_skin_update)

    this._init_pgn_events = function() {}
};
dhtmlXGridObject.prototype._pgn_default = function(page, start, end) {
    if (!this.pagingBlock) {
        this.pagingBlock = document.createElement("DIV");
        this.pagingBlock.className = "pagingBlock";
        this.recordInfoBlock = document.createElement("SPAN");
        this.recordInfoBlock.className = "recordsInfoBlock";
        if (!this._pgn_parentObj) return;
        this._pgn_parentObj.appendChild(this.pagingBlock)
        if (this._pgn_recInfoParentObj && this.showRecInfo) this._pgn_recInfoParentObj.appendChild(this.recordInfoBlock)


        if (!this._pgn_templateA) {
            this._pgn_templateA = this._pgn_template_compile("[prevpages:&lt:&nbsp] [currentpages:,&nbsp] [nextpages:&gt:&nbsp]");
            this._pgn_templateB = this._pgn_template_compile("Results <b>[from]-[to]</b> of <b>[total]</b>");
        }
    };
    var details = this.getStateOfView();
    this.pagingBlock.innerHTML = this._pgn_templateA.apply(this, details);
    this.recordInfoBlock.innerHTML = this._pgn_templateB.apply(this, details);
    this._pgn_template_active(this.pagingBlock);
    this._pgn_template_active(this.recordInfoBlock);
    this.callEvent("onPaging", []);
};
dhtmlXGridObject.prototype._pgn_block = function(sep) {
    var start = Math.floor((this.currentPage - 1) / this.pagesInGroup) * this.pagesInGroup;
    var max = Math.min(Math.ceil(this.rowsBuffer.length / this.rowsBufferOutSize), start + this.pagesInGroup);
    var str = [];
    for (var i = start + 1; i <= max; i++)
        if (i == this.currentPage) str.push("<a class='dhx_not_active'><b>" + i + "</b></a>");
        else
            str.push("<a onclick='this.grid.changePage(" + i + ");return false;'>" + i + "</a>");
    return str.join(sep);
};
dhtmlXGridObject.prototype._pgn_link = function(mode, ac, ds) {
    if (mode == "prevpages" || mode == "prev") {
        if (this.currentPage == 1) return ds;
        return '<a onclick=\'this.grid.changePageRelative(-1*' + (mode == "prev" ? '1' : 'this.grid.pagesInGroup') + ');return false;\'>' + ac + '</a>'
    };
    if (mode == "nextpages" || mode == "next") {
        if (this.rowsBuffer.length / this.rowsBufferOutSize <= this.currentPage) return ds;
        if (this.rowsBuffer.length / (this.rowsBufferOutSize * (mode == "next" ? '1' : this.pagesInGroup)) <= 1) return ds;
        return '<a onclick=\'this.grid.changePageRelative(' + (mode == "next" ? '1' : 'this.grid.pagesInGroup') + ');return false;\'>' + ac + '</a>'
    };
    if (mode == "current") {
        var i = this.currentPage + (ac ? parseInt(ac) : 0);
        if (i < 1 || Math.ceil(this.rowsBuffer.length / this.rowsBufferOutSize) < i) return ds;
        return '<a ' + (i == this.currentPage ? "class='dhx_active_page_link' " : "") + 'onclick=\'this.grid.changePage(' + i + ');return false;\'>' + i + '</a>'
    };
    return ac;
};
dhtmlXGridObject.prototype._pgn_template_active = function(block) {
    var tags = block.getElementsByTagName("A");
    if (tags)
        for (var i = 0; i < tags.length; i++) {
            tags[i].grid = this;
        }
};
dhtmlXGridObject.prototype._pgn_template_compile = function(template) {
    template = template.replace(/\[([^\]]*)\]/g, function(a, b) {
        b = b.split(":");
        switch (b[0]) {
            case "from":
                return '"+(arguments[1]*1+(arguments[2]*1?1:0))+"';
            case "total":
                return '"+arguments[3]+"';
            case "to":
                return '"+arguments[2]+"';
            case "current":
            case "prev":
            case "next":
            case "prevpages":
            case "nextpages":
                return '"+this._pgn_link(\'' + b[0] + '\',\'' + b[1] + '\',\'' + b[2] + '\')+"'
            case "currentpages":
                return '"+this._pgn_block(\'' + b[1] + '\')+"'
        }
    })
    return new Function('return "' + template + '";')
};
dhtmlXGridObject.prototype.i18n.paging = {
    results: "Results",
    records: "Records from ",
    to: " to ",
    page: "Page ",
    perpage: "rows per page",
    first: "To first Page",
    previous: "Previous Page",
    found: "Found records",
    next: "Next Page",
    last: "To last Page",
    of: " of ",
    notfound: "No Records Found"
};
dhtmlXGridObject.prototype.setPagingWTMode = function(navButtons, navLabel, pageSelect, perPageSelect) {
    this._WTDef = [navButtons, navLabel, pageSelect, perPageSelect];
};
dhtmlXGridObject.prototype._pgn_bricks = function(page, start, end) {
    var tmp = (this.skin_name || "").split("_")[1];
    var sfx = "";
    if (tmp == "light" || tmp == "modern" || tmp == "skyblue") sfx = "_" + tmp;
    this.pagerElAr = new Array();
    this.pagerElAr["pagerCont"] = document.createElement("DIV");
    this.pagerElAr["pagerBord"] = document.createElement("DIV");
    this.pagerElAr["pagerLine"] = document.createElement("DIV");
    this.pagerElAr["pagerBox"] = document.createElement("DIV");
    this.pagerElAr["pagerInfo"] = document.createElement("DIV");
    this.pagerElAr["pagerInfoBox"] = document.createElement("DIV");
    var se = (this.globalBox || this.objBox);
    this.pagerElAr["pagerCont"].style.width = se.clientWidth + "px";
    this.pagerElAr["pagerCont"].style.overflow = "hidden";
    this.pagerElAr["pagerCont"].style.clear = "both";
    this.pagerElAr["pagerBord"].className = "dhx_pbox" + sfx;
    this.pagerElAr["pagerLine"].className = "dhx_pline" + sfx;
    this.pagerElAr["pagerBox"].style.clear = "both";
    this.pagerElAr["pagerInfo"].className = "dhx_pager_info" + sfx;
    this.pagerElAr["pagerCont"].appendChild(this.pagerElAr["pagerBord"]);
    this.pagerElAr["pagerCont"].appendChild(this.pagerElAr["pagerLine"]);
    this.pagerElAr["pagerCont"].appendChild(this.pagerElAr["pagerInfo"]);
    this.pagerElAr["pagerLine"].appendChild(this.pagerElAr["pagerBox"]);
    this.pagerElAr["pagerInfo"].appendChild(this.pagerElAr["pagerInfoBox"]);
    this._pgn_parentObj.innerHTML = "";
    this._pgn_parentObj.appendChild(this.pagerElAr["pagerCont"]);
    if (this.rowsBuffer.length > 0) {
        var lineWidth = 20;
        var lineWidthInc = 22;
        if (page > this.pagesInGroup) {
            var pageCont = document.createElement("DIV");
            var pageBox = document.createElement("DIV");
            pageCont.className = "dhx_page" + sfx;
            pageBox.innerHTML = "&larr;";
            pageCont.appendChild(pageBox);
            this.pagerElAr["pagerBox"].appendChild(pageCont);
            var self = this;
            pageCont.pgnum = (Math.ceil(page / this.pagesInGroup) - 1) * this.pagesInGroup;
            pageCont.onclick = function() {
                self.changePage(this.pgnum);
            };
            lineWidth += lineWidthInc;
        };
        for (var i = 1; i <= this.pagesInGroup; i++) {
            var pageCont = document.createElement("DIV");
            var pageBox = document.createElement("DIV");
            pageCont.className = "dhx_page" + sfx;
            pageNumber = ((Math.ceil(page / this.pagesInGroup) - 1) * this.pagesInGroup) + i;
            if (pageNumber > Math.ceil(this.rowsBuffer.length / this.rowsBufferOutSize))
                break;
            pageBox.innerHTML = pageNumber;
            pageCont.appendChild(pageBox);
            if (page == pageNumber) {
                pageCont.className += " dhx_page_active" + sfx;
                pageBox.className = "dhx_page_active" + sfx;
            } else {
                var self = this;
                pageCont.pgnum = pageNumber;
                pageCont.onclick = function() {
                    self.changePage(this.pgnum);
                }
            };
            lineWidth += (parseInt(lineWidthInc / 3) * pageNumber.toString().length) + 15;
            pageBox.style.width = (parseInt(lineWidthInc / 3) * pageNumber.toString().length) + 8 + "px";
            this.pagerElAr["pagerBox"].appendChild(pageCont);
        };
        if (Math.ceil(page / this.pagesInGroup) * this.pagesInGroup < Math.ceil(this.rowsBuffer.length / this.rowsBufferOutSize)) {
            var pageCont = document.createElement("DIV");
            var pageBox = document.createElement("DIV");
            pageCont.className = "dhx_page" + sfx;
            pageBox.innerHTML = "&rarr;";
            pageCont.appendChild(pageBox);
            this.pagerElAr["pagerBox"].appendChild(pageCont);
            var self = this;
            pageCont.pgnum = (Math.ceil(page / this.pagesInGroup) * this.pagesInGroup) + 1;
            pageCont.onclick = function() {
                self.changePage(this.pgnum);
            };
            lineWidth += lineWidthInc;
        };
        this.pagerElAr["pagerLine"].style.width = lineWidth + "px";
    };
    if (this.rowsBuffer.length > 0 && this.showRecInfo) this.pagerElAr["pagerInfoBox"].innerHTML = this.i18n.paging.records + (start + 1) + this.i18n.paging.to + end + this.i18n.paging.of + this.rowsBuffer.length;
    else if (this.rowsBuffer.length == 0) {
        this.pagerElAr["pagerLine"].parentNode.removeChild(this.pagerElAr["pagerLine"]);
        this.pagerElAr["pagerInfoBox"].innerHTML = this.i18n.paging.notfound;
    };
    this.pagerElAr["pagerBox"].appendChild(document.createElement("SPAN")).innerHTML = "&nbsp;";
    this.pagerElAr["pagerBord"].appendChild(document.createElement("SPAN")).innerHTML = "&nbsp;";
    this.pagerElAr["pagerCont"].appendChild(document.createElement("SPAN")).innerHTML = "&nbsp;";
    this.callEvent("onPaging", []);
};
dhtmlXGridObject.prototype._pgn_toolbar = function(page, start, end) {
    if (!this.aToolBar) this.aToolBar = this._pgn_createToolBar();
    var totalPages = Math.ceil(this.rowsBuffer.length / this.rowsBufferOutSize);
    if (this._WTDef[0]) {
        this.aToolBar.enableItem("right");
        this.aToolBar.enableItem("rightabs");
        this.aToolBar.enableItem("left");
        this.aToolBar.enableItem("leftabs");
        if (this.currentPage >= totalPages) {
            this.aToolBar.disableItem("right");
            this.aToolBar.disableItem("rightabs");
        };
        if (this.currentPage == 1) {
            this.aToolBar.disableItem("left");
            this.aToolBar.disableItem("leftabs");
        }
    };
    if (this._WTDef[2]) {
        var that = this;
        this.aToolBar.forEachListOption("pages", function(id) {
            that.aToolBar.removeListOption("pages", id);
        });
        for (var i = 0; i < totalPages; i++) {
            this.aToolBar.addListOption('pages', 'pages_' + (i + 1), NaN, "button", this.i18n.paging.page + (i + 1));
        };
        this.aToolBar.setItemText("pages", "<div style='width:100%;text-align:right'>" + this.i18n.paging.page + page + "</div>");
    };
    if (this._WTDef[1]) {
        if (!this.getRowsNum())
            this.aToolBar.setItemText('results', this.i18n.paging.notfound);
        else
            this.aToolBar.setItemText('results', "<div style='width:100%;text-align:center'>" + this.i18n.paging.records + (start + 1) + this.i18n.paging.to + end + "</div>");
    };
    if (this._WTDef[3]) this.aToolBar.setItemText("perpagenum", "<div style='width:100%;text-align:right'>" + this.rowsBufferOutSize.toString() + " " + this.i18n.paging.perpage + "</div>");
    this.callEvent("onPaging", []);
};
dhtmlXGridObject.prototype._pgn_createToolBar = function() {
    this.aToolBar = new dhtmlXToolbarObject(this._pgn_parentObj, (this._pgn_skin_tlb || "dhx_blue"));
    if (!this._WTDef) this.setPagingWTMode(true, true, true, true);
    var self = this;
    this.aToolBar.attachEvent("onClick", function(val) {
        val = val.split("_")
        switch (val[0]) {
            case "leftabs":
                self.changePage(1);
                break;
            case "left":
                self.changePage(self.currentPage - 1);
                break;
            case "rightabs":
                self.changePage(99999);
                break;
            case "right":
                self.changePage(self.currentPage + 1);
                break;
            case "perpagenum":
                if (val[1] === this.undefined) return;
                self.rowsBufferOutSize = parseInt(val[1]);
                self.changePage();
                self.aToolBar.setItemText("perpagenum", "<div style='width:100%;text-align:right'>" + val[1] + " " + self.i18n.paging.perpage + "</div>");
                break;
            case "pages":
                if (val[1] === this.undefined) return;
                self.changePage(val[1]);
                self.aToolBar.setItemText("pages", "<div style='width:100%;text-align:right'>" + self.i18n.paging.page + val[1] + "</div>");
                break;
        }
    })

    if (this._WTDef[0]) {
        this.aToolBar.addButton("leftabs", NaN, "", this.imgURL + 'ar_left_abs.gif', this.imgURL + 'ar_left_abs_dis.gif');
        this.aToolBar.setWidth("leftabs", "20")
        this.aToolBar.addButton("left", NaN, "", this.imgURL + 'ar_left.gif', this.imgURL + 'ar_left_dis.gif');
        this.aToolBar.setWidth("left", "20")
    };
    if (this._WTDef[1]) {
        this.aToolBar.addText("results", NaN, this.i18n.paging.results)
        this.aToolBar.setWidth("results", "150")
    };
    if (this._WTDef[0]) {
        this.aToolBar.addButton("right", NaN, "", this.imgURL + 'ar_right.gif', this.imgURL + 'ar_right_dis.gif');
        this.aToolBar.setWidth("right", "20")
        this.aToolBar.addButton("rightabs", NaN, "", this.imgURL + 'ar_right_abs.gif', this.imgURL + 'ar_right_abs_dis.gif');
        this.aToolBar.setWidth("rightabs", "20")
    };
    if (this._WTDef[2]) {
        this.aToolBar.addButtonSelect("pages", NaN, "select page", []);
        this.aToolBar.setWidth("pages", "75")
    };
    var arr;
    if (arr = this._WTDef[3]) {
        this.aToolBar.addButtonSelect("perpagenum", NaN, "select size", []);
        if (typeof arr != "object") arr = [5, 10, 15, 20, 25, 30];
        for (var k = 0; k < arr.length; k++) this.aToolBar.addListOption('perpagenum', 'perpagenum_' + arr[k], NaN, "button", arr[k] + " " + this.i18n.paging.perpage);
        this.aToolBar.setWidth("perpagenum", "135");
    };
    this.aToolBar.disableItem("results");
    return this.aToolBar;
}
//v.2.6 build 100722

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/
; /* @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs = saveAs || (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator)) || (function(p) {
    if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return
    }
    var e = p.document,
        j = function() {
            return p.URL || p.webkitURL || p
        },
        m = e.createElementNS("http://www.w3.org/1999/xhtml", "a"),
        b = !p.externalHost && "download" in m,
        c = function(s) {
            var r = e.createEvent("MouseEvents");
            r.initMouseEvent("click", true, false, p, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            s.dispatchEvent(r)
        },
        q = p.webkitRequestFileSystem,
        k = p.requestFileSystem || q || p.mozRequestFileSystem,
        o = function(r) {
            (p.setImmediate || p.setTimeout)(function() {
                throw r
            }, 0)
        },
        g = "application/octet-stream",
        h = 0,
        a = 10,
        l = function(r) {
            var s = function() {
                if (typeof r === "string") {
                    j().revokeObjectURL(r)
                } else {
                    r.remove()
                }
            };
            if (p.chrome) {
                s()
            } else {
                setTimeout(s, a)
            }
        },
        d = function(u, s, r) {
            s = [].concat(s);
            var v = s.length;
            while (v--) {
                var w = u["on" + s[v]];
                if (typeof w === "function") {
                    try {
                        w.call(u, r || u)
                    } catch (t) {
                        o(t)
                    }
                }
            }
        },
        f = function(s, y) {
            var w = this,
                C = s.type,
                t = false,
                z, B, v = function() {
                    d(w, "writestart progress write writeend".split(" "))
                },
                x = function() {
                    if (t || !z) {
                        z = j().createObjectURL(s)
                    }
                    if (B) {
                        B.location.href = z
                    } else {
                        var D = p.open(z, "_blank");
                        if (D == undefined && typeof safari !== "undefined") {
                            p.location.href = z
                        }
                    }
                    w.readyState = w.DONE;
                    v();
                    l(z)
                },
                r = function(D) {
                    return function() {
                        if (w.readyState !== w.DONE) {
                            return D.apply(this, arguments)
                        }
                    }
                },
                u = {
                    create: true,
                    exclusive: false
                },
                A;
            w.readyState = w.INIT;
            if (!y) {
                y = "download"
            }
            if (b) {
                z = j().createObjectURL(s);
                m.href = z;
                m.download = y;
                c(m);
                w.readyState = w.DONE;
                v();
                l(z);
                return
            }
            if (p.chrome && C && C !== g) {
                A = s.slice || s.webkitSlice;
                s = A.call(s, 0, s.size, g);
                t = true
            }
            if (q && y !== "download") {
                y += ".download"
            }
            if (C === g || q) {
                B = p
            }
            if (!k) {
                x();
                return
            }
            h += s.size;
            k(p.TEMPORARY, h, r(function(D) {
                D.root.getDirectory("saved", u, r(function(E) {
                    var F = function() {
                        E.getFile(y, u, r(function(G) {
                            G.createWriter(r(function(H) {
                                H.onwriteend = function(I) {
                                    B.location.href = G.toURL();
                                    w.readyState = w.DONE;
                                    d(w, "writeend", I);
                                    l(G)
                                };
                                H.onerror = function() {
                                    var I = H.error;
                                    if (I.code !== I.ABORT_ERR) {
                                        x()
                                    }
                                };
                                "writestart progress write abort".split(" ").forEach(function(I) {
                                    H["on" + I] = w["on" + I]
                                });
                                H.write(s);
                                w.abort = function() {
                                    H.abort();
                                    w.readyState = w.DONE
                                };
                                w.readyState = w.WRITING
                            }), x)
                        }), x)
                    };
                    E.getFile(y, {
                        create: false
                    }, r(function(G) {
                        G.remove();
                        F()
                    }), r(function(G) {
                        if (G.code === G.NOT_FOUND_ERR) {
                            F()
                        } else {
                            x()
                        }
                    }))
                }), x)
            }), x)
        },
        i = f.prototype,
        n = function(r, s) {
            return new f(r, s)
        };
    i.abort = function() {
        var r = this;
        r.readyState = r.DONE;
        d(r, "abort")
    };
    i.readyState = i.INIT = 0;
    i.WRITING = 1;
    i.DONE = 2;
    i.error = i.onwritestart = i.onprogress = i.onwrite = i.onabort = i.onerror = i.onwriteend = null;
    return n
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content));
if (typeof module !== "undefined" && module !== null) {
    module.exports = saveAs
} else {
    if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
        define([], function() {
            return saveAs
        })
    }
};;

function ManageAlerts() {
    var a = {
        SelectRow: function(b) {
            if (b.className == "selected") {
                $(b).removeClass("selected")
            } else {
                $(b).addClass("selected")
            }
        },
        DeleteSelected: function() {
            var b = $(".selected");
            if (b.length == 0) {
                $("#msg").html("هیج هشداری انتخاب نشده است");
                return
            }
            var c = "";
            var e = "";
            var d = 0;
            for (d = 0; d < b.length; d++) {
                c += e + b[d].id;
                e = ","
            }
            $.ajax({
                url: "tsev2/action/TseAlert.aspx",
                cache: false,
                dataType: "text",
                data: {
                    t: "d",
                    i: c
                },
                error: function() {
                    $("#msg").html("خطا در حذف هشدارها");
                    return
                },
                success: function(f) {
                    $("#msg").html("هشدارهای انتخاب شده حذف شدند");
                    b.remove()
                }
            })
        }
    };
    return a
}
$(document).keypress(function(a) {
    if ((a.which == 63 || a.which == 47) && (document.activeElement == null || (document.activeElement.tagName != "INPUT" && document.activeElement.tagName != "TEXTAREA"))) {
        ShowSearchWindow()
    }
});

function ShowSearchWindow() {
    var b = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    if (b == null) {
        if ($("#SearchResult").length > 0) {
            return
        }
        var a = '<br/><input id="SearchKey" onkeyup="GetSearchResult()" ><div id=\'SearchResult\'></div>';
        ShowModalStaticPro("جستجو - میان بر های ؟ و یا / ", a);
        if (typeof event != "undefined" && event != null) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false
        }
        $("#SearchKey").focus()
    } else {
        window.open("Site.aspx?ParTree=151916", "_top")
    }
}

function GetSearchResult() {
    var a = $("#SearchKey").val();
    a = $("<div />").text(a).html();
    if (a.length <= 1) {
        return
    }
    if (typeof searchTimer != "undefined") {
        window.clearTimeout(searchTimer)
    }
    searchTimer = window.setTimeout("fireSearch('" + a + "')", 720)
}

function SearchTemplate() {
    return "<div class='box1 white tbl s750'><div class='header'>{title}</div><div class='content'>برای مشاهده اطلاعات نماد در یک tab جدید کلید Ctrl را نگه داشته و سپس روی نماد کلیک کنید<table class='table1'><thead><tr><th>نماد</th><th>بازار</th><th>نمادهای وابسته</th></tr></thead><tbody>{body}</tbody></table></div></div>"
}

function fireSearch(a) {
    $("#SearchResult").html("جستجو در حال انجام است. لطفا صبر کنید");
    $.get("tsev2/data/search.aspx", {
        skey: a
    }, function(c) {
        var d = c.split(";");
        var f = "";
        var b;
        var e;
        var g;
        for (ipos = 0; ipos < d.length - 1; ipos++) {
            b = d[ipos].split(",");
            g = b[0] + " - " + b[1];
            if (b[7] == "0") {
                g = "<span style='color:#b2b2b2;text-decoration:line-through'>" + g + "</span> (نماد قدیمی حذف شده)"
            }
            e = "<tr><td><a href='" + InstUrl(b[2]) + "'>" + g + "</a></td><td> " + FlowTitleWithSourceID(b[6], b[9]) + "</td><td> <a target='" + b[2] + "' href='" + InstUrl(b[3]) + "'>خرده فروشي</a> - <a target='" + b[2] + "' href='" + InstUrl(b[4]) + "'>جبراني</a> - <a target='" + b[2] + "' href='" + InstUrl(b[5]) + "'>عمده</a></td></tr>";
            if (b[0] == a) {
                f = e + f
            } else {
                f += e
            }
        }
        f = SearchTemplate().replace("{title}", "نتیجه جستجوی " + a).replace("{body}", f);
        $("#SearchResult").html(f)
    })
}
var ModalWindowNo = 0;

function HideAllWindow(a) {
    if (typeof a == "undefined") {
        $(".popup_block").empty().remove()
    } else {
        $("." + a).empty().remove()
    }
}
var RenderMode = {
    auto: 1,
    vertical: 2,
    horizontal: 3
};

function ShowConfirm(c) {
    var d = {
        Width: 100,
        Height: 18,
        ClassName: "",
        FireGlobalFunction: false,
        FireFunction: function() {}
    };
    var e = {
        Title: "لطفا تایید کنید",
        Class: "",
        Desc: "برای انجام عملیات کلید تایید را انتخاب کنید",
        Width: 320,
        Height: 110,
        RenderMode: RenderMode.auto,
        Button: [{
            Title: "تایید",
            FireGlobalFunction: true
        }, {
            Title: "لغو",
            ClassName: "red"
        }],
        FireFunction: function() {}
    };
    param = e;
    param = $.extend({}, param, c);
    ModalWindowNo++;
    var k = ModalWindowNo;
    var g = -(25 + param.Width / 2);
    var h = -(param.Height / 2);
    var b = 1;
    if (param.RenderMode == 1) {
        b = Math.round(Math.pow(param.Button.length, 0.5))
    } else {
        if (param.RenderMode == 3) {
            b = param.Button.length
        } else {
            b = 1
        }
    }
    var j = "<div id='ModalWindowOuter" + k + "' style='width:" + (param.Width + 40) + "px;height:" + (param.Height + 40) + "px;margin-left:" + g + "px;margin-top:" + h + "px' class='popup_block " + param.Class + "'>   <div class='popup_title' style='margin-left:20px;width:" + param.Width + "px;z-index:1001;position:absolute;direction:rtl'>" + param.Title + "</div>   <div onclick=\"$('#ModalWindowOuter" + k + "').remove()\" style='margin-left:" + (g - 15) + "px;margin-top:" + (h - 15) + "px' class='popup_close' role='link' aria-label='close" + param.Title + "' ></div>   <div id='ModalWindowInner" + k + "' style='width:" + param.Width + "px;height:" + param.Height + "px;margin-left:" + g + "px;margin-top:" + h + "px' class='popup_inside' >" + param.Desc + "<br/><table style='margin-left:auto;margin-right:auto;'>";
    var a;
    var l = "";
    for (var f = 0; f < param.Button.length; f++) {
        var a = d;
        a = $.extend({}, a, param.Button[f]);
        if (f % b == 0) {
            j += "<tr>"
        }
        j += "<td><div id='ModalWindowInner" + k + "Btn" + f + "' class='awesome " + a.ClassName + "' style='width:" + a.Width + "px;Height:" + a.Height + "px'>" + a.Title + "</div></td>";
        if (f % b == b - 1 || f == param.Button.length - 1) {
            j += "</tr>"
        }
    }
    j += "</table></div></div>";
    $(document.body).append(j);
    for (var f = 0; f < param.Button.length; f++) {
        var a = d;
        a = $.extend({}, a, param.Button[f]);
        if (a.FireGlobalFunction) {
            $("#ModalWindowInner" + k + "Btn" + f).click(param.FireFunction)
        } else {
            $("#ModalWindowInner" + k + "Btn" + f).click(a.FireFunction)
        }
        $("#ModalWindowInner" + k + "Btn" + f).click(function() {
            $("#ModalWindowOuter" + k).remove()
        })
    }
    return k
}

function ShowModalStaticPro(h, c, j, b, a) {
    ModalWindowNo++;
    var g = ModalWindowNo;
    if (typeof j == "undefined" || j == null) {
        j = $(window).width() - 120;
        j = j > 905 ? 905 : j
    }
    if (typeof b == "undefined" || b == null) {
        b = $(window).height() - 140
    }
    var d = -(25 + j / 2);
    var e = -(b / 2);
    var f = "<div id='ModalWindowOuter" + g + "' style='width:" + (j + 40) + "px;height:" + (b + 40) + "px;margin-left:" + d + "px;margin-top:" + e + "px' class='popup_block " + ((typeof a != "undefined") ? a : "") + "'>   <div class='popup_title' style='margin-left:20px;width:" + j + "px;z-index:1001;position:absolute;direction:rtl'>" + h + "</div>   <div onclick=\"$('#ModalWindowOuter" + g + "').remove()\" style='margin-left:" + (d - 15) + "px;margin-top:" + (e - 15) + "px;color:white;font-size:3px;' class='popup_close'  role='link' aria-label='بستن " + h + "' ></div>    <section aria-label='پنجره باز شده اطلاعات جانبی' ><div id='ModalWindowInner" + g + "' style='width:" + j + "px;height:" + b + "px;margin-left:" + d + "px;margin-top:" + e + "px' class='popup_inside' >" + c + "   </div></section></div>";
    $(document.body).append(f);
    return g
}

function ShowModalWindow(h, j, b, a) {
    var c = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    if (c == null) {
        ModalWindowNo++;
        var g = ModalWindowNo;
        if (typeof j == "undefined" || j == null) {
            j = $(window).width() - 120;
            j = j > 905 ? 905 : j
        }
        if (typeof b == "undefined" || b == null) {
            b = $(window).height() - 140
        }
        var d = -(25 + j / 2);
        var e = -(b / 2);
        var f = "<div id='ModalWindowOuter" + g + "' style='width:" + j + "px;height:" + b + "px;margin-left:" + d + "px;margin-top:" + e + "px' class='popup_block " + ((typeof a != "undefined") ? a : "") + "'>   <div onclick=\"$('#ModalWindowOuter" + g + "').remove()\" style='margin-left:" + (d - 15) + "px;margin-top:" + (e - 15) + "px;color:white;font-size:3px;' class='popup_close' role='link' >بستن پنجره</div>   <section aria-label='پنجره باز شده اطلاعات جانبی' ><div id='ModalWindowInner" + g + "' style='width:" + j + "px;height:" + b + "px;margin-left:" + d + "px;margin-top:" + e + "px' class='popup_inside' >   </div></section></div>";
        $(document.body).append(f);
        $.ajax({
            url: h,
            cache: true,
            dataType: "text",
            success: function(k) {
                $("#ModalWindowInner" + g).html($("#PureData", k))
            }
        });
        return g
    } else {
        window.open(h, "_top")
    }
}

function ShowModalFrame(f, g, a) {
    ModalWindowNo++;
    var e = ModalWindowNo;
    if (typeof g == "undefined" || g == null) {
        g = 905
    }
    if (typeof a == "undefined" || a == null) {
        a = $(window).height() - 140
    }
    var b = -(25 + g / 2);
    var c = -(a / 2);
    var d = "<div id='ModalWindowOuter" + e + "' style='width:" + g + "px;height:" + a + "px;margin-left:" + b + "px;margin-top:" + c + "px' class='popup_block'>   <div onclick=\"$('#ModalWindowOuter" + e + "').remove()\" style='margin-left:" + (b - 15) + "px;margin-top:" + (c - 15) + "px' class='popup_close' role='link' aria-label='close'  ><span aria-label='close' ></span></div>   <iframe style='overflow:auto;width:" + g + "px;height:" + a + "px;margin-left:" + b + "px;margin-top:" + c + 'px\' class=\'popup_inside\' frameborder="0" scrolling="auto" src="' + f + '"></iframe></div>';
    $(document.body).append(d);
    return e
}

function HideWindowScroll() {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no"
}

function addCommas(a, c) {
    if (typeof c == "undefined") {
        c = 3
    }
    a += "";
    x = a.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? (parseInt(x[1], 10) != 0 ? "." + x[1].substring(0, c) : "") : "";
    var b = /(\d+)(\d{3})/;
    while (b.test(x1)) {
        x1 = x1.replace(b, "$1,$2")
    }
    return x1 + x2
}

function Round(c, b) {
    c += "";
    var d = c.split(".");
    var a = "";
    if (d.length > 1 && parseInt(d[1], 10) * (10 ^ b) != 1) {
        a = d[1].length > b ? "." + d[1].substring(0, b) : "." + d[1]
    }
    return d[0] + a
}

function colorNum(a) {
    if (a > 0) {
        return "<span style='color:green'>" + a + "</span>"
    } else {
        if (a < 0) {
            return "<span style='color:red'>-" + (-a) + "</span>"
        } else {
            return a
        }
    }
}

function bigNumber(a, c) {
    var b = parseFloat(a);
    var d;
    if (b > 1000000000) {
        d = addCommas(Math.round(b / 1000000) / 1000, c) + " B"
    } else {
        if (b > 1000000) {
            d = addCommas(Math.round(b / 1000) / 1000, c) + " M"
        } else {
            d = addCommas(a, c)
        }
    }
    return '<div class="ltr inline" title="' + addCommas(a) + '">' + d + "</div>"
}

function bigNumberTxt(a, c) {
    var b = parseFloat(a);
    var d;
    if (b > 1000000000) {
        d = addCommas(Math.round(b / 1000000) / 1000, c) + " B"
    } else {
        if (b > 1000000) {
            d = addCommas(Math.round(b / 1000) / 1000, c) + " M"
        } else {
            d = addCommas(a, c)
        }
    }
    return d
}

function eXcell_cint(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid;
        eXcell_price.call(this)
    }
    this.edit = function() {};
    this.isDisabled = function() {
        return true
    };
    this.setValue = function(b) {
        this.setCValue(addCommas(b), b)
    };
    this.getValue = function() {
        var b = this.cell.innerHTML;
        return parseInt(b.replace(/,/gi, ""))
    }
}
eXcell_cint.prototype = new eXcell;

function eXcell_bint(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid;
        eXcell_price.call(this)
    }
    this.edit = function() {};
    this.isDisabled = function() {
        return true
    };
    this.setValue = function(d) {
        var b = parseFloat(d);
        var c;
        if (b > 1000000000) {
            c = addCommas(Math.round(b / 1000000) / 1000) + "B"
        } else {
            if (b > 1000000) {
                c = addCommas(Math.round(b / 1000) / 1000) + "M"
            } else {
                c = addCommas(d)
            }
        }
        this.setCValue("<span style='display:none'>[" + d + "] </span><div>" + c + "</div>", d)
    };
    this.getValue = function() {
        var b = this.cell.innerHTML;
        return parseInt(this.cell.firstChild.innerHTML)
    }
}
eXcell_bint.prototype = new eXcell;

function eXcell_inst(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid;
        eXcell_price.call(this)
    }
    this.edit = function() {};
    this.isDisabled = function() {
        return true
    };
    this.setValue = function(b) {
        part = b.split(",");
        this.setCValue("<a class=inst href='loader.aspx?ParTree=151311&i=" + part[0] + "' target='" + part[0] + "'>" + part[1] + "</a>", b)
    };
    this.getValue = function() {
        return this.cell.firstChild.innerHTML.toString()._dhx_trim()
    }
}
eXcell_inst.prototype = new eXcell;

function eXcell_vol(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid;
        eXcell_price.call(this)
    }
    this.edit = function() {};
    this.isDisabled = function() {
        return true
    };
    this.setValue = function(d) {
        part = d.split(",");
        var b = parseInt(part[0]);
        var c;
        if (b > 1000000000) {
            c = addCommas(Math.round(b / 1000000) / 1000) + "B"
        } else {
            if (b > 1000000) {
                c = addCommas(Math.round(b / 1000) / 1000) + "M"
            } else {
                c = addCommas(b)
            }
        }
        stl = parseInt(part[0]) > parseInt(part[1]) ? 'style="font-weight:bold"' : "";
        this.setCValue("<span style='display:none'>" + d + "</span><span " + stl + ">" + c + "</span>", d)
    };
    this.getValue = function() {
        return parseInt(this.cell.firstChild.innerHTML.toString())
    }
}
eXcell_vol.prototype = new eXcell;

function eXcell_dyn2(a) {
    this.base = eXcell_ed;
    this.base(a);
    this.getValue = function() {
        return this.cell.firstChild.innerHTML.toString()._dhx_trim()
    }
}
eXcell_dyn2.prototype = new eXcell_ed;
eXcell_dyn2.prototype.setValue = function(b) {
    if (!b || isNaN(Number(b))) {
        b = 0
    }
    if (b > 0) {
        var a = "green"
    } else {
        if (b == 0) {
            var a = "black"
        } else {
            var a = "red"
        }
    }
    this.setCValue("<span style='color:" + a + ";'>" + b + "</span>", b)
};

function InstUrl(a) {
    return "Loader.aspx?ParTree=151311&i=" + a
}

function FlowTitle(a) {
    switch (a) {
        case "1":
            return "بورس - نقدی";
        case "2":
            return "فرابورس";
        case "3":
            return "بورس - مشتقه";
        case "4":
            return "فرابورس - پایه";
        case "6":
            return "بورس انرژی";
        case "7":
            return "بورس کالا";
        default:
            return "-----"
    }
}

function FlowTitleWithSourceID(a, b) {
    switch (a) {
        case "1":
            return "بورس - نقدی";
        case "2":
            return "فرابورس";
        case "3":
            if (b == 2) {
                return "فرابورس - مشتقه"
            } else {
                return "بورس - مشتقه"
            }
        case "4":
            return "فرابورس - پایه";
        case "6":
            return "بورس انرژی";
        case "7":
            return "بورس کالا";
        default:
            return "-----"
    }
}

function setData(b, c) {
    try {
        window.localStorage.setItem(b, c)
    } catch (a) {}
}

function removeData(b, c) {
    try {
        window.localStorage.removeItem(b)
    } catch (a) {}
}

function getData(b) {
    try {
        return window.localStorage.getItem(b)
    } catch (a) {}
}

function ManageBaskets(b) {
    var c = ShowModalStaticPro("مدیریت سبد", "");
    var a = '<div class="box1 s900 blue" style="height:80px"><div class="header">ایجاد سبد جدید</div><div class="content"><input id="BasketName"><br/><a class=\'awesome\' onclick="CreateBasket(\'' + b + "'," + c + ',false)">ایجاد</a>';
    if (typeof mw != "undefined") {
        a += "&nbsp;<a class='awesome' onclick=\"CreateBasket('" + b + "'," + c + ',true)">ایجاد سبد و اضافه نمودن نمادهای دیده بان بازار</a>'
    }
    a += '</div></div><div class="box1 s900 blue" style="height:340px"><div class="header">به کدام سبد اضافه شود؟</div><div class="content"><ul id="BasketsList">';
    a += BasketList(b, c) + "</ul></div></div>";
    $("#ModalWindowInner" + c).append(a)
}

function NumberOfInstruments(a) {
    if (a.length == 0) {
        return 0
    } else {
        return a.split(",").length
    }
}

function BasketList(c, g) {
    var b = "";
    var d = {
        UpdateSpeed: 8000,
        ColorChangeSpeed: 7000,
        ColorChangeEnable: 1,
        AllTrade: false,
        BasketNo: -1,
        sortField: "ztottran",
        sortDirection: -1,
        ActiveTemplate: 2,
        Baskets: []
    };
    var e = getData("MarketWatchSettings");
    if (e != null) {
        d = JSON.parse(e)
    }
    if (d.Baskets.length != 0) {
        for (var a = 0; a < d.Baskets.length; a++) {
            var f = Math.floor(Math.random() * 999999);
            b += "<li><div style='display:inline-block;width:540px'>" + d.Baskets[a].BasketName + " - " + NumberOfInstruments(d.Baskets[a].Instruments) + "</div>&nbsp;";
            if (d.Baskets[a].Instruments.indexOf(c) > -1) {
                b += "<a class='awesome' style='width:50px' href=\"javascript:DeleteFromBasket('" + c + "'," + a + "," + g + ')">حذف</a>'
            } else {
                b += "<a class='awesome green' style='width:50px' href=\"javascript:AddToBasket('" + c + "'," + a + "," + g + ')">اضافه</a>'
            }
            b += "&nbsp;<a id='" + f + "a' class='awesome red' href=\"javascript:ShowDeleteBasket(" + f + ")\">حذف سبد</a><span class='hidden' id='" + f + "b' style='margin-right:75px;'><a class='awesome red' href=\"javascript:DeleteBasket('" + c + "'," + a + "," + g + ')">سبد حذف شود؟</a></span></li>'
        }
    }
    return b
}

function ShowDeleteBasket(a) {
    $("#" + a + "a").addClass("hidden");
    $("#" + a + "b").removeClass("hidden")
}

function CreateBasket(e, j, a) {
    var b = $("#BasketName").val();
    b = $("<div />").text(b).html();
    if (b.length == 0) {
        return
    }
    var g = {
        UpdateSpeed: 8000,
        ColorChangeSpeed: 7000,
        ColorChangeEnable: 1,
        AllTrade: false,
        BasketNo: -1,
        sortField: "ztottran",
        sortDirection: -1,
        ActiveTemplate: 2,
        Baskets: []
    };
    var h = getData("MarketWatchSettings");
    if (h != null) {
        g = JSON.parse(h)
    }
    var c = "";
    var f = "";
    if (a) {
        var d = document.getElementById("main").childNodes;
        for (ipos = 0; ipos < d.length; ipos++) {
            c += f;
            f = ",";
            c += d[ipos].attributes.id.value
        }
    }
    g.Baskets.push({
        BasketName: b,
        Instruments: c
    });
    if (typeof mw != "undefined") {
        mw.Settings.Baskets.push({
            BasketName: b,
            Instruments: c
        })
    }
    setData("MarketWatchSettings", JSON.stringify(g));
    $("#BasketsList").html(BasketList(e, j))
}

function AddToBasket(b, a, e) {
    var c = {
        UpdateSpeed: 8000,
        ColorChangeSpeed: 7000,
        ColorChangeEnable: 1,
        AllTrade: false,
        BasketNo: -1,
        sortField: "ztottran",
        sortDirection: -1,
        ActiveTemplate: 2,
        Baskets: []
    };
    var d = getData("MarketWatchSettings");
    if (d != null) {
        c = JSON.parse(d)
    }
    if (c.Baskets[a].Instruments.indexOf(b) > -1) {
        $("#ModalWindowOuter" + e).remove();
        return
    }
    if (c.Baskets[a].Instruments.length != 0) {
        c.Baskets[a].Instruments += "," + b
    } else {
        c.Baskets[a].Instruments = b
    }
    if (typeof mw != "undefined") {
        mw.Settings.Baskets[a].Instruments = c.Baskets[a].Instruments
    }
    setData("MarketWatchSettings", JSON.stringify(c));
    $("#ModalWindowOuter" + e).remove()
}

function DeleteFromBasket(b, a, f) {
    var d = {
        UpdateSpeed: 8000,
        ColorChangeSpeed: 7000,
        ColorChangeEnable: 1,
        AllTrade: false,
        BasketNo: -1,
        sortField: "ztottran",
        sortDirection: -1,
        ActiveTemplate: 2,
        Baskets: []
    };
    var e = getData("MarketWatchSettings");
    if (e != null) {
        d = JSON.parse(e)
    }
    var c = d.Baskets[a].Instruments.indexOf(b);
    if (c == -1) {
        $("#ModalWindowOuter" + f).remove();
        return
    }
    if (c == 0) {
        d.Baskets[a].Instruments = d.Baskets[a].Instruments.replace(b, "")
    } else {
        d.Baskets[a].Instruments = d.Baskets[a].Instruments.replace("," + b, "")
    }
    if (typeof mw != "undefined") {
        mw.Settings.Baskets[a].Instruments = d.Baskets[a].Instruments
    }
    setData("MarketWatchSettings", JSON.stringify(d));
    $("#ModalWindowOuter" + f).remove()
}

function DeleteBasket(b, a, e) {
    var c = {
        UpdateSpeed: 8000,
        ColorChangeSpeed: 7000,
        ColorChangeEnable: 1,
        AllTrade: false,
        BasketNo: -1,
        sortField: "ztottran",
        sortDirection: -1,
        ActiveTemplate: 2,
        Baskets: []
    };
    var d = getData("MarketWatchSettings");
    if (d != null) {
        c = JSON.parse(d)
    }
    c.Baskets.splice(a, 1);
    if (typeof mw != "undefined") {
        mw.Settings.Baskets = c.Baskets
    }
    setData("MarketWatchSettings", JSON.stringify(c));
    $("#BasketsList").html(BasketList(b, e))
}
var MonthName = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
var DayName = ["شنبه", "یک شنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

function ShortDateString(d) {
    var a = d.getDate();
    var b = d.getMonth() + 1;
    var c = d.getFullYear();
    return c + "-" + b + "-" + a
}

function GroupState(a) {
    var b = "";
    switch (a) {
        case "S":
            b = "باز";
            break;
        default:
            b = "بسته";
            break
    }
    return b
}

function InsState(a) {
    var b = "";
    switch (a) {
        case "I ":
            b = "ممنوع";
            break;
        case "A ":
            b = "مجاز";
            break;
        case "AG":
            b = "مجاز-مسدود";
            break;
        case "AS":
            b = "مجاز-متوقف";
            break;
        case "AR":
            b = "مجاز-محفوظ";
            break;
        case "IG":
            b = "ممنوع-مسدود";
            break;
        case "IS":
            b = "ممنوع-متوقف";
            break;
        case "IR":
            b = "ممنوع-محفوظ";
            break;
        default:
            b = "";
            break
    }
    return b
}

function UnderSupervision(a) {
    var b = "";
    switch (a) {
        case "0":
            b = "";
            break;
        case "1":
            b = "مشمول فرآیند تعلیق";
            break;
        case "2":
            b = "معامله تحت احتیاط";
            break;
        case "3":
            b = "تعلیق شده";
            break;
        default:
            b = "";
            break
    }
    return b
}

function HandleMsg(b) {
    var e = getData("MsgIdn");
    if (e == null) {
        setData("MsgIdn", "0");
        e = "0"
    }
    var d = getData("InsStateIdn");
    if (d == null) {
        setData("InsStateIdn", "0");
        d = "0"
    }
    var c = getData("CodalIdn");
    if (c == null) {
        setData("CodalIdn", "0");
        c = "0"
    }
    $("#NewMsgNotification").empty().remove();
    if (e != b.split(",")[0]) {
        var a = b.split(",")[0];
        $("body").append('<div id="NewMsgNotification" class="Notification" style="bottom:14px;"><a href="javascript:ShowMsg(1,\'' + a + "')\">پیام جدید ناظر بازار</a>&nbsp;&nbsp;&nbsp;<a href=\"javascript:HideMsg(1,'" + a + "')\">x</a></div>")
    }
    $("#NewInsStateNotification").empty().remove();
    if (d != b.split(",")[1]) {
        var a = b.split(",")[1];
        $("body").append('<div id="NewInsStateNotification" class="Notification" style="bottom:38px;"><a href="javascript:ShowMsg(2,\'' + a + "')\">وضعیت جدید نماد</a>&nbsp;&nbsp;&nbsp;<a href=\"javascript:HideMsg(2,'" + a + "')\">x</a></div>")
    }
    $("#NewCodalNotification").empty().remove();
    if (c != b.split(",")[2]) {
        var a = b.split(",")[2];
        $("body").append('<div id="NewCodalNotification" class="Notification" style="bottom:62px;"><a href="javascript:ShowMsg(3,\'' + a + "','" + c + "')\">اطلاعیه جدید کدال</a>&nbsp;&nbsp;&nbsp;<a href=\"javascript:HideMsg(3,'" + a + "')\">x</a></div>")
    }
}

function HideMsg(a, b) {
    if (a == 1) {
        setData("MsgIdn", b);
        HideAllWindow("NewMsg");
        $("#NewMsgNotification").empty().remove()
    } else {
        if (a == 2) {
            setData("InsStateIdn", b);
            HideAllWindow("NewInsState");
            $("#NewInsStateNotification").empty().remove()
        } else {
            if (a == 3) {
                setData("CodalIdn", b);
                HideAllWindow("NewCodal");
                $("#NewCodalNotification").empty().remove()
            }
        }
    }
}

function ShowMsg(code, idn, old) {
    if (code == 1) {
        setData("MsgIdn", idn);
        HideAllWindow("NewMsg");
        $("#NewMsgNotification").empty().remove();
        ShowModalWindow("Loader.aspx?Partree=151313&Flow=0&top=5", null, 300, "NewMsg")
    } else {
        if (code == 2) {
            setData("InsStateIdn", idn);
            HideAllWindow("NewInsState");
            $("#NewInsStateNotification").empty().remove();
            ShowModalWindow("Loader.aspx?Partree=15131L&top=11", null, 300, "NewInsState")
        } else {
            if (code == 3) {
                setData("CodalIdn", idn);
                HideAllWindow("NewCodal");
                $("#NewCodalNotification").empty().remove();
                $.ajax({
                    url: "tsev2/data/CodalTopNew.aspx",
                    cache: true,
                    dataType: "text",
                    data: {
                        i: idn,
                        o: old
                    },
                    success: function(data) {
                        var WinNo = ShowModalStaticPro("اطلاعیه جدید کدال", "");
                        RenderCodal(eval(data), "#ModalWindowInner" + WinNo)
                    }
                })
            }
        }
    }
}

function showBar(h, b, c, d, e) {
    var f = 200;
    var a = 270;
    var g = b + c + d + e;
    var j = 0;
    var k = 0;
    var l = 0;
    var m = 0;
    j = Math.ceil(parseInt((b / g) * a));
    k = Math.ceil(parseInt((c / g) * a));
    l = Math.ceil(parseInt((d / g) * a));
    m = Math.ceil(parseInt((e / g) * a));
    var n;
    document.write("<table style='padding:0;margin:0;border:0;width:" + a + "px;height:12px' border=0 cellpadding=0 cellspacing=0 align='center'><tr><td style='height:6px' colspan=6></td></tr>");
    document.write("<tr><td style='padding:0;margin:0;border:0;width:" + ((a) - (j + k)) + "px;height:12px;background-color:White'></td>");
    n = b + " شركت در گروه " + h + " بيش از 2 درصد كاهش قيمت دارند";
    document.write("<td title='" + n + "' style='padding:0;margin:0;border:0;width:" + j + "px;height:12px;background-color:#b73b3b'></td>");
    n = c + " شركت در گروه " + h + " كمتر از 2 درصد كاهش قيمت دارند";
    document.write("<td title='" + n + "' style='padding:0;margin:0;border:0;width:" + k + "px;height:12px;background-color:#ffcebe'></td>");
    n = d + " شركت در گروه " + h + " كمتر از 2 درصد افزايش قيمت دارند";
    document.write("<td title='" + n + "' style='padding:0;margin:0;border:0;width:" + l + "px;height:12px;background-color:#acf4ac'></td>");
    n = e + " شركت در گروه " + h + " بيش از 2 درصد افزايش قيمت دارند";
    document.write("<td title='" + n + "' style='padding:0;margin:0;border:0;width:" + m + "px;height:12px;background-color:#2cc42c'></td>");
    document.write("<td style='padding:0;margin:0;border:0;width:" + ((a) - (l + m)) + "px;height:12px;background-color:White'></td>");
    document.write("</tr><tr><td style='height:7px' colspan=6></td></tr></table>")
}

function AdvRound(b, a) {
    return Math.round(b * Math.pow(10, a)) / Math.pow(10, a)
}

function AdvRoundColor(b, a) {
    if (b > 0) {
        return "<span style='color:green'>" + Math.round(b * Math.pow(10, a)) / Math.pow(10, a) + "</span>"
    } else {
        if (b < 0) {
            return "<span style='color:red'>(" + Math.round(-b * Math.pow(10, a)) / Math.pow(10, a) + ")</span>"
        } else {
            return "0"
        }
    }
}

function ExportToImage(e) {
    var a = "";
    var b = $(e + " canvas");
    var d = b.length;
    var c;
    for (c = 0; c < d; c++) {
        a += b[c].toDataURL("image/png").split(",")[1];
        if (c < d - 1) {
            a += ","
        }
    }
    $('<form action="/tsev2/chart/img/merge.aspx" method="post"><input type="hidden" name="s" value="' + a + '" /></form>').appendTo("body").submit().remove()
}

function ChangeContentStyle(a, c, b) {
    if ($(a).text() != $("<div></div>").html(c).text()) {
        $(a).html(c);
        $(a).addClass(b)
    }
}

function ShowFastView() {
    $("#FastView").css("display", "inline-block");
    $("#FastView").click(function() {
        if ($("#FastView").attr("class") == "slideTop") {
            $("#FastView").attr("class", "slideTop open")
        } else {
            $("#FastView").attr("class", "slideTop")
        }
    })
}

function UpdateFastView(a) {
    $("#FastView").html("<span class='s'>شاخص:" + addCommas(a[2]) + " " + a[3] + "&nbsp;-&nbsp;<span class='RealServerTime'>" + RealServerTime + "</span><br/>(بورس) " + GroupState(a[1]) + " - تعداد:" + addCommas(a[7]) + "&nbsp;حجم:" + bigNumber(a[5]) + "&nbsp;ارزش:" + bigNumber(a[6]) + "<br/>(فرابورس) " + GroupState(a[8]) + " - تعداد:" + addCommas(a[11]) + "&nbsp;حجم:" + bigNumber(a[9]) + "&nbsp;ارزش:" + bigNumber(a[10]) + "</span><span class='b'><div class='box1 silver tbl s280'><div class='content'><table class='table1'><tbody><tr><td>آخرین معامله</td><td>" + a[0] + "</td></tr></tbody></table></div></div><div class='box1 blue tbl s280'><div class='header'>بازار بورس در یک نگاه</div><div class='content'><table class='table1'><tbody><tr><td>وضعیت بازار</td><td>" + GroupState(a[1]) + "&nbsp;<span class='RealServerTime'>" + RealServerTime + "</span></td></tr><tr><td>شاخص کل</td><td>" + addCommas(a[2]) + " " + a[3] + "</td></tr><tr><td>ارزش بازار</td><td>" + bigNumber(a[4]) + "</td></tr><tr><td>تعداد معاملات</td><td>" + addCommas(a[7]) + "</td></tr><tr><td>ارزش معاملات</td><td>" + bigNumber(a[6]) + "</td></tr><tr><td>حجم معاملات</td><td>" + bigNumber(a[5]) + "</td></tr></tbody></table></div></div><div class='box1 red tbl s280'><div class='header'>بازار فرابورس در یک نگاه</div><div class='content'><table class='table1'><tbody><tr><td>وضعیت بازار</td><td>" + GroupState(a[8]) + "&nbsp;<span class='RealServerTime'>" + RealServerTime + "</span></td></tr><tr><td>تعداد معاملات</td><td>" + addCommas(a[11]) + "</td></tr><tr><td>ارزش معاملات</td><td>" + bigNumber(a[10]) + "</td></tr><tr><td>حجم معاملات</td><td>" + bigNumber(a[9]) + "</td></tr></tbody></table></div></div><div class='box1 yellow tbl s280'><div class='header'>بازار بورس - مشتقه در یک نگاه</div><div class='content'><table class='table1'><tbody><tr><td>وضعیت بازار</td><td>" + GroupState(a[12]) + "&nbsp;<span class='RealServerTime'>" + RealServerTime + "</span></td></tr><tr><td>تعداد معاملات</td><td>" + addCommas(a[15]) + "</td></tr><tr><td>ارزش معاملات</td><td>" + bigNumber(a[14]) + "</td></tr><tr><td>حجم معاملات</td><td>" + bigNumber(a[13]) + "</td></tr></tbody></table></div></div></span>")
}
jQuery.fn.sortElements = (function() {
    var a = [].sort;
    return function(b, c) {
        c = c || function() {
            return this
        };
        var d = this.map(function() {
            var g = c.call(this),
                f = g.parentNode,
                e = f.insertBefore(document.createTextNode(""), g.nextSibling);
            return function() {
                f.insertBefore(this, e);
                f.removeChild(e)
            }
        });
        return a.call(this, b).each(function(e) {
            d[e].call(c.call(this))
        })
    }
})();

function ShowTooltip(b) {
    var d = $(b).offset();
    var e = d.top + $(b).height();
    var c = d.left;
    if (c > $(window).width() - 130) {
        c = $(window).width() - 130
    }
    var a = b.attributes.desc.value.split(",");
    $("#AdvTooltip").remove();
    $(document.body).append("<div class='tooltip' style='top:" + e + "px;left:" + c + "px' id='AdvTooltip'><div class='head'>" + a[0] + "</div><div class='more'>" + a[1] + "</div></div>")
}

function HideTooltip() {
    $("#AdvTooltip").remove()
}

function ShowMenuIcon(b) {
    var a = "";
    if (b == 1) {
        a = '<a class="TopIcon" href="http://main.tsetmc.com/Links" id="pull" desc="نمايش فهرست, دسترسي به ساير خدمات سايت" onmouseover="ShowTooltip(this)" onmouseout="HideTooltip()">نمايش فهرست</a>'
    }
    a += '<a class="TopIcon" href="http://en.tsetmc.com/" id="lang" desc="Languages, View tsetmc.com in Other Languages" onmouseover="ShowTooltip(this)" onmouseout="HideTooltip()" aria-label="انتخاب زبان"  ></a><a class="TopIcon" href="http://old.tsetmc.com/Loader.aspx?ParTree=15" id="home" desc="خانه,دسترسي سريع به صفحه اول سايت شامل اطلاعات بازار بورس، فرابورس ..." onmouseover="ShowTooltip(this)" onmouseout="HideTooltip()" aria-label="خانه" ></a><a class="TopIcon" href="http://old.tsetmc.com/Loader.aspx?ParTree=15131F" id="mwp" desc="ديده بان بازار, نمايش معاملات و درخواست هاي خريد و فروش. با امکان تغيير چيدمان و امکان ساخت سبد سهام" onmouseover="ShowTooltip(this)" onmouseout="HideTooltip()" aria-label="دیده بان بازار" ></a><a class="TopIcon" href="javascript:ShowSearchWindow()" id="search" desc="جستجوي نماد,براي جستجوي نمادها و شرکت ها. دسترسي سريع با کليد \'/\'  يا \'?\'" onmouseover="ShowTooltip(this)" onmouseout="HideTooltip()" aria-label="جستجو (کلید میانبر = دکمه علامت سوال)" ></a><a class="TopIcon" href="http://main.tsetmc.com/Learning" id="learning" desc="آموزش,محتوی آموزشی" onmouseover="ShowTooltip(this)" onmouseout="HideTooltip()" aria-label="آموزش" ></a><a class="TopIcon" href="http://main.tsetmc.com/MarketMap" id="treemap" desc="نقشه بازار, " onmouseover="ShowTooltip(this)" onmouseout="HideTooltip()" aria-label="نقشه بازار" ></a><a class="TopIcon" href="https://members.tsetmc.com/Site.aspx?ParTree=151912" id="cmt" desc="نظر و پيش نهاد, در صورت مشاهده هر گونه ايراد و يا درخواست امکانات جديد با استفاده از اين بخش با ما در ارتباط باشيد." onmouseover="ShowTooltip(this)" onmouseout="HideTooltip()" aria-label="نظر و پیشنهاد" ></a><a class="TopIcon" href="javascript:ShowHelpWindow(\'151711\',true)" id="book" desc="راهنما,آموزش امکانات سایت" onmouseover="ShowTooltip(this)" onmouseout="HideTooltip()" aria-label="راهنمای سایت" ></a><a class="TopIcon" href="javascript:ShowHelpWindow(\'1116\',false)" id="new" desc="اخبار,اخبار و تازه ها" onmouseover="ShowTooltip(this)" onmouseout="HideTooltip()" aria-label="اخبار و تازه ها" ></a>';
    $("#menu_btns").html(a)
}

function CodalFilesWindow(d) {
    var c = "<div class=\"box3\"><div class=\"content\" style=\"text-align:right\"><br /><div style='display:inline-block'>زمان ارسال : </div><div style='display:inline-block' class='ltr'>" + d[4] + "</div><br/><div style='display:inline-block'>زمان انتشار : </div><div style='display:inline-block' class='ltr'>" + d[5] + "</div><br/>";
    if (d[7] == "2") {
        c += "<div class='CodalIcon CodalXls' ></div><a href='" + LongRunnigPagesSite + "/tsev2/data/CodalData.aspx?t=e&i=" + d[0] + "'>دریافت اطلاعیه با فرمت اکسل</a><div></div>"
    }
    if (d[8] == "2") {
        c += "<div class='CodalIcon CodalPdf' ></div><a href='" + LongRunnigPagesSite + "/tsev2/data/CodalData.aspx?t=p&i=" + d[0] + "'>دریافت اطلاعیه با فرمت پی دی اف</a><div></div>"
    }
    c += "</ul></div></div>";
    if (d[10].length != 0) {
        c += '<div class="box3"><div class="header">دریافت پیوست ها</div><div class="content" style="text-align:right">';
        var a = d[10];
        for (ipos = 0; ipos < a.length; ipos++) {
            var b;
            switch (a[ipos][1]) {
                case "xls":
                case "xlsx":
                    b = "CodalXls";
                    break;
                case "doc":
                case "docx":
                    b = "CodalDoc";
                    break;
                case "bmp":
                case "gif":
                case "jpg":
                case "png":
                    b = "CodalJpg";
                    break;
                case "rar":
                case "zip":
                    b = "CodalZip";
                    break;
                case "pdf":
                    b = "CodalPdf";
                    break;
                default:
                    b = ""
            }
            c += "<div class='CodalIcon " + b + "' ></div><a href='" + LongRunnigPagesSite + "/tsev2/data/CodalData.aspx?t=a&i=" + d[0] + "&i2=" + a[ipos][0] + "'>" + a[ipos][2] + "</a><div></div>"
        }
        c += "</div></div>"
    }
    ShowModalStaticPro(d[3], c, 480, 320)
}

function MakeSwitch(f, c, b, a) {
    var e = a ? "checked" : "";
    var d = '<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="' + f + '" ' + e + '><label class="onoffswitch-label" for="' + f + '"><div class="onoffswitch-inner"><div class="onoffswitch-active">' + c + '</div><div class="onoffswitch-inactive">' + b + '</div></div><div class="onoffswitch-switch"></div></label></div>';
    return d
}
var CodalData;

function RenderCodal(a, d) {
    CodalData = a;
    var c = [];
    c.push('<table class="table1"><tbody>');
    var e = "0/0";
    for (i = 0; i < a.length; i++) {
        var b = a[i][5].split(" ")[0].split("/");
        c.push('<tr style="cursor:pointer;height:40px" onclick="CodalFilesWindow(CodalData[' + i + '])">');
        if (b[1] + "/" + b[2] != e) {
            e = b[1] + "/" + b[2];
            c.push("<td style='width:44px'><div class='CalMonth'>" + MonthName[parseInt(b[1], 10) - 1] + "</div><div class='CalDay'>" + b[2] + "</td>")
        } else {
            e = b[1] + "/" + b[2];
            c.push("<td style='width:44px'><div class='CalMonth Light'>" + MonthName[parseInt(b[1]) - 1] + "</div><div class='CalDay Light'>" + b[2] + "</td>")
        }
        c.push("<td style='width:56px'>" + a[i][1] + "</td>");
        c.push("<td style='width:270px'>" + a[i][2] + "</td>");
        c.push("<td style='width:590px'>" + a[i][3] + "</td>");
        c.push("</tr>")
    }
    c.push("</tbody></table>");
    $(d).html(c.join(""));
    jo.LastCodalUpdate == (new Date())
}
var RainbowColor = ["red", "green", "orange", "blue", "yellow", "indigo", "violet", "lightslategray", "crimson", "peru", "teal", "lime", "darkred", "torquoise", "pink", "navy"];
var RainbowColor2 = ["yellow", "orange", "red", "blue", "green", "indigo", "violet", "lightslategray", "crimson", "peru", "teal", "lime", "darkred", "torquoise", "pink"];

function DrawRainbowTab(a) {
    var g = a.tabName;
    var h = a.tabPlace;
    var d = a.RememberLastTab;
    var f = "";
    var b;
    var c = RainbowColor;
    if (g == "basemarket" || g == "eng") {
        c = RainbowColor2
    }
    for (b = 0; b < a.item.length; b++) {
        f += "<li style='cursor:pointer' onclick='ShowRainbowTab(\"" + g + '",' + b + ',"' + a.item[b].RelatedElement + '","' + a.item[b].OnShowFunction.replace(/\'/g, "\\'").replace(/\"/g, '\\"') + '",' + d + ")' ><a id='rainbow_" + g + "_" + b + "' class='" + c[a.firstColor + b] + " rainbow_" + g + (b == 0 ? " rainbowActive" : "") + "' >" + a.item[b].Title + "</a></li>"
    }
    $(h).append('<div class="menuHolder2"><ul class="menu2">' + f + "</ul></div>");
    var e = localStorage.getItem("Rainbow_" + g + "_SelTab");
    if (e == null) {
        e = 0
    } else {
        e = parseInt(e)
    }
    ShowRainbowTab(g, e, a.item[e].RelatedElement, a.item[e].OnShowFunction, 0)
}

function ShowRainbowTab(TabName, Item, RelatedElement, OnShowFunction, MakeItSelected) {
    if (MakeItSelected == 1) {
        localStorage.setItem("Rainbow_" + TabName + "_SelTab", Item)
    }
    $(".rainbow_" + TabName).removeClass("rainbowActive");
    $("#rainbow_" + TabName + "_" + Item).addClass("rainbowActive");
    $(".rainbow_" + TabName + "_elm").css("display", "none");
    $(RelatedElement).css("display", "");
    if (OnShowFunction.length != 0) {
        eval(OnShowFunction)
    }
}

function launchFullScreen(b, c) {
    var a = document.getElementById(b);
    if (c) {
        if (a.requestFullScreen) {
            a.requestFullScreen()
        } else {
            if (a.mozRequestFullScreen) {
                a.mozRequestFullScreen()
            } else {
                if (a.webkitRequestFullScreen) {
                    a.webkitRequestFullScreen()
                }
            }
        }
    } else {
        if (a.cancelFullScreen) {
            document.cancelFullScreen()
        } else {
            if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else {
                if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                }
            }
        }
    }
}

function MembersSite() {
    return "https://members.tsetmc.com"
}

function CdnSite() {
    return "http://cdn.tsetmc.com"
}

function ShareHolderWarning() {
    document.getElementById("ShareHolderWarning").innerHTML = "<ul><li style='color:red'>تاریخ ها در تمامی بخش های مرتبط با سهامداران یک روز معاملاتی بعد از روز معاملاتی می باشد. برای مثال در پایان روز 1393/4/15 اطلاعات سهامداران عمده دارای تاریخ 1393/4/16 می باشد (دارایی برای روز بعد با توجه به معاملات هر روز تعیین می گردد)</li><li>تغییر دارایی سهامداران عمده فقط ناشی از معاملات نیست و سایر نقل و انتقالات را نیز در بر دارد.</li><li>اطلاعات منتشر شده تحت عنوان دارایی سهامداران عمده در طی ساعات معاملات در سایت tsetmc، مربوط به پایان روز معاملاتی گذشته است و در بر دارنده معاملات و نقل و انتقالات روز جاری معاملاتی نیست. تغییر دارایی سهامداران عمده که ناشی از نقل و انتقالات و یا معاملات روز جاری باشد، پس از اتمام ساعات معاملات روز جاری و اتمام عملیات نقل و انتقال در سایت منتشر می شود.</li><li>فهرست سهامداران عمده برای آگاهی و بصورت کلی در معرض دید عموم قرار گرفته است و ممکن است در اندک مواردی از دقت و یا جزییات لازم برخوردار نباشد. بنابراین اگر به چنین اطلاعاتی نیاز است باید پس از طی تشریفات قانونی از مراجع ذی صلاح (شرکت سپرده گذاری مرکزی اوراق بهادار و تسویه وجوه و یا شرکت پذیرفته شده در بورس ) استعلام به عمل آید.</li></ul>"
}

function ShowHelpWindow(c, a) {
    var b = $(window).height() - 142;
    var d = ShowModalStaticPro("راهنما", "", 1000);
    $.ajax({
        url: MembersSite() + "/rss.aspx",
        cache: true,
        dataType: "text",
        data: {
            mode: "json",
            partree: c,
            detail: 1
        },
        error: function(e) {},
        success: function(e) {
            jdata = JSON.parse(e);
            jtop = "<ol>";
            if (a) {
                for (var f = jdata.length - 1; f >= 0; f--) {
                    jtop += "<li onclick='ShowHelpTopic(" + d + "," + f + ")' class='top' role='link' aria-label='" + jdata[f].Lnk + "' >" + jdata[f].Lnk + "</li>"
                }
            } else {
                for (var f = 0; f < jdata.length; f++) {
                    jtop += "<li onclick='ShowHelpTopic(" + d + "," + f + ")' class='top' role='link' aria-label='" + jdata[f].Lnk + "' >" + jdata[f].Lnk + "</li>"
                }
            }
            jtop += "</ol>";
            ShowHelpTopic(d, -1)
        }
    })
}

function ShowHelpTopic(c, b) {
    if (b == -1) {
        $("#ModalWindowInner" + c).html(jtop);
        return
    }
    var a = "";
    if (b != 0) {
        a += "<div class='flash' style='cursor:pointer;-webkit-transform:rotate(90deg);transform:rotate(90deg);' aria-label='صفحه بعدی توضیحات' role='link' onclick='ShowHelpTopic(" + c + "," + (b - 1) + ")' >&nbsp;</div>"
    } else {
        a += "<div class='flash' style='-webkit-transform:rotate(90deg);transform:rotate(90deg);opacity:0.1;filter:alpha(opacity=10);'>&nbsp;</div>"
    }
    a += "<div class='flash' style='cursor:pointer;' onclick='ShowHelpTopic(" + c + ",-1)' aria-label='بازگشت به منوی بالاتر توضیحات' role='link'>&nbsp;</div>";
    if (b != jdata.length - 1) {
        a += "<div class='flash' style='cursor:pointer;-webkit-transform:rotate(-90deg);transform:rotate(-90deg);' aria-label='صفحه قبلی توضیحات' role='link' onclick='ShowHelpTopic(" + c + "," + (b + 1) + ")'>&nbsp;</div>"
    } else {
        a += "<div class='flash' style='-webkit-transform:rotate(-90deg);transform:rotate(-90deg);opacity:0.1;filter:alpha(opacity=10);'>&nbsp;</div>"
    }
    a += "<br/><span style='font-weight:bold;font-size:14px;'>" + jdata[b].Lnk + "</span><br/>";
    if (jdata[b].Data0.length == 0 && typeof jdata[b].Data1 == "undefined") {
        $.ajax({
            url: MembersSite() + "/rss.aspx",
            cache: true,
            dataType: "text",
            data: {
                mode: "json-item",
                LnkIdn: jdata[b].LnkIdn
            },
            error: function() {},
            success: function(d) {
                var e = JSON.parse(d);
                jdata[b].Data1 = e[0].Data1;
                ShowHelpTopic(c, b)
            }
        });
        a += "لطفا صبر کنید"
    } else {
        if (jdata[b].Data0.length == 0) {
            a += jdata[b].Data1
        } else {
            a += jdata[b].Data0
        }
    }
    $("#ModalWindowInner" + c).html(a)
}

function validDate(a) {
    var b = /^[0-9\/-]*$/;
    if (!a.match(b)) {
        return false
    } else {
        if (a.length < 8) {
            return false
        } else {
            return true
        }
    }
};;

function MarketOverall() {
    var MarketOverall = {
        ActiveTab: "2",
        Chart1LastLength: 0,
        Chart2LastLength: 0,
        UpdateInterval: 4000,
        UpdateIntervalIme: 20000,
        AdjustVal: function() {
            setData("ActiveTab", "MO")
        },
        StartMarketOverall: function() {
            var sheight = $(window).height() - 170;
            $("#GlobalTab4Elm").append("<div class='header'>شبکه کدال</div><div class='content'><div style='overflow:hidden;overflow-y:scroll;overflow-x:none;'><table><thead><tr><th style='width:44px'></th><th style='width:56px'>نماد</th><th style='width:270px'>نام شرکت</th><th style='width:590px'>عنوان<a target='_blank' class='rss' style='float:left' href='/tsev2/feed/CodalFeed.aspx?type=RSS'></a></th></tr></thead></table></div><div style='overflow:hidden;overflow-y:scroll;overflow-x:none;height:" + sheight + "px' id='CodalDiv'></div><span style='color:red'>برای مشاهده اطلاعات دقیق و به روز به سایت کدال مراجعه کنید</span></div>");
            DrawRainbowTab({
                tabName: "global",
                tabPlace: "#GlobalTab",
                firstColor: 0,
                RememberLastTab: "1",
                item: [{
                    Title: "در یک نگاه",
                    RelatedElement: "#GlobalTab0Elm",
                    OnShowFunction: ""
                }, {
                    Title: "بورس اوراق بهادار تهران",
                    RelatedElement: "#GlobalTab1Elm",
                    OnShowFunction: ""
                }, {
                    Title: "فرابورس ایران",
                    RelatedElement: "#GlobalTab2Elm",
                    OnShowFunction: ""
                }, {
                    Title: "بورس انرژی ایران",
                    RelatedElement: "#GlobalTab3Elm",
                    OnShowFunction: 'jo.ShowTab("energy")'
                }, {
                    Title: "شبکه کدال",
                    RelatedElement: "#GlobalTab4Elm",
                    OnShowFunction: 'jo.ShowTab("codal")'
                }, {
                    Title: "صندوق های سرمایه گذاری",
                    RelatedElement: "#GlobalTab5Elm",
                    OnShowFunction: 'jo.ShowTab("mfund")'
                }, {
                    Title: "بورس کالا",
                    RelatedElement: "#GlobalTab7Elm",
                    OnShowFunction: 'jo.ShowTab("ime")'
                }]
            });
            DrawRainbowTab({
                tabName: "tse",
                tabPlace: "#TseTab",
                firstColor: 3,
                RememberLastTab: "1",
                item: [{
                    Title: "در یک نگاه",
                    RelatedElement: "#TseTab1Elm",
                    OnShowFunction: ""
                }, {
                    Title: "شاخص ها",
                    RelatedElement: "#TseTab2Elm",
                    OnShowFunction: ""
                }, {
                    Title: "قیمت ها",
                    RelatedElement: "#TseTab3Elm",
                    OnShowFunction: ""
                }, {
                    Title: "عرضه و تقاضا",
                    RelatedElement: "#TseTab4Elm",
                    OnShowFunction: ""
                }, {
                    Title: "ابزارهای مشتقه و اوراق بدهی",
                    RelatedElement: "#TseTab5Elm",
                    OnShowFunction: 'jo.ShowTab("tsederivative")'
                }, {
                    Title: "افزایش ها و تغییرات",
                    RelatedElement: "#TseTab6Elm",
                    OnShowFunction: ""
                }, {
                    Title: "نمادهای مشمول تعلیق",
                    RelatedElement: "#TseTab7Elm",
                    OnShowFunction: ""
                }, {
                    Title: "همه اطلاعات",
                    RelatedElement: "#TseTab6Elm",
                    OnShowFunction: 'jo.ShowTab("tseall")'
                }]
            });
            DrawRainbowTab({
                tabName: "ifb",
                tabPlace: "#IfbTab",
                firstColor: 3,
                RememberLastTab: "1",
                item: [{
                    Title: "در یک نگاه",
                    RelatedElement: "#IfbTab1Elm",
                    OnShowFunction: ""
                }, {
                    Title: "شاخص ها",
                    RelatedElement: "#IfbTab2Elm",
                    OnShowFunction: ""
                }, {
                    Title: "قیمت ها",
                    RelatedElement: "#IfbTab3Elm",
                    OnShowFunction: ""
                }, {
                    Title: "عرضه و تقاضا",
                    RelatedElement: "#IfbTab4Elm",
                    OnShowFunction: ""
                }, {
                    Title: "افزایش ها و تغییرات",
                    RelatedElement: "#IfbTab5Elm",
                    OnShowFunction: ""
                }, {
                    Title: "شرکتهای کوچک و متوسط",
                    RelatedElement: "#IfbTab8Elm",
                    OnShowFunction: ""
                }, {
                    Title: "بازار پایه",
                    RelatedElement: "#IfbTab7Elm",
                    OnShowFunction: ""
                }, {
                    Title: "مشتقه",
                    RelatedElement: "#IfbTab9Elm",
                    OnShowFunction: ""
                }, {
                    Title: "نمادهای مشمول تعلیق",
                    RelatedElement: "#IfbTab10Elm",
                    OnShowFunction: ""
                }, {
                    Title: "همه اطلاعات",
                    RelatedElement: "#TseTab6Elm",
                    OnShowFunction: 'jo.ShowTab("ifball")'
                }]
            });
            DrawRainbowTab({
                tabName: "eng",
                tabPlace: "#EngTab",
                firstColor: 0,
                RememberLastTab: "1",
                item: [{
                    Title: "بازار فیزیکی (نفت، گاز و سایر حاملهای انرژی)",
                    RelatedElement: "#EngTab2Elm",
                    OnShowFunction: ""
                }, {
                    Title: "بازار عمده فروشی برق",
                    RelatedElement: "#EngTab1Elm",
                    OnShowFunction: ""
                }, {
                    Title: "بازار مصرف کنندگان بزرگ برق",
                    RelatedElement: "#EngTab4Elm",
                    OnShowFunction: ""
                }, {
                    Title: "سلف استاندارد",
                    RelatedElement: "#EngTab3Elm",
                    OnShowFunction: ""
                }, {
                    Title: "برق سبز",
                    RelatedElement: "#EngTab9Elm",
                    OnShowFunction: ""
                }, {
                    Title: "بازار سایر اوراق بهادار قابل معامله",
                    RelatedElement: "#EngTab5Elm",
                    OnShowFunction: ""
                }, {
                    Title: "سامانه مظنه یابی",
                    RelatedElement: "#EngTab6Elm",
                    OnShowFunction: ""
                }, {
                    Title: "قراردادهای آتی",
                    RelatedElement: "#EngTab7Elm",
                    OnShowFunction: ""
                }, {
                    Title: "گواهی سپرده حامل  های انرژی",
                    RelatedElement: "#EngTab8Elm",
                    OnShowFunction: ""
                }, {
                    Title: "پاسخگویی بار",
                    RelatedElement: "#EngTab10Elm",
                    OnShowFunction: ""
                }, {
                    Title: "همه اطلاعات",
                    RelatedElement: "#TseTab6Elm",
                    OnShowFunction: 'jo.ShowTab("engall")'
                }]
            });
            DrawRainbowTab({
                tabName: "fund",
                tabPlace: "#FundTab",
                firstColor: 5,
                RememberLastTab: "1",
                item: [{
                    Title: "در سهام",
                    RelatedElement: "#FundTab1Elm",
                    OnShowFunction: "jo.UpdateMF(1);"
                }, {
                    Title: "مختلط",
                    RelatedElement: "#FundTab2Elm",
                    OnShowFunction: "jo.UpdateMF(2);"
                }, {
                    Title: "درآمد ثابت",
                    RelatedElement: "#FundTab3Elm",
                    OnShowFunction: "jo.UpdateMF(3);"
                }, {
                    Title: "بازارگردانی",
                    RelatedElement: "#FundTab4Elm",
                    OnShowFunction: "jo.UpdateMF(4);"
                }, {
                    Title: "جسورانه",
                    RelatedElement: "#FundTab5Elm",
                    OnShowFunction: "jo.UpdateMF(5);"
                }, {
                    Title: "طلا",
                    RelatedElement: "#FundTab6Elm",
                    OnShowFunction: "jo.UpdateMF(6);"
                }, {
                    Title: "زمین و ساختمان",
                    RelatedElement: "#FundTab7Elm",
                    OnShowFunction: "jo.UpdateMF(7);"
                }, {
                    Title: "پروژه",
                    RelatedElement: "#FundTab8Elm",
                    OnShowFunction: "jo.UpdateMF(8);"
                }]
            });
            DrawRainbowTab({
                tabName: "ime",
                tabPlace: "#ImeTab",
                firstColor: 3,
                RememberLastTab: "1",
                item: [{
                    Title: "سلف استاندارد",
                    RelatedElement: "#ImeTab1Elm",
                    OnShowFunction: ""
                }, {
                    Title: "صندوق های کالایی",
                    RelatedElement: "#ImeTab12Elm",
                    OnShowFunction: ""
                }, {
                    Title: "گواهی سپرده کالایی",
                    RelatedElement: "#ImeTab10Elm",
                    OnShowFunction: ""
                }, {
                    Title: "نمای بازار-آتی",
                    RelatedElement: "#ImeTab9Elm",
                    OnShowFunction: ""
                }, {
                    Title: "نمای بازار-اختیارمعامله",
                    RelatedElement: "#ImeTab13Elm",
                    OnShowFunction: ""
                }, {
                    Title: "اطلاعیه عرضه بازار فیزیکی",
                    RelatedElement: "#ImeTab3Elm",
                    OnShowFunction: ""
                }, {
                    Title: "قیمت نمادهای فیزیکی",
                    RelatedElement: "#ImeTab6Elm",
                    OnShowFunction: ""
                }, {
                    Title: "معاملات بازار فیزیکی",
                    RelatedElement: "#ImeTab8Elm",
                    OnShowFunction: ""
                }, {
                    Title: "پیام ناظر",
                    RelatedElement: "#ImeTab11Elm",
                    OnShowFunction: ""
                }, {
                    Title: "اعلانات و اطلاعیه ها",
                    RelatedElement: "#ImeTab2Elm",
                    OnShowFunction: ""
                }]
            });
            DrawRainbowTab({
                tabName: "basemarket",
                tabPlace: "#BaseMarket",
                firstColor: 0,
                RememberLastTab: "1",
                item: [{
                    Title: "بـازار زرد",
                    RelatedElement: "#BaseMarketTab1Elm",
                    OnShowFunction: ""
                }, {
                    Title: "بـازار نارنجی",
                    RelatedElement: "#BaseMarketTab2Elm",
                    OnShowFunction: ""
                }, {
                    Title: "بـازار قرمز",
                    RelatedElement: "#BaseMarketTab3Elm",
                    OnShowFunction: ""
                }]
            });
            DrawRainbowTab({
                tabName: "smemarket",
                tabPlace: "#SMEMarket",
                firstColor: 12,
                RememberLastTab: "1",
                item: [{
                    Title: "رشد",
                    RelatedElement: "#SMEMarketTab1Elm",
                    OnShowFunction: ""
                }, {
                    Title: "دانش بنیان",
                    RelatedElement: "#SMEMarketTab2Elm",
                    OnShowFunction: ""
                }]
            });
            jo.DrawCharts();
            jo.DrawGTab();
            window.setTimeout("jo.UpdateData()", jo.UpdateInterval)
        },
        BoClk: function(box) {
            var pg = "Loader.aspx?Partree=";
            switch (box) {
                case "1TseMsg":
                    ShowModalWindow(pg + "151313&Flow=1");
                    break;
                case "1NewsTop":
                    ShowModalWindow(pg + "151314&Flow=1");
                    break;
                case "1SelectedIndex":
                    ShowModalWindow(pg + "151315&Flow=1");
                    break;
                case "2SelectedIndex":
                    ShowModalWindow(pg + "151315&Flow=2");
                    break;
                case "1InstAffect":
                    ShowModalWindow(pg + "151316&Flow=1");
                    break;
                case "1MostPclosingInc":
                    ShowModalWindow(pg + "151317&Type=PClosingTop&Flow=1");
                    break;
                case "1MostPclosingDec":
                    ShowModalWindow(pg + "151317&Type=PClosingBtm&Flow=1");
                    break;
                case "1TwoPriceDiffTop":
                    ShowModalWindow(pg + "151317&Type=TwoPriceDiffTop&Flow=1");
                    break;
                case "1TwoPriceDiffBtm":
                    ShowModalWindow(pg + "151317&Type=TwoPriceDiffBtm&Flow=1");
                    break;
                case "1Priority":
                    ShowModalWindow(pg + "151317&Type=Priority&Flow=1");
                    break;
                case "1Bonds":
                    ShowModalWindow(pg + "151317&Type=Bonds&Flow=1");
                    break;
                case "1Block":
                    ShowModalWindow(pg + "151317&Type=Block&Flow=1");
                    break;
                case "1MostVisited":
                    ShowModalWindow(pg + "151317&Type=MostVisited&Flow=1");
                    break;
                case "1BestLimits":
                    ShowModalWindow(pg + "151318&Flow=1");
                    break;
                case "1AdjPrice":
                    ShowModalWindow(pg + "151319&Flow=1");
                    break;
                case "1ShareChange":
                    ShowModalWindow(pg + "151310&Flow=1");
                    break;
                case "1MarketCap":
                    ShowModalWindow(pg + "15131A&Flow=1");
                    break;
                case "1MostTradedValue":
                    ShowModalWindow(pg + "15131B&Flow=1");
                    break;
                case "1MostTradedVolume":
                    ShowModalWindow(pg + "15131C&Flow=1");
                    break;
                case "1Sector":
                    ShowModalWindow(pg + "15131O");
                    break;
                case "1MarketValue":
                    ShowModalWindow(pg + "15131N&Flow=1", 400);
                    break;
                case "2IfbIndex":
                    window.open("Loader.aspx?ParTree=15131J&i=43685683301327984", "_blank");
                    break;
                case "2TseMsg":
                    ShowModalWindow(pg + "151313&Flow=2");
                    break;
                case "2NewsTop":
                    ShowModalWindow(pg + "151314&Flow=2");
                    break;
                case "2MostPclosingInc":
                    ShowModalWindow(pg + "151317&Type=PClosingTop&Flow=2");
                    break;
                case "2MostPclosingDec":
                    ShowModalWindow(pg + "151317&Type=PClosingBtm&Flow=2");
                    break;
                case "2TwoPriceDiffTop":
                    ShowModalWindow(pg + "151317&Type=TwoPriceDiffTop&Flow=2");
                    break;
                case "2TwoPriceDiffBtm":
                    ShowModalWindow(pg + "151317&Type=TwoPriceDiffBtm&Flow=2");
                    break;
                case "2Bonds":
                    ShowModalWindow(pg + "151317&Type=Bonds&Flow=2");
                    break;
                case "2MostVisited":
                    ShowModalWindow(pg + "151317&Type=MostVisited&Flow=2");
                    break;
                case "2InstAffect":
                    ShowModalWindow(pg + "151316&Flow=2");
                    break;
                case "2MarketValue":
                    ShowModalWindow(pg + "15131N&Flow=2", 400);
                    break;
                case "2BestLimits":
                    ShowModalWindow(pg + "151318&Flow=2");
                    break;
                case "2AdjPrice":
                    ShowModalWindow(pg + "151319&Flow=2");
                    break;
                case "2ShareChange":
                    ShowModalWindow(pg + "151310&Flow=2");
                    break;
                case "2MarketCap":
                    ShowModalWindow(pg + "15131A&Flow=2");
                    break;
                case "2MostTradedValue":
                    ShowModalWindow(pg + "15131B&Flow=2");
                    break;
                case "2MostTradedVolume":
                    ShowModalWindow(pg + "15131C&Flow=2");
                    break;
                case "25MostVisited":
                    ShowModalWindow(pg + "151317&Type=MostVisited&Flow=25");
                    break;
                case "26MostVisited":
                    ShowModalWindow(pg + "151317&Type=MostVisited&Flow=26");
                    break;
                case "27MostVisited":
                    ShowModalWindow(pg + "151317&Type=MostVisited&Flow=27");
                    break;
                case "28MostVisited":
                    ShowModalWindow(pg + "151317&Type=MostVisited&Flow=28");
                    break;
                case "29MostVisited":
                    ShowModalWindow(pg + "151317&Type=MostVisited&Flow=29");
                    break;
                case "3TseMsg":
                    ShowModalWindow(pg + "151313&Flow=3");
                    break;
                case "3Pclosing":
                    ShowModalWindow(pg + "151317&Type=PClosingTop&Flow=3");
                    break;
                case "3BestLimits":
                    ShowModalWindow(pg + "151318&Flow=3");
                    break;
                case "3PclosingFuture":
                    ShowModalWindow(pg + "151317&Type=PClosingTopFuture&Flow=3");
                    break;
                case "3FutureOption":
                    ShowModalWindow(pg + "151317&Type=FutureOption&Flow=3");
                    break;
                case "3FutureOptionOTC":
                    ShowModalWindow(pg + "151317&Type=FutureOptionOTC&Flow=3");
                    break;
                case "3PclosingOption":
                    ShowModalWindow(pg + "151317&Type=PClosingTopOption&Flow=3");
                    break;
                case "3PclosingOptionConsequential":
                    ShowModalWindow(pg + "151317&Type=PClosingTopOptionConsequential&Flow=3");
                    break;
                case "3BestLimitsFuture":
                    ShowModalWindow(pg + "151318&Flow=3&Type=Future");
                    break;
                case "3BestLimitsOption":
                    ShowModalWindow(pg + "151318&Flow=3&Type=Option");
                    break;
                case "3BestLimitsOptionOTC":
                    ShowModalWindow(pg + "151318&Flow=3&Type=OptionOTC");
                    break;
                case "3BestLimitsOptionConsequential":
                    ShowModalWindow(pg + "151318&Flow=3&Type=OptionConsequential");
                    break;
                case "3PclosingBedehi":
                    ShowModalWindow(pg + "151317&Type=PClosingTopBedehi&Flow=3");
                    break;
                case "3BestLimitsBedehi":
                    ShowModalWindow(pg + "151318&Flow=3&Type=Bedehi");
                    break;
                case "7TseMsg":
                    ShowModalWindow(pg + "151313&Flow=7")
            }
        },
        TseMsg: function(i) {
            ShowModalWindow("Loader.aspx?Partree=151313&m=" + i)
        },
        UpdateTimeout: function() {
            window.setTimeout("jo.UpdateData()", jo.UpdateInterval)
        },
        UpdateTimeoutIme: function() {
            window.setTimeout("jo.UpdateData()", jo.UpdateIntervalIme)
        },
        UpdateTimeoutEng: function() {
            window.setTimeout("jo.UpdateData()", jo.UpdateIntervalEng)
        },
        UpdateTseDerivative: function() {
            $.ajax({
                url: "Loader.aspx?ParTree=151322",
                cache: true,
                dataType: "text",
                timeout: 10000,
                success: function(data) {
                    $("#TseTab5Elm").html($("#PureData", data).html())
                },
                error: function() {
                    jo.UpdateTimeout()
                },
            })
        },
        UpdateData: function() {
            if ($("#GlobalTab3Elm").css("display") != "none") {
                $.ajax({
                    url: "Loader.aspx?ParTree=15131R",
                    cache: true,
                    dataType: "text",
                    timeout: 10000,
                    success: function(data) {
                        $("#EngTab0Elm").html($("#PureData0", data));
                        $("#EngTab1Elm").html($("#PureData1", data));
                        $("#EngTab2Elm").html($("#PureData2", data));
                        $("#EngTab3Elm").html($("#PureData3", data));
                        $("#EngTab9Elm").html($("#PureData9", data));
                        $("#EngTab4Elm").html($("#PureData4", data));
                        $("#EngTab5Elm").html($("#PureData5", data));
                        $("#EngTab6Elm").html($("#PureData6", data));
                        $("#EngTab7Elm").html($("#PureData7", data));
                        $("#EngTab8Elm").html($("#PureData8", data));
                        $("#EngTab10Elm").html($("#PureData10", data));
                        jo.UpdateTimeout()
                    },
                    error: function() {
                        jo.UpdateTimeout()
                    },
                })
            } else {
                if ($("#GlobalTab4Elm").css("display") != "none") {
                    jo.UpdateCodal()
                } else {
                    if ($("#GlobalTab6Elm").css("display") != "none") {
                        jo.UpdateIme()
                    } else {
                        $.ajax({
                            url: "Loader.aspx?ParTree=15",
                            cache: true,
                            dataType: "text",
                            timeout: 8000,
                            error: function() {
                                jo.UpdateInterval = 15000;
                                jo.UpdateTimeout()
                            },
                            success: function(data) {
                                if (data != "-") {
                                    try {
                                        data = data.replace(/<!--RealServerTime-->/g, RealServerTime);
                                        var parts = data.split("<!--0-->");
                                        $("#TseTab1Elm").html(parts[1]);
                                        $("#TseTab2Part2").html(parts[3]);
                                        $("#TseTab3Elm").html(parts[5]);
                                        $("#TseTab4Elm").html(parts[7]);
                                        $("#TseTab6Elm").html(parts[9]);
                                        $("#IfbTab1Elm").html(parts[12]);
                                        $("#IfbTab2Part2").html(parts[14]);
                                        $("#IfbTab3Elm").html(parts[16]);
                                        $("#IfbTab4Elm").html(parts[18]);
                                        $("#IfbTab5Elm").html(parts[20]);
                                        parts = null;
                                        jo.DrawCharts();
                                        jo.DrawGTab();
                                        jo.UpdateInterval = 4000;
                                        jo.UpdateTimeout()
                                    } catch (e) {
                                        jo.UpdateInterval = 15000;
                                        jo.UpdateTimeout()
                                    }
                                }
                            }
                        })
                    }
                }
            }
            if ($("#GlobalTab1Elm").css("display") != "none" && $("#TseTab5Elm").css("display") != "none" && Math.random() > 0.8) {
                jo.UpdateTseDerivative()
            }
        },
        DrawGTab: function() {
            document.getElementById("GlobalTab0Elm").innerHTML = "<div class='header'>بورس اوراق بهادار تهران</div><div class='content'><div class=\"box1 blue tbl z1_4 h210\">" + document.getElementById("TseTab1Elm").children[0].innerHTML + '</div><div class="box1 silver tbl z3_4 h210">' + document.getElementById("TseTab2Part2").children[0].innerHTML + '</div><div class="box1 silver tbl z1_4 h210">' + document.getElementById("TseTab2Part2").children[1].innerHTML + '</div><div class="box1 green tbl z3_4 h210">' + document.getElementById("TseTab1Elm").children[2].innerHTML + "</div></div><div class='header'>فرابورس ایران</div><div class='content'><div class=\"box1 blue tbl z1_4 h210\">" + document.getElementById("IfbTab1Elm").children[0].innerHTML + '</div><div class="box1 silver tbl z3_4 h210">' + document.getElementById("IfbTab2Part2").children[2].innerHTML + '</div><div class="box1 silver tbl z1_4 h210">' + document.getElementById("IfbTab2Part2").children[3].innerHTML + '</div><div class="box1 green tbl z3_4 h210">' + document.getElementById("IfbTab1Elm").children[3].innerHTML + "</div></div>"
        },
        DrawCharts: function() {
            if (jo.Chart1LastLength == 0) {
                $("#IndexLastDay").bind("axisLabelCreating", function(e, data) {
                    if (data.context.axis.location != "bottom") {
                        data.text = bigNumberTxt(data.text)
                    }
                });
                $("#IndexLastDay2").bind("axisLabelCreating", function(e, data) {
                    if (data.context.axis.location != "bottom") {
                        data.text = bigNumberTxt(data.text)
                    }
                })
            }
            if (jo.Chart1LastLength != F1_ChartIndexLastDay.length) {
                var rows = F1_ChartIndexLastDay.split(";");
                var ChartData = [];
                var cols;
                for (var ipos = 0; ipos < rows.length; ipos++) {
                    cols = rows[ipos].split(",");
                    if (cols[0].length == 5) {
                        cols[0] = "0" + cols[0]
                    }
                    ChartData.push([new Date(2013, 1, 1, cols[0].substring(0, 2), cols[0].substring(2, 4), 0), parseFloat(cols[1])])
                }
                if ($("#IndexLastDay").html().length != 0) {
                    $("#IndexLastDay").jqChart("destroy")
                }
                $("#IndexLastDay").jqChart({
                    border: {
                        cornerRadius: 0,
                        lineWidth: 0,
                        strokeStyle: "green"
                    },
                    axes: [{
                        type: "linear",
                        location: "left",
                        width: 60
                    }, {
                        type: "dateTime",
                        location: "bottom",
                        labels: {
                            stringFormat: "HH:MM"
                        }
                    }],
                    tooltips: {
                        type: "shared"
                    },
                    legend: {
                        visible: false
                    },
                    series: [{
                        type: "line",
                        data: ChartData,
                        markers: {
                            size: 0
                        }
                    }, ]
                });
                $("#IndexLastDay").bind("tooltipFormat", function(e, data) {
                    return data.x.getHours() + ":" + data.x.getMinutes() + " " + data.y
                });
                var rows2 = F1_ChartIndexLastDay2.split(";");
                var ChartData2 = [];
                var cols2;
                for (var ipos = 0; ipos < rows2.length; ipos++) {
                    cols2 = rows2[ipos].split(",");
                    if (cols2[0].length == 5) {
                        cols2[0] = "0" + cols2[0]
                    }
                    ChartData2.push([new Date(2013, 1, 1, cols2[0].substring(0, 2), cols2[0].substring(2, 4), 0), parseFloat(cols2[1])])
                }
                if ($("#IndexLastDay2").html().length != 0) {
                    $("#IndexLastDay2").jqChart("destroy")
                }
                $("#IndexLastDay2").jqChart({
                    border: {
                        cornerRadius: 0,
                        lineWidth: 0,
                        strokeStyle: "green"
                    },
                    axes: [{
                        type: "linear",
                        location: "left",
                        width: 60
                    }, {
                        type: "dateTime",
                        location: "bottom",
                        labels: {
                            stringFormat: "HH:MM"
                        }
                    }],
                    tooltips: {
                        type: "shared"
                    },
                    legend: {
                        visible: false
                    },
                    series: [{
                        type: "line",
                        data: ChartData2,
                        markers: {
                            size: 0
                        }
                    }, ]
                });
                $("#IndexLastDay2").bind("tooltipFormat", function(e, data) {
                    return data.x.getHours() + ":" + data.x.getMinutes() + " " + data.y
                });
                jo.Chart1LastLength = F1_ChartIndexLastDay.length
            }
            if (jo.Chart2LastLength == 0) {
                $("#F2_IndexLastDay").bind("axisLabelCreating", function(e, data) {
                    if (data.context.axis.location != "bottom") {
                        data.text = bigNumberTxt(data.text)
                    }
                })
            }
            if (jo.Chart2LastLength != F2_ChartIndexLastDay.length) {
                var rows = F2_ChartIndexLastDay.split(";");
                var ChartData = [];
                var cols;
                for (var ipos = 0; ipos < rows.length; ipos++) {
                    cols = rows[ipos].split(",");
                    if (cols[0].length == 5) {
                        cols[0] = "0" + cols[0]
                    }
                    ChartData.push([new Date(2013, 1, 1, cols[0].substring(0, 2), cols[0].substring(2, 4), 0), parseFloat(cols[1])])
                }
                if ($("#F2_IndexLastDay").html().length != 0) {
                    $("#F2_IndexLastDay").jqChart("destroy")
                }
                $("#F2_IndexLastDay").jqChart({
                    border: {
                        cornerRadius: 0,
                        lineWidth: 0,
                        strokeStyle: "green"
                    },
                    axes: [{
                        type: "linear",
                        location: "left",
                        width: 60
                    }, {
                        type: "dateTime",
                        location: "bottom",
                        labels: {
                            stringFormat: "HH:MM"
                        }
                    }],
                    tooltips: {
                        type: "shared"
                    },
                    legend: {
                        visible: false
                    },
                    series: [{
                        type: "line",
                        data: ChartData,
                        markers: {
                            size: 0
                        }
                    }, ]
                });
                $("#F2_IndexLastDay").bind("tooltipFormat", function(e, data) {
                    return data.x.getHours() + ":" + data.x.getMinutes() + " " + data.y
                });
                jo.Chart2LastLength = F2_ChartIndexLastDay.length
            }
            if ($("#F2_ChartIndex3Month").html().length == 0) {
                var rows = F2_ChartIndex3Month.split(";");
                var ChartData = [];
                var cols;
                for (var ipos = 0; ipos < rows.length; ipos++) {
                    cols = rows[ipos].split(",");
                    ChartData.push([new Date(cols[0].substring(0, 4), parseInt(cols[0].substring(4, 6), 10) - 1, cols[0].substring(6, 8)), parseFloat(cols[1])])
                }
                $("#F2_ChartIndex3Month").bind("axisLabelCreating", function(e, data) {
                    if (data.context.axis.location == "bottom") {
                        data.text = toPersianDate(new Date(data.text))
                    } else {
                        data.text = bigNumberTxt(data.text)
                    }
                });
                $("#F2_ChartIndex3Month").jqChart({
                    border: {
                        cornerRadius: 0,
                        lineWidth: 0,
                        strokeStyle: "green"
                    },
                    axes: [{
                        type: "linear",
                        location: "left",
                        width: 60
                    }, {
                        type: "dateTime",
                        location: "bottom",
                        labels: {
                            stringFormat: "yyyy/mm/dd"
                        }
                    }],
                    legend: {
                        visible: false
                    },
                    series: [{
                        type: "line",
                        data: ChartData,
                        markers: {
                            size: 0
                        }
                    }]
                });
                $("#F2_ChartIndex3Month").bind("tooltipFormat", function(e, data) {
                    return toPersianDate(data.x) + " " + data.y
                })
            }
        },
        ShowTab: function(TabName) {
            switch (TabName) {
                case "tsederivative":
                    jo.UpdateTseDerivative();
                    break;
                case "codal":
                    jo.UpdateCodal();
                    break;
                case "energy":
                    if (document.getElementById("EngTab1Elm").innerHTML.length == 0) {
                        $.ajax({
                            url: "Loader.aspx?ParTree=15131R",
                            cache: true,
                            dataType: "text",
                            success: function(data) {
                                $("#EngTab0Elm").html($("#PureData0", data));
                                $("#EngTab1Elm").html($("#PureData1", data));
                                $("#EngTab2Elm").html($("#PureData2", data));
                                $("#EngTab3Elm").html($("#PureData3", data));
                                $("#EngTab4Elm").html($("#PureData4", data));
                                $("#EngTab9Elm").html($("#PureData9", data));
                                $("#EngTab5Elm").html($("#PureData5", data));
                                $("#EngTab6Elm").html($("#PureData6", data));
                                $("#EngTab7Elm").html($("#PureData7", data));
                                $("#EngTab8Elm").html($("#PureData8", data));
                                $("#EngTab10Elm").html($("#PureData10", data))
                            }
                        })
                    }
                    break;
                case "ime":
                    $("#GlobalTab6Elm").css("display", "");
                    if (document.getElementById("ImeTab1Elm").innerHTML.length == 0) {
                        $.ajax({
                            url: "Loader.aspx?Partree=151317&Type=MostVisited&Flow=7",
                            async: false,
                            cache: true,
                            dataType: "text",
                            success: function(data) {
                                $("#ImeTab1Elm").html($("#PureData", data).html())
                            }
                        });
                        $.ajax({
                            url: "Loader.aspx?Partree=151317&Type=AgriculturalMercantileContinuous&Flow=1",
                            async: false,
                            cache: true,
                            dataType: "text",
                            success: function(data) {
                                $("#ImeTab10Elm").html($("#PureData", data).html())
                            }
                        });
                        $.ajax({
                            url: "Loader.aspx?Partree=151317&Type=AgriculturalMercantileDiscontinuous&Flow=1",
                            async: false,
                            cache: true,
                            dataType: "text",
                            success: function(data) {
                                $("#ImeTab10Elm").html($("#PureData", data).html() + "<br/>" + $("#ImeTab10Elm").html())
                            }
                        });
                        $.ajax({
                            url: "Loader.aspx?Partree=151317&Type=FundMercantile&Flow=1",
                            async: false,
                            cache: true,
                            dataType: "text",
                            success: function(data) {
                                $("#ImeTab12Elm").html($("#PureData", data).html())
                            }
                        });
                        if (typeof(ImeInfoJS) != "function") {
                            ens("ime", version);
                            ime = ImeInfoJS();
                            ime.UpdateImeInfo();
                            ime.ImeMsg()
                        }
                    }
                    break;
                case "mfund":
                    jo.UpdateMF();
                    break;
                case "tseall":
                    $(".rainbow_tse_elm").css("display", "");
                    break;
                case "ifball":
                    $(".rainbow_ifb_elm").css("display", "");
                    break;
                case "engall":
                    $(".rainbow_eng_elm").css("display", "");
                    break
            }
        },
        ShowMarket: function(Market) {
            for (ipos = 1; ipos <= 7; ipos++) {
                if (Market == ipos) {
                    $("#Market" + ipos).removeClass("hidden");
                    $("#MOT" + ipos).addClass("active")
                } else {
                    $("#Market" + ipos).addClass("hidden");
                    $("#MOT" + ipos).removeClass("active")
                }
            }
            jo.ActiveTab = Market;
            setData("LastActiveTab", Market);
            jo.AdjustVal();
            if (Market == 7 && document.getElementById("Market7").innerHTML.length == 0) {
                $.ajax({
                    url: "Loader.aspx?ParTree=15131R",
                    cache: true,
                    dataType: "text",
                    success: function(data) {
                        $("#Market7").html($("#PureData", data))
                    }
                })
            } else {
                if (Market == 6) {
                    jo.UpdateMF()
                }
            }
        },
        UpdateCodal: function() {
            $.ajax({
                url: "tsev2/data/CodalTopNew.aspx",
                cache: true,
                dataType: "text",
                data: {},
                error: function() {
                    jo.UpdateTimeout()
                },
                success: function(data) {
                    RenderCodal(eval(data), "#CodalDiv");
                    jo.UpdateTimeout()
                }
            })
        },
        UpdateMF: function(tabID) {
            try {
                if (tabID != undefined && $("#FundTab" + tabID + "Elm") != undefined) {
                    $("#FundTab" + tabID + "Elm").html("");
                    $("#FundTab" + tabID + "Elm").append("&nbsp;&nbsp;<span style='color:black'>برای مشاهده اطلاعات دقیق و بروز صندوق ها به سایت هر صندوق مراجعه کنید</span><br />&nbsp;&nbsp;<span style='color:red'>برای مشاهده اطلاعات بیشتر در هر روز معاملاتی بر روی سطر مورد نظر دبل کلیک کنید</span><div id=\"mflist" + tabID + '" width="98%" style="width:98%;background-color:white;direction:ltr"></div><div id=\'paging\'></div>');
                    var Header = "<p style='text-align:right;margin-right:2px;'>بازدهی سالانه (درصد%)</p>,<p style='text-align:right;'>بازدهی شش ماهه (درصد%)</p>,<p style='text-align:right;'>بازدهی سه ماهه (درصد%)</p>,<p style='text-align:right;'>بازدهی ماهانه (درصد%)</p>,<p style='text-align:right;'>NAV</p>,<p style='text-align:right;'>خالص ارزش دارایی صندوق</p>,<p style='text-align:right;'>تاریخ اطلاعات</p>,<p style='text-align:right;'>مدیر</p>,<p style='text-align:right;'>ضامن</p>,<p style='text-align:right;'>نام صندوق</p>";
                    document.getElementById("mflist" + tabID).style.height = ($(window).height() - 180) + "px";
                    gr = new dhtmlXGridObject("mflist" + tabID);
                    gr.setImagePath("/tools/dhtmlxgrid/imgs/");
                    gr.setHeader(Header);
                    gr.attachEvent("onRowDblClicked", jo.FundDetail);
                    gr.setInitWidths("80,80,80,80,80,80,65,150,150,200");
                    gr.setColTypes("ed,ed,ed,ed,ed,ed,ed,ed,ed,ed");
                    gr.setColSorting("int,int,int,int,int,int,str,str,str,str");
                    gr.setColAlign("left,left,left,left,left,left,right,right,right,right");
                    gr.setSkin("modern");
                    gr.setEditable(false);
                    gr.init();
                    gr.clearAll();
                    var ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
                    if (ismobile) {
                        gr.enableAutoHeight(true)
                    }
                    $.ajax({
                        url: "tsev2/data/MFLast.aspx",
                        data: {
                            type: tabID
                        },
                        cache: true,
                        dataType: "text",
                        success: function(data) {
                            var rows = data.split(";");
                            var ipos;
                            var cols = "";
                            for (ipos = 0; ipos < rows.length; ipos++) {
                                cols = rows[ipos].split(",");
                                gr.addRowP0(cols[1], [AdvRound(cols[15], 2), AdvRound(cols[12], 2), AdvRound(cols[17], 2), AdvRound(cols[14], 2), bigNumberTxt(cols[8]), bigNumberTxt(cols[9]), cols[2], cols[11], cols[10], cols[0]])
                            }
                            gr.sortRows(9, gr.getColTypeById(9), "asc");
                            gr.sortRows(6, gr.getColTypeById(6), "des")
                        }
                    })
                }
            } catch (err) {}
        },
        FundDetail: function(ProwId, PcellId) {
            window.open("http://main.tsetmc.com/Fund/" + ProwId, "_blank")
        },
        UpdateIme: function() {
            if ($("#ImeTab1Elm").css("display") != "none") {
                $.ajax({
                    url: "Loader.aspx?Partree=151317&Type=MostVisited&Flow=7",
                    async: false,
                    cache: true,
                    dataType: "text",
                    success: function(data) {
                        $("#ImeTab1Elm").html($("#PureData", data).html())
                    }
                })
            } else {
                if ($("#ImeTab10Elm").css("display") != "none") {
                    $.ajax({
                        url: "Loader.aspx?Partree=151317&Type=AgriculturalMercantileContinuous&Flow=1",
                        async: false,
                        cache: true,
                        dataType: "text",
                        success: function(data) {
                            $("#ImeTab10Elm").html($("#PureData", data).html())
                        }
                    });
                    $.ajax({
                        url: "Loader.aspx?Partree=151317&Type=AgriculturalMercantileDiscontinuous&Flow=1",
                        async: false,
                        cache: true,
                        dataType: "text",
                        success: function(data) {
                            $("#ImeTab10Elm").html($("#PureData", data).html() + "<br/>" + $("#ImeTab10Elm").html())
                        }
                    })
                } else {
                    if ($("#ImeTab12Elm").css("display") != "none") {
                        $.ajax({
                            url: "Loader.aspx?Partree=151317&Type=FundMercantile&Flow=1",
                            async: false,
                            cache: true,
                            dataType: "text",
                            success: function(data) {
                                $("#ImeTab12Elm").html($("#PureData", data).html())
                            }
                        })
                    } else {
                        if (typeof(ImeInfoJS) != "function") {
                            ens("ime", version);
                            ime = ImeInfoJS()
                        }
                        ime.UpdateImeInfo();
                        ime.ImeMsg()
                    }
                }
            }
            jo.UpdateTimeoutIme()
        }
    };
    return MarketOverall
};;
(function(d) {
    var e, f = d();
    d.fn.sortable = function(a) {
        var b = String(a);
        return a = d.extend({
            connectWith: !1
        }, a), this.each(function() {
            if (/^enable|disable|destroy$/.test(b)) {
                var c = d(this).children(d(this).data("items")).attr("draggable", b == "enable");
                b == "destroy" && c.add(this).removeData("connectWith items").off("dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s");
                return
            }
            var j, k, c = d(this).children(a.items),
                l = d("<" + (/^ul|ol$/i.test(this.tagName) ? "li" : "div") + ' class="sortable-placeholder">');
            c.find(a.handle).mousedown(function() {
                j = !0
            }).mouseup(function() {
                j = !1
            }), d(this).data("items", a.items), f = f.add(l), a.connectWith && d(a.connectWith).add(this).data("connectWith", a.connectWith), c.attr("draggable", "true").on("dragstart.h5s", function(g) {
                if (a.handle && !j) {
                    return !1
                }
                j = !1;
                var h = g.originalEvent.dataTransfer;
                h.effectAllowed = "move", h.setData("Text", "dummy"), k = (e = d(this)).addClass("sortable-dragging").index()
            }).on("dragend.h5s", function() {
                e.removeClass("sortable-dragging").show(), f.detach(), k != e.index() && c.parent().trigger("sortupdate", {
                    item: e
                }), e = null
            }).not("a[href], img").on("selectstart.h5s", function() {
                return this.dragDrop && this.dragDrop(), !1
            }).end().add([this, l]).on("dragover.h5s dragenter.h5s drop.h5s", function(g) {
                return !c.is(e) && a.connectWith !== d(e).parent().data("connectWith") ? !0 : g.type == "drop" ? (g.stopPropagation(), f.filter(":visible").after(e), !1) : (g.preventDefault(), g.originalEvent.dataTransfer.dropEffect = "move", c.is(this) ? (a.forcePlaceholderSize && l.height(e.outerHeight()), e.hide(), d(this)[l.index() < d(this).index() ? "after" : "before"](l), f.not(l).detach()) : !f.is(this) && !d(this).children(a.items).length && (f.detach(), d(this).append(l)), !1)
            })
        })
    }
})(jQuery);;
var RealServerTime = "";
(function() {
    var h = 1000 * 60 * 60 * 0.5;
    var d = "LastSyncWithTimeServer";
    var i = "Local-Server-TimeDiff";
    var c;
    var e = 0;
    var a = 1000;
    if (window.localStorage.getItem(d) == null || window.localStorage.getItem(d) == "Invalid Date") {
        window.localStorage.setItem(d, "" + (new Date(0)))
    }
    c = new Date(window.localStorage.getItem(d));
    if (Math.abs((new Date()) - c) > h) {
        window.localStorage.removeItem(d, "" + (new Date()));
        g()
    } else {
        f()
    }

    function g() {
        try {
            var k = new Date();
            var l = $.ajax({
                type: "HEAD",
                crossDomain: true,
                url: "/Loader.aspx?ParTree=15",
                success: function(n) {
                    var m = new Date(l.getResponseHeader("Date")) - (new Date()) + ((new Date()) - k) / 2;
                    if (e++ < 3 && ((new Date()) - k > a || l.getResponseHeader("Date") == null)) {
                        g()
                    } else {
                        if (e >= 3) {
                            h = 1000 * 10
                        } else {
                            h = 1000 * 60 * 60 * 0.5
                        }
                        b(m)
                    }
                },
                error: function(n) {
                    var m = new Date(l.getResponseHeader("Date")) - (new Date()) + ((new Date()) - k) / 2;
                    if (e++ < 3 && ((new Date()) - k > a || l.getResponseHeader("Date") == null)) {
                        g()
                    } else {
                        if (e >= 3) {
                            h = 1000 * 10
                        } else {
                            h = 1000 * 60 * 60 * 0.5
                        }
                        b(m)
                    }
                }
            })
        } catch (j) {
            h = 1000 * 10;
            window.setTimeout(f, 1000)
        }
    }

    function b(j) {
        window.localStorage.setItem(d, "" + (new Date()));
        window.localStorage.setItem(i, j);
        f()
    }

    function f() {
        var k = parseInt(window.localStorage.getItem(i), 10);
        var j = new Date(Date.now() + k);
        var l = 3.5 * 60 * 60 * 1000;
        var m = 100 * (1 + j.getMonth()) + j.getDate();
        if (m >= 322 && m < 922) {
            l = 3.5 * 60 * 60 * 1000
        }
        RealServerTime = (new Date(Date.now() + k + l)).toGMTString().split(" ")[4];
        if (RealServerTime == undefined) {
            RealServerTime = ""
        }
        $(".RealServerTime").html(RealServerTime);
        c = new Date(window.localStorage.getItem(d));
        if ((window.localStorage.getItem(d) == null) || (Math.abs((new Date()) - c) > h)) {
            e = 0;
            window.localStorage.removeItem(d, "" + (new Date()));
            g()
        } else {
            window.setTimeout(f, 1000)
        }
    }
})();;