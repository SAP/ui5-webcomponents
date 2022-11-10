import { getUrl } from "../CSP.js";
import { getFeature } from "../FeaturesRegistry.js";
import UI5Element from "../UI5Element.js";
import type OpenUI5Enablement from "../features/OpenUI5Enablement.js";
import { StyleData, StyleDataInfo } from "../index.js";

const getEffectiveLinksHrefs = (ElementClass: typeof UI5Element, forStaticArea = false) => {
	const stylesData: StyleData | Array<StyleData> = ElementClass[forStaticArea ? "staticAreaStyles" : "styles"];
	const stylesDataArray: Array<StyleData> = Array.isArray(stylesData) ? stylesData : [stylesData];

	if (!stylesData) {
		return;
	}

	const openUI5Enablement = getFeature<typeof OpenUI5Enablement>("OpenUI5Enablement");

	if (openUI5Enablement) {
		stylesDataArray.push(openUI5Enablement.getBusyIndicatorStyles());
	}

	return stylesDataArray.flat().filter(data => !!data).map(data => getUrl((data as StyleDataInfo).packageName, (data as StyleDataInfo).fileName));
};

export default getEffectiveLinksHrefs;
