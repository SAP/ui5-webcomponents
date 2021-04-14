import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of AvatarGroupType.
 * @lends sap.ui.webcomponents.main.types.AvatarGroupType.prototype
 * @public
 */
const AvatarGroupTypes = {
	/**
	 * The avatars are displayed as partially overlapped on top of each other and the entire group has one click/tap area.
	 *
	 * @public
	 * @type {Group}
	 */
	Group: "Group",

	/**
	 * The avatars are displayed side-by-side and each avatar has its own click/tap area.
	 *
	 * @public
	 * @type {Individual}
	 */
	Individual: "Individual",
};

/**
 * @class
 * Different types of AvatarGroupType.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.AvatarGroupType
 * @public
 * @enum {string}
 */
class AvatarGroupType extends DataType {
	static isValid(value) {
		return !!AvatarGroupTypes[value];
	}
}

AvatarGroupType.generateTypeAccessors(AvatarGroupTypes);

export default AvatarGroupType;
