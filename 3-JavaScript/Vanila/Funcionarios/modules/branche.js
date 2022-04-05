function findBranche(array, dataBase, branche) {
    array = dataBase.filter(item => item.branche == branche);
    if(array.length) return array.map((el) => {
        return "Nome: " + el.name + " | Ramal: " + el.branche;
    });
    else return "Ninguém nesse ramal foi encontrado";
}

function allBranches(dataBase) {
    dataBase.sort((a,b) => {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    });
    return dataBase.map((el) => {
        return "Nome: " + el.name + " | Ramal: " + el.branche;
    });;
}

module.exports = {findBranche, allBranches};