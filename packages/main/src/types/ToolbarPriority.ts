/**
 * Defines the priority of the toolbar item to go inside overflow popover.
 *
 * @readonly
 * @enum {string}
 * @public
 * @type {string}
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ToolbarPriority
 */
enum ToolbarPriority {

	/**
	 * @public
	 */
	 Default = "Default",
	/**
	 * When set, the button will be always part of the overflow part of ui5-toolbar.

	 * @public
	 */
	Never = "Never",

	/**
	 * @public
	 */
	Always = "Always",
}

export default ToolbarPriority;
