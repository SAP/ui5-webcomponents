import { registerIcon, registerCollectionPromise } from "../SVGIconRegistry.js";
import { fetchJsonOnce } from "../util/FetchHelper.js";

const registerIconBundle = async (collectionName, bundleData) => {
	let resolveFn;
	const collectionFetched = new Promise(resolve => {
		resolveFn = resolve;
	});
	registerCollectionPromise(collectionName, collectionFetched);

	if (typeof bundleData !== "object") { // not inlined from build -> fetch it
		bundleData = await fetchJsonOnce(bundleData);
	}
	fillRegistry(bundleData);
	resolveFn();
};

const fillRegistry = bundleData => {
	Object.keys(bundleData.data).forEach(iconName => {
		registerIcon(iconName, { pathData: bundleData.data[iconName], accData: bundleData.accData[iconName], collection: bundleData.collection });
	});
};

export { registerIconBundle }; // eslint-disable-line
