import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/CheckBox.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Panel.js";
import "@ui5/webcomponents/dist/Icon.js";

const dialog = document.getElementById("dialog");
dialog.open = true;

const acceptButotn = document.getElementById("acceptButton");
const termsPanel = document.getElementById("termsPanel");
const checkbox = document.getElementById("termsCheck");
let hasScrolledToBottom = false;

acceptButotn.addEventListener("click", function (event) {
	if (!hasScrolledToBottom) {
		event.preventDefault();
		alert("Please scroll to the end of the terms before continuing.");
		return;
	}

	if (!checkbox.checked) {
		event.preventDefault();
		alert("Please accept the terms and conditions to continue.");
	}
});

termsPanel.addEventListener("scroll", function () {
	const scrollTop = termsPanel.scrollTop;
	const clientHeight = termsPanel.clientHeight;
	const scrollHeight = termsPanel.scrollHeight;

	const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

	hasScrolledToBottom = false;
	checkbox.checked = false;

	if (atBottom) {
		hasScrolledToBottom = true;
		checkbox.checked = true;
	}
});