/**
 * Side Content visibility options.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.fiori.types.SideContentVisibility
 */
enum SideContentVisibility {
	/**
	 * Show the side content on any breakpoint
	 * @public
	 * @type {AlwaysShow}
	 */
	AlwaysShow = "AlwaysShow",

	/**
	 * Show the side content on XL breakpoint
	 * @public
	 * @type {ShowAboveL}
	 */
	ShowAboveL = "ShowAboveL",

	/**
	 * Show the side content on L and XL breakpoints
	 * @public
	 * @type {ShowAboveM}
	 */
	ShowAboveM = "ShowAboveM",

	/**
	 * Show the side content on M, L and XL breakpoints
	 * @public
	 * @type {ShowAboveS}
	 */
	ShowAboveS = "ShowAboveS",

	/**
	 * Don't show the side content on any breakpoints
	 * @public
	 * @type {NeverShow}
	 */
	NeverShow = "NeverShow",
}

export default SideContentVisibility;
