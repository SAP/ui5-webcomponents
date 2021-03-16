import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.TableRowType.prototype
 * @public
 */
const TableRowTypes = {
	/**
	 * Indicates that the table row does not have any active feedback when item is pressed.
	 * @public
	 * @type {Inactive}
	 */
	Inactive: "Inactive",

	/**
	 * Indicates that the table row is clickable via active feedback when item is pressed.
	 * @public
	 * @type {Active}
	 */
	Active: "Active",
};

/**
 * @class
 * Different types of TableRow.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TableRowType
 * @public
 * @enum {string}
 */
class TableRowType extends DataType {
	static isValid(value) {
		return !!TableRowTypes[value];
	}
}

TableRowType.generateTypeAccessors(TableRowTypes);

export default TableRowType;
