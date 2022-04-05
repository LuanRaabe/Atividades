const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const produto = [
		{
			"id": 1,
			"nome": "Produto A"
		},{
			"id": 3,
			"nome": "Produto B"
		},{
			"id": 6,
			"nome": "Produto C"
		},{
			"id": 3,
			"nome": "Produto D"
		}];

app.use(express.static('public'));

app.get('/', function(req, res) {
	fs.readFile("index.html", function(err, data) {
		res.setHeader("content-type", "text/html");
		res.send(data);
	});
	return false;
});

app.get("/*", (req, res) => {
	let id = req.params["0"];
	if(id % 1 == 0){
		let item = [];
		item = produto.filter(item => item.id == id);
		console.log(item);
		if(item.length != 0) {
			let itemNames = item.reduce(function (acc, cur) {
				return acc + ' ' + cur.nome;
			},"");
			res.send(itemNames);
		} else {
			res.send("Tem produto com esse ID não");
		}
	} else {
		res.send("Precisa ser um inteiro");
	}
	return false;
});

app.listen(port, () => {
	console.log(`Example app listening at http://192.168.18.12:${port}`)
});
