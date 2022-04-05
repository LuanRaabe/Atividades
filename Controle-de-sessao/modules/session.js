const crypto = require("crypto");
const fs = require('fs');

function createAccount(body) {
    let dataBase = "./sessions.json";
    let readDataBase = require("./sessions.json");
    try {
        console.log("Escrevendo no arquivo");
        fs.readFile(dataBase, 'utf-8', (err, data) => {
            if (err) throw err;
            let info = JSON.parse(data || "[]");
            body.uuid = crypto.randomUUID();
            body.maxPoints = "0";
            while(readDataBase.some((item) => item.uuid == body.uuid)){
                body.uuid = crypto.randomUUID();
            }
            info.push(body);

            let string = JSON.stringify(info, null, 6);
            
            fs.writeFile(dataBase, string, (err) => {
                if (err) throw err;
                console.log('Arquivo salvo!');
            });
        });
        return body.uuid;
    } catch { (e) => console.log("Teve um erro aí ", e) };
}

function checkAccount(body) {
    if(body.name.length == 0 || body.password.length == 0){
        return "wrong password";
    }
    let dataBase = require("./sessions.json");
    console.log(dataBase);
    let find = dataBase.filter((item) => item.name == body.name);
    console.log(find);
    return find.length == 0 ? "user not found" :
           find[0].password == body.password ? find[0].uuid :
           "wrong password";
}

function updatePoints(body) {
    let readDataBase = require("./sessions.json");
    let find = readDataBase.map((item, index) => {
        return (item.uuid == body.uuid) ? index : false
        }).filter(el => el !== false)[0];
    readDataBase[find].maxPoints = (body.points > readDataBase[find].maxPoints) ? body.points : readDataBase[find].maxPoints;
    let dataBase = "./sessions.json";
    try {
        console.log("Escrevendo no arquivo");
        fs.readFile(dataBase, 'utf-8', (err, data) => {
            if (err) throw err;

            let string = JSON.stringify(readDataBase, null, 6);
            
            fs.writeFile(dataBase, string, (err) => {
                if (err) throw err;
                console.log('Arquivo salvo!');
            });
        });
        return body.points;
    } catch { (e) => console.log("Teve um erro aí ", e) };
}

function getMaximumPoints(body){
    let dataBase = require("./sessions.json");
    let find = dataBase.map((item, index) => {
        return (item.uuid == body.uuid) ? index : false
        }).filter(el => el !== false)[0];
    console.log(find);
    return String(dataBase[find].maxPoints);
}

module.exports = {createAccount, checkAccount, updatePoints, getMaximumPoints};