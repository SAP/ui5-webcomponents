import { getDefaultTooltips as getConfiguredDefaultTooltips } from "../InitialConfiguration.js";

let _defaultTooltips: boolean;

/**
 * Returns if the "defaultTooltips" configuration is set.
 * @public
 * @since 2.1.0
 * @returns { boolean }
 */
const getDefaultTooltips = (): boolean => {
	if (_defaultTooltips === undefined) {
		_defaultTooltips = getConfiguredDefaultTooltips();
	}

	return _defaultTooltips;
};

/**
 * Defines the "defaultTooltips" setting.
 *
 * - When set to "true" (default), the components will display default tooltips.
 * - When set to "false", the components will NOT display default tooltips.
 *
 * @public
 * @since 2.1.0
 * @param { boolean } defaultTooltips
 */
const setDefaultTooltips = (defaultTooltips: boolean) => {
	_defaultTooltips = defaultTooltips;
};

export {
	getDefaultTooltips,
	setDefaultTooltips,
};
