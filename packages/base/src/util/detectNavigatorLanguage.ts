import { DEFAULT_LANGUAGE } from "../generated/AssetParameters.js";

const detectNavigatorLanguage = () => {
	const browserLanguages = navigator.languages;

	const navigatorLanguage = () => {
		return navigator.language;
	};

	const rawLocale = (browserLanguages && browserLanguages[0]) || navigatorLanguage();

	return rawLocale || DEFAULT_LANGUAGE;
};

export default detectNavigatorLanguage;
