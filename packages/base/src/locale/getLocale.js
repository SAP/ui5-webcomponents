import detectNavigatorLanguage from "../util/detectNavigatorLanguage.js";
import { getLanguage as getConfigLanguage } from "../config/Language.js";
import Locale from "./Locale.js";

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
 * Returns the locale based on the parameter or configured language Configuration#getLanguage
 * If no language has been configured - a new locale based on browser language is returned
 */
const getLocale = lang => {
	if (lang) {
		return convertToLocaleOrNull(lang);
	}

	if (getConfigLanguage()) {
		return new Locale(getConfigLanguage());
	}

	return convertToLocaleOrNull(detectNavigatorLanguage());
};

export default getLocale;
