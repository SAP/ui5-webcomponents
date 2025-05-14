/**
 * Selection behavior of the `ui5-table` selection components.
 *
 * @public
 * @since 2.11
 */
enum TableSelectionBehavior {
	/**
	 * Rows can only be selected using the row selector column.
	 * @public
	 */
	RowSelector = "RowSelector",

	/**
	 * Rows can only be selected by clicking directly on the row, as the row selector column is hidden.
	 *
	 * **Note:** In this mode, the `row-click` event of the `table` component is not fired.
	 *
	 * @public
	 */
	RowOnly = "RowOnly",
}

export default TableSelectionBehavior;
