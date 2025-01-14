import "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";

import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/write-new.js";

const quickAction = document.getElementById("quickAction");

quickAction.accessibilityAttributes = {
	hasPopup: "dialog"
};

quickAction.addEventListener("click", () => {
	alert("Quick Action clicked");
});
