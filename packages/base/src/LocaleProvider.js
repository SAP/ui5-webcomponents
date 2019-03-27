import Locale from "./Locale";
import detectNavigatorLanguage from "./util/detectNavigatorLanguage";
import { getLanguage as getConfigLanguage } from "./Configuration";

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
