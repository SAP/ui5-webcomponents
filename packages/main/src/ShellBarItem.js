import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";

// Template
import ShellBarItemTemplate from "./build/compiled/ShellBarItemTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-shellbar-item",
	properties: /** @lends sap.ui.webcomponents.main.ShellBarItem.prototype */ {
		/**
		 * Defines the item source URI.
		 * @type {string}
		 * @public
		 */
		src: {
			type: String,
		},

		/**
		 * Defines the item text.
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		text: {
			type: String,
		},

		_icon: { type: HTMLElement },
	},

	events: /** @lends sap.ui.webcomponents.main.ShellBarItem.prototype */ {
		/**
		 * Fired, when the item is pressed.
		 *
		 * @event
		 * @param {HTMLElement} targetRef dom ref of the clicked element
		 * @public
		 */
		press: {
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
 * <code>import "@ui5/webcomponents/dist/ShellBarItem";</code>
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ShellBarItem
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
