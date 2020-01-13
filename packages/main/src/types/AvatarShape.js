import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of AvatarSize.
 */
const AvatarShapes = {
	/**
	 * Circular shape.
	 * @public
	 */
	Circle: "Circle",

	/**
	 * Square shape.
	 * @public
	 */
	Square: "Square"
};

class AvatarShape extends DataType {
	static isValid(value) {
		return !!AvatarShapes[value];
	}
}

AvatarShape.generataTypeAcessors(AvatarShapes);

export default AvatarShape;
