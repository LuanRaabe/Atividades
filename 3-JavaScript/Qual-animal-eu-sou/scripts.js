const objList = [
  {
    title: "Resumo",
    image: "images/coruja-2.jpg",
    text: "Estrigiformes são aves da ordem Strigiformes, que inclui aves de rapina, tais como corujas, mochos e murucututu. São caçadoras eficientes, usando sobretudo seus olhos extremamente aguçados e movimentos rápidos. Além disso, são extremamente atentas ao ambiente, têm grande capacidade de girar o pescoço e voar silenciosamente devido a penas especiais muito macias e numerosas que compõem suas asas. São providas, muitas vezes, de penachos na zona superior da cabeça, olhos grandes e frontais. Tais aves possuem, em sua maioria, hábitos notívagos, alimentando-se de pequenos mamíferos (principalmente de roedores e morcegos), insetos, aranhas, peixes e outras aves. Engolem suas refeições por inteiro e depois regurgitam os restos alimentares que não puderam ser digeridos em pelotas com pelos e fragmentos de ossos. Os estrigiformes são animais que possuem significados para muitas culturas humanas desde a pré-história. Na Grécia Antiga o símbolo da Deusa da sabedoria, Atena, era uma coruja do gênero Athene: o mocho-galego. Também são consideradas o símbolo da filosofia."
  },{
    title: "Corujas",
    image: "images/coruja-bebe-5.jpg",
    text: "As corujas são aves, em sua maioria, de hábito noturno, predadoras e que conseguem se deslocar por meio de um voo silencioso. Devido a uma série de mitos que as cercam, as corujas não são bem-vistas por grande parte das pessoas. Existem cerca de 212 espécies de corujas em todo o planeta, sendo observada a ocorrência de 22 espécies no Brasil. Todas as corujas pertencem à Ordem Strigiformes e estão divididas em duas famílias: Tytonidae e Strigidae."
  },{
    title: "Características",
    image: "images/coruja-1.jpg",
    text: "As corujas são aves que apresentam algumas características bem típicas, como olhos grandes voltados para a frente, bicos curvos e fortes, garras com unhas afiadas e encurvadas, e plumagem macia.Algumas corujas são pequenas, pesando cerca de 60 gramas, enquanto outras podem pesar mais de 1 kg. Assim como existe uma grande variação de tamanho, existe uma grande variedade de coloração. De maneira geral, no entanto, elas apresentam penas cinzas, brancas ou marrons, sendo possível observar manchas e listras em algumas espécies.As corujas são animais, em sua maioria, de hábitos noturnos. São aves predadoras e estão muito adaptadas à caça em ambientes onde a luminosidade é escassa. Apresentam uma visão muito acurada, e, apesar de enxergarem em locais com pouca luz, não são capazes de enxergar em situações de ausência total de iluminação. Esses animais não conseguem mover os olhos, porém são capazes de girar a cabeça em 270°, o que promove um aumento do seu campo de visão.As corujas apresentam também uma audição bastante desenvolvida, sendo capazes de perceber pequenos sons a uma considerável distância, capacidade essa que as ajuda na captura de presas. Outro ponto que confere habilidade à caça desses animais é o seu voo silencioso. A presença de penas macias faz com que esses animais façam pouco barulho ao se deslocarem por meio do voo, o que faz com que eles se aproximem das presas sem serem percebidos."
  },{
    title: "Alimentação",
    image: "images/coruja-4.jpg",
    text: "As corujas são aves predadoras que se alimentam de diferentes animais. Como elas existem em diferentes partes do mundo, a dieta varia de acordo com a espécie e a região onde vivem. Como exemplos de animais que servem de alimento para corujas, podemos citar roedores, marsupiais, insetos, aves e morcegos. As corujas capturam e matam suas presas com o auxílio de suas garras fortes e bicos curvos e resistentes. As corujas tendem a não despedaçar suas presas, engolindo-as inteiras quando estas não são muito grandes."
  },{
    title: "Reprodução",
    image: "images/coruja-3.jpg",
    text: "O período reprodutivo das corujas varia de uma região para outra. Na estação reprodutiva, é possível perceber o canto dos machos com a finalidade de encontrar uma parceira. Em algumas espécies, o casal formado no período reprodutivo permanece junto por toda a vida, outras espécies, no entanto, trocam de parceiro a cada ano. Machos tentam conquistar suas parceiras oferecendo presas e também pelo território que ocupam. As corujas são animais que não constroem ninhos e nidificam, por exemplo, em ninhos feitos por outros animais, em cavidades no solo ou em árvores, e em depressões no chão. As corujas botam de dois a três ovos, os quais são colocados em intervalos de poucos dias. O macho não os incuba, mas é responsável por alimentar a fêmea nesse período. Quando os filhotes nascem, inicialmente apenas a fêmea é responsável por cobri-los e alimentá-los. Posteriormente o macho também participa do cuidado deles. Durante a época reprodutiva, machos e fêmeas defendem ativamente seu ninho."
  }
]

function fillTitle() {
  document.getElementById("headTitle").textContent = "Que animal sou eu?"
}

function fillInfo(numberList) {
  document.querySelector(".title"+numberList).textContent = objList[numberList].title;
  let img = document.querySelector(".image"+numberList);
  img.setAttribute('src', objList[numberList].image);
  img.style.width = "400px";
  document.querySelector(".text"+numberList).textContent = objList[numberList].text;
}

function changeButton() {
  document.querySelector("#button").textContent = "Tenha uma ótima leitura :)";
}

function callAllFunctions() {
  fillTitle();
  fillInfo(0);
  fillInfo(1);
  fillInfo(2);
  fillInfo(3);
  changeButton();
}