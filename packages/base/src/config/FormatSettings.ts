import { getFormatSettings } from "../InitialConfiguration.js";

type FormatSettings = { firstDayOfWeek?: number };

let formatSettings: FormatSettings;

/**
 * Get the first day of the week from the configured format settings or based on the current locale
 * @returns {Number} 0 (Sunday) through 6 (Saturday)
 */
const getFirstDayOfWeek = () => {
	if (formatSettings === undefined) {
		formatSettings = getFormatSettings();
	}

	return formatSettings.firstDayOfWeek;
};

export { getFirstDayOfWeek }; // eslint-disable-line
export type { FormatSettings };
