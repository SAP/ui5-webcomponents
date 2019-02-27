import { getTheme, _setTheme } from "./Configuration";
import { getStyles } from "./theming/ThemeBundle";
import { getCustomCSS } from "./theming/CustomStyle";

const themeChangeCallbacks = [];

const attachThemeChange = function attachThemeChange(callback) {
	if (themeChangeCallbacks.indexOf(callback) === -1) {
		themeChangeCallbacks.push(callback);
	}
};

const setTheme = function setTheme(theme) {
	if (theme === getTheme()) {
		return;
	}

	_setTheme(theme);
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

export { attachThemeChange, setTheme, getEffectiveStyle };
