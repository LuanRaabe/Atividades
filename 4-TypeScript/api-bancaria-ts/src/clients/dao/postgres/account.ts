import { PostgresDB } from '.';
import { Account } from '../../../models';

class AccountsTable extends PostgresDB {
    public async insert(account: Account): Promise<any> {
        console.log('add new account', account);
        try {
            await this.client.connect();

            const insertAccountQuery = `
                INSERT INTO public.accounts (
                    id,
                    agency_number,
                    agency_verification_code,
                    account_number,
                    account_verification_code,
                    balance,
                    user_id
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

            const result = await this.client.query(insertAccountQuery, [
                account.id,
                account.agency_number,
                account.agency_verification_code,
                account.account_number,
                account.account_verification_code,
                account.balance,
                account.user_id,
            ]);

            console.log('result', result.rows);

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

    public async get(account: Account): Promise<any> {
        try {
            await this.client.connect();

            const getAccountQuery = `
            SELECT
                *
            FROM public.accounts
            WHERE
                agency_number = $1 AND
                agency_verification_code = $2 AND
                account_number = $3 AND
                account_verification_code = $4
            `;

            const result = await this.client.query(getAccountQuery, [
                account.agency_number,
                account.agency_verification_code,
                account.account_number,
                account.account_verification_code,
            ]);

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
}

export { AccountsTable };
