import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents-icons/dist/action-settings.js"
import "@ui5/webcomponents-icons/dist/sort.js"

import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/NotificationList.js";
import "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";
import "@ui5/webcomponents-fiori/dist/NotificationListItem.js";

import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/accept.js";

var shellbar = document.querySelector("ui5-shellbar");
var notificationsPopover = document.querySelector("ui5-popover");
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

shellbar.addEventListener("notifications-click", e => {
    e.preventDefault();
    notificationsPopover.opener = e.detail.targetRef;
	notificationsPopover.open = true;
});