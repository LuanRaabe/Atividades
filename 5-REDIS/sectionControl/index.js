const express = require("express");
const cookieParser = require("cookie-parser");
const {
  handleCreateAccount,
  handleLogin,
  handleLogout,
  handleShop,
  getCart,
} = require("./modules/session");

const app = express();
app.use(cookieParser());

app.get("/create-account/:username/:password", async (req, res) =>
  handleCreateAccount(req, res)
);

app.get("/login/:username/:password", async (req, res) =>
  handleLogin(req, res)
);

app.get("/logout/:username/:password", async (req, res) =>
  handleLogout(req, res)
);

app.get("/shop", async (req, res) => getCart(req, res));

app.get("/shop/:product/:number", async (req, res) => {
  handleShop(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server listening on localhost:3000");
});
