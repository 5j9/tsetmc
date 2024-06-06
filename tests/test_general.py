from aiohutils.tests import assert_dict_type, file
from numpy import dtype

from tests import STR
from tsetmc.general import (
    FundType,
    MarketOverview,
    boards,
    cs_codes,
    get_funds,
    industrial_groups_overview,
    major_holders_activity,
    market_map_data,
    market_overview,
    top_industry_groups,
)


@file('boards.html')
async def test_boards():
    assert await boards() == {
        1: 'تابلو اصلی',
        3: 'تابلو فرعی',
        4: 'تابلو غیر رسمی',
        5: 'فهرست اولیه',
        6: 'تابلو شاخص',
        7: 'فهرست مشروط',
        8: 'ابزار مشتقه',
        9: 'بازار اوراق بدهی',
    }


@file('cs_codes.html')
async def test_cs_codes():
    assert await cs_codes() == {
        '01': 'زراعت و خدمات وابسته',
        '02': 'جنگلداری و ماهیگیری',
        '10': 'استخراج زغال سنگ',
        '11': 'استخراج نفت گاز و خدمات جنبی جز اکتشاف',
        '13': 'استخراج کانه های فلزی',
        '14': 'استخراج سایر معادن',
        '15': 'حذف شده- فرآورده\u200cهای غذایی و آشامیدنی',
        '17': 'منسوجات',
        '19': 'دباغی، پرداخت چرم و ساخت انواع پاپوش',
        '20': 'محصولات چوبی',
        '21': 'محصولات کاغذی',
        '22': 'انتشار، چاپ و تکثیر',
        '23': 'فراورده های نفتی، کک و سوخت هسته ای',
        '24': 'حذف شده-مواد و محصولات شیمیایی',
        '25': 'لاستیک و پلاستیک',
        '26': 'تولید محصولات کامپیوتری الکترونیکی ونوری',
        '27': 'فلزات اساسی',
        '28': 'ساخت محصولات فلزی',
        '29': 'ماشین آلات و تجهیزات',
        '31': 'ماشین آلات و دستگاه\u200cهای برقی',
        '32': 'ساخت دستگاه\u200cها و وسایل ارتباطی',
        '33': 'ابزارپزشکی، اپتیکی و اندازه\u200cگیری',
        '34': 'خودرو و ساخت قطعات',
        '35': 'سایر تجهیزات حمل و نقل',
        '36': 'مبلمان و مصنوعات دیگر',
        '38': 'قند و شکر',
        '39': 'شرکتهای چند رشته ای صنعتی',
        '40': 'عرضه برق، گاز، بخاروآب گرم',
        '41': 'جمع آوری، تصفیه و توزیع آب',
        '42': 'محصولات غذایی و آشامیدنی به جز قند و شکر',
        '43': 'مواد و محصولات دارویی',
        '44': 'محصولات شیمیایی',
        '45': 'پیمانکاری صنعتی',
        '46': 'تجارت عمده فروشی به جز وسایل نقلیه موتور',
        '47': 'خرده فروشی،باستثنای وسایل نقلیه موتوری',
        '49': 'کاشی و سرامیک',
        '50': 'تجارت عمده وخرده فروشی وسائط نقلیه موتور',
        '51': 'حمل و نقل هوایی',
        '52': 'انبارداری و حمایت از فعالیتهای حمل و نقل',
        '53': 'سیمان، آهک و گچ',
        '54': 'سایر محصولات کانی غیرفلزی',
        '55': 'هتل و رستوران',
        '56': 'سرمایه گذاریها',
        '57': 'بانکها و موسسات اعتباری',
        '58': 'سایر واسطه گریهای مالی',
        '59': 'اوراق حق تقدم استفاده از تسهیلات مسکن',
        '60': 'حمل ونقل، انبارداری و ارتباطات',
        '61': 'حمل و نقل آبی',
        '63': 'فعالیت های پشتیبانی و کمکی حمل و نقل',
        '64': 'مخابرات',
        '65': 'واسطه\u200cگری\u200cهای مالی و پولی',
        '66': 'بیمه وصندوق بازنشستگی به جزتامین اجتماعی',
        '67': 'فعالیتهای کمکی به نهادهای مالی واسط',
        '68': 'صندوق سرمایه گذاری قابل معامله',
        '69': 'اوراق تامین مالی',
        '70': 'انبوه سازی، املاک و مستغلات',
        '71': 'فعالیت مهندسی، تجزیه، تحلیل و آزمایش فنی',
        '72': 'رایانه و فعالیت\u200cهای وابسته به آن',
        '73': 'اطلاعات و ارتباطات',
        '74': 'خدمات فنی و مهندسی',
        '76': 'اوراق بهادار مبتنی بر دارایی فکری',
        '77': 'فعالبت های اجاره و لیزینگ',
        '82': 'فعالیت پشتیبانی اجرائی اداری وحمایت کسب',
        '90': 'فعالیت های هنری، سرگرمی و خلاقانه',
        '93': 'فعالیتهای فرهنگی و ورزشی',
        '98': 'گروه اوراق غیرفعال',
        'X1': 'شاخص',
    }


@file('industrial_groups_overview.html')
async def test_industrial_groups_overview():
    df = await industrial_groups_overview()
    assert [*df.dtypes.items()] == [
        ('group', STR),
        (':-2', dtype('int64')),
        ('-2:0', dtype('int64')),
        ('0:2', dtype('int64')),
        ('2:', dtype('int64')),
    ]
    assert len(df) > 40


@file('weatherforecast.json')
async def test_market_map_data():
    df = await market_map_data()
    if df.empty:
        return
    assert len(df) > 300
    assert not df.lVal18AFC.str.contains('ي').any()
    assert [*df.dtypes.items()] == [
        ('insCode', STR),
        ('dEven', dtype('int64')),
        ('hEven', dtype('int64')),
        ('pClosing', dtype('float64')),
        ('pDrCotVal', dtype('float64')),
        ('zTotTran', dtype('float64')),
        ('qTotTran5J', dtype('float64')),
        ('qTotCap', dtype('float64')),
        ('priceYesterday', dtype('float64')),
        ('lVal18AFC', STR),
        ('lVal30', STR),
        ('lSecVal', STR),
        ('percent', dtype('float64')),
        ('priceChangePercent', dtype('float64')),
        ('hEvenShow', STR),
        ('color', STR),
        ('fontSize', dtype('int64')),
        ('fontColor', STR),
        ('customLabel', STR),
    ]


@file('major_holders_activity.html')
async def test_major_holders_activity():
    df = await major_holders_activity()
    dtypes = [*df.dtypes.items()]
    assert dtypes[:3] == [
        ('ins_code', dtype('int64')),
        ('l30', STR),
        ('holder', STR),
    ]
    for _, t in dtypes[3:]:
        assert dtype(t) == dtype('float64')


@file('top_industry_groups.html')
async def test_top_industry_groups():
    df = await top_industry_groups()
    assert [*df.dtypes.items()] == [
        ('group', STR),
        ('mv', dtype('float64')),
        ('tno', dtype('int64')),
        ('tvol', dtype('float64')),
        ('tval', dtype('float64')),
    ]


@file('market_overview.json')
async def test_market_overview():
    d = await market_overview()
    assert_dict_type(d, MarketOverview)


@file('get_funds_mix.json')
async def test_get_funds():
    df = await get_funds(FundType.MIXED)
    assert [*df.dtypes.items()] == [
        ('fundProfits', dtype('O')),
        ('stats', dtype('O')),
        ('regNo', dtype('float64')),
        ('fundType', dtype('int64')),
        ('fundSize', dtype('int64')),
        ('recordDate', STR),
        ('navRed', dtype('float64')),
        ('navSub', dtype('float64')),
        ('navStat', dtype('float64')),
        ('initiationDate', STR),
        ('netAsset', dtype('float64')),
        ('units', dtype('float64')),
        ('unitsSub', dtype('float64')),
        ('unitsRed', dtype('float64')),
        ('portfolioFiveBest', dtype('float64')),
        ('portfolioStock', dtype('float64')),
        ('portfolioBond', dtype('float64')),
        ('portfolioDeposit', dtype('float64')),
        ('portfolioOther', dtype('float64')),
        ('portfolioCash', dtype('float64')),
        ('custodian', STR),
        ('custodianEN', dtype('O')),
        ('guarantor', STR),
        ('guarantorEN', dtype('O')),
        ('manager', STR),
        ('managerEN', dtype('O')),
        ('investmentManager', STR),
        ('investmentManagerEN', dtype('O')),
        ('marketMaker', dtype('O')),
        ('marketMakerEN', dtype('O')),
        ('auditor', dtype('O')),
        ('auditorEN', dtype('O')),
        ('name', dtype('O')),
        ('nameEN', dtype('O')),
        ('webSite', STR),
        ('webSiteEN', dtype('O')),
        ('retInvNo', dtype('int64')),
        ('insInvNo', dtype('int64')),
        ('retInvPercent', dtype('float64')),
        ('insInvPercent', dtype('float64')),
        ('naturalPercent', dtype('float64')),
        ('legalPercent', dtype('float64')),
        ('guaranteedEarningRate', dtype('float64')),
        ('estimatedEarningRate', dtype('float64')),
        ('dividentIntervalPeriod', dtype('int64')),
        ('day1Return', dtype('float64')),
        ('day7Return', dtype('float64')),
        ('day30Return', dtype('float64')),
        ('day90Return', dtype('float64')),
        ('day180Return', dtype('float64')),
        ('day365Return', dtype('float64')),
        ('dayFirstReturn', dtype('float64')),
        ('mfName', STR),
        ('fixIncome', dtype('int64')),
        ('mfNameEng', STR),
    ]
    assert len(df) > 20
