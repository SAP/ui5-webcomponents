import List from "@ui5/webcomponents/dist/List.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import NotificationListGroupItem from "./NotificationListGroupItem.js";
import { isDown, isUp } from "@ui5/webcomponents-base/dist/Keys.js";
import type NotificationListItemBase from "./NotificationListItemBase.js";

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

			if (item instanceof NotificationListGroupItem && !item.collapsed && !item.loading) {
				item.items.forEach(subItem => {
					// @ts-expect-error strictEvents
					items.push(subItem);
				});
			}
		});

		return items;
	}

	_onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);
		this.focusSameItemOnNextRow(e);
	}

	focusSameItemOnNextRow(e: KeyboardEvent) {
		const target = e.target as HTMLElement;
		const shadowTarget = target.shadowRoot!.activeElement as HTMLElement;
		if (!target || target.hasAttribute("ui5-menu-item")) {
			return;
		}

		const isFocusWithin = target.matches(":focus-within");
		if (!isFocusWithin || (!isUp(e) && !isDown(e))) {
			return;
		}

		e.preventDefault();
		e.stopImmediatePropagation();

		const navItems = this.getEnabledItems();
		// @ts-expect-error TOFIX strictEvents
		const index = navItems.indexOf(target) + (isUp(e) ? -1 : 1);
		const nextItem = navItems[index] as NotificationListItemBase;
		if (!nextItem) {
			return;
		}

		const sameItemOnNextRow = nextItem.getHeaderDomRef()!.querySelector(`.${shadowTarget.className}`) as HTMLElement;
		if (sameItemOnNextRow && sameItemOnNextRow.offsetParent) {
			sameItemOnNextRow.focus();
		} else {
			nextItem.focus();
		}
	}
}

NotificationListInternal.define();

export default NotificationListInternal;
