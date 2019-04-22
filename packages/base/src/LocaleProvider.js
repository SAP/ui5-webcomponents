import Locale from "./Locale.js";
import detectNavigatorLanguage from "./util/detectNavigatorLanguage.js";
import { getLanguage as getConfigLanguage } from "./Configuration.js";

const convertToLocaleOrNull = lang => {
	try {
		if (lang && typeof lang === "string") {
			return new Locale(lang);
		}
	} catch (e) {
		// ignore
	}
};

/**
 * Returns the locale based on the configured language Configuration#getLanguage
 * If no language has been configured - a new locale based on browser language is returned
 */
const getLocale = () => {
	if (getConfigLanguage()) {
		return new Locale(getConfigLanguage());
	}

	return convertToLocaleOrNull(detectNavigatorLanguage());
};

/**
 * Returns the language of #getLocale return value
 */
const getLanguage = () => {
	return getLocale().sLanguage;
};

export { getLocale, getLanguage };
