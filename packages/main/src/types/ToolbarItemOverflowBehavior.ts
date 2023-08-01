/**
 * Defines the priority of the toolbar item to go inside overflow popover.
 *
 * @readonly
 * @enum {string}
 * @public
 * @type {string}
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ToolbarItemOverflowBehavior
 */
enum ToolbarItemOverflowBehavior {

	/**
	 * The item is presented inside the toolbar and goes in the popover, when there is not enough space.
	 * @public
	 * @type {Default}
	 */
	 Default = "Default",
	/**
	 * When set, the item will never go to the overflow popover.
	 * @public
	 * @type {NeverOverflow}
	 */
	NeverOverflow = "NeverOverflow",

	/**
	 * @public
	 * When set, the item will be always part of the overflow part of ui5-toolbar.
	 * @type {AlwaysOverflow}
	 */
	AlwaysOverflow = "AlwaysOverflow",
}

export default ToolbarItemOverflowBehavior;
