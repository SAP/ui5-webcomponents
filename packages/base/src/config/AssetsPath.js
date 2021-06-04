// @ts-check
import { getAssetsPath as getConfiguredAssetsPath } from "../InitialConfiguration.js";

/**
 * @type { String }
 */
let assetsPath;

/**
 * Get the current or configured path to the static assets. This will be prepended to the URL when fetching static assets.
 * @returns {String} the path to prepend to static assets
 * @public
 */
const getAssetsPath = () => {
	if (assetsPath === undefined) {
		assetsPath = getConfiguredAssetsPath();
	}

	return assetsPath;
};

/**
 * Set the URL prefix to the static assets so the framework can find them at runtime.
 * @param {String} path
 * @public
 */
const setAssetsPath = path => {
	assetsPath = path;
};

export { getAssetsPath, setAssetsPath }; // eslint-disable-line
