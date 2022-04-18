// @ts-check
import { getFormatSettings } from "../InitialConfiguration.js";

let formatSettings;

/**
 * Get the first day of the week from the configured format settings or based on the current locale
 * @returns {Number} 0 (Sunday) through 6 (Saturday)
 */
const getFirstDayOfWeek = (): number => {
	if (formatSettings === undefined) {
		formatSettings = getFormatSettings();
	}

	return formatSettings.firstDayOfWeek;
};

export { getFirstDayOfWeek }; // eslint-disable-line
