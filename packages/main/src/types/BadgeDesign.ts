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
	 * Set1 of generic indication colors that are intended for industry-specific use cases
	 * @public
	 * @type {Set1}
	 */
	Set1 = "Set1",

	/**
	 * Set2 of generic indication colors that are intended for industry-specific use cases
	 * @public
	 * @type {Set2}
	 */
	Set2 = "Set2",

	/**
	 * Set3 of generic indication colors that are
	 * intended for industry-specific use cases. Used in SAP BTP design system.
	 * @public
	 * @type {Set3}
	 */
	Set3 = "Set3",

	/**
	 * Neutral design
	 * @public
	 * @type {Neutral}
	 */
	Neutral = "Neutral",

	/**
	 * Information design
	 * @public
	 * @type {Information}
	 */
	Information = "Information",

	/**
	 * Positive design
	 * @public
	 * @type {Positive}
	 */
	Positive = "Positive",

	/**
	 * Negative design
	 * @public
	 * @type {Negative}
	 */
	Negative = "Negative",

	/**
	 * Critical design
	 * @public
	 * @type {Warning}
	 */
	Critical = "Critical",
}

export default BadgeDesign;
