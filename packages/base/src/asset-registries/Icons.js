import { fillRegistry, registerCollectionPromise } from "../SVGIconRegistry.js";
import { fetchJsonOnce } from "../util/FetchHelper.js";
import { getEffectiveAssetPath } from "../util/EffectiveAssetPath.js";

const registerIconBundle = async (collectionName, bundleData) => {
	let resolveFn;
	const collectionFetched = new Promise(resolve => {
		resolveFn = resolve;
	});
	registerCollectionPromise(collectionName, collectionFetched);

	if (typeof bundleData !== "object") { // not inlined from build -> fetch it
		bundleData = await fetchJsonOnce(getEffectiveAssetPath(bundleData));
	}
	fillRegistry(bundleData);
	resolveFn();
};

export { registerIconBundle }; // eslint-disable-line
