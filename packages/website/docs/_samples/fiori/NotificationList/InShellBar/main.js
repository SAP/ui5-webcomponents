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

const itemsToLoad = 5;
let itemsLoaded = 30;

notificationList.addEventListener("item-close", e => {
	let visibleItems = 0;

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

const insertItems = (list) => {
	for (var i = itemsLoaded + 1; i <= itemsLoaded + itemsToLoad; i++) {
		list.insertAdjacentHTML("beforeend",
			`<ui5-li-notification title-text="Notification Title ${i}" show-close>
				<ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
				<span slot="footnotes">Notification</span>
				<span slot="footnotes">3 Days</span>
				<ui5-menu slot="menu">
					<ui5-menu-item icon="accept" text="Accept"></ui5-menu-item>
					<ui5-menu-item icon="message-error" text="Reject"></ui5-menu-item>
				</ui5-menu>
				Description ${i}
			</ui5-li-notification>`);
	}

	itemsLoaded += itemsToLoad;
};

notificationsListGroupGrowing.addEventListener("load-more", (e) => {
	const focusIndex = notificationsListGroupGrowing.items.length;

	notificationsListGroupGrowing.loading = true;
	notificationsListGroupGrowing.loadingDelay = 0;
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
