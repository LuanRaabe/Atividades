import { APIResponse, MakeTransfer } from '../models';
import { ExceptionTreatment, FeesValues, Crypto } from '../utils';
import { AccountDataValidator } from '../validators';
import { UpdateBalance } from '../clients/dao/postgres/updateBalance';
import { AccountsTable } from '../clients/dao/postgres/account';
import { TransactionsTable } from '../clients/dao/postgres/transactions';
import { v4 } from 'uuid';

class MakeTransferService {
    private accountDataValidator = AccountDataValidator;
    private accountsTable = AccountsTable;
    private transactionsTable = TransactionsTable;
    private updateBalance = UpdateBalance;
    private feesValues = FeesValues;
    private crypto = Crypto;

    public async execute(transfer: MakeTransfer): Promise<APIResponse> {
        try {
            console.log('transfer', transfer);

            const validOriginAccountData = new this.accountDataValidator(
                transfer.originAccount,
            );

            console.log('validOriginAccountData', validOriginAccountData);

            if (validOriginAccountData.errors) {
                throw new Error(`400:
                    ${validOriginAccountData.errors}`);
            }

            const existOriginAccount = await new this.accountsTable().get(
                transfer.originAccount,
            );

            console.log('existOriginAccount', existOriginAccount);

            const existDestinyAccount = await new this.accountsTable().get(
                transfer.destinyAccount,
            );

            console.log('existDestinyAccount', existDestinyAccount);

            if (!existOriginAccount || !existDestinyAccount) {
                return {
                    data: {},
                    messages: ['one of the accounts dosent exist'],
                } as APIResponse;
            }

            const checkPassowrd = await new this.crypto().compare(
                transfer.originAccount.password,
                existOriginAccount.password,
            );

            console.log('checkPassowrd', checkPassowrd);

            if (!checkPassowrd) {
                return {
                    data: {},
                    messages: ['invalid password'],
                } as APIResponse;
            }

            const transferValue = new this.feesValues().transfer(
                Number(transfer.value),
            );

            console.log('transferValue', transferValue);

            const originAccountBalance = await new this.updateBalance().get(
                existOriginAccount,
            );

            console.log('originAccountBalance', originAccountBalance);

            if (originAccountBalance <= 0) {
                throw new Error('400: Account balance is zero');
            }

            if (originAccountBalance < Number(transfer.value)) {
                throw new Error('400: Account has insuficient founds');
            }

            const destinyAccountBalance = await new this.updateBalance().get(
                existDestinyAccount,
            );

            console.log('destinyAccountBalance', destinyAccountBalance);

            const updatedOriginAccount = await new this.updateBalance().update(
                transfer.originAccount,
                originAccountBalance,
                -1 * transferValue.value,
            );

            console.log('updatedOriginAccount', updatedOriginAccount);

            const updatedDestinyAccount = await new this.updateBalance().update(
                transfer.destinyAccount,
                destinyAccountBalance,
                Number(transfer.value),
            );

            console.log('updatedDestinyAccount', updatedDestinyAccount);

            const validTransfer: MakeTransfer = {
                id: v4(),
                originAccount: existOriginAccount,
                destinyAccount: existDestinyAccount,
                value: transfer.value,
                type: 'transfer',
                date: new Date().toString(),
            };

            console.log('validTransfer', validTransfer);

            const insertedTransaction =
                await new this.transactionsTable().makeTransfer(
                    validTransfer as MakeTransfer,
                    transferValue.fee.toString(),
                );

            console.log('insertedTransaction', insertedTransaction);

            if (insertedTransaction) {
                return {
                    data: {
                        validTransfer: {
                            value: validTransfer.value,
                            fee: transferValue.fee,
                            type: validTransfer.type,
                            date: validTransfer.date,
                        },
                        updated: {
                            origin_balance: updatedOriginAccount.balance,
                            destiny_balance: updatedDestinyAccount.balance,
                        },
                    },
                    messages: ['transfer successful'],
                } as APIResponse;
            }

            return {
                data: {},
                messages: ['an error occurred while making transaction'],
            } as APIResponse;
        } catch (error) {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while making transaction',
            );
        }
    }
}

export { MakeTransferService };
