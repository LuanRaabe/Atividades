import { APIResponse, Account, GetExtract } from '../models';
import { ExceptionTreatment, ShowExtract } from '../utils';
import { AccountDataValidator } from '../validators';
import {
    AccountsTable,
    TransactionsTable,
    UsersTable,
} from '../clients/dao/postgres';
class GetExtractService {
    private accountDataValidator = AccountDataValidator;
    private accountsTable = AccountsTable;
    private transactionsTable = TransactionsTable;
    private usersTable = UsersTable;
    private showExtract = ShowExtract;

    public async execute(extract: GetExtract): Promise<APIResponse> {
        try {
            console.log('extract', extract);
            const validAccountData = new this.accountDataValidator(
                extract.account,
            );
            console.log('validAccountData', validAccountData);
            if (validAccountData.errors) {
                throw new Error(`400: ${validAccountData.errors}`);
            }

            const account = await new this.accountsTable().get(
                validAccountData.account as Account,
            );

            console.log('account', account);

            if (!account) {
                return {
                    data: {},
                    messages: ['account dosent exist'],
                } as APIResponse;
            }

            const user = await new this.usersTable().get(extract.cpf);

            console.log('user', user);

            if (!user) {
                return {
                    data: {},
                    messages: ['user dosent exist'],
                } as APIResponse;
            }

            if (user.id !== account.user_id) {
                console.log(user.id, account.user_id);
                return {
                    data: {},
                    messages: ['cpf dosent correspond to account'],
                } as APIResponse;
            }

            const actualExtract = await new this.transactionsTable().get(
                account.id,
            );

            console.log('extract', extract);

            if (actualExtract) {
                return {
                    data: {
                        accountId: account.id,
                        extract: new this.showExtract().execute(
                            account.id,
                            actualExtract,
                        ),
                    },
                    messages: [`You have ${actualExtract.length} transactions`],
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
