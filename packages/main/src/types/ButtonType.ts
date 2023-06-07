/**
 * Determines if the button has special form-related functionality.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ButtonType
 */
enum ButtonType {
	/**
	 * The button does not do anything special when inside a form
	 * @public
	 * @type {Button}
	 */
	Button = "Button",

	/**
	 * The button acts as a submit button (submits a form)
	 * @public
	 * @type {Submit}
	 */
	Submit = "Submit",

	/**
	 * The button acts as a reset button (resets a form)
	 * @public
	 * @type {Reset}
	 */
	Reset = "Reset",
}

export default ButtonType;
