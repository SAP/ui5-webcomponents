import type UI5Element from "../UI5Element.js";
import { attachThemeLoaded } from "./ThemeLoaded.js";
import getThemeStylesString from "./getThemeStylesString.js";

const themeEffectiveStyleMap = new Map<string, string>();

attachThemeLoaded(() => {
	themeEffectiveStyleMap.clear();
});

const getEffectiveStyle = (ElementClass: typeof UI5Element, forStaticArea = false): string => {
	const tag = ElementClass.getMetadata().getTag();
	const key = `${tag}_${forStaticArea ? "static" : "normal"}`;

	if (!themeEffectiveStyleMap.has(key)) {
		const effectiveStyle = forStaticArea ? getThemeStylesString(ElementClass.staticAreaStyles) : getThemeStylesString(ElementClass.styles);

		themeEffectiveStyleMap.set(key, effectiveStyle);
	}

	return themeEffectiveStyleMap.get(key)!; // The keys is guaranteed to exist
};

export default getEffectiveStyle;
