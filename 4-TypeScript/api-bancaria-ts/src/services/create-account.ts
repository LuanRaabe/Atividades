import { CreateUserService } from '.';
import { APIResponse, Account, User } from '../models';
import { ExceptionTreatment } from '../utils';
import { AccountDataValidator } from '../validators';
import { AccountsTable } from '../clients/dao/postgres/account';
import { GenerateAccountData } from '../utils/generate-account-data';
import { v4 } from 'uuid';
class CreateAccountService {
    private accountDataValidator = AccountDataValidator;
    private createUserService = CreateUserService;
    private accountsTable = AccountsTable;
    private generateAccountData = GenerateAccountData;

    public async execute(user: User): Promise<APIResponse> {
        try {
            const newUser = await new this.createUserService().execute(user);
            console.log('can create', newUser);
            let newAccount = await new this.generateAccountData().execute(
                newUser.data.id,
            );

            console.log('newAccount', newAccount);

            const validAccountData = new this.accountDataValidator(newAccount);

            if (validAccountData.errors) {
                throw new Error(`400: ${validAccountData.errors}`);
            }

            let existAccount = await new this.accountsTable().get(newAccount);
            while (existAccount) {
                newAccount = await new this.generateAccountData().execute(
                    newUser.data.id,
                );
                existAccount = await new this.accountsTable().get(newAccount);
            }

            newAccount.id = v4();

            const insertedAccount = await new this.accountsTable().insert(
                newAccount as Account,
            );
            console.log('insertedAccount', insertedAccount);
            if (insertedAccount) {
                return {
                    data: insertedAccount,
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
