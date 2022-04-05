const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path').join(__dirname, "public");
const dataBase = require("./database.json");

const bth = require("./modules/birthday.js");
const sec = require("./modules/sector.js");
const brc = require("./modules/branche.js");

let item = [];

app.use(express.static(path));

app.get('/birthday', function (req, res) {
    item = [];
    let birthday = req.query.birthday;
    if (birthday) {
        res.send(bth.findBirthday(item, dataBase, birthday));
    } else {
        res.send(bth.allBirthdays(dataBase));
    }
});

app.get('/sector', function (req, res) {
    item = [];
    let sector = req.query.sector;
    if (sector) {
        res.send(sec.findSector(item, dataBase, sector));
    } else {
        res.send(sec.allSectors(dataBase));
    }
});

app.get('/branche', function (req, res) {
    item = [];
    let branche = req.query.branche;
    if (branche) {
        res.send(brc.findBranche(item, dataBase, branche));
    } else {
        res.send(brc.allBranches(dataBase));
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});