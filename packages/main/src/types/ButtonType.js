import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

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

class ButtonType extends DataType {
	static isValid(value) {
		return !!ButtonTypes[value];
	}
}

ButtonType.generataTypeAcessors(ButtonTypes);

export default ButtonType;
