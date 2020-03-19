import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of AvatarSize.
 * @lends sap.ui.webcomponents.main.types.AvatarSize.prototype
 * @public
 */
const AvatarSizes = {
	/**
	 * component size - 2rem
	 * font size - 1rem
	 * @public
	 * @type {XS}
	 */
	XS: "XS",

	/**
	 * component size - 3rem
	 * font size - 1.5rem
	 * @public
	 * @type {S}
	 */
	S: "S",

	/**
	 * component size - 4rem
	 * font size - 2rem
	 * @public
	 * @type {M}
	 */
	M: "M",

	/**
	 * component size - 5rem
	 * font size - 2.5rem
	 * @public
	 * @type {L}
	 */
	L: "L",

	/**
	 * component size - 7rem
	 * font size - 3rem
	 * @public
	 * @type {XL}
	 */
	XL: "XL",
};

/**
 * @class
 * Different types of AvatarSize.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.AvatarSize
 * @public
 * @enum {string}
 */
class AvatarSize extends DataType {
	static isValid(value) {
		return !!AvatarSizes[value];
	}
}

AvatarSize.generataTypeAcessors(AvatarSizes);

export default AvatarSize;
