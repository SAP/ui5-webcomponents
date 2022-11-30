/**
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.fiori.types.SideContentFallDown
 */
enum SideContentFallDown {
	/**
	 * Side content falls down on breakpoints below XL
	 * @public
	 * @type {BelowXL}
	 */
	BelowXL = "BelowXL",

	/**
	 * Side content falls down on breakpoints below L
	 * @public
	 * @type {BelowL}
	 */
	BelowL = "BelowL",

	/**
	 * Side content falls down on breakpoints below M
	 * @public
	 * @type {BelowM}
	 */
	BelowM = "BelowM",

	/**
	 * Side content falls down on breakpoint M and the minimum width for the side content
	 * @public
	 * @type {OnMinimumWidth}
	 */
	OnMinimumWidth = "OnMinimumWidth",
}

export default SideContentFallDown;
