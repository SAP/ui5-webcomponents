import { DEFAULT_LANGUAGE } from "../generated/AssetParameters.js";

export default () => {
	const browserLanguages = navigator.languages;

	const navigatorLanguage = () => {
		return navigator.language;
	};

	const rawLocale = (browserLanguages && browserLanguages[0]) || navigatorLanguage();

	return rawLocale || DEFAULT_LANGUAGE;
};
