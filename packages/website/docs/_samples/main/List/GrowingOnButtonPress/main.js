import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";

import "@ui5/webcomponents-icons/dist/nutrition-activity.js";

let itemsLoaded = 0;
const itemToLoad = 5;
const growingList = document.querySelector("#growingList");
const listItemTemplate = (index) => {
    var li = document.createElement("ui5-li");
    li.textContent = "Fruit name";
    li.description = "the description goes here " + index;
    li.additionalText = "Available";
    li.additionalTextState = "Positive";
    li.icon = "nutrition-activity";
    return li;
}

const insertItems = (list) => {
    for (var i = itemsLoaded; i < itemsLoaded + itemToLoad; i++) {
        list.appendChild(listItemTemplate(i));
    }
    itemsLoaded+=itemToLoad;
}

growingList.addEventListener("load-more", (e) => {
    growingList.loading = true;
    
    setTimeout(() => {
        insertItems(growingList);
        growingList.loading = false;
    }, 1500);
});