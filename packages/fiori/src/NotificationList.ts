import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import List from "@ui5/webcomponents/dist/List.js";
import NotificationListGroupItem from "./NotificationListGroupItem.js";

// Texts
import {
	NOTIFICATION_LIST_ACCESSIBLE_NAME,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * The `ui5-notification-list` web component represents
 * a container for `ui5-li-notification-group` and `ui5-li-notification`.
 *
 * @constructor
 * @extends List
 * @since 2.0
 * @public
 */
@customElement("ui5-notification-list")

class NotificationList extends List {
	navigationMode = NavigationMode.Auto;

	constructor() {
		super();
		this.accessibleName = NotificationList.i18nFioriBundle.getText(NOTIFICATION_LIST_ACCESSIBLE_NAME);
		this._itemNavigation._navigationMode = NavigationMode.Auto;
	}

	static i18nFioriBundle: I18nBundle;

	getEnabledItems(): Array<ListItemBase> {
		const items = new Array<ListItemBase>();

		this.getItems().forEach(item => {
			items.push(item);

			if (item instanceof NotificationListGroupItem && !item.collapsed) {
				item.items.forEach(subItem => {
					items.push(subItem);
				});
			}
		});

		return items;
	}

	static async onDefine() {
		NotificationList.i18nFioriBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}
}

NotificationList.define();

export default NotificationList;
