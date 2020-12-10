import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of AvatarShape.
 * @lends sap.ui.webcomponents.main.types.AvatarShape.prototype
 * @public
 */
const AvatarShapes = {
	/**
	 * Circular shape.
	 * @public
	 * @type {Circle}
	 */
	Circle: "Circle",

	/**
	 * Square shape.
	 * @public
	 * @type {Square}
	 */
	Square: "Square",
};

/**
 * @class
 * Different types of AvatarShape.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.AvatarShape
 * @public
 * @enum {string}
 */
class AvatarShape extends DataType {
	static isValid(value) {
		return !!AvatarShapes[value];
	}
}

AvatarShape.generateTypeAccessors(AvatarShapes);

export default AvatarShape;
