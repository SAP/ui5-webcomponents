import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-side-navigation-item",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.SideNavigationItem.prototype */ {
		/**
		 * Defines the text of the item.
		 *
		 * @public
		 * @type {string}
		 * @defaultvalue ""
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the icon of the item.
		 * <br><br>
		 *
		 * The SAP-icons font provides numerous options.
		 * <br>
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * @public
		 * @type {string}
		 * @defaultvalue ""
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines if the item is expanded
		 *
		 * @public
		 * @type {boolean}
		 * @defaultvalue false
		 */
		expanded: {
			type: Boolean,
		},

		/**
		 * Defines whether the subitem is selected
		 *
		 * @public
		 * @type {boolean}
		 * @defaultvalue false
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * Defines whether pressing the whole item or only pressing the icon will show/hide the items's sub items(if present).
		 * If set to true, pressing the whole item will toggle the sub items, and it won't fire the <code>click</code> event.
		 * By default, only pressing the arrow icon will toggle the sub items & the click event will be fired if the item is pressed outside of the icon.
		 *
		 * @public
		 * @type {boolean}
		 * @defaultvalue false
		 * @since 1.0.0-rc.11
		 */
		wholeItemToggleable: {
			type: Boolean,
		},
	},

	events: {
		/**
		 * @public
		 * @event
		 * @since 1.0.0-rc.9
		 */
		click: {

		},
	},

	slots: /** @lends sap.ui.webcomponents.fiori.SideNavigationItem.prototype */ {
		/**
		 * If you wish to nest menus, you can pass inner menu items to the default slot.
		 *
		 * @type {HTMLElement[]}
		 * @public
		 * @slot items
		 */
		"default": {
			propertyName: "items",
			invalidateOnChildChange: true,
			type: HTMLElement,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-side-navigation-item</code> is used within <code>ui5-side-navigation</code> only.
 * Via the <code>ui5-side-navigation-item</code> you control the content of the <code>SideNavigation</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents-fiori/dist/SideNavigationItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.SideNavigationItem
 * @extends UI5Element
 * @tagname ui5-side-navigation-item
 * @public
 * @since 1.0.0-rc.8
 */
class SideNavigationItem extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

SideNavigationItem.define();

export default SideNavigationItem;
