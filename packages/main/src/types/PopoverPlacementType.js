import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

const PopoverPlacementTypes = {
	/**
	 * Popover will be placed at the left side of the reference control.
	 * @public
	 */
	Left: "Left",
	/**
	 * Popover will be placed at the right side of the reference control.
	 * @public
	 */
	Right: "Right",
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
};

class PopoverPlacementType extends DataType {
	static isValid(value) {
		return !!PopoverPlacementTypes[value];
	}
}

PopoverPlacementType.generataTypeAcessors(PopoverPlacementTypes);

export default PopoverPlacementType;
