import getSharedResource from "../getSharedResource.js";

const loaders = new Map();
const registry = getSharedResource("SVGIllustration.registry", new Map());
const illustrationPromises = getSharedResource("SVGIllustration.promises", new Map());
const ILLUSTRATION_NOT_FOUND = "ILLUSTRATION_NOT_FOUND";

const registerIllustration = (name, { dialogSvg, sceneSvg, spotSvg, set, title, subtitle } = {}) => { // eslint-disable-line
	registry.set(`${set}/${name}`, {
		dialogSvg,
		sceneSvg,
		spotSvg,
		title,
		subtitle,
	});
};

const registerIllustrationLoader = async (illustrationName, loader) => {
	loaders.set(illustrationName, loader);
};

const _loadIllustrationOnce = async illustrationName => {
	if (!illustrationPromises.has(illustrationName)) {
		if (!loaders.has(illustrationName)) {
			throw new Error(`No loader registered for the ${illustrationName} illustrations collection. Probably you forgot to import the "AllIllustrations.js" module for the respective package.`);
		}
		const loadIllustrations = loaders.get(illustrationName);
		illustrationPromises.set(illustrationName, loadIllustrations(illustrationName));
	}
	return illustrationPromises.get(illustrationName);
};

const getIllustrationDataSync = nameProp => {
	let set = "fiori";

	if (nameProp.startsWith("Tnt")) {
		set = "tnt";
		nameProp = nameProp.replace(/^Tnt/, "");
	}
	return registry.get(`${set}/${nameProp}`);
};

const getIllustrationData = async illustrationName => {
	await _loadIllustrationOnce(illustrationName);
	return registry.get(`${illustrationName}`) || ILLUSTRATION_NOT_FOUND;
};

export {
	getIllustrationDataSync,
	registerIllustration,
	registerIllustrationLoader,
	getIllustrationData,
};
