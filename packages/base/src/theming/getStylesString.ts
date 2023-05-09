import type { ComponentStylesData, StyleData, StyleDataCSP } from "../types.js";
import { getRegisteredPackagesThemeData } from "./applyTheme.js";

const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers
const findCurrentPackageStyles = (styleData: StyleDataCSP) => {
	return [...getRegisteredPackagesThemeData()].find(registeredPackage => (registeredPackage as StyleDataCSP).packageName === styleData.packageName);
};

const getStylesString = (styles: ComponentStylesData) => {
	if (Array.isArray(styles)) {
		return (styles.filter(style => !!style).flat(MAX_DEPTH_INHERITED_CLASSES) as Array<StyleData>).map((style: StyleData) => {
			const currentPackageStyles = findCurrentPackageStyles(style as StyleDataCSP);

			return `${typeof currentPackageStyles === "string" ? currentPackageStyles : currentPackageStyles!.content} ${typeof style === "string" ? style : style.content}`;
		}).join(" ");
	}

	const currentPackageStyles = findCurrentPackageStyles(styles as StyleDataCSP);

	return `${typeof currentPackageStyles === "string" ? currentPackageStyles : currentPackageStyles!.content} ${typeof styles === "string" ? styles : styles.content}`;
};

export default getStylesString;
