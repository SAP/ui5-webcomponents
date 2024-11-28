import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents/dist/Button.js";

const btnOpenBasic = document.getElementById("btnOpenBasic");
const menuSubs = document.getElementById("menuSubs");
const btnAddOpenerDelay = document.getElementById("btnAddOpenerDelay");
const delaymenu = document.getElementById("delaymenu");


btnAddOpenerDelay.addEventListener("click", function() {
    delaymenu.open = !delaymenu.open;
});

btnOpenBasic.addEventListener("click", function() {
    menuSubs.open = !menuSubs.open;
});

const addItemsDynamically = (menu) => {
    setTimeout(function() {
        menu.loading = false;
        menu.loadingDelay = 0;
        let oneNode = document.createElement("ui5-menu-item");
        oneNode.setAttribute("text", "Open from Amazon Cloud");
        let twoNode = document.createElement("ui5-menu-item");
        twoNode.setAttribute("text", "Open from Google Cloud");
        menu.append(oneNode, twoNode);
        menu.focus();
    }, 1000);
}

delaymenu.addEventListener("ui5-before-open", function() {
    if (!delaymenu.children) {
        addItemsDynamically(delaymenu);
    }
});

menuSubs.addEventListener("ui5-before-open", function(event) {
    const item = event.detail.item;
    if (!item.children) {
        addItemsDynamically(delaymenu);
    }
});