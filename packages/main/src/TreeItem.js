import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import TreeItemBase from "./TreeItemBase.js";
// Template
import TreeItemTemplate from "./generated/templates/TreeItemTemplate.lit.js";

// Styles
import treeItemCss from "./generated/themes/TreeItem.css.js";

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
		 * @type {string}
		 * @defaultValue ""
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the <code>additionalText</code>, displayed in the end of the tree item.
		 * @type {string}
		 * @public
		 * @since 1.0.0-rc.15
		 */
		additionalText: {
			type: String,
		},

		/**
		 * Defines the state of the <code>additionalText</code>.
		 * <br>
		 * Available options are: <code>"None"</code> (by default), <code>"Success"</code>, <code>"Warning"</code>, <code>"Information"</code> and <code>"Error"</code>.
		 * @type {sap.ui.webcomponents.base.types.ValueState}
		 * @defaultvalue "None"
		 * @public
		 * @since 1.0.0-rc.15
		 */
		additionalTextState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-tree-item</code> represents a node in a tree structure, shown as a <code>ui5-list</code>.
 * <br>
 * This is the item to use inside a <code>ui5-tree</code>.
 * You can represent an arbitrary tree structure by recursively nesting tree items.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-tree-item</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>title - Used to style the title of the tree list item</li>
 * <li>additionalText - Used to style the additionalText of the tree list item</li>
 * <li>icon - Used to style the icon of the tree list item</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents/dist/TreeItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TreeItem
 * @extends sap.ui.webcomponents.main.TreeItemBase
 * @tagname ui5-tree-item
 * @public
 * @implements sap.ui.webcomponents.main.ITreeItem
 * @since 1.0.0-rc.8
 */
class TreeItem extends TreeItemBase {
	static get template() {
		return TreeItemTemplate;
	}

	static get styles() {
		return [...super.styles, treeItemCss];
	}

	static get metadata() {
		return metadata;
	}

	get _showTitle() {
		return this.text.length && !this._minimal;
	}
}

TreeItem.define();

export default TreeItem;
