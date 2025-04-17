import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-fiori/dist/UserMenu.js";
import "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";
import "@ui5/webcomponents-fiori/dist/UserMenuItem.js";

import "@ui5/webcomponents-fiori/dist/ShellBar.js";

import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/da-2.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/official-service.js";

const shellbar = document.getElementById("shellbar");
const menu = document.getElementById("userMenu");

shellbar.addEventListener("ui5-profile-click", (event) => {
	menu.opener = event.detail.targetRef;
	menu.open = true;
});

[...document.querySelectorAll("ui5-toggle-button")].forEach(el => {
	el.addEventListener("click", event => {
		const toggleButton = event.target;
		toggleButton.icon = toggleButton.pressed ? "sap-icon://da-2" : "sap-icon://da";
	});
});