import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.BarDesign.prototype
 * @public
 */
const BarTypes = {
	/**
	 * Default type
	 * @public
	 * @type {BottomBorder}
	 */
	BottomBorder: "BottomBorder",

	/**
	 * Footer type
	 * @public
	 * @type {TopBorder}
	 */
	TopBorder: "TopBorder",

	/**
	 * All borders type - there is visible border on all sides
	 * @public
	 * @type {AllBorders}
	 */
	AllBorders: "AllBorders",
};

/**
 * @class
 * Different types of Bar.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.BarDesign
 * @public
 * @enum {string}
 */
class BarDesign extends DataType {
	static isValid(value) {
		return !!BarTypes[value];
	}
}

BarDesign.generateTypeAcessors(BarTypes);

export default BarDesign;
