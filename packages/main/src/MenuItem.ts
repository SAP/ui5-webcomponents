import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import type Menu from "./Menu.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-menu-item</code> is the item to use inside a <code>ui5-menu</code>.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * <h3>Usage</h3>
 *
 * <code>ui5-menu-item</code> is an abstract element, representing a node in a <code>ui5-menu</code>. The menu itself is rendered as a list,
 * and each <code>ui5-menu-item</code> is represented by a list item (<code>ui5-li</code>) in that list. Therefore, you should only use
 * <code>ui5-menu-item</code> directly in your apps. The <code>ui5-li</code> list item is internal for the list, and not intended for public use.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/MenuItem.js";</code>
 *
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
	 *
	 * @default ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Defines the <code>additionalText</code>, displayed in the end of the menu item.
	 * <b>Note:</b> The additional text would not be displayed if the item has a submenu.
	 *
	 * @default ""
	 * @public
	 * @since 1.8.0
	 */
	@property()
	additionalText!: string;

	/**
	 * Defines the icon to be displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 * <br><br>
	 <b>* Example:</b>
	 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html">Icon Explorer</ui5-link>.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines whether a visual separator should be rendered before the item.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	startsSection!: boolean;

	/**
	 * Defines whether <code>ui5-menu-item</code> is in disabled state.
	 * <br><br>
	 * <b>Note:</b> A disabled <code>ui5-menu-item</code> is noninteractive.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will be displayed inside the corresponding ui5-menu popover.
	 *
	 * Note: If set to <code>true</code> a <code>ui5-busy-indicator</code> component will be displayed into the related one to the current <code>ui5-menu-item</code> sub-menu popover.
	 *
	 * @default false
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Boolean })
	busy!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will be displayed inside the corresponding ui5-menu popover.
	 *
	 * @default 1000
	 * @public
	 * @since 1.13.0
	 */
	@property({ validator: Integer, defaultValue: 1000 })
	busyDelay!: number;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @default ""
	 * @public
	 * @since 1.7.0
	 */
	@property()
	accessibleName!: string;

	/**
	 * Indicates whether any of the element siblings have children items.
	 */
	@property({ type: Boolean, noAttribute: true })
	_siblingsWithChildren!: boolean;

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
	 *
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<MenuItem>;

	get hasSubmenu() {
		return !!(this.items.length || this.busy);
	}

	get hasDummyIcon() {
		return this._siblingsWithIcon && !this.icon;
	}

	get subMenuOpened() {
		return !!this._subMenu;
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
