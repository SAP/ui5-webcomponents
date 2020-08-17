import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

// Template
import ShellBarItemTemplate from "./generated/templates/ShellBarItemTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-shellbar-item",
	properties: /** @lends sap.ui.webcomponents.fiori.ShellBarItem.prototype */ {
		/**
		 * Defines the name of the item's icon.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines the item text.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the count displayed in the top-right corner.
		 * @type {string}
		 * @defaultValue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		count: {
			type: String,
		},

		/**
		 * Defines the stable selector that you can use via getStableDomRef method.
		 * @public
		 * @since 1.0.0-rc.8
		 */
		stableDomRef: {
			type: String,
		},
	},

	events: /** @lends sap.ui.webcomponents.fiori.ShellBarItem.prototype */ {
		/**
		 * Fired, when the item is pressed.
		 *
		 * @event sap.ui.webcomponents.fiori.ShellBarItem#item-click
		 * @param {HTMLElement} targetRef dom ref of the clicked element
		 * @public
		 */
		"item-click": {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 * The <code>ui5-shellbar-item</code> represents a custom item, that
 * might be added to the <code>ui5-shellbar</code>.
 * <br><br>
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents-fiori/dist/ShellBarItem";</code>
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.ShellBarItem
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-shellbar-item
 * @public
 */
class ShellBarItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return ShellBarItemTemplate;
	}
}

ShellBarItem.define();

export default ShellBarItem;
