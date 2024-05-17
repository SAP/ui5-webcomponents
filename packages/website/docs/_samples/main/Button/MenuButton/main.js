import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Menu.js";

import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";

menuButton.accessibilityAttributes = {
	"hasPopup": "menu",
	"expanded": false,
};

menuButton.addEventListener("click", function() {
	openMenu(myMenu, menuButton);
});

menuButton.addEventListener("keydown", function(event) {
	const F4Key = !event.altKey && !event.shiftKey && !event.metaKey && !event.ctrlKey && event.key === "F4";
	const AltArrowDownKey = event.altKey && !event.shiftKey && !event.metaKey && !event.ctrlKey && event.key === "ArrowDown";
	const AltArrowUpKey = event.altKey && !event.shiftKey && !event.metaKey && !event.ctrlKey && event.key === "ArrowUp";

	if (F4Key || AltArrowDownKey || AltArrowUpKey) {
		openMenu(myMenu, menuButton);
	}
});

myMenu.addEventListener("close", function() {
	closeMenu(menuButton);
});

function openMenu(menu, opener) {
	opener.accessibilityAttributes.expanded = true;
	menu.showAt(opener);
}

function closeMenu(opener) {
	opener.accessibilityAttributes = {
		"hasPopup": "menu",
		"expanded": false,
	};
	opener.focus();
}