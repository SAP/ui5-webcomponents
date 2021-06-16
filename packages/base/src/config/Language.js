// @ts-check
import {
	getLanguage as getConfiguredLanguage,
	getFetchDefaultLanguage as getConfiguredFetchDefaultLanguage,
} from "../InitialConfiguration.js";
import { fireLanguageChange } from "../locale/languageChange.js";
import { reRenderAllUI5Elements } from "../Render.js";

/** @type {String} */
let curLanguage;
/** @type {Boolean} */
let fetchDefaultLanguage;

/**
 * Returns the currently configured language, or the browser language as a fallback
 * @returns {String}
 */
const getLanguage = () => {
	if (curLanguage === undefined) {
		curLanguage = getConfiguredLanguage();
	}
	return curLanguage;
};

/**
 * Changes the current language, re-fetches all message bundles, updates all language-aware components
 * and returns a promise that resolves when all rendering is done
 *
 * @param {String} language
 * @returns {Promise<void>}
 */
const setLanguage = async language => {
	if (curLanguage === language) {
		return;
	}

	curLanguage = language;

	await fireLanguageChange(language);
	await reRenderAllUI5Elements({ languageAware: true });
};

/**
 * Defines if the default language, that is inlined, should be
 * fetched over the network instead of using the inlined one.
 * <b>Note:</b> By default the language will not be fetched.
 *
 * @param {Boolean} fetchDefaultLang
 */
const setFetchDefaultLanguage = fetchDefaultLang => {
	fetchDefaultLanguage = fetchDefaultLang;
};

/**
 * Returns if the default language, that is inlined, should be fetched over the network.
 * @returns {Boolean}
 */
const getFetchDefaultLanguage = () => {
	if (fetchDefaultLanguage === undefined) {
		setFetchDefaultLanguage(getConfiguredFetchDefaultLanguage());
	}

	return fetchDefaultLanguage;
};

export {
	getLanguage,
	setLanguage,
	setFetchDefaultLanguage,
	getFetchDefaultLanguage,
};
