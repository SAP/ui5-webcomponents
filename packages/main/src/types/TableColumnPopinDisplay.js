import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.TableColumnPopinDisplay.prototype
 * @public
 */
const DisplayType = {
	/**
	 * default type
	 * @public
	 * @type {Block}
	 */
	Block: "Block",

	/**
	 * inline type (the title and value are displayed on the same line)
	 * @public
	 * @type {Inline}
	 */
	Inline: "Inline",
};

/**
 * @class
 * Different types of Cell display.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TableColumnPopinDisplay
 * @public
 * @enum {string}
 */
class TableColumnPopinDisplay extends DataType {
	static isValid(value) {
		return !!DisplayType[value];
	}
}

TableColumnPopinDisplay.generateTypeAccessors(DisplayType);

export default TableColumnPopinDisplay;
