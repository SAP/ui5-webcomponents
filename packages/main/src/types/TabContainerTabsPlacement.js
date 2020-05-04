import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.TabContainerTabsPlacement.prototype
 * @public
 */
const TabContainerTabsPlacements = {
	/**
	 * The tab strip is displayed above the tab content (Default)
	 * @public
	 * @type {Top}
	 */
	Top: "Top",

	/**
	 * The tab strip is displayed below the tab content
	 * @public
	 * @type {Bottom}
	 */
	Bottom: "Bottom",
};

/**
 * @class
 * Different options for the position of the tab strip relative to the tab content area.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TabContainerTabsPlacement
 * @public
 * @enum {string}
 */
class TabContainerTabsPlacement extends DataType {
	static isValid(value) {
		return !!TabContainerTabsPlacements[value];
	}
}

TabContainerTabsPlacement.generataTypeAcessors(TabContainerTabsPlacements);

export default TabContainerTabsPlacement;
