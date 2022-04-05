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
            console.log('file not found: ' + req.url);
            res.writeHead(404, "Not Found");
            res.end();
        }
    });
    return false;
});

app.post("/", (req, res) => {
    console.log("Server", req.body);
    let item = [];
    let info = '';
    let realInfo = '';
    let type = req.body.type;
    let method = req.body.method;

    function searchCompostName(infos) {
        let tempItems = [];
        dataBase.forEach(function (data) {
            infos.forEach(function (subdata) {
                if (data.name.includes(subdata)) {
                    tempItems.push(data);
                }
            })
        });
        console.log(tempItems);
        let index = 0,
            test = true;
        infos.forEach(function (data) {
            test = true;
            while (test) {
                console.log(index, tempItems.length, data);
                if (index >= tempItems.length) {
                    test = false;
                } else {
                    if (!tempItems[index].name.includes(data)) {
                        console.log("aqui >", tempItems[index]);
                        tempItems.splice(index, 1);
                    } else {
                        index++;
                    }
                }
            }
            index = 0;
        })
        return [tempItems[0]];
    }

    switch (type) {
        case 'id':
            console.log("Pesquisou por ID");
            realInfo = req.body.info.replace(/[^0-9]/g, "");
            console.log(realInfo);
            if (realInfo[0] == '0' && realInfo.length > 0) {
                while(realInfo[0] == '0' && realInfo.length > 3){
                    realInfo = realInfo.substr(1);
                }
                console.log(realInfo);
            }
            if (realInfo.length < 3) {
                while(realInfo.length < 3) {
                    realInfo = '0' + realInfo;
                }
                console.log(realInfo);
            }
            item = dataBase.filter(item => item.id == realInfo);
            console.log(item);
            res.json(item);
            break;
        case 'name':
            console.log("Pesquisou por NOME");
            info = req.body.info.toUpperCase().replace(/[^a-zA-Z ]/g, "");
            let infos = info.split(" ");
            realInfo = infos.filter(item => item != ' ');
            console.log(realInfo);
            if (method == 'incrementalSearch') {
                if (realInfo.length > 1) {
                    item = searchCompostName(realInfo);
                } else {
                    item = dataBase.filter(item => item.name.includes(realInfo));
                }
            } else {
                if (realInfo.length > 1) {
                    item = searchCompostName(realInfo);
                } else {
                    item = dataBase.filter(item => item.name.includes(realInfo));
                }
            }
            console.log("A resposta será: ", item);
            res.json(item);
            break;
        case 'email':
            console.log("Pesquisou por EMAIL");
            info = req.body.info.toLowerCase();
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
    console.log(`Example app listening at http://localhost:${port}`);
});