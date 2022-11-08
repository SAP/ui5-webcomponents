import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Background design for the header and content of Tab Container
 * @lends sap.ui.webcomponents.main.types.TabContainerBackgroundDesign.prototype
 * @public
 */
const TabContainerBackgroundDesigns = {
	/**
	 * A Solid background color.
	 * @public
	 * @type {Solid}
	 */
	Solid: "Solid",

	/**
	 * A Transparent background color.
	 * @public
	 * @type {Transparent}
	 */
	Transparent: "Transparent",

	/**
	 * A Translucent background color.
	 * @public
	 * @type {Translucent}
	 */
	 Translucent: "Translucent",
};

/**
 * @class
 * Defines the Tab Container's header and content background colors
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
