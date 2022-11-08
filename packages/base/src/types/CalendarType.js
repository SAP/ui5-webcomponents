import DataType from "./DataType.js";

/**
 * Different calendar types.
 * @lends sap.ui.webcomponents.base.types.CalendarType.prototype
 * @public
 */
const CalendarTypes = {
	/**
	 * @public
	 * @type {Gregorian}
	 */
	Gregorian: "Gregorian",

	/**
	 * @public
	 * @type {Islamic}
	 */
	Islamic: "Islamic",

	/**
	 * @public
	 * @type {Japanese}
	 */
	Japanese: "Japanese",

	/**
	 * @public
	 * @type {Buddhist}
	 */
	Buddhist: "Buddhist",

	/**
	 * @public
	 * @type {Persian}
	 */
	Persian: "Persian",
};

/**
 * @class
 * Different calendar types.
 *
 * @extends sap.ui.webcomponents.base.types.DataType
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.CalendarType
 * @public
 * @enum {string}
 */
class CalendarType extends DataType {
	static isValid(value) {
		return !!CalendarTypes[value];
	}
}

CalendarType.generateTypeAccessors(CalendarTypes);

export default CalendarType;
