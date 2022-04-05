class Calculator {
  constructor() {
    this.operand1 = null;
    this.operand2 = null;
    this.operation = null;
  }

  setOperand1(_operand1) {
    this.operand1 = _operand1;
  }
  setOperand2(_operand2) {
    this.operand2 = _operand2;
  }
  setOperation(_operation) {
    this.operation = _operation;
  }
  clearCalculator() {
    this.operand1 = null;
    this.operand2 = null;
    this.operation = null;
  }
  getResult() {
    if (!this.operand1 || !this.operand2) return "Defina operadores";
    switch (this.operation) {
      case "+": return this.operand1 + this.operand2;
      case "-": return this.operand1 - this.operand2;
      case "*": return this.operand1 * this.operand2;
      case "/": return this.operand1 / this.operand2;
      default: return "Defina operação";
    }
  }
}

let calc = new Calculator;

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
  calc.setOperand1(Number(operand[0].innerText));
  calc.setOperand2(Number(operand[1].innerText));
  calc.setOperation(showOperator.innerText);
  result.innerHTML = calc.getResult();
});

let reset = document.getElementsByClassName("reset");
reset[0].addEventListener('click', () => {
  calc.clearCalculator();
  operand.forEach((i) => { i.innerText = ""; });
  showOperator.innerText = "?";
  result.innerText = "";
})