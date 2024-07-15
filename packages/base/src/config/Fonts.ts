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
 * Sets the "fetchDefaultFontFaces".
 * - When "true" (default value), all used font faces are fetched over the network
 * - When "false", all used font faces are not fetch by default and need to be handled separately
 * @public
 * @param { fetchDefaultFontFaces } boolean
 */
const setFetchDefaultFontFaces = (fetchDefaultFontFacesData: boolean) => {
	fetchDefaultFontFaces = fetchDefaultFontFacesData;
};

export {
	getFetchDefaultFontFaces,
	setFetchDefaultFontFaces,
};
