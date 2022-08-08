const { Client } = require("pg");
const CONNECT = {
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "123456",
  port: 5432,
};

async function PGloginAccount(username, password) {
  const PGclient = new Client(CONNECT);
  await PGclient.connect();
  try {
    const result = await PGclient.query(
      `SELECT * FROM "public.session" WHERE username = $1`,
      [username]
    );
    await PGclient.end();
    if (result.rows[0].password === password)
      return { message: "logged account", data: result.rows[0] };
    return { message: "wrong password", data: {} };
  } catch (e) {
    await PGclient.end();
    return { message: "error", data: {} };
  }
}

async function PGcreateAccount(username, password) {
  const tryLogin = await PGloginAccount(username, password);
  if (tryLogin.message !== "error")
    return { message: "account already exist", data: tryLogin.data };

  const PGclient = new Client(CONNECT);
  await PGclient.connect();
  try {
    const result = await PGclient.query(
      `INSERT INTO "public.session" (username, password) VALUES ($1, $2) RETURNING *`,
      [username, password]
    );
    await PGclient.end();
    return { message: "created account", data: result.rows[0] };
  } catch (e) {
    await PGclient.end();
    return { message: "error", data: {} };
  }
}

module.exports = { PGloginAccount, PGcreateAccount };
