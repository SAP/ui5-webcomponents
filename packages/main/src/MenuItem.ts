import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import type Menu from "./Menu.js";

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
 * `ui5-menu-item` is an abstract element, representing a node in a `ui5-menu`. The menu itself is rendered as a list,
 * and each `ui5-menu-item` is represented by a list item (`ui5-li`) in that list. Therefore, you should only use
 * `ui5-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MenuItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.3.0
 * @public
 */
@customElement("ui5-menu-item")
class MenuItem extends UI5Element {
	/**
	 * Defines the text of the tree item.
	 * @default ""
	 * @public
	 */
	@property()
	text = "";

	/**
	 * Defines the `additionalText`, displayed in the end of the menu item.
	 *
	 * **Note:** The additional text would not be displayed if the item has a submenu.
	 * @default ""
	 * @public
	 * @since 1.8.0
	 */
	@property()
	additionalText = "";

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
	 * Defines whether a visual separator should be rendered before the item.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	startsSection = false;

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
	 * @default ""
	 * @public
	 * @since 1.7.0
	 */
	@property()
	accessibleName = "";

	/**
	 * Defines the text of the tooltip for the menu item.
	 * @default undefined
	 * @public
	 * @since 1.23.0
	 */
	@property()
	tooltip?: string;

	/**
	 * Indicates whether any of the element siblings have children items.
	 */
	@property({ type: Boolean, noAttribute: true })
	_siblingsWithChildren = false;

	/**
	 * Indicates whether any of the element siblings have icon.
	 */
	@property({ type: Boolean, noAttribute: true })
	_siblingsWithIcon = false;

	/**
	 * Defines whether the submenu closing must be prevented
	 */
	@property({ type: Boolean, noAttribute: true })
	_preventSubMenuClose = false;

	/**
	 * Stores Menu object with submenu items
	 */
	@property({ type: Object })
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

	get hasDummyIcon() {
		return this._siblingsWithIcon && !this.icon;
	}

	get subMenuOpened() {
		return !!this._subMenu?._popover?.isOpen();
	}

	get _additionalText() {
		return this.hasSubmenu ? "" : this.additionalText;
	}

	get ariaLabelledByText() {
		return `${this.text} ${this.accessibleName}`.trim();
	}
}

MenuItem.define();

export default MenuItem;
