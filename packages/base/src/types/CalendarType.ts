import DataType from "./DataType.js";

/**
 * Different calendar types.
 * @lends sap.ui.webcomponents.base.types.CalendarType.prototype
 * @public
 */
// TODO jsdoc members
enum CalendarTypes {
	Gregorian = "Gregorian",
	Islamic = "Islamic",
	Japanese = "Japanese",
	Buddhist = "Buddhist",
	Persian = "Persian",
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
	static isValid(value: CalendarTypes) {
		return !!CalendarTypes[value];
	}
}

CalendarType.generateTypeAccessors(CalendarTypes);

export default CalendarType;
export { CalendarTypes };
