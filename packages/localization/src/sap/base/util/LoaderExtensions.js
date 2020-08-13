// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import { getModuleContent } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";

const LoaderExtensions = {
	loadResource: getModuleContent,
};

export default LoaderExtensions;
