import { getFetchDefaultFontFaces as getConfiguredFetchDefaultFontFaces } from "../InitialConfiguration.js";

let fetchDefaultFontFaces: boolean;

/**
 * Returns if the "fetchDefaultFontFaces" configuration is set.
 * @public
 * @returns { boolean }
 */
const getFetchDefaultFontFaces = (): boolean => {
	if (fetchDefaultFontFaces === undefined) {
		fetchDefaultFontFaces = getConfiguredFetchDefaultFontFaces();
	}

	return fetchDefaultFontFaces;
};

/**
 * Defines the "fetchDefaultFontFaces" setting.
 *
 * - When set to "true" (default), all used font faces are fetched over the network.
 * - When set to "false", default font faces are not fetched automatically and must be managed separately.
 * @public
 * @param { boolean } fetchDefaultFontFacesData
 */
const setFetchDefaultFontFaces = (fetchDefaultFontFacesData: boolean) => {
	fetchDefaultFontFaces = fetchDefaultFontFacesData;
};

export {
	getFetchDefaultFontFaces,
	setFetchDefaultFontFaces,
};
