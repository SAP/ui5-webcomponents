import { getLanguage as getConfiguredLanguage } from "../InitialConfiguration.js";

const language = getConfiguredLanguage();

const getLanguage = () => {
	return language;
};

export { getLanguage }; // eslint-disable-line
