import { getAssetsPath } from "../config/AssetsPath.js";

let assetPathMappingFn = assetPath => assetPath;

const getEffectiveAssetPath = asset => {
	if (typeof asset !== "string") {
		return asset;
	}

	asset = assetPathMappingFn(asset);

	const assetsPath = getAssetsPath();
	if (assetsPath) {
		return `${assetsPath}${asset}`;
	}

	return asset;
};

const registerAssetPathMappingFunction = mappingFn => {
	assetPathMappingFn = mappingFn;
};

export {
	getEffectiveAssetPath,
	registerAssetPathMappingFunction,
};
