/**
 * Determines where the style of the badge.
 * @public
 */
enum BadgeDesign {
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

export default BadgeDesign;
