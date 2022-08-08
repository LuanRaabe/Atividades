const Redis = require("ioredis");
const RDclient = new Redis();

RDclient.on("error", (err) => {
  console.log(err);
});

async function RDset(key, value, time) {
  try {
    const seted = await RDclient.set(key, value, "EX", time);
    return seted;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function RDget(key) {
  try {
    const result = await RDclient.get(key);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function RDdel(key) {
  try {
    const result = await RDclient.del(key);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function RDgetTtl(key) {
  try {
    const result = await RDclient.ttl(key);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function RDisLogged(username, password) {
  try {
    const result = await RDget(`login-${username}`);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function RDlogin(username, password) {
  try {
    let result = await RDget(`login-${username}`);
    if (!result) result = await RDset(`login-${username}`, password, 3600);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function RDcheckLOgin(username, password) {
  try {
    const result = await RDget(`login-${username}`);
    if (result === password) return true;
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function RDlogout(username, password) {
  try {
    const result = await RDdel(`login-${username}`);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function RDfailLogin(username, password) {
  try {
    let number = 0;
    const numFails = await RDget(`fail-${username}`);
    number = (numFails ? parseInt(numFails) : number) + 1;
    if (numFails === 3) {
      let awaitTime = await RDgetAwait(username, password);
      if (awaitTime) return awaitTime;

      awaitTime = await RDset(`await-${username}`, `awaiting`, 30);
      return awaitTime;
    }
    const result = await RDset(`fail-${username}`, number, 15);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function RDgetAwait(username, password) {
  try {
    const result = await RDgetTtl(`await-${username}`);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function RDaddToCart(username, password, product, number) {
  try {
    const data = await RDgetCart(req, res, "products").split("--");
    const array = [...data];
    array.push(`${product}-${number}`);
    const result = await RDset(`cart-${username}`, array, 3600);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function RDgetCart(username, password) {
  try {
    const result = await RDget(`cart-${username}`);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = {
  RDisLogged,
  RDlogin,
  RDlogout,
  RDcheckLOgin,
  RDfailLogin,
  RDaddToCart,
  RDgetCart,
};
