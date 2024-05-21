const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");

const options = {
	port: 8082,
	portStep: 2,
	aiPackage: true,
	noWatchTS: true,
	dev: true,
};

const scripts = getScripts(options);

module.exports = {
	scripts,
};
