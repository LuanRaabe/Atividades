import { APIResponse, MakeTransfer } from '../models';
import { ExceptionTreatment } from '../utils';
import { AccountDataValidator } from '../validators';
import { UpdateBalance } from '../clients/dao/postgres/updateBalance';
import { AccountsTable } from '../clients/dao/postgres/accountts';
import { TransactionsTable } from '../clients/dao/postgres/transactionsts';
import { v4 } from 'uuid';

class MakeTransferService {
    private accountDataValidator = AccountDataValidator;
    private accountsTable = AccountsTable;
    private transactionsTable = TransactionsTable;
    private updateBalance = UpdateBalance;

    public async execute(transfer: MakeTransfer): Promise<APIResponse> {
        try {
            const validOriginAccountData = new this.accountDataValidator(
                transfer.originAccount,
            );

            const validDestinyAccountData = new this.accountDataValidator(
                transfer.destinyAccount,
            );

            if (
                validOriginAccountData.errors ||
                validDestinyAccountData.errors
            ) {
                throw new Error(`400:
                    ${validOriginAccountData.errors ?? ''}
                    ${validDestinyAccountData.errors ?? ''}`);
            }

            const originAccount = await new this.accountsTable().get(
                transfer.originAccount,
            );

            const destinyAccount = await new this.accountsTable().get(
                transfer.destinyAccount,
            );

            const updatedOriginAccount = await new this.updateBalance().update(
                originAccount,
                transfer.value,
            );

            const updatedDestinyAccount = await new this.updateBalance().update(
                destinyAccount,
                transfer.value,
            );

            const validDeposit: MakeTransfer = {
                id: v4(),
                originAccount: originAccount,
                destinyAccount: destinyAccount,
                value: transfer.value,
                type: 'transfer',
                date: String(Math.round(new Date().getTime() / 1000)),
            };

            const insertedTransaction =
                await new this.transactionsTable().makeTransfer(
                    validDeposit as MakeTransfer,
                );

            if (insertedTransaction) {
                return {
                    data: {
                        validDeposit: validDeposit,
                        updated: {
                            origin: updatedOriginAccount,
                            destiny: updatedDestinyAccount,
                        },
                    },
                    messages: [],
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
