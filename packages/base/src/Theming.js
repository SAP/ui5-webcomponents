import { addCustomCSS, getCustomCSS } from "./theming/CustomStyle.js";
import { getThemeProperties, getRegisteredPackages } from "./asset-registries/Themes.js";
import { injectThemeProperties } from "./theming/StyleInjection.js";

const themeChangeCallbacks = [];

const attachThemeChange = function attachThemeChange(callback) {
	if (themeChangeCallbacks.indexOf(callback) === -1) {
		themeChangeCallbacks.push(callback);
	}
};

const _applyTheme = async theme => {
	let cssText = "";

	const registeredPackages = getRegisteredPackages();
	registeredPackages.forEach(async packageName => {
		cssText = await getThemeProperties(packageName, theme);
		injectThemeProperties(cssText, packageName);
	});

	_executeThemeChangeCallbacks(theme);
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
