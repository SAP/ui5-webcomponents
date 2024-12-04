import List from "@ui5/webcomponents/dist/List.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import bound from "@ui5/webcomponents-base/dist/decorators/bound.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";

/**
 * @class
 *
 * Internal `ui5-li-notification-group-list` component,
 * that is used to support keyboard navigation of the notification group internal list.
 *
 * @private
 */
@customElement("ui5-notification-group-list")
class NotificationListGroupList extends List {
	getEnabledItems() {
		return [];
	}

	@bound
	_handleTabNext() {
	}

	@bound
	onForwardBefore() {
	}

	@bound
	onForwardAfter() {
	}

	@bound
	onItemTabIndexChange() {
	}

	@bound
	onItemFocused() {
	}

	@bound
	_onfocusin(e: FocusEvent) {
		e.stopImmediatePropagation();
	}

	focusItem(item: ListItemBase) {
		item.focus();
	}
}

NotificationListGroupList.define();

export default NotificationListGroupList;
