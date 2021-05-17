import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.PopoverVerticalAlign.prototype
 * @public
 */
const PopoverVerticalAligns = {
	/**
	 *
	 * @public
	 * @type {Center}
	 */
	Center: "Center",

	/**
	 * Popover will be placed at the top of the reference control.
	 * @public
	 * @type {Top}
	 */
	Top: "Top",

	/**
	 * Popover will be placed at the bottom of the reference control.
	 * @public
	 * @type {Bottom}
	 */
	Bottom: "Bottom",

	/**
	 * Popover will be streched
	 * @public
	 * @type {Stretch}
	 */
	Stretch: "Stretch",
};

/**
 * @class
 * Types for the placement of message Popover control.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.PopoverVerticalAlign
 * @public
 * @enum {string}
 */
class PopoverVerticalAlign extends DataType {
	static isValid(value) {
		return !!PopoverVerticalAligns[value];
	}
}

PopoverVerticalAlign.generateTypeAccessors(PopoverVerticalAligns);

export default PopoverVerticalAlign;
