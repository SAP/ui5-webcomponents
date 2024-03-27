import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/Popover.js";

import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";
import "@ui5/webcomponents-fiori/dist/NotificationListItem.js";

import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/accept.js";

var shellbar = document.querySelector("ui5-shellbar");
var notificationsPopover = document.querySelector("ui5-popover");
var notificationList = document.querySelector("ui5-list");

notificationList.addEventListener("item-close", e => {
    e.detail.item.hidden = true;
});

shellbar.addEventListener("notifications-click", e => {
    e.preventDefault();
    notificationsPopover.showAt(e.detail.targetRef);
});