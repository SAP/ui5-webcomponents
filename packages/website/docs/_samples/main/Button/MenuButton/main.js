import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Menu.js";

import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";

menuButton.accessibilityAttributes = {
	"hasPopup": "menu",
	"expanded": false,
};

menuButton.addEventListener("click", function() {
	menuButton.accessibilityAttributes.expanded = true;
	menu.showAt(menuButton);
});

menu.addEventListener("close", function() {
	menuButton.accessibilityAttributes = {
		"hasPopup": "menu",
		"expanded": false,
	};
	menu.focus();
});