// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const rtlAwareSet = new Set();

const markAsRtlAware = klass => {
	rtlAwareSet.add(klass);
};

const isRtlAware = klass => {
	return rtlAwareSet.has(klass);
};

export {
	markAsRtlAware,
	isRtlAware,
};
