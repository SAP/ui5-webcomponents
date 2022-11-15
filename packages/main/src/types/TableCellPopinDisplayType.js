import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.TableCellPopinDisplayType.prototype
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
 * @alias sap.ui.webcomponents.main.types.TableCellPopinDisplayType
 * @public
 * @enum {string}
 */
class popinDisplay extends DataType {
	static isValid(value) {
		return !!DisplayType[value];
	}
}

popinDisplay.generateTypeAccessors(DisplayType);

export default popinDisplay;
