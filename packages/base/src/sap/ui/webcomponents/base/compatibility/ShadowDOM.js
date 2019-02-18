import WCPolyfill from '../thirdparty/webcomponents-polyfill';
import configuration from "../Configuration";
import { fetchThemeBundle } from "../ThemeBundle";
import setupBrowser from '../util/setupBrowser';
import setupOS from '../util/setupOS';
import setupSystem from '../util/setupSystem';

// Shorthands
const d = document;

// shadow DOM templates per tag
const shadowDOMTemplates = new Map();

const styles = new Map();

const customCSSMap = new Map();

const styleTagsInHead = [];
const customStyleTagsInHead = [];

/**
 * Prepares the shadow DOM for a custom element, depending on the usage of the polyfill
 */
class ShadowDOM {
	constructor() {
		throw new Error("Static class");
	}
	
	static registerStyle(theme, styleName, styleObj) {
		if (typeof(styleObj) === "object" && styleObj._) {
			if (!styles.has(theme)) {
				styles.set(theme, {});
			}
			styles.get(theme)[styleName] = styleObj._;
		}
	}

	static async updateStyle(tag, shadowRoot, stylesUrls) {
		const theme = configuration.getTheme();
		const cssResults = await this._fetchStyleUrls(theme, stylesUrls);
		const customCSS = ShadowDOM._getCustomCSS(theme, tag);
		const newStyle = cssResults.join(" ").concat(customCSS);

		shadowRoot.querySelector("style").textContent = newStyle;
	}

	static prepareShadowDOM(ElementClass) {
		const theme = configuration.getTheme();
		const stylesUrls = ElementClass.getMetadata().getStyleUrl();
		const tag = ElementClass.getMetadata().getTag();
		const cssFetchedPromise = ShadowDOM._fetchStyleUrls(theme, stylesUrls);
		const isRTL = configuration.getRTL();
		const isCompact = configuration.getCompactSize();


		return cssFetchedPromise.then(cssResults => {
			let shadowDOM, rootSpan;
			if (window.ShadyDOM) {
				// Create styles in the <head> for each css file
				cssResults.forEach((css, i) => {
					ShadowDOM._createStyleTag(styleTagsInHead, stylesUrls[i], css);
				});

				// Create styles in the <head> for added custom CSS
				if (ShadowDOM._hasCustomCSSForTheme(theme)) {
					const customStyleTagInfo = this._getCustomStyleTagInfo(theme);

					customStyleTagInfo.forEach((styleTagInfo) => {
						ShadowDOM._createStyleTag(customStyleTagsInHead, styleTagInfo.id, styleTagInfo.css);
					});
				}

				// Create the shadow DOM root span
				rootSpan = d.createElement("span");
				rootSpan.setAttribute("data-sap-ui-wc-root", "");
				shadowDOM = rootSpan;
			} else {
				let template = this._getTemplateFor(theme, tag);

				if (!template) {
					const tagCustomCSS = this._getCustomCSS(theme, tag);
					const cssText = cssResults.join(" ").concat(tagCustomCSS);
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
		});
	}

	static _addCustomCSS(tag, theme, css) {
		let themeCustomCSS = customCSSMap.get(theme);

		if (!themeCustomCSS) {
			customCSSMap.set(theme, {});
			themeCustomCSS = customCSSMap.get(theme);
		}

		if (!themeCustomCSS[tag]) {
			themeCustomCSS[tag] = [];
		}

		themeCustomCSS[tag].push(css);
	}

	static _getCustomCSS(theme, tag) {
		const themeCustomCSS = customCSSMap.get(theme);
		return themeCustomCSS && themeCustomCSS[tag] ? themeCustomCSS[tag].join("") : "";
	}

	static async _applyTheme() {
		if (!window.ShadyDOM) {
			return;
		}

		const theme = configuration.getTheme();
		const cssResults = await ShadowDOM._fetchStyleUrls(theme, styleTagsInHead);

		// Update style tags
		cssResults.forEach((css, i) => {
			const style = document.head.querySelector('style[data-sap-source="' + styleTagsInHead[i] + '"]');
			style.innerHTML = css;
		});

		// Update custom style tags
		if (ShadowDOM._hasCustomCSSForTheme(theme)) {
			ShadowDOM._applyCustomStyleTags(theme); // Update custom style tags (if exist) or create new ones
		} else {
			ShadowDOM._cleanCustomStyleTags(); // Clean previously added custom style tags
		}
	}

	static _applyCustomStyleTags(theme) {
		const customStyleTagInfo = this._getCustomStyleTagInfo(theme);

		customStyleTagInfo.forEach(styleTagInfo => {
			const style = this._getStyleTag(styleTagInfo.id);

			if (style) {
				style.innerHTML = styleTagInfo.css;
			} else {
				this._createStyleTag(customStyleTagsInHead, styleTagInfo.id, styleTagInfo.css);
			}
		});
	}

	static _cleanCustomStyleTags () {

		customStyleTagsInHead.forEach(styleTagId => {
			const style = this._getStyleTag(styleTagId);

			if (style) {
				style.innerHTML = "";
			}
		})
	}

	static _getCustomStyleTagInfo(theme) {
		return Object.keys(customCSSMap.get(theme)).map(tag => {
			const customCSSInfo = {};
			customCSSInfo.id = tag + "--custom--css";
			customCSSInfo.css = ShadowDOM._getCustomCSS(theme, tag);
			return customCSSInfo;
		});
	}

	static _hasCustomCSSForTheme(theme) {
		return !!customCSSMap.get(theme);
	}

	static _getStyleTag(tagId) {
		return document.head.querySelector('style[data-sap-source="' + tagId + '"]');
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
		const template = d.createElement("template");

		// Create a local <style> tag for the real shadow DOM
		let style = d.createElement("style");
		style.innerHTML = css;
		template.content.appendChild(style);

		// Create a root span
		let root = d.createElement("span");
		root.setAttribute("data-sap-ui-wc-root", "");

		template.content.appendChild(root);

		themeMap.set(tag, template);
		return template;
	}

	static _fetchStyleUrls(theme, urls) {
		const requests = urls.map(styleName => {
			return ShadowDOM._fetchStyleUrl(theme, styleName);
		});
		return Promise.all(requests);
	}

	static async _fetchStyleUrl(theme, styleName) {
		if (!styles.has(theme)) {
			styles.set(theme, {});
		}

		const themeMap = styles.get(theme);

		if (themeMap[styleName]) {
			return themeMap[styleName];
		}

		// requested style not present
		const themeData = await ShadowDOM.fetchTheme(theme);

		Object.keys(themeData).forEach(key => {
			themeMap[key] = themeData[key];
		});

		return themeMap[styleName];
	}

	static async fetchTheme(theme) {
		return fetchThemeBundle("@ui5/webcomponents", theme);
	}

	static _createStyleTag(styleTags, url, cssText) {
		if (styleTags.indexOf(url) !== -1) {
			return;
		}

		const style = d.createElement("style");
		style.type = "text/css";
		style.setAttribute("data-sap-source", url);
		style.innerHTML = cssText;
		d.head.appendChild(style);

		styleTags.push(url);
	}
}

export default ShadowDOM;
