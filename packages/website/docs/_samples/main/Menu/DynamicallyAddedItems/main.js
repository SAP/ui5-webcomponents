import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents/dist/Button.js";

import "@ui5/webcomponents-icons/dist/add-document.js";
import "@ui5/webcomponents-icons/dist/add-folder.js";
import "@ui5/webcomponents-icons/dist/open-folder.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";

const btnOpenBasic = document.getElementById("btnOpenBasic");
const menuSubs = document.getElementById("menuSubs");
const btnAddOpenerDelay = document.getElementById("btnAddOpenerDelay");
const delayMenu = document.getElementById("delaymenu");


btnAddOpenerDelay.addEventListener("click", function() {
    delayMenu.open = !delayMenu.open;
});

btnOpenBasic.addEventListener("click", function() {
    menuSubs.open = !menuSubs.open;
});

const addItemsDynamically = (menu) => {
    setTimeout(function() {
        menu.loading = false;
        menu.loadingDelay = 0;
        let oneNode = document.createElement("ui5-menu-item");
        oneNode.text =  "Open from Amazon Cloud";
        let twoNode = document.createElement("ui5-menu-item");
        twoNode.text = "Open from Google Cloud";
        menu.append(oneNode, twoNode);
        menu.focus();
    }, 1000);
}

delayMenu.addEventListener("ui5-before-open", function() {
    if (delayMenu && !delayMenu.children.length) {
        addItemsDynamically(delayMenu);
    }
});

menuSubs.addEventListener("ui5-before-open", function(event) {
    const item = event.detail.item;
    if (item && !item.children.length) {
        addItemsDynamically(item);
    }
});