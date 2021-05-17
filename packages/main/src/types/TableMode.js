import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.TableMode.prototype
 * @public
 */
const TableModes = {
	/**
	 * Default mode (no selection).
	 * @public
	 * @type {None}
	 */
	None: "None",

	/**
	 * Single selection mode (only one table row can be selected).
	 * @public
	 * @type {SingleSelect}
	 */
	SingleSelect: "SingleSelect",

	/**
	 * Multi selection mode (more than one table row can be selected).
	 * @public
	 * @type {MultiSelect}
	 */
	MultiSelect: "MultiSelect",
};

/**
 * @class
 * Defines the type of <code>ui5-table</code>.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TableMode
 * @public
 * @enum {string}
 */
class TableMode extends DataType {
	static isValid(value) {
		return !!TableModes[value];
	}
}

TableMode.generateTypeAccessors(TableModes);

export default TableMode;
