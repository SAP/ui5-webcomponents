import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/ToggleButton.js";

import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ProductSwitch.js";
import "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";

import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/da-2.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/business-objects-experience.js";
import "@ui5/webcomponents-icons/dist/contacts.js";
import "@ui5/webcomponents-icons/dist/flight.js";
import "@ui5/webcomponents-icons/dist/shipping-status.js";
import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/sales-notification.js";
import "@ui5/webcomponents-icons/dist/retail-store.js";
import "@ui5/webcomponents-icons/dist/marketing-campaign.js";
import "@ui5/webcomponents-icons/dist/family-care.js";
import "@ui5/webcomponents-icons/dist/customer-briefing.js";
import "@ui5/webcomponents-icons/dist/batch-payments.js";
import "@ui5/webcomponents-icons/dist/cart-3.js";
import "@ui5/webcomponents-icons/dist/credit-card.js";

var shellBar = document.getElementById("shellbar");
var popover = document.getElementById("productswitch-popover");
shellBar.addEventListener("product-switch-click", (event) => {
    if (popover.open) {
        popover.close();
    } else {
        event.preventDefault();
        popover.showAt(event.detail.targetRef);
    }
});
[...document.querySelectorAll("ui5-toggle-button")].forEach(el => {
	el.addEventListener("click", event => {
		const toggleButton = event.target;
		toggleButton.icon = toggleButton.pressed ? "sap-icon://da-2" : "sap-icon://da";
	});
});