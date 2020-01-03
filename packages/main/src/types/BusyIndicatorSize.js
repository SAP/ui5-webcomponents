import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of BusyIndicator.
 * @public
 */
const BusyIndicatorSizes = {
	/**
	 * small size
	 * @public
	 */
	Small: "Small",

	/**
	 * medium size
	 * @public
	 */
	Medium: "Medium",

	/**
	 * large size
	 * @public
	 */
	Large: "Large",
};

class BusyIndicatorSize extends DataType {
	static isValid(value) {
		return !!BusyIndicatorSizes[value];
	}
}

BusyIndicatorSize.generataTypeAcessors(BusyIndicatorSizes);

export default BusyIndicatorSize;
