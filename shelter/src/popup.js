const POPUP = document.querySelector(".popup");
const NAME = document.getElementById('name');
const BREED = document.getElementById('breed');
const TYPE = document.getElementById('type');
const DESCRIPTION = document.getElementById('description');
const AGE = document.getElementById('age');
const INOCULATIONS = document.getElementById('inoculations');
const DISEASES = document.getElementById('diseases');
const PARASITES = document.getElementById('parasites');
const IMG = document.getElementById("img");


function openPopup() {
  document.querySelector("body").classList.toggle("fix");
  POPUP.classList.toggle("open");
  document.querySelector(".close").addEventListener("click", openPopup, { once: true });
}


function closeEsc() {
  document.onkeydown = function(evt) {
    if (evt.keyCode == 27 && document.querySelector('.open')) {
      POPUP.classList.toggle("open");
      document.querySelector("body").classList.toggle("fix");
    }
  };
}


function innerPetsInfo(event, pets) {
  let petsIndex = pets[event.target.id];
  IMG.src = petsIndex.img;
  NAME.innerHTML = petsIndex.name;
  BREED.innerHTML = petsIndex.type + ' - ' + petsIndex.breed;
  DESCRIPTION.innerHTML = petsIndex.description;
  AGE.innerHTML = petsIndex.age;
  INOCULATIONS.innerHTML = petsIndex.inoculations;
  DISEASES.innerHTML = petsIndex.diseases;
  PARASITES.innerHTML = petsIndex.parasites;
}

function importFile() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'src/pets.json', false);
  xhr.send();
  let file = xhr.responseText || '';
  let pets = JSON.parse(file);
  return pets
}


carousel.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  openPopup();
  innerPetsInfo(event, importFile());
  closeEsc();
})
