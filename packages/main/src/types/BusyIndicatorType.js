import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

/**
 * Different types of Button.
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
