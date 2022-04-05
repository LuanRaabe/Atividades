var price = [0.00, 0.00, 0.00, 0.00];

function total() {
  let valor = document.getElementById("valor");
  let total = price[0] + price[1] + price[2] + price[3];
  valor.textContent = "R$ " + String(total);
}

function orderBread(typeOfBread) {
  let bread = document.getElementById("bread");
  let pBread = document.getElementById("pBread");
    if (typeOfBread == 1) {
      bread.textContent = "Pão francês";
      pBread.textContent = "R$ 3,00"
      price[0] = 3.00;
      total();
  } else if (typeOfBread == 2) {
      bread.textContent = "Pão Australiano";
      pBread.textContent = "R$ 8,00"
      price[0] = 8.00;
      total();
  } else if (typeOfBread == 3) {
      bread.textContent = "Pão Brioche";
      pBread.textContent = "R$ 6,00"
      price[0] = 6.00;
      total();
  } else {
      bread.textContent = "Sem pão";
      pBread.textContent = "R$ 0,00"
      price[0] = 0.00;
      total();
  }
}

function orderHamburger(typeOfHamburguer) {
  let hamburguer = document.getElementById("hamburguer");
  let pHamburguer = document.getElementById("pHamburguer");
  switch (typeOfHamburguer) {
    case 1:
      hamburguer.textContent = "Hamburguer de picanha";
      pHamburguer.textContent = "R$ 13,00"
      price[1] = 13.00;
      total();
      break;
    case 2:
      hamburguer.textContent = "Hamburguer de costela";
      pHamburguer.textContent = "R$ 10,00"
      price[1] = 10.00;
      total();
      break;
    case 3:
      hamburguer.textContent = "Hamburguer vegano";
      pHamburguer.textContent = "R$ 12,00"
      price[1] = 12.00;
      total();
      break;
    default:
      hamburguer.textContent = "Sem hamburguer";
      pHamburguer.textContent = "R$ 0,00"
      price[1] = 0.00;
      total();
      break;
  }
}

function orderSalad(typeOfSalad) {
  let salad = document.getElementById("salad");
  let pSalad = document.getElementById("pSalad");
  switch (typeOfSalad) {
    case 1:
      salad.textContent = "Alface";
      pSalad.textContent = "R$ 1,50";
      price[2] = 1.50;
      total();
      break;
    case 2:
      salad.textContent = "Tomate";
      pSalad.textContent = "R$ 1,50";
      price[2] = 1.50;
      total();
      break;
    case 3:
      salad.textContent = "Sem salada";
      pSalad.textContent = "R$ 0,00";
      price[2] = 0.00;
      total();
      break;
    default:
      bread.textContent = "Sem salada";
      pSalad.textContent = "R$ 0,00";
      price[2] = 0.00;
      total();
      break;
  }
}

function orderCheese(typeOfCheese) {
  let cheese = document.getElementById("cheese");
  let pCheese = document.getElementById("pCheese");
  switch (typeOfCheese) {
    case 1:
      cheese.textContent = "Mussarela";
      pCheese.textContent = "R$ 3,00";
      price[3] = 3.00;
      total();
      break;
    case 2:
      cheese.textContent = "Prato";
      pCheese.textContent = "R$ 3,00";
      price[3] = 3.00;
      total();
      break;
    case 3:
      cheese.textContent = "Cheddar";
      pCheese.textContent = "R$ 5,00";
      price[3] = 5.00;
      total();
      break;
    default:
      cheese.textContent = "Sem queijo";
      pCheese.textContent = "R$ 0,00";
      price[3] = 0.00;
      total();
      break;
  }
}
