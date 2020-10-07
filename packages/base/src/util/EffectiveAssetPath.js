import { getAssetsPath } from "../config/AssetsPath.js";

let assetPathMappingFn = assetName => assetName;

const getEffectiveAssetPath = assetName => {
	if (typeof assetName !== "string") {
		return assetName;
	}

	assetName = assetPathMappingFn(assetName);

	const assetsPathPrefix = getAssetsPath();
	if (assetsPathPrefix) {
		return `${assetsPathPrefix}${assetName}`;
	}

	return assetName;
};

const registerAssetPathMappingFunction = mappingFn => {
	assetPathMappingFn = mappingFn;
};

export {
	getEffectiveAssetPath,
	registerAssetPathMappingFunction,
};
