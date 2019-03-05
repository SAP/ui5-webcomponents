import Locale from "./Locale";

const mSettings = {};

const getFormatLocale = () => {
	const fallback = () => {
		let oLocale = SETTINGS.configuration.language;
		// if any user settings have been defined, add the private use subtag "sapufmt"
		if (!Object.keys(mSettings).length === 0) {
			// TODO move to Locale/LocaleData
			let l = oLocale.toString();
			if (l.indexOf("-x-") < 0) {
				l += "-x-sapufmt";
			} else if (l.indexOf("-sapufmt") <= l.indexOf("-x-")) {
				l += "-sapufmt";
			}
			oLocale = new Locale(l);
		}
		return oLocale;
	};

	return SETTINGS.configuration.formatLocale || fallback();
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
