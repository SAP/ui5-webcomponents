import getSharedResource from "../getSharedResource.js";
import { I18nText } from "../i18nBundle.js";

type IllustrationLoader = (illustrationName: string) => Promise<IllustrationData>;

type IllustrationProperties = {
	dialogSvg: string,
	sceneSvg: string,
	spotSvg: string,
	title: I18nText,
	subtitle: I18nText,
};

type IllustrationData = IllustrationProperties & {
	set: string,
};

const loaders = new Map<string, IllustrationLoader>();
const registry = getSharedResource<Map<string, IllustrationProperties>>("SVGIllustration.registry", new Map());
const illustrationPromises = getSharedResource<Map<string, Promise<IllustrationData>>>("SVGIllustration.promises", new Map());

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
			if (illustrationName.startsWith("Tnt")) {
				throw new Error(`No loader registered for the ${illustrationName} illustration. Probably you forgot to import the "@ui5/webcomponents-fiori/dist/illustrations/tnt/${illustrationName.replace(/^Tnt/, "")}.js" module. Or you can import all illustrations by importing the "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js" module.`);
			} else {
				throw new Error(`No loader registered for the ${illustrationName} illustration. Probably you forgot to import the "@ui5/webcomponents-fiori/dist/illustrations/${illustrationName}.js" module. Or you can import all illustrations by importing the "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js" module.`);
			}
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
	return registry.get(`${set}/${illustrationName}`);
};

export {
	getIllustrationDataSync,
	registerIllustration,
	registerIllustrationLoader,
	getIllustrationData,
};
