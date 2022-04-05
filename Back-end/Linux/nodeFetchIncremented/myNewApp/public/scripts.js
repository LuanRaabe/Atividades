let info = document.getElementById('info');
let typeOfInfo = document.getElementById('typeOfInfo');
let type = '';
typeOfInfo.addEventListener('change', (event) => {
    type = event.target.value;
    console.log(type);
});
let result = document.getElementById('result');
let inputs = {
    info: '',
    type: ''
};

//testa se nenhuma tecla mais foi clicada
var timefired = null;
info.onkeyup = function (event) {
    clearTimeout(timefired);
    //testa se a entrada possui mais de 3 letras
    if (event.target.value.length >= 3) {
        timefired = setTimeout(formatData, 2000);
    }
};

function formatData() {
    inputs = {
        info: info.value,
        type: type
    };

    //normalizar as entradas, nomes em uppercase, emails em lowercase
    switch (inputs.type) {
        case 'name':
            inputs.info = info.value.toUpperCase();
            break;
        case 'email':
            inputs.info = info.value.toLowerCase();
            break;
        default:
            console.log("IDs não precisam de mudança");
            break;
    }

    console.log(inputs);
    console.log(JSON.stringify(inputs));

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { "Content-type": "application/json;charset=UTF-8" }
    }

    if (inputs.type == '') {
        console.log("Nenhum campo selecionado");
    } else {
        consultDataBase(fetchData);
    }
}

function consultDataBase(fetchData) {
    fetch('/', fetchData)
        .then((response) => response.json())
        .then(function (resp) {
            if (resp.length != 0) {
                result.innerHTML = "";
                let div = document.createElement('div');
                resp.forEach(element => {
                    div = document.createElement('div');
                    div.innerHTML = `<div id="lineId">${element.id}</div><div id="lineName">${element.name}</div><div id="lineEmail">${element.email}</div>`;
                    div.setAttribute('class', 'line');
                    result.appendChild(div);
                });
            } else {
                result.innerHTML = "Nenhum resultado encontrado"
            }
        })
        .catch(error => console.log("warning: ", error));
}