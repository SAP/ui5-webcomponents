import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.TitleLevel.prototype
 * @public
 */
const TitleLevels = {
	/**
	 * Renders <code>h1</code> tag.
	 * @public
	 * @type {H1}
	 */
	H1: "H1",

	/**
	 * Renders <code>h2</code> tag.
	 * @public
	 * @type {H2}
	 */
	H2: "H2",

	/**
	 * Renders <code>h3</code> tag.
	 * @public
	 * @type {H3}
	 */
	H3: "H3",

	/**
	 * Renders <code>h4</code> tag.
	 * @public
	 * @type {H4}
	 */
	H4: "H4",

	/**
	 * Renders <code>h5</code> tag.
	 * @public
	 * @type {H5}
	 */
	H5: "H5",

	/**
	 * Renders <code>h6</code> tag.
	 * @public
	 * @type {H6}
	 */
	H6: "H6",
};

/**
 * @class
 * Defines the <code>ui5-title</code> level
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TitleLevel
 * @public
 * @enum {string}
 */
class TitleLevel extends DataType {
	static isValid(value) {
		return !!TitleLevels[value];
	}
}

TitleLevel.generateTypeAccessors(TitleLevels);

export default TitleLevel;
