import { registerIcon, registerCollectionPromise } from "../SVGIconRegistry";
import { fetchJsonOnce } from "../util/FetchHelper";

const registerIconBundle = async (collectionName, bundleData) => {
	let resolveFn;
	const collectionFetched = new Promise(resolve => {
		resolveFn = resolve;
	});
	registerCollectionPromise(collectionName, collectionFetched);

	if (typeof bundleData !== "object") { // not inlined from build -> fetch it
		await new Promise(resolve => setTimeout(resolve, 2000));
		bundleData = await fetchJsonOnce(bundleData);
	}
	fillRegistry(bundleData);
	resolveFn();
};

const fillRegistry = bundleData => {
	Object.keys(bundleData.data).forEach(iconName => {
		registerIcon(iconName, bundleData.data[iconName], bundleData.accData[iconName], bundleData.collection);
	});
};

export { registerIconBundle }; // eslint-disable-line
