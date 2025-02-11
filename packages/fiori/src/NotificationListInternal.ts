import List from "@ui5/webcomponents/dist/List.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import NotificationListGroupItem from "./NotificationListGroupItem.js";
import {
	isDown,
	isUp,
	isHome,
	isEnd,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type NotificationListItemBase from "./NotificationListItemBase.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";

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

	_allNavigationItems: Array<HTMLElement> = [];

	getEnabledItems(): Array<ListItemBase> {
		const items = new Array<ListItemBase>();
		const allNavigationItems = new Array<HTMLElement>();

		this.getItems().forEach(item => {
			items.push(item);
			allNavigationItems.push(item);

			if (item instanceof NotificationListGroupItem && !item.collapsed && !item.loading) {
				item.items.forEach(subItem => {
					// @ts-expect-error strictEvents
					items.push(subItem);
					allNavigationItems.push(subItem);
				});

				const growingButton = item.getGrowingButton();
				if (growingButton) {
					allNavigationItems.push(growingButton);
				}
			}
		});

		this._allNavigationItems = allNavigationItems;

		return items;
	}

	_onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);

		if (isEnd(e)) {
			this._handleEnd1(e);
			e.preventDefault();
			return;
		}

		if (isHome(e)) {
			this._handleHome1(e);
			e.preventDefault();
			return;
		}

		this._focusSameItemOnNextRow(e);
	}

	_handleHome1(e: KeyboardEvent) {
		e.stopImmediatePropagation();

		const currentFocusedItem = this.getEnabledItems()[this._itemNavigation._currentIndex];
		if (!currentFocusedItem) {
			return;
		}

		const currentFocusedIndex = this._allNavigationItems.indexOf(currentFocusedItem);
		let nextFocusedIndex = 0;

		for (let i = currentFocusedIndex - 1; i >= 0; i--) {
			const item = this._allNavigationItems[i];
			if (this._isGrowinButton(item)) {
				nextFocusedIndex = i + 1;
				break;
			}
		}

		this._allNavigationItems[nextFocusedIndex].focus();
	}

	_handleEnd1(e: KeyboardEvent) {
		e.stopImmediatePropagation();
	}

	_focusSameItemOnNextRow(e: KeyboardEvent) {
		const target = e.target as HTMLElement;
		const shadowTarget = target.shadowRoot!.activeElement as HTMLElement;
		const activeElement = getActiveElement();
		const isGrowingBtn = this._isGrowinButton(activeElement);

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
		const index = navItems.indexOf(isGrowingBtn ? activeElement : target) + (isUp(e) ? -1 : 1);
		const nextItem = navItems[index] as NotificationListItemBase;
		if (!nextItem) {
			return;
		}

		const sameItemOnNextRow = this._isGrowinButton(nextItem) ? null : nextItem.getHeaderDomRef()!.querySelector(`.${shadowTarget.className}`) as HTMLElement;
		if (sameItemOnNextRow && sameItemOnNextRow.offsetParent) {
			sameItemOnNextRow.focus();
		} else {
			nextItem.focus();
		}
	}

	_isGrowinButton(item: Element | null) {
		return item?.classList.contains("ui5-growing-button-inner");
	}
}

NotificationListInternal.define();

export default NotificationListInternal;
