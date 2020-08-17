import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.ButtonDesign.prototype
 * @public
 */
const ButtonTypes = {
	/**
	 * default type (no special styling)
	 * @public
	 * @type {Default}
	 */
	Default: "Default",

	/**
	 * accept type (green button)
	 * @public
	 * @type {Positive}
	 */
	Positive: "Positive",

	/**
	 * reject style (red button)
	 * @public
	 * @type {Negative}
	 */
	Negative: "Negative",

	/**
	 * transparent type
	 * @public
	 * @type {Transparent}
	 */
	Transparent: "Transparent",

	/**
	 * emphasized type
	 * @public
	 * @type {Emphasized}
	 */
	Emphasized: "Emphasized",
};

/**
 * @class
 * Different types of Button.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.ButtonDesign
 * @public
 * @enum {string}
 */
class ButtonDesign extends DataType {
	static isValid(value) {
		return !!ButtonTypes[value];
	}
}

ButtonDesign.generataTypeAcessors(ButtonTypes);

export default ButtonDesign;
