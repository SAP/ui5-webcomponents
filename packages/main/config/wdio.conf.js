const wdio = require("@ui5/webcomponents-tools/components-package/wdio.js");

wdio.config.suites = {
	"suite1": [
		'./test/specs/base/*.spec.js',
		'./test/specs/suite1/*.spec.js',
	],
	"suite2": [
		'./test/specs/suite2/*.spec.js',
	],
};

module.exports = wdio;