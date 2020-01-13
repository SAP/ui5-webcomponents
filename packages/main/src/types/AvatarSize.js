import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of AvatarSize.
 */
const AvatarSizes = {
	/**
	 * component size - 2rem
	 * font size - 1rem
	 * @public
	 */
	XS: "XS",

	/**
	 * component size - 3rem
	 * font size - 1.5rem
	 * @public
	 */
	S: "S",

	/**
	 * component size - 4rem
	 * font size - 2rem
	 * @public
	 */
	M: "M",

	/**
	 * component size - 5rem
	 * font size - 2.5rem
	 * @public
	 */
	L: "L",

	/**
	 * component size - 7rem
	 * font size - 3rem
	 * @public
	 */
	XL: "XL",
};

class AvatarSize extends DataType {
	static isValid(value) {
		return !!AvatarSizes[value];
	}
}

AvatarSize.generataTypeAcessors(AvatarSizes);

export default AvatarSize;
