import { getCustomCSS, attachCustomCSSChange } from "./CustomStyle.js";
import getStylesString from "./getStylesString.js";
import { getFeature } from "../FeaturesRegistry.js";
import type UI5Element from "../UI5Element.js";
import OpenUI5Enablement from "../features/OpenUI5Enablement.js";

const effectiveStyleMap = new Map<string, string>();

attachCustomCSSChange((tag: string) => {
	effectiveStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});

const getEffectiveStyle = (ElementClass: typeof UI5Element, forStaticArea = false) => {
	const tag = ElementClass.getMetadata().getTag();
	const key = `${tag}_${forStaticArea ? "static" : "normal"}`;
	const openUI5Enablement = getFeature<typeof OpenUI5Enablement>("OpenUI5Enablement");

	if (!effectiveStyleMap.has(key)) {
		let effectiveStyle;
		let busyIndicatorStyles = "";

		if (openUI5Enablement) {
			busyIndicatorStyles = getStylesString(openUI5Enablement.getBusyIndicatorStyles());
		}

		if (forStaticArea) {
			effectiveStyle = getStylesString(ElementClass.staticAreaStyles);
		} else {
			const customStyle = getCustomCSS(tag) || "";
			const builtInStyles = getStylesString(ElementClass.styles);
			effectiveStyle = `${builtInStyles} ${customStyle}`;
		}

		effectiveStyle = `${effectiveStyle} ${busyIndicatorStyles}`;
		effectiveStyleMap.set(key, effectiveStyle);
	}

	return effectiveStyleMap.get(key)!; // The key is guaranteed to exist
};

export default getEffectiveStyle;
