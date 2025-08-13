import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/Toast.js";

import "@ui5/webcomponents-fiori/dist/NotificationList.js";
import "@ui5/webcomponents-fiori/dist/NotificationListItem.js";

var notificationList = document.querySelector("ui5-notification-list");

notificationList.addEventListener("item-close", e => {
    e.detail.item.hidden = true;
});

menuWithActions.addEventListener("ui5-item-click", function(event) {
    wcToast.textContent = "Menu button '" + event.detail.text + "' pressed" + " on Notification List Item with id '" + event.target.parentElement.id + "'.";
    wcToast.open = true;
});