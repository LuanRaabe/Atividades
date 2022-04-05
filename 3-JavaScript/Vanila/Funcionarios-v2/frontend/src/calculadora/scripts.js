const apiUrl = 'http://localhost:3000/';
let pos = 0;
let operand = document.querySelectorAll(".operands");
let showOperator = document.getElementById("showOperator");
let result = document.getElementById("result");

operand.forEach((item, index) => {
  item.addEventListener('click', (data) => {
    pos = index;
    operand.forEach((i) => { i.style.backgroundColor = "#fff"; });
    operand[pos].style.backgroundColor = "#ccc";
  });
});

let numbers = document.querySelectorAll(".inputNumber");
numbers.forEach((item) => {
  item.addEventListener('click', (data) => {
    console.log(data.target.value);
    operand[pos].innerText += data.target.value;
    console.log(operand[pos].innerText);
  });
});

let operators = document.querySelectorAll(".operator");
operators.forEach((item) => {
  item.addEventListener('click', (data) => {
    console.log(data.target.value);
    showOperator.innerHTML = data.target.value;
  });
});

let calculate = document.getElementsByClassName("calculate");
calculate[0].addEventListener('click', (i) => {
  console.log("resultado");
  fetch(apiUrl + "calculate/" + Number(operand[0].innerText) + "&" + Number(operand[1].innerText) + "&" + showOperator.innerText)
    .then((resp) => resp.text())
    .then((resp) => {
      console.log(resp);
      result.innerHTML = resp;
    })
});

let reset = document.getElementsByClassName("reset");
reset[0].addEventListener('click', () => {
  operand.forEach((i) => { i.innerText = ""; });
  showOperator.innerText = "?";
  result.innerText = "";
})