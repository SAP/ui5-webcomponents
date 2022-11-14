import CalendarType, { CalendarTypes } from "../types/CalendarType.js";
import { getCalendarType as getConfiguredCalendarType } from "../InitialConfiguration.js";

let calendarType: CalendarTypes;

/**
 *	Get the configured or default calendar type
 * @returns { String } the effective calendar type
 * @public
 */
const getCalendarType = () => {
	if (calendarType === undefined) {
		calendarType = getConfiguredCalendarType() as CalendarTypes;
	}

	if (CalendarType.isValid(calendarType)) {
		return calendarType;
	}

	return CalendarTypes.Gregorian;
};

export { getCalendarType }; // eslint-disable-line
