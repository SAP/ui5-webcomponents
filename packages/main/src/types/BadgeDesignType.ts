/**
 * Defines badge design types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.BadgeDesignType
 */
enum BadgeDesignType {
	/**
	 * Color scheme palette.
	 * @public
	 * @type {ColorScheme}
	 */
	ColorScheme = "ColorScheme",

	/**
	 * Value state palette.
	 * @public
	 * @type {ValueState}
	 */
	ValueState = "ValueState",

	/**
	 * Value state inverted palette.
	 * @public
	 * @type {ValueState}
	 */
	ValueStateInverted = "ValueStateInverted",

	/**
	 * First color set of indication colors palette.
	 * @public
	 * @type {IndicationColorSet1}
	 */
	IndicationColorSet1 = "IndicationColorSet1",

	/**
	 * Second color set of indication colors palette.
	 * @public
	 * @type {IndicationColorSet2}
	 */
	IndicationColorSet2 = "IndicationColorSet2",
}

export default BadgeDesignType;
