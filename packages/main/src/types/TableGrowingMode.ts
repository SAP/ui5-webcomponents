/**
 * Different table growing modes.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TableGrowingMode
 */
enum TableGrowingMode {
	/**
	 * Component "load-more" is fired
	 * upon pressing a "More" button at the bottom.
	 * @public
	 * @type {Button}
	 */
	Button = "Button",

	/**
	 * Component "load-more" is fired upon scroll.
	 * @public
	 * @type {Scroll}
	 */
	Scroll = "Scroll",

	/**
	 * Component growing is not enabled.
	 * @public
	 * @type {None}
	 */
	None = "None",
}

export default TableGrowingMode;
