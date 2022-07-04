import { PostgresDB } from '.';
import { User } from '../../../models';

class UsersTable extends PostgresDB {
    public async insert(user: User): Promise<User> {
        try {
            await this.client.connect();
            console.log('connected');
            console.log('add new user', user);

            const insertUserQuery = `
                INSERT INTO public.users (
                    id,
                    name,
                    email,
                    birthdate,
                    document
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5
                ) RETURNING *
            `;

            const result = await this.client.query(insertUserQuery, [
                user.id,
                user.name,
                user.email,
                new Date(user.birthdate),
                user.cpf,
            ]);

            console.log('result', result.rows);

            this.client.end();

            return result.rows[0];
        } catch (error) {
            this.client.end();
            throw new Error('503: service temporarily unavailable');
        }
    }

    public async get(user: User): Promise<User | false> {
        try {
            await this.client.connect();
            console.log('connected');
            const getAccountQuery = `
            SELECT
                *
            FROM public.users
            WHERE
                document = $1
            `;

            const result = await this.client.query(getAccountQuery, [user.cpf]);

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
}

export { UsersTable };
