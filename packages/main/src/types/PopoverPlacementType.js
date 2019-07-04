import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

const PopoverPlacementTypes = {
	/**
	 * Popover will be placed at the left side of the reference element.
	 * @public
	 */
	Left: "Left",
	/**
	 * Popover will be placed at the right side of the reference element.
	 * @public
	 */
	Right: "Right",
	/**
	 * Popover will be placed at the top of the reference element.
	 * @public
	 */
	Top: "Top",
	/**
	 * Popover will be placed at the bottom of the reference element.
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
