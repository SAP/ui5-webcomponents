import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.TreeMode.prototype
 * @public
 */
const TreeModes = {
	/**
	 * Default mode (no selection).
	 * @public
	 * @type {None}
	 */
	None: "None",

	/**
	 * Single selection mode (only one list item can be selected).
	 * @public
	 * @type {SingleSelect}
	 */
	SingleSelect: "SingleSelect",

	/**
	 * Multi selection mode (more than one list item can be selected).
	 * @public
	 * @type {MultiSelect}
	 */
	MultiSelect: "MultiSelect",

	/**
	 * Delete mode (only one list item can be deleted via provided delete button)
	 * @public
	 * @type {Delete}
	 */
	Delete: "Delete",
};

/**
 * @class
 * Defines the type of <code>ui5-list</code>.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TreeMode
 * @public
 * @enum {string}
 */
class TreeMode extends DataType {
	static isValid(value) {
		return !!TreeModes[value];
	}
}

TreeMode.generataTypeAcessors(TreeModes);

export default TreeMode;
