/**
 * Different table growing modes.
 * @public
 */
enum TableGrowingMode {
	/**
	 * Component `load-more` is fired
	 * upon pressing a "More" button at the bottom.
	 * @public
	 */
	Button = "Button",

	/**
	 * Component `load-more` is fired upon scroll.
	 * @public
	 */
	Scroll = "Scroll",

	/**
	 * Component growing is not enabled.
	 * @public
	 */
	None = "None",
}

export default TableGrowingMode;
