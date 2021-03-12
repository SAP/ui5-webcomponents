import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.SemanticColor.prototype
 * @public
 */
const SemanticColors = {
	/**
	 * Default color (brand color)
	 * @public
	 * @type {Default}
	 */
	Default: "Default",

	/**
	 * Positive color
	 * @public
	 * @type {Positive}
	 */
	Positive: "Positive",

	/**
	 * Negative color
	 * @public
	 * @type {Negative}
	 */
	Negative: "Negative",

	/**
	 * Critical color
	 * @public
	 * @type {Critical}
	 */
	Critical: "Critical",

	/**
	 * Neutral color.
	 * @public
	 * @type {Neutral}
	 */
	Neutral: "Neutral",
};

/**
 * @class
 * Defines the semantic color
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.SemanticColor
 * @public
 * @enum {string}
 */
class SemanticColor extends DataType {
	static isValid(value) {
		return !!SemanticColors[value];
	}
}

SemanticColor.generateTypeAccessors(SemanticColors);

export default SemanticColor;
