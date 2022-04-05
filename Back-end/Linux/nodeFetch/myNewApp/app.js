const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const dataBase = require('./infos.json');

app.use(express.static('website'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    fs.readFile("index.html", function (err, data) {
        res.setHeader("content-type", "text/html");
        res.send(data);
    });
    return false;
});

app.post("/", (req, res) => {
    console.log("Server", req.body);
    let item = [];
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    if (id) {
        item = dataBase.filter(item => item.id == id);
        console.log(item);
        if (item.length != 0) {
            res.json(item);
        } else {
            res.send("ninguém com esse id");
        }
    } else if (name) {
        item = dataBase.filter(item => item.name.includes(name));
        console.log(item);
        if (item.length != 0) {
            res.json(item);
        } else {
            res.send("Ninguém com esse nome");
        }
    } else if (email) {
        item = dataBase.filter(item => item.email.includes(email));
        console.log(item);
        if (item.length != 0) {
            res.json(item);
        } else {
            res.send("Ninguém com esse email");
        }
    } else {res.send("Não foi encontrado niguém com esses dados!");}
    return false;
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
