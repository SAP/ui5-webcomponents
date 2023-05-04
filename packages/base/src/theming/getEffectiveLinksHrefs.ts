import { getUrl } from "../CSP.js";
import { getFeature } from "../FeaturesRegistry.js";
import type UI5Element from "../UI5Element.js";
import type OpenUI5Enablement from "../features/OpenUI5Enablement.js";
import { getRegisteredPackagesThemeData } from "./applyTheme.js";
import type { ComponentStylesData, StyleDataCSP } from "../types.js";

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

	const usedPackages = new Set<string>();
	const componentStyleLinks = [...stylesDataArray].flat(MAX_DEPTH_INHERITED_CLASSES).filter(data => !!data).map(data => {
		usedPackages.add((data as StyleDataCSP).packageName);
		return getUrl((data as StyleDataCSP).packageName, (data as StyleDataCSP).fileName);
	});

	const links = [...usedPackages].map(usedPackage => {
		const registeredPackageData = [...getRegisteredPackagesThemeData()].find(registeredPackage => (registeredPackage as StyleDataCSP).packageName === usedPackage);

		return getUrl((registeredPackageData as StyleDataCSP)?.packageName, (registeredPackageData as StyleDataCSP)?.fileName);
	});

	return [...componentStyleLinks, ...links];
};

export default getEffectiveLinksHrefs;
