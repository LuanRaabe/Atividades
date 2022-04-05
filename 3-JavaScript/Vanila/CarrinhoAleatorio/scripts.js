const cars = {
  popular: {
    maxVelVar: [180, 200],
    minVelVar: [110, 130],
    skidVar: [0.03, 0.04]
  },
  sport: {
    maxVelVar: [195, 215],
    minVelVar: [125, 145],
    skidVar: [0.02, 0.03]
  },
  superSport: {
    maxVelVar: [210, 230],
    minVelVar: [140, 160],
    skidVar: [0.01, 0.0175]
  }
}

function alCar() {
  let chance = Math.random() * 100;
  if (chance >= 0 && chance <= 60) {
    return cars.popular;
  } else if (chance > 60 && chance <= 95) {
    return cars.sport;
  } else {
    return cars.superSport;
  }
}

function definitions() {
  let obj = alCar();
  let max = (Math.random() * (obj.maxVelVar[1] - obj.maxVelVar[0]) + obj.maxVelVar[0]);
  let min = (Math.random() * (obj.minVelVar[1] - obj.minVelVar[0]) + obj.minVelVar[0]);
  let skid = (Math.random() * (obj.skidVar[1] - obj.skidVar[0]) + obj.skidVar[0]);
  return {
    min,
    max,
    skid
  };
}

const pedro = definitions();
const juca = definitions();
const edna = definitions();

const divPedro = document.getElementById("pedro");
divPedro.textContent = `Pedro -> VelMin: ${pedro.min.toFixed(2)} | VelMax: ${pedro.max.toFixed(2)} | derrp: ${pedro.skid.toFixed(2)}`;

const divJuca = document.getElementById("juca");
divJuca.textContent = `Juca -> VelMin: ${juca.min.toFixed(2)} | VelMax: ${juca.max.toFixed(2)} | derrp: ${juca.skid.toFixed(2)}`;

const divEdna = document.getElementById("edna");
divEdna.textContent = `Edna -> VelMin: ${edna.min.toFixed(2)} | VelMax: ${edna.max.toFixed(2)} | derrp: ${edna.skid.toFixed(2)}`;

function randomPedro() {
  return (Math.random() * (pedro.max - pedro.min) + pedro.min) * (1 - pedro.skid);
}

function randomJuca() {
  return (Math.random() * (juca.max - juca.min) + juca.min) * (1 - juca.skid);
}

function randomEdna() {
  return (Math.random() * (edna.max - edna.min) + edna.min) * (1 - edna.skid);
}

function lapWinner(laps) {
  let lapsInRun = document.getElementById("lapsInRun");
  let lapWinner = document.getElementById("lapWinner");
  let pedroWin = 0;
  let jucaWin = 0;
  let ednaWin = 0;
  for (let i = 0; i < laps; i++) {
    let div = document.createElement('div');
    div.innerHTML = String(i + 1);
    div.setAttribute('id', 'lap');
    lapsInRun.appendChild(div);
    let div2 = document.createElement('div');
    let pedroSp = randomPedro();
    let jucaSp = randomJuca();
    let ednaSp = randomEdna();

    if (pedroSp > jucaSp) {
      if (pedroSp > ednaSp) {
        div2.innerHTML = 'Pedro';
        div2.setAttribute('id', 'firstPlace');
        lapWinner.appendChild(div2);
        pedroWin++;
      } else {
        div2.innerHTML = 'Edna';
        div2.setAttribute('id', 'firstPlace');
        lapWinner.appendChild(div2);
        ednaWin++;
      }
    } else {
      if (jucaSp > ednaSp) {
        div2.innerHTML = 'Juca';
        div2.setAttribute('id', 'firstPlace');
        lapWinner.appendChild(div2);
        jucaWin++;
      } else {
        div2.innerHTML = 'Edna';
        div2.setAttribute('id', 'firstPlace');
        lapWinner.appendChild(div2);
        ednaWin++;
      }
    }
  }
  if (pedroWin > jucaWin) {
    if (pedroWin > ednaWin) {
      return 'Pedro';
    } else {
      return 'Edna';
    }
  } else {
    if (jucaWin > ednaWin) {
      return 'Juca';
    } else {
      return 'Edna';
    }
  }
}

function erase() {
  let erase1 = document.getElementById("lapsInRun");
  let erase2 = document.getElementById("lapWinner");
  erase1.innerText = "";
  erase2.innerText = "";
}

function fastRun() {
  erase();
  let win = lapWinner(10);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}

function granPri() {
  erase();
  let win = lapWinner(70);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}

function enduro() {
  erase();
  let win = lapWinner(160);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}

function rand() {
  erase();
  laps = document.getElementById('rand').value;
  let win = lapWinner(laps);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}