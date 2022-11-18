/**
 * Different growing modes in list and table components.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.GrowingMode
 */
enum GrowingMode {
	/**
	 * Component's "load-more" event is fired upon pressing a "More" button.
	 * at the bottom.
	 * @public
	 * @type {Button}
	 */
	Button = "Button",

	/**
	 * Component's "load-more" event is fired upon scroll.
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

export default GrowingMode;
