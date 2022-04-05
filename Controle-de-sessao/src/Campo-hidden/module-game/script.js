const apiUrl = "http://localhost:8001/";
function addEventsGame() {
    let canvas = document.getElementById("snake");
    let context = canvas.getContext("2d");
    let box = 32;
    let snake = [];
    let points = 0;
    snake[0] = {
        x: 8 * box,
        y: 8 * box,
    };

    let direction = "right";
    let food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box,
    };

    function criarBackground() {
        context.fillStyle = "lightgreen";
        context.fillRect(0, 0, 16 * box, 16 * box);
    }

    function criarCobrinha() {
        for (let i = 0; i < snake.length; i++) {
            context.fillStyle = "#8c52ff";
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }

    function drawFood() {
        context.fillStyle = "#f10707";
        context.fillRect(food.x, food.y, box, box);
    }

    document.addEventListener("keydown", update);

    function update(event) {
        if (event.keyCode == 37 && direction != "right") direction = "left";
        if (event.keyCode == 38 && direction != "down") direction = "up";
        if (event.keyCode == 39 && direction != "left") direction = "right";
        if (event.keyCode == 40 && direction != "up") direction = "down";
    }

    function iniciarJogo() {
        if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
        if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
        if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
        if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                clearInterval(jogo);
                const uuid = $("#hidden").val();

                const myHeaders = {
                    "Content-type": "application/json;charset=UTF-8",
                };

                const obj = {
                    uuid: uuid,
                    points: points,
                };

                const myConf = {
                    method: "POST",
                    headers: myHeaders,
                    mode: "cors",
                    body: JSON.stringify(obj),
                };

                fetch(apiUrl + "updatePoints", myConf)
                    .then((response) => response.text())
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => console.log("warning: ", error));
                    $("#play").attr("disabled", true);
                alert(
                    " GAME OVER :( \n  pressione reiniciar para jogar novamente"
                );
            }
        }

        criarBackground();
        criarCobrinha();
        drawFood();

        let snakex = snake[0].x;
        let snakey = snake[0].y;

        if (direction == "right") snakex += box;
        if (direction == "left") snakex -= box;
        if (direction == "up") snakey -= box;
        if (direction == "down") snakey += box;

        if (snakex != food.x || snakey != food.y) {
            snake.pop();
        } else {
            food.x = Math.floor(Math.random() * 15 + 1) * box;
            food.y = Math.floor(Math.random() * 15 + 1) * box;
            points++;
            $("#actual-points").html(`Pontuação atual: ${points}`);
        }

        let newHead = {
            x: snakex,
            y: snakey,
        };

        snake.unshift(newHead);
    }

    let jogo = setInterval(iniciarJogo, 100);

    function pause() {
        clearInterval(jogo);
    }

    function play() {
        jogo = setInterval(iniciarJogo, 100);
    }

    function restart() {
        $("#play").attr("disabled", false);
        points = 0;
        getMaximumPoints();
        $("#actual-points").html(`Pontuação atual: 0`);
        snake = [];
        snake[0] = {
            x: 8 * box,
            y: 8 * box,
        };

        direction = "right";
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box,
        };
        pause();
        play();
    }
    function logout() {
        $("#snake-game").remove();
        $("#hidden").val("");
        $("#login").show();
    }
    $(document).on("click", "#pause", function () {
        pause();
    });
    $(document).on("click", "#play", function () {
        play();
    });
    $(document).on("click", "#restart", function () {
        restart();
    });$(document).on("click", "#log-out", function () {
        logout();
    });
}

function getMaximumPoints() {
    const uuid = $("#hidden").val();

    const myHeaders = { "Content-type": "application/json;charset=UTF-8" };

    const obj = {
        uuid: uuid
    };

    const myConf = {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        body: JSON.stringify(obj),
    };

    fetch(apiUrl + "maximumPoints", myConf)
        .then((response) => response.text())
        .then((response) => {
            console.log(response);
            $("#max-points").html(`Pontuação máxima: ${response}`);
        })
        .catch((error) => console.log("warning: ", error));
}

function makeGame() {
    $("body").append(`
    <div id="snake-game">
        <canvas id="snake" width="512" height="512"></canvas>

        <div id="game-buttons">
            <button id="pause">pause</button>
            <button id="play">play</button>
            <button id="restart">restart</button>
            <button id="log-out">log out</button>
        </div>

        <div id="snake-points">
            <span id="name-in-game"></span>
            <span id="max-points">Pontuação máxima: 0</span>
            <span id="actual-points">Pontuação atual: 0</span>
        </div>
    </div>`);
    $("#name-in-game").html($("#name").val());
    getMaximumPoints();
    addEventsGame();
}

export { makeGame };
