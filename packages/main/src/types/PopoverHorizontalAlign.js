import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Defines the horizontal alignment of <code>ui5-popover</code>
 * @public
 */
const PopoverHorizontalAligns = {
	/**
	 * Popover is centered
	 * @public
	 */
	Center: "Center",

	/**
	 * Popover opens on the left side of the target
	 * @public
	 */
	Left: "Left",

	/**
	 * Popover opens on the right side of the target
	 * @public
	 */
	Right: "Right",

	/**
	 * Popover is stretched
	 * @public
	 */
	Stretch: "Stretch",
};

class PopoverHorizontalAlign extends DataType {
	static isValid(value) {
		return !!PopoverHorizontalAligns[value];
	}
}

PopoverHorizontalAlign.generataTypeAcessors(PopoverHorizontalAligns);

export default PopoverHorizontalAlign;
