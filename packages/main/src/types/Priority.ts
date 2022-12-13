/**
 * Different types of Priority.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.Priority
 */
enum Priority {
	/**
	 * High priority.
	 * @public
	 * @type {High}
	 */
	High = "High",

	/**
	 * Medium priority.
	 * @public
	 * @type {Medium}
	 */
	Medium = "Medium",

	/**
	 * Low priority.
	 * @public
	 * @type {Low}
	 */
	Low = "Low",

	/**
	 * Default, none priority.
	 * @public
	 * @type {None}
	 */
	None = "None",
}

export default Priority;
