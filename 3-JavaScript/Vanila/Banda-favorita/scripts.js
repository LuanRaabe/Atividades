function changePhoto() {
  let img = document.querySelector("#auroraImage");
  img.setAttribute('src', 'images/aurora.jpg');
  document.querySelector(".button").textContent="Ufa, agora está certo"
}

function changeFontsUbuntu() {
  document.querySelector(".all").style.fontFamily="'Ubuntu Mono', monospace"
}

function changeFontsComforter() {
  document.querySelector(".all").style.fontFamily="'Comforter Brush', cursive"
}
function changeFontsEstonia() {
  document.querySelector(".all").style.fontFamily="'Estonia', cursive"
}

function changeFontsNoto() {
  document.querySelector(".all").style.fontFamily="'Noto Sans JP', sans-serif"
}

function changeFontsMontagu() {
  document.querySelector(".all").style.fontFamily="'Montagu Slab', serif"
}