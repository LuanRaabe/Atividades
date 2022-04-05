const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, "public")));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let produto = require("./products.json");

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

app.get("/produto/all", (req, res) => {
    res.send(produto);
});

app.post("/produto", (req, res) => {
    console.log(`Adiiconando a produtos: ${req.body}`);
    produto.push(req.body);
});

app.route('/produto/*')
    .get((req, res) => {
        let item = [];
        console.log(req.params["0"]);
        item = produto.filter((item) => item.id == req.params["0"]);
        console.log(item);
        if (item.length) { res.send(item); }
        else { res.send(false); }
    })
    .put((req, res) => {
        let item = [];
        produto.forEach((element) => {
            if (element.id == req.params["0"]) {
                element.name = req.body.name;
                item.push(element);
            }
        });
        if (item.length) {
            console.log(produto);
            res.send(true);
        } else {
            res.send(false);
        }
    })
    .delete((req, res) => {
        let item = [];
        let n = 0;
        console.log(req.params["0"]);
        produto.forEach((element, index) => {
            if (element.id == req.params["0"]) {
                item.push(index);
            }
        });
        console.log(item);
        if (item.length) {
            item.forEach(element => {
                produto.splice((element - n), 1);
                n++;
            });
            console.log(produto);
            res.send(true);
        } else {
            res.send(false);
        }
    })

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});