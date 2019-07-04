import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of BusyIndicator.
 */
const BusyIndicatorTypes = {
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

class BusyIndicatorType extends DataType {
	static isValid(value) {
		return !!BusyIndicatorTypes[value];
	}
}

BusyIndicatorType.generataTypeAcessors(BusyIndicatorTypes);

export default BusyIndicatorType;
