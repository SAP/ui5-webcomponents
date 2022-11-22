import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.fiori.types.SideContentPosition.prototype
 * @public
 */
enum SideContentPositionTypes {
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
};

export default SideContentPositionTypes;
