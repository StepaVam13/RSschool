function openBurger() {

	if(document.documentElement.clientWidth < 768) {
		document.querySelector("body").classList.toggle("fix");
		document.querySelector(".burger-menu").classList.toggle("active");
		document.querySelector("nav").classList.toggle("open");
  }

}

document.querySelector(".burger-menu").addEventListener("click", openBurger);
document.querySelector("nav").addEventListener("click", openBurger);
