/**
 * Popup accessible roles.
 *
 * @class
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
	 * Represents the ARIA role "Dialog".
	 * @public
	 * @type {Dialog}
	 */
	Dialog = "Dialog",

	/**
	 * Represents the ARIA role "AlertDialog".
	 * @public
	 * @type {AlertDialog}
	 */
	AlertDialog = "AlertDialog",
}

export default PopupAccessibleRole;
