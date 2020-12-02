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
	Header: "Header",

	/**
	 * Subheader type
	 * @public
	 * @type {SubHeader}
	 */
	SubHeader: "SubHeader",

	/**
	 * Footer type
	 * @public
	 * @type {Footer}
	 */
	Footer: "Footer",

	/**
	 * Floating Footer type - there is visible border on all sides
	 * @public
	 * @type {FloatingFooter}
	 */
	FloatingFooter: "FloatingFooter",
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
