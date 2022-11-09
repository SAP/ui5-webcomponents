import DataType from "./DataType.js";

/**
 * @class
 * Different types of ValueState.
 *
 * @extends sap.ui.webcomponents.base.types.DataType
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.ValueState
 * @public
 * @enum {string}
 */
 class ValueState extends DataType {
	static override isValid(value: ValueStates) {
		return !!ValueStates[value];
	}
}

/**
 * Different types of ValueStates.
 * @lends sap.ui.webcomponents.base.types.ValueState.prototype
 * @public
 */
enum ValueStates {
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

ValueState.generateTypeAccessors(ValueStates);

export default ValueState;
