/**
 * Different types of ValueStates.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.ValueState
 */
enum ValueState {
	/**
	 *
	 * @public
	 * @type {None}
	 */
	None = "None",

	/**
	 *
	 * @public
	 * @type {Success}
	 */
	Success = "Success",

	/**
	 *
	 * @public
	 * @type {Warning}
	 */
	Warning = "Warning",

	/**
	 *
	 * @public
	 * @type {Error}
	 */
	Error = "Error",

	/**
	 *
	 * @public
	 * @type {Information}
	 */
	Information = "Information",
}

export default ValueState;
