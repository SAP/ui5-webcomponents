const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");

const options = {
	port: 8080,
	portStep: 2,
	noWatchTS: true,
	dev: true,
};

const scripts = getScripts(options);

module.exports = {
	scripts
};
