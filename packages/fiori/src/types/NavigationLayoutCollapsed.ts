/**
 * Specifies the navigation layout collapsed mode.
 * @public
 */
enum NavigationLayoutCollapsed {
	/**
	 * Automatically calculate the collapsed mode based on the screen device type.
	 * `Expanded` on desktop and `Collapsed	 on tablet and phone.
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

export default NavigationLayoutCollapsed;
