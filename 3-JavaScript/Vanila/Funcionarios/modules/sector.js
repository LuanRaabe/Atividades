function findSector(array, dataBase, sector) {
    array = dataBase.filter(item => item.sector.includes(sector));
    if(array.length) return array.map((el) => {
        return "Nome: " + el.name + " | Setor: " + el.sector;
    });
    else return "Ninguém nesse setor foi encontrado";
}

function allSectors(dataBase) {
    dataBase.sort((a,b) => {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    });
    return dataBase.map((el) => {
        return "Nome: " + el.name + " | Setor: " + el.sector;
    });;
}

module.exports = {findSector, allSectors};