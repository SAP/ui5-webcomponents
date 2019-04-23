import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

const IconColors = {
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


class IconColor extends DataType {
	static isValid(value) {
		return !!IconColors[value];
	}
}

IconColor.generataTypeAcessors(IconColors);

export default IconColor;
