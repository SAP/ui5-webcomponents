/**
 * Different types of AvatarGroupType.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.AvatarGroupType
 */
enum AvatarGroupType {
	/**
	 * The avatars are displayed as partially overlapped on top of each other and the entire group has one click or tap area.
	 *
	 * @public
	 * @type {Group}
	 */
	Group = "Group",

	/**
	 * The avatars are displayed side-by-side and each avatar has its own click or tap area.
	 *
	 * @public
	 * @type {Individual}
	 */
	Individual = "Individual",
}

export default AvatarGroupType;
