/**
 * Available Timeline layout orientation
 * @public
 */
enum TimelineLayout {
	/**
	 * Vertical layout
	 * Default type
	 * @public
	 */
	Vertical= "Vertical",

	/**
	 * Horizontal layout
	 * @public
	 */
	Horizontal= "Horizontal",
}

enum TimeLineGrowingMode {
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

export {
	TimelineLayout,
	TimeLineGrowingMode
}
