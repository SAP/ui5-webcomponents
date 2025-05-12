import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import MenuItem from "./MenuItem.js";
import MenuItemGroupTemplate from "./MenuItemGroupTemplate.js";
import { isInstanceOfMenuItem } from "./Menu.js";
import ItemCheckMode from "./types/ItemCheckMode.js";
import type { IMenuItem } from "./Menu.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-menu-item-group` component represents a group of items designed for use inside a `ui5-menu`.
 * Items belonging to the same group should be wrapped by a `ui5-menu-item-group`.
 * Each group can have an `itemCheckMode` property, which defines the check mode for the items within the group.
 * The possible values for `itemCheckMode` are:
 * - 'None' (default) - no items can be checked
 * - 'Single' - Only one item can be checked at a time
 * - 'Multiple' - Multiple items can be checked simultaneously
 *
 * **Note:** If the `itemCheckMode` property is set to 'Single', only one item can remain checked at any given time.
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
 * @since 2.11.0
 * @public
 */
@customElement({
	tag: "ui5-menu-item-group",
	renderer: jsxRenderer,
	template: MenuItemGroupTemplate,
	dependencies: [MenuItem],
})
class MenuItemGroup extends UI5Element implements IMenuItem {
	/**
	 * Defines the component's check mode.
	 * @default "None"
	 * @public
	 */
	@property()
	itemCheckMode: `${ItemCheckMode}` = "None";

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

		if (this.itemCheckMode === ItemCheckMode.Single) {
			this._ensureSingleItemIsChecked();
		}
	}

	/**
	 * Sets <code>_itemCheckMode</code> property of all menu items in the group.
	 * @private
	 */
	_updateItemsCheckMode() {
		this._menuItems.forEach((item: MenuItem) => {
			item._itemCheckMode = this.itemCheckMode;
		});
	}

	/**
	 * Sets <code>checked</code> property of all items in the group to <code>false</code>.
	 * @private
	 */
	_clearCheckedItems() {
		this._menuItems.forEach((item: MenuItem) => item.checked = false);
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
		if (this.itemCheckMode === ItemCheckMode.Single) {
			this._clearCheckedItems();
			(e.target as MenuItem).checked = true;
		}
	}
}

MenuItemGroup.define();

export default MenuItemGroup;
