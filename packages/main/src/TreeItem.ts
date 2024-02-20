import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
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
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents/dist/TreeItem.js";</code>
 *
 * @csspart title - Used to style the title of the tree list item
 * @csspart additionalText - Used to style the additionalText of the tree list item
 * @csspart icon - Used to style the icon of the tree list item
 *
 * @constructor
 * @extends TreeItemBase
 * @public
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
	 * @default ""
	 */
	@property()
	text!: string;

	/**
	 * Defines the <code>additionalText</code>, displayed in the end of the tree item.
	 * @default ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	additionalText!: string;

	get _showTitle() {
		return this.text.length;
	}
}

TreeItem.define();

export default TreeItem;
