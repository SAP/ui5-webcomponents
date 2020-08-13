// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

export default value => {
	const m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(value);
	return m && m[2] ? m[2].split(/,/) : null;
};
