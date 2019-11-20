const getScripts = require("@ui5/webcomponents-tools/components-package/scripts.js");

const options = {
	port: 8080,
	hasJest: true,
};

const scripts = getScripts(options);

module.exports = {
	scripts
};
