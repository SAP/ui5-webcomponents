import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.fiori.types.SideContentVisibility.prototype
 * @public
 */
const SideContentVisibilityTypes = {
	/**
	 * Show the side content on any breakpoint
	 * @public
	 * @type {AlwaysShow}
	 */
	AlwaysShow: "AlwaysShow",

	/**
	 * Show the side content on XL breakpoint
	 * @public
	 * @type {ShowAboveL}
	 */
	ShowAboveL: "ShowAboveL",

	/**
	 * Show the side content on L and XL breakpoints
	 * @public
	 * @type {ShowAboveM}
	 */
	ShowAboveM: "ShowAboveM",

	/**
	 * Show the side content on M, L and XL breakpoints
	 * @public
	 * @type {ShowAboveS}
	 */
	ShowAboveS: "ShowAboveS",

	/**
	 * Don't show the side content on any breakpoints
	 * @public
	 * @type {NeverShow}
	 */
	NeverShow: "NeverShow",
};

/**
 * @class
 * Side Content visibility options.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.types.SideContentVisibility
 * @public
 * @enum {string}
 */
class SideContentVisibility extends DataType {
	static isValid(value) {
		return !!SideContentVisibilityTypes[value];
	}
}

SideContentVisibility.generateTypeAccessors(SideContentVisibilityTypes);

export default SideContentVisibility;
