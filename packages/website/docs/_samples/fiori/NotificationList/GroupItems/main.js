import "@ui5/webcomponents/Avatar.js";
import "@ui5/webcomponents/List.js";
import "@ui5/webcomponents/Menu.js";

import "@ui5/webcomponents-fiori/NotificationList.js";
import "@ui5/webcomponents-fiori/NotificationListGroupItem.js";
import "@ui5/webcomponents-fiori/NotificationListItem.js";

import "@ui5/webcomponents-icons/employee.js";
import "@ui5/webcomponents-icons/message-error.js";
import "@ui5/webcomponents-icons/accept.js";
import "@ui5/webcomponents-icons/accept.js";

var notificationList = document.querySelector("ui5-notification-list");

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