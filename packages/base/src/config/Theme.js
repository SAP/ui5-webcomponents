import { _getTheme as getConfiguredTheme } from "../Configuration.js";
import { _applyTheme } from "../Theming.js";

let theme = getConfiguredTheme();

const getTheme = () => {
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
