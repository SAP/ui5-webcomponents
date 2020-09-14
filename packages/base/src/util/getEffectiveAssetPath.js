import { getAssetsPath } from "../config/AssetsPath.js";

const getEffectiveAssetPath = asset => {
	const assetsPath = getAssetsPath();
	if (asset.startsWith("/UI5_RESOURCES_PATH/")) {
		return asset.replace(/^\/UI5_RESOURCES_PATH\//, assetsPath);
	}

	return asset;
};

export default getEffectiveAssetPath;
