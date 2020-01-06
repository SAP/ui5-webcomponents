import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";


/**
 * Types for the placement of message Popover control.
 * @public
 */
const PopoverVerticalAligns = {
	/**
	 *
	 * @public
	 */
	Center: "Center",

	/**
	 * Popover will be placed at the top of the reference control.
	 * @public
	 */
	Top: "Top",

	/**
	 * Popover will be placed at the bottom of the reference control.
	 * @public
	 */
	Bottom: "Bottom",

	/**
	 * Popover will be streched
	 * @public
	 */
	Stretch: "Stretch",
};


class PopoverVerticalAlign extends DataType {
	static isValid(value) {
		return !!PopoverVerticalAligns[value];
	}
}

PopoverVerticalAlign.generataTypeAcessors(PopoverVerticalAligns);

export default PopoverVerticalAlign;
