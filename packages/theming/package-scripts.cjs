const resolve = require("resolve");
const assets = require('@ui5/webcomponents-tools/assets-meta.js');

const jsonImportsScript = resolve.sync("@ui5/webcomponents-tools/lib/generate-json-imports/themes.js");
const generateReportScript = resolve.sync("@ui5/webcomponents-theming/lib/generate-css-vars-usage-report/index.js");

module.exports = {
	scripts: {
		clean: "rimraf dist && rimraf src/generated",
		generate: `cross-env UI5_TS=true nps clean build.src  build.postcss build.jsonImports`,
		build: {
			default: `cross-env UI5_TS=true nps clean build.src build.postcss build.jsonImports build.typescript generateReport`,
			src: `copy-and-watch "src/**/*.{js,css}" dist/`,
			typescript: "tsc",
			postcss: "postcss dist/**/parameters-bundle.css --config config/postcss.themes --base dist/ --dir dist/css/",
			jsonImports: `node "${jsonImportsScript}" src/generated/assets/themes src/generated/json-imports`,
		},
		copyGenerated: `copy-and-watch "src/generated/**/*.{js,css,json}" dist/generated/`,
		generateReport: `node "${generateReportScript}"`,
	},
};

console.log(JSON.stringify(module.exports, 2, 2))
