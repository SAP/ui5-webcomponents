const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");

const options = {
	port: 8082,
	portStep: 2,
	compatPackage: true,
	noWatchTS: true,
	dev: true,
	internal: {
		cypress_code_coverage: false,
		cypress_acc_tests: false,
	},
};

const scripts = getScripts(options);

module.exports = {
	scripts,
};
