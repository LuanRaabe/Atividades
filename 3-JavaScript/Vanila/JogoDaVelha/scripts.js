var matrix = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];
const squares = document.getElementsByTagName('input');
const atualPlayer = document.getElementById('players');

var players = 'X';
var winner = '_';

function trocarJogador() {
  if (players == 'X') {
    players = 'O';
    atualPlayer.innerText = 'O';
    atualPlayer.style.color = '#F00';
    return 'O';

  } else {
    players = 'X';
    atualPlayer.innerText = 'X';
    atualPlayer.style.color = '#00F';
    return 'X';
  }
}

function victory() {
  if ((matrix[0][0] == matrix[0][1]) && (matrix[0][1] == matrix[0][2]) && matrix[0][2] != '_') {
    squares[0].style.backgroundColor = '#336e76';
    squares[1].style.backgroundColor = '#336e76';
    squares[2].style.backgroundColor = '#336e76';

    return matrix[0][2];

  } else if ((matrix[1][0] == matrix[1][1]) && (matrix[1][1] == matrix[1][2]) && matrix[1][0] != '_') {
    squares[3].style.backgroundColor = '#336e76';
    squares[4].style.backgroundColor = '#336e76';
    squares[5].style.backgroundColor = '#336e76';

    return matrix[0][0];

  } else if ((matrix[2][0] == matrix[2][1]) && (matrix[2][1] == matrix[2][2]) && matrix[2][0] != '_') {
    squares[6].style.backgroundColor = '#336e76';
    squares[7].style.backgroundColor = '#336e76';
    squares[8].style.backgroundColor = '#336e76';

    return matrix[0][0];

  } else if ((matrix[0][0] == matrix[1][0]) && (matrix[1][0] == matrix[2][0]) && matrix[2][0] != '_') {
    squares[0].style.backgroundColor = '#336e76';
    squares[3].style.backgroundColor = '#336e76';
    squares[6].style.backgroundColor = '#336e76';

    return matrix[0][0];

  } else if ((matrix[0][1] == matrix[1][1]) && (matrix[1][1] == matrix[2][1]) && matrix[2][1] != '_') {
    squares[1].style.backgroundColor = '#336e76';
    squares[4].style.backgroundColor = '#336e76';
    squares[7].style.backgroundColor = '#336e76';

    return matrix[0][1];

  } else if ((matrix[0][2] == matrix[1][2]) && (matrix[1][2] == matrix[2][2]) && matrix[2][2] != '_') {
    squares[2].style.backgroundColor = '#336e76';
    squares[5].style.backgroundColor = '#336e76';
    squares[8].style.backgroundColor = '#336e76';

    return matrix[0][2];

  } else if ((matrix[0][0] == matrix[1][1]) && (matrix[1][1] == matrix[2][2]) && matrix[2][2] != '_') {
    squares[0].style.backgroundColor = '#336e76';
    squares[4].style.backgroundColor = '#336e76';
    squares[8].style.backgroundColor = '#336e76';

    return matrix[0][0];

  } else if ((squares[2].value == squares[4].value) && (squares[4].value == squares[6].value) && squares[2].value != '_') {
    squares[2].style.backgroundColor = '#336e76';
    squares[4].style.backgroundColor = '#336e76';
    squares[6].style.backgroundColor = '#336e76';

    return squares[2].value;
  }

  return '_';
}

function mark(a, x, y) {
  winner = victory();
  if ((matrix[x][y] == '_') && (winner == '_')) {
    matrix[x][y] = trocarJogador();
    a.value = matrix[x][y];
    if (matrix[x][y] == 'O') {
      a.style.color = 'red';
    } else {
      a.style.color = 'blue';
    }
    winner = victory();
    if (winner != '_') {
      atualPlayer.innerText = `${winner} venceu!`;
    }
  }
}

function restart() {
  for (var i = 0; i < 9; i++) {
    squares[i].value = '_';
    squares[i].style.color = 'white';
    squares[i].style.backgroundColor = 'white';
  }
  players = 'O';
  winner = '_';
  matrix = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];
};
