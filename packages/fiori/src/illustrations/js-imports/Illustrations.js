import { registerIllustrationsLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import { fioriPaths as fioriCollection } from "./IllustrationPaths.js";
import { tntPaths as tntCollection } from "./IllustrationPaths.js";

const loadIllustrationsBundle = async (collection) => {
	let illustrationData = null;

	if (collection === "fiori") {
		illustrationData = (await import(fioriCollection)).default;
	} else {
		illustrationData = (await import(tntCollection)).default;
	}

	if(typeof illustrationData === "string" && illustrationData.endsWith(".js")) {
		throw new Error("[illustrations] Invalid bundling detected.");
	}
	return illustrationData;
};

const registerLoaders = () => {
	registerIllustrationsLoader("fiori", loadIllustrationsBundle);
	registerIllustrationsLoader("tnt", loadIllustrationsBundle);
};

registerLoaders();