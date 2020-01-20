import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.ListSeparators.prototype
 * @public
 */
const ListSeparatorsTypes = {
	/**
	 * Separators between the items including the last and the first one.
	 * @public
	 * @type {All}
	 */
	All: "All",
	/**
	 * Separators between the items.
	 * <b>Note:</b> This enumeration depends on the theme.
	 * @public
	 * @type {Inner}
	 */
	Inner: "Inner",
	/**
	 * No item separators.
	 * @public
	 * @type {None}
	 */
	None: "None",
};

/**
 * @class
 * Defines which separator style will be applied for the list items.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.ListSeparators
 * @public
 * @enum {string}
 */
class ListSeparators extends DataType {
	static isValid(value) {
		return !!ListSeparatorsTypes[value];
	}
}

ListSeparators.generataTypeAcessors(ListSeparatorsTypes);

export default ListSeparators;
