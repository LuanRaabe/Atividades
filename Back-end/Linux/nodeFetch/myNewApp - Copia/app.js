const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const jsonObject = require('./infos.json');
app.use(express.static('public'));

app.get('/', (req, res) => {
    const param = req.query.param;
    fs.readFile("index.html", function (err, data) {
        res.setHeader("content-type", "text/html");
        res.send(data);
    });
    return false;
});

app.get("/id=*", (req, res) => {
    console.log(req.params["0"]);
    console.log(jsonObject[req.params["0"]]);
    const regex = new RegExp("^[0-9]+$");
    if (regex.test(req.params["0"])) {
        let list = [];
        console.log(req.params["0"]);
        if (req.params["0"] < jsonObject.length) {
            list = jsonObject[req.params["0"]];
            console.log(list);
            res.send(list);
        } else {
            res.send("Não existe pessoa com o id fornecido");
        }
    } else {
        res.send("É necessário digitar um numero inteiro ");
    }
    return false;
});

app.get("/name=*", (req, res) => {
    console.log(req.params["0"]);
    if (req.params["0"]) {
        let list = [];
        let liststr;
        console.log(req.params["0"]);
        list = jsonObject.filter(item => item.name.includes(req.params["0"]));
        if (list.length == 0) {
            res.send("Não existe pessoas com o nome fornecido");
        } else {
            if (list.length > 1) {
                liststr = list.reduce(function (acumulador, valorAtual) {
                    return acumulador + '</br>' + valorAtual.name;
                }, "");
                console.log(liststr);
                res.send(liststr);
            } else {
                console.log(list[0]);
                res.send(list[0]);
            }
        }
    } else {
        res.send("É necessário digitar ao menos tres caracteres ");
    }
    return false;
});

app.get("/mail=*", (req, res) => {
    console.log(req.params["0"]);
    if (req.params["0"]) {
        let list = [];
        let liststr;
        console.log(req.params["0"]);
        list = jsonObject.filter(item => item.email == req.params["0"]);
        if (list.length == 0) {
            res.send("Não existe pessoas com o email fornecido");
        } else {
            if (list.length > 1) {
                liststr = list.reduce(function (acumulador, valorAtual) {
                    return acumulador + '</br>' + valorAtual.mail;
                }, "");
                console.log(liststr);
                res.send(liststr);
            } else {
                console.log(list[0]);
                res.send(list[0]);
            }
        }
    } else {
        res.send("É necessário digitar um email ");
    }
    return false;
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
