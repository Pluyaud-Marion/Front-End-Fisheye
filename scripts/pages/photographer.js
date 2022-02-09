/* eslint-disable no-undef */
//Mettre le code JavaScript lié à la page photographer.html

async function getElementsPhotographers(){
	let photographers = [];
	
	await fetch("./data/photographers.json")
		.then(response => response.json())
		.then(data => photographers = data.photographers)
		.catch(error => error);

	return ({
		photographers: [...photographers]});
}

async function getMediaPhotographers(){
	let media = [];
	
	await fetch("./data/photographers.json")
		.then(response => response.json())
		.then(data => {
			media = data.media;
			//console.log(media);
		})
		.catch(error => error);

	return ({
		media: [...media]});
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

async function displayMediaPhotographers(photographers) {
	const urlPhotographer = window.location.search;
	const urlSearchParams = new URLSearchParams(urlPhotographer);
	const idPhotographer = Number(urlSearchParams.get("id")); // l'id du photographe visité et le passe de string à number
	const photographGalery = document.querySelector(".photograph-galery");


	for (photographer of photographers) {
		if (idPhotographer === photographer.photographerId) { // cible le photographe
			const tagArticle = document.createElement("article");
			photographGalery.appendChild(tagArticle);

			const tagImg = document.createElement("img");
			tagArticle.appendChild(tagImg);
			tagImg.src = `assets/images/${photographer.photographerId}/${photographer.image}`;

			const divContainerTitleLike = document.createElement("div");
			tagArticle.appendChild(divContainerTitleLike);
			divContainerTitleLike.className = "container-title-like";

			const tagTitle = document.createElement("p");
			divContainerTitleLike.appendChild(tagTitle);
			tagTitle.innerHTML = photographer.title;

			const divContainerLike = document.createElement("div");
			divContainerTitleLike.appendChild(divContainerLike);
			divContainerLike.className = "container-like";

			const tagLikes = document.createElement("span");
			divContainerLike.appendChild(tagLikes);
			tagLikes.innerHTML = photographer.likes;

			const like = document.createElement("i");
			divContainerLike.appendChild(like);
			like.className = "fas fa-heart";

		}
	}
}
async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getElementsPhotographers();
	const { media } = await getMediaPhotographers();
	displayDataPhotographers(photographers);
	displayMediaPhotographers(media);
//	getMediaPhotographers();
}

init();
