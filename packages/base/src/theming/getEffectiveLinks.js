import { getUrl } from "../CSP.js";

const flatten = arr => {
	return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
};

const getEffectiveLinks = (ElementClass, forStaticArea = false) => {
	const linksObj = ElementClass[forStaticArea ? "staticAreaLinks" : "links"];
	if (typeof linksObj !== "object") {
		return;
	}

	const result = [];
	for (const packageName in linksObj) {// eslint-disable-line
		if (linksObj.hasOwnProperty(packageName)) { // eslint-disable-line
			const value = linksObj[packageName];
			const links = typeof value === "string" ? [value] : flatten(value);
			links.filter(link => !!link).forEach(link => {
				const url = getUrl(packageName, link);
				result.push(url);
			});
		}
	}

	return result;
};

export default getEffectiveLinks;
