import CalendarType from "../types/CalendarType.js";
import { getCalendarType as getConfiguredCalendarType } from "../InitialConfiguration.js";

let calendarType;

/**
 * Getter for the currently active calendar type
 * @return {string|null}
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
