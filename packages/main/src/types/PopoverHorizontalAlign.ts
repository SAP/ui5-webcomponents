/**
 * Popover horizontal align types.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopoverHorizontalAlign
 */
enum PopoverHorizontalAlign {
	/**
	 * Popover is centered
	 * @public
	 * @type {Center}
	 */
	Center = "Center",

	/**
	 * Popover opens on the left side of the target
	 * @public
	 * @type {Left}
	 */
	Left = "Left",

	/**
	 * Popover opens on the right side of the target
	 * @public
	 * @type {Right}
	 */
	Right = "Right",

	/**
	 * Popover is stretched
	 * @public
	 * @type {Stretch}
	 */
	Stretch = "Stretch",
}

export default PopoverHorizontalAlign;
