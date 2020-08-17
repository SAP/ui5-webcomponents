import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.ListMode.prototype
 * @public
 */
const ListModes = {
	/**
	 * Default mode (no selection).
	 * @public
	 * @type {None}
	 */
	None: "None",

	/**
	 * Right-positioned single selection mode (only one list item can be selected).
	 * @public
	 * @type {SingleSelect}
	 */
	SingleSelect: "SingleSelect",

	/**
	 * Left-positioned single selection mode (only one list item can be selected).
	 * @public
	 * @type {SingleSelectBegin}
	 */
	SingleSelectBegin: "SingleSelectBegin",

	/**
	 * Selected item is highlighted but no selection element is visible
	 * (only one list item can be selected).
	 * @public
	 * @type {SingleSelectEnd}
	 */
	SingleSelectEnd: "SingleSelectEnd",

	/**
	 * Selected item is highlighted and selection is changed upon arrow navigation
	 * (only one list item can be selected - this is always the focused item).
	 * @public
	 * @type {SingleSelectAuto}
	 */
	SingleSelectAuto: "SingleSelectAuto",

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
 * @alias sap.ui.webcomponents.main.types.ListMode
 * @public
 * @enum {string}
 */
class ListMode extends DataType {
	static isValid(value) {
		return !!ListModes[value];
	}
}

ListMode.generataTypeAcessors(ListModes);

export default ListMode;
