import { getAssetsPath } from "../config/AssetsPath.js";

const getEffectiveAssetPath = assetName => {
	if (typeof assetName !== "string") {
		return assetName;
	}

	const assetsPathPrefix = getAssetsPath();
	if (assetsPathPrefix) {
		return `${assetsPathPrefix}${assetName}`;
	}

	return assetName;
};

export {
	getEffectiveAssetPath,
};
