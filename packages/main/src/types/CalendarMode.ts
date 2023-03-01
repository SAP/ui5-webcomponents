/**
 * Different Calendar modes.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.CalendarMode
 */

enum CalendarMode {
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

export default CalendarMode;
