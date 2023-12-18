const resolve = require("resolve");
const assets = require('@ui5/webcomponents-tools/assets-meta.js');
const path = require('path');

const jsonImportsScript = resolve.sync("@ui5/webcomponents-tools/lib/generate-json-imports/themes.js");
const generateReportScript = resolve.sync("@ui5/webcomponents-theming/lib/generate-css-vars-usage-report/index.js");

const LIB = path.join(__dirname, `../tools/lib/`);

module.exports = {
	scripts: {
		clean: "rimraf dist && rimraf src/generated",
		generate: `cross-env UI5_TS=true nps build.postcss build.jsonImports`,
		build: {
			default: `cross-env UI5_TS=true nps clean build.src build.postcss build.jsonImports build.typescript generateReport`,
			src: `copy-and-watch "src/**/*.{json}" dist/`,
			typescript: "tsc",
			postcss: `node "${LIB}/css-processors/css-processor-themes.mjs"`,
			jsonImports: `node "${jsonImportsScript}" dist/generated/assets/themes src/generated/json-imports`,
		},
		generateReport: `node "${generateReportScript}"`,
	},
};
