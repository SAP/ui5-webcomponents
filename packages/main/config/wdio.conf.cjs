const wdio = require("@ui5/webcomponents-tools/components-package/wdio.js");

wdio.config.suites = {
	"suite1": [
		'./test/specs/base/*.spec.js',
		'./test/specs/[A-D]*.spec.js',
	],
	"suite2": [
		'./test/specs/[E-R]*.spec.js',
	],
	"suite3": [
		'./test/specs/[S-Z]*.spec.js',
	],
	"suite-input": [
		'./test/specs/input/*.spec.js',
	],
	"suite-datetime": [
		'./test/specs/datetime/*.spec.js',
	],
};

module.exports = wdio;
