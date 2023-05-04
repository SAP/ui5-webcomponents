import type { ComponentStylesData, StyleData, StyleDataCSP } from "../types.js";
import { getRegisteredPackagesThemeData } from "./applyTheme.js";

const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers

const getStylesString = (styles: ComponentStylesData) => {
	if (Array.isArray(styles)) {
		return (styles.filter(style => !!style).flat(MAX_DEPTH_INHERITED_CLASSES) as Array<StyleData>).map((style: StyleData) => {
			const currentPackageStyle = [...getRegisteredPackagesThemeData()].find(registeredPackage => (registeredPackage as StyleDataCSP).packageName === (style as StyleDataCSP).packageName);

			return `${typeof currentPackageStyle === "string" ? currentPackageStyle : currentPackageStyle!.content} ${typeof style === "string" ? style : style.content}`;
		}).join(" ");
	}

	const currentPackageStyle = [...getRegisteredPackagesThemeData()].find(registeredPackage => (registeredPackage as StyleDataCSP).packageName === (styles as StyleDataCSP).packageName);

	return `${typeof currentPackageStyle === "string" ? currentPackageStyle : currentPackageStyle!.content} ${typeof styles === "string" ? styles : styles.content}`;
};

export default getStylesString;
