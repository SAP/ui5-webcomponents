import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents/dist/Button.js";

import "@ui5/webcomponents-icons/dist/add-document.js";
import "@ui5/webcomponents-icons/dist/add-folder.js";
import "@ui5/webcomponents-icons/dist/open-folder.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/journey-arrive.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/hint.js";
import "@ui5/webcomponents-icons/dist/favorite.js";

const btnOpenEndContent = document.getElementById("btnOpenEndContent");
const menuEndContent = document.getElementById("menuEndContent");
const btnNewAdd = document.getElementById("newAdd");
const btnNewHint = document.getElementById("newHint");
const btnNewFavorite = document.getElementById("newFavorite");

btnOpenEndContent.addEventListener("click", function(event) {
	menuEndContent.opener = btnOpenEndContent;
	menuEndContent.open = !menuEndContent.open;
});

btnNewAdd.addEventListener("click", function(event) {
	alert("Add button pressed");
});

btnNewHint.addEventListener("click", function(event) {
	alert("Hint button pressed");
});

btnNewFavorite.addEventListener("click", function(event) {
	alert("Favorite button pressed");
});
