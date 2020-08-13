// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const features = new Map();

const registerFeature = (name, feature) => {
	features.set(name, feature);
};

const getFeature = name => {
	return features.get(name);
};

export { registerFeature, getFeature };
