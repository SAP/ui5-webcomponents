import { getFormatSettings } from "../InitialConfiguration.js";
import type { FormatSettings } from "../config/FormatSettings.js";
import { registerFeature } from "../FeaturesRegistry.js";

// legacy ABAP date formats
type LegacyDateFormat = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "A" | "B" | "C" | undefined;
// Allows specifying the customizing data for Islamic calendar support
// dateFormat - The date format // check LegacyDateFormat type for supported values
// islamicMonthStart - The Islamic date in string format // 14360101
// gregDate - Corresponding Gregorian date to the Islamic one in string format // 20141024
type CalendarFormat = {
	dateFormat: string,
	islamicMonthStart: string,
	gregDate: string,
};
type LegacyDateCalendarCustomizing = Array<CalendarFormat>;

let formatSettings: FormatSettings;

class LegacyDateFormats {
	/**
	 * Returns the currently set customizing data for Islamic calendar support
	 *
	 * @return {object[]} Returns an array that contains the customizing data.
	 * @public
	 */
	static getLegacyDateCalendarCustomizing(): LegacyDateCalendarCustomizing {
		if (formatSettings === undefined) {
			formatSettings = getFormatSettings();
		}

		return formatSettings.legacyDateCalendarCustomizing || [];
	};

	/**
	 * Returns the currently set legacy ABAP date format (its id).
	 * @return {"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"A"|"B"|"C"|undefined} ID of the ABAP date format
	 * @public
	 */
	static getLegacyDateFormat(): LegacyDateFormat | undefined {
		if (formatSettings === undefined) {
			formatSettings = getFormatSettings();
		}

		return formatSettings.legacyDateFormat;
	};
}

registerFeature("LegacyDateFormats", LegacyDateFormats);

export default LegacyDateFormats;
export type {
	FormatSettings,
	LegacyDateCalendarCustomizing,
	LegacyDateFormat,
};
