import CalendarType from "../types/CalendarType.js";
import { getCalendarType as getConfiguredCalendarType } from "../InitialConfiguration.js";

let calendarType;

/**
 *	Get the configured or default calendar type
 * @returns { String } the effective calendar type
 * @public
 */
const getCalendarType = () => {
	if (calendarType === undefined) {
		calendarType = getConfiguredCalendarType();
	}

	if (CalendarType.isValid(calendarType)) {
		return calendarType;
	}

	return CalendarType.Gregorian;
};

export { getCalendarType }; // eslint-disable-line
