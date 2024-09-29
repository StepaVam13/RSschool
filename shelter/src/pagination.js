const ITEM1 = document.querySelector("#item1");
const ITEM2 = document.querySelector("#item2");
const ITEM3 = document.querySelector("#item3");
const ITEM4 = document.querySelector("#item4");
const ITEM5 = document.querySelector("#item5");
const ITEM6 = document.querySelector("#item6");
const ITEM7 = document.querySelector("#item7");
const ITEM8 = document.querySelector("#item8");
const CAROUSEL = document.querySelector("#carousel");
const BTN_LEFT = document.querySelector("#left-button");
const BTN_RIGHT = document.querySelector("#right-button");
const BTN_END = document.querySelector("#end-button");
const BTN_START = document.querySelector("#start-button");
const NUMBER = document.querySelector(".number");

let arr = [ITEM1, ITEM2, ITEM3, ITEM4, ITEM5, ITEM6, ITEM7, ITEM8];
let result = [];
let numberPage = 1;
let maxNumberPages = 6;
let numberPets = 8;



function updateSize() {
	if (window.innerWidth < 768) {
		maxNumberPages = 16;
		numberPets = 3;
	}
	else if (window.innerWidth < 1280) {
		maxNumberPages = 8;
		numberPets = 6;
	}
	else {
		maxNumberPages = 6;
		numberPets = 8;
	}
	sortedPets();
	numberPage = 1
	NUMBER.innerHTML = '';
	NUMBER.append(numberPage);
	replaceItem(1);
	inactiveButton(BTN_LEFT, BTN_START);
	activeButton(BTN_RIGHT, BTN_END);
}



function sortedPets() {
	result = [];
	for (let i = 0; i < maxNumberPages; i++) {
		let arr2 = new Array(numberPets).fill(8)
		let counter = 0;
		while (counter < numberPets) {
			let index = _.random(0, 7);
			if (
				arr[index] != arr2[0] &&
				arr[index] != arr2[1] &&
				arr[index] != arr2[2] &&
				arr[index] != arr2[3] &&
				arr[index] != arr2[4] &&
				arr[index] != arr2[5] &&
				arr[index] != arr2[6] &&
				arr[index] != arr2[7]
			) {
				result.push(arr[index]);
				arr2[counter] = arr[index];
				counter++;
			}
		}
	}
}


updateSize();
window.addEventListener("resize", updateSize);



function replaceItem() {
	CAROUSEL.innerHTML = ""
	for (let i = (numberPage - 1) * numberPets; i < numberPage * numberPets; i++){
		CAROUSEL.append(result[i].cloneNode(true));
	}
}

function activeButton(item1, item2) {
	item1.classList.remove("inactiveButton");
	item1.classList.add("activeButton");
	item2.classList.remove("inactiveButton");
	item2.classList.add("activeButton");
}

function inactiveButton(item1, item2) {
	item1.classList.remove("activeButton");
	item1.classList.add("inactiveButton");
	item2.classList.remove("activeButton");
	item2.classList.add("inactiveButton");
}



BTN_RIGHT.addEventListener("click", () => {
	if (numberPage > 0 && numberPage < maxNumberPages) {
		numberPage++;
		NUMBER.innerHTML = '';
		NUMBER.append(numberPage);
		replaceItem();
		activeButton(BTN_LEFT, BTN_START);
	}
	if (numberPage == maxNumberPages) {
		inactiveButton(BTN_RIGHT, BTN_END);
	}
});

BTN_LEFT.addEventListener("click", () => {
	if (numberPage > 1 && numberPage < maxNumberPages + 1) {
		numberPage--;
		NUMBER.innerHTML = '';
		NUMBER.append(numberPage);
		replaceItem();
		activeButton(BTN_RIGHT, BTN_END);
	}
	if(numberPage == 1) {
		inactiveButton(BTN_LEFT, BTN_START);
	}
});

BTN_END.addEventListener("click", () => {
	if (numberPage != maxNumberPages) {
		numberPage = maxNumberPages;
		NUMBER.innerHTML = '';
		NUMBER.append(numberPage);
		replaceItem();
		activeButton(BTN_LEFT, BTN_START);
	}
	inactiveButton(BTN_RIGHT, BTN_END);
});

BTN_START.addEventListener("click", () => {
	if (numberPage != 1) {
		numberPage = 1;
		NUMBER.innerHTML = '';
		NUMBER.append(numberPage);
		replaceItem();
		activeButton(BTN_RIGHT, BTN_END);
	}
	inactiveButton(BTN_LEFT, BTN_START);
});


CAROUSEL.innerHTML = '';
NUMBER.innerHTML = '';
NUMBER.append(numberPage);
replaceItem(1);
