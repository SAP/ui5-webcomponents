import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of Button.
 * @public
 */
const LinkTypes = {
	/**
	 * default type (no special styling)
	 * @public
	 */
	Default: "Default",

	/**
	 * subtle type (appears as regular text, rather than a link)
	 * @public
	 */
	Subtle: "Subtle",

	/**
	 * emphasized type
	 * @public
	 */
	Emphasized: "Emphasized",
};

class LinkDesign extends DataType {
	static isValid(value) {
		return !!LinkTypes[value];
	}
}

LinkDesign.generataTypeAcessors(LinkTypes);

export default LinkDesign;
