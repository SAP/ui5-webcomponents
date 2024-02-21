import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/SuggestionItem.js";
import "@ui5/webcomponents/dist/StandardListItem.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";

import "@ui5/webcomponents-icons/dist/value-help.js";
import "@ui5/webcomponents-icons/dist/search.js";

const valueHelpInput = document.getElementById("valueHelpInput");
const valueHelpIcon = document.getElementById("valueHelpIcon");
const dialog = document.getElementById("dialog");
const dialogSearchInput = document.getElementById("dialogSearchInput");
const dialogSearchIcon = document.getElementById("dialogSearchIcon");
const clearButton = document.getElementById("clearButton");
const cancelButton = document.getElementById("cancelButton");
const itemsList = document.getElementById("itemsList");
let suggestionItems = [];

const loadSuggestions = async () => {
    const response = await fetch("../assets/data/products.json");
    const products = await response.json();
    const query = valueHelpInput.value.toLowerCase();

    if (query) {
        suggestionItems = products
            .filter((product) => {
                return product.name.toLowerCase().indexOf(query) === 0;
            })
            .map((product) => {
                return product.name;
            })
            .sort((a, b) => {
                return a.localeCompare(b);
            })
            .slice(0, 10);
    }
    [].slice.call(valueHelpInput.children, 1).forEach((item) => {
        valueHelpInput.removeChild(item);
    });
    suggestionItems.forEach((item) => {
        const li = document.createElement("ui5-suggestion-item");
        li.text = item;
        valueHelpInput.appendChild(li);
    });
}
const showDialog = () => {
    dialogSearchInput.value = valueHelpInput.value;
    loadList();
    if (screen.width <= 768) {
        dialog.setAttribute("stretch", "");
    }
    dialog.show();
    // Required by UX as the VH dialog's popup content has no padding in UI5.
    dialog.shadowRoot.querySelector(".ui5-popup-content").style.padding = 0;
    dialog.shadowRoot.querySelector(".ui5-popup-content").style.height = "100vw";
}
const closeDialog = () => {
    dialog.close();
}
const loadList = async () => {
    const response = await fetch("../assets/data/products.json");
    const products = await response.json();
    const query = dialogSearchInput.value.toLowerCase();

    itemsList.innerHTML = "";
    products
        .filter((product) => {
            return product.name.toLowerCase().indexOf(query) === 0;
        })
        .sort((a, b) => {
            return a.name.localeCompare(b.name);
        })
        .forEach((item) => {
            const li = document.createElement("ui5-li");
            li.innerHTML = item.name;
            li.image = item.productPicUrl;
            li.description = item.productId;
            itemsList.appendChild(li);
        });
}
const handleItemClick = event => {
    const item = event.detail.item;
    valueHelpInput.setAttribute("value", item.innerHTML);
    dialog.close();
}
const clearQuery = () => {
    dialogSearchInput.setAttribute("value", "");
    loadList();
}

valueHelpInput.addEventListener("input", loadSuggestions);
valueHelpIcon.addEventListener("click", showDialog);
dialogSearchInput.addEventListener("change", loadList);
dialogSearchIcon.addEventListener("click", loadList);
clearButton.addEventListener("click", clearQuery);
cancelButton.addEventListener("click", closeDialog);
itemsList.addEventListener("item-click", handleItemClick);