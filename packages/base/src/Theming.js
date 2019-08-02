import { addCustomCSS, getCustomCSS } from "./theming/CustomStyle.js";
import { getThemeProperties } from "./theming/ThemeProperties.js";
import injectThemeProperties from "./theming/injectThemeProperties.js";

const defaultTheme = "sap_fiori_3";
const themeChangeCallbacks = [];

const attachThemeChange = function attachThemeChange(callback) {
	if (themeChangeCallbacks.indexOf(callback) === -1) {
		themeChangeCallbacks.push(callback);
	}
};

const _applyTheme = async theme => {
	if (window.ShadyCSS) { // IE - just fetch CSS vars, they will be used later by ShadyCSS
		await getThemeProperties("@ui5/webcomponents", theme);
	} else { // Modern browsers
		if (theme === defaultTheme) { // Reset CCS vars for default theme
			injectThemeProperties("");
		} else { // Inject new CSS vars for every other theme
			const cssText = await getThemeProperties("@ui5/webcomponents", theme);
			injectThemeProperties(cssText);
		}
	}

	_executeThemeChangeCallbacks(theme); // This will trigger ShadyCSS for IE
};

const _executeThemeChangeCallbacks = theme => {
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
	getEffectiveStyle,
	addCustomCSS,
};
