import { getFormatSettings } from "../InitialConfiguration.js";

type FormatSettings = { firstDayOfWeek?: number };

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

export { getFirstDayOfWeek }; // eslint-disable-line
export type { FormatSettings };
