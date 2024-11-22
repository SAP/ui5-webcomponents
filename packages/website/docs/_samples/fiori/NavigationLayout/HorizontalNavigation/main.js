import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Tab.js";
import "@ui5/webcomponents/dist/TabContainer.js";

import "@ui5/webcomponents-fiori/dist/NavigationLayout.js";
import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";

import "@ui5/webcomponents-icons/dist/customer.js";



document.querySelector("#startButton").addEventListener("click", function (event) {
	nl1.sideCollapsed = !nl1.sideCollapsed;
});

document.querySelector("#sn1").addEventListener("selection-change", function (event) {
	if (event.detail.item.getAttribute("target")) {
		return;
	}

	const contentItems = document.querySelectorAll(".contentItem");
	contentItems.forEach(item => {
		item.classList.remove("contentItemVisible");
	});
	document.getElementById(event.detail.item.getAttribute("href").replace("#", "")).classList.add("contentItemVisible");
});