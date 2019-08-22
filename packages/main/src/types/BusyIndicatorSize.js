import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of BusyIndicator.
 */
const BusyIndicatorSizes = {
	/**
	 * small size
	 */
	Small: "Small",

	/**
	 * medium size
	 */
	Medium: "Medium",

	/**
	 * large size
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
