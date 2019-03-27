import { getTheme, _setTheme } from "./Configuration";
import { getStyles } from "./theming/ThemeBundle";
import { getCustomCSS } from "./theming/CustomStyle";
import { getThemeProperties } from "./theming/ThemeProperties";
import { injectThemeProperties, updateWebComponentStyles } from "./theming/StyleInjection";

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

const getEffectiveStyle = (ElementClass) => {
	const theme = getTheme();
	const styleUrls = ElementClass.getMetadata().getStyleUrl();
	const tag = ElementClass.getMetadata().getTag();
	const styles = getStyles(theme, styleUrls);
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

export {
	getDefaultTheme,
	attachThemeChange,
	applyTheme,
	setTheme,
	getEffectiveStyle,
};
