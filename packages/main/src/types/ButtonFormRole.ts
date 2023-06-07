/**
 * Determines if the button has special form-related functionality.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ButtonFormRole
 */
enum ButtonFormRole {
	/**
	 * The button does not do anything special when inside a form
	 * @public
	 * @type {None}
	 */
	None = "None",

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

export default ButtonFormRole;
