import { getAssetsPath } from "../config/AssetsPath.js";
import { getFeature } from "../FeaturesRegistry.js";

const getEffectiveAssetPath = asset => {
	if (typeof asset !== "string") {
		return asset;
	}

	const OpenUI5Support = getFeature("OpenUI5Support");
	if (OpenUI5Support) {
		asset = OpenUI5Support.modulePathToUrl(asset);
	}

	const assetsPath = getAssetsPath();
	if (assetsPath) {
		return `${assetsPath}${asset}`;
	}

	return asset;
};

export default getEffectiveAssetPath;
