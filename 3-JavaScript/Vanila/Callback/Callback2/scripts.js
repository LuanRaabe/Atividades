function sortNum(num) {
  let balls = [],
    sorted = [];
  for (let i = 0; i < num; i++) {
    balls.push((i + 1));
  }
  for (let i = 0; i < 6; i++) {
    sorted.push(Math.floor((Math.random() * (balls.length - 1) + 1)));
    balls.splice(sorted[i] - 1, 1);
  }
  return sorted;
}

function printNumbers(callback) {
  return callback(60);
}

const ballsSorted = printNumbers(sortNum);
var j = 0;

var p = setInterval(function() {
  let balls = document.getElementById("balls");
  let div = document.createElement('div');
  div.innerHTML += ballsSorted[j];
  div.setAttribute('class', 'number');
  balls.appendChild(div);
  j++;
  if(j==6) {clearInterval(p);}
}, 1000);