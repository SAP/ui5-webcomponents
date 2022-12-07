/**
 * Different input types.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.InputType
 */
enum InputType {
	/**
	 * Defines a one-line text input field:
	 * @public
	 * @type {Text}
	 */
	Text = "Text",

	/**
	 * Used for input fields that must contain an e-mail address.
	 * @public
	 * @type {Email}
	 */
	Email = "Email",

	/**
	 * Defines a numeric input field.
	 * @public
	 * @type {Number}
	 */
	Number = "Number",

	/**
	 * Defines a password field.
	 * @public
	 * @type {Password}
	 */
	Password = "Password",

	/**
	 * Used for input fields that should contain a telephone number.
	 * @public
	 * @type {Tel}
	 */
	Tel = "Tel",

	/**
	 * Used for input fields that should contain a URL address.
	 * @public
	 * @type {URL}
	 */
	URL = "URL",
}

export default InputType;
