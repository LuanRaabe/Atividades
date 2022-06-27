import { PostgresDB } from '.';
import { Account } from '../../../models';

class AccountsTable extends PostgresDB {
    public async insert(account: Account): Promise<boolean> {
        try {
            await this.client.connect();

            const insertAccountQuery = `
                INSERT INTO accounts (
                    user_id,
                    agency_number,
                    agency_verification_code,
                    account_number,
                    account_verification_code,
                    balance
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
                ) RETURNING id
            `;

            const result = await this.client.query(insertAccountQuery, [
                account.id,
                account.branch,
                account.branchVerificationNumber,
                account.accountNumber,
                account.accountVerificationNumber,
                account.balance,
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

    public async get(account: Account): Promise<any> {
        try {
            await this.client.connect();

            const getAccountQuery = `
            SELECT
                agency_number,
                agency_verification_code,
                account_number,
                account_verification_code
            FROM public.accounts
            WHERE
                agency_number = $1 AND
                agency_verification_code = $2 AND
                account_number = $3 AND
                account_verification_code = $4
            `;

            const result = await this.client.query(getAccountQuery, [
                account.branch,
                account.branchVerificationNumber,
                account.accountNumber,
                account.accountVerificationNumber,
            ]);

            this.client.end();

            if (result.rows.length !== 0) {
                return result;
            }

            return false;
        } catch (error) {
            this.client.end();
            throw new Error('503: service temporarily unavailable');
        }
    }
}

export { AccountsTable };
