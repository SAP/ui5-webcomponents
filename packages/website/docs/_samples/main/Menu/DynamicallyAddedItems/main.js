import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";

import "@ui5/webcomponents-icons/dist/add-document.js";
import "@ui5/webcomponents-icons/dist/add-folder.js";
import "@ui5/webcomponents-icons/dist/open-folder.js";
import "@ui5/webcomponents-icons/dist/save.js";
import "@ui5/webcomponents-icons/dist/upload-to-cloud.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/journey-arrive.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";

const btnOpenBasic = document.getElementById("btnOpenBasic");
const menuSubs = document.getElementById("menuSubs");
const btnAddOpenerDelay = document.getElementById("btnAddOpenerDelay");
const delaymenu = document.getElementById("delaymenu");


btnAddOpenerDelay.addEventListener("click", function() {
    delaymenu.opener = "btnAddOpenerDelay";
    delaymenu.open = !delaymenu.open;
});

btnOpenBasic.addEventListener("click", function() {
    menuSubs.opener = "btnOpenBasic";
    menuSubs.open = !menuSubs.open;
});

let menuItemsLoaded = false;

delaymenu.addEventListener("ui5-before-open", function(event) {
    if (!menuItemsLoaded) {
        setTimeout(function() {
            delaymenu.removeAttribute("loading");
            delaymenu.removeAttribute("loading-delay");
            let oneNode = document.createElement("ui5-menu-item");
            oneNode.setAttribute("text", "Open from Amazon Cloud");
            let twoNode = document.createElement("ui5-menu-item");
            twoNode.setAttribute("text", "Open from Google Cloud");
            delaymenu.append(oneNode, twoNode);
            menuItemsLoaded = true;
            delaymenu.focus();
        }, 1000);
    }
});

let fetched = false;

menuSubs.addEventListener("ui5-before-open", function(event) {
    const item = event.detail.item;
    if (item && item.text === "Open" && !fetched) {
        setTimeout(function() {
            item.removeAttribute("loading");
            item.removeAttribute("loading-delay");
            let oneNode = document.createElement("ui5-menu-item");
            oneNode.setAttribute("text", "Open from Amazon Cloud");
            let twoNode = document.createElement("ui5-menu-item");
            twoNode.setAttribute("text", "Open from Google Cloud");
            item.append(oneNode, twoNode);
            fetched = true;
            item.focus();
        }, 1000);
    }
});