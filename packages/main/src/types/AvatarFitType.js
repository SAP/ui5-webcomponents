import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of AvatarFitType.
 * @lends sap.ui.webcomponents.main.types.AvatarFitType.prototype
 * @public
 */
const AvatarFitTypes = {
	/**
	 *
	 * @type {Cover}
	 * @public
	 */
	Cover: "Cover",

	/**
	 * @type {Contain}
	 * @public
	 */
	Contain: "Contain",
};

/**
 * @class
 * Different types of AvatarFitType.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.AvatarFitType
 * @public
 * @enum {string}
 */
class AvatarFitType extends DataType {
	static isValid(value) {
		return !!AvatarFitTypes[value];
	}
}

AvatarFitType.generataTypeAcessors(AvatarFitTypes);

export default AvatarFitType;
