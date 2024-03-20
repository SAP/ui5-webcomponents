import "@ui5/webcomponents-fiori/dist/DynamicPage.js";
import "@ui5/webcomponents-fiori/dist/DynamicPageTitle.js";
import "@ui5/webcomponents-fiori/dist/DynamicPageHeader.js";
import "@ui5/webcomponents-fiori/dist/Bar.js";

import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Badge.js";
import "@ui5/webcomponents/dist/Breadcrumbs.js";
import "@ui5/webcomponents/dist/BreadcrumbsItem.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Toolbar.js";
import "@ui5/webcomponents/dist/ToolbarButton.js";
import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/StandardListItem.js";

import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/share.js";
import "@ui5/webcomponents-icons/dist/laptop.js";


const dynamicPage = document.querySelector("ui5-dynamic-page");
const editButton = document.querySelector("#edit-button");

const cancelEdit = document.querySelector("#cancel-edit");
const saveEdit = document.querySelector("#save-edit");


console.error(dynamicPage);
console.error(editButton);
console.error(cancelEdit);
console.error(saveEdit);

editButton.addEventListener("click", () => {
    console.error("editButton click");
    dynamicPage.setAttribute("show-footer", true);
});

[saveEdit, cancelEdit].forEach(button => {
    button.addEventListener("click", () => {
        console.error("saveEdit or cancelEdit click", dynamicPage);
        dynamicPage.removeAttribute("show-footer");
    });
});