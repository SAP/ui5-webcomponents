import { getThemeProperties, getRegisteredPackages } from "../asset-registries/Themes.js";
import { getExternalThemePresent } from "./ExternalThemePresent.js";
import createThemePropertiesStyleTag from "./createThemePropertiesStyleTag.js";

const applyTheme = async theme => {
	let cssText = "";

	const registeredPackages = getRegisteredPackages();
	if (getExternalThemePresent()) {
		registeredPackages.delete("@ui5/webcomponents-theme-base");
	}

	registeredPackages.forEach(async packageName => {
		cssText = await getThemeProperties(packageName, theme);
		createThemePropertiesStyleTag(cssText, packageName);
	});
};

export default applyTheme;
