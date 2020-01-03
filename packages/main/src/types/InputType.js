import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Defines input types
 * @public
 */
const InputTypes = {
	/**
	 * <ui5-input type="text"></ui5-input> defines a one-line text input field:
	 * @public
	 */
	Text: "Text",

	/**
	 * The <ui5-input type="email"></ui5-input> is used for input fields that must contain an e-mail address.
	 * @public
	 */
	Email: "Email",

	/**
	 * The <ui5-input type="number"></ui5-input> defines a numeric input field.
	 * @public
	 */
	Number: "Number",

	/**
	 * <ui5-input type="password"></ui5-input> defines a password field.
	 * @public
	 */
	Password: "Password",

	/**
	 * The <ui5-input type="url"></ui5-input> is used for input fields that should contain a telephone number.
	 * @public
	 */
	Tel: "Tel",

	/**
	 * The <i5-input type="url"></ui5-input> is used for input fields that should contain a URL address.
	 * @public
	 */
	URL: "URL",
};

class InputType extends DataType {
	static isValid(value) {
		return !!InputTypes[value];
	}
}

InputType.generataTypeAcessors(InputTypes);

export default InputType;
