import { getUrl } from "../CSP.js";
import { getFeature } from "../FeaturesRegistry.js";
import type UI5Element from "../UI5Element.js";
import type OpenUI5Enablement from "../features/OpenUI5Enablement.js";
import { ComponentStylesData, StyleDataCSP } from "../types.js";

const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers

const getEffectiveLinksHrefs = (ElementClass: typeof UI5Element, forStaticArea = false) => {
	const stylesData: ComponentStylesData = ElementClass[forStaticArea ? "staticAreaStyles" : "styles"];

	if (!stylesData) {
		return;
	}

	const stylesDataArray: ComponentStylesData = Array.isArray(stylesData) ? stylesData : [stylesData];

	const openUI5Enablement = getFeature<typeof OpenUI5Enablement>("OpenUI5Enablement");
	if (openUI5Enablement) {
		stylesDataArray.push(openUI5Enablement.getBusyIndicatorStyles());
	}

	return stylesDataArray.flat(MAX_DEPTH_INHERITED_CLASSES).filter(data => !!data).map(data => getUrl((data as StyleDataCSP).packageName, (data as StyleDataCSP).fileName));
};

export default getEffectiveLinksHrefs;
