import Core from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Core";
import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import URI from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/URI";

// Template
import ShellBarItemRenderer from "./build/compiled/ShellBarItemRenderer.lit";

/**
 * @public
 */
const metadata = {
	tag: "ui5-shellbar-item",
	properties: /** @lends sap.ui.webcomponents.main.ShellBarItem.prototype */ {
		/**
		 * Defines the item source URI.
		 * @type {URI}
		 * @public
		 */
		src: {
			type: URI,
			defaultValue: null,
		},

		/**
		 * Defines the item text.
		 * @type {String}
		 * @public
		 */
		text: {
			type: String,
			defaultValue: null,
		},

		_icon: { type: HTMLElement },
	},

	events: /** @lends sap.ui.webcomponents.main.ShellBarItem.prototype */ {
		/**
		 * Fired, when the item is pressed.
		 *
		 * @event
		 * @public
		 */
		press: {},
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
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-shellbar-item
 * @public
 */
class ShellBarItem extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return ShellBarItemRenderer;
	}

	static get calculateTemplateContext() {
		return state => { return { ctr: state }; };
	}
}

Core.boot().then(_ => {
	ShellBarItem.define();
});

export default ShellBarItem;
