import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.TabsOverflowMode.prototype
 * @public
 */
const TabsOverflowModes = {
	/**
	 * End type if there is only one overflow in the end of the scroll container .
	 * @public
	 * @type {End}
	 */
	End: "End",

	/**
	 * StartAndEnd type if there are overflows at the beginning and at end of the scroll container .
	 * @public
	 * @type {StartAndEnd}
	 */
	StartAndEnd: "StartAndEnd",
};

/**
 * @class
 * Different types of overflow modes.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TabsOverflowMode
 * @public
 * @enum {string}
 */
class TabsOverflowMode extends DataType {
	static isValid(value) {
		return !!TabsOverflowModes[value];
	}
}

TabsOverflowMode.generateTypeAccessors(TabsOverflowModes);

export default TabsOverflowMode;
