import { getTheme as getConfiguredTheme } from "../InitialConfiguration.js";
import applyTheme from "../theming/applyTheme.js";

let theme;

const getTheme = () => {
	if (theme === undefined) {
		theme = getConfiguredTheme();
	}

	return theme;
};

const setTheme = async newTheme => {
	if (theme === newTheme) {
		return;
	}

	theme = newTheme;

	// Update CSS Custom Properties
	await applyTheme(theme);
};

export {
	getTheme,
	setTheme,
};
