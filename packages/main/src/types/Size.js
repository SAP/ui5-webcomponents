import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.Size.prototype
 * @public
 */
const Sizes = {
	/**
	 * Small size
	 * @public
	 * @type {Small}
	 */
	Small: "Small",

	/**
	 * Medium size
	 * @public
	 * @type {Medium}
	 */
	Medium: "Medium",

	/**
	 * Large size
	 * @public
	 * @type {Large}
	 */
	Large: "Large",
};

/**
 * @class
 * Different types of BusyIndicator.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.Size
 * @public
 * @enum {string}
 */
class Size extends DataType {
	static isValid(value) {
		return !!Sizes[value];
	}
}

Size.generataTypeAcessors(Sizes);

export default Size;
