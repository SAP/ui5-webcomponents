/**
 * Popover horizontal align types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopoverHorizontalAlign
 */
enum PopoverHorizontalAlign {
	/**
	 * Popover is centered.
	 * @public
	 * @type {Center}
	 */
	Center = "Center",

	/**
	 * Popover is aligned with the left side of the target. When direction is RTL, it is right aligned.
	 * @public
	 * @type {Left}
	 */
	Left = "Left",

	/**
	 * Popover is aligned with the right side of the target. When direction is RTL, it is left aligned.
	 * @public
	 * @type {Right}
	 */
	Right = "Right",

	/**
	 * Popover is stretched.
	 * @public
	 * @type {Stretch}
	 */
	Stretch = "Stretch",
}

export default PopoverHorizontalAlign;
