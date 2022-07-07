import { chars } from "./char.js";

const textInput = document.getElementById("encoder");
const textArea = document.querySelector("#output__textarea");
const updateBtn = document.querySelector(".form__button");
const copyBtn = document.querySelector(".output__button");
const form = document.querySelector("form");

const getChars = (sentence) => {
	const characters = sentence.split("");
	for (let i = 0; i < characters.length; i++) {
		const char = characters[i];
		if (char in chars) characters[i] = chars[char];
	}
	return characters.join("");
};

const onType = (btn) => {
	return function () {
		btn.disabled = this.value.length === 0;
	};
};

const onFormHandler = (event) => {
	event.preventDefault();
	textArea.value = getChars(textInput.value);
};

const onCopyHandler = () => {
	const value = textArea.value;
	if (value.length === 0) {
		(function () {
			alert("Could not copy");
		})();
		return;
	}
	navigator.clipboard
		.writeText(value)
		.then(() => alert("Copied the text"))
		.catch((err) => alert("Could not copy", err));
};

textInput.addEventListener("input", onType(updateBtn));
form.addEventListener("submit", onFormHandler);
copyBtn.addEventListener("click", onCopyHandler);
