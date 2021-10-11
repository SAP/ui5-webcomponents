const config = require("@ui5/webcomponents-tools/components-package/rollup.js");
const emptyModulePlugin = require("@ui5/webcomponents-tools/components-package/rollup-plugins/empty-module.js");

if (process.env.DEV) {
	// Empty the CLDR assets file for better performance during development
	config[0].plugins.prepend(emptyModulePlugin({
		emptyModules: [
			"localization/dist/Assets.js",
		],
	}));
}

module.exports = config;
