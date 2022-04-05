function findBirthday(array, dataBase, birthday) {
    birthday = Number(birthday);
    if (birthday !== NaN && birthday >= 1 || birthday <= 12) {
        array = dataBase.filter((item) => {
            let month = Number(item.birthday.split("/")[1]);
            if (month == birthday) return item;
        });
        return array.map((el) => {
            return "Nome: " + el.name + " | Aniversario: " + el.birthday;
        });
    } else {
        return "Precisa ser um número entre um e doze para poder encontrar os aniversariantes por mês";
    }
}
function allBirthdays(dataBase) {
    dataBase.sort((a,b) => {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    });
    return dataBase.map((el) => {
        return "Nome: " + el.name + " | Aniversário: " + el.birthday;
    });;
}

module.exports = {findBirthday, allBirthdays};