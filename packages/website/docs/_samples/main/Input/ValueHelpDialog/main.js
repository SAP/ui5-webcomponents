import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/SuggestionItem.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import "@ui5/webcomponents-icons/dist/value-help.js";
import "@ui5/webcomponents-icons/dist/search.js";

const valueHelpInput = document.getElementById("valueHelpInput");
const valueHelpIcon = document.getElementById("valueHelpIcon");
const dialog = document.getElementById("dialog");
const dialogSearchInput = document.getElementById("dialogSearchInput");
const cancelButton = document.getElementById("cancelButton");
const itemsList = document.getElementById("itemsList");
let suggestionItems = [];

let response = null;
let products = null;

const loadInputSuggestions = async () => {
    if (!response) {
        response = await fetch("../assets/data/products.json");
        products = await response.json();
    }
    
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
    loadDialogList();
    dialog.show();
}

const closeDialog = () => {
    dialog.close();
}

const loadDialogList = async () => {
    if (!response) {
        response = await fetch("../assets/data/products.json");
        products = await response.json();
    }

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
            li.description = item.productId;
            itemsList.appendChild(li);
        });
}

const onDialogListItemClick = event => {
    const item = event.detail.item;
    valueHelpInput.setAttribute("value", item.innerHTML);
    dialog.close();
}

valueHelpInput.addEventListener("input", loadInputSuggestions);
valueHelpIcon.addEventListener("click", showDialog);
cancelButton.addEventListener("click", closeDialog);
dialogSearchInput.addEventListener("input", loadDialogList);
itemsList.addEventListener("item-click", onDialogListItemClick);


