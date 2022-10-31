import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-side-navigation-sub-item",
	properties: /** @lends sap.ui.webcomponents.fiori.SideNavigationSubItem.prototype */ {
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
		 * Defines whether the subitem is selected.
		 *
		 * @public
		 * @type {boolean}
		 * @defaultvalue false
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * Defines the icon of the item.
		 * <br><br>
		 *
		 * The SAP-icons font provides numerous options.
		 * <br>
		 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * @public
		 * @type {string}
		 * @defaultvalue ""
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines the tooltip of the component.
		 * @type {string}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.16
		 */
		title: {
			type: String,
		},
	},

	events: /** @lends sap.ui.webcomponents.fiori.SideNavigationSubItem.prototype */ {
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-side-navigation-sub-item</code> is intended to be used inside a <code>ui5-side-navigation-item</code> only.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.SideNavigationSubItem
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-side-navigation-sub-item
 * @public
 * @since 1.0.0-rc.8
 * @implements sap.ui.webcomponents.fiori.ISideNavigationSubItem
 */
class SideNavigationSubItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	get _tooltip() {
		return this.title || this.text;
	}
}

SideNavigationSubItem.define();

export default SideNavigationSubItem;
