const wdio = require("@ui5/webcomponents-tools/components-package/wdio.js");

wdio.config.suites = {
	"suite1": [
		'./test/specs/base/*.spec.js',
		'./test/specs/[A-D]*.spec.js',
	],
	"suite2": [
		'./test/specs/[^A-D]*.spec.js',
	],
};

module.exports = wdio;
