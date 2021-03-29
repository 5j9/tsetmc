# generate the pattern for PAGE_VARS regex

from re import sub, match, findall


strings = [
    "<script>var TopInst='1',LVal18AFC='فملي',DEven='0',LSecVal='فلزات اساسي',CgrValCot='N1',Flow='1',InstrumentID='IRO1MSMI0001',InsCode='35425587644337450',BaseVol=8817046,EstimatedEPS='1045',ZTitad=200000000000,CIsin='IRO1MSMI0000',LVal18AFC='فملي',CSecVal='27 ',PdrCotVal='',PClosing='',PSGelStaMax='14230.00',PSGelStaMin='13170.00',Title='ملي‌ صنايع‌ مس‌ ايران‌ (فملي) - بازار اول (تابلوي اصلي) بورس',FaraDesc ='',MinWeek='12620.00',MaxWeek='13940.00',MinYear='6880.00',MaxYear='39810.00',QTotTran5JAvg='96382065',SectorPE='12.03',KAjCapValCpsIdx='33',PriceMin=0,PriceMax=0,PriceYesterday=0;ThemeCount='5';ContractSize='0';NAV='0.0000';</script>",
    "<script>var TopInst='1',LVal18AFC='دی',DEven='0',LSecVal='بانکها و موسسات اعتباری',CgrValCot='Z1',Flow='2',InstrumentID='IRO3BDYZ0001',InsCode='44818950263583523',BaseVol=2231446,EstimatedEPS='4326',ZTitad=6400000000,CIsin='IRO3BDYZ0003',LVal18AFC='دی',CSecVal='57 ',PdrCotVal='',PClosing='',PSGelStaMax='48324.00',PSGelStaMin='43722.00',Title='بانک دی (دی) - بازار دوم فرابورس',FaraDesc ='',MinWeek='43722.00',MaxWeek='49934.00',MinYear='2674.00',MaxYear='83000.00',QTotTran5JAvg='25836324',SectorPE='16.69',KAjCapValCpsIdx='',PriceMin=0,PriceMax=0,PriceYesterday=0;ThemeCount='5';ContractSize='0';</script>",
]

pattern = None
for string in strings:
    string = string.removeprefix('<script>var ').removesuffix('</script>')
    # FaraDesc has a space before = otherwise \s* is not needed
    pat = sub(r"((\w+)\s*)=('?).*?'?([,;])", r"\1=\3(?P<\2>[^\4]*)\3\4", string)
    # LVal18AFC is defined two times!
    pat = pat.replace('(?P<LVal18AFC>[^,]*)', '[^,]*', 1)

    # the NAV='(?P<NAV>[^;]*)' is sometimes not present
    if pat.endswith("NAV='(?P<NAV>[^;]*)';"):
        pat = pat.replace("NAV='(?P<NAV>[^;]*)';", "(NAV='(?P<NAV>[^;]*)';)?")
    else:
        pat += "(NAV='(?P<NAV>[^;]*)';)?"

    assert match(pat, string)

    if pattern is not None:
        try:
            assert pattern == pat
        except AssertionError:
            print(repr(pattern))
            print(repr(pat))
            raise

    pattern = pat


pattern_lines = '\n    '.join(map(repr, findall(r'.*?[,;]\b', pattern)))
print(
    f'PAGE_VARS = rc(\n'
    f'    {pattern_lines}\n'
    f').search'
)
