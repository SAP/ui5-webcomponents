import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.LinkDesign.prototype
 * @public
 */
const LinkTypes = {
	/**
	 * default type (no special styling)
	 * @public
	 * @type {Default}
	 */
	Default: "Default",

	/**
	 * subtle type (appears as regular text, rather than a link)
	 * @public
	 * @type {Subtle}
	 */
	Subtle: "Subtle",

	/**
	 * emphasized type
	 * @public
	 * @type {Emphasized}
	 */
	Emphasized: "Emphasized",
};

/**
 * @class
 * Different types of Button.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.LinkDesign
 * @public
 * @enum {string}
 */
class LinkDesign extends DataType {
	static isValid(value) {
		return !!LinkTypes[value];
	}
}

LinkDesign.generateTypeAccessors(LinkTypes);

export default LinkDesign;
