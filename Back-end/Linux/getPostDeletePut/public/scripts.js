let cons = document.getElementById("cons");
let del = document.getElementById("del");
let add = document.getElementById("add");
let upd = document.getElementById("upd");
let result = document.getElementById("result");

function fetchAll() {
    fetch("/produto/all", { method: "GET" })
        .then((resp) => resp.json())
        .then((resp) => {
            resp.forEach(element => {
                result.innerText += `id: ${element.id} Nome: ${element.name}\n`;
            })
        })
}

function accesBackEnd(url, method, ...aux) {
    let fetchData = {
        method: method,
        headers: { "Content-type": "application/json;charset=UTF-8" }
    };
    if (aux[0]) { fetchData.body = JSON.stringify(aux[0]); }
    result.innerText = "";
    fetch(url, fetchData)
        .then((resp) => resp.json())
        .then((resp) => {
            switch (resp) {
                case true:
                    fetchAll();
                    break;
                case false:
                case []:
                    result.innerText = "Não há produto com tal ID";
                    break;
                default:
                    resp.forEach(element => {
                        result.innerHTML += `<div class="line"><span class="line-id">id:</span><span>${element.id}</span><span class="line-name">Nome:</span><span>${element.name}</span></div>`;
                    });
            }
        })
}

cons.addEventListener('click', () => {
    let url = "/produto/" + document.getElementById("cons-del-id").value;
    let method = "GET";
    accesBackEnd(url, method);
});

del.addEventListener('click', () => {
    let url = "/produto/" + document.getElementById("cons-del-id").value;
    let method = "DELETE";
    accesBackEnd(url, method);
});

add.addEventListener('click', () => {
    let url = "/produto/";
    let method = "POST";
    let body = {
        "id": document.getElementById("insert-id").value,
        "name": document.getElementById("insert-name").value
    };
    accesBackEnd(url, method, body);
});

upd.addEventListener('click', () => {
    let url = "/produto/" + document.getElementById("update-id").value;
    let method = "PUT";
    let body = {
        "id": document.getElementById("update-id").value,
        "name": document.getElementById("update-name").value
    };
    accesBackEnd(url, method, body);
});

let what = document.getElementById("what");
what.addEventListener('change', (event) => {
    let method = event.target.value;
    let consultDelete = document.getElementById("consult-delete");
    let insert = document.getElementById("insert");
    let update = document.getElementById("update");
    switch(method){
        case "consult-delete":
            consultDelete.style.display = "flex";
            insert.style.display = "none";
            update.style.display = "none";
            break;
        case "insert":
            consultDelete.style.display = "none";
            insert.style.display = "flex";
            update.style.display = "none";
            break;
        case "update":
            consultDelete.style.display = "none";
            insert.style.display = "none";
            update.style.display = "flex";
            break;
        default: console.log("WTF kkkkkk");
    }
    console.log(method);
});