import { Client } from 'pg';
import { config } from '../../../config';

class PostgresDB {
    protected client: Client;

    public constructor() {
        this.client = new Client({
            user: config.POSTGRES.USER,
            password: String(config.POSTGRES.PASSWORD),
            host: config.POSTGRES.HOST,
            database: config.POSTGRES.DATABASE,
        });
    }
}

export { PostgresDB };
