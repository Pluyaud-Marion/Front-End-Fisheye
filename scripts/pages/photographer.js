/* eslint-disable no-undef */
//Mettre le code JavaScript lié à la page photographer.html

async function getElements(){
	let photographers = [];
	await fetch("../../../data/photographers.json")
		.then(response => response.json())
		.then(data => photographers = data.photographers)
		.catch(error => error);

	return ({
		photographers: [...photographers]});
}

async function displayDataPhotographers(photographers) {
	const urlPhotographer = window.location.search;
	const urlSearchParams = new URLSearchParams(urlPhotographer);
	const idPhotographer = Number(urlSearchParams.get("id")); // l'id du photographe visité et le passe de string à number
	console.log(idPhotographer);

	const photographHeader = document.querySelector(".photograph-header");

	for (photographer of photographers) {
		if (idPhotographer === photographer.id) { // cible le photographe
			const tagH1 = document.createElement("h1");
			photographHeader.appendChild(tagH1);
			tagH1.innerHTML = photographer.name; 
      
			const tagCountry = document.createElement("span");
			photographHeader.appendChild(tagCountry);
			tagCountry.innerHTML = photographer.country;

			const tagCity = document.createElement("span");
			photographHeader.appendChild(tagCity);
			tagCity.innerHTML = photographer.city;

			const tagLine = document.createElement("p");
			photographHeader.appendChild(tagLine);
			tagLine.innerHTML = photographer.tagline;

			const tagImg = document.createElement("img");
			photographHeader.appendChild(tagImg);
			tagImg.src = `assets/photographers/${photographer.portrait}`; //chemin pour la photo du portrait + le nom de la photo récupéré du fetch
			tagImg.className = "photo-page-photographe"; //ajout de la classe pour le style
			
		}

	}

}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getElements();
	displayDataPhotographers(photographers);

}

init();
