import { getThemeProperties, getRegisteredPackages, isThemeRegistered } from "../asset-registries/Themes.js";
import createThemePropertiesStyleTag from "./createThemePropertiesStyleTag.js";
import getExternalThemeInfo from "./getExternalThemeInfo.js";
import { ponyfillNeeded, runPonyfill } from "./CSSVarsPonyfill.js";

const loadThemeBase = async theme => {
	const cssText = await getThemeProperties("@ui5/webcomponents-theme-base", theme);
	createThemePropertiesStyleTag(cssText, "@ui5/webcomponents-theme-base");
};

const loadComponentPackages = async theme => {
	const registeredPackages = getRegisteredPackages();
	registeredPackages.forEach(async packageName => {
		if (packageName === "@ui5/webcomponents-theme-base") {
			return;
		}

		const cssText = await getThemeProperties(packageName, theme);
		createThemePropertiesStyleTag(cssText, packageName);
	});
};

const applyTheme = async theme => {
	const externalThemeInfo = getExternalThemeInfo();

	// If there is an externally loaded theme, and it is currently being loaded, skip theme_base and only load packages, otherwise load everything
	if (externalThemeInfo && theme === externalThemeInfo.themeName) {
		const packagesTheme = isThemeRegistered(theme) ? theme : externalThemeInfo.baseThemeName;
		await loadComponentPackages(packagesTheme);
	} else {
		await loadThemeBase(theme);
		await loadComponentPackages(theme);
	}

	// When changing the theme, run the ponyfill immediately
	if (ponyfillNeeded()) {
		runPonyfill();
	}
};

export default applyTheme;
