import "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents/dist/ResponsivePopover.js"
import "@ui5/webcomponents-fiori/dist/Page.js"

import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/chain-link.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/customer.js"; 
import "@ui5/webcomponents-icons/dist/menu.js";

startButton.addEventListener("click", function (event) {
	respPopover.opener = startButton;
	respPopover.open = true;
});

nl1.querySelectorAll("ui5-side-navigation-item").forEach(element => {
	element.addEventListener("click", function (event) {
		respPopover.open=false;	
	});
});