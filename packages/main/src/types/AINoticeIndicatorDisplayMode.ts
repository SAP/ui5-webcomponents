/**
 * Display Mode.
 * @public
 */
enum AINoticeIndicatorDisplayMode {
	/**
	 * AI attribution notice plus verification prompt
	 * @public
	 */
	Default = "Default",

	/**
	 * AI attribution notice only
	 * @public
	 */
	Shortened = "Shortened",

	/**
	 * The AI button (icon only variant) with AI attribution notice and verification prompt.
	 * @public
	 */
	Emphasized = "Emphasized",

	/**
	 * Icon Only Variant
	 * @public
	 */
	IconOnly = "IconOnly"
}

export default AINoticeIndicatorDisplayMode;
