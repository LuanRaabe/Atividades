function callback(num) {
  num = Number(num);
  alert('Valor original: ' + num + ' Multiplos:' + ' 1: ' + num*1 + ' 2: ' +  num*2 + ' 3: ' +  num*3 + ' 4: ' +  num*4 + ' 5: ' +  num*5 + ' 6: ' +  num*6 + ' 7: ' +  num*7 + ' 8: ' +  num*8 + ' 9: ' +  num*9 + ' 10: ' +  num*10 );
}

function whatNumber(callback) {
  var num = prompt('Digite um número:');
  callback(num);
}

whatNumber(callback);