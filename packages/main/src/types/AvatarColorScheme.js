import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of AvatarColorSchemes.
 * @lends sap.ui.webcomponents.main.types.AvatarColorScheme.prototype
 * @public
 */
const AvatarColorSchemes = {
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
 * Different types of AvatarColorScheme.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.AvatarColorScheme
 * @public
 * @enum {string}
 */
class AvatarColorScheme extends DataType {
	static isValid(value) {
		return !!AvatarColorSchemes[value];
	}
}

AvatarColorScheme.generateTypeAccessors(AvatarColorSchemes);

export default AvatarColorScheme;
