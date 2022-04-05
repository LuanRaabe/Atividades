var debts = {
  name: '',
  date: '',
  valorOriginal: '',
  days: '',
  valueToPay: ''
};

var clients = [];

function addSomeClients() {
  let names = ['Fulano', 'Beltrano', 'Cicrano', 'Deltrano', 'Elano', 'Diana', 'Elena', 'Fernanda', 'Gustavo', 'Humberto'];
  nRandomClients = Math.floor(Math.random() * (151) + 50);
  for (i = 0; i < nRandomClients; i++) {
    clients.push(
      {
        name: names[Math.floor(Math.random() * 10)],
        date: new Date(String(Math.floor(Math.random() * 50 + 1970)) + '-' + String(Math.floor(Math.random() * 11 + 1)) + '-' + String(Math.floor(Math.random() * 30 + 1))),
        valorOriginal: Math.floor(Math.random() * 2000 + 500),
        days: 404,
        valueToPay: 404
      }
    );
  }
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

  totalOriginal.innerText = debtsOriginal.toFixed(2);
  totalWDebts.innerText = debtsWTime.toFixed(2);
}

function printClients(debts, index) {
  let tbody = document.getElementById("dataClients");
  let div = document.createElement('div');
  div.innerHTML = `<div>${debts.name}</div><div>${debts.date.toLocaleDateString('pt-BR')}</div><div>${debts.valorOriginal.toFixed(2)}</div><div>${debts.days}</div><div>${debts.valueToPay.toFixed(2)}</div>`;
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
  debts.date = new Date(date.value);
  debts.valorOriginal = Number(valor.value);
  clients.push(debts);

  document.getElementById('dataForm').reset();

  let tbody = document.getElementById("dataClients");
  let div = document.createElement('div');
  div.innerHTML = `<div>${debts.name}</div><div>${debts.date.toLocaleDateString('pt-BR')}</div><div>${debts.valorOriginal.toFixed(2)}</div><div>${debts.days}</div><div>${debts.valueToPay.toFixed(2)}</div>`;
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
    div.innerHTML = `<div>${item.name}</div><div>${item.date.toLocaleDateString('pt-BR')}</div><div>${item.valorOriginal.toFixed(2)}</div><div>${item.days}</div><div>${item.valueToPay.toFixed(2)}</div>`;
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

function compValor(a, b) {
  if (a.valorOriginal < b.valorOriginal)
    return -1;
  if (a.valorOriginal > b.valorOriginal)
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

function groupValor() {
  clients.sort(compValor);
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
  let total = document.getElementById("dataClients");
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

    let div = document.createElement('div');
    div.innerHTML = `<div>${item[0].name}</div><div>Total original</div><div>${tOriginal.toFixed(2)}</div><div>Total com juros</div><div>${tToPay.toFixed(2)}</div>`;
    div.setAttribute('class', 'line');
    total.appendChild(div);
  });
}

let objetos = [
  {nome: 'teste01', data: '03/09/2019'},
  {nome: 'teste02', data: '03/10/2019'},
  {nome: 'teste03', data: '03/11/2019'},
  {nome: 'teste04', data: '03/12/2019'},
  {nome: 'teste05', data: '03/01/2020'}
]

function converteData(DataDDMMYY) {
  const dataSplit = DataDDMMYY.split("/");
  const novaData = new Date(parseInt(dataSplit[2], 10),
                parseInt(dataSplit[1], 10) - 1,
                parseInt(dataSplit[0], 10));
  return novaData;
}

let dataInicial = converteData('01/09/2019');
let dataFinal = converteData('31/10/2019');
let objetosFiltrados = objetos.filter(result => {
 return converteData(result.data) >= dataInicial && converteData(result.data) <= dataFinal;
})

function filterDate() {
  groupDate();
  let range = {
    dateMax: new Date(document.getElementById('dateMax').value),
    dateMin: new Date(document.getElementById('dateMin').value)
  }

  if (range.dateMin > range.dateMax) {
    let temp = range.dateMin;
    range.dateMin = range.dateMax;
    range.dateMax = temp;
  }

  let clientsFiltered = clients.filter(client => {
    return range.dateMin <= client.date && range.dateMax >= client.date;
  })

  let tbody = document.getElementById("dataClients");
  tbody.innerText = '';
  clientsFiltered.forEach(printClients);
}

function filterValue() {
  groupValor();
  let range = {
    valueMax: Number(document.getElementById('valueMax').value),
    valueMin: Number(document.getElementById('valueMin').value)
  }

  if (range.valueMin > range.valueMax) {
    let temp = range.valueMin;
    range.valueMin = range.valueMax;
    range.valueMax = temp;
  }

  let clientsFiltered = clients.filter(function (client) {
    return this.valueMin <= client.valorOriginal && this.valueMax >= client.valorOriginal;
  }, range);

  let tbody = document.getElementById("dataClients");
  tbody.innerText = '';
  clientsFiltered.forEach(printClients);
}