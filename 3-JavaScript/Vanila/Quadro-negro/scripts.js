function writeOnBoard() {
    let number = document.getElementById("number");
    let content = document.getElementById("content");
    let phrase = "Eu não desperdiçarei giz. ";
    let display = "";
    let i = 0;
    while(i < number.value) {
       display += phrase;
       i++;
    }
    content.innerText = display;
    let screen = document.getElementById("screen");
    let styleContent = window.getComputedStyle(content);
    let heightDiv = content.offsetHeight;
    let heightLine = parseInt(styleContent.getPropertyValue("line-height"));
    let heightScreen = screen.offsetHeight;
    let totalLines = heightDiv / heightLine;
    let screenLines = Math.floor(heightScreen / heightLine);
    let letters = [...content.innerText].reduce((acc, cur) => {
       return acc + 1;
    }, 0);
    let lettersPerLine = Math.ceil(letters / totalLines);
    let erasedScreen = 0;
    let totalLinesScreen = totalLines;
    while (totalLines > screenLines) {
       let text = content.innerText;
       let result = text.substring(lettersPerLine * screenLines);
       content.innerText = result;
       heightDiv = content.offsetHeight;
       heightLine = parseInt(styleContent.getPropertyValue("line-height"))
       totalLines = heightDiv / heightLine;
       console.log("linhas totais = ", totalLines);
       console.log("linhas tela = ", screenLines);
       console.log("letras = ", letters);
       console.log("letras por linha", lettersPerLine);
       erasedScreen++;
    }
    console.log("linhas totais = ", totalLines);
    console.log("linhas tela = ", screenLines);
    console.log("letras = ", letters);
    console.log("letras por linha", lettersPerLine);
    let info = document.getElementById("info")
    info. innerText = `O quadro foi apagado ${erasedScreen} vezes \n Foram escritas ${totalLinesScreen} linhas no total`;
 }