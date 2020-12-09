import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.TabLayout.prototype
 * @public
 */
const TabLayouts = {
	/**
	 * Inline type, the tab <code>main text</code> and <code>additionalText</code> are displayed horizotally.
	 * @public
	 * @type {Inline}
	 */
	Inline: "Inline",

	/**
	 * Standard type, the tab <code>main text</code> and <code>additionalText</code> are displayed vertically.
	 * @public
	 * @type {Standard}
	 */
	Standard: "Standard",
};

/**
 * @class
 * Different types of Tab layouts.
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

TabLayout.generateTypeAccessors(TabLayouts);

export default TabLayout;
