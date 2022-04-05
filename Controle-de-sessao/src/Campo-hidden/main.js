import { makeGame } from "./module-game/script.js";
$(document).ready(function () {
    const apiUrl = "http://localhost:8001/";
    $("#sign-in").click(function () {
        let name = $("#name").val();
        let password = $("#password").val();

        const myHeaders = { "Content-type": "application/json;charset=UTF-8" };

        const obj = {
            name: name,
            password: password,
        };

        const myConf = {
            method: "POST",
            headers: myHeaders,
            mode: "cors",
            body: JSON.stringify(obj),
        };

        fetch(apiUrl + "login", myConf)
            .then((response) => response.text())
            .then((response) => {
                console.log(response);
                if (response == "Usuário ou senha inválidos") {
                    alert("Usuário ou senha inválidos");
                } else {
                    $("#hidden").val(response);
                    $("#login").hide();
                    makeGame();
                }
            })
            .catch((error) => console.log("warning: ", error));
    });
});
