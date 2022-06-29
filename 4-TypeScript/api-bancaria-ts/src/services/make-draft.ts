import { APIResponse, MakeDraft } from '../models';
import { ExceptionTreatment, FeesValues } from '../utils';
import { AccountDataValidator } from '../validators';
import { UpdateBalance } from '../clients/dao/postgres/updateBalance';
import { AccountsTable } from '../clients/dao/postgres/account';
import { TransactionsTable } from '../clients/dao/postgres/transactions';
import { v4 } from 'uuid';

class MakeDraftService {
    private accountDataValidator = AccountDataValidator;
    private feesValues = FeesValues;
    private accountsTable = AccountsTable;
    private transactionsTable = TransactionsTable;
    private updateBalance = UpdateBalance;

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

            const balance = await new this.updateBalance().get(account);

            console.log('balance', balance);

            const draftValue = new this.feesValues().draft(Number(draft.value));

            console.log('draftValue', draftValue);

            const updated = await new this.updateBalance().update(
                account,
                balance,
                -1 * draftValue.value,
            );

            console.log('updated', updated);

            const validDraft: MakeDraft = {
                id: v4(),
                account: account,
                value: draftValue.value.toString(),
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
                        validDeposit: validDraft.account.account_number,
                        updated: updated.balance,
                        fee: draftValue.fee,
                    },
                    messages: [],
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
