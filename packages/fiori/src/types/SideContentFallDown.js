import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.fiori.types.SideContentFallDown.prototype
 * @public
 */
const SideContentFallDownTypes = {
	/**
	 * Side content falls down on breakpoints below XL
	 * @public
	 * @type {BelowXL}
	 */
	BelowXL: "BelowXL",

	/**
	 * Side content falls down on breakpoints below L
	 * @public
	 * @type {BelowL}
	 */
	BelowL: "BelowL",

	/**
	 * Side content falls down on breakpoints below M
	 * @public
	 * @type {BelowM}
	 */
	BelowM: "BelowM",

	/**
	 * Side content falls down on breakpoint M and the minimum width for the side content
	 * @public
	 * @type {OnMinimumWidth}
	 */
	OnMinimumWidth: "OnMinimumWidth",
};

/**
 * @class
 * SideContent FallDown options.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.types.SideContentFallDown
 * @public
 * @enum {string}
 */
class SideContentFallDown extends DataType {
	static isValid(value) {
		return !!SideContentFallDownTypes[value];
	}
}

SideContentFallDown.generateTypeAccessors(SideContentFallDownTypes);

export default SideContentFallDown;
