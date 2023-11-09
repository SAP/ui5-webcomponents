/**
 * Defines which pickers the calendar is allowed to show - day/month/year, only month/year, or only year.
 *
 * @private
 */

enum CalendarPickersMode {
	/**
	 * User can select days, months and years
	 * @public
	 */
	DAY_MONTH_YEAR = "DAY_MONTH_YEAR",

	/**
	 * User can select months and years
	 * @public
	 */
	MONTH_YEAR = "MONTH_YEAR",

	/**
	 * User can select years
	 * @public
	 */
	YEAR = "YEAR"
}

export default CalendarPickersMode;
