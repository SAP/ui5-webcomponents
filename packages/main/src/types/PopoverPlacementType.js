import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.PopoverPlacementType.prototype
 * @public
 */
const PopoverPlacementTypes = {
	/**
	 * Popover will be placed at the left side of the reference element.
	 * @public
	 * @type {Left}
	 */
	Left: "Left",

	/**
	 * Popover will be placed at the right side of the reference element.
	 * @public
	 * @type {Right}
	 */
	Right: "Right",

	/**
	 * Popover will be placed at the top of the reference element.
	 * @public
	 * @type {Top}
	 */
	Top: "Top",

	/**
	 * Popover will be placed at the bottom of the reference element.
	 * @public
	 * @type {Bottom}
	 */
	Bottom: "Bottom",
};

/**
 * @class
 * Types for the placement of Popover control.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.PopoverPlacementType
 * @public
 * @enum {string}
 */
class PopoverPlacementType extends DataType {
	static isValid(value) {
		return !!PopoverPlacementTypes[value];
	}
}

PopoverPlacementType.generateTypeAccessors(PopoverPlacementTypes);

export default PopoverPlacementType;
