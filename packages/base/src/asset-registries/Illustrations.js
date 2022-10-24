import getSharedResource from "../getSharedResource.js";

const loaders = new Map();
const registry = getSharedResource("SVGIllustration.registry", new Map());
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

const _loadIllustrationCollectionOnce = async illustrationName => {
	let temp;
	if (illustrationName.startsWith("Tnt")) {
		illustrationName = illustrationName.substring(3);
		temp = `Tnt${illustrationName}`;
	} else {
		temp = illustrationName;
	}
	if (!loaders.has(illustrationName.replace("Tnt", ""))) {
		throw new Error(`No loader registered for the ${illustrationName} illustration. You probably forgot to import the "AllIllustrations.js".`);
	}
	const loadIllustrations = loaders.get(illustrationName);
	return loadIllustrations(temp);
};

const _parseName = name => {
	const illustrationName = name;
	return {
		illustrationName,
	};
};

const getIllustrationDataSync = nameProp => {
	let set = "fiori";

	if (nameProp.startsWith("Tnt")) {
		set = "tnt";
		nameProp = nameProp.replace(/^Tnt/, "");
	}
	return registry.get(`${set}/${nameProp}`);
};

const getIllustrationData = async nameProp => {
	const { illustrationName } = _parseName(nameProp);
	await _loadIllustrationCollectionOnce(illustrationName);
	return registry.get(`${illustrationName}`) || ILLUSTRATION_NOT_FOUND;
};

// test page usage only
const _getRegisteredNames = async () => {
	await _loadIllustrationCollectionOnce("UnableToLoad");
	return [...registry.keys()];
};

export {
	getIllustrationDataSync,
	registerIllustration,
	registerIllustrationLoader,
	getIllustrationData,
	_getRegisteredNames,
};
