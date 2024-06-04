import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import AriaHasPopup from "@ui5/webcomponents-base/dist/types/AriaHasPopup.js";
import ListItem from "./ListItem.js";
import ResponsivePopover from "./ResponsivePopover.js";
import PopoverPlacement from "./types/PopoverPlacement.js";
import List from "./List.js";
import Icon from "./Icon.js";
import BusyIndicator from "./BusyIndicator.js";
import MenuItemTemplate from "./generated/templates/MenuItemTemplate.lit.js";
import {
	MENU_BACK_BUTTON_ARIA_LABEL,
	MENU_CLOSE_BUTTON_ARIA_LABEL,
} from "./generated/i18n/i18n-defaults.js";
import type { ResponsivePopoverBeforeCloseEventDetail } from "./ResponsivePopover.js";
import { IMenuItem } from "./Menu.js";

// Styles
import menuItemCss from "./generated/themes/MenuItem.css.js";

type MenuBeforeOpenEventDetail = { item?: MenuItem };
type MenuBeforeCloseEventDetail = { escPressed: boolean };

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
	 * @default ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Defines the `additionalText`, displayed in the end of the menu item.
	 *
	 * **Note:** The additional text would not be displayed if the item has a submenu.
	 * @default ""
	 * @public
	 * @since 1.8.0
	 */
	@property()
	additionalText!: string;

	/**
	 * Defines the icon to be displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 *
	 * **Example:**
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines whether `ui5-menu-item` is in disabled state.
	 *
	 * **Note:** A disabled `ui5-menu-item` is noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover.
	 *
	 * **Note:** If set to `true` a `ui5-busy-indicator` component will be displayed into the related one to the current `ui5-menu-item` sub-menu popover.
	 * @default false
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Boolean })
	loading!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover.
	 * @default 1000
	 * @public
	 * @since 1.13.0
	 */
	@property({ validator: Integer, defaultValue: 1000 })
	loadingDelay!: number;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default ""
	 * @public
	 * @since 1.7.0
	 */
	@property()
	accessibleName!: string;

	/**
	 * Defines the text of the tooltip for the menu item.
	 * @default ""
	 * @public
	 * @since 1.23.0
	 */
	@property({ type: String })
	tooltip!: string;

	/**
	 * Indicates whether any of the element siblings have icon.
	 */
	@property({ type: Boolean, noAttribute: true })
	_siblingsWithIcon!: boolean;

	/**
	 * Defines the items of this component.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<MenuItem>;

	get placement(): `${PopoverPlacement}` {
		return this.isRtl ? "Start" : "End";
	}

	get isRtl() {
		return this.effectiveDir === "rtl";
	}

	get hasSubmenu() {
		return !!(this.items.length || this.loading);
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

	/**
	 * Defines if the item is a separator.
	 * @default false
	 * @public
	 * @since 2.0
	 */
	get isSeparator(): boolean {
		return false;
	}

	onBeforeRendering() {
		const siblingsWithIcon = this._menuItems.some(menuItem => !!menuItem.icon);

		this._menuItems.forEach(item => {
			item._siblingsWithIcon = siblingsWithIcon;
		});
	}

	get _focusable() {
		return true;
	}

	get _accInfo() {
		const accInfoSettings = {
			role: "menuitem",
			ariaHaspopup: this.hasSubmenu ? AriaHasPopup.Menu.toLowerCase() as Lowercase<AriaHasPopup> : undefined,
		};

		return { ...super._accInfo, ...accInfoSettings };
	}

	get _popover() {
		return this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	get _menuItems() {
		return this.items.filter(item => !item.isSeparator);
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
		this.items[0]?.focus();
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
};
