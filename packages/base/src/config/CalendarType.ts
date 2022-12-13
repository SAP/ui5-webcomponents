import CalendarType from "../types/CalendarType.js";
import { getCalendarType as getConfiguredCalendarType } from "../InitialConfiguration.js";

let calendarType: CalendarType | undefined;

/**
 * Returns the configured or default calendar type.
 * @public
 * @returns { CalendarType } the effective calendar type
 */
const getCalendarType = (): CalendarType => {
	if (calendarType === undefined) {
		calendarType = getConfiguredCalendarType();
	}

	if (calendarType && calendarType in CalendarType) {
		return calendarType;
	}

	return CalendarType.Gregorian;
};

export { getCalendarType }; // eslint-disable-line
