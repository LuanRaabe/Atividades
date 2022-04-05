function getStars() {
  let radios = document.getElementsByTagName('input');
  let value;
  for (let i = 0; i < radios.length; i++) {
      if (radios[i].type === 'radio' && radios[i].checked) {
          stars = radios[i].value;
          value = radios[i].value;
          document.getElementById("a-stars").innerHTML = "Estrelas: " + stars;       
      }
  }
}

function getComment() {
  let input = document.querySelector("#coment");
  let text = input.value;
  document.getElementById("a-coment").innerHTML = "Comentário: " + text;
}

function aStyle() {
  let answer = document.getElementById("answer").style;
  answer.padding = "20px";
  answer.display = "flex";
  answer.flexDirection = "column";
  answer.border = "solid 1px #7c7c7c";
  answer.borderRadius = "30px";
  answer.width = "300px";
  answer.height = "200px";
  answer.backgroundColor = "white";
}

function fillTitle() {
  let title = document.getElementById("title");
  title.innerHTML = "Respostas do cliente";
  title.style.fontSize = "20px";
  title.style.fontWeight = "600";
}

function send() {
  fillTitle();
  getStars();
  getComment();
  aStyle();
}