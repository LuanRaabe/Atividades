const apiUrl = 'http://localhost:3000/';
let info = document.getElementById('info');
let typeOfInfo = document.getElementById('typeOfInfo');
let result = document.getElementById('result');
let type = '';
let value = '';

what.addEventListener('change', (event) => {
    let method = event.target.value;
    let add = document.getElementById("addUser");
    let request = document.getElementById("requestUser");
    if(method === "addFunc") {
        add.style.display = "flex";
        request.style.display = "none";
    }
    if(method == "searchFunc") {
        add.style.display = "none";
        request.style.display = "flex";
    }
    console.log(method);
});

typeOfInfo.addEventListener('change', (event) => {
    type = event.target.value;
    console.log(type);
});

function search() {
    value = document.getElementById("info").value;
    const options = {
        mode: 'cors',
        method: 'GET'
    };
    console.log(`OPA chefia procutando em ${type} -> ${value}`);
    fetch(apiUrl + `${type}/?${type}=${value}`, options)
        .then((response) => { return response.json(); })
        .then(function (resp) {
            console.log(resp);
            let div = document.createElement('div');
            result.innerHTML = "";
            resp.forEach(element => {
                div = document.createElement('div');
                div.innerHTML = `${element}`;
                div.setAttribute('class', 'line');
                result.appendChild(div);
            });
        })
        .catch(error => console.log("warning: ", error));
}

/* function getDate(dateValue)
{
	let  today 		= new Date(dateValue + "T00:00:00");
	let  dd 		= String(today.getDate()).padStart(2, '0');
	let  mm 		= String(today.getMonth() + 1).padStart(2, '0');
	let  yyyy 		= today.getFullYear();

	return dd + '/' + mm + '/' + yyyy;
} */

function addUser() {
    let data = {
        "id": document.getElementById("registrationNumber").value,
        "name": document.getElementById("name").value,
        "extension": document.getElementById("extension").value,
        "email": document.getElementById("email").value,
        "sector": document.getElementById("sector").value,
        "birthDay": document.getElementById("birthday").value//.split('-').reverse().join('/'),
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json;charset=UTF-8" }
    };
    document.getElementById("addUser").reset();
    console.log(JSON.stringify(data));
    fetch(apiUrl + 'adduser', fetchData)
        .then((response) => response.text())
        .then(function (resp) {
            console.log("client added");
        })
        .catch(error => console.log("warning: ", error));
}