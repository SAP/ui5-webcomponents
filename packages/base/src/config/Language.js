import { getLanguage as getConfiguredLanguage } from "../InitialConfiguration.js";

let language;

const getLanguage = () => {
	if (language === undefined) {
		language = getConfiguredLanguage();
	}
	return language;
};

export { getLanguage }; // eslint-disable-line
