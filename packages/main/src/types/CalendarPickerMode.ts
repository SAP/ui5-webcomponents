/**
 * Different Calendar modes.
 *
 * @class
 * @enum {string}
 * @private
 * @author SAP SE
 * @alias sap.ui.webc.main.types.CalendarPickerMode
 */

enum CalendarPickerMode {
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

export default CalendarPickerMode;
