const path = require("path");

const NODE_MODULES_PATH = path.join(__dirname, `../../node_modules/`);
const TOOLS_LIB = path.join(NODE_MODULES_PATH, "@ui5/webcomponents-tools/lib/")

module.exports = {
	scripts: {
		clean: "rimraf dist",
		build: {
			default: "nps clean build.src build.less build.postcss build.jsonImports",
			src: `copy-and-watch "src/**/*.js" dist/`,
			less: {
				default: "nps build.less.belize build.less.belize_hcb build.less.belize_hcw build.less.fiori_3 build.less.fiori_3_dark",
				belize: "lessc src/themes/sap_belize/parameters-bundle.less dist/themes/sap_belize/parameters-bundle.css",
				belize_hcb: "lessc src/themes/sap_belize_hcb/parameters-bundle.less dist/themes/sap_belize_hcb/parameters-bundle.css",
				belize_hcw: "lessc src/themes/sap_belize_hcw/parameters-bundle.less dist/themes/sap_belize_hcw/parameters-bundle.css",
				fiori_3: "lessc src/themes/sap_fiori_3/parameters-bundle.less dist/themes/sap_fiori_3/parameters-bundle.css",
				fiori_3_dark: "lessc src/themes/sap_fiori_3_dark/parameters-bundle.less dist/themes/sap_fiori_3_dark/parameters-bundle.css",
			},
			postcss: "postcss dist/**/parameters-bundle.css --config config/postcss.themes --base dist/ --dir dist/css/",
			jsonImports: `node "${TOOLS_LIB}/generate-json-imports/themes.js"`,
		},
		start: "nps build watch",
		watch: {
			default: 'concurrently "nps watch.src" "nps watch.less" "nps watch.postcss"',
			src: `copy-and-watch --watch "src/**/*.js" dist/`,
			less: 'chokidar "src/themes/**/*.less" -c "nps build.less"',
			postcss: 'nps "build.postcss -w"',
		},
	},
};
