import { getTheme } from "../Configuration";
import { attachThemeChange, getEffectiveStyle } from "../Theming";

let themePropertiesReadyResolver;
const themePropertiesReadyPromise = new Promise(resolve => {
	themePropertiesReadyResolver = resolve;
});

class StyleInjection {
	constructor() {
		this.tagNamesInHead = [];
		this.tagsToStyleUrls = new Map();
		attachThemeChange(this.updateStylesInHead.bind(this));
	}

	async createStyleTag(tagName, styleUrls, cssText) {
		if (this.tagNamesInHead.indexOf(tagName) !== -1) {
			return;
		}

		const style = document.createElement("style");
		style.type = "text/css";
		style.setAttribute("data-sap-source", tagName);
		style.innerHTML = cssText;
		document.head.appendChild(style);

		this.tagNamesInHead.push(tagName);
		this.tagsToStyleUrls.set(tagName, styleUrls);

		if (window.CSSVarsPolyfill) {
			await whenThemePropertiesInjected();
			window.CSSVarsPolyfill.resolveCSSVars([style]);
		}
	}

	async updateStylesInHead() {
		if (!window.ShadyDOM) {
			return;
		}

		const theme = getTheme();
		this.tagNamesInHead.forEach(async tagName => {
			const styleUrls = this.tagsToStyleUrls.get(tagName);
			const css = await getEffectiveStyle(theme, styleUrls, tagName);

			const styleElement = document.head.querySelector(`style[data-sap-source="${tagName}"]`);

			if (styleElement) {
				styleElement.innerHTML = css || "";	// in case of undefined
			} else {
				this.createStyleTag(tagName, styleUrls, css || "");
			}
		});
	}
}

const injectThemeProperties = styles => {
	const styleElement = document.head.querySelector(`style[ui5-webcomponents-theme-properties]`);

	if (styleElement) {
		styleElement.innerHTML = styles || "";	// in case of undefined
	} else {
		const style = document.createElement("style");
		style.type = "text/css";
		style.setAttribute("ui5-webcomponents-theme-properties", "");
		style.innerHTML = styles;
		document.head.appendChild(style);

		if (window.CSSVarsPolyfill) {
			window.CSSVarsPolyfill.findCSSVars([style]);
			themePropertiesReadyResolver();
		}
	}
};

const whenThemePropertiesInjected = () => {
	return themePropertiesReadyPromise;
};

export { injectThemeProperties };
export default new StyleInjection();
