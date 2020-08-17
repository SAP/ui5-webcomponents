import { registerI18nBundle } from "./asset-registries/i18n.js";
import { registerCldr, _registerMappingFunction as registerCldrMappingFunction } from "./asset-registries/LocaleData.js";
import { registerThemeProperties } from "./asset-registries/Themes.js";

export {
	registerCldr,
	registerCldrMappingFunction,
	registerThemeProperties,
	registerI18nBundle,
};
