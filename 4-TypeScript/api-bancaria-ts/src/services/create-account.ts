import { APIResponse, Account } from '../models';
import { ExceptionTreatment } from '../utils';
import { AccountDataValidator } from '../validators';
import { AccountsTable } from '../clients/dao/postgres/accountts';
import { v4 } from 'uuid';

class CreateAccountService {
    private accountDataValidator = AccountDataValidator;
    private accountsTable = AccountsTable;

    public async execute(account: Account): Promise<APIResponse> {
        try {
            const validAccountData = new this.accountDataValidator(account);

            if (validAccountData.errors) {
                throw new Error(`400: ${validAccountData.errors}`);
            }

            validAccountData.account.id = v4();

            const insertedAccount = await new this.accountsTable().insert(
                validAccountData.account as Account,
            );

            if (insertedAccount) {
                return {
                    data: validAccountData.account,
                    messages: [],
                } as APIResponse;
            }

            return {
                data: {},
                messages: ['an error occurred while creating account'],
            } as APIResponse;
        } catch (error) {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while inserting account on database',
            );
        }
    }
}

export { CreateAccountService };
