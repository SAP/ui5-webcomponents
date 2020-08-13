// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import { registerI18nBundle } from "./asset-registries/i18n.js";
import { registerCldr, _registerMappingFunction as registerCldrMappingFunction } from "./asset-registries/LocaleData.js";
import { registerThemeProperties } from "./asset-registries/Themes.js";

export {
	registerCldr,
	registerCldrMappingFunction,
	registerThemeProperties,
	registerI18nBundle,
};
