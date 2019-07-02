import { getTheme, _setTheme } from "./Configuration.js";
import { addCustomCSS, getCustomCSS } from "./theming/CustomStyle.js";
import { getThemeProperties } from "./theming/ThemeProperties.js";
import { injectThemeProperties } from "./theming/StyleInjection.js";

const themeChangeCallbacks = [];

const getDefaultTheme = () => {
	return "sap_fiori_3";
};

const attachThemeChange = function attachThemeChange(callback) {
	if (themeChangeCallbacks.indexOf(callback) === -1) {
		themeChangeCallbacks.push(callback);
	}
};

const applyTheme = async () => {
	let cssText = "";
	const theme = getTheme();

	const defaultTheme = getDefaultTheme();
	if (theme !== defaultTheme) {
		cssText = await getThemeProperties("@ui5/webcomponents", theme);
	}
	injectThemeProperties(cssText);
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
	getDefaultTheme,
	attachThemeChange,
	applyTheme,
	setTheme,
	getEffectiveStyle,
	addCustomCSS,
};
