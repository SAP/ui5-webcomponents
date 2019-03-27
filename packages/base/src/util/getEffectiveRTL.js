import { getRTL, getLanguage } from "../Configuration";
import getDesigntimePropertyAsArray from "./getDesigntimePropertyAsArray";
import detectNavigatorLanguage from "./detectNavigatorLanguage";

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

const getEffectiveRTL = () => {
	const configurationRTL = getRTL();

	if (configurationRTL !== null) {
		return !!configurationRTL;
	}

	return impliesRTL(getLanguage() || detectNavigatorLanguage());
};

export default getEffectiveRTL;
