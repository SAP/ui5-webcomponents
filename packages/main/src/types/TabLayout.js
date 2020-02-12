import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.TabDesign.prototype
 * @public
 */
const TabLayouts = {
	/**
	 * default type (no special styling)
	 * @public
	 * @type {Default}
	 */
	Inline: "Inline",

	/**
	 * subtle type (appears as regular text, rather than a link)
	 * @public
	 * @type {Subtle}
	 */
	Standard: "Standard",
};

/**
 * @class
 * Different types of Tab design.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TabLayout
 * @public
 * @enum {string}
 */
class TabLayout extends DataType {
	static isValid(value) {
		return !!TabLayouts[value];
	}
}

TabLayout.generataTypeAcessors(TabLayouts);

export default TabLayout;
