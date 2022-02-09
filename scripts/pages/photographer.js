/* eslint-disable no-undef */
//Mettre le code JavaScript lié à la page photographer.html

async function getElements(){
	let photographers = [];
	await fetch("./data/photographers.json")
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
	const photographHeader = document.querySelector(".photograph-header");
	const containerButtonInfos = document.querySelector(".container-button-infos");

	for (photographer of photographers) {
		if (idPhotographer === photographer.id) { // cible le photographe
			const divHeader = document.createElement("div");
			containerButtonInfos.appendChild(divHeader);
			divHeader.className = "container-infos";


			const tagH1 = document.createElement("h1");
			divHeader.appendChild(tagH1);
			tagH1.innerHTML = photographer.name; 

			const tagCity = document.createElement("span");
			divHeader.appendChild(tagCity);
			tagCity.innerHTML = photographer.city + ", ";
			tagCity.className = "city-country";
      
			const tagCountry = document.createElement("span");
			divHeader.appendChild(tagCountry);
			tagCountry.innerHTML = photographer.country;
			tagCountry.className = "city-country";

			const tagLine = document.createElement("p");
			divHeader.appendChild(tagLine);
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
