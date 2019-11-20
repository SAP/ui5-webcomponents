const getScripts = require("@ui5/webcomponents-tools/components-package/scripts.js");

const conf = {
	port: 8080,
	hasJest: true,
};

const scripts = getScripts(conf);

module.exports = {
	scripts
};
