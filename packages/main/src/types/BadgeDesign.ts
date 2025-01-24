/**
 * Determines where the badge is placed.
 * @public
 */
enum BadgePlacement {
	/**
	 * The button renders the badge at the end.
	 * @public
	 */
	InlineText = "InlineText",
	/**
	 * The button renders the badge at the top end corner.
	 * @public
	 */
	OverlayText = "OverlayText",

	/**
	 * The button renders the badge at the top end corner as attention dot.
	 * @public
	 */
	AttentionDot = "AttentionDot",
}

export default BadgePlacement;
