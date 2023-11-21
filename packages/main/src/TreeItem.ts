import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import TreeItemBase from "./TreeItemBase.js";
// Template
import TreeItemTemplate from "./generated/templates/TreeItemTemplate.lit.js";

// Styles
import treeItemCss from "./generated/themes/TreeItem.css.js";

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
 * @alias sap.ui.webc.main.TreeItem
 * @extends sap.ui.webc.main.TreeItemBase
 * @tagname ui5-tree-item
 * @public
 * @implements sap.ui.webc.main.ITreeItem
 * @since 1.0.0-rc.8
 */
@customElement({
	tag: "ui5-tree-item",
	template: TreeItemTemplate,
	styles: [TreeItemBase.styles, treeItemCss],
})
class TreeItem extends TreeItemBase {
	/**
	 * Defines the text of the tree item.
	 *
	 * @public
	 * @type {string}
	 * @name sap.ui.webc.main.TreeItem.prototype.text
	 * @defaultValue ""
	 */
	@property()
	text!: string;

	/**
	 * Defines the <code>additionalText</code>, displayed in the end of the tree item.
	 * @type {string}
	 * @name sap.ui.webc.main.TreeItem.prototype.additionalText
	 * @defaultvalue ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	additionalText!: string;

	/**
	 * Defines the state of the <code>additionalText</code>.
	 * <br>
	 * Available options are: <code>"None"</code> (by default), <code>"Success"</code>, <code>"Warning"</code>, <code>"Information"</code> and <code>"Error"</code>.
	 * @type {sap.ui.webc.base.types.ValueState}
	 * @name sap.ui.webc.main.TreeItem.prototype.additionalTextState
	 * @defaultvalue "None"
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	additionalTextState!: `${ValueState}`;

	get _showTitle() {
		return this.text.length;
	}
}

TreeItem.define();

export default TreeItem;
