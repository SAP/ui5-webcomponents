const config = require("@ui5/webcomponents-tools/components-package/eslint.js");

module.exports = config.concat({
	ignores: [
		"test",
		"lib",
		"dist",
		"src/generated",
		"src/thirdparty",
		"bundle.esm.js",
		"bundle.es5.js",
		"rollup.config*.js",
		"wdio.conf.cjs",
		"postcss.config.cjs",
		"package-scripts.cjs",
		".eslintrc.cjs",
		"src/renderer/directives/style-map.js",
		"src/util/metaUrl.js",
		"src/ssr-dom*",
		"index.js"
	]
});
