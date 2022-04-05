const express = require('express');
const app = express();
const port = 8001;
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const session = require("./modules/session.js");
const cookie = require("./modules/cookie.js");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('src/home'));
app.use('/hidden', express.static('src/Campo-hidden'));
app.use('/cookie', express.static('src/Cookies'));
app.use('/hash', express.static('src/Hash'));

app.get("/getcookie", (req, res) => {
    cookie.getCookie(req, res);
});

app.post("/checkcookie", (req, res) => {
    let uuid = cookie.checkCookie(req, res);
    if (uuid !== "Usuário ou senha inválidos") {
        res.cookie("login", `${uuid}`, { maxAge: 900000, httpOnly: true });
        res.send("Cookie has been set");
    } else {
        res.send(uuid);
    }
});

app.get("/removeCookie", (req, res) => {
    cookie.removeCookie(req, res);
})

app.post("/login", (req, res) => {
    let check = session.checkAccount(req.body);
    let uuid =
        check == "user not found" ? session.createAccount(req.body)
        : check == "wrong password" ? "Usuário ou senha inválidos"
        : check;
    res.send(uuid);
});

app.post("/updatePoints", (req, res) => {
    let points = session.updatePoints(req.body);
    res.send({ points: points });
});

app.post("/maximumPoints", (req, res) => {
    res.send(session.getMaximumPoints(req.body));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
