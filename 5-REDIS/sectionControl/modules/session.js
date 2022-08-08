const { PGloginAccount, PGcreateAccount } = require("./connectionDB");
const {
  RDisLogged,
  RDlogin,
  RDlogout,
  RDfailLogin,
  RDaddToCart,
  RDgetCart,
} = require("./redis");
const { haveCookie, setCookie, getCookie, addToCart } = require("./cookie");

async function handleLogin(req, res) {
  await haveCookie(req, res, "session");
  const { username, password } = req.params;
  const isLogged = await RDisLogged(username, password);
  if (isLogged) {
    await setCookie(req, res, "session", isLogged);
  }
  const { message, data } = await PGloginAccount(username, password);
  if (message === "logged account") {
    console.log("Dados adquiridos pelo DB");
    console.log(data);
    setCookie(req, res, "session", `login-${data.username}-${data.password}`);
    RDlogin(username, password);
    return;
  } else if (message === "wrong password") {
    const awaitTime = await RDfailLogin(username, password);
    if (awaitTime) {
      console.log(awaitTime);
      res.send(awaitTime);
    }
  } else {
    res.redirect("/login");
    return;
  }
}

async function handleCreateAccount(req, res) {
  const { username, password } = req.params;
  const { message, data } = await PGcreateAccount(username, password);
  if (message === "created account") {
    const { key } = data;
    await setCookie(req, res, "session", key);
    RDlogin(username, password);
  } else if (message === "account already exist") {
    res.send(message);
  } else {
    res.redirect("/create-account");
  }
}

async function handleLogout(req, res) {
  const data = await getCookie(req, res, "session").split("-");
  await RDlogout(data[1], data[2]);
}

async function handleShop(req, res) {
  const { product, number } = req.params;
  const session = await getCookie(req, res, "session").split("-");
  await RDaddToCart(session[1], session[2], product, number);
  await addToCart(req, res, product, number);
}

async function getCart(req, res) {
  const data = await getCookie(req, res, "products").split("--");
  if (data) return data;

  const RDcart = await RDgetCart(req, res, "products").split("--");
  if (RDcart) return RDcart;
}

module.exports = {
  handleLogin,
  handleCreateAccount,
  handleLogout,
  handleShop,
  getCart,
};
