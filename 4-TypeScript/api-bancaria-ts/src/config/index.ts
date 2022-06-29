import { processs } from '../../env';
import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: processs.env.PORT || 8000,
    POSTGRES: {
        USER: processs.env.PGUSER,
        HOST: processs.env.PGHOST,
        DATABASE: processs.env.PGDATABASE,
        PASSWORD: processs.env.PGPASSWORD,
    },
};

export { config };
