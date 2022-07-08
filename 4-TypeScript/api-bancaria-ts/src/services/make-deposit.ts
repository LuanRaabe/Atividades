import { APIResponse, MakeDeposit } from '../models';
import { ExceptionTreatment, FeesValues } from '../utils';
import { AccountDataValidator } from '../validators';
import {
    UpdateBalance,
    AccountsTable,
    TransactionsTable,
    UsersTable,
} from '../clients/dao/postgres';
import { v4 } from 'uuid';

class MakeDepositService {
    private accountDataValidator = AccountDataValidator;
    private feesValues = FeesValues;
    private accountsTable = AccountsTable;
    private transactionsTable = TransactionsTable;
    private usersTable = UsersTable;
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

            const user = await new this.usersTable().get(deposit.cpf);

            console.log('user', user);

            if (!user) {
                return {
                    data: {},
                    messages: ['user dosent exist'],
                } as APIResponse;
            }

            if (user.id !== account.user_id) {
                return {
                    data: {},
                    messages: ['cpf dosent correspond to account'],
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
                cpf: user.cpf,
                value: deposit.value.toString(),
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
                        deposit: {
                            id: validDeposit.id,
                            value: validDeposit.value,
                            type: validDeposit.type,
                            date: validDeposit.date,
                            account: {
                                agency_number: account.agency_number,
                                agency_verification_code:
                                    account.agency_verification_code,
                                account_number: account.account_number,
                                account_verification_code:
                                    account.account_verification_code,
                                balance: account.balance.toString(),
                            },
                        },
                        updatedBalance: updated.balance,
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
