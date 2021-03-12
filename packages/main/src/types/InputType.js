import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.InputType.prototype
 * @public
 */
const InputTypes = {
	/**
	 * Defines a one-line text input field:
	 * @public
	 * @type {Text}
	 */
	Text: "Text",

	/**
	 * Used for input fields that must contain an e-mail address.
	 * @public
	 * @type {Email}
	 */
	Email: "Email",

	/**
	 * Defines a numeric input field.
	 * @public
	 * @type {Number}
	 */
	Number: "Number",

	/**
	 * Defines a password field.
	 * @public
	 * @type {Password}
	 */
	Password: "Password",

	/**
	 * Used for input fields that should contain a telephone number.
	 * @public
	 * @type {Tel}
	 */
	Tel: "Tel",

	/**
	 * Used for input fields that should contain a URL address.
	 * @public
	 * @type {URL}
	 */
	URL: "URL",
};

/**
 * @class
 * Defines input types
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.InputType
 * @public
 * @enum {string}
 */
class InputType extends DataType {
	static isValid(value) {
		return !!InputTypes[value];
	}
}

InputType.generateTypeAccessors(InputTypes);

export default InputType;
