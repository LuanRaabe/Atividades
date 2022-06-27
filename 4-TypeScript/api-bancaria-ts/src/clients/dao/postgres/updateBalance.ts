import { PostgresDB } from '.';
import { Account } from '../../../models';

class UpdateBalance extends PostgresDB {
    public async update(account: Account, value: string): Promise<boolean> {
        try {
            await this.client.connect();

            const updateBalanceQuery = `
                    UPDATE accounts
                    SET balance = balance + $1
                    WHERE user_id = $2
                    RETURNING id
                `;

            const result = await this.client.query(updateBalanceQuery, [
                account.balance,
                account.id,
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

export { UpdateBalance };
