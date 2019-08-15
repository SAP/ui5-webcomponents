import { getFormatSettings } from "../InitialConfiguration.js";

const formatSettings = getFormatSettings();

const getFirstDayOfWeek = () => {
	return formatSettings.firstDayOfWeek;
};

export { getFirstDayOfWeek }; // eslint-disable-line
