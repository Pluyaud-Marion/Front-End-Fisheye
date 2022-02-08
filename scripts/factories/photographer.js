/* eslint-disable no-unused-vars */

function photographerFactory(data) {
	const { name, portrait, city, country, price, tagline, id } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		//création du a dans balise section avec href de base
		const tagPhotographerSection = document.querySelector(".photographer_section");
		const tagA = document.createElement("a");
		tagA.href = "photographer.html";
		tagPhotographerSection.appendChild(tagA);
		
		// création de l'article avec id dans la balise A
		const tagArticle = document.createElement( "article" );
		tagArticle.id = `article-${id}`;
		tagA.appendChild(tagArticle);
		
		//création des balises à mettre dans balise section
		const img = document.createElement( "img" );
		img.setAttribute("src", `../../${picture}`);
		const h2 = document.createElement( "h2" );
		h2.textContent = name;
		const tagCity = document.createElement( "span" );
		tagCity.innerHTML = city;
		const tagCountry = document.createElement( "span" );
		tagCountry.innerHTML = country;
		const tagPrice = document.createElement( "span");
		tagPrice.innerHTML = price + "€/jour";
		const pTagline = document.createElement( "p" );
		pTagline.innerHTML =  tagline;
		
		// ajout des balises dans la balise article
		tagArticle.appendChild(img);
		tagArticle.appendChild(h2);
		tagArticle.appendChild(tagCity);
		tagArticle.appendChild(tagCountry);
		tagArticle.appendChild(pTagline);
		tagArticle.appendChild(tagPrice);

		// au click sur l'article appel de la fonction qui affiche un photographe -> insertion de l'id dans l'url
		tagArticle.addEventListener("click", getOnePhotographer());

		return (tagA);

		function getOnePhotographer() {
			tagA.href += "?id=" + id;
		}
		
	}
	return { name, picture, city, country, price, tagline, getUserCardDOM };
}

