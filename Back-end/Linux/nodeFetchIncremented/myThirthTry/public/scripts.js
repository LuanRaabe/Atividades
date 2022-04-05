let info = document.getElementById('info');
let typeOfInfo = document.getElementById('typeOfInfo');
let incrementalSearch = document.getElementById("incrementalSearch");
let type = '';
let result = document.getElementById('result');
let inputs = {
    info: '',
    type: ''
};

typeOfInfo.addEventListener('change', (event) => {
    type = event.target.value;
    console.log(type);
});
incrementalSearch.addEventListener('change', (event) => {
    if (type != 'id') {
        // Elemento HTML recebe texto do incremental search
        info.value = event.target.value;
    }
    incrementalSearch.style.display = "none";
    console.log(info.value);
});

//testa se nenhuma tecla mais foi clicada
var timefired = null;
info.onkeyup = function (event) {
    clearTimeout(timefired);
    //testa se a entrada possui mais de 3 letras
    if (event.target.value.length >= 3 && type != 'id') {
        timefired = setTimeout(formatData, 2000);
    }
};

function formatData() {
    inputs = {
        info: info.value,
        type: type,
        method: 'incrementalSearch'
    };

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
                incrementalSearch.innerHTML = `<option disabled selected value="">--Sugestoes--</option>`;
                incrementalSearch.style.display = "flex";
                resp.forEach(element => {
                    incrementalSearch.innerHTML += `<option value="${element[type]}">${element[type]}</option>`;
                });
                console.log(resp);
            } else {
                incrementalSearch.innerHTML = `<option>Nenhum resultado encontrado</option>`;
            }
        })
        .catch(error => console.log("warning: ", error));
}

function search() {
    inputs = {
        info: info.value,
        type: type,
        method: 'manual'
    };
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { "Content-type": "application/json;charset=UTF-8" }
    };
    fetch('/', fetchData)
        .then((response) => response.json())
        .then(function (resp) {
            if (resp.length != 0) {
                let div = document.createElement('div');
                result.innerHTML = "";
                resp.forEach(element => {
                    div = document.createElement('div');
                    div.innerHTML = `<div id="lineId">${element.id}</div><div id="lineName">${element.name}</div><div id="lineEmail">${element.email}</div>`;
                    div.setAttribute('class', 'line');
                    result.appendChild(div);
                });
                console.log(resp);
            } else {
                let div = document.createElement('div');
                div = document.createElement('div');
                div.innerHTML = `<div id="lineId"></div><div id="lineName">Nenhum resultado encontrado</div><div id="lineEmail"></div>`;
                div.setAttribute('class', 'line');
                result.appendChild(div);
            }
        })
        .catch(error => console.log("warning: ", error));
}