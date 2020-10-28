const getScripts = require("@ui5/webcomponents-tools/icons-collection/nps.js");

const scripts = getScripts();

// no i18n in this package
scripts.build.i18n = "";

module.exports = {
	scripts
};
