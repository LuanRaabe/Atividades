const session = require("./session.js");

function getCookie(req, res) {
    let cookieValue = req.cookies['login'];
    if (cookieValue) {
        return res.send(cookieValue);        
    }
    return res.send('No cookie found');
}

function checkCookie(req, res) {
    console.log(req.body);
    let check = session.checkAccount(req.body);
    let uuid = check == "user not found" ? setCookie(req, res) :
                check == "wrong password" ? "Usuário ou senha inválidos" :
                check;
    return uuid;
}

function setCookie(req, res) {
    let uuid = session.createAccount(req.body);
    return uuid;
}

function removeCookie(req, res) {
    res.clearCookie("login");
    res.send(`Cookie login is clear.`);
}

module.exports = {checkCookie, getCookie, removeCookie};