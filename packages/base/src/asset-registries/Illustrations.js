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

const registerIllustrationLoader = async (collectionName, loader) => {
	loaders.set(collectionName, loader);
};

const _loadIllustrationCollectionOnce = async collectionName => {
	if (!loaders.has(collectionName)) {
		throw new Error(`No loader registered for the ${collectionName} illustrations collection. Probably you forgot to import the "AllIllustrations.js" module for the respective package.`);
	}
	const loadIllustrations = loaders.get(collectionName);
	return loadIllustrations(collectionName);
};

const _fillRegistry = bundleData => {
	Object.keys(bundleData.data).forEach(illustrationName => {
		const illustrationData = bundleData.data[illustrationName];

		registerIllustration(illustrationName, {
			dialogSvg: illustrationData.dialogSvg,
			sceneSvg: illustrationData.sceneSvg,
			spotSvg: illustrationData.spotSvg,
			set: bundleData.set,
			title: illustrationData.title,
			subtitle: illustrationData.subtitle,
		});
	});
};

const _parseName = name => {
	const [set, illustrationName] = name.split("/");
	return {
		set,
		illustrationName,
	};
};

const getIllustrationDataSync = nameProp => {
	let set = "fiori";

	if (nameProp.startsWith("Tnt")) {
		set = "tnt";
		nameProp = nameProp.replace(/^Tnt/, "");
	}

	return registry.get(`${set}/${nameProp}`) || ILLUSTRATION_NOT_FOUND;
};

const getIllustrationData = async nameProp => {
	const { set, illustrationName } = _parseName(nameProp);

	if (set === "fiori") {
		await _loadIllustrationCollectionOnce("fiori");
	} else if (set === "tnt") {
		await _loadIllustrationCollectionOnce("tnt");
	} else {
		throw new Error(`No loader registered for the ${set} illustrations collection. Probably you forgot to import the "AllIllustrations.js" module for the respective package.`);
	} // eslint-disable-line

	if(!registry.has(`${set}/${illustrationName}`)) {
		_fillRegistry({
			set,
			data: {
				[illustrationName]: {
					dialogSvg: "",
					sceneSvg: "",
					spotSvg: "",
					title: "",
					subtitle: "",
				},
			},
		})
	}

	return registry.get(`${set}/${illustrationName}`) || ILLUSTRATION_NOT_FOUND;
};

// test page usage only
const _getRegisteredNames = async () => {

	// Load all illustrations
	await _loadIllustrationCollectionOnce("fiori");
	await _loadIllustrationCollectionOnce("tnt");
	
	return [...registry.keys()];
}

export {
	getIllustrationDataSync,
	registerIllustration,
	registerIllustrationLoader,
	getIllustrationData,
	_getRegisteredNames,
};
