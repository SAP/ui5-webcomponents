import { ponyfillNeeded, runPonyfill } from "./CSSVarsPonyfill.js";


const updateThemePropertiesLinkTag = path => {
	// Needed for all browsers
	const linkElement = document.querySelector(path);
	if (linkElement) {
		linkElement.setAttribute("data-ui5-theme-properties", "@ui5/webcomponents-theme-base");
	}

	// When changing the theme, run the ponyfill immediately
	if (ponyfillNeeded()) {
		runPonyfill();
	}
};

export default updateThemePropertiesLinkTag;
