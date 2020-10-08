import { registerIcon, registerCollectionPromise } from "../SVGIconRegistry.js";
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

const fillRegistry = bundleData => {
	Object.keys(bundleData.data).forEach(iconName => {
		const iconData = bundleData.data[iconName];

		registerIcon(iconName, {
			pathData: iconData.path,
			ltr: iconData.ltr,
			accData: iconData.acc,
			collection: bundleData.collection,
		 });
	});
};

export { registerIconBundle }; // eslint-disable-line
