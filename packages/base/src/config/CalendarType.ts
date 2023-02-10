import CalendarType from "../types/CalendarType.js";
import { getCalendarType as getConfiguredCalendarType, getFormatSettings } from "../InitialConfiguration.js";

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

	const legacyDateFormat = getFormatSettings().legacyDateFormat;

	switch (legacyDateFormat) {
	case "1":
	case "2":
	case "3":
	case "4":
	case "5":
	case "6":
		return CalendarType.Gregorian;
	case "7":
	case "8":
	case "9":
		return CalendarType.Japanese;
	case "A":
	case "B":
		return CalendarType.Islamic;
	case "C":
		return CalendarType.Persian;
	default:
		return CalendarType.Gregorian;
	}
};

export { getCalendarType }; // eslint-disable-line
