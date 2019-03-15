import { getTheme, getRTL, getCompactSize } from "../Configuration";

import { injectWebComponentStyle } from "../theming/StyleInjection";
import { registerStyle } from "../theming/ThemeBundle";

import setupBrowser from "../util/setupBrowser";
import setupOS from "../util/setupOS";
import setupSystem from "../util/setupSystem";
import { getEffectiveStyle } from "../Theming";

// shadow DOM templates per tag
const shadowDOMTemplates = new Map();

/**
 * Prepares the shadow DOM for a custom element, depending on the usage of the polyfill
 */
class ShadowDOM {
	constructor() {
		throw new Error("Static class");
	}

	static registerStyle(theme, styleName, styleContent) {
		registerStyle(theme, styleName, styleContent);
	}

	static async updateStyle(tag, shadowRoot, styleUrls) {
		const theme = getTheme();
		const newStyle = await getEffectiveStyle(theme, styleUrls, tag);

		shadowRoot.querySelector("style").textContent = newStyle;
	}

	static async prepareShadowDOM(ElementClass) {
		const theme = getTheme();
		const styleUrls = ElementClass.getMetadata().getStyleUrl();
		const tag = ElementClass.getMetadata().getTag();
		const isRTL = getRTL();
		const isCompact = getCompactSize();

		let shadowDOM,
			rootSpan;

		if (window.ShadyDOM) {
			// inject the styles in the <head>
			const cssContent = await getEffectiveStyle(theme, styleUrls, tag);
			injectWebComponentStyle(tag, cssContent);

			// Create the shadow DOM root span
			rootSpan = document.createElement("span");
			rootSpan.setAttribute("data-sap-ui-wc-root", "");
			shadowDOM = rootSpan;
		} else {
			let template = this._getTemplateFor(theme, tag);

			if (!template) {
				const cssText = await getEffectiveStyle(theme, styleUrls, tag);
				template = this._createTemplateFor(theme, tag, cssText);
			}
			shadowDOM = template.content.cloneNode(true);

			rootSpan = shadowDOM.querySelector("span[data-sap-ui-wc-root]");
		}

		setupBrowser(rootSpan);
		setupOS(rootSpan);
		setupSystem(rootSpan);

		if (isCompact) {
			rootSpan.classList.add("sapUiSizeCompact");
		}

		if (isRTL) {
			rootSpan.setAttribute("dir", "rtl");
		}

		return shadowDOM;
	}

	static _getTemplateFor(theme, tag) {
		const themeMap = shadowDOMTemplates.get(theme);
		return themeMap && themeMap.get(tag);
	}

	static _createTemplateFor(theme, tag, css) {
		let themeMap = shadowDOMTemplates.get(theme);
		if (!themeMap) {
			themeMap = new Map();
			shadowDOMTemplates.set(theme, themeMap);
		}
		const template = document.createElement("template");

		// Create a local <style> tag for the real shadow DOM
		const style = document.createElement("style");
		style.innerHTML = css;
		template.content.appendChild(style);

		// Create a root span
		const root = document.createElement("span");
		root.setAttribute("data-sap-ui-wc-root", "");

		template.content.appendChild(root);

		themeMap.set(tag, template);
		return template;
	}
}

export default ShadowDOM;
