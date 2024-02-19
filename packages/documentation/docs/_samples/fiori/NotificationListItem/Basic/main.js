import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/List.js";

import "@ui5/webcomponents-fiori/dist/NotificationListItem.js";

var notificationList = document.querySelector("ui5-list");

notificationList.addEventListener("item-close", e => {
    e.detail.item.hidden = true;
});