import "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/ResponsivePopover.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents/dist/Bar.js";

import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/favorite-list.js";
import "@ui5/webcomponents-icons/dist/wrench.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/multiple-line-chart.js";
import "@ui5/webcomponents-icons/dist/customer-and-contacts.js";
import "@ui5/webcomponents-icons/dist/customer-financial-fact-sheet.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/write-new.js";
import "@ui5/webcomponents-icons/dist/widgets.js";
import "@ui5/webcomponents-icons/dist/compare.js";
import "@ui5/webcomponents-icons/dist/sys-find.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/log.js";

const shellbar = document.getElementById("shellbar");
const sideNavigation = document.getElementById("sideNav");
const profilePopover = document.getElementById("profile-popover");
const respPopover = document.getElementById("resp-popover");
const startButton = document.getElementById("startButton");
const quickAction = document.getElementById("quickAction");
const quickActionCloseBtn = document.getElementById("quickActionCloseBtn");
const quickActionDialog = document.getElementById("quickActionDialog");

shellbar.addEventListener("ui5-profile-click", (event) => {
	profilePopover.opener = event.detail.targetRef;
	profilePopover.open = true;
});

startButton.addEventListener("click", function (event) {
	respPopover.opener = startButton;
	respPopover.open = !respPopover.open;
});

quickAction.accessibilityAttributes = {
	hasPopup: "dialog"
};

quickAction.addEventListener("click", () => {
	quickActionDialog.open = true;
});

quickActionCloseBtn.addEventListener("click", () => {
	quickActionDialog.open = false;
});

sideNavigation.addEventListener("selection-change", function (event) {
	if (event.detail.item.getAttribute("target")) {
		return;
	}

	const contentItems = document.querySelectorAll(".contentItem");
	contentItems.forEach(item => {
		item.classList.remove("contentItemVisible");
	});
	document.getElementById(event.detail.item.getAttribute("href").replace("#", ""))?.classList.add("contentItemVisible");

	respPopover.open=false;
});