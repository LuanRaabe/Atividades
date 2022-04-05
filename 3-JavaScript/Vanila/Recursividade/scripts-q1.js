function factorial(num) {
  if (num < 0 || !Number.isInteger(num) || (typeof num != 'number')) {
    console.log("Só são aceitos números inteiros maiores que zero");
    return num;
  }
  if (num === 0) {
    return 1;
  }
  return num * factorial(num - 1)
}

console.log(factorial(5));