import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/MessageStrip.js";
import "@ui5/webcomponents-icons/dist/action-settings.js"
import "@ui5/webcomponents-icons/dist/sort.js"

import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/NotificationList.js";
import "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";
import "@ui5/webcomponents-fiori/dist/NotificationListItem.js";

import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/accept.js";

const shellbar = document.querySelector("ui5-shellbar");
const notificationsPopover = document.querySelector(".notificationsPopover");
const notificationList = document.querySelector(".notificationsPopoverList");
const notificationsPopoverMessageStrip = document.querySelector(".notificationsMessageStrip");
const btnShowMessageStrip = document.querySelector("#show-message-strip");
const notificationsListGroupGrowing = document.querySelector("#notificationsListGroupGrowing");

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
let itemsLoaded = 0;
const itemToLoad = 5;

const notificationListItemTemplate = (index) => {
	var notificationLi = document.createElement("ui5-li-notification");
	notificationLi.titleText = "New notification";
	notificationLi.state = "Critical";

	return notificationLi;
}

const insertItems = (list) => {
	for (var i = itemsLoaded; i < itemsLoaded + itemToLoad; i++) {
		list.appendChild(notificationListItemTemplate(i));
	}

	itemsLoaded += itemToLoad;
};

notificationsListGroupGrowing.addEventListener("load-more", (e) => {
	const focusIndex = notificationsListGroupGrowing.items.length;

	notificationsListGroupGrowing.loading = true; // as in the ui5-list (the whole list gets 'busy')
	setTimeout(() => {
		insertItems(notificationsListGroupGrowing);
		notificationsListGroupGrowing.loading = false;

		setTimeout(() => {
			notificationsListGroupGrowing.items[focusIndex].focus();
		}, 500);
	}, 500);
});

btnShowMessageStrip.addEventListener("click", function() {
	notificationsPopoverMessageStrip.style.display = "inline-block";
});
