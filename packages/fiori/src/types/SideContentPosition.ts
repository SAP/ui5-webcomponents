/**
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.fiori.types.SideContentPosition
 */
enum SideContentPosition {
	/**
	 * The side content is on the right side of the main container
	 * in left-to-right mode and on the left side in right-to-left mode.
	 * @public
	 * @type {End}
	 */
	End = "End",

	/**
	 * The side content is on the left side of the main container
	 * in left-to-right mode and on the right side in right-to-left mode.
	 * @public
	 * @type {Start}
	 */
	Start = "Start",
}

export default SideContentPosition;
