import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.TabsOverflowMode.prototype
 * @public
 */
const TabsOverflowModes = {
	/**
	 * End type is used if there should be only one overflow with hidden the tabs at the end of the tab container.
	 * @public
	 * @type {End}
	 */
	End: "End",

	/**
	 * StartAndEnd type is used if there should be two overflows on both ends of the tab container.
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
