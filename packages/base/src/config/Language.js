import {
	getLanguage as getConfiguredLanguage,
	getUseDefaultLanguage as getConfiguredUseDefaultLanguage,
} from "../InitialConfiguration.js";
import { fireLanguageChange } from "../locale/languageChange.js";
import RenderScheduler from "../RenderScheduler.js";

let language;
let useDefaultLanguage;

/**
 * Returns the currently configured language, or the browser language as a fallback
 * @returns {String}
 */
const getLanguage = () => {
	if (language === undefined) {
		language = getConfiguredLanguage();
	}
	return language;
};

/**
 * Changes the current language, re-fetches all message bundles, updates all language-aware components
 * and returns a promise that resolves when all rendering is done
 *
 * @param newLanguage
 * @returns {Promise<void>}
 */
const setLanguage = async newLanguage => {
	if (language === newLanguage) {
		return;
	}

	language = newLanguage;

	const listenersResults = fireLanguageChange(newLanguage);
	await Promise.all(listenersResults);
	RenderScheduler.reRenderAllUI5Elements({ languageAware: true });
	return RenderScheduler.whenFinished();
};

/**
 * Defines if the default language, that is inlined, should be used,
 * instead of fetching the language over the network.
 * <b>Note:</b> By default the language will be fetched.
 *
 * @param {Boolean} useDefaultLanguage
 */
const setUseDefaultLanguage = useDefaultLang => {
	useDefaultLanguage = useDefaultLang;
};

/**
 * Returns if the default language, that is inlined, should be used.
 * @returns {Boolean}
 */
const getUseDefaultLanguage = () => {
	if (useDefaultLanguage === undefined) {
		setUseDefaultLanguage(getConfiguredUseDefaultLanguage());
	}

	return useDefaultLanguage;
};

export {
	getLanguage,
	setLanguage,
	setUseDefaultLanguage,
	getUseDefaultLanguage,
};
