import { getEnableDefaultTooltips as getConfiguredEnableDefaultTooltips } from "../InitialConfiguration.js";

let _enableDefaultTooltips: boolean;

/**
 * Returns if the "enableDefaultTooltips" configuration is set.
 * @public
 * @since 2.1.0
 * @returns { boolean }
 */
const getEnableDefaultTooltips = (): boolean => {
	if (_enableDefaultTooltips === undefined) {
		_enableDefaultTooltips = getConfiguredEnableDefaultTooltips();
	}

	return _enableDefaultTooltips;
};

/**
 * Defines the "enableDefaultTooltips" setting.
 *
 * - When set to "true" (default), the components will display default tooltips.
 * - When set to "false", the components will NOT display default tooltips.
 *
 * @public
 * @since 2.1.0
 * @param { boolean } enableDefaultTooltips
 */
const setEnableDefaultTooltips = (enableDefaultTooltips: boolean) => {
	_enableDefaultTooltips = enableDefaultTooltips;
};

export {
	getEnableDefaultTooltips,
	setEnableDefaultTooltips,
};
