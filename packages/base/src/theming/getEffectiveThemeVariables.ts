import type UI5Element from "../UI5Element.js";
import { attachThemeLoaded } from "./ThemeLoaded.js";
import getThemeVariablesStyleString from "./getThemeVariablesStyleString.js";

const themeEffectiveStyleMap = new Map<string, string>();

attachThemeLoaded(() => {
	themeEffectiveStyleMap.clear();
});

const getEffectiveThemeVariables = (ElementClass: typeof UI5Element, forStaticArea = false): string => {
	const tag = ElementClass.getMetadata().getTag();
	const key = `${tag}_${forStaticArea ? "static" : "normal"}`;

	if (!themeEffectiveStyleMap.has(key)) {
		const effectiveStyle = forStaticArea ? getThemeVariablesStyleString(ElementClass.staticAreaStyles) : getThemeVariablesStyleString(ElementClass.styles);

		themeEffectiveStyleMap.set(key, effectiveStyle);
	}

	return themeEffectiveStyleMap.get(key)!; // The keys is guaranteed to exist
};

export default getEffectiveThemeVariables;
