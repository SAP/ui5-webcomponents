/**
 * Popover vertical align types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopoverVerticalAlign
 */
enum PopoverVerticalAlign {
	/**
	 *
	 * @public
	 * @type {Center}
	 */
	Center = "Center",

	/**
	 * Popover will be placed at the top of the reference control.
	 * @public
	 * @type {Top}
	 */
	Top = "Top",

	/**
	 * Popover will be placed at the bottom of the reference control.
	 * @public
	 * @type {Bottom}
	 */
	Bottom = "Bottom",

	/**
	 * Popover will be streched
	 * @public
	 * @type {Stretch}
	 */
	Stretch = "Stretch",
}

export default PopoverVerticalAlign;
