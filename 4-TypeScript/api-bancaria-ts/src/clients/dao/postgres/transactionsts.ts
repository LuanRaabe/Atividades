import { PostgresDB } from '.';
import { MakeDeposit, MakeTransfer, MakeDraft } from '../../../models';

class TransactionsTable extends PostgresDB {
    public async makeDeposit(deposit: MakeDeposit): Promise<boolean> {
        try {
            await this.client.connect();

            const insertDepositQuery = `
                INSERT INTO transactions (
                    id,
                    date,
                    value,
                    type,
                    origin_account_id,
                    destiny_account_id
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
                ) RETURNING date
            `;

            const result = await this.client.query(insertDepositQuery, [
                deposit.id,
                deposit.date,
                deposit.value,
                deposit.type,
                deposit.account,
                deposit.account,
            ]);

            this.client.end();

            if (result.rows.length !== 0) {
                return true;
            }

            return false;
        } catch (error) {
            this.client.end();
            throw new Error('503: service temporarily unavailable');
        }
    }

    public async makeTransfer(transfer: MakeTransfer): Promise<boolean> {
        try {
            await this.client.connect();

            const insertDepositQuery = `
                INSERT INTO transactions (
                    id,
                    date,
                    value,
                    type,
                    origin_account_id,
                    destiny_account_id
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
                ) RETURNING date
            `;

            const result = await this.client.query(insertDepositQuery, [
                transfer.id,
                transfer.date,
                transfer.value,
                transfer.type,
                transfer.originAccount.id,
                transfer.destinyAccount.id,
            ]);

            this.client.end();

            if (result.rows.length !== 0) {
                return true;
            }

            return false;
        } catch (error) {
            this.client.end();
            throw new Error('503: service temporarily unavailable');
        }
    }

    public async makeDraft(draft: MakeDraft): Promise<boolean> {
        try {
            await this.client.connect();

            const insertDraftQuery = `
                INSERT INTO users (
                    id,
                    date,
                    value,
                    type,
                    origin_account_id,
                    destiny_account_id
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
                ) RETURNING date
            `;

            const result = await this.client.query(insertDraftQuery, [
                draft.id,
                draft.date,
                draft.value,
                draft.type,
                draft.account,
                draft.account,
            ]);

            this.client.end();

            if (result.rows.length !== 0) {
                return true;
            }

            return false;
        } catch (error) {
            this.client.end();
            throw new Error('503: service temporarily unavailable');
        }
    }
}

export { TransactionsTable };
