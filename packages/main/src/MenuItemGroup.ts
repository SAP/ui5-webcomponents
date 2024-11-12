import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import MenuItem from "./MenuItem.js";
import MenuItemGroupTemplate from "./generated/templates/MenuItemGroupTemplate.lit.js";
import ItemSelectionMode from "./types/ItemSelectionMode.js";
import type { IMenuItem } from "./Menu.js";

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-menu-item-group` is the group of items to use inside a `ui5-menu`.
 * Items that belong to the same group should be enclosed by `ui5-menu-item-group`.
 * Each group can have itemSelectionMode property, which defines the selection mode of the items inside.
 * Possible values are 'None' (default), 'SingleSelect', 'MultiSelect'.
 *
 * ### Usage
 *
 * `ui5-menu-item-group` represents a collection of `ui5-menu-item` components that can have the same selection mode.
 * The items are addeed to the group's `items` slot.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MenuItemGroup.js";`
 * @constructor
 * @extends UI5Element
 * @implements {IMenuItem}
 * @since 2.4.0
 * @public
 */
@customElement({
	tag: "ui5-menu-item-group",
	renderer: litRender,
	template: MenuItemGroupTemplate,
	dependencies: [MenuItem],
})
class MenuItemGroup extends UI5Element implements IMenuItem {
	/**
	 * Defines the component selection mode.
	 * @default "None"
	 * @public
	 */
	@property()
	itemSelectionMode: `${ItemSelectionMode}` = ItemSelectionMode.None;

	/**
	 * Defines the items of this component.
	 * **Note:** The slot can hold `ui5-menu-item` and `ui5-menu-separator` items.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<IMenuItem>;

	get isSeparator(): boolean {
		return false;
	}

	get isGroup(): boolean {
		return true;
	}

	// Return only the menu items, excluding separators
	get _menuItems() {
		return this.items.filter((item) : item is MenuItem => !item.isSeparator);
	}

	onBeforeRendering() {
		this._updateItemsSelectionMode();

		if (this.itemSelectionMode === ItemSelectionMode.SingleSelect) {
			this._ensureSingleSelection();
		}
	}

	/**
	 * Sets <code>_itemSelectionMode</code> property of all menu items in the group.
	 * @private
	 */
	_updateItemsSelectionMode() {
		this._menuItems.forEach((item: MenuItem) => {
			item._itemSelectionMode = this.itemSelectionMode;
		});
	}

	/**
	 * Sets <code>selected</code> property of all items in the group to <code>false</code>.
	 * @private
	 */
	_clearSelectedItems() {
		this.items.forEach((item: IMenuItem) => {
			if (!item.isSeparator && !item.isGroup) {
				item.isSelected = false;
			}
		});
	}

	/**
	 * Ensures that only one item is selected in the group (if there were any selected items).
	 * @private
	 */
	_ensureSingleSelection() {
		const lastSelectedItem = this.items.findLast((item: IMenuItem) => item.isSelected);

		this._clearSelectedItems();
		if (lastSelectedItem) {
			lastSelectedItem.isSelected = true;
		}
	}

	/**
	 * Handles the selection of an item in the group and unselects other items if the item selection mode is SingleSelect.
	 * @private
	 */
	_handleItemSelection() {
		if (this.itemSelectionMode === ItemSelectionMode.SingleSelect) {
			this._clearSelectedItems();
		}
	}
}

MenuItemGroup.define();

export default MenuItemGroup;
