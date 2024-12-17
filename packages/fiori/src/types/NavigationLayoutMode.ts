/**
 * Specifies the navigation layout mode.
 * @public
 */
enum NavigationLayoutMode {
	/**
	 * Automatically calculates the collapsed mode based on the screen device type.
	 * `Expanded` on desktop and `Collapsed` on tablet and phone.
	 * @public
	 */
	Auto = "Auto",
	/**
	 * Collapsed
	 * @public
	 */
	Collapsed = "Collapsed",
	/**
	 * Expanded
	 * @public
	 */
	Expanded = "Expanded",
}

export default NavigationLayoutMode;
