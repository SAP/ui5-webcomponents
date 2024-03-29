import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/Menu.js";

import "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";
import "@ui5/webcomponents-fiori/dist/NotificationListItem.js";

import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/accept.js";

var notificationList = document.querySelector("ui5-list");

notificationList.addEventListener("item-close", e => {
    e.detail.item.hidden = true;
});