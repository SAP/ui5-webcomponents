import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of items alignment in the SideNavigation.
 * @lends sap.ui.webcomponents.fiori.types.SideNavItemsAlign.prototype
 * @public
 */
const SideNavItemsAlignments = {
	/**
	 * The items will be aligned by their text - the items without icons will be indented.
	 * @public
	 * @type {Text}
	 */
	Text: "Text",

	/**
	 * The items will be aligned from the start - the items without icons will not be indented.
	 * @public
	 * @type {Start}
	 */
	Start: "Start",
};

/**
 * Different types of items alignment in the <code>ui5-side-navigation</code>.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.types.SideNavItemsAlign
 * @public
 * @enum {string}
 */
class SideNavItemsAlign extends DataType {
	static isValid(value) {
		return !!SideNavItemsAlignments[value];
	}
}

SideNavItemsAlign.generateTypeAcessors(SideNavItemsAlignments);

export default SideNavItemsAlign;
