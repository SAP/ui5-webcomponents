/**
 * Selectors of the table header row in multi-selection scenarios.
 *
 * @public
 * @since 2.12
 */
enum TableSelectionMultiHeaderSelector {
	/**
	 * Renders a checkbox in the table header row to toggle the selection of all rows.
	 * @public
	 */
	SelectAll = "SelectAll",

	/**
	 * Renders an icon in the table header row to remove the selection of all rows.
	 * @public
	 */
	ClearAll = "ClearAll",
}

export default TableSelectionMultiHeaderSelector;
