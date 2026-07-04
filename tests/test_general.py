import polars as pl
from pytest import warns
from pytest_aiohutils import file, validate_dict

from tsetmc import Flow
from tsetmc.general import (
    MarketOverview,
    boards,
    cs_codes,
    industrial_groups_overview,  # pyright: ignore[reportDeprecated]
    major_holders_activity,
    market_map_data,
    market_overview,
    messages,
    search_messages,
    sectors_summary,
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
        '80': 'تبلیغات و بازار پژوهی',
        '82': 'فعالیت پشتیبانی اجرائی اداری وحمایت کسب',
        '84': 'سلامت انسان و مددکاری اجتماعی',
        '90': 'فعالیت های هنری، سرگرمی و خلاقانه',
        '93': 'فعالیتهای فرهنگی و ورزشی',
        '98': 'گروه اوراق غیرفعال',
        'X1': 'شاخص',
    }


@file('sectors_summary.json')
async def test_sectors_summary():
    lf = await sectors_summary()
    df = lf.collect()

    # Check full schema
    expected_schema = {
        'cSecVal': pl.String,
        'lSecVal': pl.String,
        'c1': pl.Int64,
        'c2': pl.Int64,
        'c3': pl.Int64,
        'c4': pl.Int64,
    }

    assert dict(df.schema) == expected_schema
    assert df.height >= 10


@file('industrial_groups_overview.html')
async def test_industrial_groups_overview():
    with warns(DeprecationWarning):
        lf = await industrial_groups_overview()  # pyright: ignore[reportDeprecated]

    df = lf.collect()

    # Check both column names and dtypes
    expected = {
        'group': pl.String,
        ':-2': pl.Int64,
        '-2:0': pl.Int64,
        '0:2': pl.Int64,
        '2:': pl.Int64,
    }

    assert dict(df.schema) == expected
    assert len(df) >= 10


@file('weatherforecast.json')
async def test_market_map_data():
    lf = await market_map_data()
    df = lf.collect()

    if df.height == 0:
        return

    assert df.height > 300
    assert not df['lVal18AFC'].str.contains('ي').any()

    # Check schema
    expected_schema = {
        'insCode': pl.String,
        'dEven': pl.Int64,
        'hEven': pl.Int64,
        'pClosing': pl.Float64,
        'pDrCotVal': pl.Float64,
        'zTotTran': pl.Float64,
        'qTotTran5J': pl.Float64,
        'qTotCap': pl.Float64,
        'priceYesterday': pl.Float64,
        'lVal18AFC': pl.String,
        'lVal30': pl.String,
        'lSecVal': pl.String,
        'marketCap': pl.Float64,
        'percent': pl.Float64,
        'priceChangePercent': pl.Float64,
        'hEvenShow': pl.String,
        'color': pl.String,
        'fontSize': pl.Int64,
        'fontColor': pl.String,
        'customLabel': pl.String,
    }

    assert dict(df.schema) == expected_schema


@file('major_holders_activity.html')
async def test_major_holders_activity():
    lf = await major_holders_activity()
    if lf is None:
        return
    df = lf.collect()

    # Build expected schema dynamically
    # First 3 columns are strings, rest are float64
    expected_schema: dict = {
        'ins_code': pl.String,
        'l30': pl.String,
        'holder': pl.String,
    }

    # Remaining columns have dates as names and should be float64
    for col in df.columns[3:]:
        expected_schema[col] = pl.Float64

    assert dict(df.schema) == expected_schema


@file('top_industry_groups.html')
async def test_top_industry_groups():
    lf = await top_industry_groups()
    df = lf.collect()

    # Check if DataFrame is empty
    if df.height == 0:
        return

    # Check full schema
    expected_schema = {
        'group': pl.String,
        'mv': pl.Float64,
        'tno': pl.Float64,
        'tvol': pl.Float64,
        'tval': pl.Float64,
    }

    # Check each column's dtype
    for col, expected_dtype in expected_schema.items():
        assert col in df.columns
        assert df[col].dtype == expected_dtype, (
            f'Column {col} has dtype {df[col].dtype}, expected {expected_dtype}'
        )


@file('market_overview.json')
async def test_market_overview():
    d = await market_overview()
    validate_dict(d, MarketOverview)


MSG_SCHEMA = {
    'tseMsgIdn': pl.Int64,
    'dEven': pl.Int64,
    'hEven': pl.Int64,
    'tseTitle': pl.String,
    'tseDesc': pl.String,
    'flow': pl.Int64,
}


@file('messages.json')
async def test_messages():
    lf = await messages(top=3, flow=Flow.ENERGY)
    df = lf.collect()

    # Check length
    assert df.height == 3

    # Check schema
    assert dict(df.schema) == MSG_SCHEMA

    # Check that all titles contain 'بورس انرژی'
    assert df['tseTitle'].str.contains('بورس انرژی', literal=True).all()


@file('search_messages.json')
async def test_search_messages():
    term = 'صندوق'
    lf = await search_messages(sh_date='1400-11-02', term=term)
    df = lf.collect()

    # Check that all messages contain the search term
    assert df['tseDesc'].str.contains(term, literal=True).all()
    assert dict(df.schema) == MSG_SCHEMA
