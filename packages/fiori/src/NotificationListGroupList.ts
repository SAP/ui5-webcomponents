import List from "@ui5/webcomponents/dist/List.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

/**
 * @class
 *
 * Internal `ui5-li-notification-group-list` component,
 * that is used to support keyboard navigation of the notification group internal list.
 *
 * @private
 */
@customElement("ui5-li-notification-group-list")
class NotificationListGroupList extends List {
	getEnabledItems() {
		return [];
	}

	_handleTabNext() {
	}

	onForwardBefore() {
	}

	onForwardAfter() {
	}
}

NotificationListGroupList.define();

export default NotificationListGroupList;
