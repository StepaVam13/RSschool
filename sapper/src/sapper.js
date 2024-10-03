const RECT = document.getElementById("rect");
const RECT0 = document.getElementById("rect0");
const RECT1 = document.getElementById("rect1");
const RECT2 = document.getElementById("rect2");
const RECT3 = document.getElementById("rect3");
const RECT4 = document.getElementById("rect4");
const RECT5 = document.getElementById("rect5");
const BOMBA = document.getElementById("bomba");
const GAME = document.getElementById("game");
const DATA = document.getElementsByClassName("data");
const RESTART_BUTTON = document.getElementById('buttonRestart');

let item = [RECT0, RECT1, RECT2, RECT3, RECT4, RECT5];
let arr = Array(100).fill(RECT0);
let arrGame = [];
let flag = true;
let arrCheck = [];
let check = [-11, -10, -9, -1, 1, 9, 10, 11]



RESTART_BUTTON.addEventListener("click", startGame);

function displayingArray() {
	GAME.innerHTML = "";
	for (let i = 0; i < 100; i++){
		GAME.append(arrGame[i].cloneNode(true));
	}
}

function makeBomb() {
	for (let i = 0, index; i < 10; i++){
		index = Math.floor(Math.random() * 100);
		arr[index] = BOMBA;
	}
}

function makeField() {
	for (let i = 0; i < 100; i++) {
		RECT.setAttribute('id', `${i}`);
		arrGame.push(RECT.cloneNode(true));
	}
}


function purposeСells(name) {
	for (let i = 0, id; i < 100; i++){
		id = 0;
		if (arr[i] == name) {
			continue;
		}
		else if (!i) {
			check = [1, 10, 11];
		}
		else if (i == 9) {
			check = [-1, 9, 10];
		}
		else if (i == 90) {
			check = [-10, -9, 1];
		}
		else if (i == 99) {
			check = [-1, -10, -11];
		}
		else if (0 < i && i < 9) {
			check = [-1, 1, 9, 10, 11];
		}
		else if (90 < i && i < 99) {
			check = [-11, -10, -9, -1, 1];
		}
		else if ((i + 1) % 10 == 1) {
			check = [-10, -9, 1, 10, 11];
		}
		else if((i + 1) % 10 == 0){
			check = [-11, -10, -1, 9, 10];
		}
		else {
			check = [-11, -10, -9, -1, 1, 9, 10, 11]
		}
		for (let ind of check) {
			if (arr[i + ind] == name) {
				id++;
			}
		}

		if (name == BOMBA) {
			arr[i] = item[id];
		}
		else if(id > 0){
			arrGame[i] = arr[i];
		}

	}
}


function openEmptyCells(i) {
	arrGame[i] = arr[i];
	i = parseInt(i)
	if (!i) {
		check = [1, 10];
	}
	else if (i == 9) {
		check = [-1, 10];
	}
	else if (i == 90) {
		check = [-10, 1];
	}
	else if (i == 99) {
		check = [-1, -10];
	}
	else if (0 < i && i < 9) {
		check = [-1, 1, 10];
	}
	else if (90 < i && i < 99) {
		check = [-10, -1, 1];
	}
	else if ((i + 1) % 10 == 1) {
		check = [-10, 1, 10];
	}
	else if((i + 1) % 10 == 0){
		check = [-10, -1, 10];
	}
	else {
		check = [-10, -1, 1, 10]
	}
	for (let ind of check) {
		if (arr[i + ind] == RECT0 && !arrCheck.includes(i + ind)) {
			arrCheck.push(i);
			openEmptyCells(i + ind);
		}
		else if (arr[i + ind] != RECT0) {
			arrGame[i + ind] = arr[i + ind];
		}
	}
}


function checkRect(id) {
	if (arr[id] == RECT0) {
		openEmptyCells(id);
	}
	else if (arr[id] != BOMBA) {
		arrGame[id] = arr[id];
	}
	else {
		for (let i = 0; i < 100; i++){
			if (arr[i] == BOMBA) {
				arrGame[i] = arr[i];
				flag = false;
			}
		}
	}
}

function startGame() {
	arrGame = [];
	flag = true;
	arrCheck = [];
	arr = Array(100).fill(RECT0);
	makeBomb();
	makeField();
	purposeСells(BOMBA);
	displayingArray();

	GAME.onclick = function (event) {
		if (flag) {
			arrIndex = event.target.parentNode.id;
			checkRect(arrIndex);
			displayingArray();
			console.log(arrGame.filter(RECT).length)
			if (arrGame.slice(0).sort().indexOf(RECT) == 99) {
				startGame();
			}
		}
	}
}

startGame();
