from asyncio import gather, run

from tsetmc.indices import Index, last_state


async def number_of_companies(code):
    companies = (await Index(code).companies())['indexCompany']
    return len(companies)


async def main():
    df = await last_state()
    companies = await gather(
        *[Index(code).companies() for code in df['insCode']]
    )

    no = [len(co['indexCompany']) for co in companies]
    df['NoOfCompanies'] = no
    df.sort_values('NoOfCompanies', inplace=True, ascending=False)
    print(df[['lVal30', 'NoOfCompanies']])


run(main())
