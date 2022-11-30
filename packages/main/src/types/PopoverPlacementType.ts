/**
 * Popover placement types.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopoverPlacementType
 */
enum PopoverPlacementType {
	/**
	 * Popover will be placed at the left side of the reference element.
	 * @public
	 * @type {Left}
	 */
	Left = "Left",

	/**
	 * Popover will be placed at the right side of the reference element.
	 * @public
	 * @type {Right}
	 */
	Right = "Right",

	/**
	 * Popover will be placed at the top of the reference element.
	 * @public
	 * @type {Top}
	 */
	Top = "Top",

	/**
	 * Popover will be placed at the bottom of the reference element.
	 * @public
	 * @type {Bottom}
	 */
	Bottom = "Bottom",
}

export default PopoverPlacementType;
