import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import List from "@ui5/webcomponents/dist/List.js";
import NotificationListGroupItem from "./NotificationListGroupItem.js";

/**
 * @class
 *
 * The ...
 * @constructor
 * @extends List
 * @since 2.0
 * @public
 */
@customElement("ui5-notification-list")

class NotificationList extends List {
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

NotificationList.define();

export default NotificationList;
