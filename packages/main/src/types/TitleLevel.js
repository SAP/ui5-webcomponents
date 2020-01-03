import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Defines the <code>ui5-title</code> level
 * @public
 */
const TitleLevels = {
	/**
	 * Renders <code>h1</code> tag.
	 * @public
	 */
	H1: "H1",

	/**
	 * Renders <code>h2</code> tag.
	 * @public
	 */
	H2: "H2",

	/**
	 * Renders <code>h3</code> tag.
	 * @public
	 */
	H3: "H3",

	/**
	 * Renders <code>h4</code> tag.
	 * @public
	 */
	H4: "H4",

	/**
	 * Renders <code>h5</code> tag.
	 * @public
	 */
	H5: "H5",

	/**
	 * Renders <code>h6</code> tag.
	 * @public
	 */
	H6: "H6",
};

class TitleLevel extends DataType {
	static isValid(value) {
		return !!TitleLevels[value];
	}
}

TitleLevel.generataTypeAcessors(TitleLevels);

export default TitleLevel;
