import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/StandardListItem.js";

import "@ui5/webcomponents-icons/dist/nutrition-activity.js";

function template(i) {
    var li = document.createElement("ui5-li");
    li.textContent = "Fruit name";
    li.description = "the description goes here " + i;
    li.additionalText = "Available";
    li.additionalTextState = "Success";
    li.icon = "nutrition-activity";
    return li;
}
function insertItems(el, num) {
    for (var i = 0; i < num; i++) {
        el.appendChild(template(i));
    }
}
infiniteScrollEx.addEventListener("load-more", (e) => {
    var el = infiniteScrollEx;
    el.busy = true;
    setTimeout(() => {
        insertItems(el, 5);
        el.busy = false;
    }, 200);
});