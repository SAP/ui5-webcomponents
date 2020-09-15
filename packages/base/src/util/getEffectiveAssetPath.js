import { getAssetsPath } from "../config/AssetsPath.js";

const getEffectiveAssetPath = asset => {
	const assetsPath = getAssetsPath();
	if (assetsPath && typeof asset === "string") {
		return `${assetsPath}${asset}`;
	}

	return asset;
};

export default getEffectiveAssetPath;
