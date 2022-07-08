import { APIResponse, MakeTransfer } from '../models';
import { ExceptionTreatment, FeesValues, Crypto } from '../utils';
import { AccountDataValidator, PasswordValidator } from '../validators';
import {
    UpdateBalance,
    AccountsTable,
    TransactionsTable,
    UsersTable,
} from '../clients/dao/postgres';
import { v4 } from 'uuid';

class MakeTransferService {
    private accountDataValidator = AccountDataValidator;
    private accountsTable = AccountsTable;
    private transactionsTable = TransactionsTable;
    private updateBalance = UpdateBalance;
    private feesValues = FeesValues;
    private crypto = Crypto;
    private passwordValidator = PasswordValidator;
    private usersTable = UsersTable;

    public async execute(transfer: MakeTransfer): Promise<APIResponse> {
        try {
            console.log('transfer', transfer);

            const validOriginAccountData = new this.accountDataValidator(
                transfer.originAccount,
            );

            const validPasswod = new this.passwordValidator(
                transfer.originAccount.password,
            );

            console.log('validPasswod', validPasswod);

            if (validPasswod.errors) {
                throw new Error(`400: ${validPasswod.errors}`);
            }

            console.log('validOriginAccountData', validOriginAccountData);

            const validDestinyAccountData = new this.accountDataValidator(
                transfer.destinyAccount,
            );

            console.log('validDestinyAccountData', validDestinyAccountData);

            if (
                validOriginAccountData.errors ||
                validDestinyAccountData.errors
            ) {
                throw new Error(`400:
                    ${validOriginAccountData.errors ?? ''}
                    ${validDestinyAccountData.errors ?? ''}`);
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

            const originUser = await new this.usersTable().get(
                transfer.originAccountCPF,
            );

            console.log('originUser', originUser);

            if (!originUser) {
                return {
                    data: {},
                    messages: ['originUser dosent exist'],
                } as APIResponse;
            }

            if (originUser.id !== existOriginAccount.user_id) {
                console.log(originUser.id, existOriginAccount.user_id);
                return {
                    data: {},
                    messages: ['cpf dosent correspond to origin account'],
                } as APIResponse;
            }

            const destinyUser = await new this.usersTable().get(
                transfer.destinyAccountCPF,
            );

            console.log('destinyUser', destinyUser);

            if (!destinyUser) {
                return {
                    data: {},
                    messages: ['destinyUser dosent exist'],
                } as APIResponse;
            }

            if (destinyUser.id !== existDestinyAccount.user_id) {
                console.log(destinyUser.id, existDestinyAccount.user_id);
                return {
                    data: {},
                    messages: ['cpf dosent correspond to destiny account'],
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
                originAccountCPF: transfer.originAccountCPF,
                destinyAccount: existDestinyAccount,
                destinyAccountCPF: transfer.destinyAccountCPF,
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
                console.log('aqui');
                return {
                    data: {
                        transfer: {
                            id: validTransfer.id,
                            value: validTransfer.value,
                            type: validTransfer.type,
                            date: validTransfer.date,
                            originAccount: {
                                cpf: validTransfer.originAccountCPF,
                                agency_number:
                                    validTransfer.originAccount.agency_number,
                                agency_verification_code:
                                    validTransfer.originAccount
                                        .agency_verification_code,
                                account_number:
                                    validTransfer.originAccount.account_number,
                                account_verification_code:
                                    validTransfer.originAccount
                                        .account_verification_code,
                                balance:
                                    validTransfer.originAccount.balance.toString(),
                            },
                            destinyAccount: {
                                cpf: validTransfer.destinyAccountCPF,
                                agency_number:
                                    validTransfer.destinyAccount.agency_number,
                                agency_verification_code:
                                    validTransfer.destinyAccount
                                        .agency_verification_code,
                                account_number:
                                    validTransfer.destinyAccount.account_number,
                                account_verification_code:
                                    validTransfer.destinyAccount
                                        .account_verification_code,
                            },
                        },
                        updatedBalance: updatedOriginAccount.balance,
                        fee: transferValue.fee,
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
