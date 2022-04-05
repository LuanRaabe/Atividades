import { makeGame } from "./module-game/script.js";
$(document).ready(async function () {
    const apiUrl = "http://localhost:8001/";

    let response = await fetch(apiUrl + "getcookie");
    response = await response.text();
    console.log(response);
    if (response !== "No cookie found") {
        $("#login").hide();
        makeGame();
    } else {
        $("#sign-in").click(async function () {
            let name = $("#name").val();
            let password = $("#password").val();

            const myHeaders = {
                "Content-type": "application/json;charset=UTF-8",
            };
            const obj = {
                name: name,
                password: password,
            };
            const myConf = {
                method: "POST",
                headers: myHeaders,
                credentials: "include",
                mode: "cors",
                body: JSON.stringify(obj),
            };

            fetch(apiUrl + "checkcookie", myConf)
                .then((response) => response.text())
                .then((response) => {
                    if (response == "Usuário ou senha inválidos") {
                        alert("Usuário ou senha inválidos");
                    } else {
                        $("#login").hide();
                        makeGame();
                    }
                })
                .catch((error) => console.log("warning: ", error));
        });
    }
});
