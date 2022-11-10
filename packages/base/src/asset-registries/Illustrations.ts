import getSharedResource from "../getSharedResource.js";

type IllustrationLoader = (illustrationName: string) => Promise<IllustrationData>;

type IllustrationData = {
	set?: string,
	dialogSvg: string,
	sceneSvg: string,
	spotSvg: string,
	title: string,
	subtitle: string,
};

const loaders = new Map<string, IllustrationLoader>();
const registry = getSharedResource<Map<string, IllustrationData>>("SVGIllustration.registry", new Map());
const illustrationPromises = getSharedResource<Map<string, Promise<IllustrationData>>>("SVGIllustration.promises", new Map());
const ILLUSTRATION_NOT_FOUND = "ILLUSTRATION_NOT_FOUND";

const registerIllustration = (name: string, data: IllustrationData) => {
	registry.set(`${data.set}/${name}`, {
		dialogSvg: data.dialogSvg,
		sceneSvg: data.sceneSvg,
		spotSvg: data.spotSvg,
		title: data.title,
		subtitle: data.subtitle,
	});
};

const registerIllustrationLoader = (illustrationName: string, loader: IllustrationLoader) => {
	loaders.set(illustrationName, loader);
};

const _loadIllustrationOnce = async (illustrationName: string) => {
	if (!illustrationPromises.has(illustrationName)) {
		if (!loaders.has(illustrationName)) {
			throw new Error(`No loader registered for the ${illustrationName} illustration. Probably you forgot to import the "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js" module.`);
		}
		const loadIllustrations = loaders.get(illustrationName)!;
		illustrationPromises.set(illustrationName, loadIllustrations(illustrationName));
	}
	return illustrationPromises.get(illustrationName);
};

const getIllustrationDataSync = (illustrationName: string) => {
	let set = "fiori";

	if (illustrationName.startsWith("Tnt")) {
		set = "tnt";
		illustrationName = illustrationName.replace(/^Tnt/, "");
	}
	return registry.get(`${set}/${illustrationName}`);
};

const getIllustrationData = async (illustrationName: string) => {
	let set = "fiori";

	await _loadIllustrationOnce(illustrationName);
	if (illustrationName.startsWith("Tnt")) {
		set = "tnt";
		illustrationName = illustrationName.replace(/^Tnt/, "");
	}
	return registry.get(`${set}/${illustrationName}`) || ILLUSTRATION_NOT_FOUND;
};

export {
	getIllustrationDataSync,
	registerIllustration,
	registerIllustrationLoader,
	getIllustrationData,
};
