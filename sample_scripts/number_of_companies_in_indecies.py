from asyncio import gather, run

from polars import Config, Series

from tsetmc.indices import Index, last_state


async def number_of_companies(code):
    companies = (await Index(code).companies())['indexCompany'].collect()
    return len(companies)


async def main():
    lf = await last_state()
    df = lf.collect()
    no = await gather(
        *[number_of_companies(code) for code in df.get_column('insCode')]
    )
    df = df.with_columns(Series('NoOfCompanies', no))
    df = df.sort('NoOfCompanies', descending=True)
    with Config(
        tbl_rows=-1,  # all rows
        tbl_cols=-1,  # all columns
        tbl_width_chars=150,
        fmt_str_lengths=100,
    ):
        print(df[['lVal30', 'NoOfCompanies']])


run(main())
