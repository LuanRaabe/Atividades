const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const dataBase = require('./public/infos.json');
const path = require('path');

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    fs.readFile("./public/index.html", function (err, data) {
        if (!err) {
            res.setHeader("content-type", "text/html");
            res.send(data);
        } else {
            console.log ('file not found: ' + req.url);
            res.writeHead(404, "Not Found");
            res.end();
        }
    });
    return false;
});

app.post("/", (req, res) => {
    console.log("Server", req.body);
    let item = [];
    let info = req.body.info;
    let type = req.body.type;

    switch (type) {
        case 'id':
            console.log("Pesquisou por ID");
            item = dataBase.filter(item => item.id == info);
            console.log(item);
            res.json(item);
            break;
        case 'name':
            console.log("Pesquisou por NOME");
            item = dataBase.filter(item => item.name.includes(info));
            console.log(item);
            res.json(item);
            break;
        case 'email':
            console.log("Pesquisou por EMAIL");
            item = dataBase.filter(item => item.email.includes(info));
            console.log(item);
            res.json(item);
            break;
        default:
            console.log('Não foi encontrado niguém com esses dados!');
            res.json(item);
            break;
    }
    return false;
});

app.listen(port, () => {
    console.log(`Example app listening at http://192.168.18.11:${port}`);
});
