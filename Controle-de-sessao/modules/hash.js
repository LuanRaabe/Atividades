const crypto = require("crypto");
const bcrypt = require("bcrypt");
const cookie = require("./cookie.js");
const session = require("./session.js");

const saltRounds = 10;

async function checkHash(req, res) {
    let uuid = cookie.checkCookie(req, res);
    if (uuid !== "Usuário ou senha inválidos") {
        bcrypt.hash(uuid, saltRounds).then(function (hash) {
            hash += `--user-name--${req.body.name}`;
            console.log(hash);
            res.cookie("login", hash, { maxAge: 900000, httpOnly: true });
            res.send("Cookie has been set");
        });
        // res.cookie("login", `${uuid}`, { maxAge: 900000, httpOnly: true });
        // res.send("Cookie has been set");
    } else {
        res.send(uuid);
    }
}

async function hashToUuid(req, res) {
    console.log("body no uuid", req.body.name);
    let uuid = session.checkName(req.body.name);
    bcrypt.compare(uuid, String(req.body.hash), function (err, result) {
        console.log("body e hash", req.body.hash, result);
        if (result) res.send(uuid);
    });
}

async function compareHash(req, res) {
    bcrypt
        .compare(session.checkAccount(req.body), cookie.getCookie(req, res))
        .then(function (result) {
            console.log(req.body);
            console.log(result);
            let check = session.checkAccount(req.body);
            let uuid =
                check == "user not found"
                    ? setCookie(req, res)
                    : check == "wrong password"
                    ? "Usuário ou senha inválidos"
                    : check;
            return uuid;
        });
}

module.exports = { compareHash, hashToUuid, checkHash };
