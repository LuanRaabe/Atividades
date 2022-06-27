import { APIResponse, Account } from '../models';
import { ExceptionTreatment } from '../utils';
import { AccountDataValidator } from '../validators';
import { AccountsTable } from '../clients/dao/postgres/accountts';

class GetExtractService {
    private accountDataValidator = AccountDataValidator;
    private accountsTable = AccountsTable;

    public async execute(account: Account): Promise<APIResponse> {
        try {
            const validAccountData = new this.accountDataValidator(account);

            if (validAccountData.errors) {
                throw new Error(`400: ${validAccountData.errors}`);
            }

            const accountExtract = await new this.accountsTable().get(
                validAccountData.account as Account,
            );

            if (accountExtract) {
                return {
                    data: accountExtract,
                    messages: [],
                } as APIResponse;
            }

            return {
                data: {},
                messages: [
                    'an error occurred while getting extract from the user',
                ],
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
