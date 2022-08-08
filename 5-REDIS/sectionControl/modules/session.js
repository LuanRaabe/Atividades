const { PGloginAccount, PGcreateAccount } = require("./connectionDB");
const {
  RDisLogged,
  RDlogin,
  RDlogout,
  RDfailLogin,
  RDaddToCart,
  RDgetCart,
  RDcheckLOgin,
} = require("./redis");
const { haveCookie, setCookie, getCookie, addToCart } = require("./cookie");

async function handleLogin(req, res) {
  const haveCookieSet = await haveCookie(req, res, "session");
  if (haveCookieSet) return;
  const { username, password } = req.params;
  const isLogged = await RDisLogged(username, password);
  if (isLogged) {
    await setCookie(req, res, "session", isLogged);
    return;
  }
  const RDcheckPassword = await RDcheckLOgin(username, password);
  if (RDcheckPassword) {
    setCookie(req, res, "session", `login-${data.username}-${data.password}`);
    return;
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
  let data = await getCookie(req, res, "session");
  if (data) data = data.split("-");
  else return;
  await RDlogout(data[1], data[2]);
  res.clearCookie("session");
}

async function handleShop(req, res) {
  const { product, number } = req.params;
  const session = await getCookie(req, res, "session").split("-");
  await RDaddToCart(session[1], session[2], product, number);
  await addToCart(req, res, product, number);
}

async function getCart(req, res) {
  let response = [];

  let data = await getCookie(req, res, "products");
  if (data) response = data.split("--");
  else {
    let RDcart = await RDgetCart(req, res, "products");
    if (RDcart) response = RDcart.split("--");
  }
  res.json(response);
}

module.exports = {
  handleLogin,
  handleCreateAccount,
  handleLogout,
  handleShop,
  getCart,
};
