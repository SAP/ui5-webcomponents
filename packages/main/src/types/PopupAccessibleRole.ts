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
	none = "none",

	/**
	 * Represents the ARIA role "dialog".
	 * @public
	 * @type {Dialog}
	 */
	dialog = "dialog",

	/**
	 * Represents the ARIA role "alertdialog".
	 * @public
	 * @type {AlertDialog}
	 */
	alertdialog = "alertdialog",
}

export default PopupAccessibleRole;
