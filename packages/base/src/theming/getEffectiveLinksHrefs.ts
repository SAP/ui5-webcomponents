import { getUrl } from "../CSP.js";
import { getFeature } from "../FeaturesRegistry.js";
import type UI5Element from "../UI5Element.js";
import type OpenUI5Enablement from "../features/OpenUI5Enablement.js";
import { getRegisteredComponentPackagesStyleData } from "./applyTheme.js";
import type { ComponentStylesData, StyleDataCSP } from "../types.js";

const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers

const findCurrentPackageStyles = (stylesDataArray: Array<ComponentStylesData>) => {
	return stylesDataArray.map(styleData => {
		const registeredPackage = [...getRegisteredComponentPackagesStyleData()]
			.find(registeredPackageData => (registeredPackageData as StyleDataCSP).packageName === (styleData as StyleDataCSP).packageName);

		if (!registeredPackage) {
			return "";
		}

		return getUrl((registeredPackage as StyleDataCSP)?.packageName, (registeredPackage as StyleDataCSP)?.fileName);
	}).filter((link, index, array) => array.indexOf(link) === index);
};

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

	const componentStyleLinks = stylesDataArray.flat(MAX_DEPTH_INHERITED_CLASSES)
		.filter(data => !!data)
		.map(data => getUrl((data as StyleDataCSP).packageName, (data as StyleDataCSP).fileName));
	const themePropertiesLinks = findCurrentPackageStyles(stylesDataArray);

	return [...componentStyleLinks, ...themePropertiesLinks];
};

export default getEffectiveLinksHrefs;
