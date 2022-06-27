import { APIResponse, MakeDraft } from '../models';
import { ExceptionTreatment } from '../utils';
import { AccountDataValidator } from '../validators';
import { UpdateBalance } from '../clients/dao/postgres/updateBalance';
import { AccountsTable } from '../clients/dao/postgres/accountts';
import { TransactionsTable } from '../clients/dao/postgres/transactionsts';
import { v4 } from 'uuid';

class MakeDraftService {
    private accountDataValidator = AccountDataValidator;
    private accountsTable = AccountsTable;
    private transactionsTable = TransactionsTable;
    private updateBalance = UpdateBalance;

    public async execute(draft: MakeDraft): Promise<APIResponse> {
        try {
            const validAccountData = new this.accountDataValidator(
                draft.account,
            );

            if (validAccountData.errors) {
                throw new Error(`400: ${validAccountData.errors}`);
            }

            const account = await new this.accountsTable().get(draft.account);
            const updated = await new this.updateBalance().update(
                account,
                draft.value,
            );

            const validDraft: MakeDraft = {
                id: v4(),
                account: account,
                value: draft.value,
                type: 'draft',
                date: String(Math.round(new Date().getTime() / 1000)),
            };

            const insertedTransaction =
                await new this.transactionsTable().makeDeposit(
                    validDraft as MakeDraft,
                );

            if (insertedTransaction) {
                return {
                    data: { validDeposit: validDraft, updated: updated },
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
