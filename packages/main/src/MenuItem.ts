import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CustomListItem from "./CustomListItem.js";
import MenuItemTemplate from "./generated/templates/MenuItemTemplate.lit.js";
import type Menu from "./Menu.js";
import HasPopup from "./types/HasPopup.js";

// Styles
import menuItemCss from "./generated/themes/MenuItem.css.js";

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
 * @extends CustomListItem
 * @since 1.3.0
 * @public
 */
@customElement({
	tag: "ui5-menu-item",
	template: MenuItemTemplate,
	styles: [CustomListItem.styles, menuItemCss],
})
class MenuItem extends CustomListItem {
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
	 * Defines whether a visual separator should be rendered before the item.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	startsSection!: boolean;

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
	 * Defines the delay in milliseconds, after which the busy indicator will be displayed inside the corresponding ui5-menu popover.
	 *
	 * **Note:** If set to `true` a `ui5-busy-indicator` component will be displayed into the related one to the current `ui5-menu-item` sub-menu popover.
	 * @default false
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Boolean })
	loading!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will be displayed inside the corresponding ui5-menu popover.
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
	 * Defines whether the submenu closing must be prevented
	 */
	@property({ type: Boolean, noAttribute: true })
	_preventSubMenuClose!: boolean;

	/**
	 * Stores Menu object with submenu items
	 */
	@property({ type: Object, defaultValue: undefined })
	_subMenu?: Menu;

	/**
	 * Defines the items of this component.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<MenuItem>;

	get hasSubmenu() {
		return !!(this.items.length || this.loading);
	}

	get hasIcon() {
		return !!this.icon;
	}

	get subMenuOpened() {
		return !!this._subMenu?._popover?.isOpen();
	}

	get ariaLabelledByText() {
		return `${this.text} ${this.accessibleName}`.trim();
	}

	get _focusable() {
		return true;
	}

	get _accInfo() {
		const accInfoSettings = {
			role: "menuitem",
			listItemAriaLabel: this.text,
			ariaHaspopup: this.hasSubmenu ? HasPopup.Menu.toLowerCase() as Lowercase<HasPopup> : undefined,
		};

		return { ...super._accInfo, ...accInfoSettings };
	}
}

MenuItem.define();

export default MenuItem;
