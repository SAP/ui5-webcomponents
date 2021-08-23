import getSharedResource from "../getSharedResource.js";

const registry = getSharedResource("SVGIllustration.registry", new Map());
const ILLUSTRATION_NOT_FOUND = "ILLUSTRATION_NOT_FOUND";

const registerIllustration = (name, { dialogSvg, sceneSvg, spotSvg, title, subtitle } = {}) => { // eslint-disable-line
	registry.set(name, {
		dialogSvg,
		sceneSvg,
		spotSvg,
		title,
		subtitle,
	});
};

const getIllustrationDataSync = nameProp => {
	return registry.get(nameProp) || ILLUSTRATION_NOT_FOUND;
};

export {
	getIllustrationDataSync,
	registerIllustration,
};
