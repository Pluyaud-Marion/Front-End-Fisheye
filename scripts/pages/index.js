/* eslint-disable no-undef */


async function getPhotographers() {
	// Penser à remplacer par les données récupérées dans le json
	
	// const photographers = [
	// 	{
	// 		"name": "Ma data test",
	// 		"id": 1,
	// 		"city": "Paris",
	// 		"country": "France",
	// 		"tagline": "Ceci est ma data test",
	// 		"price": 400,
	// 		"portrait": "account.png"
	// 	},
	// 	{
	// 		"name": "Autre data test",
	// 		"id": 2,
	// 		"city": "Londres",
	// 		"country": "UK",
	// 		"tagline": "Ceci est ma data test 2",
	// 		"price": 500,
	// 		"portrait": "account.png"
	// 	},
	//];
	let photographers = [];
	
	await fetch("./data/photographers.json")
		.then(response => response.json())
		.then(data => photographers = data.photographers)
		.catch(error => error);
	
	console.log(photographers);
		

	return ({
		photographers: [...photographers]});
}

/*
Fonction qui prend en paramètre le tableau des photographes et fait afficher toutes les informations
appelle fonction photographerFactory (factories/photographer.js)
appelle fonction getUserCardDOM(factories/photographer.js)
*/
async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");
	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
	
}

init();


