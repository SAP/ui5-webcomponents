import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/Menu.js";

import "@ui5/webcomponents-fiori/dist/NotificationList.js";
import "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";
import "@ui5/webcomponents-fiori/dist/NotificationListItem.js";

import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/accept.js";

var notificationList = document.querySelector("ui5-list");

notificationList.addEventListener("item-close", e => {
    var visibleItems = 0;

    // hide the closed Notification item
    e.detail.item.hidden = true;

    Array.from(e.detail.item.parentElement.childNodes).forEach((element) => {
        if (element.nodeName === "UI5-LI-NOTIFICATION" && !element.hidden) {
            visibleItems++;
        }
    });

    // hide the Notification group if empty
    if (visibleItems === 0) {
        e.detail.item.parentElement.hidden = true;
    }
});