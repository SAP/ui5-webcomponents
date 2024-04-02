import "@ui5/webcomponents/dist/SplitButton.js";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/save.js";
import "@ui5/webcomponents-icons/dist/delete.js";

const menu = [...document.getElementsByTagName("ui5-menu")][0];
const splitBtn = [...document.getElementsByTagName("ui5-split-button")][0];

splitBtn.addEventListener("arrow-click", function() {
	menu.open = !menu.open;
	menu.opener = splitBtn;
	splitBtn.activeArrowButton = menu.open;
});

menu.addEventListener("after-close", function() {
	splitBtn.activeArrowButton = false;
});