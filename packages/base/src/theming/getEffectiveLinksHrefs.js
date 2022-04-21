import { getUrl } from "../CSP.js";
import { getFeature } from "../FeaturesRegistry.js";

const flatten = arr => {
	return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
};

const getEffectiveLinksHrefs = (ElementClass, forStaticArea = false) => {
	let stylesData = ElementClass[forStaticArea ? "staticAreaStyles" : "styles"];
	const OpenUI5Enablement = getFeature("OpenUI5Enablement");

	if (!stylesData) {
		return;
	}

	if (!Array.isArray(stylesData)) {
		stylesData = [stylesData];
	}

	if (OpenUI5Enablement) {
		stylesData.push(OpenUI5Enablement.getBusyIndicatorStyles());
	}

	return flatten(stylesData).filter(data => !!data).map(data => getUrl(data.packageName, data.fileName));
};

export default getEffectiveLinksHrefs;
