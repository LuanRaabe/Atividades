import { PostgresDB } from '.';
import { Account } from '../../../models';

class UpdateBalance extends PostgresDB {
    public async update(
        account: Account,
        balance: number,
        value: number,
    ): Promise<any> {
        console.log('update balance', account, balance, value);
        try {
            await this.client.connect();

            const updateBalanceQuery = `
                    UPDATE public.accounts
                    SET balance = $1
                    WHERE
                        account_number = $2 AND
                        account_verification_code = $3 AND
                        agency_number = $4 AND
                        agency_verification_code = $5
                    RETURNING *
                `;

            const result = await this.client.query(updateBalanceQuery, [
                balance + value,
                account.account_number,
                account.account_verification_code,
                account.agency_number,
                account.agency_verification_code,
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

    public async get(account: Account): Promise<any> {
        try {
            await this.client.connect();

            const getBalanceQuery = `
                    SELECT balance
                    FROM public.accounts
                    WHERE id = $1
                `;

            const result = await this.client.query(getBalanceQuery, [
                account.id,
            ]);

            this.client.end();

            if (result.rows.length !== 0) {
                return Number(result.rows[0].balance);
            }

            return false;
        } catch (error) {
            this.client.end();
            throw new Error('503: service temporarily unavailable');
        }
    }
}

export { UpdateBalance };
