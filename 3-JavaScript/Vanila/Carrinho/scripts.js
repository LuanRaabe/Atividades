class Car {
  constructor(minSp, maxSp, skd) {
    this._minimumSpeed = minSp;
    this._maximumSpeed = maxSp;
    this._skid = skd;
  }

  set minimumSpeed(string) {
    this._minimumSpeed = string;
  }
  set maximumSpeed(string) {
    this._maximumSpeed = string;
  }
  set skid(string) {
    this._skid = string;
  }

  get minimumSpeed() {
    return this._minimumSpeed;
  }
  get maximumSpeed() {
    return this._maximumSpeed;
  }
  get skid() {
    return this._skid;
  }
}

let pedro = new Car(150, 230, 0.03);
let juca = new Car(120, 260, 0.05);
let edna = new Car(180, 220, 0.01);

function randomPedro() {
  return (Math.random() * (pedro._maximumSpeed - pedro._minimumSpeed) + pedro.minimumSpeed) * (1 - pedro.skid)
}

function randomJuca() {
  return (Math.random() * (juca._maximumSpeed - juca._minimumSpeed) + juca.minimumSpeed) * (1 - juca.skid)
}

function randomEdna() {
  return (Math.random() * (edna._maximumSpeed - edna._minimumSpeed) + edna.minimumSpeed) * (1 - edna.skid)
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

function fastRun() {
  let win = lapWinner(10);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}

function granPri() {
  let win = lapWinner(70);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}

function enduro() {
  let win = lapWinner(160);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}