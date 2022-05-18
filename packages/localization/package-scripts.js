const resolve = require("resolve");
const copyUsedModules = resolve.sync("@ui5/webcomponents-tools/lib/copy-list/index.js");
const replaceGlobalCore = resolve.sync("@ui5/webcomponents-tools/lib/replace-global-core/index.js");
const esmAbsToRel = resolve.sync("@ui5/webcomponents-tools/lib/esm-abs-to-rel/index.js");

const scripts = {
	clean: "rimraf dist",
	lint: "eslint . --config config/.eslintrc.js",
	build: {
		"default": "nps lint clean copy.used-modules copy.cldr copy.overlay build.replace-amd build.replace-export-true build.replace-export-false build.amd-to-es6 build.replace-global-core-usage build.esm-abs-to-rel build.jsonImports copy.src",
		"replace-amd": "replace-in-file sap.ui.define define dist/**/*.js",
		"replace-export-true": `replace-in-file ", /* bExport= */ true" "" dist/**/*.js`,
		"replace-export-false": `replace-in-file ", /* bExport= */ false" "" dist/**/*.js`,
		"amd-to-es6": "amdtoes6 --src=dist --replace --glob=**/*.js",
		"replace-global-core-usage": `node "${replaceGlobalCore}" dist/`,
		"esm-abs-to-rel": `node "${esmAbsToRel}" dist/`,
		jsonImports: "node ./lib/generate-json-imports/cldr.js"
	},
	copy: {
		"used-modules": `node "${copyUsedModules}" ./used-modules.txt dist/`,
		cldr: `copy-and-watch "../../node_modules/@openui5/sap.ui.core/src/sap/ui/core/cldr/*.json" dist/generated/assets/cldr/`,
		overlay: `copy-and-watch "overlay/**/*.js" dist/`,
		src: `copy-and-watch "src/**/*.js" dist/`,
	},
	watch: {
		default: 'nps watch.src',
		src: `nps "copy.src --watch --skip-initial-copy"`,
	},
	start: "nps watch",
};


module.exports = {
	scripts,
};
