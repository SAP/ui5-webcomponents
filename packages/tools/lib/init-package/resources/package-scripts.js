// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");

const options = {
	port: INIT_PACKAGE_VAR_PORT,
};

const scripts = getScripts(options);

module.exports = {
	scripts,
};
