import { getFormatSettings } from "../InitialConfiguration.js";

type LegacyDateFormat = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "A" | "B" | "C" | undefined;
type CalendarFormat = {
	dateFormat: string,
	islamicMonthStart: string,
	gregDate: string,
};
type LegacyDateCalendarCustomizing = Array<CalendarFormat>;

type FormatSettings = {
	firstDayOfWeek?: number,
	legacyDateCalendarCustomizing?: LegacyDateCalendarCustomizing,
	legacyDateFormat?: LegacyDateFormat,
};

let formatSettings: FormatSettings;

/**
 * Returns the first day of the week from the configured format settings or based on the current locale.
 * @public
 * @returns {Number} 0 (Sunday) through 6 (Saturday)
 */
const getFirstDayOfWeek = (): number | undefined => {
	if (formatSettings === undefined) {
		formatSettings = getFormatSettings();
	}

	return formatSettings.firstDayOfWeek;
};

const getLegacyDateCalendarCustomizing = (): LegacyDateCalendarCustomizing => {
	if (formatSettings === undefined) {
		formatSettings = getFormatSettings();
	}

	return formatSettings.legacyDateCalendarCustomizing || [];
};

const getLegacyDateFormat = (): LegacyDateFormat | undefined => {
	if (formatSettings === undefined) {
		formatSettings = getFormatSettings();
	}

	return formatSettings.legacyDateFormat;
};

export {
	getFirstDayOfWeek,
	getLegacyDateCalendarCustomizing,
	getLegacyDateFormat,
};
export type {
	FormatSettings,
	LegacyDateCalendarCustomizing,
	LegacyDateFormat,
};
