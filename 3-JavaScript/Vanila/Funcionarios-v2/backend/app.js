const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const bth = require("./modules/birthday.js");
const sec = require("./modules/sector.js");
const brc = require("./modules/extension.js");
const add = require("./modules/adduser.js");
const calc = require("./modules/calculator.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Request-Method", "GET,POST");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

app.get('/', function (req, res) {
    res.send('Utilizae o formato "/rota/variavel=valor" onde rota e variável precisam ter nomes iguais, podendo ser birthday, sector, extension');
    return false;
})

app.get('/birthday', function (req, res) {
    let birthday = req.query.birthday;
    console.log(req.query);
    if (birthday) {
        res.send(bth.findBirthday(birthday));
    } else {
        res.send(bth.allBirthdays());
    }
    return false;
});

app.get('/sector', function (req, res) {
    let sector = req.query.sector;
    if (sector) {
        res.send(sec.findSector(sector));
    } else {
        res.send(sec.allSectors());
    }
    return false;
});

app.get('/extension', function (req, res) {
    let extension = req.query.extension;
    if (extension) {
        res.send(brc.findBranche(extension));
    } else {
        res.send(brc.allBranches());
    }
    return false;
});

app.post("/adduser", (req, res) => {
    console.log("Server", req.body);
    console.log("Adicionando pessoa");
    res.json(add.addClient(req.body));
    return false;
});

app.get("/calculate/:operand1?&:operand2?&:operator?", (req, res) => {
    let {operand1, operand2, operator} = req.params;
    console.log(operand1, operator, operand2);
    res.send(calc.calculate(operand1, operand2, operator).toString());
    return false;
});

app.listen(port, () => {
    console.log(`Backend app listening at http://localhost:${port}`);
    return false;
});