import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.CalendarSelectionMode.prototype
 * @public
 */
const CalendarSelectionModes = {
	/**
	 * Only one date can be selected at a time
	 * @public
	 * @type {Single}
	 */
	Single: "Single",

	/**
	 * Several dates can be selected
	 * @public
	 * @type {Multiple}
	 */
	Multiple: "Multiple",

	/**
	 * A range defined by a start date and an end date can be selected
	 * @public
	 * @type {Range}
	 */
	Range: "Range",
};

/**
 * @class
 * Different date selection modes for <code>ui5-calendar</code>.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.CalendarSelectionMode
 * @public
 * @enum {string}
 */
class CalendarSelectionMode extends DataType {
	static isValid(value) {
		return !!CalendarSelectionModes[value];
	}
}

CalendarSelectionMode.generateTypeAccessors(CalendarSelectionModes);

export default CalendarSelectionMode;
