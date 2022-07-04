import { APIResponse, Account, Section } from '../models';
import { ExceptionTreatment, Crypto } from '../utils';
import { AccountDataValidator } from '../validators';
import { AccountsTable } from '../clients/dao/postgres/account';
import { SectionService } from '.';

class LoginService {
    private accountDataValidator = AccountDataValidator;
    private accountsTable = AccountsTable;
    private section = SectionService;
    private crypto = Crypto;

    public async login(section: Section): Promise<APIResponse> {
        try {
            console.log('section', section);

            const validAccountData = new this.accountDataValidator(
                section.account,
            );

            console.log('validAccountData', validAccountData);

            if (validAccountData.errors) {
                throw new Error(`400: ${validAccountData.errors}`);
            }

            const existAccount = await new this.accountsTable().get(
                validAccountData.account as Account,
            );

            console.log('existAccount', existAccount);

            if (!existAccount) {
                return {
                    data: {},
                    messages: ['account dosent exist'],
                } as APIResponse;
            }

            if (
                await new this.crypto().compare(
                    section.account.password,
                    existAccount.password,
                )
            ) {
                console.log('correct password');
                const resp = await new this.section().create(section);
                return {
                    data: resp.data,
                    messages: ['login successfull'],
                } as APIResponse;
            }

            return {
                data: {},
                messages: ['error while tryng to make login'],
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

export { LoginService };
