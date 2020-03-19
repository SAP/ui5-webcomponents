import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.InputType.prototype
 * @public
 */
const InputTypes = {
	/**
	 * <ui5-input type="text"></ui5-input> defines a one-line text input field:
	 * @public
	 * @type {Text}
	 */
	Text: "Text",

	/**
	 * The <ui5-input type="email"></ui5-input> is used for input fields that must contain an e-mail address.
	 * @public
	 * @type {Email}
	 */
	Email: "Email",

	/**
	 * The <ui5-input type="number"></ui5-input> defines a numeric input field.
	 * @public
	 * @type {Number}
	 */
	Number: "Number",

	/**
	 * <ui5-input type="password"></ui5-input> defines a password field.
	 * @public
	 * @type {Password}
	 */
	Password: "Password",

	/**
	 * The <ui5-input type="url"></ui5-input> is used for input fields that should contain a telephone number.
	 * @public
	 * @type {Tel}
	 */
	Tel: "Tel",

	/**
	 * The <i5-input type="url"></ui5-input> is used for input fields that should contain a URL address.
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

InputType.generataTypeAcessors(InputTypes);

export default InputType;
