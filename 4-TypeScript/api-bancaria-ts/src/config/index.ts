import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT || 8000,
    POSTGRES: {
        USER: process.env.PGUSER,
        HOST: process.env.PGHOST,
        DATABASE: process.env.PGDATABASE,
        PASSWORD: process.env.PGPASSWORD,
    },
};

export { config };
