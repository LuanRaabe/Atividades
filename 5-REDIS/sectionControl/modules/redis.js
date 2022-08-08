const Redis = require("ioredis");
const RDclient = new Redis();

RDclient.on("error", (err) => {
  console.log(err);
});

async function RDset(key, value, time) {
  try {
    await RDclient.set(key, value, "EX", time);
  } catch (e) {
    console.log(e);
  }
}

async function RDget(key) {
  try {
    const result = await RDclient.get(key);
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function RDdel(key) {
  try {
    const result = await RDclient.del(key);
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function RDgetTtl(key) {
  try {
    const result = await RDclient.ttl(key);
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function RDisLogged(username, password) {
  try {
    const result = await RDget(`login-${username}-${password}`);
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function RDlogin(username, password) {
  try {
    let result = await RDget(`login-${username}-${password}`);
    if (!result)
      result = await RDset(`login-${username}-${password}`, `logged`, 3600);
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function RDlogout(username, password) {
  try {
    const result = await RDdel(`login-${username}-${password}`);
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function RDfailLogin(username, password) {
  try {
    let number = 0;
    const numFails = await RDget(`fail-${username}-${password}`);
    number = (numFails ? parseInt(numFails) : number) + 1;
    if (numFails === 3) {
      let awaitTime = await RDgetAwait(username, password);
      if (awaitTime) return awaitTime;

      awaitTime = await RDset(`await-${username}-${password}`, `awaiting`, 30);
      return awaitTime;
    }
    const result = await RDset(`fail-${username}-${password}`, number, 15);
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function RDgetAwait(username, password) {
  try {
    const result = await RDgetTtl(`await-${username}-${password}`);
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function RDaddToCart(username, password, product, number) {
  try {
    const data = await RDgetCart(req, res, "products").split("--");
    const array = [...data];
    array.push(`${product}-${number}`);
    const result = await RDset(`cart-${username}-${password}`, array, 3600);
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function RDgetCart(username, password) {
  try {
    const result = await RDget(`cart-${username}-${password}`);
    return result;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  RDisLogged,
  RDlogin,
  RDlogout,
  RDfailLogin,
  RDaddToCart,
  RDgetCart,
};
