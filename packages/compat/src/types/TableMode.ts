/**
 * Different table modes.
 * @public
 */
enum TableMode {
	/**
	 * Default mode (no selection).
	 * @public
	 */
	None = "None",

	/**
	 * Single selection mode (only one table row can be selected).
	 * @public
	 */
	SingleSelect = "SingleSelect",

	/**
	 * Multi selection mode (more than one table row can be selected).
	 * @public
	 */
	MultiSelect = "MultiSelect",
}

export default TableMode;
