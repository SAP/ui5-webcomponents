import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of Button.
 */
const ButtonTypes = {
	/**
	 * default type (no special styling)
	 */
	Default: "Default",

	/**
	 * accept type (green button)
	 */
	Positive: "Positive",

	/**
	 * reject style (red button)
	 */
	Negative: "Negative",

	/**
	 * transparent type
	 */
	Transparent: "Transparent",

	/**
	 * emphasized type
	 */
	Emphasized: "Emphasized",
};

class ButtonDesign extends DataType {
	static isValid(value) {
		return !!ButtonTypes[value];
	}
}

ButtonDesign.generataTypeAcessors(ButtonTypes);

export default ButtonDesign;
