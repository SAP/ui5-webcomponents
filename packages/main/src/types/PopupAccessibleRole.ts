/**
 * Popup accessible roles.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopupAccessibleRole
 */
enum PopupAccessibleRole {

	/**
	 * Represents no ARIA role.
	 * @public
	 * @type {None}
	 */
	None = "None",

	/**
	 * Represents the ARIA role "dialog".
	 * @public
	 * @type {Dialog}
	 */
	Dialog = "Dialog",

	/**
	 * Represents the ARIA role "alertdialog".
	 * @public
	 * @type {AlertDialog}
	 */
	AlertDialog = "AlertDialog",
}

export default PopupAccessibleRole;
