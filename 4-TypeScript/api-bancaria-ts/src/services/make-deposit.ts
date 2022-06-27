import { APIResponse, MakeDeposit } from '../models';
import { ExceptionTreatment } from '../utils';
import { AccountDataValidator } from '../validators';
import { UpdateBalance } from '../clients/dao/postgres/updateBalance';
import { AccountsTable } from '../clients/dao/postgres/accountts';
import { TransactionsTable } from '../clients/dao/postgres/transactionsts';
import { v4 } from 'uuid';

class MakeDepositService {
    private accountDataValidator = AccountDataValidator;
    private accountsTable = AccountsTable;
    private transactionsTable = TransactionsTable;
    private updateBalance = UpdateBalance;

    public async execute(deposit: MakeDeposit): Promise<APIResponse> {
        try {
            const validAccountData = new this.accountDataValidator(
                deposit.account,
            );

            if (validAccountData.errors) {
                throw new Error(`400: ${validAccountData.errors}`);
            }

            const account = await new this.accountsTable().get(deposit.account);
            const updated = await new this.updateBalance().update(
                account,
                deposit.value,
            );

            const validDeposit: MakeDeposit = {
                id: v4(),
                account: account,
                value: deposit.value,
                type: 'deposit',
                date: String(Math.round(new Date().getTime() / 1000)),
            };

            const insertedTransaction =
                await new this.transactionsTable().makeDeposit(
                    validDeposit as MakeDeposit,
                );

            if (insertedTransaction) {
                return {
                    data: { validDeposit: validDeposit, updated: updated },
                    messages: [],
                } as APIResponse;
            }

            return {
                data: {},
                messages: ['an error occurred while making deposit'],
            } as APIResponse;
        } catch (error) {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while making deposit',
            );
        }
    }
}

export { MakeDepositService };
