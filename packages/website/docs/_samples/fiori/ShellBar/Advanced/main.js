import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-fiori/dist/UserMenu.js";
import "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";
import "@ui5/webcomponents-fiori/dist/UserMenuItem.js";

import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarSearch.js";
import "@ui5/webcomponents-fiori/dist/SearchItem.js";
import "@ui5/webcomponents-fiori/dist/SearchScope.js";

import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/da-2.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/official-service.js";

const shellbar = document.getElementById("shellbar");
const menu = document.getElementById("userMenu");

shellbar.addEventListener("ui5-profile-click", (event) => {
	menu.opener = event.detail.targetRef;
	menu.open = true;
});

[...document.querySelectorAll("ui5-toggle-button")].forEach(el => {
	el.addEventListener("click", event => {
		const toggleButton = event.target;
		toggleButton.icon = toggleButton.pressed ? "sap-icon://da-2" : "sap-icon://da";
	});
});

const scopeData = [
    { name: "Laptop", scope: "products" },
    { name: "Leave Requests", scope: "apps" },
    { name: "Log work", scope: "apps" },
    { name: "Manage Products", scope: "apps" },
    { name: "Mobile Phones", scope: "products" },
    { name: "Tablet", scope: "products" },
];

function createScopeItems(scope) {
    let filterData = [];

    if (!scope) {
        filterData = scopeData;
    } else {
        filterData = scopeData.filter(item => item.scope === scope);
    }

    filterData.forEach(item => {
        const searchItem = document.createElement("ui5-search-item");
        searchItem.text = item.name;
        searchItem.scopeName = item.scope;
        searchScope.appendChild(searchItem);
    });
}

const searchScope = document.getElementById("search-scope");

createScopeItems();

searchScope.addEventListener("ui5-scope-change", (event) => {
    const scope = event.detail.scope.text === "All" ? "" : event.detail.scope.text.toLowerCase();
    
    searchScope.items.forEach(item => {
        item.remove();
    });

    createScopeItems(scope);
});
