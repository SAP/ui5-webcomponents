/**
 * Different table selection modes.
 * @public
 */
enum TableSelectionMode {
	/**
	 * Default mode (no selection).
	 * @public
	 */
	None = "None",

	/**
	 * Single selection mode (only one table row can be selected).
	 * @public
	 */
	Single = "Single",

	/**
	 * Multi selection mode (more than one table row can be selected).
	 * @public
	 */
	Multi = "Multi",
}

export default TableSelectionMode;
