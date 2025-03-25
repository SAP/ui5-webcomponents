import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/Tag.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Text.js";

import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import "@ui5/webcomponents-fiori/dist/NavigationLayout.js";
import "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import NavigationLayoutMode from "@ui5/webcomponents-fiori/dist/types/NavigationLayoutMode.js";

import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/da-2.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/sys-find.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/log.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/favorite-list.js";
import "@ui5/webcomponents-icons/dist/account.js";
import "@ui5/webcomponents-icons/dist/business-by-design.js";
import "@ui5/webcomponents-icons/dist/crm-sales.js";
import "@ui5/webcomponents-icons/dist/s4hana.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/manager-insight.js";

const shellbar = document.getElementById("shellbar");
const actionPopover = document.getElementById("action-popover");

shellbar.addEventListener("ui5-profile-click", (event) => {
    actionPopover.opener = event.detail.targetRef;
	actionPopover.open = true;
});

[...document.querySelectorAll("ui5-toggle-button")].forEach(el => {
	el.addEventListener("click", event => {
		const toggleButton = event.target;
		toggleButton.icon = toggleButton.pressed ? "sap-icon://da-2" : "sap-icon://da";
	});
});

/* Expand and collapse of the side navigation */
const menuButton =  document.getElementById("menu-button");
const navigationLayout = document.getElementById("navigation-layout");
menuButton.addEventListener("click", () => {
	navigationLayout.mode = navigationLayout.isSideCollapsed() ? NavigationLayoutMode.Expanded : NavigationLayoutMode.Collapsed;
});

/* Simulate change of page content */
const sideNavigation = document.getElementById("side-navigation");
sideNavigation.addEventListener("selection-change", event => {
	const contentTitle = document.getElementById("contentTitle");
	contentTitle.textContent = event.detail.item.text;
});

/* Quick create dialog */
const quickCreate = document.getElementById("quickCreate");
const quickCreateDialog = document.getElementById("quickCreateDialog");
quickCreate.accessibilityAttributes = {
	hasPopup: "dialog"
};
quickCreate.addEventListener("click", () => {
	quickCreateDialog.open = true;
});
document.getElementById("quickCreateDialogCloseBtn").addEventListener("click", () => {
	quickCreateDialog.open = false;
});
