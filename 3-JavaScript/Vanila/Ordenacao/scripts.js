var number = [0, 0, 0, 0];

function printNumbers(where) {
  let local = document.getElementById(where);
  local.textContent = '';
  for (let i = 0; i < number.length; i++) {
    local.textContent += ' > ' + number[i] + ' < ';
  }
}

function save() {
  let numbers = document.getElementsByTagName('input')
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i].type === 'number') {
      number[i] = Number(numbers[i].value);
    }
  }
  printNumbers('contentSaved');
  
}

function reverseOrder() {
  let step = 0;
  let total = number.length / 2;
  for (let i = 0; i < total; i++) {
    step = number[i];
    number[i] = number[number.length - i - 1];
    number[number.length - i - 1] = step;
  }
  printNumbers('contentOrdened');
}

function ascendingOrder() {
  let step = 0;
  let total = number.length - 1;
  for (let j = total; j >= 0; j--) {
    for (let i = (j - 1); i >= 0; i--) {
      if (number[i] > number[j]) {
        step = number[j];
        number[j] = number[i];
        number[i] = step;
      }
    }
  }
  printNumbers('contentOrdened');
}