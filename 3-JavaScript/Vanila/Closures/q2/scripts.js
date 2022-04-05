function changeFontSize(idName) {
	let show = document.getElementById("sizeActual");
	let newSize = document.getElementById(idName);
	let newValue = 16;
	function increase() {
		newValue++;
		newSize.style.fontSize = newValue + 'px';
		show.innerText = 'Tamanho atual: ' + newValue + 'px';
	}
	
	function decrease() {
		newValue--;
		newSize.style.fontSize = newValue + 'px';
		show.innerText = 'Tamanho atual: ' + newValue + 'px';
	}

	return {increase: increase,
			decrease: decrease};
}

let change = changeFontSize('history');

function increaseSize() {
	change.increase();
}

function decreaseSize() {
	change.decrease();
}

function dropBox() {
	let box = document.getElementById("buttons");
	if (box.style.display == "none"){
	  box.style.display = "flex";
	} else {
	  box.style.display = "none";
	}
  }