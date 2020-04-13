import { getThemeProperties, getRegisteredPackages, getCustomTheme } from "../asset-registries/Themes.js";
import createThemePropertiesStyleTag from "./createThemePropertiesStyleTag.js";
import updateCustomThemeTag from "./updateCustomThemeTag.js";

const applyTheme = async theme => {
	let cssText = "";

	const registeredPackages = getRegisteredPackages();
	const customTheme = getCustomTheme(theme);
	const fallbackTheme = customTheme ? customTheme.baseName : undefined;

	// Theme base
	const hasThemeBase = registeredPackages.has("@ui5/webcomponents-theme-base");
	if (hasThemeBase) {
		if (customTheme) {
			updateCustomThemeTag(customTheme.content);
		} else {
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
};

export default applyTheme;
