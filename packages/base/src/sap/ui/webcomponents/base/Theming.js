import { getTheme, _setTheme } from "./Configuration";
import { getStyles } from "./theming/ThemeBundle";
import { getCustomCSS } from "./theming/CustomStyle";
import { getThemeProperties } from "./theming/ThemeProperties";
import { injectThemeProperties, updateWebComponentStyles } from "./theming/StyleInjection";

const themeChangeCallbacks = [];

const attachThemeChange = function attachThemeChange(callback) {
	if (themeChangeCallbacks.indexOf(callback) === -1) {
		themeChangeCallbacks.push(callback);
	}
};

const applyTheme = async () => {
	const theme = getTheme();
	const cssText = await getThemeProperties("@ui5/webcomponents", theme);
	injectThemeProperties(cssText);
	updateWebComponentStyles();
};

const setTheme = async theme => {
	if (theme === getTheme()) {
		return;
	}

	// Update configuration
	_setTheme(theme);

	// Update CSS Custom Properties
	await applyTheme();

	themeChangeCallbacks.forEach(callback => callback(theme));
};

const getEffectiveStyle = async (theme, styleUrls, tag) => {
	const styles = await getStyles(theme, styleUrls);
	const cssContent = [];
	styles.forEach(css => {
		cssContent.push(css);
	});

	const customStyle = getCustomCSS(theme, tag);
	if (customStyle) {
		cssContent.push(customStyle);
	}

	const cssText = cssContent.join(" ");
	return cssText;
};

window.setTheme = setTheme; // for testing easily

export {
	attachThemeChange,
	applyTheme,
	setTheme,
	getEffectiveStyle,
};
