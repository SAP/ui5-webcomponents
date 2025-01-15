import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/BusyIndicator.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";

var busyIndicator = document.querySelector("ui5-busy-indicator");
var list = document.querySelector("ui5-list");
var fetchBtn = document.querySelector("ui5-button");

fetchBtn.addEventListener("click", event => {
    busyIndicator.active = true;

    setTimeout(() => {
        ["UI5", "Web", "Components"].forEach(title => {
            const el = document.createElement("ui5-li");
            el.textContent = title;
            list.appendChild(el);
        });

        busyIndicator.active = false;
    }, 3000);
});