const config = require("@ui5/webcomponents-tools/components-package/eslint.js");

module.exports = config.concat({
	ignores: [
		"target",
		"dist",
		"src/generated",
		"lib",
		"test",
		"bundle.*.js",
		"rollup.config*.js",
		"wdio.conf.cjs",
		"postcss.config.cjs",
		"package-scripts.cjs",
		".eslintrc.cjs",
	]
});
