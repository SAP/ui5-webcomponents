const getScripts = require("@ui5/webcomponents-tools/components-package/scripts.js");

const conf = {
	port: 8081,
	hasJest: false,
};

const scripts = getScripts(conf);

// Fiori overrides
scripts.start.prepare = "nps build.i18n";

module.exports = {
	scripts
};
