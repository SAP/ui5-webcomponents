const getConfig = require("@ui5/webcomponents-tools/components-package/rollup.js");

const options = {
	name: `@ui5/webcomponents`
};

const config = getConfig(options);

module.exports = config;
