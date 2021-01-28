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

// eslint-disable-next-line
export {
	getEffectiveAssetPath,
};
