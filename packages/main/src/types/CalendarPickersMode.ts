/**
 * Defines which pickers the calendar is allowed to show - day/month/year, only month/year, or only year.
 *
 * @class
 * @enum {string}
 * @private
 * @author SAP SE
 * @alias sap.ui.webc.main.types.CalendarPickersMode
 */

enum CalendarPickersMode {
	/**
	 * User can select days, months and years
	 * @public
	 * @type {DAY_MONTH_YEAR}
	 */
	DAY_MONTH_YEAR = "DAY_MONTH_YEAR",

	/**
	 * User can select months and years
	 * @public
	 * @type {MONTH_YEAR}
	 */
	MONTH_YEAR = "MONTH_YEAR",

	/**
	 * User can select years
	 * @public
	 * @type {MONTH_YEAR}
	 */
	YEAR = "YEAR"
}

export default CalendarPickersMode;
