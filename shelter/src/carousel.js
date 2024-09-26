const BTN_LEFT = document.querySelector("#btn-left");
const BTN_RIGHT = document.querySelector("#btn-right");
const CAROUSEL = document.querySelector("#carousel");
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_RIGHT = document.querySelector("#item-right");
const ITEM_ACTIVE = document.querySelector("#item-active");
const ITEM_HIDDEN = document.querySelector("#item-hidden");
const ITEM1 = document.querySelector("#item1");
const ITEM2 = document.querySelector("#item2");
const ITEM3 = document.querySelector("#item3");
const ITEM4 = document.querySelector("#item4");
const ITEM5 = document.querySelector("#item5");
const ITEM6 = document.querySelector("#item6");
const ITEM7 = document.querySelector("#item7");
const ITEM8 = document.querySelector("#item8");
let numPets = 3;

let arr = [ITEM1, ITEM2, ITEM3, ITEM4, ITEM5, ITEM6, ITEM7, ITEM8];
let arr2 = [0, 0, 0];


function updateSize() {
  if (window.innerWidth < 768){
    ITEM_ACTIVE.innerHTML = "";
    ITEM_LEFT.innerHTML = "";
    ITEM_LEFT.append(arr[3]);
    ITEM_ACTIVE.append(arr[0]);
    numPets = 1;
  }
  else if (window.innerWidth < 1200) {
    ITEM_ACTIVE.innerHTML = "";
    ITEM_LEFT.innerHTML = "";
    ITEM_LEFT.append(arr[2], arr[3]);
    ITEM_ACTIVE.append(arr[0], arr[1]);
    numPets = 2;
  }
  else {
    ITEM_ACTIVE.innerHTML = "";
    ITEM_LEFT.innerHTML = "";
    ITEM_LEFT.append(arr[3], arr[4], arr[5]);
    ITEM_ACTIVE.append(arr[0], arr[1], arr[2]);
    numPets = 3;
  }
}

updateSize();
window.addEventListener("resize", updateSize);



const moveLeft = () => {
  CAROUSEL.classList.add("transition-left");
  BTN_LEFT.removeEventListener("click", moveLeft);
  BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
  CAROUSEL.classList.add("transition-right");
  BTN_LEFT.removeEventListener("click", moveLeft);
  BTN_RIGHT.removeEventListener("click", moveRight);
};


function random(arr, arr1, counter, item){
  while (counter < numPets) {
    let index = _.random(0, 7);
    if (
      arr[index] != arr1[0] &&
      arr[index] != arr1[1] &&
      arr[index] != arr1[2] &&
      arr[index] != arr2[0] &&
      arr[index] != arr2[1] &&
      arr[index] != arr2[2]
    ) {
      item.append(arr[index].cloneNode(true));
      arr2[counter] = arr[index];
      counter++;
    }
  }
}



function replaceRight() {
  let arr1 = document.querySelectorAll("#item-active >.item");
  let counter = 0;
  ITEM_RIGHT.innerHTML = "";
  random(arr, arr1, counter, ITEM_RIGHT);
  moveRight();
  BTN_RIGHT.removeEventListener("click", replaceRight);
  BTN_LEFT.removeEventListener("click", replaceLeft);
}

function replaceLeft() {
  let arr1 = document.querySelectorAll("#item-active >.item");
  let counter = 0;
  ITEM_LEFT.innerHTML = "";
  random(arr, arr1, counter, ITEM_LEFT);
  moveLeft();
  BTN_LEFT.removeEventListener("click", replaceLeft);
  BTN_RIGHT.removeEventListener("click", replaceRight);
}


BTN_LEFT.addEventListener("click", replaceLeft);
BTN_RIGHT.addEventListener("click", replaceRight);



CAROUSEL.addEventListener("animationend", (animationEvent) => {
  if (animationEvent.animationName === "move-left") {
    CAROUSEL.classList.remove("transition-left");
    ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML;
  }

  else {
    CAROUSEL.classList.remove("transition-right");
    ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;

  }

  BTN_LEFT.addEventListener("click", replaceLeft);
  BTN_RIGHT.addEventListener("click", replaceRight);
});
