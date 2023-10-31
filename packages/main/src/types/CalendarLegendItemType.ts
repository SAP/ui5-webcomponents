/**
 * Enum for standard calendar legend items.
 *
 * @readonly
 * @enum {string}
 * @private
 * @author SAP SE
 * @alias sap.ui.webc.main.types.CalendarLegendItemType
 */
enum CalendarLegendItemType {
	/**
	 * Represents the "Today" item in the calendar legend.
	 * @private
	 * @type {string}
	 */
	Today = "Today",
	/**
	 * Represents the "Selected" item in the calendar legend.
	 * @private
	 * @type {string}
	 */
	Selected = "Selected",
	/**
	 * Represents the "Working" item in the calendar legend.
	 * @private
	 * @type {string}
	 */
	Working = "Working",
	/**
	 * Represents the "NonWorking" item in the calendar legend.
	 * @private
	 * @type {string}
	 */
	NonWorking = "NonWorking",
}

export default CalendarLegendItemType;
