var debts = {
  name: '',
  date: '',
  valorOriginal: '',
  days: '',
  valueToPay: ''
};

var clients = [];

function addSomeClients() {
  clients.push(
    {
      name: 'Fulano da Silva',
      date: '2015-08-20',
      valorOriginal: 500,
      days: 404,
      valueToPay: 504
    }, {
    name: 'Cicrano Costa',
    date: '2016-07-12',
    valorOriginal: 500,
    days: 404,
    valueToPay: 504
  }, {
    name: 'Beltrano Fonseca',
    date: '2017-09-02',
    valorOriginal: 500,
    days: 404,
    valueToPay: 504
  }, {
    name: 'Beltrano Fonseca',
    date: '2014-06-15',
    valorOriginal: 500,
    days: 404,
    valueToPay: 504
  }, {
    name: 'Fulano da Silva',
    date: '2018-10-27',
    valorOriginal: 500,
    days: 404,
    valueToPay: 504
  }, {
    name: 'Cicrano Costa',
    date: '2013-05-01',
    valorOriginal: 500,
    days: 404,
    valueToPay: 504
  }, {
    name: 'Fulano da Silva',
    date: '2019-11-16',
    valorOriginal: 500,
    days: 404,
    valueToPay: 504
  }, {
    name: 'Cicrano Costa',
    date: '2016-07-12',
    valorOriginal: 500,
    days: 404,
    valueToPay: 504
  }, {
    name: 'Fulano da Silva',
    date: '2019-11-16',
    valorOriginal: 500,
    days: 404,
    valueToPay: 504
  })

  clients.forEach(printClients);
}

function printTotal() {
  let debtsOriginal = clients.reduce(function (acc, elm) {
    return acc += elm.valorOriginal;
  }, 0);

  let debtsWTime = clients.reduce(function (acc, elm) {
    return acc += elm.valueToPay;
  }, 0);

  let totalOriginal = document.getElementById('totalOriginal');
  let totalWDebts = document.getElementById('totalWDebts');

  totalOriginal.innerText = debtsOriginal;
  totalWDebts.innerText = debtsWTime;
}

function printClients(debts, index) {
  let tbody = document.getElementById("dataClients");
  let div = document.createElement('div');
  div.innerHTML = `<div>${debts.name}</div><div>${debts.date}</div><div>${debts.valorOriginal}</div><div>${debts.days}</div><div>${debts.valueToPay}</div>`;
  div.setAttribute('class', 'line');
  tbody.appendChild(div);

  printTotal();
}

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
  debts.valorOriginal = Number(valor.value);
  clients.push(debts);

  document.getElementById('dataForm').reset();

  let tbody = document.getElementById("dataClients");
  let div = document.createElement('div');
  div.innerHTML = `<div>${debts.name}</div><div>${debts.date}</div><div>${debts.valorOriginal}</div><div>${debts.days}</div><div>${debts.valueToPay}</div>`;
  div.setAttribute('class', 'line');
  tbody.appendChild(div);

  printTotal();
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

  printTotal();
}

function dropBox(string) {
  let box = document.getElementById(string);
  if (box.style.display == "none") {
    box.style.display = "flex";
    box.style.flexDirection = "column";
  } else {
    box.style.display = "none";
  }
}

function compName(a, b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}

function compDate(a, b) {
  if (a.date < b.date)
    return -1;
  if (a.date > b.date)
    return 1;
  return 0;
}

function groupClient() {
  clients.sort(compName);
  calcDebt();
}

function groupDate() {
  clients.sort(compDate);
  calcDebt();
}

function totalPerClient() {
  groupClient()
  let i = 0,
    current = 0,
    last = 0,
    tClients = [],
    obj = [];
  while (current < clients.length) {
    for (i = current; i < clients.length; i++) {
      if (clients[current].name == clients[i].name) {
        last++;
      }
    }
    obj = [];
    for (i = current; i < last; i++) {
      obj.push(clients[i]);
    }
    tClients.push(obj);
    current = last;
  }
  let total = document.getElementById("showTotalPerClient");
  total.innerText = '';
  tClients.forEach((item, index) => {
    //Valor original por cliente 
    let tOriginal = item.reduce(function (acc, elm) {
      return acc += elm.valorOriginal;
    }, 0);
    //Valor com imposto por cliente
    let tToPay = item.reduce(function (acc, elm) {
      return acc += elm.valueToPay;
    }, 0);
    console.log(item, tOriginal, tToPay);
    let total = document.getElementById("showTotalPerClient");
    let div = document.createElement('div');
    div.innerHTML = `<div>${item[0].name}</div><div>Total original</div><div>${tOriginal}</div><div>Total com juros</div><div>${tToPay}</div>`;
    div.setAttribute('class', 'line');
    total.appendChild(div);
  });
}
