import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.TabContainerBackgroundDesign.prototype
 * @public
 */
const TabContainerBackgroundDesigns = {
	/**
	 * Solid color
	 * @public
	 * @type {Solid}
	 */
	Solid: "Solid",

	/**
	 * Transparent color
	 * @public
	 * @type {Transparent}
	 */
	Transparent: "Transparent",
};

/**
 * @class
 * Defines the Tab Container's header and content background color
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TabContainerBackgroundDesign
 * @public
 * @enum {string}
 */
class TabContainerBackgroundDesign extends DataType {
	static isValid(value) {
		return !!TabContainerBackgroundDesigns[value];
	}
}

TabContainerBackgroundDesign.generateTypeAccessors(TabContainerBackgroundDesigns);

export default TabContainerBackgroundDesign;
