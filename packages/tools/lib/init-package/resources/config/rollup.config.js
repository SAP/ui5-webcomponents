const getConfig = require("@ui5/webcomponents-tools/components-package/rollup.js");

const options = {
	name: `INIT_PACKAGE_VAR_NAME`,
};

const config = getConfig(options);

module.exports = config;
