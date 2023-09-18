/**
 * Different table modes.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.TableMode
 */
enum TableMode {
	/**
	 * Default mode (no selection).
	 * @public
	 * @type {None}
	 */
	None = "None",

	/**
	 * Single selection mode (only one table row can be selected).
	 * @public
	 * @type {SingleSelect}
	 */
	SingleSelect = "SingleSelect",

	/**
	 * Multi selection mode (more than one table row can be selected).
	 * @public
	 * @type {MultiSelect}
	 */
	MultiSelect = "MultiSelect",
}

export default TableMode;
