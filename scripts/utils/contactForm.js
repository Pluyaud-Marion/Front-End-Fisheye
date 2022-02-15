/* eslint-disable no-unused-vars */
const mainTag = document.querySelector("#main");
const header = document.querySelector("header");
const modal = document.getElementById("contact_modal");
const photographHeader = document.querySelector(".photograph-header");
const submitButton = document.querySelector("#button-submit");
const errorFirstname = document.getElementById("error-firstname");
const errorLastname = document.getElementById("error-lastname");
const errorEmail = document.getElementById("error-email");
const errorMessage = document.getElementById("error-message");
const regexName = /^[a-zA-ZÀ-ÿ\s_-]{2,60}$/;

// let firstname = document.getElementById("firstname").value;
// let lastname = document.getElementById("lastname").value;
// let email = document.getElementById("email").value;
// let message = document.getElementById("text").value;

function main() {
	//submitForm();
	validateForm();
}

function displayModal() {
	modal.style.display = "block";

	mainTag.style.backgroundColor = "rgba(196, 196, 196, 0.4)";
	header.style.backgroundColor = "rgba(196, 196, 196, 0.4)";
	photographHeader.style.backgroundColor = "rgba(196, 196, 196, 0)";

	const title = document.querySelector(".h2");
	const tagNamePhotographer = document.createElement("span");
	title.appendChild(tagNamePhotographer);

	//récupération du nom du photographe dans LS
	const namePhotographer = localStorage.getItem("name");
	tagNamePhotographer.innerHTML = namePhotographer;
}

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

function closeModal() {
	modal.style.display = "none";
	photographHeader.style.backgroundColor = "#FAFAFA";
	mainTag.style.backgroundColor = "#FFFFFF";
	header.style.backgroundColor = "#FFFFFF";

	localStorage.clear();
	clearForm();
}

function submitForm() {
	modal.style.display = "none";
	photographHeader.style.backgroundColor = "#FAFAFA";
	mainTag.style.backgroundColor = "#FFFFFF";
	header.style.backgroundColor = "#FFFFFF";
	localStorage.clear();
	clearForm();
}

function validateForm() {
	const regexEmail = /^[^@\s]{2,30}@[^@\s]{2,30}\.[^@\s]{2,5}$/;
	submitButton.addEventListener("click", event => {
		event.preventDefault();
		let firstname = document.getElementById("firstname").value;
		let lastname = document.getElementById("lastname").value;
		let email = document.getElementById("email").value;
		let message = document.getElementById("text").value;

		checkForm(firstname, errorFirstname, regexName);
		checkForm(lastname, errorLastname, regexName);
		checkForm(email, errorEmail, regexEmail);
		checkMessage(message, errorMessage);

		if(checkForm(firstname, errorFirstname, regexName) && checkForm(lastname, errorLastname, regexName) && checkForm(email, errorEmail, regexEmail) && checkMessage(message, errorMessage)) {
			console.log("Firstname : ", firstname);
			console.log("Lastname : ", lastname);
			console.log("Email : ", email);
			console.log("Message : ", message);
			submitForm();
		} 
	});
}

function checkMessage(contact, error) {
	if(contact.length === 0) {
		error.innerHTML = "Vous devez écrire un message";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
}
function checkForm(contact, error, regex){
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