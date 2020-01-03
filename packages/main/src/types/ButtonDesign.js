import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of Button.
 * @public
 */
const ButtonTypes = {
	/**
	 * default type (no special styling)
	 * @public
	 */
	Default: "Default",

	/**
	 * accept type (green button)
	 * @public
	 */
	Positive: "Positive",

	/**
	 * reject style (red button)
	 * @public
	 */
	Negative: "Negative",

	/**
	 * transparent type
	 * @public
	 */
	Transparent: "Transparent",

	/**
	 * emphasized type
	 * @public
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
