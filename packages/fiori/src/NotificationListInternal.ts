import List from "@ui5/webcomponents/dist/List.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import NotificationListGroupItem from "./NotificationListGroupItem.js";

/**
 * @class
 *
 * Internal `ui5-li-notification-list-list` component,
 * that is used to support keyboard navigation of the notification list internal list.
 *
 * @private
 */
@customElement("ui5-notification-list-internal")
class NotificationListInternal extends List {
	constructor() {
		super();

		this._itemNavigation._navigationMode = NavigationMode.Auto;
	}

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
}

NotificationListInternal.define();

export default NotificationListInternal;
