// @ts-check
import { getRTL as getConfiguredRTL } from "../InitialConfiguration.js";
import { getLanguage } from "./Language.js";
import getDesigntimePropertyAsArray from "../util/getDesigntimePropertyAsArray.js";
import detectNavigatorLanguage from "../util/detectNavigatorLanguage.js";

const M_ISO639_OLD_TO_NEW = {
	"iw": "he",
	"ji": "yi",
	"in": "id",
	"sh": "sr",
};

const A_RTL_LOCALES = getDesigntimePropertyAsArray("$cldr-rtl-locales:ar,fa,he$") || [];

/**
 * Checks whether the language is using RTL
 * @param {String} language
 * @returns {Boolean} whether the language is using RTL
 */
const impliesRTL = language => {
	language = (language && M_ISO639_OLD_TO_NEW[language]) || language;

	return A_RTL_LOCALES.indexOf(language) >= 0;
};

/**
 * Gets the effective RTL setting by first checking the configuration
 * and if not set using the currently set language or the navigator language if the language is not explicitly set.
 * @returns {Boolean} whether RTL should be used
 */
const getRTL = () => {
	const configurationRTL = getConfiguredRTL();

	if (configurationRTL !== null) {
		return !!configurationRTL;
	}

	return impliesRTL(getLanguage() || detectNavigatorLanguage());
};

export { getRTL }; // eslint-disable-line
