import { PostgresDB } from '.';
import { MakeDeposit, MakeTransfer, MakeDraft } from '../../../models';

class TransactionsTable extends PostgresDB {
    public async makeDeposit(
        deposit: MakeDeposit,
        fee: string,
    ): Promise<MakeDeposit | false> {
        try {
            console.log('deposit table', deposit);
            await this.client.connect();

            const insertDepositQuery = `
                INSERT INTO public.transactions (
                    id,
                    date,
                    value,
                    type,
                    origin_account_id,
                    destination_account_id,
                    fee
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    $7
                ) RETURNING *
            `;

            const result = await this.client.query(insertDepositQuery, [
                deposit.id,
                new Date(deposit.date),
                deposit.value,
                deposit.type,
                deposit.account.id,
                deposit.account.id,
                fee,
            ]);

            console.log('result', result.rows);

            this.client.end();

            if (result.rows.length !== 0) {
                return result.rows[0];
            }

            return false;
        } catch (error) {
            this.client.end();
            throw new Error('503: service temporarily unavailable');
        }
    }

    public async makeDraft(
        draft: MakeDraft,
        fee: string,
    ): Promise<MakeDraft | false> {
        try {
            console.log('draft table', draft);

            await this.client.connect();

            const insertDraftQuery = `
            INSERT INTO public.transactions (
                id,
                date,
                value,
                type,
                origin_account_id,
                destination_account_id,
                fee
            ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7
            ) RETURNING *
        `;

            const result = await this.client.query(insertDraftQuery, [
                draft.id,
                new Date(draft.date),
                draft.value,
                draft.type,
                draft.account.id,
                draft.account.id,
                fee,
            ]);

            this.client.end();

            console.log('result', result.rows);

            if (result.rows.length !== 0) {
                return result.rows[0];
            }

            return false;
        } catch (error) {
            this.client.end();
            throw new Error('503: service temporarily unavailable');
        }
    }

    public async makeTransfer(
        transfer: MakeTransfer,
        fee: string,
    ): Promise<MakeTransfer | false> {
        try {
            console.log('transfer table', transfer);
            await this.client.connect();

            const insertDepositQuery = `
                INSERT INTO public.transactions (
                    id,
                    date,
                    value,
                    type,
                    origin_account_id,
                    destination_account_id,
                    fee
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    $7
                ) RETURNING *
            `;

            const result = await this.client.query(insertDepositQuery, [
                transfer.id,
                new Date(transfer.date),
                transfer.value,
                transfer.type,
                transfer.originAccount.id,
                transfer.destinyAccount.id,
                fee,
            ]);

            this.client.end();

            console.log('result', result.rows);

            if (result.rows.length !== 0) {
                return result.rows[0];
            }

            return false;
        } catch (error) {
            this.client.end();
            throw new Error('503: service temporarily unavailable');
        }
    }

    public async get(id: string): Promise<MakeTransfer[] | false> {
        try {
            await this.client.connect();

            const getTransactionsQuery = `
            SELECT
                *
            FROM public.transactions
            WHERE
                origin_account_id = $1 OR
                destination_account_id = $1
            `;

            const result = await this.client.query(getTransactionsQuery, [id]);

            this.client.end();

            if (result.rows.length !== 0) {
                return result.rows;
            }

            return false;
        } catch (error) {
            this.client.end();
            throw new Error('503: service temporarily unavailable');
        }
    }
}

export { TransactionsTable };
