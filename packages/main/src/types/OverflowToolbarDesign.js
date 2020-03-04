import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.OverflowToolbarDesign.prototype
 * @public
 */
const OverflowToolbarTypes = {
	/**
	 * @public
	 * @type {Transparent}
	 * The toolbar and its content will be displayed transparent.
	 */
	Transparent: "Transparent",

	/**
	 * @public
	 * @type {Solid}
	 * The toolbar has a solid background.
	 */
	Solid: "Solid",
};

/**
 * @class
 * Different types of Overflow Toolbar.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.OverflowToolbarDesign
 * @public
 * @enum {string}
 */
class OverflowToolbarDesign extends DataType {
	static isValid(value) {
		return !!OverflowToolbarTypes[value];
	}
}

OverflowToolbarDesign.generataTypeAcessors(OverflowToolbarTypes);

export default OverflowToolbarDesign;
