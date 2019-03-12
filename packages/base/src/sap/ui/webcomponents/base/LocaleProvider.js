import Locale from "./Locale";
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
 * Detects the language based on locale of the browser
 */
const detectLanguage = () => {
	const browserLanguages = navigator.languages;

	const navigatorLanguage = () => {
		return navigator.language;
	};

	const rawLocale = (browserLanguages && browserLanguages[0]) || navigatorLanguage() || navigator.userLanguage || navigator.browserLanguage;

	return rawLocale || "en";
};

/**
 * Returns the locale based on the configured language Configuration#getLanguage
 * If no language has been configured - a new locale based on browser language is returned
 */
const getLocale = () => {
	if (getConfigLanguage()) {
		return new Locale(getConfigLanguage());
	}

	return convertToLocaleOrNull(detectLanguage());
};

/**
 * Returns the language of #getLocale return value
 */
const getLanguage = () => {
	return getLocale().sLanguage;
};

export { getLocale, getLanguage };
