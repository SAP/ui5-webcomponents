const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");

const options = {
	port: 8081,
	hasJest: false,
};

const scripts = getScripts(options);

// Fiori overrides
scripts.start.prepare = "nps build.i18n";

module.exports = {
	scripts
};
