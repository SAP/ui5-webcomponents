import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.BusyIndicatorSize.prototype
 * @public
 */
const BusyIndicatorSizes = {
	/**
	 * small size
	 * @public
	 * @type {Small}
	 */
	Small: "Small",

	/**
	 * medium size
	 * @public
	 * @type {Medium}
	 */
	Medium: "Medium",

	/**
	 * large size
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
 * @alias sap.ui.webcomponents.main.types.BusyIndicatorSize
 * @public
 * @enum {string}
 */
class BusyIndicatorSize extends DataType {
	static isValid(value) {
		return !!BusyIndicatorSizes[value];
	}
}

BusyIndicatorSize.generataTypeAcessors(BusyIndicatorSizes);

export default BusyIndicatorSize;
