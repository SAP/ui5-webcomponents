import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

/**
 * Different types of Button.
 */
const LinkTypes = {
	/**
	 * default type (no special styling)
	 */
	Default: "Default",

	/**
	 * subtle type (appears as regular text, rather than a link)
	 */
	Subtle: "Subtle",

	/**
	 * emphasized type
	 */
	Emphasized: "Emphasized",
};

class LinkType extends DataType {
	static isValid(value) {
		return !!LinkTypes[value];
	}
}

LinkType.generataTypeAcessors(LinkTypes);

export default LinkType;
