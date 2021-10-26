import { hasStyle, createStyle } from "./ManagedStyles.js";
import { hasLink, createLink } from "./ManagedLinks.js";
import { shouldUseLinks, getUrl } from "./CSP.js";
import systemCSSVars from "./generated/css/SystemCSSVars.css.js";

const insertSystemCSSVars = () => {
	if (shouldUseLinks()) {
		if (!hasLink("data-ui5-system-css-vars")) {
			const href = getUrl("@ui5/webcomponents-base", "SystemCSSVars.css");
			createLink(href, "data-ui5-system-css-vars");
		}
		return;
	}

	if (!hasStyle("data-ui5-system-css-vars")) {
		createStyle(systemCSSVars, "data-ui5-system-css-vars");
	}
};

export default insertSystemCSSVars;
