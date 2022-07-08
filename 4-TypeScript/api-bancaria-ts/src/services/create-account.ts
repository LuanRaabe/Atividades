import { CreateUserService } from '.';
import { APIResponse, Account, User } from '../models';
import { ExceptionTreatment, Crypto } from '../utils';
import { AccountDataValidator, PasswordValidator } from '../validators';
import { AccountsTable } from '../clients/dao/postgres';
import { GenerateAccountData } from '../utils/generate-account-data';
import { v4 } from 'uuid';
class CreateAccountService {
    private accountDataValidator = AccountDataValidator;
    private createUserService = CreateUserService;
    private accountsTable = AccountsTable;
    private generateAccountData = GenerateAccountData;
    private crypto = Crypto;
    private passwordValidator = PasswordValidator;

    public async execute(user: User & Account): Promise<APIResponse> {
        try {
            console.log('user', user);
            const newUser = await new this.createUserService().execute(user);

            console.log('can create', newUser);

            let newAccount = await new this.generateAccountData().execute(
                newUser.id,
            );

            const validPasswod = new this.passwordValidator(user.password);

            console.log('validPasswod', validPasswod);

            if (validPasswod.errors) {
                throw new Error(`400: ${validPasswod.errors}`);
            }

            newAccount.password = user.password;

            console.log('newAccount', newAccount);

            const validAccountData = new this.accountDataValidator(newAccount);

            if (validAccountData.errors) {
                throw new Error(`400: ${validAccountData.errors}`);
            }

            let existAccount = await new this.accountsTable().get(newAccount);

            while (existAccount) {
                newAccount = await new this.generateAccountData().execute(
                    newUser.id,
                );
                existAccount = await new this.accountsTable().get(newAccount);
            }

            newAccount.id = v4();
            newAccount.password = await new this.crypto().cryptograf(
                newAccount.password,
            );

            const insertedAccount = await new this.accountsTable().insert(
                newAccount as Account,
            );

            console.log('insertedAccount', insertedAccount);

            if (insertedAccount) {
                return {
                    data: {
                        user: {
                            name: user.name,
                            email: user.email,
                            birthdate: user.birthdate,
                            cpf: user.cpf,
                        },
                        account: insertedAccount,
                    },
                    messages: ['account created successfully'],
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
