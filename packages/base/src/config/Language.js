import { getLanguage as getConfiguredLanguage } from "../InitialConfiguration.js";
import { fireLanguageChange } from "../locale/languageChange.js";
import RenderScheduler from "../RenderScheduler.js";

let language;

const getLanguage = () => {
	if (language === undefined) {
		language = getConfiguredLanguage();
	}
	return language;
};

const setLanguage = async newLanguage => {
	if (language === newLanguage) {
		return;
	}

	language = newLanguage;

	const listeners = fireLanguageChange(newLanguage);
	await Promise.all(listeners);
	RenderScheduler.reRenderAllUI5Elements({ languageAware: true });
};

export {
	getLanguage,
	setLanguage,
};
