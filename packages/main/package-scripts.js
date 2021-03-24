const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");
const fs = require("fs");

const options = {};

const scripts = getScripts(options);

module.exports = {
	scripts
};
