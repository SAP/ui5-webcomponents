import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of AvatarBackgroundColor.
 * @lends sap.ui.webcomponents.main.types.AvatarBackgroundColor.prototype
 * @public
 */
const AvatarBackGroundColors = {
	/**
	 *
	 * @public
	 * @type {Accent1}
	 */
	Accent1: "Accent1",

	/**
	 *
	 * @public
	 * @type {Accent2}
	 */
	Accent2: "Accent2",

	/**
	 *
	 * @public
	 * @type {Accent3}
	 */
	Accent3: "Accent3",

	/**
	 *
	 * @public
	 * @type {Accent4}
	 */
	Accent4: "Accent4",

	/**
	 *
	 * @public
	 * @type {Accent5}
	 */
	Accent5: "Accent5",

	/**
	 *
	 * @public
	 * @type {Accent6}
	 */
	Accent6: "Accent6",

	/**
	 *
	 * @public
	 * @type {Accent7}
	 */
	Accent7: "Accent7",

	/**
	 *
	 * @public
	 * @type {Accent8}
	 */
	Accent8: "Accent8",

	/**
	 *
	 * @public
	 * @type {Accent9}
	 */
	Accent9: "Accent9",

	/**
	 *
	 * @public
	 * @type {Accent10}
	 */
	Accent10: "Accent10",

	/**
	 *
	 * @public
	 * @type {Placeholder}
	 */
	Placeholder: "Placeholder",
};

/**
 * @class
 * Different types of AvatarBackgroundColor.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.AvatarBackgroundColor
 * @public
 * @enum {string}
 */
class AvatarBackgroundColor extends DataType {
	static isValid(value) {
		return !!AvatarBackGroundColors[value];
	}
}

AvatarBackgroundColor.generataTypeAcessors(AvatarBackGroundColors);

export default AvatarBackgroundColor;
