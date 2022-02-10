/* eslint-disable no-undef */
//Mettre le code JavaScript lié à la page photographer.html

const urlPhotographer = window.location.search;
const urlSearchParams = new URLSearchParams(urlPhotographer);
const idPhotographer = Number(urlSearchParams.get("id")); 

const arrayLikes = [];
//const arrayTitle = [];

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
	const photographHeader = document.querySelector(".photograph-header");
	const containerButtonInfos = document.querySelector(".container-button-infos");

	for (photographer of photographers) {
		if (idPhotographer === photographer.id) { // cible le photographe avec l'id dans l'url 
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
	const photographGalery = document.querySelector(".photograph-galery");
	for (item of media) {
		if (idPhotographer === item.photographerId) { // cible le photographe avec l'id dans l'url 
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

			//	arrayTitle.push(item.title); // remplissage du tableau arrayTitle
			

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
	//console.log(arrayTitle);
}

function addLike(media){
	for (item of media) {
		if (idPhotographer === item.photographerId){ //cible le photographe
			const tagNumberLike = document.getElementById(`${item.id}`);
			
			let numberLikes = Number(tagNumberLike.innerHTML); //transforme en number le numbre de likes
			
			const idTagNumberLike = tagNumberLike.id;
			const iconLike = document.getElementById(`like-${item.id}`);
			const idIconLike = iconLike.id.split("-"); //retourne une tableau autour du - le 2ème élément du tableau est l'id
		
			iconLike.addEventListener("click", () => {
				if(idIconLike[1] === idTagNumberLike){
					tagNumberLike.innerHTML++;
				}
			});
			//console.log(numberLikes);
			arrayLikes.push(numberLikes); // push dans le tableau le nombre de likes
		}
	}
}


function cardLikesAndPrice(photographers) {
	const tagPriceTotalLike = document.querySelector(".price-total-like");
	// création span prix
	const tagPrice = document.createElement("span");
	tagPriceTotalLike.appendChild(tagPrice);

	//création div globale nb likes + icone
	const tagContainer = document.createElement("div");
	tagPriceTotalLike.appendChild(tagContainer);
	tagContainer.className = "likes";

	// création span total des likes
	const tagTotalLike = document.createElement("span");
	tagContainer.appendChild(tagTotalLike);

	const like = document.createElement("i");
	tagContainer.appendChild(like);
	like.className = "fas fa-heart";

	// boucle sur chaque photographe pour récupérer dans le Json le prix
	for(photographer of photographers) {
		if (idPhotographer === photographer.id){ //cible le photographe
			tagPrice.innerHTML = photographer.price + "€ / jour";
		}
	}

	// reducer pour additionner tous les likes (dans le tableau)
	const reducer = (previousValue, currentValue) => previousValue + currentValue;
	const totalLikes = arrayLikes.reduce(reducer);
	//console.log(totalLikes);
	tagTotalLike.innerHTML = totalLikes;
}

function sort(media) {
	const containerMedia = document.querySelector(".photograph-galery");

	const select = document.querySelector("#select-sort");
	select.value = -1; // 1er n'est pas affiché par défaut
			
	select.addEventListener("change", () => {
		let valueSelect = select.value; // récupération de la valeur sélectionnée
				
		if (valueSelect === "popularity") {
			//vide les médias
			containerMedia.innerHTML = "";
			/*
					Méthode sort qui prend en paramètre une fonction de calcul par ordre inversé - retourne un nouveau tableau classé du plus petit au plus grand
					Trie tous les médias du + grand au + petit like
					*/
			media.sort((a, b) =>{
				return b.likes - a.likes;
			});
			//appel de la fonction qui affiche les médias = ne fait afficher qu
			displayMediaPhotographers(media);
					
		} else if (valueSelect === "date") {
			containerMedia.innerHTML = "";
			
			media.sort((a,b) => { //tri par date
				return new Date(a.date) - new Date(b.date);
			});
			displayMediaPhotographers(media);
		} else {
			containerMedia.innerHTML = "";
	
			media.sort((a,b) => {
				if (a.title < b.title)
					return -1;
			});
			displayMediaPhotographers(media);
		
			
		}
	});
	
}


async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getElementsPhotographers();
	const { media } = await getMediaPhotographers();
	displayDataPhotographers(photographers);
	displayMediaPhotographers(media);
	addLike(media);
	cardLikesAndPrice(photographers);
	sort(media);
}

init();
