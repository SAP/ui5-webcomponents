import { getUrl } from "../CSP.js";

const flatten = arr => {
	return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
};

const getEffectiveLinks = (ElementClass, forStaticArea = false) => {
	let styles = ElementClass[forStaticArea ? "staticAreaStyles" : "styles"];
	if (!styles) {
		return;
	}

	if (!Array.isArray(styles)) {
		styles = [styles];
	}

	return flatten(styles).filter(style => !!style).map(data => getUrl(data.packageName, data.fileName));
};

export default getEffectiveLinks;
