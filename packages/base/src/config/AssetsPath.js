import { getAssetsPath as getConfiguredAssetsPath } from "../InitialConfiguration.js";

let assetsPath;

const getAssetsPath = () => {
	if (assetsPath === undefined) {
		assetsPath = getConfiguredAssetsPath();
	}

	return assetsPath;
};

const setAssetsPath = newAssetsPath => {
	assetsPath = newAssetsPath;
};

export { getAssetsPath, setAssetsPath }; // eslint-disable-line
