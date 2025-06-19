import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type MenuItem from "./MenuItem.js";
import { isInstanceOfMenuItem } from "./MenuItem.js";
import MenuItemGroupTemplate from "./MenuItemGroupTemplate.js";
import MenuItemGroupCheckMode from "./types/MenuItemGroupCheckMode.js";
import type { IMenuItem } from "./Menu.js";

type MenuItemGroupCheckChangeEventDetail = { checkedItems: Array<MenuItem>; }

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-menu-item-group` component represents a group of items designed for use inside a `ui5-menu`.
 * Items belonging to the same group should be wrapped by a `ui5-menu-item-group`.
 * Each group can have an `checkMode` property, which defines the check mode for the items within the group.
 * The possible values for `checkMode` are:
 * - 'None' (default) - no items can be checked
 * - 'Single' - Only one item can be checked at a time
 * - 'Multiple' - Multiple items can be checked simultaneously
 *
 * **Note:** If the `checkMode` property is set to 'Single', only one item can remain checked at any given time.
 * If multiple items are marked as checked, the last checked item will take precedence.
 *
 * ### Usage
 *
 * `ui5-menu-item-group` represents a collection of `ui5-menu-item` components that can have the same check mode.
 * The items are addeed to the group's `items` slot.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MenuItemGroup.js";`
 * @constructor
 * @extends UI5Element
 * @implements {IMenuItem}
 * @since 2.12.0
 * @public
 */
@customElement({
	tag: "ui5-menu-item-group",
	renderer: jsxRenderer,
	template: MenuItemGroupTemplate,
})

/**
 * Fired when an item in the group is checked or unchecked.
 * @public
 * @since 2.12.0
 */
@event("check-change", {
	bubbles: true,
})
class MenuItemGroup extends UI5Element implements IMenuItem {
	eventDetails!: UI5Element["eventDetails"] & {
		"check-change": MenuItemGroupCheckChangeEventDetail
	}

	/**
	 * Defines the component's check mode.
	 * @default "None"
	 * @public
	 */
	@property()
	checkMode: `${MenuItemGroupCheckMode}` = "None";

	/**
	 * Defines the items of this component.
	 * **Note:** The slot can hold any combination of components of type `ui5-menu-item` or `ui5-menu-separator` or both.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<IMenuItem>;

	get isGroup(): boolean {
		return true;
	}

	get _menuItems() {
		return this.items.filter(isInstanceOfMenuItem);
	}

	onBeforeRendering() {
		this._updateItemsCheckMode();

		if (this.checkMode === MenuItemGroupCheckMode.Single) {
			this._ensureSingleItemIsChecked();
		}
	}

	/**
	 * Sets <code>_checkMode</code> property of all menu items in the group.
	 * @private
	 */
	_updateItemsCheckMode() {
		this._menuItems.forEach((item: MenuItem) => {
			item._checkMode = this.checkMode;
		});
	}

	/**
	 * Sets <code>checked</code> property of all items in the group to <code>false</code>.
	 * @private
	 */
	_clearCheckedItems() {
		this._menuItems.forEach((item: MenuItem) => { item.checked = false; });
	}

	/**
	 * Ensures that only one item can remain checked at any given time. If multiple items are marked as checked,
	 * the last checked item will take precedence.
	 * @private
	 */
	_ensureSingleItemIsChecked() {
		const lastCheckedItem = this._menuItems.findLast((item: MenuItem) => item.checked);

		this._clearCheckedItems();
		if (lastCheckedItem) {
			lastCheckedItem.checked = true;
		}
	}

	/**
	 * Handles the checking of an item in the group and unchecks other items if the item check mode is Single.
	 * @private
	 */
	_handleItemCheck(e: CustomEvent) {
		const item = e.target as MenuItem;
		const isChecked = item.checked;

		if (this.checkMode === MenuItemGroupCheckMode.Single) {
			this._clearCheckedItems();
			item.checked = isChecked;
		}

		this.fireDecoratorEvent("check-change", {
			checkedItems: this._menuItems.filter((item: MenuItem) => item.checked),
		});
	}
}

const isInstanceOfMenuItemGroup = (object: any): object is MenuItemGroup => {
	return "isGroup" in object;
};

MenuItemGroup.define();

export default MenuItemGroup;

export {
	isInstanceOfMenuItemGroup,
};
