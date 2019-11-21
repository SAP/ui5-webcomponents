const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");

const options = {
	port: 8081
};

const scripts = getScripts(options);

// Fiori overrides
//"nps clean build.templates build.samples build.styles build.i18n copy.src copy.webcomponents-polyfill",
//scripts.start.prepare = "nps build.i18n";

module.exports = {
	scripts
};
