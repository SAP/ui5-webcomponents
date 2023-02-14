const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js"); //eslint-disable-line

const options = {
	port: 8080,
	typescript: INIT_PACKAGE_VAR_TYPESCRIPT,
};

const scripts = getScripts(options);

module.exports = {
	scripts,
};
