const express = require("express");
const app = express();

const Redis = require("ioredis");
const RDclient = new Redis();

const { Client } = require("pg");
const CONNECT = {
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "123456",
  port: 5432,
};

RDclient.on("error", (err) => {
  console.log(err);
});

app.get("/create", async (req, res) => {
  const PGclient = new Client(CONNECT);
  await PGclient.connect();
  try {
    for (let i = 0; i < 10000; i++) {
      await PGclient.query(
        `INSERT INTO "public.numeros" (numero) VALUES ($1) RETURNING *`,
        [i]
      );
    }
    await PGclient.end();
    res.send("sucesso");
  } catch (e) {
    res.send("erro");
  }
});

app.get("/getAll", async (req, res) => {
  console.time("getAll");
  const starTime = new Date().getTime();
  const PGclient = new Client(CONNECT);
  await PGclient.connect();
  let resp = [];
  try {
    for (let i = 0; i < 10000; i++) {
      const result = await PGclient.query(
        `SELECT * FROM "public.numeros" WHERE numero = $1`,
        [i]
      );
      resp.push(JSON.parse(result.rows[0].numero));
    }
    await PGclient.end();
    const endTime = new Date().getTime();
    res.json({ time: endTime - starTime, array: resp });
  } catch (e) {
    res.send("erro");
  }
  console.timeEnd("getAll");
});

app.get("/getAllWithRedis", async (req, res) => {
  console.time("getAllWithRedis");
  const starTime = new Date().getTime();
  const PGclient = new Client(CONNECT);
  await PGclient.connect();
  let resp = [];
  try {
    for (let i = 0; i < 10000; i++) {
      const client = await RDclient.get(`pgkey${i}`);
      if (!client) {
        const result = await PGclient.query(
          `SELECT * FROM "public.numeros" WHERE numero = $1`,
          [i]
        );
        resp.push(JSON.parse(result.rows[0].numero));
        await RDclient.set(`pgkey${i}`, JSON.parse(result.rows[0].numero));
      } else {
        resp.push(JSON.parse(client));
      }
    }
    await PGclient.end();
    const endTime = new Date().getTime();
    res.json({ time: endTime - starTime, array: resp });
  } catch (e) {
    res.send("erro");
  }
  console.timeEnd("getAllWithRedis");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Node server started");
});
