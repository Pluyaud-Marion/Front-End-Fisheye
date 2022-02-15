/* eslint-disable no-unused-vars */
const mainTag = document.querySelector("#main");
const headerGlobalTag = document.querySelector("header");
const modal = document.getElementById("contact_modal");
const photographHeader = document.querySelector(".photograph-header");
const submitButton = document.querySelector("#button-submit");
const errorFirstname = document.getElementById("error-firstname");
const errorLastname = document.getElementById("error-lastname");
const errorEmail = document.getElementById("error-email");
const errorMessage = document.getElementById("error-message");
const regexName = /^[a-zA-ZÀ-ÿ\s_-]{2,60}$/;

function main() {
	validateForm();
}

/*
Déclenchée au click sur bouton "contactez-moi" (dans html)
Fait apparaitre la modale + passe le background du main et du header en gris
Créé un span dans le h2 + y met le nom du photographe récupéré du LS
*/
function displayModal() {
	modal.style.display = "block";

	mainTag.style.backgroundColor = "rgba(196, 196, 196, 0.4)";
	headerGlobalTag.style.backgroundColor = "rgba(196, 196, 196, 0.4)";
	photographHeader.style.backgroundColor = "rgba(196, 196, 196, 0)";

	const title = document.querySelector(".h2");
	const tagNamePhotographer = document.createElement("span");
	title.appendChild(tagNamePhotographer);

	//récupération du nom du photographe dans LS
	const namePhotographer = localStorage.getItem("name");
	tagNamePhotographer.innerHTML = namePhotographer;
}

/*
Vide le formulaire (erreurs + value des inputs)
Appelée au click sur la croix pour fermer + à la soumission du formulaire
*/
function clearForm() {
	let firstname = document.getElementById("firstname");
	let lastname = document.getElementById("lastname");
	let email = document.getElementById("email");
	let message = document.getElementById("text");

	firstname.value = null;
	lastname.value = null;
	email.value = null;
	message.value = null;

	errorFirstname.innerHTML = "";
	errorLastname.innerHTML = "";
	errorEmail.innerHTML = "";
	errorMessage.innerHTML = "";
}

/*
Ferme la modale, appelée au click sur la croix (html)
Retire l'affichage de la modale + passe les backgrounds en blanc
Vide le LS
*/
function closeModal() {
	modal.style.display = "none";
	photographHeader.style.backgroundColor = "#FAFAFA";
	mainTag.style.backgroundColor = "#FFFFFF";
	headerGlobalTag.style.backgroundColor = "#FFFFFF";
	localStorage.clear();
	clearForm();
}

/*
Retire l'affichage de la modale + passe les backgrounds en blanc
Vide le LS
///////////////////////////
par la suite fera la requête post pour la soumission du formulaire
*/
function submitForm() {
	modal.style.display = "none";
	photographHeader.style.backgroundColor = "#FAFAFA";
	mainTag.style.backgroundColor = "#FFFFFF";
	headerGlobalTag.style.backgroundColor = "#FFFFFF";
	localStorage.clear();
	clearForm();
}

/*
Valide le formulaire si vérification ok
Appel de la fonction checkNameMail en lui passant les bons paramètres pour vérifier les 3 champs + la fonction checkMessage pour vérifier le champ du message
Si tout est ok, affiche les console.log et appelle la fonction submitForm
*/
function validateForm() {
	const regexEmail = /^[^@\s]{2,30}@[^@\s]{2,30}\.[^@\s]{2,5}$/;
	submitButton.addEventListener("click", event => {
		event.preventDefault();
		let firstname = document.getElementById("firstname").value;
		let lastname = document.getElementById("lastname").value;
		let email = document.getElementById("email").value;
		let message = document.getElementById("text").value;

		checkNameMail(firstname, errorFirstname, regexName);
		checkNameMail(lastname, errorLastname, regexName);
		checkNameMail(email, errorEmail, regexEmail);
		checkMessage(message, errorMessage);

		if(checkNameMail(firstname, errorFirstname, regexName) && checkNameMail(lastname, errorLastname, regexName) && checkNameMail(email, errorEmail, regexEmail) && checkMessage(message, errorMessage)) {
			console.log("Firstname : ", firstname);
			console.log("Lastname : ", lastname);
			console.log("Email : ", email);
			console.log("Message : ", message);
			submitForm();
		} 
	});
}

/*
Fait les vérifications du champ message 
*/
function checkMessage(contact, error) {
	if(contact.length === 0) {
		error.innerHTML = "Vous devez écrire un message";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
}
/*
Fait les vérifications des champs prénom, nom et email
*/
function checkNameMail(contact, error, regex){
	if(contact.length === 0) {
		error.innerHTML = "Veuillez renseigner ce champ";
		return false;
	} else if (!regex.test(contact)) {
		error.innerHTML = "Format incorrect";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
}

main();