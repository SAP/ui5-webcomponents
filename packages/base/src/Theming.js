import { _getTheme as getConfiguredTheme } from "./Configuration.js";
import { addCustomCSS, getCustomCSS } from "./theming/CustomStyle.js";
import { getThemeProperties } from "./theming/ThemeProperties.js";
import { injectThemeProperties } from "./theming/StyleInjection.js";

const defaultTheme = "sap_fiori_3";
let theme = getConfiguredTheme();
const themeChangeCallbacks = [];

const attachThemeChange = function attachThemeChange(callback) {
	if (themeChangeCallbacks.indexOf(callback) === -1) {
		themeChangeCallbacks.push(callback);
	}
};

const _applyTheme = async () => {
	let cssText = "";

	if (theme !== defaultTheme) {
		cssText = await getThemeProperties("@ui5/webcomponents", theme);
	}
	injectThemeProperties(cssText);
};

const getTheme = () => {
	return theme;
};

const setTheme = async newTheme => {
	if (theme === newTheme) {
		return;
	}

	theme = newTheme;

	// Update CSS Custom Properties
	await _applyTheme();

	themeChangeCallbacks.forEach(callback => callback(theme));
};

const getEffectiveStyle = ElementClass => {
	const tag = ElementClass.getMetadata().getTag();
	const customStyle = getCustomCSS(tag) || "";
	let componentStyles = ElementClass.styles;

	if (Array.isArray(componentStyles)) {
		componentStyles = componentStyles.join(" ");
	}
	return `${componentStyles} ${customStyle}`;
};

export {
	attachThemeChange,
	_applyTheme,
	getTheme,
	setTheme,
	getEffectiveStyle,
	addCustomCSS,
};
