function change(number) {
  let operator = document.getElementById("operator");
  operator.className = '';
  switch (number) {
    case 1:
      operator.classList.add('fas', 'fa-plus');
      break;
    case 2:
      operator.classList.add('fas', 'fa-minus');
      break;
    case 3:
      operator.classList.add('fas', 'fa-times');
      break;
    case 4:
      operator.classList.add('fas', 'fa-divide');
      break;
  }
}

function getOperation() {
  let radios = document.getElementsByTagName('input');
  let value;
  for (let i = 0; i < radios.length; i++) {
      if (radios[i].type === 'radio' && radios[i].checked) {
          let operation = radios[i].value;
          return operation;
      }
  }
}

function calc() {
  let input1 = parseFloat(document.getElementById("operator-1").value);
  let input2 = parseFloat(document.getElementById("operator-2").value);
  let op = getOperation();
  switch (op) {
    case '1':
      return (input1 + input2);
      break;
    case '2':
      return (input1 - input2);
      break;
    case '3':
      return (input1 * input2);
      break;
    case '4':
      return (input1 / input2);
      break;
    default:
      alert("nenhuma opção selecionada");
  }
}

function result() {
  let result = calc();
  document.getElementById("result").innerHTML = result;
}