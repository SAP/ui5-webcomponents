import type { ComponentStylesData, StyleData } from "../types.js";
import { getRegisteredComponentPackagesStyleData } from "./applyTheme.js";

const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers
const findPackageVariables = (styleData: StyleData) => {
	return [...getRegisteredComponentPackagesStyleData()].find(registeredPackage => (registeredPackage).packageName === styleData.packageName);
};

const getThemeVariablesStyleString = (styles: ComponentStylesData) => {
	if (Array.isArray(styles)) {
		return (styles.filter(style => !!style).flat(MAX_DEPTH_INHERITED_CLASSES) as Array<StyleData>).map((style: StyleData) => {
			const packageVariables = findPackageVariables(style);

			if (!packageVariables) {
				return "";
			}

			return typeof packageVariables === "string" ? packageVariables : packageVariables.content;
		}).join(" ");
	}

	const packageVariables = findPackageVariables(styles);

	if (!packageVariables) {
		return "";
	}

	return typeof packageVariables === "string" ? packageVariables : packageVariables.content;
};

export default getThemeVariablesStyleString;
