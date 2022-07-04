import { APIResponse, MakeDeposit } from '../models';
import { ExceptionTreatment, FeesValues } from '../utils';
import { AccountDataValidator } from '../validators';
import { UpdateBalance } from '../clients/dao/postgres/updateBalance';
import { AccountsTable } from '../clients/dao/postgres/account';
import { TransactionsTable } from '../clients/dao/postgres/transactions';
import { v4 } from 'uuid';

class MakeDepositService {
    private accountDataValidator = AccountDataValidator;
    private feesValues = FeesValues;
    private accountsTable = AccountsTable;
    private transactionsTable = TransactionsTable;
    private updateBalance = UpdateBalance;

    public async execute(deposit: MakeDeposit): Promise<APIResponse> {
        try {
            console.log('deposit', deposit);
            const validAccountData = new this.accountDataValidator(
                deposit.account,
            );

            console.log('validAccountData', validAccountData);

            if (validAccountData.errors) {
                throw new Error(`400: ${validAccountData.errors}`);
            }

            const account = await new this.accountsTable().get(deposit.account);

            console.log('account', account);

            if (!account) {
                return {
                    data: {},
                    messages: ['account dosent exist'],
                } as APIResponse;
            }

            const depositValue = new this.feesValues().deposit(
                Number(deposit.value),
            );

            console.log('depositValue', depositValue);

            const balance = await new this.updateBalance().get(account);

            console.log('balance', balance);

            const updated = await new this.updateBalance().update(
                account,
                balance,
                depositValue.value,
            );

            console.log('updated', updated);

            const validDeposit: MakeDeposit = {
                id: v4(),
                account: account,
                value: depositValue.value.toString(),
                type: 'deposit',
                date: new Date().toString(),
            };

            console.log('validDeposit', validDeposit);

            const insertedTransaction =
                await new this.transactionsTable().makeDeposit(
                    validDeposit as MakeDeposit,
                    depositValue.fee.toString(),
                );

            console.log('insertedTransaction', insertedTransaction);

            if (insertedTransaction) {
                return {
                    data: {
                        validDeposit: validDeposit.account.account_number,
                        updated: updated.balance,
                        fee: depositValue.fee,
                    },
                    messages: ['deposit made successfully'],
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
