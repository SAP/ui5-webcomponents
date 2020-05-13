import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of Priority.
 * @lends sap.ui.webcomponents.main.types.Priority.prototype
 * @public
 */
const Priorities = {
	/**
	 * High priority.
	 * @public
	 * @type {High}
	 */
	High: "High",

	/**
	 * Medium priority.
	 * @public
	 * @type {Medium}
	 */
	Medium: "Medium",

	/**
	 * Low priority.
	 * @public
	 * @type {Low}
	 */
	Low: "Low",

	/**
	 * Default, none priority.
	 * @public
	 * @type {None}
	 */
	None: "None",
};

/**
 * @class
 * Different types of Priority.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.Priority
 * @public
 * @enum {string}
 */
class Priority extends DataType {
	static isValid(value) {
		return !!Priorities[value];
	}
}

Priority.generataTypeAcessors(Priorities);

export default Priority;
