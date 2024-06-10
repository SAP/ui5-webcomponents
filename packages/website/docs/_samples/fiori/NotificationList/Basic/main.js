import "@ui5/webcomponents/Avatar.js";
import "@ui5/webcomponents/List.js";
import "@ui5/webcomponents/Menu.js";
import "@ui5/webcomponents/Toast.js";

import "@ui5/webcomponents-fiori/NotificationList.js";
import "@ui5/webcomponents-fiori/NotificationListItem.js";

var notificationList = document.querySelector("ui5-notification-list");

notificationList.addEventListener("item-close", e => {
    e.detail.item.hidden = true;
});

menuWithActions.addEventListener("ui5-item-click", function(event) {
    wcToast.textContent = "Menu button '" + event.detail.text + "' pressed" + " on Notification List Item with id '" + event.target.parentElement.id + "'.";
    wcToast.show();
});