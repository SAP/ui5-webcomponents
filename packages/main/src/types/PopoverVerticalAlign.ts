/**
 * Popover vertical align types.
 * @public
 */
enum PopoverVerticalAlign {
	/**
	 * @public
	 */
	Center = "Center",

	/**
	 * Popover will be placed at the top of the reference control.
	 * @public
	 */
	Top = "Top",

	/**
	 * Popover will be placed at the bottom of the reference control.
	 * @public
	 */
	Bottom = "Bottom",

	/**
	 * Popover will be streched
	 * If popover placement is Start or End, popover will be stretched with the height of the opener
	 * @public
	 */
	Stretch = "Stretch",
}

export default PopoverVerticalAlign;
