import "@ui5/webcomponents-fiori/dist/ProfileMenu.js";
import "@ui5/webcomponents-fiori/dist/ProfileMenuAccount.js";
import "@ui5/webcomponents-fiori/dist/ProfileMenuItem.js";

import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/globe.js";
import "@ui5/webcomponents-icons/dist/collaborate.js";
import "@ui5/webcomponents-icons/dist/official-service.js";
import "@ui5/webcomponents-icons/dist/private.js";
import "@ui5/webcomponents-icons/dist/accelerated.js";

const button = document.getElementById("profileMenuButton");
const menu = document.getElementById("profileMenu");

button.addEventListener("click", function () {
	menu.open = true;
});

menu.addEventListener("item-click", function (event) {
	const item = event.detail.item.getAttribute("data-id");

	switch (item) {
		case "setting":
			console.log("Open Setting Dialog");
			break;
		case "privacy-policy":
			console.log("Privacy Policy");
			break;
		case "terms-of-use":
			console.log("Terms of Use");
			break;
		case "account-action1":
			console.log("Product-specific account action 1");
			break;
		case "account-action2":
			console.log("Product-specific account action 2");
			break;
		default:
			console.log("Default");
	}
});

menu.addEventListener("avatar-click", function () {
	console.log("Avatar clicked");
});

menu.addEventListener("manage-account-click", function () {
	console.log("Manage account clicked");
});

menu.addEventListener("add-account-click", function () {
	console.log("Add account clicked");
});

menu.addEventListener("change-account", function (event) {
	console.log("Change account account", event.detail);
});

menu.addEventListener("sign-out-click", function (event) {
	console.log("Sign Out clicked");

	const result = prompt("Sign Out", "Are you sure you want to sign out?");
	if (result) {
		menu.open = false;
	}
	event.preventDefault();
});