import { getFormatSettings } from "../InitialConfiguration.js";
import type { FormatSettings } from "../config/FormatSettings.js";
import { registerFeature } from "../FeaturesRegistry.js";

// Allows specifying the customizing data for Islamic calendar support
// dateFormat - The date format
// islamicMonthStart - The Islamic date in string format // 14360101
// gregDate - Corresponding Gregorian date to the Islamic one in string format // 20141024
type IslamicToGregorianMapping = {
	dateFormat: string,
	islamicMonthStart: string,
	gregDate: string,
};
type LegacyDateCalendarCustomizing = Array<IslamicToGregorianMapping>;

let formatSettings: FormatSettings;

class LegacyDateFormats {
	/**
	 * Returns the currently set customizing data for Islamic calendar support
	 *
	 * @return {object[]} Returns an array that contains the customizing data.
	 * @public
	 */
	static getLegacyDateCalendarCustomizing(this: void): LegacyDateCalendarCustomizing {
		if (formatSettings === undefined) {
			formatSettings = getFormatSettings();
		}

		return formatSettings.legacyDateCalendarCustomizing || [];
	}
}

registerFeature("LegacyDateFormats", LegacyDateFormats);

export default LegacyDateFormats;
export type {
	FormatSettings,
	LegacyDateCalendarCustomizing,
};
