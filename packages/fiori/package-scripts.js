const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");

const options = {
	port: 8081,
	portStep: 2,
};

const scripts = getScripts(options);

module.exports = {
	scripts
};
