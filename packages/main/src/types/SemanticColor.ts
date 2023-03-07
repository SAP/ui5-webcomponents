/**
 * Different types of SemanticColor.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.SemanticColor
 */
enum SemanticColor {
	/**
	 * Default color (brand color)
	 * @public
	 * @type {Default}
	 */
	Default = "Default",

	/**
	 * Positive color
	 * @public
	 * @type {Positive}
	 */
	Positive = "Positive",

	/**
	 * Negative color
	 * @public
	 * @type {Negative}
	 */
	Negative = "Negative",

	/**
	 * Critical color
	 * @public
	 * @type {Critical}
	 */
	Critical = "Critical",

	/**
	 * Neutral color.
	 * @public
	 * @type {Neutral}
	 */
	Neutral = "Neutral",
}

export default SemanticColor;
