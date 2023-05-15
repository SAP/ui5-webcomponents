import getEffectiveStyle from "./getEffectiveStyle.js";
import { attachCustomCSSChange } from "./CustomStyle.js";
import UI5Element from "../UI5Element.js";
import { attachThemeLoaded } from "./ThemeLoaded.js";
import getEffectiveThemeVariables from "./getEffectiveThemeVariables.js";

const constructableStyleMap = new Map<string, Array<CSSStyleSheet>>();
const themeConstructableStyleMap = new Map<string, Array<CSSStyleSheet>>();

attachCustomCSSChange((tag: string) => {
	constructableStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});

attachThemeLoaded(() => {
	themeConstructableStyleMap.clear();
});

/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */
const getConstructableStyle = (ElementClass: typeof UI5Element, forStaticArea = false): Array<CSSStyleSheet> => {
	const tag = ElementClass.getMetadata().getTag();
	const key = `${tag}_${forStaticArea ? "static" : "normal"}`;

	if (!constructableStyleMap.has(key)) {
		const styleContent = getEffectiveStyle(ElementClass, forStaticArea);
		const style = new CSSStyleSheet();
		style.replaceSync(styleContent);
		constructableStyleMap.set(key, [style]);
	}

	if (!themeConstructableStyleMap.has(key)) {
		const styleContent = getEffectiveThemeVariables(ElementClass, forStaticArea);
		const style = new CSSStyleSheet();
		(style as Record<string, any>)._ui5StyleId = "data-ui5-component-theme-variables"; // set an id so that we can find the style later
		style.replaceSync(styleContent);
		themeConstructableStyleMap.set(key, [style]);
	}

	return [...constructableStyleMap.get(key)!, ...themeConstructableStyleMap.get(key)!];
};

export default getConstructableStyle;
