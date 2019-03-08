import { getTheme } from "../Configuration";
import { attachThemeChange, getEffectiveStyle } from "../Theming";
import { getThemeProperties } from "./ThemeProperties";
import createStyleInHead from "../util/createStyleInHead";

let themePropertiesReadyResolver;
const themePropertiesReadyPromise = new Promise(resolve => {
	themePropertiesReadyResolver = resolve;
});

const tagNamesInHead = [];





const createStyleTag = async (tagName, styleUrls, cssText) => {
	if (tagNamesInHead.indexOf(tagName) !== -1) {
		return;
	}

	const style = createStyleInHead(cssText, {"data-sap-source": tagName});

	tagNamesInHead.push(tagName);

	if (window.CSSVarsPolyfill) {
		await whenThemePropertiesInjected();
		window.CSSVarsPolyfill.resolveCSSVars([style]);
	}
};

const updateStylesInHead = async () => {

	const theme = getTheme();

	const styles = await getThemeProperties("@ui5/webcomponents", theme);
	injectThemeProperties(styles);

	if (!window.ShadyDOM) {
		return;
	}

	tagNamesInHead.forEach(async tagName => {
		const styleElement = document.head.querySelector(`style[data-sap-source="${tagName}"]`);
		if (window.CSSVarsPolyfill) {
			window.CSSVarsPolyfill.resolveCSSVars([styleElement]);
		}
	});
};

const injectThemeProperties = cssText => {
	const styleElement = document.head.querySelector(`style[ui5-webcomponents-theme-properties]`);
	if (styleElement) {
		styleElement.innerHTML = cssText || "";	// in case of undefined
		if (window.CSSVarsPolyfill) {
			window.CSSVarsPolyfill.findCSSVars([styleElement]);
		}
	} else {
		const style = createStyleInHead(cssText, {"ui5-webcomponents-theme-properties": ""});

		if (window.CSSVarsPolyfill) {
			window.CSSVarsPolyfill.findCSSVars([style]);
			themePropertiesReadyResolver();
		}
	}
};

const whenThemePropertiesInjected = () => {
	return themePropertiesReadyPromise;
};

export {
	createStyleTag,
	updateStylesInHead,
	injectThemeProperties
};
