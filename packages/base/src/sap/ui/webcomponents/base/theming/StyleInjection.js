import { getTheme } from "../Configuration";
import { attachThemeChange, getEffectiveStyle } from "../Theming";
import { getThemeProperties } from "./ThemeProperties";
import createStyleInHead from "../util/createStyleInHead";

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

		const style = createStyleInHead(cssText, {"data-sap-source": tagName});

		this.tagNamesInHead.push(tagName);
		this.tagsToStyleUrls.set(tagName, styleUrls);

		if (window.CSSVarsPolyfill) {
			await whenThemePropertiesInjected();
			window.CSSVarsPolyfill.resolveCSSVars([style]);
		}
	}

	async updateStylesInHead() {

		const theme = getTheme();

		const styles = await getThemeProperties("@ui5/webcomponents", theme);
		injectThemeProperties(styles);

		if (!window.ShadyDOM) {
			return;
		}

		this.tagNamesInHead.forEach(async tagName => {
			const styleElement = document.head.querySelector(`style[data-sap-source="${tagName}"]`);
			if (window.CSSVarsPolyfill) {
				window.CSSVarsPolyfill.resolveCSSVars([styleElement]);
			}
		});
	}
}

const injectThemeProperties = styles => {
	const styleElement = document.head.querySelector(`style[ui5-webcomponents-theme-properties]`);
	if (styleElement) {
		styleElement.innerHTML = styles || "";	// in case of undefined
		if (window.CSSVarsPolyfill) {
			window.CSSVarsPolyfill.findCSSVars([styleElement]);
		}
	} else {
		const style = createStyleInHead(styles, {"ui5-webcomponents-theme-properties": ""});

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
