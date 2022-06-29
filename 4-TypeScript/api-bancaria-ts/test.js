const { Client } = require('pg');

async function conect() {
    const client = new Client({
        user: 'postgres',
        password: '123456',
        host: 'localhost',
        database: 'banking',
    });
    await client.connect();
    const res = await client.query('SELECT * FROM public.accounts');
    console.log(res.rows); // Hello world!
    await client.end();
}
conect();
