import type { ComponentStylesData, StyleData, StyleDataCSP } from "../types.js";
import { getRegisteredComponentPackagesStyleData } from "./applyTheme.js";

const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers

const getThemeVariablesStyleString = (styles: ComponentStylesData) => {
	if (Array.isArray(styles)) {
		const usedPackages = new Set<string>();
		(styles.filter(style => !!style).flat(MAX_DEPTH_INHERITED_CLASSES) as Array<StyleData>).forEach((style: StyleData) => {
			if (typeof style !== "string") {
				usedPackages.add(style.packageName);
			}
		});

		return getRegisteredComponentPackagesStyleData()
			.filter(registeredPackage => usedPackages.has(registeredPackage.packageName))
			.map((style: StyleDataCSP) => {
				return typeof style === "string" ? style : style.content;
			})
			.join(" ");
	}

	if (typeof styles === "string") {
		return "";
	}

	return getRegisteredComponentPackagesStyleData()
		.find(registeredPackage => registeredPackage.packageName === styles.packageName)?.content || "";
};

export default getThemeVariablesStyleString;
