import { getTheme as getConfiguredTheme } from "../InitialConfiguration.js";
import { _applyTheme } from "../Theming.js";

let theme;

const getTheme = () => {
	if (!theme) {
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
	await _applyTheme(theme);
};

export {
	getTheme,
	setTheme,
};
