import { APIResponse, MakeDraft } from '../models';
import { ExceptionTreatment, FeesValues, Crypto } from '../utils';
import { AccountDataValidator, PasswordValidator } from '../validators';
import {
    UpdateBalance,
    AccountsTable,
    TransactionsTable,
    UsersTable,
} from '../clients/dao/postgres';
import { v4 } from 'uuid';

class MakeDraftService {
    private accountDataValidator = AccountDataValidator;
    private feesValues = FeesValues;
    private accountsTable = AccountsTable;
    private transactionsTable = TransactionsTable;
    private updateBalance = UpdateBalance;
    private crypto = Crypto;
    private usersTable = UsersTable;
    private passwordValidator = PasswordValidator;

    public async execute(draft: MakeDraft): Promise<APIResponse> {
        try {
            console.log('draft', draft);

            const validAccountData = new this.accountDataValidator(
                draft.account,
            );

            console.log('validAccountData', validAccountData);

            if (validAccountData.errors) {
                throw new Error(`400: ${validAccountData.errors}`);
            }

            const account = await new this.accountsTable().get(draft.account);

            console.log('account', account);

            if (!account) {
                return {
                    data: {},
                    messages: ['account dosent exist'],
                } as APIResponse;
            }

            const user = await new this.usersTable().get(draft.cpf);

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

            const validPasswod = new this.passwordValidator(
                draft.account.password,
            );

            console.log('validPasswod', validPasswod);

            if (validPasswod.errors) {
                throw new Error(`400: ${validPasswod.errors}`);
            }

            const checkPassowrd = await new this.crypto().compare(
                draft.account.password,
                account.password,
            );

            console.log('checkPassowrd', checkPassowrd);

            if (!checkPassowrd) {
                return {
                    data: {},
                    messages: ['invalid password'],
                } as APIResponse;
            }

            const balance = await new this.updateBalance().get(account);

            console.log('balance', balance);

            if (balance <= 0) {
                throw new Error('400: Account balance is zero');
            }

            const draftValue = new this.feesValues().draft(Number(draft.value));

            if (balance < Number(draftValue.value)) {
                throw new Error('400: Account has insuficient founds');
            }

            console.log('draftValue', draftValue);

            const updated = await new this.updateBalance().update(
                account,
                balance,
                -1 * draftValue.value,
            );

            console.log('updated', updated);

            if (!updated) {
                throw new Error('400: Cannot update balance');
            }

            const validDraft: MakeDraft = {
                id: v4(),
                account: account,
                cpf: draft.cpf,
                value: draft.value.toString(),
                type: 'draft',
                date: new Date().toString(),
            };

            console.log('validDraft', validDraft);

            const insertedTransaction =
                await new this.transactionsTable().makeDraft(
                    validDraft as MakeDraft,
                    draftValue.fee.toString(),
                );

            console.log('insertedTransaction', insertedTransaction);

            if (insertedTransaction) {
                return {
                    data: {
                        draft: {
                            id: validDraft.id,
                            value: validDraft.value,
                            type: validDraft.type,
                            date: validDraft.date,
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
                        fee: draftValue.fee,
                    },
                    messages: ['draft made successfully'],
                } as APIResponse;
            }

            return {
                data: {},
                messages: ['an error occurred while making draft'],
            } as APIResponse;
        } catch (error) {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while making draft',
            );
        }
    }
}

export { MakeDraftService };
