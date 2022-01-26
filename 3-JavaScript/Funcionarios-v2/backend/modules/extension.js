let array = [];
function findBranche(extension) {
    let dataBase = require("../database.json");
    array = dataBase.filter(item => item.extension == extension);
    if(array.length) return array.map((el) => {
        return "Nome: " + el.name + " | Ramal: " + el.extension;
    });
    else return "Ninguém nesse ramal foi encontrado";
}

function allBranches() {
    let dataBase = require("../database.json");
    dataBase.sort((a,b) => {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    });
    return dataBase.map((el) => {
        return "Nome: " + el.name + " | Ramal: " + el.extension;
    });;
}

module.exports = {findBranche, allBranches};