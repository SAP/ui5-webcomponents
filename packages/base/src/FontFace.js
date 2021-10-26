import { hasStyle, createStyle } from "./ManagedStyles.js";
import { hasLink, createLink } from "./ManagedLinks.js";
import { shouldUseLinks, getUrl } from "./CSP.js";
import { getFeature } from "./FeaturesRegistry.js";
import fontFaceCSS from "./generated/css/FontFace.css.js";
import overrideFontFaceCSS from "./generated/css/OverrideFontFace.css.js";

const insertFontFace = () => {
	const OpenUI5Support = getFeature("OpenUI5Support");

	// Only set the main font if there is no OpenUI5 support, or there is, but OpenUI5 is not loaded
	if (!OpenUI5Support || !OpenUI5Support.isLoaded()) {
		insertMainFontFace();
	}

	// Always set the override font - OpenUI5 in CSS Vars mode does not set it, unlike the main font
	insertOverrideFontFace();
};

const insertMainFontFace = () => {
	if (shouldUseLinks()) {
		if (!hasLink("data-ui5-font-face")) {
			const href = getUrl("@ui5/webcomponents-base", "FontFace.css");
			createLink(href, "data-ui5-font-face");
		}
		return;
	}

	if (!hasStyle("data-ui5-font-face")) {
		createStyle(fontFaceCSS, "data-ui5-font-face");
	}
};

const insertOverrideFontFace = () => {
	if (shouldUseLinks()) {
		if (!hasLink("data-ui5-font-face-override")) {
			const href = getUrl("@ui5/webcomponents-base", "OverrideFontFace.css");
			createLink(href, "data-ui5-font-face-override");
		}
		return;
	}

	if (!hasStyle("data-ui5-font-face-override")) {
		createStyle(overrideFontFaceCSS, "data-ui5-font-face-override");
	}
};

export default insertFontFace;
