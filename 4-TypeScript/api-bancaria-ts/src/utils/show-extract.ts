class ShowExtract {
    public execute(accountId: string, extractData: any): any {
        console.log('extractData', extractData);
        console.log('accountId', accountId);
        return extractData.map((item: any) => ({
            date: item.date,
            value: item.value,
            type: item.type,
            fee: item.origin_account_id === accountId ? item.fee : undefined,
        }));
    }
}

export { ShowExtract };
