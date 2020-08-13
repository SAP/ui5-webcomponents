// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import { DEFAULT_LANGUAGE } from "../generated/AssetParameters.js";

export default () => {
	const browserLanguages = navigator.languages;

	const navigatorLanguage = () => {
		return navigator.language;
	};

	const rawLocale = (browserLanguages && browserLanguages[0]) || navigatorLanguage() || navigator.userLanguage || navigator.browserLanguage;

	return rawLocale || DEFAULT_LANGUAGE;
};
