import { getAssetsPath } from "../config/AssetsPath.js";

const getEffectiveAssetPath = asset => {
	const assetsPath = getAssetsPath();
	if (assetsPath !== undefined && assetsPath !== "/resources/" && asset.startsWith("/resources/")) {
		return asset.replace(/^\/resources\//, assetsPath);
	}

	return asset;
};

export default getEffectiveAssetPath;
