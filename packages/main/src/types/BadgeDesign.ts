/**
 * Determines where the style of the badge.
 * @since 2.7.0
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
	 *
	 * **Note:** Although using badge with `OverlayText` is possible, we don't recommend it being used when the compoent is in compact density mode.
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
