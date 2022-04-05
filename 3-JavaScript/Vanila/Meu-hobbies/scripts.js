var objList = [
	{
    image : "images/me.png",
  	title : "Luan Raabe Pereira Ferreira",
    infomation : "Idade -> 21 anos  ||  Estado -> Ceará  ||  Cidade -> Fortaleza",
    description : "Animado!"
  },{
    image : "images/mobile-legends.jpg",
  	title : "Mobile Legnds",
    infomation : "https://m.mobilelegends.com/en",
    description : "Mobile Legends: Bang Bang é um jogo eletrônico para aparelhos móveis no estilo Multiplayer Online Battle Arena (MOBA) desenvolvido e publicado pela Moonton."
  },{
    image : "images/wild-rift.png",
  	title : "Wild Rift",
    infomation : "https://wildrift.leagueoflegends.com/pt-br/game-overview/",
    description : "League of Legends: Wild Rift (também conhecido como Wild Rift ou WR) é um jogo eletrônico do gênero MOBA desenvolvido e publicado pela Riot Games para Android, iOS, e consoles ainda desconhecidos. O jogo é uma versão adaptada de seu equivalente para PC, League of Legends.Como em League of Legends, os jogadores controlam um personagem (campeão) com habilidades únicas e batalham contra um time de jogadores ou inteligência artificial. O objetivo de cada time é destruir o nexus (uma construção localizada na base e protegida por outras estruturas) da equipe adversária. Em 16 de setembro de 2020 o jogo começou a ser distribuído em fase beta de forma limitada na Indonésia."
  },{
    image : "images/dragons.jpg",
  	title : "Livros de fantasia",
    infomation : "https://www.amazon.com.br/Cemit%C3%A9rio-Drag%C3%B5es-1-Raphael-Draccon/dp/8568263011",
    description : "(Nesse aqui mistura power rangers e caverna do dragão, é muita viagem num livro só) Um soldado de elite do exército americano desaparecido em uma missão no Afeganistão. Uma africana guerrilheira crescida em meio a conflitos étnicos de Ruanda. Uma garçonete irlandesa praticante de artes marciais mistas. Um hacker brasileiro descendente de orientais. Um dublê francês mestre em Parkour. Cinco realidades distintas. Um fenômeno desconhecido faz cinco pessoas, sem qualquer conexão e espalhadas pelo planeta Terra, acordarem em diferentes regiões de uma realidade devastada por um império de reptilianos e assolada pela escravidão. Os cinco iniciam uma jornada em busca de respostas para sobreviverem no centro de uma guerra envolvendo criaturas fantásticas e demônios dispostos a invocar perigosos seres abissais para servirem a seus propósitos. Porém uma entidade pretende conectar o destino dos cinco humanos e armá-los com uma tecnologia construída à base de metal- vivo, magia e sangue de dragões. Uma tecnologia jamais vista naquela ou em qualquer outra dimensão, capaz de gerar heróis de metal. Batalhas empolgantes, romance e magia. Esse é o universo épico de Cemitérios de Dragões, inspirado em uma visão adulta e sombria das antigas séries Tokusatsu, como Jaspion, Changeman, Flashman, Ultraman e tantas outras, que marcaram a infância de toda uma geração. Cemitérios de Dragões marca a estreia de Raphael Draccon, autor de Dragões de Éter, no selo Fantástica."
  },{
    image : "images/origami.jpg",
  	title : "Origami",
    infomation : "https://jonakashima.com.br/2021/11/10/origami-chameleon/",
    description : "Gosto muito dos diagramas desse cara, ele é brabo nos origami e eu consigo replicar uns 90% dos que ele ensina"
    }
]

var listPos = 0

function clearTheArea(){
	document.getElementById("content").innerHTML = ""
}

function next(){
	if (listPos != (objList.length - 1)){
  	listPos++
    clearTheArea()
    processList()
  }
}

function back(){
	if (listPos != 0){
  	listPos--
    clearTheArea()
    processList()
  }
}

function processList(){
	var Obj = objList[listPos]
    var containerTitle, containerInformation, containerDescription
    var textTitle, textInformation, textDescription
    var elContent = document.getElementById("content")

    containerImage = document.createElement("div") 
    containerTitle = document.createElement("div")
    containerInformation = document.createElement("div")
    containerDescription = document.createElement("div")

    imageCont = document.createElement("img")
    imageCont.src = Obj.image
    imageCont.style.width = "30%"
    textTitle = document.createTextNode("Título: " + Obj.title)
    textInformation = document.createTextNode("Informações: " + Obj.infomation)
    textDescription = document.createTextNode("Descrição: " + Obj.description)

    containerImage.appendChild(imageCont)
    containerTitle.appendChild(textTitle)
    containerInformation.appendChild(textInformation)
    containerDescription.appendChild(textDescription)

    elContent.appendChild(imageCont)
    elContent.appendChild(containerTitle)
    elContent.appendChild(containerInformation)
    elContent.appendChild(containerDescription)
}

processList()