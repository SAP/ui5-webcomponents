import { getThemeProperties, getRegisteredPackages } from "../asset-registries/Themes.js";
import createThemePropertiesStyleTag from "./createThemePropertiesStyleTag.js";
import getExternalThemeInfo from "./getExternalThemeInfo.js";
import { ponyfillNeeded, runPonyfill } from "./CSSVarsPonyfill.js";

const applyTheme = async theme => {
	const externalThemeInfo = getExternalThemeInfo();

	let cssText = "";

	const registeredPackages = getRegisteredPackages();
	const fallbackTheme = externalThemeInfo ? externalThemeInfo.baseThemeName : undefined;

	// Theme base
	const hasThemeBase = registeredPackages.has("@ui5/webcomponents-theme-base");
	if (hasThemeBase) {
		if (!externalThemeInfo) {
			cssText = await getThemeProperties("@ui5/webcomponents-theme-base", theme);
			createThemePropertiesStyleTag(cssText, "@ui5/webcomponents-theme-base");
		}
	}

	// All other packages
	registeredPackages.delete("@ui5/webcomponents-theme-base");
	registeredPackages.forEach(async packageName => {
		cssText = await getThemeProperties(packageName, theme, fallbackTheme);
		createThemePropertiesStyleTag(cssText, packageName);
	});

	// When changing the theme, run the ponyfill immediately
	if (ponyfillNeeded()) {
		runPonyfill();
	}
};

export default applyTheme;
