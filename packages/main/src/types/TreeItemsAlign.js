import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of items alignment in the Tree.
 * @lends sap.ui.webcomponents.main.types.TreeItemsAlign.prototype
 * @public
 */
const TreeItemsAlignments = {
	/**
	 * The tree items will be aligned by their text - the items without icons will be indented.
	 * @public
	 * @type {Indent}
	 */
	Indent: "Indent",

	/**
	 * The tree items will be aligned from the start - the items without icons will not be indented.
	 * @public
	 * @type {Start}
	 */
	Start: "Start",
};

/**
 * Different types of items alignment in the <code>ui5-tree</code>.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TreeItemsAlign
 * @public
 * @enum {string}
 */
class TreeItemsAlign extends DataType {
	static isValid(value) {
		return !!TreeItemsAlignments[value];
	}
}

TreeItemsAlign.generateTypeAcessors(TreeItemsAlignments);

export default TreeItemsAlign;
