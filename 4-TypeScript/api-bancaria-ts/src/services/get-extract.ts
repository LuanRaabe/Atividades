import { APIResponse, Account } from '../models';
import { ExceptionTreatment } from '../utils';
import { AccountDataValidator } from '../validators';
import { AccountsTable } from '../clients/dao/postgres/account';
import { TransactionsTable } from '../clients/dao/postgres/transactions';
class GetExtractService {
    private accountDataValidator = AccountDataValidator;
    private accountsTable = AccountsTable;
    private transactionsTable = TransactionsTable;

    public async execute(account: Account): Promise<APIResponse> {
        try {
            console.log('account', account);
            const validAccountData = new this.accountDataValidator(account);
            console.log('validAccountData', validAccountData);
            if (validAccountData.errors) {
                throw new Error(`400: ${validAccountData.errors}`);
            }

            const accountExtract = await new this.accountsTable().get(
                validAccountData.account as Account,
            );

            console.log('accountExtract', accountExtract);

            const extract = await new this.transactionsTable().get(
                accountExtract.id,
            );

            console.log('extract', extract);

            if (extract) {
                return {
                    data: extract.map((data: any) => ({
                        date: data.date,
                        value: data.value,
                        type: data.type,
                        fee: data.fee,
                    })),
                    messages: [],
                } as APIResponse;
            }

            return {
                data: {},
                messages: ['there is no transaction for this user'],
            } as APIResponse;
        } catch (error) {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while getting extract from the user',
            );
        }
    }
}

export { GetExtractService };
