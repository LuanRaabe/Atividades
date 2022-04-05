var debts = {
  name: '',
  date: '',
  valorOriginal: '',
  days: '',
  valueToPay: ''
};

var clients = [];

function addInfo() {
  debts = {
    name: '',
    date: '',
    valorOriginal: '',
    days: '',
    valueToPay: ''
  };
  let name = document.getElementById('name');
  let date = document.getElementById('date');
  let valor = document.getElementById('valor');

  debts.name = name.value;
  debts.date = date.value;
  debts.valorOriginal = valor.value;
  clients.push(debts);
  console.log(clients);

  document.getElementById('form').reset();

  let tbody = document.getElementById("dataClients");
  let div = document.createElement('div');
  div.innerHTML = `<div>${debts.name}</div><div>${debts.date}</div><div>${debts.valorOriginal}</div><div>${debts.days}</div><div>${debts.valueToPay}</div>`;
  div.setAttribute('class', 'line');
  tbody.appendChild(div);
}

function calcDebt() {
  let tbody = document.getElementById("dataClients");
  tbody.innerText = '';
  clients.map(function (item) {
    let due = new Date(item.date);
    let today = new Date();
    let oneDay = 1000 * 3600 * 24;
    let days = Math.floor((today.getTime() - due.getTime()) / oneDay);
    let pay = 0;

    if (days > 0) {
      pay = (item.valorOriginal * (1 + (0.02 + days * 0.001)));
    }

    item.days = days;
    item.valueToPay = pay;

    let div = document.createElement('div');
    div.innerHTML = `<div>${item.name}</div><div>${item.date}</div><div>${item.valorOriginal}</div><div>${item.days}</div><div>${item.valueToPay.toFixed(2)}</div>`;
    div.setAttribute('class', 'line');
    tbody.appendChild(div);
  });
}

function dropBox() {
  let box = document.getElementById("instructions");
  if (box.style.display == "none"){
    box.style.display = "flex";
    box.style.flexDirection = "column";
  } else {
    box.style.display = "none";
  }
}