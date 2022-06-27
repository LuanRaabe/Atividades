import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT || 8000,
    POSTGRES: {
        CONNECTION_STRING: process.env.DBPG_STRING,
    },
};

export { config };
