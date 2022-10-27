import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-menu-item",
	properties: /** @lends sap.ui.webcomponents.main.MenuItem.prototype */ {
		/**
		 * Defines the text of the tree item.
		 *
		 * @type {string}
		 * @defaultValue ""
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the <code>additionalText</code>, displayed in the end of the menu item.
		 * <b>Note:</b> The additional text would not be displayed if the item has a submenu.
		 *
		 * @type {string}
		 * @public
		 * @since 1.8.0
		 */
		additionalText: {
			type: String,
		},

		/**
		 * Defines the icon to be displayed as graphical element within the component.
		 * The SAP-icons font provides numerous options.
		 * <br><br>
		 <b>* Example:</b>
		 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines whether a visual separator should be rendered before the item.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		startsSection: {
			type: Boolean,
		},

		/**
		 * Defines whether <code>ui5-menu-item</code> is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-menu-item</code> is noninteractive.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the accessible ARIA name of the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.7.0
		 */
		 accessibleName: {
			type: String,
		},

		/**
		 * Indicates whether any of the element siblings have children items.
		 * @type {boolean}
		 * @private
		 */
		 _siblingsWithChildren: {
			type: Boolean,
			noAttribute: true,
		},

		/**
		 * Indicates whether any of the element siblings have icon.
		 * @type {boolean}
		 * @private
		 */
		 _siblingsWithIcon: {
			type: Boolean,
			noAttribute: true,
		},

		/**
		 * Stores Menu object with submenu items
		 * @type {object}
		 * @private
		 */
		 _subMenu: {
			type: Object,
		},

		/**
		 * Defines whether the submenu closing must be prevented
		 * @type {boolean}
		 * @private
		 */
		 _preventSubMenuClose: {
			type: Boolean,
			noAttribute: true,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.MenuItem.prototype */ {
		/**
		 * Defines the items of this component.
		 *
		 * @type {sap.ui.webcomponents.main.IMenuItem[]}
		 * @slot items
		 * @public
		 */
		 "default": {
			propertyName: "items",
			type: HTMLElement,
			invalidateOnChildChange: true,
		},
	},
};

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
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.MenuItem
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-menu-item
 * @implements sap.ui.webcomponents.main.IMenuItem
 * @since 1.3.0
 * @public
 */
class MenuItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	get hasChildren() {
		return !!this.items.length;
	}

	get hasDummyIcon() {
		return this._siblingsWithIcon && !this.icon;
	}

	get subMenuOpened() {
		return !!Object.keys(this._subMenu).length;
	}

	get _additionalText() {
		return this.hasChildren ? "" : this.additionalText;
	}

	get ariaLabelledByText() {
		return `${this.text} ${this.accessibleName}`.trim();
	}
}

MenuItem.define();

export default MenuItem;
