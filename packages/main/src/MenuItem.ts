import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import AriaHasPopup from "@ui5/webcomponents-base/dist/types/AriaHasPopup.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import type { ListItemAccessibilityAttributes } from "./ListItem.js";
import ListItem from "./ListItem.js";
import ResponsivePopover from "./ResponsivePopover.js";
import type PopoverPlacement from "./types/PopoverPlacement.js";
import List from "./List.js";
import Icon from "./Icon.js";
import BusyIndicator from "./BusyIndicator.js";
import MenuItemTemplate from "./generated/templates/MenuItemTemplate.lit.js";
import {
	MENU_BACK_BUTTON_ARIA_LABEL,
	MENU_CLOSE_BUTTON_ARIA_LABEL,
	MENU_POPOVER_ACCESSIBLE_NAME,
} from "./generated/i18n/i18n-defaults.js";
import type { ResponsivePopoverBeforeCloseEventDetail } from "./ResponsivePopover.js";
import type { IMenuItem } from "./Menu.js";
import type MenuItemGroup from "./MenuItemGroup.js";
import ItemSelectionMode from "./types/ItemSelectionMode.js";

// Styles
import menuItemCss from "./generated/themes/MenuItem.css.js";

type MenuBeforeOpenEventDetail = { item?: MenuItem };
type MenuBeforeCloseEventDetail = { escPressed: boolean };

type MenuItemAccessibilityAttributes = Pick<AccessibilityAttributes, "ariaKeyShortcuts" | "role"> & ListItemAccessibilityAttributes;

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-menu-item` is the item to use inside a `ui5-menu`.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * ### Usage
 *
 * `ui5-menu-item` represents a node in a `ui5-menu`. The menu itself is rendered as a list,
 * and each `ui5-menu-item` is represented by a list item in that list. Therefore, you should only use
 * `ui5-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MenuItem.js";`
 * @constructor
 * @extends ListItem
 * @implements {IMenuItem}
 * @since 1.3.0
 * @public
 */
@customElement({
	tag: "ui5-menu-item",
	template: MenuItemTemplate,
	styles: [ListItem.styles, menuItemCss],
	dependencies: [...ListItem.dependencies, ResponsivePopover, List, BusyIndicator, Icon],
})
class MenuItem extends ListItem implements IMenuItem {
	static async onDefine() {
		MenuItem.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	/**
	 * Defines the text of the tree item.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the `additionalText`, displayed in the end of the menu item.
	 *
	 * **Note:** The additional text will not be displayed if there are items added in `items` slot or there are
	 * components added to `endContent` slot.
	 *
	 * The priority of what will be displayed at the end of the menu item is as follows:
	 * sub-menu arrow (if there are items added in `items` slot) -> components added in `endContent` -> text set to `additionalText`.
	 * @default undefined
	 * @public
	 * @since 1.8.0
	 */
	@property()
	additionalText?: string;

	/**
	 * Defines the icon to be displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 *
	 * **Example:**
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines whether `ui5-menu-item` is in selected state.
	 *
	 * **Note:** selected state is only taken into account when `ui5-menu-item` is added to `ui5-menu-item-group` with `itemSelectionMode` other than `None`.
	 * **Note:** A selected `ui5-menu-item` have selection mark displayed ad its end.
	 * @default false
	 * @public
	 * @since 2.4.0
	 */
	@property({ type: Boolean })
	isSelected = false;

	/**
	 * Defines whether `ui5-menu-item` is in disabled state.
	 *
	 * **Note:** A disabled `ui5-menu-item` is noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover.
	 *
	 * **Note:** If set to `true` a `ui5-busy-indicator` component will be displayed into the related one to the current `ui5-menu-item` sub-menu popover.
	 * @default false
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover.
	 * @default 1000
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Number })
	loadingDelay = 1000;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.7.0
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the text of the tooltip for the menu item.
	 * @default undefined
	 * @public
	 * @since 1.23.0
	 */
	@property()
	tooltip?: string;

	/**
	 * Defines the additional accessibility attributes that will be applied to the component.
	 * The following fields are supported:
	 *
	 * - **ariaKeyShortcuts**: Indicated the availability of a keyboard shortcuts defined for the menu item.
	 *
	 * - **role**: Defines the role of the menu item. If not set, menu item will have default role="menuitem".
	 *
	 * @public
	 * @since 2.1.0
	 * @default {}
	 */
	@property({ type: Object })
	accessibilityAttributes: MenuItemAccessibilityAttributes = {};

	/**
	 * Indicates whether any of the element siblings have icon.
	 */
	@property({ type: Boolean, noAttribute: true })
	_siblingsWithIcon = false;

	/**
	 * Defines the items of this component.
	 *
	 * **Note:** The slot can hold `ui5-menu-item` and `ui5-menu-separator` items.
	 *
	 * If there are items added to this slot, an arrow will be displayed at the end
	 * of the item in order to indicate that there are items added. In that case components added
	 * to `endContent` slot or `additionalText` content will not be displayed.
	 *
	 * The priority of what will be displayed at the end of the menu item is as follows:
	 * sub-menu arrow (if there are items added in `items` slot) -> components added in `endContent` -> text set to `additionalText`.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<IMenuItem>;

	/**
	 * Defines the components that should be displayed at the end of the menu item.
	 *
	 * **Note:** It is highly recommended to slot only components of type `ui5-button`,`ui5-link`
	 * or `ui5-icon` in order to preserve the intended design. If there are components added to this slot,
	 * and there is text set in `additionalText`, it will not be displayed. If there are items added to `items` slot,
	 * nether `additionalText` nor components added to this slot would be displayed.
	 *
	 * The priority of what will be displayed at the end of the menu item is as follows:
	 * sub-menu arrow (if there are items added in `items` slot) -> components added in `endContent` -> text set to `additionalText`.
	 * @public
	 * @since 2.0.0
	 */
	@slot({ type: HTMLElement })
	endContent!: Array<HTMLElement>;

	get placement(): `${PopoverPlacement}` {
		return this.isRtl ? "Start" : "End";
	}

	get isRtl() {
		return this.effectiveDir === "rtl";
	}

	get hasSubmenu() {
		return !!(this.items.length || this.loading) && !this.disabled;
	}

	get hasEndContent() {
		return !!(this.endContent.length);
	}

	get hasIcon() {
		return !!this.icon;
	}

	get isSubMenuOpen() {
		return this._popover?.open;
	}

	get ariaLabelledByText() {
		return `${this.text} ${this.accessibleName}`.trim();
	}

	get menuHeaderTextPhone() {
		return this.text;
	}

	get isPhone() {
		return isPhone();
	}

	get labelBack() {
		return MenuItem.i18nBundle.getText(MENU_BACK_BUTTON_ARIA_LABEL);
	}

	get labelClose() {
		return MenuItem.i18nBundle.getText(MENU_CLOSE_BUTTON_ARIA_LABEL);
	}

	get acessibleNameText() {
		return MenuItem.i18nBundle.getText(MENU_POPOVER_ACCESSIBLE_NAME);
	}

	get isSeparator(): boolean {
		return false;
	}

	get isGroup(): boolean {
		return false;
	}

	get _parentGroup() {
		const parent = this.parentElement;
		return parent && "isGroup" in parent && parent.isGroup ? parent as MenuItemGroup : null;
	}

	get _parentItemSelectionMode() {
		return this._parentGroup ? this._parentGroup?.itemSelectionMode : ItemSelectionMode.None;
	}

	get _list() {
		return this.shadowRoot!.querySelector<List>("[ui5-list]")!;
	}

	get _menuItemsNavigation() {
		const items: MenuItem[] = [];
		const slottedItems = this.getSlottedNodes<MenuItem>("items");

		slottedItems.forEach(item => {
			if (item.isGroup) {
				const groupItems = item.getSlottedNodes<MenuItem>("items");
				items.push(...groupItems);
			} else if (!item.isSeparator) {
				items.push(item);
			}
		});

		return items;
	}

	get _markSelected() {
		return this.isSelected && this._parentItemSelectionMode !== ItemSelectionMode.None;
	}

	onBeforeRendering() {
		const siblingsWithIcon = this._menuItemsAll.some(menuItem => !!menuItem.icon);
		const itemSelectionMode = this._parentItemSelectionMode;

		this._menuItemsAll.forEach(item => {
			item._siblingsWithIcon = siblingsWithIcon;
		});

		if (itemSelectionMode === ItemSelectionMode.None) {
			return;
		}
		if (itemSelectionMode === ItemSelectionMode.SingleSelect && this.isSelected) {
			this._parentGroup?._clearSelectedItems();
			this.isSelected = true;
		}
	}

	_setupItemNavigation() {
		if (this._list) {
			this._list._itemNavigation._getItems = () => this._menuItemsNavigation;
		}
	}

	get _focusable() {
		return true;
	}

	get _role() {
		switch (this._parentItemSelectionMode) {
		case ItemSelectionMode.SingleSelect:
			return "menuitemradio";
		case ItemSelectionMode.MultiSelect:
			return "menuitemcheckbox";
		default:
			return "menuitem";
		}
	}

	get _accInfo() {
		const accInfoSettings = {
			role: this.accessibilityAttributes.role || this._role,
			ariaHaspopup: this.hasSubmenu ? AriaHasPopup.Menu.toLowerCase() as Lowercase<AriaHasPopup> : undefined,
			ariaKeyShortcuts: this.accessibilityAttributes.ariaKeyShortcuts,
			ariaHidden: !!this.additionalText && !!this.accessibilityAttributes.ariaKeyShortcuts ? true : undefined,
			ariaChecked: this._markSelected ? true : undefined,
		};

		return { ...super._accInfo, ...accInfoSettings };
	}

	get _popover() {
		return this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	get _menuItemGroups() {
		return this.items.filter((item) : item is MenuItemGroup => item.isGroup);
	}

	get _menuItems() {
		return this.items.filter((item): item is MenuItem => !item.isSeparator);
	}

	// Return only the menu items, including items that belong to groups, but excluding separators
	get _menuItemsAll() {
		const items: MenuItem[] = [];

		this.items.forEach(item => {
			if (item.isGroup) {
				items.push(...(item as MenuItemGroup)._menuItems);
			} else if (!item.isSeparator) {
				items.push(item as MenuItem);
			}
		});

		return items;
	}

	_closeAll() {
		if (this._popover) {
			this._popover.open = false;
		}
		this.selected = false;
		this.fireEvent("close-menu", {});
	}

	_close() {
		if (this._popover) {
			this._popover.open = false;
		}
		this.selected = false;
	}

	_beforePopoverOpen(e: CustomEvent) {
		const prevented = !this.fireEvent<MenuBeforeOpenEventDetail>("before-open", {}, true, false);

		if (prevented) {
			e.preventDefault();
		}
	}

	_afterPopoverOpen() {
		this._menuItemsAll[0]?.focus();
		this.fireEvent("open", {}, false, false);
	}

	_beforePopoverClose(e: CustomEvent<ResponsivePopoverBeforeCloseEventDetail>) {
		const prevented = !this.fireEvent<MenuBeforeCloseEventDetail>("before-close", { escPressed: e.detail.escPressed }, true, false);

		if (prevented) {
			e.preventDefault();
			return;
		}

		this.selected = false;
		if (e.detail.escPressed) {
			this.focus();
			if (isPhone()) {
				this.fireEvent("close-menu", {});
			}
		}
	}

	_afterPopoverClose() {
		this.fireEvent("close", {}, false, false);
	}
}

MenuItem.define();

export default MenuItem;

export type {
	MenuBeforeCloseEventDetail,
	MenuBeforeOpenEventDetail,
	MenuItemAccessibilityAttributes,
};
