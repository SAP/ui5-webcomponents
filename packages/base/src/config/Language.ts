import {
	getLanguage as getConfiguredLanguage,
	getFetchDefaultLanguage as getConfiguredFetchDefaultLanguage,
} from "../InitialConfiguration.js";
import { fireLanguageChange } from "../locale/languageChange.js";
import { reRenderAllUI5Elements } from "../Render.js";
import { DEFAULT_LANGUAGE } from "../generated/AssetParameters.js";

let curLanguage: string | undefined;
let fetchDefaultLanguage: boolean;

/**
 * Returns the currently configured language, or the browser language as a fallback.
 * @public
 * @returns {string}
 */
const getLanguage = (): string | undefined => {
	if (curLanguage === undefined) {
		curLanguage = getConfiguredLanguage();
	}
	return curLanguage;
};

/**
 * Changes the current language, re-fetches all message bundles, updates all language-aware components
 * and returns a promise that resolves when all rendering is done.
 *
 * @param {string} language
 * @public
 * @returns {Promise<void>}
 */
const setLanguage = async (language: string): Promise<void> => {
	if (curLanguage === language) {
		return;
	}

	curLanguage = language;

	await fireLanguageChange(language);
	await reRenderAllUI5Elements({ languageAware: true });
};

/**
 * Returns the default languague.
 *
 * Note: Default language might be different than the configurated one.
 *
 * @public
 * @returns {string}
 */
const getDefaultLanguage = (): string => {
	return DEFAULT_LANGUAGE;
};

/**
 * Defines if the default language, that is inlined, should be
 * fetched over the network instead of using the inlined one.
 * <b>Note:</b> By default the language will not be fetched.
 *
 * @public
 * @param {boolean} fetchDefaultLang
 */
const setFetchDefaultLanguage = (fetchDefaultLang: boolean) => {
	fetchDefaultLanguage = fetchDefaultLang;
};

/**
 * Returns if the default language, that is inlined, should be fetched over the network.
 * @public
 * @returns {boolean}
 */
const getFetchDefaultLanguage = (): boolean => {
	if (fetchDefaultLanguage === undefined) {
		setFetchDefaultLanguage(getConfiguredFetchDefaultLanguage());
	}

	return fetchDefaultLanguage;
};

export {
	getLanguage,
	setLanguage,
	getDefaultLanguage,
	setFetchDefaultLanguage,
	getFetchDefaultLanguage,
};
