/**
 * Different table row types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.TableRowType
 */
enum TableRowType {
	/**
	 * Indicates that the table row does not have any active feedback when item is pressed.
	 * @public
	 * @type {Inactive}
	 */
	Inactive = "Inactive",

	/**
	 * Indicates that the table row is clickable via active feedback when item is pressed.
	 * @public
	 * @type {Active}
	 */
	Active = "Active",
}

export default TableRowType;
