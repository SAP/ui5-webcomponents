import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tree-item",
	properties: /** @lends sap.ui.webcomponents.main.TreeItem.prototype */ {
		text: {
			type: String,
		},
		expanded: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.TreeItem.prototype */ {
		"default": {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.TreeItem.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-tree-item</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/TreeItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TreeItem
 * @extends UI5Element
 * @tagname ui5-tree-item
 * @public
 */
class TreeItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	get items() {
		return [...this.children].filter(child => child.localName === "ui5-tree-item");
	}

	get hasChildren() {
		return this.items.length > 0;
	}

	toggle() {
		this.expanded = !this.expanded;
	}
}

TreeItem.define();

export default TreeItem;
