const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
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

function capitalizeWords(string) {
    string = string.toLowerCase();
    return string.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

app.post("/", (req, res) => {
    let dataBase = require('./infos.json');
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
                while (realInfo[0] == '0' && realInfo.length > 3) {
                    realInfo = realInfo.substr(1);
                }
                console.log(realInfo);
            }
            if (realInfo.length < 3) {
                while (realInfo.length < 3) {
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
            info = capitalizeWords(info);
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
            /* let removes = [];
            let n = 0;
            item.forEach((data, index) => {
                if(!data.visible) {
                    removes.push(index);
                }
            })
            removes.forEach((index) => {
                    item.splice((index - n), 1);
                    n++;
            })
            console.log("A resposta será: ", item); */
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

app.post('/adduser', (req, res) => {
        let dataBase = './infos.json';
        let adding = req.body;
        console.log(adding);
        adding.visible = true;
        try {
            console.log("Escrevendo no arquivo");
            fs.readFile(dataBase, 'utf-8', (err, data) => {
                if (err) throw err;
                let info = JSON.parse(data || "[]");
                info.push(adding);

                let string = JSON.stringify(info, null, 6);
                console.log("Adicionando isso -> ", string);
                fs.writeFile(dataBase, string, (err) => {
                    if (err) throw err;
                    console.log('Arquivo salvo!');
                });
            });
            return 1;
        } catch { (e) => console.log("Teve um erro aí ", e) };
        res.send("Usuáio adicionado");
})

app.delete('/delete', (req, res) => {
    console.log("For deleting");
    console.log(req.body);
    let info = capitalizeWords(req.body.info);
    let type = req.body.type;
    fs.readFile("./infos.json", function (err, data) {
        if (err) {
            throw err;
        }
        let dataBase = JSON.parse(data || "[]");
        dataBase.forEach((data, index) => {
            if (data[type].includes(info)) {
                //data.visible = false;
                console.log(data);
                dataBase.splice(index, 1);
            }
        })
        let string = JSON.stringify(dataBase, null, 6);
        fs.writeFile("./infos.json", string, (err) => {
            if (err) throw err;
        })
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});