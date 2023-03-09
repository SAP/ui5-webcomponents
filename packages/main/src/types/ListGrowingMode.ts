/**
 * Different list growing modes.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ListGrowingMode
 */
enum ListGrowingMode {
	/**
	 * Component's "load-more" is fired upon pressing a "More" button.
	 * at the bottom.
	 * @public
	 * @type {Button}
	 */
	Button = "Button",

	/**
	 * Component's "load-more" is fired upon scroll.
	 * @public
	 * @type {Scroll}
	 */
	Scroll = "Scroll",

	/**
	 * Component's growing is not enabled.
	 * @public
	 * @type {None}
	 */
	None = "None",
}

export default ListGrowingMode;
