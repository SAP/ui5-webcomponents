import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tree-item",
	properties: /** @lends sap.ui.webcomponents.main.TreeItem.prototype */ {

		/**
		 * Defines the text of the tree item.
		 *
		 * @public
		 * @type {String}
		 * @defaultValue ""
		 */
		text: {
			type: String,
		},

		/**
		 * Defines whether the tree node is expanded or collapsed. Only has visual effect for tree nodes with children.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		expanded: {
			type: Boolean,
		},

		/**
		 * Defines whether the tree node has children, even if currently no other tree nodes are slotted inside.
		 * <br>
		 * <i>Note:</i> This property is useful for showing big tree structures where not all nodes are initially loaded due to performance reasons.
		 * Set this to <code>true</code> for nodes you intend to load lazily, when the user clicks the expand button.
		 * It is not necessary to set this property otherwise. If a tree item has children, the expand button will be displayed anyway.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hasChildren: {
			type: Boolean,
		},

		/**
		 * Defines whether the tree node is selected by the user. Only has effect if the <code>ui5-tree</code> is in one of the
		 * following modes: in <code>SingleSelect</code>, <code>SingleSelectBegin</code>, <code>SingleSelectEnd</code> and <code>MultiSelect</code>.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * If set, an icon will be displayed before the text, representing the tree item.
		 *
		 * @public
		 * @type {String}
		 * @defaultValue ""
		 */
		icon: {
			type: String,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.TreeItem.prototype */ {

		/**
		 * Defines the items of this <code>ui5-tree-item</code>.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: HTMLElement,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * This is the item to use inside a <code>ui5-tree</code>.
 * You can represent an arbitrary tree structure by recursively nesting tree items.
 *
 * <h3>Usage</h3>
 * <code>ui5-tree-item</code> is an abstract element, representing a node in a <code>ui5-tree</code>. The tree itself is rendered as a list,
 * and each <code>ui5-tree-item</code> is represented by a list item(<code>ui5-li-tree</code>) in that list. Therefore, you should only use
 * <code>ui5-tree-item</code> directly in your apps. The <code>ui5-li-tree</code> list item is internal for the list, and not intended for public use.
 *
 * <h3>ES6 Module Import</h3>
 * <code>import @ui5/webcomponents/dist/TreeItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TreeItem
 * @extends UI5Element
 * @tagname ui5-tree-item
 * @public
 * @since 1.0.0-rc.8
 */
class TreeItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	get items() {
		return [...this.children];
	}

	get requiresToggleButton() {
		return this.hasChildren || this.items.length > 0;
	}

	/**
	 * Call this method to manually switch the <code>expanded</code> state of a tree item.
	 *
	 * @public
	 */
	toggle() {
		this.expanded = !this.expanded;
	}
}

TreeItem.define();

export default TreeItem;
