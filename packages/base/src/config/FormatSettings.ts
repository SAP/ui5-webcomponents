import LegacyDateFormats from "../features/LegacyDateFormats.js";
import type { LegacyDateCalendarCustomizing, LegacyDateFormat } from "../features/LegacyDateFormats.js";
import { getFormatSettings } from "../InitialConfiguration.js";
import { getFeature } from "../FeaturesRegistry.js";

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

const legacyDateFormats = getFeature<typeof LegacyDateFormats>("LegacyDateFormats");

const getLegacyDateCalendarCustomizing = legacyDateFormats ? LegacyDateFormats.getLegacyDateCalendarCustomizing : () => { return [] };
const getLegacyDateFormat = legacyDateFormats ? legacyDateFormats.getLegacyDateFormat : () => {};

export {
	getFirstDayOfWeek,
	getLegacyDateCalendarCustomizing,
	getLegacyDateFormat,
};

export type { FormatSettings };
