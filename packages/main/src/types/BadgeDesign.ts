/**
 * Defines badge design types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.BadgeDesign
 */
enum BadgeDesign {
	/**
	 * Color scheme palette.
	 * @public
	 * @type {Set1}
	 */
	Set1 = "Set1",

	/**
	 * Value state palette.
	 * @public
	 * @type {Set2}
	 */
	Set2 = "Set2",

	/**
	 * First color set of indication colors palette.
	 * @public
	 * @type {Set3}
	 */
	Set3 = "Set3",

	/**
	 *
	 * @public
	 * @type {Neutral}
	 */
	Neutral = "Neutral",

	/**
	 * Message should be just an information
	 * @public
	 * @type {Information}
	 */
	Information = "Information",

	/**
	 * Message is a success message
	 * @public
	 * @type {Positive}
	 */
	Positive = "Positive",

	/**
	 * Message is an error
	 * @public
	 * @type {Negative}
	 */
	Negative = "Negative",

	/**
	 * Message is a warning
	 * @public
	 * @type {Warning}
	 */
	Critical = "Critical",
}

export default BadgeDesign;
