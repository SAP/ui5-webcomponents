import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/Tag.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Link.js";

import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import "@ui5/webcomponents-fiori/dist/ShellBarSearch.js";
import "@ui5/webcomponents-fiori/dist/SearchItem.js";
import "@ui5/webcomponents-fiori/dist/SearchScope.js";

import "@ui5/webcomponents-fiori/dist/NavigationLayout.js";
import "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import NavigationLayoutMode from "@ui5/webcomponents-fiori/dist/types/NavigationLayoutMode.js";

import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents/dist/MessageStrip.js";
import "@ui5/webcomponents-fiori/dist/NotificationList.js";
import "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";
import "@ui5/webcomponents-fiori/dist/NotificationListItem.js";
import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import "@ui5/webcomponents-fiori/dist/illustrations/NoNotifications.js";

import "@ui5/webcomponents-fiori/dist/UserMenu.js";
import "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";
import "@ui5/webcomponents-fiori/dist/UserMenuItem.js";

import "@ui5/webcomponents-icons/dist/globe.js";
import "@ui5/webcomponents-icons/dist/collaborate.js";
import "@ui5/webcomponents-icons/dist/official-service.js";
import "@ui5/webcomponents-icons/dist/private.js";
import "@ui5/webcomponents-icons/dist/accelerated.js";

import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/da-2.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/favorite-list.js";
import "@ui5/webcomponents-icons/dist/account.js";
import "@ui5/webcomponents-icons/dist/business-by-design.js";
import "@ui5/webcomponents-icons/dist/crm-sales.js";
import "@ui5/webcomponents-icons/dist/s4hana.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/manager-insight.js";
import "@ui5/webcomponents-icons/dist/action-settings.js"
import "@ui5/webcomponents-icons/dist/sort.js"
import "@ui5/webcomponents-icons/dist/expense-report.js";

const shellbar = document.getElementById("shellbar");

[...document.querySelectorAll("ui5-toggle-button")].forEach(el => {
	el.addEventListener("click", event => {
		const toggleButton = event.target;
		toggleButton.icon = toggleButton.pressed ? "sap-icon://da-2" : "sap-icon://da";
	});
});

/* Side navigation */
const menuButton =  document.getElementById("menu-button");
const navigationLayout = document.getElementById("navigation-layout");
menuButton.addEventListener("click", () => {
	navigationLayout.mode = navigationLayout.isSideCollapsed() ? NavigationLayoutMode.Expanded : NavigationLayoutMode.Collapsed;
});

const sideNavigation = document.getElementById("side-navigation");
sideNavigation.addEventListener("selection-change", event => {
	const contentTitle = document.getElementById("content-title");
	contentTitle.textContent = event.detail.item.text;
});
/* End side navigation */

/* Quick create dialog */
const quickCreate = document.getElementById("quick-create");
const quickCreateDialog = document.getElementById("quick-create-dialog");
quickCreate.accessibilityAttributes = {
	hasPopup: "dialog"
};
quickCreate.addEventListener("click", () => {
	quickCreateDialog.open = true;
});
document.getElementById("quick-create-dialog-close").addEventListener("click", () => {
	quickCreateDialog.open = false;
});
/* End quick create dialog */

/* Notifications */
const notificationsPopover = document.querySelector(".notificationsPopover");
const notificationList = document.querySelector(".notificationsPopoverList");
const notificationsPopoverMessageStrip = document.querySelector(".notificationsMessageStrip");
const btnShowMessageStrip = document.querySelector("#show-message-strip");
const btnClearAll = document.querySelector("#clear-all");
const clearAllDialog = document.querySelector("#clear-all-dialog");
var dialogClosers = [...clearAllDialog.querySelectorAll(".dialogCloser")];
const btnClearAllAction = document.querySelector("#clear-all-action");
const notificationsListGroupGrowing = document.querySelector("#notificationsListGroupGrowing");
const btnOpenMenuSort = document.getElementById("btn-sort");
const menu = document.getElementById("sort-menu");

const itemsToLoad = 10;
let itemsLoaded = 6;

shellbar.addEventListener("notifications-click", e => {
	e.preventDefault();
	notificationsPopover.opener = e.detail.targetRef;
	notificationsPopover.open = true;
});

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

const insertItems = (list) => {
	for (var i = itemsLoaded + 1; i <= itemsLoaded + itemsToLoad; i++) {
		list.insertAdjacentHTML("beforeend",
			`<ui5-li-notification title-text="Notification Title  ${i}" show-close>
				<ui5-avatar icon="expense-report" color-scheme="Accent1" shape="Square" size="XS" slot="avatar"></ui5-avatar>
				<span slot="footnotes">Product Name</span>
				<span slot="footnotes">Now</span>
				<ui5-menu slot="menu">
					<ui5-menu-item text="Unsubscribe"></ui5-menu-item>
				</ui5-menu>
				Description ${i}
			</ui5-li-notification>`);
	}

	itemsLoaded += itemsToLoad;
};

notificationsListGroupGrowing.addEventListener("load-more", (e) => {
	const focusIndex = notificationsListGroupGrowing.items.length;

	notificationsListGroupGrowing.loading = true;
	setTimeout(() => {
		insertItems(notificationsListGroupGrowing);
		notificationsListGroupGrowing.loading = false;

		setTimeout(() => {
			notificationsListGroupGrowing.items[focusIndex].focus();
		}, 500);
	}, 2000);
});

btnShowMessageStrip.addEventListener("click", function() {
	notificationsPopoverMessageStrip.style.display = "inline-block";
});

notificationsPopoverMessageStrip.addEventListener("close", function() {
	notificationsPopoverMessageStrip.style.display = "none";
});

btnClearAll.accessibilityAttributes = {
    hasPopup: "dialog",
    controls: clearAllDialog.id,
};

btnClearAll.addEventListener("click", () => {
    clearAllDialog.open = true;
});

dialogClosers.forEach(btn => {
    btn.addEventListener("click", () => {
        clearAllDialog.open = false;
    });
});

btnClearAllAction.addEventListener("click", () => {
	notificationList.innerHTML = `<ui5-illustrated-message name="NoNotifications"></ui5-illustrated-message>`;
});

btnOpenMenuSort.addEventListener("click", () => {
	menu.opener = btnOpenMenuSort;
	menu.open = true;
});
/* End Notifications */

/* User Menu */
const userMenu = document.getElementById("userMenu");

shellbar.addEventListener("ui5-profile-click", (event) => {
	userMenu.opener = event.detail.targetRef;
	userMenu.open = true;
});

userMenu.addEventListener("item-click", function (event) {
	const item = event.detail.item.getAttribute("data-id");

	switch (item) {
		case "setting":
			console.log("Open Setting Dialog");
			break;
		case "privacy-policy":
			console.log("Privacy Policy");
			break;
		case "terms-of-use":
			console.log("Terms of Use");
			break;
		default:
			console.log("Default");
	}
});

userMenu.addEventListener("avatar-click", function () {
	console.log("Avatar clicked");
});

userMenu.addEventListener("manage-account-click", function () {
	console.log("Manage account clicked");
});

userMenu.addEventListener("edit-accounts-click", function () {
	console.log("Edit accounts clicked");
});

userMenu.addEventListener("change-account", function (event) {
	console.log("Change account account", event.detail);
	event.detail.selectedAccount.loading = true;
	setTimeout(function(){
		event.detail.selectedAccount.loading = false;
	}, 1000);
});

userMenu.addEventListener("sign-out-click", function (event) {
	console.log("Sign Out clicked");

	const result = prompt("Sign Out", "Are you sure you want to sign out?");
	if (result) {
		userMenu.open = false;
	}
	event.preventDefault();
});
/* End User Menu */

/* Search */
const scopeData = [
    { name: "Laptop", scope: "products" },
    { name: "Leave Requests", scope: "apps" },
    { name: "Log work", scope: "apps" },
    { name: "Manage Products", scope: "apps" },
    { name: "Mobile Phones", scope: "products" },
    { name: "Tablet", scope: "products" },
];

function createScopeItems(scope) {
    let filterData = [];

    if (!scope) {
        filterData = scopeData;
    } else {
        filterData = scopeData.filter(item => item.scope === scope);
    }

    filterData.forEach(item => {
        const searchItem = document.createElement("ui5-search-item");
        searchItem.text = item.name;
        searchItem.scopeName = item.scope;
        searchScope.appendChild(searchItem);
    });
}

const searchScope = document.getElementById("search-scope");

createScopeItems();

searchScope.addEventListener("ui5-scope-change", (event) => {
    const scope = event.detail.scope.text === "All" ? "" : event.detail.scope.text.toLowerCase();
    
    searchScope.items.forEach(item => {
        item.remove();
    });

    createScopeItems(scope);
});
/* End Search */