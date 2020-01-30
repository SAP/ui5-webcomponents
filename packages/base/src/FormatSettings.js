import { getLocale } from "./LocaleProvider.js";

const mSettings = {};

const getFormatLocale = () => {
	return getLocale();
};

const SETTINGS = {
	configuration: null,
};

const setConfiguration = configuration => {
	SETTINGS.configuration = configuration;
};

const getCustomLocaleData = () => {
	return mSettings;
};

// needed for compatibilty
const getLegacyDateFormat = () => {};
const getLegacyDateCalendarCustomizing = () => {};

export {
	setConfiguration,
	getFormatLocale,
	getLegacyDateFormat,
	getLegacyDateCalendarCustomizing,
	getCustomLocaleData,
};
