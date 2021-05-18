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

const impliesRTL = language => {
	language = (language && M_ISO639_OLD_TO_NEW[language]) || language;

	return A_RTL_LOCALES.indexOf(language) >= 0;
};

const getRTL = () => {
	const configurationRTL = getConfiguredRTL();

	if (configurationRTL !== null) {
		return !!configurationRTL;
	}

	return impliesRTL(getLanguage() || detectNavigatorLanguage());
};

export { getRTL }; // eslint-disable-line
