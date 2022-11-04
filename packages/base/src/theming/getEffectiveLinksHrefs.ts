import { getUrl } from "../CSP.js";
import { getFeature } from "../FeaturesRegistry.js";
import UI5Element from "../UI5Element";
import type OpenUI5Enablement from "../features/OpenUI5Enablement.js";

const flatten = (arr: Array<any>): Array<any> => {
	return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
};

const getEffectiveLinksHrefs = (ElementClass: typeof UI5Element, forStaticArea = false) => {
	let stylesData = ElementClass[forStaticArea ? "staticAreaStyles" : "styles"];
	const openUI5Enablement = getFeature<typeof OpenUI5Enablement>("OpenUI5Enablement");

	if (!stylesData) {
		return;
	}

	if (!Array.isArray(stylesData)) {
		stylesData = [stylesData];
	}

	if (openUI5Enablement) {
		stylesData.push(openUI5Enablement.getBusyIndicatorStyles());
	}

	return flatten(stylesData).filter(data => !!data).map(data => getUrl(data.packageName, data.fileName));
};

export default getEffectiveLinksHrefs;
