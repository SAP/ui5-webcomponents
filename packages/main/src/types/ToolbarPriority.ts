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
	 * @type {Default}
	 */
	 Default = "Default",
	/**
	 * When set, the button will be always part of the overflow part of ui5-toolbar.

	 * @public
	 * @type {Never}
	 */
	Never = "Never",

	/**
	 * @public
	 * @type {Always}
	 */
	Always = "Always",
}

export default ToolbarPriority;
