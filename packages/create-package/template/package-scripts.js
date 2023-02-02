const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js"); //eslint-disable-line

const options = {
	port: INIT_PACKAGE_VAR_PORT,
	typescript: INIT_PACKAGE_VAR_TYPESCRIPT,
};

const scripts = getScripts(options);

module.exports = {
	scripts,
};
