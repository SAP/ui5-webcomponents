import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";

import "@ui5/webcomponents-icons/dist/add-document.js";
import "@ui5/webcomponents-icons/dist/add-folder.js";
import "@ui5/webcomponents-icons/dist/open-folder.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/journey-arrive.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";

const btnOpenAdditionalText = document.getElementById("btnOpenAdditionalText");
const menuAdditionalText = document.getElementById("menuAdditionalText");

btnOpenAdditionalText.addEventListener("click", function(event) {
    menuAdditionalText.showAt(btnOpenAdditionalText);
});