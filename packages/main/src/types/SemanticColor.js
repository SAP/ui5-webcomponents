import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

const SemanticColors = {
	/**
	 * Default color (brand color)
	 * @public
	 */
	Default: "Default",

	/**
	 * Positive color
	 * @public
	 */
	Positive: "Positive",

	/**
	 * Negative color
	 * @public
	 */
	Negative: "Negative",

	/**
	 * Critical color
	 * @public
	 */
	Critical: "Critical",

	/**
	 * Neutral color.
	 * @public
	 */
	Neutral: "Neutral",
};


class SemanticColor extends DataType {
	static isValid(value) {
		return !!SemanticColors[value];
	}
}

SemanticColor.generataTypeAcessors(SemanticColors);

export default SemanticColor;
