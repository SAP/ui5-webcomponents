import { getTheme } from "../Configuration";
import createStyleInHead from "../util/createStyleInHead";
import { attachThemeChange, getEffectiveStyle } from "../Theming";

const injectedForTags = [];
const tagsToStyleUrls = new Map();

/**
 * Creates a style element holding the CSS for a web component (and resolves CSS Custom Properties for IE)
 * @param tagName
 * @param cssText
 */
const injectWebComponentStyle = (tagName, styleUrls, cssText) => {
	if (!window.ShadyDOM) {
		return;
	}

	// Edge and IE
	if (injectedForTags.indexOf(tagName) !== -1) {
		return;
	}
	createStyleInHead(cssText, { "data-sap-source": tagName });
	injectedForTags.push(tagName);
	tagsToStyleUrls.set(tagName, styleUrls);
};

/**
 * Updates the style elements holding the CSS for all web components by resolving the CSS Custom properties
 */
const updateWebComponentStyles = async () => {
	if (!window.ShadyDOM) {
		return;
	}

	// IE and Edge
	const theme = getTheme();
	injectedForTags.forEach(async tagName => {
		const styleUrls = tagsToStyleUrls.get(tagName);
		const css = await getEffectiveStyle(theme, styleUrls, tagName);
		const originalStyleElement = document.head.querySelector(`style[data-sap-source="${tagName}"]`);
		originalStyleElement.textContent = css;
	});
};

attachThemeChange(updateWebComponentStyles);

export {
	injectWebComponentStyle,
	updateWebComponentStyles,
};
