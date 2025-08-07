import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/CheckBox.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Panel.js";

const dialog = document.getElementById("dialog");
dialog.open = true;

const okButton = document.getElementById("okButton");
const termsPanel = document.getElementById("termsPanel");

okButton.addEventListener("click", function (event) {
	const isScrolledToBottom =
		termsPanel.scrollTop + termsPanel.clientHeight >= termsPanel.scrollHeight - 1;

	if (!isScrolledToBottom) {
		event.preventDefault();
		alert("Please scroll to the end of the terms before continuing.");
	}
});