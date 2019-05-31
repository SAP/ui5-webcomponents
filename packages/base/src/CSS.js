import { getTheme } from "./Configuration.js";
import { getEffectiveStyle } from "./Theming.js";

const styleMap = new Map();

const createStyleElement = css => {
	// Create a local <style> tag for the real shadow DOM
	const style = document.createElement("style");
	style.innerHTML = css;
	return style;
};

const createConstructableStyleSheet = css => {
	const elementStyleSheet = new CSSStyleSheet();
	elementStyleSheet.replaceSync(css);
	return elementStyleSheet;
};

const _createStyle = (tagName, styleContent) => {
	const theme = getTheme();
	const key = theme + tagName;
	if (styleMap.has(key)) {
		return styleMap.get(key);
	}

	let style;
	if (document.adoptedStyleSheets) {
		style = createConstructableStyleSheet(styleContent);
	} else {
		style = createStyleElement(styleContent);
	}

	styleMap.set(key, style);
	return style;
};

const createStyle = ElementClass => {
	const tagName = ElementClass.getMetadata().getTag();
	const styleContent = getEffectiveStyle(ElementClass);
	return _createStyle(tagName, styleContent);
};

// eslint-disable-next-line
export { createStyle };
