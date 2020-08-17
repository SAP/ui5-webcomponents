import { getLanguage as getConfiguredLanguage } from "../InitialConfiguration.js";
import { fireLanguageChange } from "../locale/languageChange.js";
import RenderScheduler from "../RenderScheduler.js";

let language;

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

export {
	getLanguage,
	setLanguage,
};
