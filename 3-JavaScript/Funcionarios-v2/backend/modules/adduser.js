const fs = require('fs');
function addClient(adding) {
    let dataBase = "./database.json";
    try {
        console.log("Escrevendo no arquivo");
        fs.readFile(dataBase, 'utf-8', (err, data) => {
            if (err) throw err;
            console.log(data);
            let info = JSON.parse(data || "[]");
            console.log(info);
            info.push(adding);
            console.log(info);

            let string = JSON.stringify(info, null, 6);
            console.log("Adicionando isso -> ", string);
            fs.writeFile(dataBase, string, (err) => {
                if (err) throw err;
                console.log('Arquivo salvo!');
            });
        });
        return 1;
    } catch { (e) => console.log("Teve um erro aí ", e) };
}

module.exports = { addClient };