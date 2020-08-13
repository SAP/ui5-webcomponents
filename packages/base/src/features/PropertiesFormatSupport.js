// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import { registerFeature } from "../FeaturesRegistry.js";
import parseProperties from "../util/parseProperties.js";

const PropertiesFormatSupport = {
	parser: parseProperties,
};

registerFeature("PropertiesFormatSupport", PropertiesFormatSupport);
