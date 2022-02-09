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

async function displayMediaPhotographers(media) {
	const urlPhotographer = window.location.search;
	const urlSearchParams = new URLSearchParams(urlPhotographer);
	const idPhotographer = Number(urlSearchParams.get("id")); // l'id du photographe visité et le passe de string à number
	const photographGalery = document.querySelector(".photograph-galery");


	for (item of media) {
		if (idPhotographer === item.photographerId) { // cible le photographe
			console.log(item.photographerId);
			const tagArticle = document.createElement("article");
			photographGalery.appendChild(tagArticle);

			const tagImg = document.createElement("img");
			tagArticle.appendChild(tagImg);
			tagImg.src = `assets/images/${item.photographerId}/${item.image}`;

			const divContainerTitleLike = document.createElement("div");
			tagArticle.appendChild(divContainerTitleLike);
			divContainerTitleLike.className = "container-title-like";

			const tagTitle = document.createElement("p");
			divContainerTitleLike.appendChild(tagTitle);
			tagTitle.innerHTML = item.title;

			const divContainerLike = document.createElement("div");
			divContainerTitleLike.appendChild(divContainerLike);
			divContainerLike.className = "container-like";

			const tagLikes = document.createElement("span");
			divContainerLike.appendChild(tagLikes);
			tagLikes.innerHTML = item.likes;
			tagLikes.id = `${item.id}`;
			
			const like = document.createElement("i");
			divContainerLike.appendChild(like);
			like.className = "fas fa-heart";
			like.id = `like-${item.id}`;

		}
	}
}


function addLike(media){
	const urlPhotographer = window.location.search;
	const urlSearchParams = new URLSearchParams(urlPhotographer);
	const idPhotographer = Number(urlSearchParams.get("id")); 
	
	for (item of media) {
		if (idPhotographer === item.photographerId){ //cile le photographe

			
			const tagNumberLike = document.getElementById(`${item.id}`);

			console.log("balise span nb de like",tagNumberLike);

			//let numberLike = Number(tagNumberLike.innerText);
			//console.log("nombre de likes", numberLike);

			const idTagNumberLike = tagNumberLike.id;
			//console.log("id de la balise span nombre", idTagNumberLike);
	
			const iconLike = document.getElementById(`like-${item.id}`);
			//console.log("balise i du coeur", iconLike);

			const idIconLike = iconLike.id.split("-"); //retourne une tableau autour du - le 2ème élément du tableau est l'id
			//console.log(idIconLike[1]);
			//console.log("id de la balise coeur", idIconLike);
		
			iconLike.addEventListener("click", () => {
				console.log(idIconLike[1]);
				console.log(idTagNumberLike);
				if(idIconLike[1] === idTagNumberLike){
					tagNumberLike.innerHTML++;
				}
			});
		}
	}
}
async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getElementsPhotographers();
	const { media } = await getMediaPhotographers();
	displayDataPhotographers(photographers);
	displayMediaPhotographers(media);
	addLike(media);
}

init();
