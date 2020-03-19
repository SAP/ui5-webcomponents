import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.PopoverHorizontalAlign.prototype
 * @public
 */
const PopoverHorizontalAligns = {
	/**
	 * Popover is centered
	 * @public
	 * @type {Center}
	 */
	Center: "Center",

	/**
	 * Popover opens on the left side of the target
	 * @public
	 * @type {Left}
	 */
	Left: "Left",

	/**
	 * Popover opens on the right side of the target
	 * @public
	 * @type {Right}
	 */
	Right: "Right",

	/**
	 * Popover is stretched
	 * @public
	 * @type {Stretch}
	 */
	Stretch: "Stretch",
};

/**
 * @class
 * Defines the horizontal alignment of <code>ui5-popover</code>
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.PopoverHorizontalAlign
 * @public
 * @enum {string}
 */
class PopoverHorizontalAlign extends DataType {
	static isValid(value) {
		return !!PopoverHorizontalAligns[value];
	}
}

PopoverHorizontalAlign.generataTypeAcessors(PopoverHorizontalAligns);

export default PopoverHorizontalAlign;
