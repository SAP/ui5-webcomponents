import { getFormatSettings } from "../InitialConfiguration.js";

let formatSettings;

/**
 * Getter for the first day of the week
 * @return {string}
 */
const getFirstDayOfWeek = () => {
	if (formatSettings === undefined) {
		formatSettings = getFormatSettings();
	}

	return formatSettings.firstDayOfWeek;
};

export { getFirstDayOfWeek }; // eslint-disable-line
