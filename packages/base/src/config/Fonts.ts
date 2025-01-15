import { getDefaultFontLoading as getConfiguredDefaultFontLoading } from "../InitialConfiguration.js";
import { attachConfigurationReset } from "./ConfigurationReset.js";

let defaultFontLoading: boolean | undefined;

attachConfigurationReset(() => {
	defaultFontLoading = undefined;
});

/**
 * Returns if the "defaultFontLoading" configuration is set.
 * @public
 * @returns { boolean }
 */
const getDefaultFontLoading = (): boolean => {
	if (defaultFontLoading === undefined) {
		defaultFontLoading = getConfiguredDefaultFontLoading();
	}

	return defaultFontLoading;
};

/**
 * Defines the "defaultFontLoading" setting.
 *
 * - When set to "true" (default), all used font faces are fetched over the network.
 * - When set to "false", default font faces are not fetched automatically and must be managed separately.
 * @public
 * @param { boolean } defaultFontLoadingData
 */
const setDefaultFontLoading = (defaultFontLoadingData: boolean) => {
	defaultFontLoading = defaultFontLoadingData;
};

export {
	getDefaultFontLoading,
	setDefaultFontLoading,
};
